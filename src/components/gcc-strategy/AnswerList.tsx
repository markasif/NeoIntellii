import type { ReactNode } from "react";

export interface AnswerItem {
  question: string;
  answer: ReactNode;
  id?: string;
}

interface AnswerListProps {
  items: AnswerItem[];
  /** Heading level used for each question. */
  level?: "h2" | "h3";
  className?: string;
}

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Answer-first content: a real question as the heading, the answer in the
 * first sentences, always visible (no disclosure widget), so the text is
 * readable by people and extractable by answer engines.
 */
export default function AnswerList({ items, level = "h3", className = "" }: AnswerListProps) {
  const Heading = level;
  return (
    <div className={`divide-y divide-black/[0.08] ${className}`}>
      {items.map((item) => {
        const id = item.id ?? slug(item.question);
        return (
          <section key={id} id={id} aria-labelledby={`${id}-q`} className="py-6 first:pt-0 last:pb-0">
            <Heading id={`${id}-q`} className="text-heading font-display text-lg md:text-xl mb-2 leading-snug">{item.question}</Heading>
            <div className="text-body text-sm md:text-sm leading-relaxed space-y-3">
              {typeof item.answer === "string" ? <p>{item.answer}</p> : item.answer}
            </div>
          </section>
        );
      })}
    </div>
  );
}
