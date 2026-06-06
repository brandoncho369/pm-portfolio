// ---------------------------------------------------------------------------
// Content registry — the auto-discovery engine.
//
// `import.meta.glob` asks Vite to find every matching file at build time. Drop
// a new cycle .mdx into any /content/<project>/cycles/ folder and it shows up
// automatically: no imports, no route edits, no list to maintain.
// ---------------------------------------------------------------------------

import { projects } from './config/projects'

// Eager-load: the content is small (text), so loading it up front keeps
// navigation instant. Heavy assets (images, charts) are referenced by URL and
// lazy-loaded by the browser, so this stays cheap.
const cycleModules = import.meta.glob('/content/*/cycles/*.mdx', { eager: true })
const overviewModules = import.meta.glob('/content/*/overview.mdx', { eager: true })

const projectSlugFromPath = (p) => p.split('/')[2]
const cycleSlugFromPath = (p) =>
  p.split('/').pop().replace(/\.mdx$/, '')

// Group discovered cycle files by their project folder.
const cyclesByProject = {}
for (const [path, mod] of Object.entries(cycleModules)) {
  // Convention: files starting with "_" (e.g. _TEMPLATE.mdx) are scaffolding,
  // not published cycles. Skip them.
  const slug = cycleSlugFromPath(path)
  if (slug.startsWith('_')) continue

  const projectSlug = projectSlugFromPath(path)
  const fm = mod.frontmatter || {}
  ;(cyclesByProject[projectSlug] ||= []).push({
    slug,
    path,
    Component: mod.default,
    frontmatter: fm,
    cycle: typeof fm.cycle === 'number' ? fm.cycle : 999,
  })
}

// Sort cycles by their frontmatter `cycle` number, then filename as a tiebreak.
for (const slug of Object.keys(cyclesByProject)) {
  cyclesByProject[slug].sort(
    (a, b) => a.cycle - b.cycle || a.slug.localeCompare(b.slug)
  )
}

// Optional per-project overview.mdx (the project-page framing prose).
const overviewByProject = {}
for (const [path, mod] of Object.entries(overviewModules)) {
  overviewByProject[projectSlugFromPath(path)] = mod
}

export function getProjects() {
  return projects.map((p) => ({
    ...p,
    cycles: cyclesByProject[p.slug] || [],
    Overview: overviewByProject[p.slug]?.default || null,
    overviewMeta: overviewByProject[p.slug]?.frontmatter || {},
  }))
}

export function getProject(slug) {
  return getProjects().find((p) => p.slug === slug) || null
}

export function getCycle(projectSlug, cycleSlug) {
  const project = getProject(projectSlug)
  if (!project) return null
  const idx = project.cycles.findIndex((c) => c.slug === cycleSlug)
  if (idx === -1) return null
  return {
    project,
    cycle: project.cycles[idx],
    prev: project.cycles[idx - 1] || null,
    next: project.cycles[idx + 1] || null,
  }
}
