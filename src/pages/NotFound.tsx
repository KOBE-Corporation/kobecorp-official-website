import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

function NotFound() {
  const { language } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <>
      <SEO
        title={language === 'fr' ? 'Page introuvable - 404' : 'Page not found - 404'}
        description={
          language === 'fr'
            ? "La page que vous recherchez n'existe pas ou n'est plus disponible."
            : 'The page you are looking for does not exist or is no longer available.'
        }
        noindex={true}
      />
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-8 px-6 py-14">
        <Card
          ref={elementRef}
          elevation="lg"
          className={`group relative w-full p-12 text-center md:p-16 animate-page-enter ${
            isVisible ? 'animate-page-enter-visible' : 'animate-page-enter-hidden'
          }`}
        >
          <div className="relative space-y-6">
            <div
              className={`group/badge relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-md transition-all duration-700 delay-100 hover:border-brand-300 hover:shadow-lg hover:-translate-y-0.5 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-50/50 to-transparent translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-brand-50/50 opacity-0 transition-opacity duration-300 group-hover/badge:opacity-100" />
              <ExclamationTriangleIcon className="relative z-10 h-4 w-4 animate-pulse transition-transform duration-300 group-hover/badge:rotate-12 group-hover/badge:scale-110" />
              <span className="relative z-10 uppercase tracking-[0.2em] transition-colors duration-300 group-hover/badge:text-brand-700">
                {language === 'fr' ? 'Erreur 404' : 'Error 404'}
              </span>
            </div>

            <h1
              className={`font-display text-4xl leading-tight text-ink transition-all duration-1000 delay-200 md:text-5xl lg:text-6xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {language === 'fr' ? 'Page introuvable' : 'Page not found'}
            </h1>

            <p
              className={`mx-auto max-w-xl text-lg leading-relaxed text-neutral-600 transition-all duration-1000 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {language === 'fr'
                ? "La page que vous recherchez n'existe pas ou n'est plus disponible. Retournez vers l'accueil pour explorer les services de KOBE Corporation."
                : 'The page you are looking for does not exist or is no longer available. Return home to explore KOBE Corporation services.'}
            </p>

            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <Button
                to="/"
                variant="primary"
                size="md"
                icon={<HomeIcon className="h-4 w-4" />}
                iconPosition="left"
              >
                {language === 'fr' ? "Revenir à l'accueil" : 'Back to home'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default NotFound
