import type { Language } from '../../utils/i18n'

interface LanguageFlagProps {
  language: Language
  className?: string
}

/** Drapeaux SVG : France (bleu-blanc-rouge) et Royaume-Uni (Union Jack) */
export function LanguageFlag({ language, className = 'h-4 w-5' }: LanguageFlagProps) {
  if (language === 'fr') {
    return (
      <svg
        viewBox="0 0 30 20"
        className={`shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10 ${className}`}
        aria-hidden="true"
      >
        <rect width="10" height="20" fill="#002395" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#ED2939" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 60 30"
      className={`shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10 ${className}`}
      aria-hidden="true"
    >
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}
