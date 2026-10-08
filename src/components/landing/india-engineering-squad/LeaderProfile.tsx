import { ArrowUpRight, ChevronRight } from "lucide-react";
import LeaderPortrait from "./LeaderPortrait";
import PhotoSlot from "./PhotoSlot";
import type { EngagementBlock, Leader } from "./leadership";
import { trackLeaderLinkedIn } from "./tracking";
import { CARD_LABEL } from "./theme";

/**
 * The long leadership profile further down the page.
 *
 * Desktop is a 40/60 split, alternated left and right by `reverse` so three
 * consecutive profiles do not read as one long column. Mobile stacks the
 * portrait above the copy in every case.
 *
 * The three profiles differ only in the shape of their engagement blocks - a
 * prose paragraph, a bullet list or an arrow flow - so the block renderer below
 * covers all three and no leader needs bespoke markup.
 */

function EngagementBody({ block }: { block: EngagementBlock }) {
  if (block.flow) {
    return (
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {block.flow.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            {index > 0 ? (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#f97316]" aria-hidden="true" />
            ) : null}
            <span className="rounded-lg border border-black/[0.06] bg-white px-2.5 py-1.5 text-2xs font-medium text-[#101c4a]">
              {step}
            </span>
          </li>
        ))}
      </ol>
    );
  }

  if (block.items) {
    return (
      <ul className="space-y-1.5">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#2a3556]">
            <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#f97316]" />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return <p className="text-sm leading-relaxed text-[#2a3556]">{block.text}</p>;
}

export default function LeaderProfile({ leader, reverse = false }: { leader: Leader; reverse?: boolean }) {
  return (
    <article id={`leader-${leader.id}`} className="scroll-mt-24 border-t border-[#dde7f7] py-14 md:py-20">
      <div
        className={`grid gap-8 lg:gap-12 ${
          reverse
            ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
            : "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        }`}
      >
        <div className={`space-y-4 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
          <LeaderPortrait leader={leader} />
          {leader.secondaryPhoto ? (
            <PhotoSlot
              src={leader.secondaryPhoto}
              alt={leader.altText}
              aspect="aspect-[4/3]"
              width={480}
              height={360}
              label={leader.name}
            />
          ) : null}
        </div>

        <div className={reverse ? "lg:order-1" : "lg:order-2"}>
          <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.16em] text-[#f97316]">
            {leader.positioning}
          </p>
          <h3 className="text-3xl font-bold leading-tight tracking-[-0.025em] text-[#101c4a] md:text-4xl">
            {leader.name}
          </h3>
          {/* A leader carried without a job title gets no title line at all. */}
          {leader.shortRole ? (
            <p className="mb-5 text-sm font-semibold text-[#1f5fd0]">{leader.shortRole}</p>
          ) : (
            <div className="mb-5" />
          )}

          {leader.longBio.map((paragraph) => (
            <p key={paragraph} className="mb-4 text-sm leading-relaxed text-[#2a3556]">
              {paragraph}
            </p>
          ))}

          <div className="mt-7 rounded-2xl border border-[#dde7f7] bg-[#f7fafe] p-5 md:p-6">
            <p className={`${CARD_LABEL} mb-5`}>His role in your engagement</p>
            <div className="space-y-5">
              {leader.engagement.map((block) => (
                <div key={block.label}>
                  <p className="mb-2 text-xs font-semibold text-[#101c4a]">{block.label}</p>
                  <EngagementBody block={block} />
                </div>
              ))}
            </div>

            {leader.statement ? (
              <p className="mt-6 text-sm font-semibold leading-relaxed text-[#101c4a]">
                {leader.statement}
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <p className={`${CARD_LABEL} mb-3`}>Accountability</p>
            <ul className="flex flex-wrap gap-2">
              {leader.accountability.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-black/[0.06] bg-white px-3.5 py-1.5 text-xs font-medium text-[#101c4a]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={leader.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLeaderLinkedIn(leader.id, "leadership_profile")}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#1f5fd0]/30 bg-[#1f5fd0]/[0.06] px-5 py-3 text-sm font-semibold text-[#1f5fd0] transition-colors hover:bg-[#1f5fd0]/[0.12]"
          >
            {leader.linkedinLongCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
