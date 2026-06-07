import { useParams, Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import CycleCard from '../components/CycleCard.jsx'
import NotFound from './NotFound.jsx'
import { getProject } from '../content'

export default function Project() {
  const { projectSlug } = useParams()
  const project = getProject(projectSlug)

  if (!project) return <NotFound />

  const { Overview } = project

  return (
    <PageTransition>
      <Seo title={project.name} description={project.summary || project.tagline} />
      <div style={{ '--accent': project.accent }}>
        {/* HEADER ------------------------------------------------------- */}
        <header className="border-b border-[var(--color-border)]">
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6">
            <Reveal>
              <p className="label">
                <Link to="/" className="hover:text-[var(--color-ink)]">
                  ~/work
                </Link>{' '}
                / {project.slug}
              </p>
              <h1 className="mt-4 flex items-center gap-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <span style={{ color: 'var(--accent)' }}>▸</span>
                {project.slug}/
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-ink-soft">
                {project.tagline}
              </p>
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          {/* OVERVIEW -------------------------------------------------- */}
          {Overview ? (
            <Reveal className="case-prose prose mb-14 max-w-none">
              <Overview />
            </Reveal>
          ) : (
            <Reveal>
              <p className="mb-14 max-w-2xl text-ink-soft">{project.summary}</p>
            </Reveal>
          )}

          {/* CYCLES ---------------------------------------------------- */}
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                ./cycles
              </h2>
              <span className="font-mono text-xs text-muted">
                {String(project.cycles.length).padStart(2, '0')} total · newest
                last
              </span>
            </div>
          </Reveal>

          {project.cycles.length === 0 ? (
            <p className="mt-8 border border-dashed border-[var(--color-border)] p-8 text-center font-mono text-sm text-muted">
              No cycles yet. Drop an <code>.mdx</code> file in{' '}
              <code>/content/{project.slug}/cycles/</code>.
            </p>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {project.cycles.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.05}>
                  <CycleCard projectSlug={project.slug} cycle={c} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
