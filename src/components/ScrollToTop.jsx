import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll to top on every route change (default browser SPA behavior
// would otherwise keep the previous scroll position).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
