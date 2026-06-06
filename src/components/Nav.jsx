import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getProjects } from '../content'

function NavItem({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className="group relative font-mono text-sm text-ink-soft transition-colors hover:text-[var(--color-ink)]"
    >
      {({ isActive }) => (
        <>
          <span style={{ color: isActive ? 'var(--color-ink)' : undefined }}>
            {children}
          </span>
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute -bottom-2 left-0 right-0 h-px"
              style={{ background: 'var(--accent)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Nav() {
  const projects = getProjects()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_88%,transparent)] backdrop-blur-[2px]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-tight text-[var(--color-ink)]"
        >
          <span className="text-muted">~/</span>brandon
          <span style={{ color: 'var(--accent)' }}>_</span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <NavItem to="/" end>
            home
          </NavItem>
          {projects.map((p) => (
            <NavItem key={p.slug} to={`/work/${p.slug}`}>
              {p.slug}
            </NavItem>
          ))}
          <NavItem to="/about">about</NavItem>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="panel md:hidden inline-flex h-9 w-9 items-center justify-center font-mono text-ink-soft"
        >
          {open ? '✕' : '≡'}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[var(--color-hairline)] md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
              <MobileLink to="/" end onClick={() => setOpen(false)}>
                home
              </MobileLink>
              {projects.map((p) => (
                <MobileLink
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  onClick={() => setOpen(false)}
                >
                  {p.slug}
                </MobileLink>
              ))}
              <MobileLink to="/about" onClick={() => setOpen(false)}>
                about
              </MobileLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileLink({ to, children, onClick, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `border-b border-[var(--color-hairline)] py-3 font-mono text-sm transition-colors last:border-0 ${
          isActive
            ? 'text-[var(--color-ink)]'
            : 'text-ink-soft hover:text-[var(--color-ink)]'
        }`
      }
    >
      <span style={{ color: 'var(--accent)' }}>▸ </span>
      {children}
    </NavLink>
  )
}
