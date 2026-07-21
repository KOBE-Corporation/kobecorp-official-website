import type { Language } from './i18n'

export const SUPPORTED_LOCALES: Language[] = ['fr', 'en']
export const DEFAULT_LOCALE: Language = 'fr'

export function isSupportedLocale(value: string | undefined | null): value is Language {
  return value === 'fr' || value === 'en'
}

/** Extrait la locale du pathname (`/fr/services` → `fr`) */
export function getLocaleFromPath(pathname: string): Language | null {
  const segment = pathname.split('/').filter(Boolean)[0]
  return isSupportedLocale(segment) ? segment : null
}

/** Retire le préfixe de locale (`/fr/services` → `/services`) */
export function stripLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname)
  if (!locale) return pathname || '/'

  const rest = pathname.slice(`/${locale}`.length)
  if (!rest || rest === '/') return '/'
  return rest.startsWith('/') ? rest : `/${rest}`
}

/**
 * Préfixe un chemin interne avec la locale.
 * Conserve query string et hash. Idempotent si déjà préfixé.
 */
export function localizePath(path: string, locale: Language): string {
  if (!path) return `/${locale}`

  // Liens externes : ne pas toucher
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path

  const url = new URL(path, 'https://kobecorporation.local')
  const cleanPath = stripLocale(url.pathname)
  const localizedPath = cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`

  return `${localizedPath}${url.search}${url.hash}`
}

/** Change la locale d'un pathname tout en gardant le reste du chemin */
export function switchLocaleInPath(
  pathname: string,
  newLocale: Language,
  search = '',
  hash = '',
): string {
  const cleanPath = stripLocale(pathname)
  return `${localizePath(cleanPath, newLocale)}${search}${hash}`
}

/** Langue préférée : localStorage → navigateur → défaut */
export function getPreferredLocale(): Language {
  try {
    const saved = localStorage.getItem('kobe-language')
    if (isSupportedLocale(saved)) return saved
  } catch {
    // ignore
  }

  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0]
    if (isSupportedLocale(browserLang)) return browserLang
  }

  return DEFAULT_LOCALE
}
