import { ReactNode } from "react";

interface SectionWrapperProps {
 children: ReactNode;
 className?: string;
 alt?: boolean;
 id?: string;
}

/** Wrapper kept for compatibility. Prefer writing sections inline with editorial layouts. */
const SectionWrapper = ({ children, className ="", alt = false, id }: SectionWrapperProps) => (
 <section
 id={id}
 className={`section px-4 sm:px-6 lg:px-8 ${alt ?"bg-section-alt":"bg-white"} ${className}`}
 >
 <div className="container-custom">{children}</div>
 </section>
);

export default SectionWrapper;
