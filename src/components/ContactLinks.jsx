import { contact } from '../config/contact'

// Shared contact links for the About page (buttons) and footer (inline).
export default function ContactLinks({ variant = 'buttons' }) {
  const items = [
    { label: 'Email', href: `mailto:${contact.email}`, external: false },
    { label: 'LinkedIn', href: contact.linkedin, external: true },
    contact.resume && { label: 'Résumé', href: contact.resume, external: false },
  ].filter(Boolean)

  if (variant === 'inline') {
    return (
      <>
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            {...(it.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="hover:text-[var(--color-ink)]"
          >
            {it.label.toLowerCase()}
          </a>
        ))}
      </>
    )
  }

  return (
    <>
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          {...(it.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="btn"
        >
          {it.label}
          <span aria-hidden>→</span>
        </a>
      ))}
    </>
  )
}
