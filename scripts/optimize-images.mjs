import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const INPUT_DIRS = [
  path.join(rootDir, 'public'),
  path.join(rootDir, 'src', 'assets'),
]

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg'])
const WRITE_RETRIES = 4
const WRITE_RETRY_MS = 120

/**
 * Génère des variantes .webp et .avif à côté de chaque raster source.
 * Les originaux sont conservés tels quels (fallback <img>).
 */
async function collectRasters(dir) {
  /** @type {string[]} */
  const files = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return files
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectRasters(full)))
      continue
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (RASTER_EXT.has(ext)) files.push(full)
  }
  return files
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isTransientFsError(error) {
  const code = error?.code
  return (
    code === 'UNKNOWN' ||
    code === 'EBUSY' ||
    code === 'EPERM' ||
    code === 'EACCES' ||
    code === 'EAGAIN'
  )
}

async function writeIfChanged(outPath, buffer) {
  try {
    const existing = await readFile(outPath)
    if (Buffer.compare(existing, buffer) === 0) return false
  } catch {
    // fichier absent ou illisible → écrire
  }

  await mkdir(path.dirname(outPath), { recursive: true })

  const tmpPath = `${outPath}.${process.pid}.${Date.now()}.tmp`
  let lastError

  for (let attempt = 1; attempt <= WRITE_RETRIES; attempt += 1) {
    try {
      await writeFile(tmpPath, buffer)
      try {
        await rename(tmpPath, outPath)
      } catch (renameError) {
        // Sur Windows, rename peut échouer si la cible est verrouillée → fallback overwrite
        await writeFile(outPath, buffer)
        await rm(tmpPath, { force: true }).catch(() => {})
      }
      return true
    } catch (error) {
      lastError = error
      await rm(tmpPath, { force: true }).catch(() => {})
      if (!isTransientFsError(error) || attempt === WRITE_RETRIES) break
      await sleep(WRITE_RETRY_MS * attempt)
    }
  }

  throw lastError
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function optimizeOne(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const base = filePath.slice(0, -ext.length)
  const webpPath = `${base}.webp`
  const avifPath = `${base}.avif`

  const input = sharp(filePath, { failOn: 'none' })
  const meta = await input.metadata()
  const srcStat = await stat(filePath)

  // PNG avec alpha : préserver la transparence
  const hasAlpha = Boolean(meta.hasAlpha)

  const webpBuf = await sharp(filePath, { failOn: 'none' })
    .webp({ quality: 82, alphaQuality: 90, effort: 4 })
    .toBuffer()

  const avifBuf = await sharp(filePath, { failOn: 'none' })
    .avif({ quality: hasAlpha ? 60 : 55, effort: 4 })
    .toBuffer()

  const wroteWebp = await writeIfChanged(webpPath, webpBuf)
  const wroteAvif = await writeIfChanged(avifPath, avifBuf)

  const rel = path.relative(rootDir, filePath)
  console.log(
    `  ${rel} (${formatKb(srcStat.size)}) → webp ${formatKb(webpBuf.length)}${wroteWebp ? '' : ' (inchangé)'}, avif ${formatKb(avifBuf.length)}${wroteAvif ? '' : ' (inchangé)'}`,
  )

  return {
    src: srcStat.size,
    webp: webpBuf.length,
    avif: avifBuf.length,
  }
}

async function main() {
  console.log('Optimisation images → WebP + AVIF…')
  const files = (await Promise.all(INPUT_DIRS.map(collectRasters))).flat()

  if (files.length === 0) {
    console.log('Aucune image raster trouvée.')
    return
  }

  let totalSrc = 0
  let totalWebp = 0
  let totalAvif = 0
  let failed = 0

  for (const file of files) {
    try {
      const sizes = await optimizeOne(file)
      totalSrc += sizes.src
      totalWebp += sizes.webp
      totalAvif += sizes.avif
    } catch (error) {
      failed += 1
      const rel = path.relative(rootDir, file)
      console.warn(`  ⚠ skip ${rel}: ${error?.code || error?.message || error}`)
    }
  }

  console.log(
    `Terminé: ${files.length - failed}/${files.length} image(s). Originaux ${formatKb(totalSrc)} → WebP ${formatKb(totalWebp)} / AVIF ${formatKb(totalAvif)}`,
  )

  // Ne bloque plus npm run dev si un fichier Windows est momentanément verrouillé
  if (failed > 0) {
    console.warn(`optimize-images: ${failed} image(s) ignorée(s) (verrou FS / OneDrive / antivirus).`)
  }
}

main().catch((error) => {
  console.error('optimize-images échoué:', error)
  process.exit(1)
})
