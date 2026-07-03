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

function SunMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
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
    </svg>
  );
}

export function Logo({ size = "md", href = "/", variant = "default" }: LogoProps) {
  const { mark, text } = sizes[size];
  const isLight = variant === "light";

  const content = (
    <div className="flex items-center gap-2">
      <SunMark size={mark} />
      <span
        className={`${text} leading-none font-bold ${
          isLight ? "text-white" : "text-[#111827]"
        }`}
      >
        Ceylon AI
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
