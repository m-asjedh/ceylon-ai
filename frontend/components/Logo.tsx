import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "default" | "light";
}

const sizes = {
  sm: { mark: 28, text: "text-lg" },
  md: { mark: 32, text: "text-xl" },
  lg: { mark: 40, text: "text-2xl" },
};

export function Logo({ size = "md", href = "/", variant = "default" }: LogoProps) {
  const { mark, text } = sizes[size];
  const isLight = variant === "light";

  const content = (
    <div className="flex items-center gap-2">
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
      >
        {isLight ? (
          <>
            <circle cx="20" cy="20" r="10" fill="#fb923c" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="20"
                y1="4"
                x2="20"
                y2="9"
                stroke="#fb923c"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${deg} 20 20)`}
              />
            ))}
          </>
        ) : (
          <>
            <rect width="40" height="40" rx="10" className="fill-surface-elevated" />
            <path
              d="M10 28C14 22 18 18 22 16C26 14 30 12 32 10"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M8 30C12 24 16 20 20 18"
              stroke="var(--accent-warm)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <ellipse cx="28" cy="12" rx="4" ry="6" fill="var(--accent)" opacity="0.85" transform="rotate(-30 28 12)" />
          </>
        )}
      </svg>
      <span className={`${text} leading-none font-bold ${isLight ? "text-white" : ""}`}>
        {isLight ? (
          "Ceylon AI"
        ) : (
          <>
            <span className="font-serif font-semibold text-text">Ceylon</span>
            <span className="font-sans font-medium text-text">
              AI<span className="text-accent-warm">.</span>
            </span>
          </>
        )}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
