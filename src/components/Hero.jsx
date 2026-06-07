import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getProjects } from '../content'

// Small typewriter hook. Respects reduced-motion by returning the full string
// immediately (done=true), so nothing is ever gated behind an animation.
function useTypewriter(text, { enabled = true, speed = 55, startDelay = 250 } = {}) {
  const [out, setOut] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setOut(text)
      setDone(true)
      return
    }
    let i = 0
    let timer
    const start = setTimeout(function tick() {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        return
      }
      timer = setTimeout(tick, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearTimeout(timer)
    }
  }, [text, enabled, speed, startDelay])

  return { out, done }
}

export default function Hero() {
  const reduce = useReducedMotion()
  const projects = getProjects()
  const totalCycles = projects.reduce((n, p) => n + p.cycles.length, 0)

  const cmd = 'ls ~/brandon/work/'
  const { out: typed, done: typedDone } = useTypewriter(cmd, { enabled: !reduce })

  return (
    <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — statement -------------------------------------------- */}
        <div>
          <p className="label">
            // product management portfolio
          </p>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--color-ink)] sm:text-6xl">
            Product judgment,
            <br />
            shown
            <span style={{ color: 'var(--accent)' }}> — </span>
            not claimed.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            I'm a builder who ships products end-to-end — user research, scoping,
            and code — then documents the thinking behind each call. Two products
            below, broken down the way I actually run and built them.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              view case studies
              <span aria-hidden>↓</span>
            </a>
            <Link to="/about" className="btn">
              about_me
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-hairline)] pt-5">
            <div>
              <dt className="label">projects</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums">
                {String(projects.length).padStart(2, '0')}
              </dd>
            </div>
            <div>
              <dt className="label">dev cycles</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums">
                {String(totalCycles).padStart(2, '0')}
              </dd>
            </div>
            <div>
              <dt className="label">status</dt>
              <dd className="font-display text-2xl font-semibold">
                <span style={{ color: 'var(--accent)' }}>●</span> open to intern
              </dd>
            </div>
          </dl>
        </div>

        {/* RIGHT — terminal panel listing the real projects ------------ */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="panel overflow-hidden shadow-[6px_6px_0_0_var(--color-border)]"
        >
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full border border-[var(--color-border)]" />
            <span className="h-3 w-3 rounded-full border border-[var(--color-border)]" />
            <span className="h-3 w-3 rounded-full border border-[var(--color-border)]" />
            <span className="ml-2 font-mono text-xs text-muted">
              brandon@portfolio: ~/work
            </span>
          </div>

          {/* body */}
          <div className="px-5 py-5 font-mono text-sm">
            <p className="text-ink-soft">
              <span style={{ color: 'var(--accent)' }}>$</span> {typed}
              {!typedDone && <span className="caret" />}
            </p>

            <ul className="mt-3 space-y-1">
              {projects.map((p, i) => (
                <motion.li
                  key={p.slug}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={typedDone || reduce ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.25, delay: 0.12 * i }}
                >
                  <Link
                    to={`/work/${p.slug}`}
                    className="group flex items-center justify-between gap-4 border border-transparent px-2 py-1.5 transition-colors hover:border-[var(--color-hairline)] hover:bg-[var(--color-bg-soft)]"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="text-muted transition-colors group-hover:text-[var(--accent)]"
                        style={{ color: 'var(--accent)' }}
                      >
                        ▸
                      </span>
                      <span className="text-ink">{p.slug}/</span>
                    </span>
                    <span className="text-muted">
                      [{p.cycles.length}{' '}
                      {p.cycles.length === 1 ? 'cycle' : 'cycles'}]
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <p className="mt-4 flex items-center text-ink-soft">
              <span style={{ color: 'var(--accent)' }}>$</span>
              <span className="caret" />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
