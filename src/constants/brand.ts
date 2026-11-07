/** Assets brand KOBE Corporation — logos 1.1 + OG Meta
 *
 * Priorité : logo AVEC fond (full). Le nbg est réservé aux besoins spécifiques.
 */

/** Logo avec fond noir — usage officiel prioritaire (UI, favicon, header/footer) */
export const BRAND_LOGO_FULL_PATH = '/logo/full.png'

/** Logo transparent — usages spécifiques uniquement */
export const BRAND_LOGO_NBG_PATH = '/logo/nbg.png'

/** Favicon navigateur (dérivé du logo full) */
export const BRAND_FAVICON_PATH = '/favicon.png'

/** Alias UI / schema : logo officiel avec fond */
export const BRAND_IMAGE_PATH = BRAND_LOGO_FULL_PATH
export const BRAND_IMAGE_URL = `https://www.kobecorporation.com${BRAND_LOGO_FULL_PATH}`
export const BRAND_LOGO_FULL_URL = `https://www.kobecorporation.com${BRAND_LOGO_FULL_PATH}`
export const BRAND_LOGO_NBG_URL = `https://www.kobecorporation.com${BRAND_LOGO_NBG_PATH}`

/** Image Open Graph / Twitter / LinkedIn (1200×630 — format recommandé Meta) */
export const OG_IMAGE_PATH = '/og-image.png'
export const OG_IMAGE_URL = `https://www.kobecorporation.com${OG_IMAGE_PATH}`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_TYPE = 'image/png'

export const SITE_BASE_URL = 'https://www.kobecorporation.com'

/** URLs publiques stables pour téléchargement / référence presse */
export const BRAND_LOGO_PUBLIC_ROUTES = {
  full: '/logo/full',
  nbg: '/logo/nbg',
} as const
