// ---------------------------------------------------------------------------
// Custom components available inside every cycle .mdx file (no import needed).
// Engineering-notebook styling: flat, sharp, mono labels, data-forward.
// All STATIC and high-contrast — nothing here delays reading.
// ---------------------------------------------------------------------------

import { Link } from 'react-router-dom'

// Internal links (starting with "/") use the router for smooth client-side
// navigation; external links open in a new tab. Applied to all MDX links.
export function MDXLink({ href = '', children, ...rest }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    )
  }
  const external = /^https?:/i.test(href)
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}

export function Placeholder({ children, label = 'PLACEHOLDER, Brandon fills this' }) {
  return (
    <div className="my-4 border border-dashed border-[color-mix(in_oklab,var(--accent)_55%,var(--color-hairline))] bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] px-4 py-3 text-sm">
      <span
        className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: 'var(--accent)' }}
      >
        [{label}]
      </span>
      <span className="text-ink-soft">{children}</span>
    </div>
  )
}

// One-line takeaway that leads each beat. Always visible and visually distinct
// so a recruiter can skim the case study's "spine" in seconds, then read the
// prose below any beat that interests them.
export function TLDR({ children }) {
  return (
    <p className="not-prose mb-5 mt-1 flex gap-2.5 text-[1.05rem] font-semibold leading-snug text-[var(--color-ink)]">
      <span className="select-none" style={{ color: 'var(--accent)' }} aria-hidden>
        →
      </span>
      <span>{children}</span>
    </p>
  )
}

export function BLUF({ children }) {
  return (
    <div className="not-prose my-6 border border-[var(--color-border)] bg-[var(--color-surface)]">
      <p
        className="border-b border-[var(--color-hairline)] px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: 'var(--accent)' }}
      >
        // bottom line up front
      </p>
      <p className="px-4 py-4 text-lg leading-snug text-[var(--color-ink)]">
        {children}
      </p>
    </div>
  )
}

export function PRD({ children, title = 'Product Requirements Document' }) {
  return (
    <section className="not-prose my-8 border border-[var(--color-border)] bg-[var(--color-surface)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-2.5">
        <span className="font-mono text-xs font-semibold tracking-tight">
          {title}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          PRD.md
        </span>
      </header>
      {/* Re-enable prose styling for the author's headings/lists inside. */}
      <div className="case-prose prose max-w-none px-5 py-5">{children}</div>
    </section>
  )
}

export function MetricResult({ metric, target, result, hit, guardrail }) {
  const hitLabel =
    hit === true ? 'PASS' : hit === false ? 'MISS' : hit || 'n/a'
  const hitColor =
    hit === true
      ? 'var(--color-hit)'
      : hit === false
        ? 'var(--color-miss)'
        : 'var(--color-muted)'

  const Row = ({ k, v }) => (
    <div className="flex flex-col gap-0.5 border-t border-[var(--color-hairline)] px-4 py-2.5 first:border-t-0 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="w-28 flex-none font-mono text-[11px] uppercase tracking-wide text-muted">
        {k}
      </span>
      <span className="font-mono text-sm text-[var(--color-ink)]">{v}</span>
    </div>
  )

  return (
    <div className="not-prose my-5 border border-[var(--color-border)] bg-[var(--color-surface)]">
      <Row k="metric" v={metric} />
      <Row k="target" v={target} />
      <Row k="result" v={result} />
      <Row
        k="did it hit?"
        v={
          <span
            className="inline-flex items-center gap-1.5 font-semibold"
            style={{ color: hitColor }}
          >
            <span>{hit === false ? '✗' : hit === true ? '✓' : '·'}</span>
            {hitLabel}
          </span>
        }
      />
      {guardrail && <Row k="guardrail" v={guardrail} />}
    </div>
  )
}

export function Quote({ children, author, role }) {
  return (
    <figure className="not-prose my-7 border-l-2 bg-[var(--color-surface)] p-5"
      style={{ borderColor: 'var(--accent)' }}>
      <blockquote className="text-xl leading-relaxed text-[var(--color-ink)]">
        “{children}”
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-3 font-mono text-xs text-muted">
          {author && <span className="text-ink-soft">{author}</span>}
          {author && role && ', '}
          {role}
        </figcaption>
      )}
    </figure>
  )
}

export function Artifact({ src, alt = '', caption, type, width }) {
  // Constrain display size. "phone" suits tall portrait screenshots so they
  // don't dominate the page; default is full reading-column width.
  const imgWidth =
    width === 'phone'
      ? 'mx-auto w-full max-w-[300px]'
      : width === 'sm'
        ? 'mx-auto w-full max-w-md'
        : 'w-full'
  if (!src) {
    return (
      <figure className="not-prose my-6">
        <div className="flex aspect-video w-full items-center justify-center border border-dashed border-[var(--color-border)] bg-[var(--color-bg-soft)] text-center text-sm text-muted">
          <div className="font-mono">
            <p className="font-semibold text-ink-soft">
              [{type ? `${type} artifact` : 'artifact'}]
            </p>
            <p className="mt-1 text-xs">
              drop an image in /public/artifacts/ and set src
            </p>
          </div>
        </div>
        {caption && (
          <figcaption className="mt-2 text-center font-mono text-xs text-muted">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="not-prose my-6">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${imgWidth} border border-[var(--color-border)]`}
      />
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Collapsible "full document" artifact (e.g. the complete PRD). Native <details>
// so it's accessible, needs no JS, and is reduced-motion safe. Collapsed by
// default so it never slows the case-study skim; expands inline for depth.
export function PRDDoc({
  title = 'Full PRD document',
  meta,
  defaultOpen = false,
  children,
}) {
  return (
    <details
      className="prd-doc not-prose my-8 border border-[var(--color-border)] bg-[var(--color-surface)]"
      open={defaultOpen || undefined}
    >
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-xs font-semibold">
          <span className="chev" aria-hidden>
            ▸
          </span>
          {title}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          PRD.md
        </span>
      </summary>
      {meta && (
        <p className="border-b border-[var(--color-hairline)] px-5 py-2 font-mono text-[11px] text-muted">
          {meta}
        </p>
      )}
      <div className="case-prose prose max-w-none px-5 py-6">{children}</div>
    </details>
  )
}

// Collapsible "judgment call" story. Collapsed by default to its title + one-line
// hook so the section reads as a scannable list; expands to the full
// Situation / Task / Action / Result / Lesson. Reuses the .prd-doc chevron CSS.
export function Story({ title, hook, children }) {
  return (
    <details className="prd-doc not-prose my-3 border border-[var(--color-border)] bg-[var(--color-surface)]">
      <summary className="flex cursor-pointer select-none items-start gap-3 px-4 py-3.5">
        <span
          className="chev mt-0.5 font-mono text-sm"
          style={{ color: 'var(--accent)' }}
          aria-hidden
        >
          ▸
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-sm font-semibold text-[var(--color-ink)]">
            {title}
          </span>
          {hook && (
            <span className="mt-1 block text-sm leading-snug text-ink-soft">
              {hook}
            </span>
          )}
        </span>
      </summary>
      <div className="case-prose prose max-w-none border-t border-[var(--color-hairline)] px-4 py-4">
        {children}
      </div>
    </details>
  )
}

export function Callout({ children, title }) {
  return (
    <div className="not-prose my-5 border border-[var(--color-hairline)] bg-[var(--color-bg-soft)] p-5">
      {title && (
        <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wide">
          {title}
        </p>
      )}
      <div className="text-ink-soft">{children}</div>
    </div>
  )
}

export const mdxComponents = {
  TLDR,
  BLUF,
  PRD,
  PRDDoc,
  MetricResult,
  Quote,
  Artifact,
  Placeholder,
  Callout,
  Story,
  a: MDXLink,
}
