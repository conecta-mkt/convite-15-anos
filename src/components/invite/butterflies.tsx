function ButterflySvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g className="origin-center" style={{ transformOrigin: "32px 24px" }}>
        <g className="origin-[32px_24px]" style={{ animation: "flap 0.32s ease-in-out infinite" }}>
          <path
            d="M32 24C22 6 4 8 8 22c3 10 16 10 24 4Z"
            fill="url(#bf-a)"
            stroke="#d9c4ea"
            strokeWidth="0.6"
          />
          <path
            d="M32 24C22 40 6 40 10 28c3-8 14-6 22-4Z"
            fill="url(#bf-b)"
            stroke="#d9c4ea"
            strokeWidth="0.6"
          />
        </g>
        <g
          className="origin-[32px_24px]"
          style={{ animation: "flap 0.32s ease-in-out infinite reverse" }}
        >
          <path
            d="M32 24C42 6 60 8 56 22c-3 10-16 10-24 4Z"
            fill="url(#bf-a)"
            stroke="#d9c4ea"
            strokeWidth="0.6"
          />
          <path
            d="M32 24C42 40 58 40 54 28c-3-8-14-6-22-4Z"
            fill="url(#bf-b)"
            stroke="#d9c4ea"
            strokeWidth="0.6"
          />
        </g>
        <path d="M32 10v28" stroke="#6b4a82" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="32" cy="12" r="1.6" fill="#5a3a70" />
      </g>
      <defs>
        <linearGradient id="bf-a" x1="8" y1="8" x2="32" y2="28">
          <stop stopColor="#f4e9ff" />
          <stop offset="1" stopColor="#c9a0dc" />
        </linearGradient>
        <linearGradient id="bf-b" x1="10" y1="44" x2="32" y2="24">
          <stop stopColor="#e4d0f4" />
          <stop offset="1" stopColor="#b57ed0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const PATHS = [
  "float-up-1 3.2s ease-out forwards",
  "float-up-2 3.4s ease-out 0.15s forwards",
  "float-up-3 3.6s ease-out 0.05s forwards",
  "float-up-4 3.0s ease-out 0.28s forwards",
  "float-up-5 3.3s ease-out 0.4s forwards",
  "float-up-6 3.5s ease-out 0.22s forwards",
];

export function ButterflyBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PATHS.map((anim, i) => (
        <div
          key={i}
          className="butterfly absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
          style={{ animation: anim }}
        >
          <ButterflySvg className={i % 2 === 0 ? "h-10 w-14" : "h-8 w-11"} />
        </div>
      ))}
    </div>
  );
}
