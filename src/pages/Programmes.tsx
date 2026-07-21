import { useLanguage } from '../contexts/LanguageContext'
import { programmes } from '../data/siteContent'
import {
  CheckIcon,
  ArrowRightIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { OptimizedImage } from '../components/OptimizedImage'

// Images professionnelles pour chaque programme (2 par programme)
const programmeImages = {
  freelances: [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80',
  ],
  etudiants: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80',
  ],
  'open-source': [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
  ],
  networking: [
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  ],
}

// Détails enrichis pour chaque programme
const programmeDetails = {
  freelances: {
    benefits: [
      'Facturation simplifiée et automatisée',
      'Gestion complète de la TVA et fiscalité',
      'Contrats pré-rédigés et personnalisables',
      'Support juridique et administratif',
      'Statut professionnel reconnu',
      'Accès à des projets premium',
    ],
    benefitsEn: [
      'Simplified and automated invoicing',
      'Complete VAT and tax management',
      'Pre-written and customizable contracts',
      'Legal and administrative support',
      'Recognized professional status',
      'Access to premium projects',
    ],
    stats: [
      { label: 'Freelances actifs', labelEn: 'Active freelancers', value: '50+' },
      { label: 'Projets livrés', labelEn: 'Projects delivered', value: '200+' },
      { label: 'Satisfaction', labelEn: 'Satisfaction', value: '98%' },
    ],
    guarantees: [
      'Cadre légal 100% conforme',
      'Support administratif dédié',
      'Facturation sous 24h',
      'Protection juridique incluse',
    ],
    guaranteesEn: [
      '100% compliant legal framework',
      'Dedicated administrative support',
      'Invoicing within 24h',
      'Legal protection included',
    ],
  },
  etudiants: {
    benefits: [
      'Projets réels en production',
      'Mentorat personnalisé par expert',
      'Code reviews hebdomadaires',
      'Portfolio professionnel valorisé',
      'Certification de compétences',
      'Opportunités d\'embauche',
    ],
    benefitsEn: [
      'Real projects in production',
      'Personalized mentoring by expert',
      'Weekly code reviews',
      'Valued professional portfolio',
      'Skills certification',
      'Hiring opportunities',
    ],
    stats: [
      { label: 'Stagiaires formés', labelEn: 'Trainees trained', value: '100+' },
      { label: 'Taux d\'embauche', labelEn: 'Hiring rate', value: '75%' },
      { label: 'Projets en prod', labelEn: 'Projects in prod', value: '150+' },
    ],
    guarantees: [
      'Projets réels garantis',
      'Mentor dédié expérimenté',
      'Certification à la fin',
      'Possibilité d\'embauche',
    ],
    guaranteesEn: [
      'Real projects guaranteed',
      'Dedicated experienced mentor',
      'Certification at the end',
      'Hiring possibility',
    ],
  },
  'open-source': {
    benefits: [
      'Visibilité internationale',
      'Contributions valorisées',
      'Apprentissage collaboratif',
      'Networking avec experts',
      'Portfolio technique solide',
      'Reconnaissance communautaire',
    ],
    benefitsEn: [
      'International visibility',
      'Valued contributions',
      'Collaborative learning',
      'Networking with experts',
      'Strong technical portfolio',
      'Community recognition',
    ],
    stats: [
      { label: 'Contributeurs', labelEn: 'Contributors', value: '200+' },
      { label: 'Projets actifs', labelEn: 'Active projects', value: '30+' },
      { label: 'Stars GitHub', labelEn: 'GitHub stars', value: '5K+' },
    ],
    guarantees: [
      'Projets professionnels uniquement',
      'Code review par experts',
      'Reconnaissance publique',
      'Mentorat communautaire',
    ],
    guaranteesEn: [
      'Professional projects only',
      'Code review by experts',
      'Public recognition',
      'Community mentoring',
    ],
  },
  networking: {
    benefits: [
      'Accès réseau clients premium',
      'Projets innovants exclusifs',
      'Événements tech privés',
      'Workshops avec experts',
      'Meetups développeurs',
      'Conférences techniques',
    ],
    benefitsEn: [
      'Access to premium client network',
      'Exclusive innovative projects',
      'Private tech events',
      'Workshops with experts',
      'Developer meetups',
      'Technical conferences',
    ],
    stats: [
      { label: 'Membres actifs', labelEn: 'Active members', value: '300+' },
      { label: 'Événements/an', labelEn: 'Events/year', value: '50+' },
      { label: 'Clients partenaires', labelEn: 'Partner clients', value: '100+' },
    ],
    guarantees: [
      'Accès réseau exclusif',
      'Événements premium',
      'Networking facilité',
      'Opportunités régulières',
    ],
    guaranteesEn: [
      'Exclusive network access',
      'Premium events',
      'Facilitated networking',
      'Regular opportunities',
    ],
  },
}

type ProgrammeDetail = (typeof programmeDetails)[keyof typeof programmeDetails]

function ProgrammeDetailSection({
  programme,
  details,
  images,
  index,
  language,
}: {
  programme: (typeof programmes)[number]
  details: ProgrammeDetail | undefined
  images: string[]
  index: number
  language: 'fr' | 'en'
}) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      id={programme.id}
      ref={elementRef}
      className="scroll-mt-20"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Contenu avec animations variées */}
        <div
          className={`space-y-8 transition-all duration-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : index % 2 === 0
              ? '-translate-x-12 opacity-0 scale-95'
              : 'translate-x-12 opacity-0 scale-95'
          } ${index % 2 === 1 ? 'lg:order-2' : ''}`}
        >
          {/* Badge avec animation de bounce */}
          <div 
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-50 to-brand-100 px-4 py-2 text-xs font-semibold text-brand-600 shadow-sm transition-all duration-500 hover:shadow-md hover:scale-105 ${
              isVisible ? 'translate-y-0 opacity-100 scale-100 rotate-0' : 'translate-y-6 opacity-0 scale-90 rotate-3'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
              {programme.icon}
            </div>
            <span>
              {language === 'fr' ? programme.title : programme.titleEn}
            </span>
          </div>

          {/* Titre avec animation de fade et scale */}
          <h2 
            className={`font-display text-3xl leading-tight text-ink transition-all duration-1000 ease-out md:text-4xl lg:text-5xl ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {language === 'fr' ? programme.title : programme.titleEn}
          </h2>

          {/* Slogan avec animation de slide */}
          <p 
            className={`text-xl font-semibold text-brand-600 transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {language === 'fr' ? programme.slogan : programme.sloganEn}
          </p>

          {/* Description avec animation de fade */}
          <p 
            className={`text-lg leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {language === 'fr'
              ? programme.description
              : programme.descriptionEn}
          </p>

          {/* Features avec animation staggered */}
          <Card 
            elevation="md" 
            className={`transition-all duration-700 ${
              isVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-10 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <StarIcon className="h-6 w-6 text-brand-500" />
              <h3 className="font-semibold text-ink">
                {language === 'fr' ? 'Avantages' : 'Benefits'}
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(language === 'fr'
                ? details?.benefits
                : details?.benefitsEn
              )?.map((benefit, idx) => (
                <div
                  key={idx}
                  className={`group flex items-start gap-3 transition-all duration-500 hover:translate-x-1 ${
                    isVisible 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-6 opacity-0'
                  }`}
                  style={{ transitionDelay: `${600 + idx * 100}ms` }}
                >
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="text-sm leading-relaxed text-neutral-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Garanties */}
          {details?.guarantees && (
            <Card elevation="md" className="transition-all duration-1000 delay-600">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                <h3 className="font-semibold text-ink">
                  {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(language === 'fr'
                  ? details.guarantees
                  : details.guaranteesEn
                )?.map((guarantee, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2"
                  >
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                    <span className="text-sm text-neutral-600">
                      {guarantee}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* CTA spécifique selon le programme */}
          <div className="pt-4 transition-all duration-1000 delay-700">
            {programme.id === 'freelances' && (
              <Button
                href="https://freelance.kobecorporation.com"
                disabled
                variant="primary"
                size="lg"
                icon={<ArrowRightIcon className="h-5 w-5" />}
                iconPosition="right"
              >
                {language === 'fr'
                  ? 'Rejoindre le programme Freelance'
                  : 'Join the Freelance Program'}
              </Button>
            )}
            {programme.id === 'etudiants' && (
              <Button
                href="https://internship.kobecorporation.com"
                disabled
                variant="primary"
                size="lg"
                icon={<ArrowRightIcon className="h-5 w-5" />}
                iconPosition="right"
              >
                {language === 'fr'
                  ? 'Postuler pour un stage'
                  : 'Apply for an internship'}
              </Button>
            )}
            {programme.id === 'open-source' && (
              <Button
                href="https://open-source.kobecorporation.com"
                disabled
                variant="primary"
                size="lg"
                icon={<ArrowRightIcon className="h-5 w-5" />}
                iconPosition="right"
              >
                {language === 'fr'
                  ? 'Voir nos projets GitHub'
                  : 'View our GitHub projects'}
              </Button>
            )}
            {programme.id === 'networking' && (
              <Button
                href="https://community.kobecorporation.com"
                disabled
                variant="primary"
                size="lg"
                icon={<ArrowRightIcon className="h-5 w-5" />}
                iconPosition="right"
              >
                {language === 'fr'
                  ? 'Rejoindre la communauté'
                  : 'Join the community'}
              </Button>
            )}
          </div>
        </div>

        {/* Images avec animations variées */}
        <div
          className={`space-y-6 transition-all duration-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : index % 2 === 0
              ? 'translate-x-12 opacity-0 scale-95'
              : '-translate-x-12 opacity-0 scale-95'
          } ${index % 2 === 1 ? 'lg:order-1' : ''}`}
          style={{ transitionDelay: '600ms' }}
        >
          {images.map((imageUrl, imgIndex) => (
            <div
              key={imgIndex}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                imgIndex === 0 ? 'lg:h-80' : 'lg:h-72'
              } ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                  : imgIndex % 2 === 0 
                    ? 'translate-y-12 opacity-0 scale-90 rotate-3' 
                    : 'translate-y-12 opacity-0 scale-90 -rotate-3'
              }`}
              style={{ transitionDelay: `${700 + imgIndex * 200}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />

              {/* Image avec animation de zoom améliorée */}
              <OptimizedImage
                src={imageUrl}
                alt={`${language === 'fr' ? programme.title : programme.titleEn} - ${language === 'fr' ? 'Illustration' : 'Illustration'} ${imgIndex + 1}`}
                width={800}
                height={600}
                priority={imgIndex === 0 ? "high" : "low"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-115 group-hover:rotate-1"
              />

              {/* Badge sur l'image */}
              <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                  <p className="text-xs font-semibold text-ink">
                    {language === 'fr' ? 'Programme Premium' : 'Premium Program'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Programmes() {
  const { language } = useLanguage()
  const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.2 })
  const seo = getSEOData('/programmes', language)

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
              <Badge variant="primary" icon={<RocketLaunchIcon className="h-4 w-4 animate-pulse" />}>
                {language === 'fr' ? 'Programmes de Formation' : 'Training Programs'}
              </Badge>
            </div>
            <h1 className={`mb-6 font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${introVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              {language === 'fr' ? 'Nos Programmes de Développement' : 'Our Development Programs'}
            </h1>
            <p className={`mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-neutral-700 transition-all duration-1000 ease-out md:text-xl ${introVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '450ms' }}>
              {language === 'fr'
                ? 'Rejoignez une communauté dynamique de développeurs passionnés et accédez à des programmes de formation d\'excellence.'
                : 'Join a dynamic community of passionate developers and access excellence training programs.'}
            </p>

            {/* Description enriched */}
            <p className={`mx-auto mb-6 max-w-2xl text-base leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${introVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              {language === 'fr'
                ? 'Que vous soyez freelance, étudiant ou développeur open source, découvrez des opportunités qui transforment votre carrière. Formation pratique, mentorat personnalisé et accompagnement professionnel pour votre réussite.'
                : 'Whether you\'re a freelancer, student or open source developer, discover opportunities that transform your career. Practical training, personalized mentoring and professional support for your success.'}
            </p>
          </div>
        </div>
      </section>

      {/* Programmes avec animations */}
      <div className="space-y-32">
        {programmes.map((programme, index) => (
          <ProgrammeDetailSection
            key={programme.id}
            programme={programme}
            details={programmeDetails[programme.id as keyof typeof programmeDetails]}
            images={programmeImages[programme.id as keyof typeof programmeImages] || []}
            index={index}
            language={language}
          />
        ))}
      </div>

      {/* CTA Final amélioré */}
      <div className="mt-32">
        <Card elevation="lg" className="group relative mx-auto max-w-4xl p-10 md:p-16">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Particules décoratives */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="absolute top-20 right-20 h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-20 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm">
              <UserGroupIcon className="h-4 w-4 animate-pulse" />
              <span>{language === 'fr' ? 'Rejoignez-nous' : 'Join us'}</span>
            </div>

            <h2 className="mb-6 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-4xl">
              {language === 'fr'
                ? 'Prêt à Rejoindre Notre Communauté ?'
                : 'Ready to Join Our Community?'}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-neutral-600">
              {language === 'fr'
                ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous accompagner dans votre développement professionnel. Rejoignez une communauté dynamique de développeurs passionnés.'
                : 'Contact us to discuss your project and discover how we can support you in your professional development. Join a dynamic community of passionate developers.'}
            </p>

            <Button
              to="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              {language === 'fr' ? 'Nous contacter' : 'Contact us'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
    </>
  )
}

export default Programmes
