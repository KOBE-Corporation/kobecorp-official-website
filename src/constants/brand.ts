/** Assets brand KOBE Corporation — logos 1.1 + OG Meta */

/** Logo transparent (UI, favicon, header/footer, schema logo) */
export const BRAND_LOGO_NBG_PATH = '/logo/nbg.png'

/** Logo avec fond noir (référence presse) */
export const BRAND_LOGO_FULL_PATH = '/logo/full.png'

/** Favicon navigateur (nbg redimensionné) */
export const BRAND_FAVICON_PATH = '/favicon.png'

/** Alias UI */
export const BRAND_IMAGE_PATH = BRAND_LOGO_NBG_PATH
export const BRAND_IMAGE_URL = `https://www.kobecorporation.com${BRAND_LOGO_NBG_PATH}`
export const BRAND_LOGO_NBG_URL = `https://www.kobecorporation.com${BRAND_LOGO_NBG_PATH}`
export const BRAND_LOGO_FULL_URL = `https://www.kobecorporation.com${BRAND_LOGO_FULL_PATH}`

/** Image Open Graph / Twitter / LinkedIn (1200×630 — format recommandé Meta) */
export const OG_IMAGE_PATH = '/og-image.png'
export const OG_IMAGE_URL = `https://www.kobecorporation.com${OG_IMAGE_PATH}`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_TYPE = 'image/png'

export const SITE_BASE_URL = 'https://www.kobecorporation.com'

/** URLs publiques stables pour téléchargement / référence presse */
export const BRAND_LOGO_PUBLIC_ROUTES = {
  nbg: '/logo/nbg',
  full: '/logo/full',
} as const
