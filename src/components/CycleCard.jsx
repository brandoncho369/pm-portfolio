import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

// A compact, skimmable row for a single PM development cycle.
export default function CycleCard({ projectSlug, cycle, index }) {
  const reduce = useReducedMotion()
  const fm = cycle.frontmatter || {}
  const num = typeof fm.cycle === 'number' ? fm.cycle : index + 1

  return (
    <motion.div
      whileHover={reduce ? undefined : { x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <Link
        to={`/work/${projectSlug}/${cycle.slug}`}
        className="panel group flex items-start gap-5 p-5 transition-shadow hover:shadow-[4px_4px_0_0_var(--accent)] sm:p-6"
      >
        <span
          className="mt-0.5 flex-none font-display text-sm font-semibold tabular-nums"
          style={{ color: 'var(--accent)' }}
        >
          {fm.minor ? '·' : String(num).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold tracking-tight">
              {fm.title || cycle.slug}
            </h3>
            {fm.minor && (
              <span className="border border-[var(--color-hairline)] px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted">
                minor
              </span>
            )}
            {fm.status && (
              <span className="border border-[var(--color-hairline)] px-2 py-0.5 font-mono text-[11px] text-muted">
                {fm.status}
              </span>
            )}
          </div>
          {fm.bluf && (
            <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{fm.bluf}</p>
          )}
          {Array.isArray(fm.tags) && fm.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {fm.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-sm border border-[var(--color-hairline)] px-1.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {fm.date && (
            <p className="mt-2 font-mono text-xs text-muted">{fm.date}</p>
          )}
        </div>
        <span className="mt-1 flex-none font-mono text-sm text-muted transition-all group-hover:translate-x-1 group-hover:text-[var(--accent)]">
          →
        </span>
      </Link>
    </motion.div>
  )
}
