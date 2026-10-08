import { ArrowUpRight } from "lucide-react";
import LeaderPortrait from "./LeaderPortrait";
import type { Leader } from "./leadership";
import { trackLeaderLinkedIn } from "./tracking";

/**
 * The compact accountability card used in the early leadership section.
 *
 * Three of these sit side by side on desktop and stack on mobile. Everything it
 * renders comes from the leader record, so the same card serves all three
 * people and a fourth would need no new markup.
 */
export default function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
      <LeaderPortrait leader={leader} className="rounded-none border-0 border-b border-[#dde7f7]" />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.16em] text-[#f97316]">
          {leader.accountabilityLabel}
        </p>
        <h3 className="text-xl font-bold leading-tight tracking-[-0.02em] text-[#101c4a]">{leader.name}</h3>
        {/* A leader carried without a job title gets no title line at all. */}
        {leader.designation ? (
          <p className="mb-4 text-sm font-semibold text-[#1f5fd0]">{leader.designation}</p>
        ) : (
          <div className="mb-4" />
        )}

        {leader.shortBio.map((paragraph) => (
          <p key={paragraph} className="mb-3 text-sm leading-relaxed text-[#2a3556]">
            {paragraph}
          </p>
        ))}

        <dl className="mb-5 mt-3 space-y-3 border-t border-[#eef3fb] pt-5">
          {leader.accountabilityItems.map((item) => (
            <div key={item.title}>
              <dt className="text-xs font-semibold text-[#101c4a]">{item.title}</dt>
              <dd className="text-xs leading-relaxed text-[#5d6a8a]">{item.text}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-auto rounded-xl bg-[#f3f6fc] px-4 py-3 text-xs font-semibold leading-relaxed text-[#101c4a]">
          {leader.bottomLine}
        </p>

        <a
          href={leader.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLeaderLinkedIn(leader.id, "leadership_card")}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f5fd0] transition-colors hover:text-[#1a51b4]"
        >
          {leader.linkedinShortCta}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
