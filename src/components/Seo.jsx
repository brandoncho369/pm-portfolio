import { useEffect } from 'react'

// Per-route document title + meta description + Open Graph / Twitter tags.
// Set client-side, which covers browsers, history, and JS-rendering crawlers
// (e.g. Google). Non-JS scrapers fall back to the static defaults in index.html.
const SITE = 'Brandon — PM Portfolio'

function upsertMeta(attr, key, value) {
  if (value == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE}` : SITE
    document.title = fullTitle

    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }
    upsertMeta('property', 'og:title', title || SITE)
    upsertMeta('name', 'twitter:title', title || SITE)

    // keep the social URL in sync with the current page
    upsertMeta('property', 'og:url', window.location.href)
  }, [title, description])

  return null
}
