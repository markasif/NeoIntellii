# GCC cost calculator: PPC landing page and conversion tracking

Implementation notes for the Google Search Ads build (deliverables D1-D6).
Everything below is in the repository; the parts that need a console, a
credential or a piece of copy are listed under **Open items** and are the only
things standing between this and a hand-over to the Ads implementer.

---

## What shipped

### D1 - `/lp/gcc-cost-calculator`

| Requirement | Where |
|---|---|
| Route | `pages/lp/gcc-cost-calculator.tsx` -> `src/pages/landing/GccCostCalculatorLp.tsx` |
| Logo-only header, minimal footer | `src/components/shared/MinimalChrome.tsx` |
| Title, description, `noindex,follow`, canonical to the public page | `PAID_ROUTE_SEO` in `src/lib/seo.ts` (new `canonical` field, applied in `src/components/page/SEOHead.tsx`) |
| Open Graph tags | unchanged - `SEOHead` still emits them, with `og:url` on the LP's own URL |
| Hero copy (both pages) | `GccCostCalculatorLp.tsx` and `src/pages/GccCostCalculator.tsx` |
| Calculator itself | `src/components/gcc-calculator/CostCalculator.tsx`, shared by both pages via a `pageVariant` prop |

The calculator's arithmetic moved out of the page into
`src/lib/gccCostEngine.ts` (pure, tested in `src/test/gccCostEngine.test.ts`),
because the results step now prices the same team in four cities at once.

### D1.4 - calculator behaviour (both pages)

1. **Non-zero first paint.** The Agentic AI Pod and the Senior-Led preset are
   the *initial state*, not something an effect applies after hydration, so the
   prerendered HTML already contains a monthly figure. Verified in the build
   output: `$40,853 - $45,657 / month` is in the static HTML of both pages.
2. **Product Engineering Pod** added (2 Backend + 1 Full-Stack + 1 QA/SDET +
   1 Product Owner, "Core platform delivery for SaaS products"), in
   `src/data/gccCostData.ts`. It opens on the Balanced Execution preset and the
   Standard Core Apps complexity tier - **confirm both**, they set the price.
3. **Included / excluded block** under the live preview. The "included" list is
   rendered from `INCLUDED_LINES` in `src/data/gccCalculatorContent.ts` and
   matches what the engine actually adds up: salary x 1.30-1.35 statutory and
   benefits overhead, workspace and IT ($200-350/person/month), operations
   ($75-125/person/month), the NeoIntelli fee ($200-400/person/month) and, when
   ticked, the fractional SME retainer. "See setup costs" points at
   `/gcc-india-cost#legal-compliance-admin` - the anchor was added to that page.
4. **Label renames** applied; no "Senior Strike" string remains in the codebase.
5. **Cities**: Bengaluru, Hyderabad, Chennai and Pune were all already present -
   nothing was added and no rate was invented.
6. **Results order** is a, b, c, d, e, then the existing category breakdown and
   pod recommendations, then f and g. The estimate is never gated.
7. **State persistence** via `sessionStorage` (`ni_gcc_calc_v1`). Precedence:
   a link's query parameters beat a stored session, which beats the default pod.
8. **Query parameters** survive by construction - the three steps are client
   state on one route, so `utm_*` and `gclid` stay in the URL throughout, and
   `appendAttributionToFormData` attaches them to the lead either way.

**One deliberate change of scope:** the brief defines step 3 as the results, so
the old third step (choosing captive / managed / hybrid) is gone. Every estimate
is now priced on the managed model, which is what the "included" list describes,
and the four ownership models appear as the informational strip in (e). If you
want the visitor to keep choosing, say so - it is a small change back.

### D1.5 - "Email me this estimate"

`src/components/gcc-calculator/EstimateEmailForm.tsx`. Name, work email,
company, headquarters country, planned start, honeypot, "Send my estimate".
Free-mail and disposable domains are rejected by the shared
`validateWorkEmail` (the message for a consumer mailbox is the brief's
"Please use your work email"). The lead posts to the same Netlify form the
calculator already used (`cost-calculator`, with `hqCountry`, `plannedStart`
and `pageVariant` added to `public/__forms.html`) and `/api/send-tool-email`
mails the summary, exactly as the ROI estimator does. The conversion event
fires only after Netlify accepts the submission - never on click.

### D2 / D4 - events

`src/lib/dataLayer.ts` is the campaign event layer: fixed names, fixed
snake_case parameters, buckets rather than raw money, no free text. It pushes to
`window.dataLayer` **and** mirrors the same event into `gtag` (see D5), so GA4
records it today and a GTM container will read it unchanged tomorrow.

| Event | Fires from |
|---|---|
| `gcc_calc_start` | first blueprint / preset / seat-counter interaction, once per load |
| `gcc_calc_city_selected` | leaving the city step |
| `gcc_calc_result_viewed` | results rendered with a non-zero estimate, de-duplicated per configuration |
| `gcc_estimate_email_submitted` | after the server accepts the lead, with `user_data.email` |
| `roi_email_submitted` | ROI estimator success, with `source_location`, `team_size`, `user_data.email` |
| `cta_book_call_click` | any CTA that opens the booking modal, and every arrival on `/book-a-call` |
| `meeting_booked` | cal.com's `bookingSuccessful` (see D3) |
| `contact_click` | delegated listener on every `mailto:` / `tel:` link (`ContactClickTracker`) |

`monthly_bucket` is computed from the midpoint of the low-high range - the low
alone would systematically under-report the band the visitor is looking at.

### D3 - booking on our own domain

- `/book-a-call` (`src/pages/BookACall.tsx`) renders the cal.com event type
  inline. It accepts `?placement=` (echoed on the click and the booking) and
  `?type=staffing|gcc|ai|neohirex`, which is how the contact page still offers
  three conversations and the NeoHireX demo without any link leaving for
  cal.com.
- The step-3 sticky bar and results CTA open the same embed in a modal
  (`src/components/shared/BookCallModal.tsx`). The embed script is injected on
  the first open, so pages nobody books from pay nothing for it.
- `meeting_booked` comes from `Cal("on", { action: "bookingSuccessful" })`.
  We subscribe to `bookingSuccessfulV2` as well and collapse the two within a
  3-second window, so one booking can only report once.
- **Every direct cal.com link is gone** - constants, navbar, footer, service
  pages, contact page, mega menu and six blog posts now point at
  `/book-a-call`. The tool result email's booking link points at
  `https://neointelli.com/book-a-call` too (it used to open the `/gcc` event
  type; it now opens the staffing one - flag if that is wrong).
- `utm_*` and `gclid` are passed into the embed as config keys
  (`calTrackingConfig`). **Verify on a test booking that they reach the CRM
  record** - cal.com's handling of extra config keys is the one part of this
  I could not check against the live documentation (cal.com is blocked from the
  build environment).
- `/thank-you-call` exists as the D3 option-4 fallback. **Do not switch on
  cal.com's redirect-after-booking while the listener is live** - both together
  would count one booking twice.

### D5 - tag manager

There is no GTM container on the site; it tags with gtag directly
(`G-C1G4RM3CN3` and `AW-17602240384`). Two things were done rather than one:

1. Every campaign event is mirrored into gtag under the same name, so the
   triggers exist today without a container.
2. `pages/_app.tsx` will load a GTM container on every page as soon as
   `NEXT_PUBLIC_GTM_ID` is set (Netlify -> Site configuration -> Environment
   variables). Nothing else has to change - the events are already on
   `window.dataLayer`.

The container's own tags, triggers and Ads conversion actions are console work
and are listed under **Open items**.

### D6

- `/thank-you-call`, noindex, as above.
- `/contact` already offers the three booking cards; they now go to
  `/book-a-call?type=...`.

---

## Verified here

- `npm run test` - 112 tests pass (15 new ones covering the cost engine, the
  US comparison and the money bucketing).
- `npx tsc --noEmit -p tsconfig.app.json` - clean. `npm run build` - clean.
- Static HTML of `/lp/gcc-cost-calculator`: correct title and description,
  `noindex,follow`, canonical `https://neointelli.com/gcc-cost-calculator`,
  a non-zero monthly figure, no navigation, no footer link columns, and no
  external link other than the font and tag-manager preconnects.
- Lighthouse (mobile preset, local production server): **performance 84**,
  CLS 0, LCP 1.9 s. Re-run against the deployed URL before launch - a local
  server is not the CDN. The sticky bar is `position: fixed` and renders in the
  same commit as the results, so it cannot shift layout.

Not verified here, and not verifiable without a live environment: the cal.com
booking events, the Netlify form submission, and the Google Ads side of D5.

---

## Open items

### Needs your confirmation (nothing ships wrong without it, but these are claims)

1. **Product Engineering Pod defaults** - Balanced Execution preset, Standard
   Core Apps complexity. Both move the price.
2. **The "Included" line wording.** It matches the engine as described above;
   confirm the phrase "NeoIntelli recruiting and operations fee" is how you
   want the partner fee named to a prospect.
3. **"Rates updated September 2026"** (`RATES_UPDATED` in
   `src/data/gccCalculatorContent.ts`). The salary bands were last edited on
   3 September 2026, so the sentence is accurate as of today - but it is a claim
   about your data, so it should be yours to make. Update it whenever the bands
   change.
4. **Engagement card copy.** "Start on EOR" and "Build-Operate-Transfer" use
   your wording from the brief. "Co-owned" and "Own from day one" restate the
   hybrid and captive descriptions already on the site, because I had no copy
   for them.

### Blocked on content from you

5. **The anonymised case line** for the trust strip. `TRUST_CASE_LINE` is
   `null` and the strip simply renders without it. I did not write a
   placeholder - an invented client outcome is not something to ship, even
   temporarily.
6. **GCC strategy lead: photo, name, title** (`STRATEGY_LEAD`, same file, also
   `null`). Drop the photo in `public/images/leadership/` and fill the object in.
7. **US salary ranges for Data Scientist, Mobile, BA, PO and Backend.**
   `US_ROLE_RANGES` has the six published ranges from `/gcc-india-cost` and
   `null` for these five. Seats in those roles currently fall back to the site's
   existing 3x India-cost model, and the page says so in one line under the
   comparison. Fill a range in and the caveat disappears by itself. I did not
   invent them.

### Console work (no credential in the repo)

8. **GTM container**: create it, then set `NEXT_PUBLIC_GTM_ID` in Netlify.
   Add the Conversion Linker on All Pages. One GA4 event tag per event in the
   D2 table, trigger "Custom event" on the exact name, passing the listed
   parameters. Mark `gcc_calc_result_viewed`, `gcc_estimate_email_submitted`,
   `roi_email_submitted` and `meeting_booked` as key events.
9. **Google Ads conversion tags** once the implementer supplies the Conversion
   ID and the four labels: `meeting_booked`; `gcc_estimate_email_submitted` OR
   `roi_email_submitted` (one action, two triggers); `gcc_calc_result_viewed`;
   `cta_book_call_click`. Enhanced conversions on the first two, mapped to
   `user_data.email` - it is pushed lowercased and trimmed, **not hashed**, so
   leave GTM on "hash automatically".
10. **cal.com**: confirm on a test booking that the `utm_*` / `gclid` config
    keys reach the booking record, and leave "redirect on booking" **off**
    unless the `bookingSuccessful` listener proves unreliable.

### One decision I did not make for you

11. The NeoHireX "Book a demo" link in the mega menu now goes to
    `/book-a-call?type=neohirex`, which keeps the acceptance criterion ("no page
    links directly to cal.com") true while still booking the NeoHireX event
    type. If you would rather that demo stayed on cal.com, it is a one-line
    revert in `src/components/layout/megaMenu.ts`.

---

## Hand-over to the Ads implementer

Final URLs: `/lp/gcc-cost-calculator`, `/gcc-roi-estimator`, `/services/gcc/setup-launch` (formerly `/build-gcc-india`, now a 301),
`/book-a-call`, `/gcc-india-cost`, `/gcc-readiness-assessment` (all under
`https://neointelli.com`). Tag the "Talk to a GCC Expert" sitelink as
`https://neointelli.com/book-a-call?placement=sitelink` so the click is
attributable.

The site's Google tag is installed on all pages today; the GTM container will be
once item 8 is done. Items 8 and 9 are what stand between this and "Recording
conversions" in Google Ads.
