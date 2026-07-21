import { useLanguage } from '../contexts/LanguageContext'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Portfolio() {
  const { language } = useLanguage()
  const seo = getSEOData('/portfolio', language)
  const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <section
          ref={introRef}
          id="hero"
          className="relative mb-16 pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10 min-h-[380px]"
          style={{ isolation: 'isolate' }}
        >
          <div
            className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,122,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-20 right-20 h-32 w-32 rounded-2xl border-2 border-brand-300/70" />
            <div className="absolute bottom-32 left-16 h-24 w-24 rounded-full border-2 border-brand-300/65" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div
              className={`mb-8 flex justify-center transition-all duration-800 ease-out ${
                introVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'
              }`}
            >
              <Badge variant="primary" icon={<SparklesIcon className="h-4 w-4" />}>
                {language === 'fr' ? 'Portfolio' : 'Portfolio'}
              </Badge>
            </div>
            <h1
              className={`mb-6 font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl ${
                introVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              {language === 'fr' ? 'Nos réalisations' : 'Our work'}
            </h1>
            <p
              className={`mx-auto max-w-2xl text-lg leading-relaxed text-neutral-700 transition-all duration-1000 ease-out ${
                introVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {language === 'fr'
                ? 'Les projets clients seront publiés ici prochainement.'
                : 'Client projects will be published here soon.'}
            </p>
          </div>
        </section>

        <Card elevation="md" hover={false} className="mx-auto max-w-2xl p-10 text-center md:p-14">
          <p className="font-display text-2xl text-ink">
            {language === 'fr' ? 'Projets à venir' : 'Projects coming soon'}
          </p>
          <p className="mt-3 text-neutral-600">
            {language === 'fr'
              ? 'Nous préparons une sélection de réalisations. En attendant, parlons de votre idée.'
              : 'We are preparing a selection of case studies. In the meantime, let’s talk about your idea.'}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              {language === 'fr' ? 'Discutons de votre idée' : "Let's discuss your idea"}
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Portfolio
