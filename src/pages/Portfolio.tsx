import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Types de projets (à remplir avec de vrais projets plus tard)
const projectCategories = [
  { id: 'all', label: 'Tous', labelEn: 'All' },
  { id: 'web', label: 'Applications Web', labelEn: 'Web Applications' },
  { id: 'mobile', label: 'Applications Mobiles', labelEn: 'Mobile Applications' },
  { id: 'enterprise', label: 'Solutions Entreprise', labelEn: 'Enterprise Solutions' },
  { id: 'open-source', label: 'Projets Open Source', labelEn: 'Open Source Projects' },
]

// Placeholder pour les projets (à remplir avec de vrais projets)
const projects = [
  {
    id: 1,
    name: 'Projet à venir',
    nameEn: 'Project coming soon',
    category: 'web',
    description: 'Les projets seront ajoutés prochainement.',
    descriptionEn: 'Projects will be added soon.',
    technologies: ['React', 'Node.js'],
    image: null,
  },
]

function Portfolio() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const seo = getSEOData('/portfolio', language)
  const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.2 })

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
      {/* Hero Section avec le même design que Home */}
      <section
        ref={introRef}
        id="hero"
        className="relative pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10 min-h-[450px] lg:min-h-[500px] xl:min-h-[550px] mb-20"
        style={{ isolation: 'isolate' }}
      >
        {/* Modern Background with grid pattern and geometric shapes */}
        <div 
          className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden" 
          style={{ zIndex: 0, willChange: 'transform' }}
          aria-hidden="true"
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,122,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Geometric shapes - Same as Home */}
          <div className="absolute top-20 right-20 h-32 w-32 rounded-2xl border-2 border-brand-300/70 animate-float-shape" style={{ animationDelay: '0s', willChange: 'transform' }} />
          <div className="absolute bottom-32 left-16 h-24 w-24 rounded-full border-2 border-brand-300/65 animate-float-gentle animate-pulse-border" style={{ animationDelay: '1s', willChange: 'transform, opacity' }} />
          <div className="absolute top-1/2 right-1/4 h-20 w-20 border-2 border-brand-300/60 animate-rotate-slow" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', transformOrigin: 'center', animationDelay: '2s', willChange: 'transform' }} />
          <div className="absolute top-40 left-1/3 h-16 w-16 rounded-lg border-2 border-accent-300/60 animate-float-shape" style={{ transform: 'rotate(-15deg)', animationDelay: '0.5s', willChange: 'transform' }} />
          <div className="absolute bottom-40 right-1/3 h-12 w-12 rounded-full border-2 border-accent-300/55 animate-float-gentle animate-pulse-border" style={{ animationDelay: '1.5s', willChange: 'transform, opacity' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className={`mb-8 flex justify-center transition-all duration-800 ease-out ${introVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'}`} style={{ transitionDelay: '150ms' }}>
              <Badge variant="primary" icon={<SparklesIcon className="h-4 w-4 animate-pulse" />}>
                {language === 'fr' ? 'Nos Réalisations' : 'Our Achievements'}
              </Badge>
            </div>
            <h1 className={`mb-6 font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${introVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              {language === 'fr' ? 'Nos Réalisations' : 'Our Achievements'}
            </h1>
            <p className={`mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-neutral-700 transition-all duration-1000 ease-out md:text-xl ${introVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '450ms' }}>
              {language === 'fr'
                ? 'Découvrez les projets innovants et les solutions technologiques que nous avons développées pour nos clients.'
                : 'Discover the innovative projects and technology solutions we have developed for our clients.'}
            </p>
            <p className={`mx-auto mb-6 max-w-2xl text-base leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${introVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              {language === 'fr'
                ? 'Chaque projet raconte une histoire de transformation numérique, d\'innovation et d\'excellence. Explorez nos réalisations dans le développement web, mobile, les solutions d\'entreprise et les projets open source qui démontrent notre expertise et notre passion pour la technologie.'
                : 'Each project tells a story of digital transformation, innovation and excellence. Explore our achievements in web development, mobile, enterprise solutions and open source projects that demonstrate our expertise and passion for technology.'}
            </p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {projectCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0 ${
              selectedCategory === category.id
                ? 'bg-brand-500 text-white shadow-md hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5'
                : 'border border-neutral-200 bg-white text-neutral-700 shadow-subtle hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md hover:-translate-y-0.5'
            }`}
            aria-label={language === 'fr' ? `Filtrer par ${category.label}` : `Filter by ${category.labelEn}`}
          >
            {language === 'fr' ? category.label : category.labelEn}
          </button>
        ))}
      </div>

      {/* Projets */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              elevation="md"
              className="group"
            >
              {/* Image placeholder */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-brand-50 via-brand-100/50 to-accent-50">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-brand-600/5" />
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm font-medium text-neutral-600">
                    {language === 'fr' ? 'Image à venir' : 'Image coming soon'}
                  </p>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="mb-2 font-display text-xl text-ink">
                  {language === 'fr' ? project.name : project.nameEn}
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  {language === 'fr'
                    ? project.description
                    : project.descriptionEn}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 shadow-subtle transition-colors duration-200 hover:bg-brand-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button 
                  className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all duration-200 hover:gap-2 hover:text-brand-700"
                  aria-label={language === 'fr' ? `Voir le projet ${project.name}` : `View project ${project.nameEn}`}
                >
                  <span>{language === 'fr' ? 'Voir le projet' : 'View project'}</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <Card elevation="md" className="mx-auto max-w-md p-12">
            <p className="text-lg text-neutral-700">
              {language === 'fr'
                ? 'Aucun projet dans cette catégorie pour le moment.'
                : 'No projects in this category at the moment.'}
            </p>
          </Card>
        </div>
      )}

      {/* CTA */}
      <div className="mt-24 text-center">
        <Card elevation="lg" className="group relative mx-auto max-w-3xl overflow-hidden p-8 md:p-12">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-accent-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative z-10">
            <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
              {language === 'fr'
                ? 'Votre Projet Est le Prochain ?'
                : 'Is Your Project Next?'}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-neutral-700">
              {language === 'fr'
                ? 'Discutons de votre idée et transformons-la en réalité.'
                : 'Let\'s discuss your idea and turn it into reality.'}
            </p>
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              {language === 'fr' ? 'Discutons de votre idée' : 'Let\'s discuss your idea'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
    </>
  )
}

export default Portfolio
