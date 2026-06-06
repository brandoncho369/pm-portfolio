# Artifacts

Drop case-study images here — PRD scans, synthesis screenshots, metrics charts,
diagrams. Anything in this folder is served at the site root under `/artifacts/`.

**Example:** a file saved as `public/artifacts/poker-activation-chart.png`
is referenced inside any cycle `.mdx` like this:

```mdx
<Artifact
  src="/artifacts/poker-activation-chart.png"
  alt="Day-7 activation before vs after"
  caption="Activation rose 7pp after the new onboarding."
/>
```

Tips:
- Use web-friendly formats (`.png`, `.jpg`, `.webp`, `.svg`).
- Images are lazy-loaded automatically, so large files won't slow first paint —
  but still compress them so pages stay fast.
