import PhotoSlot from "./PhotoSlot";
import type { Leader } from "./leadership";

/**
 * The 4:5 portrait space every rendering of a leader reserves.
 *
 * Both the compact accountability cards and the long profiles use this, so the
 * portrait treatment - ratio, crop, placeholder - is defined once. Real photos
 * render at 480x600 and are cropped from the top, which is where a head sits in
 * a portrait frame.
 *
 * The placeholder caption falls back to the name for a leader carried without a
 * job title, so no rendering invents one.
 */
export default function LeaderPortrait({
  leader,
  className = "",
  priority = false,
}: {
  leader: Leader;
  className?: string;
  priority?: boolean;
}) {
  return (
    <PhotoSlot
      src={leader.primaryPhoto}
      alt={leader.altText}
      aspect="aspect-[4/5]"
      width={480}
      height={600}
      label={leader.name}
      caption={`${leader.designation ?? leader.name} · portrait to follow`}
      className={className}
      priority={priority}
    />
  );
}
