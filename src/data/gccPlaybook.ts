/**
 * Copy for /lp/gcc-playbook that has to be identical in two places.
 *
 * The FAQ lives here rather than in the page because it is also emitted as
 * FAQPage structured data. Structured data that does not match the visible
 * page is a violation whether or not it was intended, and the only reliable
 * way to stop the two drifting is for there to be one copy.
 *
 * The glossary is here for the same reason it exists at all: a visitor who
 * needs the vocabulary should be able to find it on the page rather than
 * being sent to a pillar article, and the definitions should not restate
 * marketing claims.
 */

export interface QandA {
  q: string;
  a: string;
}

export const GCC_PLAYBOOK_FAQS: QandA[] = [
  {
    q: "Do I have to give you my email to see a number?",
    a: "No. The estimate, the comparison, the readiness check and both downloads all work without one. The only place contact details are asked for is the request to have a practitioner review your case, and that is an explicit, separate action.",
  },
  {
    q: "Where do the salary figures come from?",
    a: "They are NeoIntelli planning bands modelled on our own delivery and hiring experience, covering Bengaluru, Hyderabad, Chennai and Pune. They are not a published salary survey and they carry no sample size, which is exactly how they are labelled in the workspace. Every one of them is editable - if you have your own figures, use them.",
  },
  {
    q: "Why does it refuse to show savings sometimes?",
    a: "Because a saving needs something to save against, and only you know what the same scope costs you today. If you have not told the model that, it reports the India cost and says the comparison is unavailable. It will not model a US or European counterfactual you did not ask for.",
  },
  {
    q: "Does it tell me which tax breaks or incentives I qualify for?",
    a: "No, and it will not pretend to. It surfaces the considerations that look relevant to your answers, names the facts that would decide each one, links the official source, and models every one of them at zero value. Eligibility is an adviser's determination, not a calculator's.",
  },
  {
    q: "Is the output reviewed by anyone?",
    a: "Not automatically. Everything the workspace produces is labelled a planning estimate. It only says practitioner reviewed after a NeoIntelli practitioner has actually reviewed it and that review has been recorded.",
  },
  {
    q: "Can I take the numbers away?",
    a: "Yes. There is a PDF for reading and a CSV with the full monthly cash flow and every assumption for anyone who wants to take the model apart. Both come from the same snapshot as the screen, so they cannot disagree with it.",
  },
];

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const GCC_PLAYBOOK_GLOSSARY: GlossaryEntry[] = [
  {
    term: "GCC (Global Capability Centre)",
    definition:
      "A team a company builds and owns in another country to do its own work, rather than buying that work from a vendor. The distinguishing feature is ownership of the output and the people, not the size of the centre.",
  },
  {
    term: "Micro GCC",
    definition:
      "A description of scale and operating style - a small centre run lean - not a legal structure. A micro GCC can be directly owned, provider-managed, or built with an intent to transfer.",
  },
  {
    term: "Build-operate-transfer",
    definition:
      "An arrangement where a provider stands up and runs a centre with an intention that the client takes it over later. The transfer terms are the whole point and are the part most often left to a later negotiation.",
  },
  {
    term: "Employer of record",
    definition:
      "A third party that holds the employment relationship so a company can hire without its own entity. It settles who the employer is and settles nothing about IP, tax exposure, security or who is accountable for delivery.",
  },
  {
    term: "CTC (cost to company)",
    definition:
      "The Indian convention for total employment cost. A figure quoted as CTC already includes employer provident fund, gratuity and insurance, so adding a benefits percentage on top of it double counts them.",
  },
  {
    term: "Ramp",
    definition:
      "The months between the first hire and a fully staffed team. First-year cash is the sum of those actual months; twelve times a fully-staffed month is a different, larger number.",
  },
  {
    term: "Steady-state run rate",
    definition:
      "What the centre costs per month once every planned seat is filled, excluding one-time costs.",
  },
  {
    term: "Payback",
    definition:
      "The first month the cumulative difference against your baseline turns non-negative after an initial deficit. If there was never a deficit there is no payback event, and this model says so rather than inventing one.",
  },
  {
    term: "Restricted transfer",
    definition:
      "A disclosure of personal data to an organisation outside the exporting jurisdiction. Remote access from India to data held elsewhere can be one; where the server sits does not settle it.",
  },
  {
    term: "Zero-rated export of services",
    definition:
      "GST treatment available when the statutory export-of-services conditions are met, including conditions about the relationship between the supplier and the recipient. It is conditional treatment, not a general saving.",
  },
];
