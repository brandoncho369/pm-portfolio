import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { getProjects } from '../content'

export default function Landing() {
  const projects = getProjects()

  return (
    <PageTransition>
      <Seo description="Product management portfolio. Case studies showing product judgment across full PM development cycles, by Brandon." />
      <Hero />

      {/* WORK ------------------------------------------------------------- */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <p className="label">// selected work</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Two products, documented as PM development cycles.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Each cycle runs the full arc: trigger, discovery, PRD,
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

      {/* OPERATING -------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Reveal>
          <p className="label">// operating</p>
          <Link
            to="/leafrush"
            style={{ '--accent': '#1f7a4d' }}
            className="panel group mt-4 flex flex-col gap-5 p-7 transition-shadow hover:shadow-[5px_5px_0_0_var(--accent)] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                <span style={{ color: 'var(--accent)' }}>▸</span> Leafrush Marketing
              </h3>
              <p className="mt-2 max-w-2xl text-ink-soft">
                Before product, I built and ran a marketing agency for lawn-care
                businesses, from solo founder to a team of five. The operator
                chapter: ownership, systems, and judgment under real constraints.
              </p>
            </div>
            <span className="whitespace-nowrap font-mono text-sm text-ink-soft transition-colors group-hover:text-[var(--accent)]">
              2022–2026 →
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ABOUT TEASER ----------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal className="panel p-8 sm:p-12">
          <p className="label">// about</p>
          <h2 className="mt-3 max-w-3xl font-display text-xl font-semibold tracking-tight sm:text-2xl">
            What I care about is the judgment: which problem matters, what not
            to build, and how you'd know if you were right.
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
