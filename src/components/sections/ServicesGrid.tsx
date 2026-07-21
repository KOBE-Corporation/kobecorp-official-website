import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { services } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useLocalizedPath } from '../../hooks/useLocalizedPath'
import { Card } from '../ui/Card'

interface ServicesGridProps {
  showIntro?: boolean
}

function ServicesGrid({ showIntro = true }: ServicesGridProps) {
  const { language, t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const lp = useLocalizedPath()

  return (
    <section id="services" ref={elementRef} className="space-y-10 md:space-y-12">
      {showIntro && (
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-1000 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {t('home.services.title')}
            </p>
            <h2 className="font-display text-3xl text-ink">
              {t('home.services.title')}
            </h2>
            <p className="text-neutral-600">
              {language === 'fr'
                ? 'Des solutions technologiques complètes pour transformer vos idées en réalité.'
                : 'Complete technology solutions to transform your ideas into reality.'}
            </p>
          </div>
          <NavLink
            to={lp('/contact')}
            className="group hidden items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md md:inline-flex"
          >
            {language === 'fr' ? 'Planifier un rendez-vous' : 'Schedule a meeting'}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </NavLink>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Card
            key={service.slug}
            elevation="md"
            className={`group flex h-full flex-col gap-4 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {/* Icône avec fond épuré */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 group-hover:bg-brand-100 group-hover:scale-105">
              <div className="text-brand-500 transition-all duration-300 group-hover:scale-110">
                {service.icon}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-brand-500">
              {language === 'fr' ? service.title : service.titleEn}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
              {language === 'fr' ? service.desc : service.descEn}
            </p>
            
            <div className="mt-auto pt-4">
              <NavLink
                to={lp('/services')}
                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-all duration-300 hover:gap-3 hover:text-brand-600 focus:outline-none"
              >
                <span>
                  {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                </span>
                <ArrowRightIcon className="h-4 w-4 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:scale-110" />
              </NavLink>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ServicesGrid
