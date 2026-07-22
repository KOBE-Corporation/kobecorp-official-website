import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Button } from '../ui/Button'

function MissionsSection() {
  const { t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const missions = [
    {
      icon: ShieldCheckIcon,
      title: t('home.missions.secure.title'),
      text: t('home.missions.secure.text'),
    },
    {
      icon: SparklesIcon,
      title: t('home.missions.modernize.title'),
      text: t('home.missions.modernize.text'),
    },
    {
      icon: CheckBadgeIcon,
      title: t('home.missions.measure.title'),
      text: t('home.missions.measure.text'),
    },
  ]

  return (
    <section
      ref={elementRef}
      className="relative overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white"
    >
      {/* Atmosphere légère sur toute la section */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(10,122,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-400/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 p-8 md:grid-cols-2 md:items-stretch md:gap-0 md:p-0 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Colonne gauche */}
        <div
          className={`flex flex-col justify-center space-y-8 md:p-10 lg:p-12 transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              {t('home.missions.eyebrow')}
            </p>
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">
              {t('home.missions.title')}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-neutral-600">
              {t('home.missions.subtitle')}
            </p>
          </div>

          <ul className="space-y-4">
            {missions.map((mission, index) => {
              const Icon = mission.icon
              return (
                <li
                  key={mission.title}
                  className={`group/item flex gap-4 rounded-2xl border border-transparent bg-transparent p-3 transition-all duration-500 hover:border-brand-100 hover:bg-brand-50/50 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: `${180 + index * 120}ms` }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover/item:bg-brand-500 group-hover/item:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-semibold text-ink">
                      {mission.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-neutral-600">
                      {mission.text}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Panneau « Pourquoi KOBE » */}
        <div
          className={`relative overflow-hidden bg-brand-600 text-white md:min-h-[420px] transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Fond expressif */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800" />
          <div
            className="absolute -right-16 top-10 h-48 w-48 rounded-full border border-white/20"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-500/25 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute right-10 bottom-16 h-16 w-16 rotate-12 rounded-2xl border-2 border-white/25"
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10 p-8 md:p-10 lg:p-12">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                {t('home.missions.whyEyebrow')}
              </div>

              <h3 className="max-w-sm font-display text-2xl leading-snug md:text-3xl">
                {t('home.missions.whyTitle')}
              </h3>

              <p className="max-w-md text-base leading-relaxed text-white/85">
                {t('home.missions.whyText')}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                to="/contact"
                variant="secondary"
                size="md"
                className="w-full justify-center border-0 bg-white text-brand-700 hover:bg-brand-50 hover:text-brand-800"
                icon={<ArrowRightIcon className="h-4 w-4" />}
                iconPosition="right"
              >
                {t('home.missions.cta')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionsSection
