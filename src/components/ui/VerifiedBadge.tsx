import React from "react";

interface VerifiedBadgeProps {
  className?: string;
  badgeColor?: string;
  checkColor?: string;
  size?: number | string;
}

/**
 * VerifiedBadge - Scalloped rosette seal badge with centered checkmark,
 * matching the user's uploaded reference image (Twitter/Instagram/Meta style verified seal).
 * Default styling: Navy blue (#0D306C) background with white (#FFFFFF) checkmark.
 */
export default function VerifiedBadge({
  className = "w-6 h-6",
  badgeColor = "#0D306C",
  checkColor = "#FFFFFF",
}: VerifiedBadgeProps) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      className={`shrink-0 select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 16-point scalloped seal */}
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.246-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.68.132-.636.075-1.298-.164-1.902.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
        fill={badgeColor}
      />
      {/* Centered bold white checkmark with rounded ends */}
      <path
        d="M6.8 11.2l3 3 5.4-5.4"
        stroke={checkColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
