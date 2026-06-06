import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { getProjects } from '../content'

export default function Landing() {
  const projects = getProjects()

  return (
    <PageTransition>
      <Hero />

      {/* WORK ------------------------------------------------------------- */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <p className="label">// selected work</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Two products, documented as PM development cycles.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Each cycle runs the full arc — trigger, discovery, PRD,
            prioritization, build, and measured result. Skim the bottom-line in
            seconds, or read the reasoning end to end.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER ----------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal className="panel p-8 sm:p-12">
          <p className="label">// about</p>
          <h2 className="mt-3 max-w-3xl font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {/* [PLACEHOLDER — Brandon fills this] */}
            [PLACEHOLDER — Brandon fills this] A one-line statement of how you
            think about building product.
          </h2>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            cat about.md & interview-stories
            <span>→</span>
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  )
}
