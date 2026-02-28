export default function DiversityIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 200"
      className="h-auto w-full max-w-sm"
      aria-hidden="true"
    >
      {/* Background soft shape */}
      <ellipse cx="150" cy="110" rx="130" ry="80" fill="#013e61" opacity="0.08" />

      {/* Diverse group of abstract people in a circle */}
      {/* Person 1 - teal */}
      <circle cx="90" cy="80" r="14" fill="#013e61" />
      <path d="M90 94 L90 130" stroke="#013e61" strokeWidth="3" strokeLinecap="round" />
      <path d="M90 108 L76 118" stroke="#013e61" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M90 108 L104 118" stroke="#013e61" strokeWidth="2.5" strokeLinecap="round" />

      {/* Person 2 - orange */}
      <circle cx="150" cy="65" r="15" fill="#FF7500" />
      <path d="M150 80 L150 120" stroke="#FF7500" strokeWidth="3" strokeLinecap="round" />
      <path d="M150 96 L134 108" stroke="#FF7500" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M150 96 L166 108" stroke="#FF7500" strokeWidth="2.5" strokeLinecap="round" />

      {/* Person 3 - cyan */}
      <circle cx="210" cy="80" r="14" fill="#7cdfff" />
      <path d="M210 94 L210 130" stroke="#7cdfff" strokeWidth="3" strokeLinecap="round" />
      <path d="M210 108 L196 118" stroke="#7cdfff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M210 108 L224 118" stroke="#7cdfff" strokeWidth="2.5" strokeLinecap="round" />

      {/* Connection arcs between people */}
      <path d="M104 100 C120 88, 130 88, 134 96" stroke="#025080" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M166 96 C170 88, 180 88, 196 100" stroke="#025080" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M104 118 C130 145, 170 145, 196 118" stroke="#FF7500" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* Small stars/sparkles representing courage and hope */}
      <circle cx="120" cy="55" r="2.5" fill="#FF7500" opacity="0.5" />
      <circle cx="180" cy="50" r="2" fill="#7cdfff" opacity="0.5" />
      <circle cx="70" cy="110" r="2" fill="#a8ebff" opacity="0.4" />
      <circle cx="230" cy="105" r="2.5" fill="#e06800" opacity="0.4" />
      <circle cx="150" cy="155" r="3" fill="#013e61" opacity="0.2" />
    </svg>
  );
}
