import React from "react";

interface ProductionCapabilitySvgProps {
  className?: string;
}

export default function ProductionCapabilitySvg({
  className = "w-full h-full",
}: ProductionCapabilitySvgProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Glow Filters */}
        <filter id="prod-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="prod-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="softBlur" />
          <feMerge>
            <feMergeNode in="softBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <linearGradient id="prod-beam-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#0284C7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="prod-beam-light" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="prod-gear-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="45%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        <linearGradient id="prod-gear-grad-secondary" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="60%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        <radialGradient id="prod-platform-ambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#0284C7" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="prod-disc-edge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#007799" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#007799" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* 1. AMBIENT BASE GLOW */}
      <ellipse
        cx="160"
        cy="176"
        rx="135"
        ry="32"
        fill="url(#prod-platform-ambient)"
        filter="url(#prod-soft-glow)"
      />

      {/* 2. HOLOGRAPHIC VERTICAL LIGHT BEAMS (rising from base) */}
      <g opacity="0.85">
        {/* Central main beam */}
        <polygon points="157,175 163,175 161,28 159,28" fill="url(#prod-beam-light)" />
        <circle cx="160" cy="28" r="2.5" fill="#E0F7FF" filter="url(#prod-neon-glow)" />

        {/* Supporting data beams */}
        <polygon points="138,174 142,174 141,60 139,60" fill="url(#prod-beam-grad)" />
        <circle cx="140" cy="60" r="1.8" fill="#38BDF8" />

        <polygon points="178,174 182,174 181,55 179,55" fill="url(#prod-beam-grad)" />
        <circle cx="180" cy="55" r="1.8" fill="#38BDF8" />

        <polygon points="118,172 122,172 121,85 119,85" fill="url(#prod-beam-grad)" opacity="0.6" />
        <circle cx="120" cy="85" r="1.5" fill="#00D2FF" />

        <polygon points="198,172 202,172 201,80 199,80" fill="url(#prod-beam-grad)" opacity="0.6" />
        <circle cx="200" cy="80" r="1.5" fill="#00D2FF" />

        <polygon points="98,170 101,170 100,105 99,105" fill="url(#prod-beam-grad)" opacity="0.4" />
        <circle cx="100" cy="105" r="1.2" fill="#00D2FF" />

        <polygon points="219,170 222,170 221,100 220,100" fill="url(#prod-beam-grad)" opacity="0.4" />
        <circle cx="221" cy="100" r="1.2" fill="#00D2FF" />
      </g>

      {/* 3. STEPPED CYBER PLATFORM RINGS */}
      {/* Outer base ring */}
      <ellipse
        cx="160"
        cy="182"
        rx="125"
        ry="24"
        stroke="#00D2FF"
        strokeWidth="1.2"
        strokeOpacity="0.4"
        strokeDasharray="6 4"
        fill="none"
      />
      <ellipse
        cx="160"
        cy="176"
        rx="115"
        ry="21"
        stroke="#00D2FF"
        strokeWidth="1.8"
        strokeOpacity="0.75"
        fill="#041224"
        fillOpacity="0.75"
        filter="url(#prod-neon-glow)"
      />

      {/* Platform rim thickness */}
      <path
        d="M 45 176 A 115 21 0 0 0 275 176 L 275 180 A 115 21 0 0 1 45 180 Z"
        fill="url(#prod-disc-edge)"
      />

      {/* Inner glowing core platform */}
      <ellipse
        cx="160"
        cy="172"
        rx="95"
        ry="17"
        stroke="#38BDF8"
        strokeWidth="1.5"
        strokeOpacity="0.85"
        fill="#051933"
        fillOpacity="0.8"
      />
      <ellipse
        cx="160"
        cy="172"
        rx="75"
        ry="13"
        stroke="#00E5FF"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        strokeOpacity="0.9"
        fill="none"
      />

      {/* 4. FLOATING HOLOGRAPHIC HUD RINGS */}
      <ellipse
        cx="160"
        cy="162"
        rx="60"
        ry="10"
        stroke="#00D2FF"
        strokeWidth="1"
        strokeOpacity="0.5"
        strokeDasharray="3 3"
        fill="none"
      />

      {/* 5. INTERLOCKING HOLOGRAPHIC GEARS */}
      {/* Primary Large Gear (Center-Left) */}
      <g filter="url(#prod-neon-glow)">
        {/* Outer Gear Teeth (8 teeth profile, radius 38) */}
        <path
          d="
            M 148 76
            L 153 76 L 155 83 L 163 85 L 169 80 L 173 83 L 171 91 L 177 97 L 185 95 L 187 100
            L 182 106 L 184 114 L 192 117 L 191 123 L 183 125 L 180 133 L 185 140 L 181 144
            L 173 141 L 166 146 L 167 154 L 161 156 L 157 149 L 149 148 L 144 154 L 139 152
            L 140 144 L 133 139 L 125 142 L 123 136 L 129 130 L 127 122 L 119 120 L 120 114
            L 128 112 L 131 104 L 126 97 L 130 93 L 138 96 L 145 91 L 144 83 Z
          "
          fill="url(#prod-gear-grad-primary)"
          stroke="#A5F3FC"
          strokeWidth="1.4"
          fillOpacity="0.9"
        />

        {/* Gear Inner Webbing & Spokes */}
        <circle
          cx="156"
          cy="117"
          r="24"
          fill="#06182C"
          fillOpacity="0.85"
          stroke="#00E5FF"
          strokeWidth="1.6"
        />

        {/* 4 Inner Spoke Cutouts */}
        <circle cx="156" cy="104" r="4" fill="url(#prod-gear-grad-primary)" opacity="0.85" />
        <circle cx="169" cy="117" r="4" fill="url(#prod-gear-grad-primary)" opacity="0.85" />
        <circle cx="156" cy="130" r="4" fill="url(#prod-gear-grad-primary)" opacity="0.85" />
        <circle cx="143" cy="117" r="4" fill="url(#prod-gear-grad-primary)" opacity="0.85" />

        {/* Center Axle / Glowing Bearing */}
        <circle
          cx="156"
          cy="117"
          r="9"
          fill="#0284C7"
          stroke="#E0F7FF"
          strokeWidth="1.8"
        />
        <circle cx="156" cy="117" r="4" fill="#FFFFFF" />
      </g>

      {/* Secondary Interlocking Smaller Gear (Right, meshed at angle) */}
      <g filter="url(#prod-neon-glow)">
        <path
          d="
            M 197 122
            L 202 121 L 204 126 L 210 128 L 214 124 L 218 127 L 217 133 L 222 137 L 228 136 L 229 140
            L 225 145 L 227 151 L 233 153 L 232 158 L 226 159 L 223 165 L 227 170 L 223 173
            L 218 171 L 212 175 L 212 181 L 207 182 L 205 177 L 199 176 L 195 180 L 191 178
            L 192 173 L 187 169 L 181 170 L 180 166 L 185 161 L 184 155 L 178 153 L 179 149
            L 185 148 L 187 142 L 183 138 L 187 135 L 192 138 L 197 134 L 196 128 Z
          "
          fill="url(#prod-gear-grad-secondary)"
          stroke="#7DD3FC"
          strokeWidth="1.2"
          fillOpacity="0.88"
        />

        {/* Smaller Gear Inner Web */}
        <circle
          cx="205"
          cy="152"
          r="16"
          fill="#041222"
          fillOpacity="0.9"
          stroke="#38BDF8"
          strokeWidth="1.4"
        />

        {/* Small Gear Axle Pin */}
        <circle
          cx="205"
          cy="152"
          r="6.5"
          fill="#00D2FF"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <circle cx="205" cy="152" r="2.5" fill="#FFFFFF" />
      </g>

      {/* 6. FLOATING CYBER SPARKLES & HUD DATA NODES */}
      <g opacity="0.9">
        {/* Upper HUD Arc */}
        <path
          d="M 115 72 A 70 25 0 0 1 205 72"
          stroke="#00D2FF"
          strokeWidth="1"
          strokeDasharray="4 2"
          strokeOpacity="0.7"
          fill="none"
        />
        <circle cx="115" cy="72" r="2" fill="#00D2FF" />
        <circle cx="205" cy="72" r="2" fill="#00D2FF" />

        {/* Floating pulse nodes */}
        <circle cx="128" cy="112" r="1.5" fill="#E0F7FF" filter="url(#prod-neon-glow)" />
        <circle cx="218" cy="108" r="1.5" fill="#E0F7FF" filter="url(#prod-neon-glow)" />
        <circle cx="102" cy="148" r="1.8" fill="#38BDF8" />
        <circle cx="236" cy="162" r="1.8" fill="#38BDF8" />

        {/* Pipeline Telemetry Pill (Pure geometric circuitry, zero text) */}
        <rect
          x="136"
          y="186"
          width="48"
          height="12"
          rx="6"
          fill="#06182C"
          stroke="#00D2FF"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        <circle cx="144" cy="192" r="2.2" fill="#00E5FF" filter="url(#prod-neon-glow)" />
        <rect x="151" y="190.5" width="24" height="3" rx="1.5" fill="#38BDF8" opacity="0.8" />
      </g>
    </svg>
  );
}
