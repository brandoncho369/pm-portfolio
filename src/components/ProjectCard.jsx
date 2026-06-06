import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

// A "file/directory" entry in the work index — flat, sharp, data-forward.
export default function ProjectCard({ project, index }) {
  const reduce = useReducedMotion()
  const count = project.cycles.length

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ '--accent': project.accent }}
      className="h-full"
    >
      <Link
        to={`/work/${project.slug}`}
        className="panel group relative flex h-full flex-col p-6 transition-shadow hover:shadow-[5px_5px_0_0_var(--accent)]"
      >
        <div className="flex items-center justify-between">
          <span className="label">
            {String(index + 1).padStart(2, '0')} / project
          </span>
          <span className="font-mono text-xs text-muted">
            [{count} {count === 1 ? 'cycle' : 'cycles'}]
          </span>
        </div>

        <h3 className="mt-5 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
          <span style={{ color: 'var(--accent)' }}>▸</span>
          {project.slug}/
        </h3>
        <p className="mt-1 font-display text-sm text-muted">{project.name}</p>

        <p className="mt-4 text-ink-soft">{project.tagline}</p>

        <span className="mt-auto pt-6 font-mono text-sm text-ink-soft transition-colors group-hover:text-[var(--accent)]">
          open ./{project.slug}{' '}
          <span className="transition-transform group-hover:translate-x-1 inline-block">
            →
          </span>
        </span>
      </Link>
    </motion.div>
  )
}
