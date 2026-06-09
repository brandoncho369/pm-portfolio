// Rasterizes the SVG sources in /public into PNGs for broad compatibility:
//   - og-image.png        (1200x630) social share card (LinkedIn/Facebook prefer PNG)
//   - favicon-32.png      (32x32)    standard favicon
//   - apple-touch-icon.png(180x180)  iOS home-screen icon
//
// Run with: node scripts/gen-images.mjs   (regenerate after editing the SVGs)
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')

async function render(svgFile, outFile, w, h, density = 384) {
  const svg = readFileSync(join(pub, svgFile))
  await sharp(svg, { density })
    .resize(w, h, { fit: 'fill' })
    .png()
    .toFile(join(pub, outFile))
  console.log(`wrote ${outFile} (${w}x${h})`)
}

await render('og-image.svg', 'og-image.png', 1200, 630, 144)
await render('favicon.svg', 'favicon-32.png', 32, 32, 512)
await render('favicon.svg', 'apple-touch-icon.png', 180, 180, 512)
console.log('done')
