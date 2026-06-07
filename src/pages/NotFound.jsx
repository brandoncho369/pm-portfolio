import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <PageTransition>
      <Seo title="404 — Not found" />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-sm text-muted">
          $ cat ./this-page
        </p>
        <p
          className="mt-4 font-display text-6xl font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          404
        </p>
        <h1 className="mt-3 font-display text-xl font-semibold">
          No such file or directory.
        </h1>
        <p className="mt-2 text-ink-soft">
          The link may be broken or the page may have moved.
        </p>
        <Link to="/" className="btn btn-primary mt-8">
          cd ~/ <span aria-hidden>→</span>
        </Link>
      </div>
    </PageTransition>
  )
}
