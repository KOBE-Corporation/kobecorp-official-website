/**
 * Régénère favicon / logo-nom / apple-touch / og à partir de public/logo/full.png
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')
const fullLogo = path.join(publicDir, 'logo', 'full.png')

const OG_WIDTH = 1200
const OG_HEIGHT = 630
const LOGO_SIZE = 280

async function writePng(input, outName, size, fit = 'cover') {
  const outPath = path.join(publicDir, outName)
  await sharp(input)
    .resize(size, size, { fit, background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png({ compressionLevel: 8 })
    .toFile(outPath)
  console.log(`✓ ${outName} (${size}×${size})`)
}

async function writeLogoNom() {
  const jpeg = path.join(publicDir, 'logo-nom.jpeg')
  const webp = path.join(publicDir, 'logo-nom.webp')
  const avif = path.join(publicDir, 'logo-nom.avif')

  await sharp(fullLogo)
    .resize(512, 512, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(jpeg)
  console.log('✓ logo-nom.jpeg (512×512)')

  await sharp(fullLogo)
    .resize(512, 512, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .webp({ quality: 90 })
    .toFile(webp)
  console.log('✓ logo-nom.webp (512×512)')

  await sharp(fullLogo)
    .resize(512, 512, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .avif({ quality: 65 })
    .toFile(avif)
  console.log('✓ logo-nom.avif (512×512)')
}

async function writeFaviconVariants() {
  await writePng(fullLogo, 'favicon.png', 192, 'cover')
  await writePng(fullLogo, 'favicon-32.png', 32, 'cover')
  await writePng(fullLogo, 'apple-touch-icon.png', 180, 'cover')

  // PNG served as .ico (modern browsers)
  await sharp(fullLogo)
    .resize(48, 48, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'))
  console.log('✓ favicon.ico (48×48)')

  await sharp(fullLogo)
    .resize(192, 192, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'favicon.webp'))
  console.log('✓ favicon.webp (192×192)')

  await sharp(fullLogo)
    .resize(192, 192, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .avif({ quality: 65 })
    .toFile(path.join(publicDir, 'favicon.avif'))
  console.log('✓ favicon.avif (192×192)')
}

async function writeOgImage() {
  const logo = await sharp(fullLogo)
    .resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const background = Buffer.from(`
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="55%" style="stop-color:#111827"/>
          <stop offset="100%" style="stop-color:#020617"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <text x="600" y="500" text-anchor="middle" fill="white" font-family="Georgia, Times, serif" font-size="42" font-weight="700">KOBE Corporation</text>
      <text x="600" y="545" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="Arial, Helvetica, sans-serif" font-size="24">Build Your Own Legacy</text>
    </svg>
  `)

  const pngOut = path.join(publicDir, 'og-image.png')
  await sharp(background)
    .composite([
      {
        input: logo,
        top: Math.round((OG_HEIGHT - LOGO_SIZE) / 2) - 50,
        left: Math.round((OG_WIDTH - LOGO_SIZE) / 2),
      },
    ])
    .png({ compressionLevel: 8 })
    .toFile(pngOut)
  console.log(`✓ og-image.png (${OG_WIDTH}×${OG_HEIGHT})`)

  await sharp(pngOut)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(publicDir, 'og-image.jpg'))
  console.log('✓ og-image.jpg')
}

async function main() {
  await writeFaviconVariants()
  await writeLogoNom()
  await writeOgImage()
  console.log('Brand assets synchronisés depuis logo/full.png')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
