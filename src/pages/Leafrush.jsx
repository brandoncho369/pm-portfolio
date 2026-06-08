import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'

// Leafrush is a venture / operator story, not a PM development cycle, so it gets
// its own narrative page rather than the seven-beat cycle template.
const mod = import.meta.glob('/content/leafrush.mdx', { eager: true })
const entry = Object.values(mod)[0]
const Body = entry?.default || null
const meta = entry?.frontmatter || {}

const ACCENT = '#1f7a4d' // lawn-care green, distinct from the two PM projects

export default function Leafrush() {
  return (
    <PageTransition>
      <Seo title="Leafrush Marketing" description={meta.tagline} />
      <div style={{ '--accent': ACCENT }}>
        {/* HEADER */}
        <header className="mx-auto max-w-3xl px-4 pt-28 sm:px-6">
          <p className="label">
            <Link to="/" className="hover:text-[var(--color-ink)]">
              ~/work
            </Link>{' '}
            / operating{meta.years ? ` · ${meta.years}` : ''}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {meta.title}
          </h1>
          {meta.tagline && (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {meta.tagline}
            </p>
          )}

          {Array.isArray(meta.stats) && meta.stats.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--color-hairline)] pt-6 sm:grid-cols-3">
              {meta.stats.map((s, i) => (
                <div key={i}>
                  <dt
                    className="font-display text-2xl font-semibold tabular-nums"
                    style={{ color: 'var(--accent)' }}
                  >
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {/* BODY */}
        <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
          <article className="case-prose prose no-beats max-w-none border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-8 sm:px-10 sm:py-10">
            {Body ? <Body /> : <p>Coming soon.</p>}
          </article>

          <div className="mt-12">
            <Link
              to="/"
              className="font-mono text-sm text-muted transition-colors hover:text-[var(--color-ink)]"
            >
              ← back home
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
