import { useLanguage } from '../contexts/LanguageContext'
import { localizePath } from '../utils/locale'

/** Renvoie une fonction qui préfixe un chemin avec la locale courante */
export function useLocalizedPath() {
  const { language } = useLanguage()

  return (path: string) => localizePath(path, language)
}
