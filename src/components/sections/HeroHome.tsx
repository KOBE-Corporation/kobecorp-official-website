import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { HeroBackground } from './HeroBackground'

function HeroHome() {
  const { t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <HeroBackground ref={elementRef} variant="default">
      <div className="mx-auto max-w-4xl text-center">
        <div
          className={`mb-8 flex justify-center transition-all duration-800 ease-out ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <Badge variant="primary">{companyInfo.slogan}</Badge>
        </div>

        <h1
          className={`mb-6 font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {t('home.hero.title')}
        </h1>

        <p
          className={`mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-neutral-700 transition-all duration-1000 ease-out md:text-xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          {t('home.hero.subtitle')}
        </p>

        <p
          className={`mx-auto mb-10 max-w-2xl text-base leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {t('home.hero.description')}
        </p>

        <div
          className={`mb-16 flex flex-wrap justify-center gap-4 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '750ms' }}
        >
          <Button
            to="/services"
            variant="primary"
            size="lg"
            icon={<ArrowRightIcon className="h-5 w-5" />}
            iconPosition="right"
          >
            {t('home.hero.cta1')}
          </Button>
          <Button to="/contact" variant="secondary" size="lg">
            {t('home.hero.cta2')}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card
          elevation="lg"
          hover={false}
          className={`group relative overflow-hidden transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-16 opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="relative z-10 space-y-6 p-8 text-center md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-600">
              {t('home.mission.title')}
            </p>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
              {t('home.mission.text')}
            </p>
          </div>
        </Card>
      </div>
    </HeroBackground>
  )
}

export default HeroHome
