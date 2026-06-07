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
    tagline:
      'A poker trainer that teaches how real, exploitative poker is played — built for beginner and intermediate live players, not the GTO crowd.',
    summary:
      'A mobile poker trainer for beginner and intermediate live players — teaching real, exploitative play instead of GTO theory.',
    accent: '#16c784', // emerald — felt + chips
    accent2: '#f4c95d', // gold
  },
  {
    slug: 'tonbo',
    name: 'Tonbo',
    tagline:
      "Intelligence on the Japanese watch market for collectors — scrapes listings, computes true landed cost, and alerts you when the dream watch you've been chasing appears.",
    summary:
      'JDM watch-market intelligence for collectors — scrapes Japanese listings, computes true landed cost, and alerts you to underpriced watches.',
    accent: '#5b8cff', // iridescent blue
    accent2: '#c06bff', // violet
  },
]
