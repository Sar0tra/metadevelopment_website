export default function Marquee({ items, className = '' }) {
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />

      <div className="flex shrink-0 animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.28em] text-fog"
          >
            {item}
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
