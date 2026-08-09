/* Friendly floating AI mascot — a glowing orb-bot with blinking eyes
   and a pulsing antenna light. Pure SVG + CSS, no dependencies. */

export default function Mascot() {
  return (
    <div className="mascot">
      <svg viewBox="0 0 200 220" className="mascot-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="orbGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#EC4899" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6D28D9" />
          </radialGradient>
          <linearGradient id="antennaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB020" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* antenna */}
        <line x1="100" y1="46" x2="100" y2="18" stroke="url(#antennaGrad)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="14" r="9" fill="#FFB020" className="mascot-antenna-light" />

        {/* body */}
        <circle cx="100" cy="120" r="72" fill="url(#orbGrad)" className="mascot-body" />
        <circle cx="100" cy="120" r="72" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

        {/* eyes */}
        <g className="mascot-eyes">
          <ellipse cx="76" cy="112" rx="9" ry="13" fill="#1E1B3A" />
          <ellipse cx="124" cy="112" rx="9" ry="13" fill="#1E1B3A" />
          <circle cx="79" cy="107" r="3" fill="white" />
          <circle cx="127" cy="107" r="3" fill="white" />
        </g>

        {/* smile */}
        <path d="M 78 145 Q 100 162 122 145" stroke="#1E1B3A" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* cheek glow */}
        <circle cx="62" cy="130" r="7" fill="#FFB020" opacity="0.5" />
        <circle cx="138" cy="130" r="7" fill="#FFB020" opacity="0.5" />
      </svg>
    </div>
  );
}
