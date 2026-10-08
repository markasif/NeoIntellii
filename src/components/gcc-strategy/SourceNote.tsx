interface SourceNoteProps {
  source: string;
  year?: string;
  lastChecked?: string;
  href?: string;
  note?: string;
  className?: string;
}

/** Attribution line for any figure or policy statement: source, year and when it was last checked. */
export default function SourceNote({ source, year, lastChecked, href, note, className = "" }: SourceNoteProps) {
  return (
    <p className={`text-xs text-body-muted leading-relaxed ${className}`}>
      <span className="text-heading">Source:</span>{" "}
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-black/20 hover:decoration-black/60">
          {source}
        </a>
      ) : (
        source
      )}
      {year ? `, ${year}` : ""}
      {lastChecked ? `. Last checked ${lastChecked}.` : "."}
      {note ? ` ${note}` : ""}
    </p>
  );
}
