import React from "react";

interface AmbientGlowProps {
  position?: "top" | "center" | "bottom" | "left" | "right";
  color?: string;
  className?: string;
}

export default function AmbientGlow({
  position = "center",
  color = "bg-[#169DC8]/5",
  className = "",
}: AmbientGlowProps) {
  const positionClasses = {
    top: "top-1/4 left-1/2 -translate-x-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-1/4 left-1/2 -translate-x-1/2",
    left: "top-1/2 left-1/3 -translate-y-1/2",
    right: "top-1/2 right-1/4 -translate-y-1/2",
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute w-[700px] sm:w-[900px] h-[350px] sm:h-[450px] ${positionClasses[position]} ${color} rounded-full blur-3xl pointer-events-none ${className}`}
    />
  );
}
