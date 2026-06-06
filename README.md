# PM Portfolio

A visually striking, animated product-management portfolio. The landing, hero,
nav, and transitions are flashy; the case studies are fast, clean, and built to
be skimmed in 2–4 minutes. Content lives in plain `.mdx` files so you can add
new case studies without touching any code.

- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4 (+ `@tailwindcss/typography` for the reading column)
- **Animation:** Framer Motion (one library, used for hero, transitions,
  scroll-reveal, and micro-interactions) — fully respects `prefers-reduced-motion`
- **Content:** MDX, auto-discovered from `/content/` via Vite's `import.meta.glob`

---

## 1. Run it locally

```bash
npm install      # first time only
npm run dev      # start the dev server → http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build into /dist
npm run preview  # serve the built /dist locally to sanity-check the build
```

> Requires Node 18+ (built and tested on Node 24).

---

## 2. How content maps to pages

Everything readable on the site comes from the `/content/` folder. **You never
edit React components to add or change case studies.**

```
content/
├─ _TEMPLATE.mdx              ← master template; copy this to start a new cycle
├─ about.mdx                  → the "About" section on /about
├─ star-stories.mdx           → the "STAR interview stories" section on /about
├─ poker-ascent/
│  ├─ overview.mdx            → intro prose at the top of /work/poker-ascent (optional)
│  └─ cycles/
│     └─ cycle-01-freemium.mdx → /work/poker-ascent/cycle-01-freemium
└─ tonbo/
   ├─ overview.mdx            → intro prose at the top of /work/tonbo (optional)
   └─ cycles/
      └─ cycle-01-placeholder.mdx → /work/tonbo/cycle-01-placeholder
```

| URL | Comes from |
|-----|------------|
| `/` | The hero + project cards (`src/pages/Landing.jsx`). Project names/taglines come from `src/config/projects.js`. |
| `/work/:project` | That project's `overview.mdx` + an auto-generated list of its cycles. |
| `/work/:project/:cycle` | The matching cycle `.mdx` file in that project's `cycles/` folder. |
| `/about` | `content/about.mdx` and `content/star-stories.mdx`. |

The **file name** of a cycle becomes its **URL slug**. The **order** cycles
appear in is controlled by the `cycle:` number in each file's frontmatter, not by
file name.

All placeholder copy is marked `[PLACEHOLDER — Brandon fills this]`. Search the
project for `PLACEHOLDER` to find everything you still need to write.

---

## 3. Add a new cycle (the common task — no code, no help needed)

1. **Copy the template.** Duplicate `content/_TEMPLATE.mdx` into the right
   project's `cycles/` folder. For example, a second Poker Ascent cycle:

   ```
   content/poker-ascent/cycles/cycle-02-onboarding.mdx
   ```

   - Put Poker Ascent cycles in `content/poker-ascent/cycles/`
   - Put Tonbo cycles in `content/tonbo/cycles/`
   - Name it `cycle-<NN>-<short-slug>.mdx`. The file name is the URL.

2. **Fill in the frontmatter** at the top (between the `---` lines):

   ```yaml
   ---
   title: "Cycle 02 — Onboarding revamp"
   cycle: 2                 # ← controls ordering on the project page
   date: "Apr 2026"
   status: "Shipped"        # e.g. Draft / In progress / Shipped
   bluf: "Rebuilt first-run onboarding; day-7 activation rose 7pp."
   tags: ["onboarding", "activation"]
   ---
   ```

3. **Write the seven beats.** They're already laid out in the template as
   numbered `##` sections — keep them in order and don't add extra `##` headings
   (the site auto-numbers each `##` as a beat, and the left-hand "seven beats"
   nav is built from them):

   1. Summary (BLUF)
   2. Trigger & problem
   3. Discovery & user-research synthesis
   4. The PRD
   5. Prioritization (incl. what you chose **not** to build)
   6. Build & sprint summary
   7. Measurement & retro

4. **Save.** That's it — the cycle appears automatically on the project page and
   gets its own URL. No imports, no lists to update, no React edits.

### Components you can use inside any cycle file

No import needed — they're available everywhere in MDX:

| Component | Use |
|-----------|-----|
| `<BLUF>…</BLUF>` | The bottom-line-up-front callout. |
| `<PRD>…</PRD>` | A document-styled box for the PRD beat (write `###` subsections inside). |
| `<MetricResult metric="" target="" result="" hit={true} guardrail="" />` | One measurement card. Add one per metric. `hit` can be `true`, `false`, or text. |
| `<Quote author="" role="">…</Quote>` | A representative user quote. |
| `<Artifact src="" alt="" caption="" type="" />` | An embedded image. Omit `src` to show a labeled placeholder frame. |
| `<Callout title="">…</Callout>` | A neutral aside. |
| `<Placeholder>…</Placeholder>` | A clearly-marked "fill me in later" block. |

### Adding images (PRD scans, synthesis shots, charts)

Drop the image in `public/artifacts/`, then reference it by URL:

```mdx
<Artifact
  src="/artifacts/poker-activation-chart.png"
  alt="Day-7 activation before vs after"
  caption="Activation rose 7pp after the new onboarding."
/>
```

Images are lazy-loaded automatically. See `public/artifacts/README.md`.

---

## 4. Add a whole new project (rare)

1. Add an entry to the array in `src/config/projects.js`:

   ```js
   {
     slug: 'my-project',          // becomes /work/my-project
     name: 'My Project',
     tagline: 'One-line positioning.',
     summary: 'Two-sentence framing (used if there is no overview.mdx).',
     accent: '#16c784',           // primary accent color for this project
     accent2: '#f4c95d',          // secondary accent (used in gradients)
   }
   ```

2. Create the matching folders and (optionally) an overview:

   ```
   content/my-project/overview.mdx
   content/my-project/cycles/cycle-01-something.mdx
   ```

That's the only time you edit a `.js` file. Each project gets its own accent
color, which tints its page, cards, and case-study highlights.

---

## 5. Editing About / STAR stories / project framing

- **About me:** edit `content/about.mdx`.
- **STAR interview stories:** edit `content/star-stories.mdx`.
- **A project's name / tagline / accent color:** `src/config/projects.js`.
- **A project's intro paragraph:** that project's `overview.mdx` (delete the file
  to fall back to the short `summary` from the config).
- **Hero headline / landing copy:** `src/components/Hero.jsx` and
  `src/pages/Landing.jsx` (search for `PLACEHOLDER`).

---

## 6. Animation & accessibility notes

- **Content first.** Case-study body text is static and high-contrast — it never
  animates in, never parallaxes. The dazzle is reserved for the landing, hero,
  nav, and page transitions.
- **Reduced motion.** Every animation checks `prefers-reduced-motion`. When it's
  on (OS/browser setting), the hero, transitions, and scroll-reveals collapse to
  instant, static states — nothing breaks. There's also a CSS-level fallback in
  `src/index.css`.
- **Performance.** Flat, CSS-driven visuals (no canvas/particle libs); case-study
  images lazy-load; the production bundle is small and gzips well (~123 kB gzipped).
- **Mobile.** Fully responsive; heavy motion is reduced and the nav collapses to
  a menu on small screens.

> **Why one animation library?** Framer Motion covers the hero intro,
> scroll-driven effects (`useScroll`/`useTransform`), page transitions
> (`AnimatePresence`), scroll-reveal (`whileInView`), micro-interactions, **and**
> reduced-motion handling. GSAP was intentionally left out — for this scope it
> would overlap heavily with no real gain. If you ever want a complex
> timeline-based set-piece later, GSAP is the thing to add then.

---

## 7. Deploying to Vercel + custom domain

This is a standard static Vite SPA, so deployment is simple.

### Push to Git, then import to Vercel

1. Create a Git repo and push this folder to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the
   repo.
3. Vercel auto-detects Vite. Confirm the settings (they should match):
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**. You'll get a `*.vercel.app` URL in ~1 minute.

`vercel.json` is already included with a SPA rewrite so that deep links like
`/work/poker-ascent/cycle-01-freemium` and browser refreshes resolve correctly
(without it, refreshing a sub-page would 404).

### Connect a custom domain

1. In your Vercel project → **Settings → Domains → Add** → enter your domain
   (e.g. `yourname.com`).
2. Vercel shows the DNS records to set. Two common paths:
   - **Domain registered elsewhere (GoDaddy, Namecheap, etc.):** add the records
     Vercel gives you at your registrar — typically an `A` record for the apex
     (`@` → `76.76.21.21`) and a `CNAME` for `www` (`www → cname.vercel-dns.com`).
   - **Use Vercel's nameservers:** point your registrar's nameservers at the ones
     Vercel lists (this lets Vercel manage DNS for you).
3. Wait for DNS to propagate (minutes to a few hours). Vercel provisions HTTPS
   automatically.

Every push to your main branch redeploys; pull requests get preview URLs.

---

## Project structure

```
.
├─ content/                 # all editable content (MDX) — see §2
├─ public/artifacts/        # case-study images, served at /artifacts/*
├─ src/
│  ├─ components/           # Nav, Hero, cards, Reveal, page transition, MDX slots
│  ├─ pages/                # Landing, Project, Cycle, About, NotFound
│  ├─ config/projects.js    # the project list (name, tagline, accent colors)
│  ├─ content.js            # auto-discovery of cycles/overviews from /content
│  ├─ App.jsx               # routes + animated transitions
│  ├─ main.jsx              # app entry; registers MDX components
│  └─ index.css             # Tailwind theme, reading-column styles, motion safety
├─ vite.config.js           # Vite + MDX (frontmatter, gfm, heading ids) + Tailwind
├─ vercel.json              # SPA rewrite for clean deep links
└─ index.html
```
