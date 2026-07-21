import { useLanguage } from '../contexts/LanguageContext'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { PageHero } from '../components/sections/PageHero'

function Portfolio() {
  const { language } = useLanguage()
  const seo = getSEOData('/portfolio', language)

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <PageHero
          badge={language === 'fr' ? 'Portfolio' : 'Portfolio'}
          badgeIcon={<SparklesIcon className="h-4 w-4" />}
          title={language === 'fr' ? 'Nos réalisations' : 'Our work'}
          subtitle={
            language === 'fr'
              ? 'Les projets clients seront publiés ici prochainement.'
              : 'Client projects will be published here soon.'
          }
        />

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
