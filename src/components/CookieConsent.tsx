import { useState } from 'react'
import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useCookies } from '../contexts/CookieContext'
import type { CookiePreferences } from '../contexts/CookieContext'
import { useLanguage } from '../contexts/LanguageContext'

function CookieConsent() {
  const { language } = useLanguage()
  const { showBanner, preferences, acceptAll, rejectAll, savePreferences, closeSettings } = useCookies()
  const [showDetails, setShowDetails] = useState(false)
  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(preferences)

  if (!showBanner) return null

  const handleSave = () => {
    savePreferences(tempPreferences)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return
    setTempPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const cookieOptions: Array<{
    key: keyof CookiePreferences
    title: string
    description: string
    locked?: boolean
  }> = [
    {
      key: 'necessary',
      title: language === 'fr' ? 'Essentiels' : 'Essential',
      description:
        language === 'fr'
          ? 'Indispensables au bon fonctionnement du site.'
          : 'Required for the website to work properly.',
      locked: true,
    },
    {
      key: 'preferences',
      title: language === 'fr' ? 'Préférences' : 'Preferences',
      description:
        language === 'fr'
          ? 'Mémorisent vos choix, comme la langue.'
          : 'Remember choices such as your language.',
    },
    {
      key: 'analytics',
      title: language === 'fr' ? 'Mesure d’audience' : 'Analytics',
      description:
        language === 'fr'
          ? 'Nous aident à améliorer le site.'
          : 'Help us improve the website.',
    },
    {
      key: 'marketing',
      title: language === 'fr' ? 'Marketing' : 'Marketing',
      description:
        language === 'fr'
          ? 'Permettent de mesurer nos campagnes.'
          : 'Allow us to measure our campaigns.',
    },
  ]

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5">
      <div
        role="dialog"
        aria-label={language === 'fr' ? 'Choix des cookies' : 'Cookie choices'}
        className={`pointer-events-auto relative overflow-hidden rounded-[1.75rem] bg-neutral-900 text-white shadow-[0_24px_80px_rgba(0,0,0,0.38)] ring-1 ring-white/10 animate-slide-up ${
          showDetails ? 'mx-auto max-w-3xl' : 'max-w-md'
        }`}
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-20 h-24 w-40 rounded-full bg-accent-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-900">
                <ShieldCheckIcon className="h-4 w-4" />
              </span>
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Privacy control
              </span>
            </div>
            <button
              onClick={closeSettings}
              className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={language === 'fr' ? 'Fermer' : 'Close'}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>

          {!showDetails ? (
            <div className="p-5 sm:p-6">
              <h3 className="max-w-xs font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
                {language === 'fr' ? 'Votre visite, vos règles.' : 'Your visit, your rules.'}
              </h3>
              <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-white/60">
                {language === 'fr'
                  ? 'Nous utilisons quelques cookies pour mémoriser vos choix et comprendre ce qui fonctionne.'
                  : 'We use a few cookies to remember your choices and understand what works.'}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={acceptAll}
                  className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-brand-50"
                >
                  <CheckIcon className="h-4 w-4" />
                  {language === 'fr' ? 'Ça me va' : 'Sounds good'}
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15"
                >
                  <AdjustmentsHorizontalIcon className="h-4 w-4" />
                  {language === 'fr' ? 'Je choisis' : 'Let me choose'}
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-xl px-3 py-2.5 text-xs font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  {language === 'fr' ? 'Essentiels seulement' : 'Essential only'}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6">
              <div className="mb-5">
                <h3 className="font-display text-xl font-semibold">
                  {language === 'fr' ? 'Composez votre expérience' : 'Shape your experience'}
                </h3>
                <p className="mt-1 text-xs text-white/50">
                  {language === 'fr'
                    ? 'Activez uniquement ce qui vous convient.'
                    : 'Only enable what works for you.'}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {cookieOptions.map((option) => {
                  const enabled = option.locked || tempPreferences[option.key]

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => togglePreference(option.key)}
                      disabled={option.locked}
                      aria-pressed={enabled}
                      className={`flex min-h-[88px] items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                        enabled
                          ? 'border-brand-400/40 bg-brand-500/15'
                          : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
                      } ${option.locked ? 'cursor-default' : ''}`}
                    >
                      <span>
                        <span className="block text-sm font-semibold">{option.title}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-white/50">
                          {option.description}
                        </span>
                      </span>
                      <span
                        className={`relative h-6 w-11 flex-none rounded-full transition-colors ${
                          enabled ? 'bg-brand-500' : 'bg-white/15'
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-2 py-2 text-xs font-semibold text-white/55 transition hover:text-white"
                >
                  {language === 'fr' ? 'Retour' : 'Back'}
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-brand-50"
                >
                  <CheckIcon className="h-4 w-4" />
                  {language === 'fr' ? 'Enregistrer mes choix' : 'Save my choices'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
