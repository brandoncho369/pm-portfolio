import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'

const aboutMod = import.meta.glob('/content/about.mdx', { eager: true })
const starMod = import.meta.glob('/content/star-stories.mdx', { eager: true })

const About = Object.values(aboutMod)[0]?.default
const StarStories = Object.values(starMod)[0]?.default

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 pt-28 sm:px-6">
        {/* ABOUT --------------------------------------------------------- */}
        <Reveal>
          <p className="label">// about</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            cat about.md
          </h1>
        </Reveal>
        <article className="case-prose prose mt-6 max-w-none">
          {About ? (
            <About />
          ) : (
            <p>[PLACEHOLDER — Brandon fills this] Add /content/about.mdx</p>
          )}
        </article>

        {/* STAR STORIES ------------------------------------------------- */}
        <section className="mt-20">
          <Reveal>
            <p className="label">// interview prep</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
              STAR interview stories
            </h2>
            <p className="mt-2 font-mono text-xs text-muted">
              situation · task · action · result
            </p>
          </Reveal>
          <article className="case-prose prose mt-6 max-w-none">
            {StarStories ? (
              <StarStories />
            ) : (
              <p>
                [PLACEHOLDER — Brandon fills this] Add /content/star-stories.mdx
              </p>
            )}
          </article>
        </section>
      </div>
    </PageTransition>
  )
}
