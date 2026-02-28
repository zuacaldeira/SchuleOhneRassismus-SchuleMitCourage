interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 44"
      className={className}
      role="img"
      aria-label="Schule ohne Rassismus Logo"
    >
      {/* Shield shape */}
      <path
        d="M20 2 L36 10 L36 24 C36 32 28 40 20 42 C12 40 4 32 4 24 L4 10 Z"
        fill="#013e61"
        stroke="#7cdfff"
        strokeWidth="1.5"
      />
      {/* Checkmark */}
      <path
        d="M13 22 L18 27 L28 16"
        fill="none"
        stroke="#FF7500"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
