import { useLanguage } from '../contexts/LanguageContext'
import { services, process } from '../data/siteContent'
import {
  ChartBarIcon,
  AcademicCapIcon,
  CheckIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import {
  getServiceDetails,
  serviceImages,
  sectionIdMap,
  type ServiceDetail,
} from '../data/servicesPageContent'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { OptimizedImage } from '../components/OptimizedImage'
import { SaaSPricing } from '../components/sections/SaaSPricing'
import { PageHero } from '../components/sections/PageHero'

function MethodologyStep({
  step,
  index,
  language,
}: {
  step: (typeof process)[number]
  index: number
  language: 'fr' | 'en'
}) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const isEven = index % 2 === 0

  return (
    <div
      ref={elementRef}
      className={`relative flex items-center ${
        'justify-center lg:justify-start'
      } ${!isEven ? 'lg:justify-end' : ''}`}
    >
      {/* Point de connexion - masqué sur mobile */}
      <div
        className={`absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-500 text-white shadow-lg transition-all duration-500 group-hover/step:scale-125 group-hover/step:rotate-180 lg:flex ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100 + 500}ms` }}
      >
        <span className="font-display text-lg font-bold">{step.step}</span>
      </div>

      {/* Contenu */}
      <Card
        elevation="md"
        className={`group relative w-full lg:w-[calc(50%-40px)] ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="relative">
          <div className="mb-4 flex items-center gap-4">
            {/* Badge numéro d'étape */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-brand-400/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand-600">
                <span className="font-display text-2xl font-bold">{step.step}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
                {language === 'fr' ? 'Étape' : 'Step'} {step.step}
              </div>
              <h3 className="text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-2xl">
                {language === 'fr' ? step.title : step.titleEn}
              </h3>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {language === 'fr' ? step.description : step.descriptionEn}
          </p>
        </div>
      </Card>
    </div>
  )
}

function ServiceDetailSection({
  service,
  detail,
  images,
  index,
  language,
}: {
  service: (typeof services)[number]
  detail: ServiceDetail
  images: readonly string[]
  index: number
  language: 'fr' | 'en'
}) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const sectionId = sectionIdMap[service.slug] || service.slug

  return (
    <section id={sectionId} ref={elementRef} className="scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Contenu avec animations variées */}
        <div className={`space-y-8 transition-all duration-1000 ${
          isVisible
            ? 'translate-x-0 opacity-100'
            : index % 2 === 0 ? '-translate-x-12 opacity-0 scale-95' : 'translate-x-12 opacity-0 scale-95'
        } ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          {/* Badge avec animation de bounce */}
          <div 
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-50 to-brand-100 px-4 py-2 text-xs font-semibold text-brand-600 shadow-sm transition-all duration-500 hover:shadow-md hover:scale-105 ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-90'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
              {service.icon}
            </div>
            <span>{language === 'fr' ? service.title : service.titleEn}</span>
          </div>

          {/* Titre avec animation de fade et scale */}
          <h2 
            className={`font-display text-3xl leading-tight text-ink transition-all duration-1000 ease-out md:text-4xl lg:text-5xl ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {detail.title}
          </h2>

          {/* Description avec animation de slide */}
          <p 
            className={`text-lg leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {detail.description}
          </p>

          {/* Contenu spécifique selon le service */}
          {service.slug === 'developpement-logiciel' && (
            <div 
              className={`space-y-6 transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {detail.sections?.map((section, idx) => (
                <Card
                  key={idx}
                  elevation="md"
                  className={`group transition-all duration-700 ${
                    isVisible 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-10 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${500 + idx * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
                        {section.subtitle}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Garanties */}
              <Card 
                elevation="md" 
                className={`transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-10 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${800 + (detail.sections?.length || 0) * 150}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.guarantees?.map((guarantee, idx) => (
                    <div 
                      key={idx} 
                      className={`group flex items-start gap-2 transition-all duration-500 hover:translate-x-1 ${
                        isVisible 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-6 opacity-0'
                      }`}
                      style={{ transitionDelay: `${900 + idx * 100}ms` }}
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span className="text-sm text-neutral-600">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {service.slug === 'hebergement-infrastructure' && (
            <div className="space-y-6 transition-all duration-1000 delay-300">
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Caractéristiques Premium' : 'Premium Features'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card elevation="md">
                <h3 className="mb-4 font-semibold text-ink">
                  {language === 'fr' ? 'Plans d\'hébergement' : 'Hosting Plans'}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {detail.plans?.map((plan, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-xl border-2 border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
                    >
                      {/* Gradient au hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      <div className="relative">
                        <p className="mb-1 font-display text-xl font-semibold text-ink">
                          {plan.name}
                        </p>
                        <p className="mb-3 text-xs text-neutral-500">
                          {plan.desc}
                        </p>
                        {plan.features && (
                          <ul className="space-y-1">
                            {plan.features.map((feat, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-xs text-neutral-600">
                                <div className="h-1 w-1 rounded-full bg-brand-500" />
                                {feat}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Garanties */}
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Nos Engagements' : 'Our Commitments'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.guarantees?.map((guarantee, idx) => (
                    <div 
                      key={idx} 
                      className={`group flex items-start gap-2 transition-all duration-500 hover:translate-x-1 ${
                        isVisible 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-6 opacity-0'
                      }`}
                      style={{ transitionDelay: `${900 + idx * 100}ms` }}
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span className="text-sm text-neutral-600">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {service.slug === 'consultation-audit' && (
            <div className="space-y-6 transition-all duration-1000 delay-300">
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <ChartBarIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Services Inclus' : 'Services Included'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.services?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                      <span className="text-sm text-neutral-600">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <RocketLaunchIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Livrables' : 'Deliverables'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {detail.deliverables?.map((deliverable, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                      <span className="text-sm text-neutral-600">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Garanties */}
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.guarantees?.map((guarantee, idx) => (
                    <div 
                      key={idx} 
                      className={`group flex items-start gap-2 transition-all duration-500 hover:translate-x-1 ${
                        isVisible 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-6 opacity-0'
                      }`}
                      style={{ transitionDelay: `${900 + idx * 100}ms` }}
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span className="text-sm text-neutral-600">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {service.slug === 'formation-bootcamp' && (
            <div className="space-y-6 transition-all duration-1000 delay-300">
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <AcademicCapIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Programmes de Formation' : 'Training Programs'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.programs?.map((program, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                      <span className="text-sm text-neutral-600">{program}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <ClockIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Formats Disponibles' : 'Available Formats'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {detail.formats?.map((format, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                      <span className="text-sm text-neutral-600">{format}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Garanties */}
              <Card elevation="md">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                  <h3 className="font-semibold text-ink">
                    {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.guarantees?.map((guarantee, idx) => (
                    <div 
                      key={idx} 
                      className={`group flex items-start gap-2 transition-all duration-500 hover:translate-x-1 ${
                        isVisible 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-6 opacity-0'
                      }`}
                      style={{ transitionDelay: `${900 + idx * 100}ms` }}
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span className="text-sm text-neutral-600">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* CTA pour ce service */}
          <div className="pt-4 transition-all duration-1000 delay-500">
            <Button
              to="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRightIcon className="h-4 w-4" />}
              iconPosition="right"
            >
              {language === 'fr' ? 'Discuter de ce service' : 'Discuss this service'}
            </Button>
          </div>
        </div>

        {/* Images avec animations variées */}
        <div
          className={`space-y-6 transition-all duration-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : index % 2 === 0 ? 'translate-x-12 opacity-0 scale-95' : '-translate-x-12 opacity-0 scale-95'
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
                    ? 'translate-y-12 opacity-0 scale-90 rotate-2' 
                    : 'translate-y-12 opacity-0 scale-90 -rotate-2'
              }`}
              style={{ transitionDelay: `${700 + imgIndex * 200}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
              
              {/* Image avec animation de zoom */}
              <OptimizedImage
                src={imageUrl}
                alt={`${detail.title} - ${language === 'fr' ? 'Illustration' : 'Illustration'} ${imgIndex + 1}`}
                width={800}
                height={600}
                priority={imgIndex === 0 ? "high" : "low"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-115 group-hover:rotate-1"
              />
              
              {/* Badge sur l'image */}
              <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                  <p className="text-xs font-semibold text-ink">
                    {language === 'fr' ? 'Solution Professionnelle' : 'Professional Solution'}
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

function Services() {
  const { language } = useLanguage()
  const seo = getSEOData('/services', language)
  const serviceDetails = getServiceDetails(language)
  const servicesStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: language === 'fr' ? 'Forfaits SaaS KOBE Corporation' : 'KOBE Corporation SaaS Plans',
      url: 'https://www.kobecorporation.com/services#forfait-saas',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '27700',
          priceCurrency: 'XAF',
          url: 'https://pricing.kobecorporation.com',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Good Deal',
          price: '15500',
          priceCurrency: 'XAF',
          url: 'https://pricing.kobecorporation.com',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Ultra',
          price: '40900',
          priceCurrency: 'XAF',
          url: 'https://pricing.kobecorporation.com',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: language === 'fr' ? 'Où voir tous les détails des forfaits SaaS ?' : 'Where can I see full SaaS plan details?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'fr'
              ? 'Tous les détails des offres Pro, Good Deal et Ultra sont disponibles sur la page https://pricing.kobecorporation.com.'
              : 'Full details for Pro, Good Deal and Ultra plans are available at https://pricing.kobecorporation.com.',
          },
        },
        {
          '@type': 'Question',
          name: language === 'fr' ? 'Les prix affichés sont-ils mensuels ?' : 'Are the displayed prices monthly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: language === 'fr'
              ? 'Oui, les prix affichés sur la section Forfait SaaS sont mensuels et hors taxes.'
              : 'Yes, prices shown in the SaaS plans section are monthly and tax excluded.',
          },
        },
      ],
    },
  ]

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={servicesStructuredData}
      />
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
      <PageHero
        badge={language === 'fr' ? 'Services Professionnels' : 'Professional Services'}
        badgeIcon={<ClockIcon className="h-4 w-4 animate-pulse" />}
        title={language === 'fr' ? 'Nos Services' : 'Our Services'}
        subtitle={
          language === 'fr'
            ? 'Des solutions technologiques complètes et sur mesure pour transformer vos défis en opportunités de croissance.'
            : 'Complete and tailored technology solutions to transform your challenges into growth opportunities.'
        }
        description={
          language === 'fr'
            ? 'Expertise, innovation et accompagnement dédié pour votre réussite. Nous combinons stratégie, design et technologies de pointe pour livrer des résultats mesurables et durables.'
            : 'Expertise, innovation and dedicated support for your success. We combine strategy, design and cutting-edge technologies to deliver measurable and sustainable results.'
        }
      />

      {/* Forfait SaaS - Tarification */}
      <SaaSPricing />

      {/* Services Détaillés avec animations */}
      <div className="space-y-32">
        {services.map((service, index) => (
          <ServiceDetailSection
            key={service.slug}
            service={service}
            detail={serviceDetails[index]}
            images={serviceImages[service.slug as keyof typeof serviceImages] || []}
            index={index}
            language={language}
          />
        ))}
      </div>

      {/* Timeline Méthodologie */}
      <section className="mt-32">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm mb-4">
            <ClockIcon className="h-4 w-4" />
            <span>{language === 'fr' ? 'Méthodologie' : 'Methodology'}</span>
          </div>
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr' ? 'Notre Méthodologie' : 'Our Methodology'}
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600">
            {language === 'fr'
              ? 'Un processus structuré et éprouvé pour garantir le succès de votre projet à chaque étape'
              : 'A structured and proven process to ensure your project success at every step'}
          </p>
        </div>
        
        {/* Timeline Container */}
        <div className="relative">
          {/* Ligne verticale centrale (lg et plus seulement) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 lg:block">
            {/* Ligne de base */}
            <div className="absolute inset-0 bg-neutral-200 opacity-30" />
            
            {/* Ligne animée qui se remplit */}
            <div 
              className="absolute top-0 left-0 w-full transition-all duration-2000"
              style={{
                height: '100%',
                backgroundColor: '#0a7aff', // bg-brand-500
                transitionDelay: '300ms',
              }}
            />
            
            {/* Particules animées le long de la ligne */}
            {process.map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-500 shadow-lg animate-pulse"
                style={{
                  top: `${(i / (process.length - 1)) * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>

          {/* Étapes de la timeline */}
          <div className="space-y-8 lg:space-y-16">
            {process.map((step, index) => (
              <MethodologyStep
                key={step.step}
                step={step}
                index={index}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

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
              <RocketLaunchIcon className="h-4 w-4 animate-pulse" />
              <span>{language === 'fr' ? 'Prêt à commencer ?' : 'Ready to start?'}</span>
            </div>
            
            <h2 className="mb-6 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-4xl">
              {language === 'fr'
                ? 'Prêt à Démarrer Votre Projet ?'
                : 'Ready to Start Your Project?'}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-neutral-600">
              {language === 'fr'
                ? 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins. Notre équipe d\'experts est prête à vous accompagner dans votre transformation digitale.'
                : 'Contact us today to discuss your needs. Our team of experts is ready to accompany you in your digital transformation.'}
            </p>
            
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              {language === 'fr' ? 'Commencer maintenant' : 'Get started now'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
    </>
  )
}

export default Services
