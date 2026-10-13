import React from "react";

interface AiDeliveryTeamSvgProps {
  className?: string;
}

export default function AiDeliveryTeamSvg({
  className = "w-full h-full",
}: AiDeliveryTeamSvgProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <img
        src="/images/services/ai-delivery-teams/ai_delivery_team_realistic.webp"
        alt="AI Delivery Team"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}
