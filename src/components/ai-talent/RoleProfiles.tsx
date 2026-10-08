import type { RoleGroup } from "@/data/aiTalent";

/**
 * Structured role profiles: what the role owns, the production signals we
 * look for, the resume signals that mislead, and how NeoIntelli evaluates.
 * Plain HTML with the role as a heading so each profile is quotable.
 */
export default function RoleProfiles({ groups }: { groups: RoleGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.name} aria-labelledby={`role-group-${group.name.replace(/\W+/g, "-").toLowerCase()}`}>
          <h3 id={`role-group-${group.name.replace(/\W+/g, "-").toLowerCase()}`} className="text-heading font-display text-2xl mb-2">{group.name}</h3>
          {group.intro && <p className="text-body text-sm leading-relaxed mb-6 max-w-3xl">{group.intro}</p>}
          <div className="space-y-4">
            {group.roles.map((role) => (
              <article key={role.title} className="rounded-2xl bg-white border border-black/[0.06] p-6 md:p-7">
                <h4 className="text-heading font-display text-xl mb-2">{role.title}</h4>
                <p className="text-body text-sm leading-relaxed mb-5"><span className="text-heading">Owns: </span>{role.owns}</p>
                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <p className="text-2xs tracking-[0.16em] uppercase text-[#0e92b8] mb-2">Production signals we look for</p>
                    <ul className="list-disc pl-4 text-body text-sm leading-relaxed space-y-1">{role.signals.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-2xs tracking-[0.16em] uppercase text-[#b45309] mb-2">Resume signals that mislead</p>
                    <ul className="list-disc pl-4 text-body text-sm leading-relaxed space-y-1">{role.falsePositives.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-2xs tracking-[0.16em] uppercase text-heading mb-2">How NeoIntelli evaluates</p>
                    <ul className="list-disc pl-4 text-body text-sm leading-relaxed space-y-1">{role.evaluation.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
