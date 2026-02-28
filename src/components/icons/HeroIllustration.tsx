export default function HeroIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      className="h-auto w-full max-w-md"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="200" cy="150" r="120" fill="#025080" opacity="0.3" />

      {/* Connected people - abstract community */}
      {/* Person 1 - left */}
      <circle cx="120" cy="120" r="18" fill="#7cdfff" />
      <path d="M120 138 L120 185" stroke="#7cdfff" strokeWidth="4" strokeLinecap="round" />
      <path d="M120 155 L100 170" stroke="#7cdfff" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 155 L140 170" stroke="#7cdfff" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 185 L105 220" stroke="#7cdfff" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 185 L135 220" stroke="#7cdfff" strokeWidth="3" strokeLinecap="round" />

      {/* Person 2 - center */}
      <circle cx="200" cy="100" r="20" fill="#FF7500" />
      <path d="M200 120 L200 175" stroke="#FF7500" strokeWidth="4" strokeLinecap="round" />
      <path d="M200 140 L175 158" stroke="#FF7500" strokeWidth="3" strokeLinecap="round" />
      <path d="M200 140 L225 158" stroke="#FF7500" strokeWidth="3" strokeLinecap="round" />
      <path d="M200 175 L183 215" stroke="#FF7500" strokeWidth="3" strokeLinecap="round" />
      <path d="M200 175 L217 215" stroke="#FF7500" strokeWidth="3" strokeLinecap="round" />

      {/* Person 3 - right */}
      <circle cx="280" cy="120" r="18" fill="#a8ebff" />
      <path d="M280 138 L280 185" stroke="#a8ebff" strokeWidth="4" strokeLinecap="round" />
      <path d="M280 155 L260 170" stroke="#a8ebff" strokeWidth="3" strokeLinecap="round" />
      <path d="M280 155 L300 170" stroke="#a8ebff" strokeWidth="3" strokeLinecap="round" />
      <path d="M280 185 L265 220" stroke="#a8ebff" strokeWidth="3" strokeLinecap="round" />
      <path d="M280 185 L295 220" stroke="#a8ebff" strokeWidth="3" strokeLinecap="round" />

      {/* Connection lines between people - togetherness */}
      <path d="M140 155 L175 140" stroke="#7cdfff" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.6" />
      <path d="M225 140 L260 155" stroke="#a8ebff" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.6" />

      {/* Hands reaching toward each other */}
      <path d="M140 170 L175 158" stroke="#7cdfff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M260 170 L225 158" stroke="#a8ebff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

      {/* Heart/unity symbol above */}
      <path
        d="M200 65 C200 55, 212 50, 212 60 C212 68, 200 78, 200 78 C200 78, 188 68, 188 60 C188 50, 200 55, 200 65Z"
        fill="#FF7500"
        opacity="0.7"
      />

      {/* Small decorative dots */}
      <circle cx="150" cy="85" r="3" fill="#7cdfff" opacity="0.4" />
      <circle cx="250" cy="85" r="3" fill="#a8ebff" opacity="0.4" />
      <circle cx="160" cy="240" r="4" fill="#FF7500" opacity="0.3" />
      <circle cx="240" cy="240" r="4" fill="#FF7500" opacity="0.3" />
      <circle cx="100" cy="200" r="3" fill="#7cdfff" opacity="0.3" />
      <circle cx="300" cy="200" r="3" fill="#a8ebff" opacity="0.3" />
    </svg>
  );
}
