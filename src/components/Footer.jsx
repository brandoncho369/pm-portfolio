import { Link } from 'react-router-dom'
import { getProjects } from '../content'
import ContactLinks from './ContactLinks.jsx'

export default function Footer() {
  const projects = getProjects()
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-sm font-semibold">
            <span className="text-muted">~/</span>brandon
            <span style={{ color: 'var(--accent)' }}>_</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Product management portfolio. Evidence of product judgment, one
            development cycle at a time.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-ink-soft">
            <ContactLinks variant="inline" />
          </div>
        </div>
        <nav className="flex flex-col gap-2 font-mono text-sm text-ink-soft sm:items-end">
          <Link to="/" className="hover:text-[var(--color-ink)]">
            home
          </Link>
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className="hover:text-[var(--color-ink)]"
            >
              {p.slug}/
            </Link>
          ))}
          <Link to="/leafrush" className="hover:text-[var(--color-ink)]">
            leafrush
          </Link>
          <Link to="/about" className="hover:text-[var(--color-ink)]">
            about
          </Link>
        </nav>
      </div>
    </footer>
  )
}
