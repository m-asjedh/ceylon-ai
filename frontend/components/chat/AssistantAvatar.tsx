export function AssistantAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-warm/15">
      <svg width="16" height="16" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="8" fill="var(--accent-warm)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="20"
            y1="6"
            x2="20"
            y2="9"
            stroke="var(--accent-warm)"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${deg} 20 20)`}
          />
        ))}
      </svg>
    </div>
  );
}
