import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Language } from '../utils/i18n'
import { getTranslation } from '../utils/i18n'
import {
  getLocaleFromPath,
  getPreferredLocale,
  isSupportedLocale,
  switchLocaleInPath,
} from '../utils/locale'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const canUseStorage = (): boolean => {
  try {
    const consent = localStorage.getItem('kobe-cookie-consent')
    const prefs = localStorage.getItem('kobe-cookie-preferences')

    if (consent === 'true' && prefs) {
      try {
        const parsed = JSON.parse(prefs)
        return parsed.preferences === true
      } catch {
        return false
      }
    }
    return false
  } catch {
    return false
  }
}

function persistLanguage(lang: Language) {
  if (!canUseStorage()) return
  try {
    localStorage.setItem('kobe-language', lang)
  } catch {
    // ignore
  }
}

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const fromUrl = getLocaleFromPath(window.location.pathname)
    if (fromUrl) return fromUrl
  }
  return getPreferredLocale()
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  // Sync langue ↔ URL + attribut html lang
  useEffect(() => {
    const fromUrl = getLocaleFromPath(location.pathname)
    if (!fromUrl) return

    setLanguageState((prev) => {
      if (prev === fromUrl) return prev
      persistLanguage(fromUrl)
      return fromUrl
    })
    document.documentElement.lang = fromUrl
  }, [location.pathname])

  const setLanguage = (lang: Language) => {
    if (!isSupportedLocale(lang) || lang === language) return

    setLanguageState(lang)
    persistLanguage(lang)
    document.documentElement.lang = lang

    const currentLocale = getLocaleFromPath(location.pathname)
    if (currentLocale) {
      navigate(
        switchLocaleInPath(location.pathname, lang, location.search, location.hash),
        { replace: false },
      )
    }
  }

  const t = (path: string) => getTranslation(language, path)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
