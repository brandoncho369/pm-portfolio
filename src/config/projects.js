// ---------------------------------------------------------------------------
// Project registry.
//
// Cycles are auto-discovered from the filesystem (see src/content.js) — you
// NEVER edit code to add a case study. This file only curates the small amount
// of top-level framing for each project: its name, one-liner, and accent color.
//
// To add a brand-new PROJECT (rare): add an entry here and create a matching
// /content/<slug>/ folder with an overview.mdx and a cycles/ subfolder.
// To add a new CYCLE (common): just drop an .mdx file in the cycles/ folder —
// nothing in this file changes.
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'poker-ascent',
    name: 'Poker Ascent',
    // [PLACEHOLDER — Brandon fills this] one-line positioning for the project
    tagline: '[PLACEHOLDER] A Duolingo-style trainer that turns poker reps into measurable skill.',
    // [PLACEHOLDER — Brandon fills this] 1–2 sentence framing shown on the project page
    summary:
      '[PLACEHOLDER — Brandon fills this] What Poker Ascent is, who it serves, and why it matters. Keep it to two sentences of product framing.',
    accent: '#16c784', // emerald — felt + chips
    accent2: '#f4c95d', // gold
  },
  {
    slug: 'tonbo',
    name: 'Tonbo',
    // [PLACEHOLDER — Brandon fills this]
    tagline: '[PLACEHOLDER] One-line positioning for Tonbo.',
    // [PLACEHOLDER — Brandon fills this]
    summary:
      '[PLACEHOLDER — Brandon fills this] What Tonbo is, who it serves, and why it matters. Two sentences max.',
    accent: '#5b8cff', // iridescent blue
    accent2: '#c06bff', // violet
  },
]
