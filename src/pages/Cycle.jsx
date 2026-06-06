import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import NotFound from './NotFound.jsx'
import { getCycle } from '../content'

// The case-study reading page — the priority surface. Body copy is STATIC and
// high-contrast (no entrance animation). The only motion is the page-level
// cross-fade. A sticky beat list makes the seven beats skimmable + deep-linkable.
export default function Cycle() {
  const { projectSlug, cycleSlug } = useParams()
  const found = getCycle(projectSlug, cycleSlug)
  const articleRef = useRef(null)
  const [toc, setToc] = useState([])

  useEffect(() => {
    if (!articleRef.current) return
    const headings = articleRef.current.querySelectorAll('.case-prose > h2[id]')
    setToc(
      Array.from(headings).map((h) => ({ id: h.id, text: h.textContent || '' }))
    )
  }, [projectSlug, cycleSlug])

  if (!found) return <NotFound />

  const { project, cycle, prev, next } = found
  const fm = cycle.frontmatter || {}
  const Body = cycle.Component

  return (
    <PageTransition>
      <div style={{ '--accent': project.accent }}>
        {/* HEADER ------------------------------------------------------- */}
        <header className="mx-auto max-w-3xl px-4 pt-28 sm:px-6">
          <p className="label">
            <Link to="/" className="hover:text-[var(--color-ink)]">
              ~/work
            </Link>{' '}
            /{' '}
            <Link
              to={`/work/${project.slug}`}
              className="hover:text-[var(--color-ink)]"
            >
              {project.slug}
            </Link>{' '}
            / {cycle.slug}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs">
            {typeof fm.cycle === 'number' && (
              <span
                className="border px-2 py-0.5 font-semibold"
                style={{
                  color: 'var(--accent)',
                  borderColor:
                    'color-mix(in oklab, var(--accent) 45%, var(--color-hairline))',
                }}
              >
                cycle {String(fm.cycle).padStart(2, '0')}
              </span>
            )}
            {fm.status && (
              <span className="border border-[var(--color-hairline)] px-2 py-0.5 text-muted">
                {fm.status}
              </span>
            )}
            {fm.date && <span className="text-muted">· {fm.date}</span>}
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {fm.title || cycle.slug}
          </h1>

          {fm.bluf && (
            <p
              className="mt-5 border-l-2 pl-4 text-lg leading-snug text-ink-soft"
              style={{ borderColor: 'var(--accent)' }}
            >
              {fm.bluf}
            </p>
          )}
        </header>

        {/* BODY + sticky beat nav -------------------------------------- */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="label mb-3">// seven beats</p>
              <ol className="border-l border-[var(--color-hairline)]">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="-ml-px flex gap-2 border-l-2 border-transparent py-1 pl-3 font-mono text-xs text-muted transition-colors hover:border-[var(--accent)] hover:text-[var(--color-ink)]"
                    >
                      <span className="tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="line-clamp-1">{t.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* The case study itself, on a solid panel for max legibility */}
          <article ref={articleRef} className="min-w-0">
            <div className="case-prose prose max-w-none border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-8 sm:px-10 sm:py-10">
              <Body />
            </div>

            {/* prev / next */}
            <nav className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  to={`/work/${project.slug}/${prev.slug}`}
                  className="panel flex-1 p-4 transition-shadow hover:shadow-[4px_4px_0_0_var(--accent)]"
                >
                  <span className="font-mono text-xs text-muted">
                    ← prev cycle
                  </span>
                  <p className="mt-1 font-semibold">
                    {prev.frontmatter?.title || prev.slug}
                  </p>
                </Link>
              ) : (
                <span className="flex-1" />
              )}
              {next ? (
                <Link
                  to={`/work/${project.slug}/${next.slug}`}
                  className="panel flex-1 p-4 text-right transition-shadow hover:shadow-[4px_4px_0_0_var(--accent)]"
                >
                  <span className="font-mono text-xs text-muted">
                    next cycle →
                  </span>
                  <p className="mt-1 font-semibold">
                    {next.frontmatter?.title || next.slug}
                  </p>
                </Link>
              ) : (
                <span className="flex-1" />
              )}
            </nav>
          </article>
        </div>
      </div>
    </PageTransition>
  )
}
