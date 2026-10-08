/**
 * The small capability pill used wherever this page lists technical ground:
 * evaluation areas, stack groups and squad roles.
 *
 * The page names a lot of technologies, and a logo wall would read as vanity
 * rather than capability, so every one of them is set as restrained text in the
 * same pill. Defining it once keeps the three sections visually identical.
 */
export default function Chip({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  /** "light" sits on white or tinted panels, "dark" on the navy bands. */
  tone?: "light" | "dark";
}) {
  return (
    <li
      className={
        tone === "dark"
          ? "rounded-full border border-white/15 px-3 py-1.5 text-2xs font-medium text-[#c2d2ee]"
          : "rounded-full border border-[#dde7f7] bg-[#f7fafe] px-3 py-1.5 text-2xs font-medium text-[#2a3556]"
      }
    >
      {children}
    </li>
  );
}
