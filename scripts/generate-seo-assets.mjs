/**
 * Génère les assets SEO pour Google / Meta / Twitter :
 * - og-image.png (1200×630) — aperçus de liens Facebook, LinkedIn, WhatsApp, etc.
 * - apple-touch-icon.png (180×180)
 * - favicon.ico (copie PNG pour les crawlers qui demandent .ico)
 */
import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')
const logoPath = path.join(publicDir, 'logo-nom.jpeg')
const faviconPngPath = path.join(publicDir, 'favicon.png')

const OG_WIDTH = 1200
const OG_HEIGHT = 630
const LOGO_SIZE = 280

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function generateOgImage() {
  const logo = await sharp(logoPath)
    .resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  // Fond dégradé brand (approximation via SVG)
  const background = Buffer.from(`
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a7aff"/>
          <stop offset="55%" style="stop-color:#0369a1"/>
          <stop offset="100%" style="stop-color:#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <text x="600" y="480" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">KOBE Corporation</text>
      <text x="600" y="530" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-family="Arial, Helvetica, sans-serif" font-size="26">Build Your Own Legacy</text>
    </svg>
  `)

  const outPath = path.join(publicDir, 'og-image.png')
  await sharp(background)
    .composite([
      {
        input: logo,
        top: Math.round((OG_HEIGHT - LOGO_SIZE) / 2) - 40,
        left: Math.round((OG_WIDTH - LOGO_SIZE) / 2),
      },
    ])
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(outPath)

  console.log(`✓ og-image.png (${OG_WIDTH}×${OG_HEIGHT})`)
  return outPath
}

async function generateAppleTouchIcon() {
  const source = (await exists(faviconPngPath)) ? faviconPngPath : logoPath
  const outPath = path.join(publicDir, 'apple-touch-icon.png')
  await sharp(source)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(outPath)
  console.log('✓ apple-touch-icon.png (180×180)')
}

async function ensureFaviconIco() {
  const source = (await exists(faviconPngPath)) ? faviconPngPath : logoPath
  const outPath = path.join(publicDir, 'favicon.ico')
  // Les navigateurs modernes acceptent un PNG servi sous .ico
  await sharp(source).resize(48, 48).png().toFile(outPath)
  console.log('✓ favicon.ico (48×48)')
}

async function main() {
  if (!(await exists(logoPath))) {
    throw new Error(`Logo introuvable: ${logoPath}`)
  }

  await generateOgImage()
  await generateAppleTouchIcon()
  await ensureFaviconIco()
  console.log('Assets SEO Meta/Google générés.')
}

main().catch((error) => {
  console.error('Génération assets SEO échouée:', error)
  process.exit(1)
})
