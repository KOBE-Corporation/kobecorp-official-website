import { useLanguage } from '../contexts/LanguageContext'
import { companyInfo, valeurs } from '../data/siteContent'
import { getAboutHistory } from '../data/aboutContent'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  ClockIcon,
  LinkIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import benDjibrilPhoto from '../assets/people/ben-djibril-official-with-glass-nbg.png'
import { OptimizedImage } from '../components/OptimizedImage'
import { PageHero } from '../components/sections/PageHero'

// Composant pour les milestones de l'histoire
function HistoryMilestone({ milestone, index }: { milestone: any; index: number }) {
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
        <span className="font-display text-lg font-bold">{index + 1}</span>
      </div>

      {/* Carte de l'étape */}
      <div
        className={`group/step glass-panel relative w-full overflow-hidden rounded-2xl p-6 shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl lg:w-[calc(50%-40px)] md:p-8 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 150 + 300}ms` }}
      >
        {/* Ligne décorative */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-brand-500 transition-all duration-500 group-hover/step:w-full" />
        
        {/* Gradient au hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover/step:opacity-100" />
        
        <div className="relative">
          {/* Badge année */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700">
            <ClockIcon className="h-3 w-3" />
            <span>{milestone.year}</span>
          </div>

          {/* Icône */}
          <div
            className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${milestone.bgColor} transition-all duration-500 group-hover/step:scale-110 group-hover/step:rotate-6`}
          >
            <div className={milestone.iconColor}>{milestone.icon}</div>
          </div>

          <h3 className="mb-2 font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover/step:text-brand-600">
            {milestone.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600">
            {milestone.description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Composant pour les valeurs
function ValeurCard({ valeur, index, language }: { valeur: any; index: number; language: 'fr' | 'en' }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`group/value glass-panel rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 group-hover/value:scale-110 group-hover/value:rotate-6">
        {valeur.icon}
      </div>
      <h4 className="mb-2 font-semibold text-ink">
        {language === 'fr' ? valeur.title : valeur.titleEn}
      </h4>
      <p className="text-sm text-neutral-600">
        {language === 'fr' ? valeur.text : valeur.textEn}
      </p>
    </div>
  )
}

// Composant pour les différenciateurs
function DifferentiateurCard({ item, index }: { item: any; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`group glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          {item.icon}
        </div>
        <h3 className="mb-2 font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-600">
          {item.text}
        </p>
      </div>
    </div>
  )
}

// Composants de statistiques masqués temporairement

// Composant pour les garanties
function GuaranteeCard({ item, index }: { item: any; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`group glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          {item.icon}
        </div>
        <h3 className="mb-3 font-semibold text-lg text-ink transition-colors duration-300 group-hover:text-brand-600">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600">
          {item.description}
        </p>
      </div>
    </div>
  )
}

// Composant pour les programmes uniques
function ProgramCard({ item, index }: { item: any; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`group glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          {item.icon}
        </div>
        <h3 className="mb-2 font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-600">
          {item.description}
        </p>
      </div>
    </div>
  )
}

// Composant pour les engagements client
function EngagementCard({ item, index }: { item: any; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`flex items-start gap-4 transition-all duration-700 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 hover:scale-110">
        {item.icon}
      </div>
      <div>
        <h3 className="mb-2 font-semibold text-ink">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600">
          {item.description}
        </p>
      </div>
    </div>
  )
}

// Composant pour le processus qualité
function QualityStepCard({ item, index }: { item: any; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`group/step text-center transition-all duration-700 hover:-translate-y-1 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg transition-all duration-500 group-hover/step:scale-110 group-hover/step:rotate-6 group-hover/step:bg-brand-600">
        <span className="font-display text-2xl font-bold">{item.step}</span>
      </div>
      <h3 className="mb-2 font-semibold text-ink transition-colors duration-300 group-hover/step:text-brand-600">
        {item.title}
      </h3>
      <p className="text-sm text-neutral-600">
        {item.description}
      </p>
    </div>
  )
}

// Icônes SVG pour les réseaux sociaux
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function About() {
  const { language } = useLanguage()
  const { elementRef: historyRef, isVisible: historyVisible } = useScrollAnimation({ threshold: 0.1 })
  const seo = getSEOData('/about', language)
  const historyMilestones = getAboutHistory(language)

  // Liens sociaux de Ben Djibril
  const benDjibrilSocial = {
    website: 'https://ben-djibril.kobecorporation.com',
    linkedin: 'https://www.linkedin.com/in/Ben-Djibril',
    x: 'https://x.com/le_bendji',
    github: 'https://github.com/azerty-78',
  }

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
      <PageHero
        badge={language === 'fr' ? 'À Propos de Nous' : 'About Us'}
        badgeIcon={<SparklesIcon className="h-4 w-4 animate-pulse" />}
        title={language === 'fr' ? 'Notre Histoire' : 'Our Story'}
        subtitle={
          language === 'fr'
            ? 'Découvrez l\'histoire, les valeurs et la vision qui guident KOBE Corporation dans sa mission de transformation technologique et d\'innovation.'
            : 'Discover the story, values and vision that guide KOBE Corporation in its mission of technological transformation and innovation.'
        }
        description={
          language === 'fr'
            ? 'Nous sommes une entreprise passionnée par l\'excellence technologique et l\'accompagnement humain. Depuis notre création, nous nous engageons à créer des solutions qui transforment les entreprises et enrichissent les carrières des développeurs. Notre approche holistique combine expertise technique, vision stratégique et valeurs humaines pour livrer des résultats exceptionnels.'
            : 'We are a company passionate about technological excellence and human support. Since our creation, we have been committed to creating solutions that transform businesses and enrich developers\' careers. Our holistic approach combines technical expertise, strategic vision and human values to deliver exceptional results.'
        }
      />

      {/* Histoire avec timeline verticale responsive */}
      <section id="story" className="mb-24">
        {/* Timeline verticale responsive - masquée sur mobile, visible à partir de lg */}
        <div ref={historyRef} className="relative mx-auto max-w-4xl">
          {/* Ligne verticale centrale (lg et plus seulement) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 lg:block">
            {/* Ligne de base */}
            <div className="absolute inset-0 bg-neutral-200 opacity-30" />
            
            {/* Ligne animée qui se remplit */}
            <div 
              className="absolute top-0 left-0 w-full transition-all duration-2000"
              style={{
                height: historyVisible ? '100%' : '0%',
                backgroundColor: '#0a7aff', // bg-brand-500
                transitionDelay: '300ms',
              }}
            />
            
            {/* Particules animées le long de la ligne */}
            {historyVisible && (
              <>
                <div className="absolute left-1/2 top-[25%] h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500 shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute left-1/2 top-[50%] h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500 shadow-lg animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute left-1/2 top-[75%] h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500 shadow-lg animate-pulse" style={{ animationDelay: '1.5s' }} />
              </>
            )}
          </div>

          {/* Étapes de la timeline */}
          <div className="space-y-8 lg:space-y-16">
            {historyMilestones.map((milestone, index) => (
              <HistoryMilestone key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs avec animations */}
      <section id="values" className="mb-24">
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-12">
          {/* Ligne décorative */}
          <div className="absolute top-0 left-0 h-1 w-0 bg-brand-500 transition-all duration-500 group-hover:w-full" />
          
          <h2 className="mb-8 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valeurs.map((valeur, index) => (
              <ValeurCard key={index} valeur={valeur} index={index} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership avec animations et photo */}
      <section id="team" className="mb-24">
        <div className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </h2>
          <p className="mb-12 text-neutral-600">
            {language === 'fr'
              ? 'Rencontrez les personnes qui font de KOBE Corporation ce qu\'elle est'
              : 'Meet the people who make KOBE Corporation what it is'}
          </p>
        </div>
        <div className="group glass-panel relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative text-center">
            {/* Photo de Ben Djibril - Améliorée pour mieux voir la tête */}
            <div className="relative mx-auto mb-6 inline-block">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400/30 to-brand-600/30 blur-2xl opacity-50 animate-pulse" />
              <div className="relative overflow-hidden rounded-full border-4 border-white shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                <OptimizedImage
                  src={benDjibrilPhoto}
                  alt={`${companyInfo.founder} - ${language === 'fr' ? 'PDG et Fondateur de' : 'CEO and Founder of'} ${companyInfo.name}`}
                  width={192}
                  height={192}
                  priority="high"
                  className="h-40 w-40 object-cover md:h-48 md:w-48"
                  style={{ objectPosition: 'center 15%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <h3 className="mb-2 font-display text-2xl text-ink md:text-3xl">
              {companyInfo.founder}
            </h3>
            <p className="mb-6 text-lg font-semibold text-brand-600">
              {language === 'fr' ? 'PDG & Fondateur' : 'CEO & Founder'}
            </p>
            <p className="mb-8 text-neutral-600">
              {language === 'fr' ? (
                <>
                  {companyInfo.founder} est un développeur full-stack spécialisé en Kotlin, KMP 
                  et Spring Boot, avec une expertise reconnue en développement mobile et backend. 
                  Avant de créer KOBE Corporation, il a travaillé sur de nombreux projets 
                  open source et a développé une compréhension unique des défis auxquels font 
                  face les développeurs africains. Sa vision : permettre à chaque développeur 
                  africain de facturer ses clients sans créer sa propre entreprise, de travailler 
                  sur de vrais projets en production, et de construire un portfolio technique 
                  reconnu internationalement.
                </>
              ) : (
                <>
                  {companyInfo.founder} is a full-stack developer specialized in Kotlin, KMP and 
                  Spring Boot, with recognized expertise in mobile and backend development. Before 
                  creating KOBE Corporation, he worked on numerous open source projects and developed 
                  a unique understanding of the challenges facing African developers. His vision: 
                  enable every African developer to invoice their clients without creating their own 
                  company, work on real production projects, and build an internationally recognized 
                  technical portfolio.
                </>
              )}
            </p>

            {/* Lien vers le site de Ben Djibril */}
            <div className="mb-6">
              <a
                href={benDjibrilSocial.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-600 transition-all duration-300 hover:bg-brand-100 hover:shadow-md"
              >
                <LinkIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:scale-110" />
                <span>ben-djibril.kobecorporation.com</span>
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center justify-center gap-4">
              <a
                href={benDjibrilSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:bg-[#0A66C2] hover:text-white hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={benDjibrilSocial.x}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900/10 text-slate-900 transition-all duration-300 hover:scale-110 hover:bg-neutral-900 hover:text-white hover:shadow-lg"
                aria-label="X (Twitter)"
              >
                <XIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={benDjibrilSocial.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800/10 text-slate-800 transition-all duration-300 hover:scale-110 hover:bg-neutral-800 hover:text-white hover:shadow-lg"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Différenciateurs avec animations */}
      <section className="mb-24">
        <div className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr'
              ? 'Pourquoi Choisir KOBE ?'
              : 'Why Choose KOBE?'}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <GlobeAltIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Expertise Locale, Standards Internationaux' : 'Local Expertise, International Standards',
              text:
                language === 'fr'
                  ? 'Compréhension du marché africain avec qualité mondiale'
                  : 'Understanding of African market with world-class quality',
            },
            {
              icon: <ShieldCheckIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Disponibilité Totale' : 'Total Availability',
              text:
                language === 'fr'
                  ? 'Support 24/7 avec réactivité garantie'
                  : '24/7 support with guaranteed responsiveness',
            },
            {
              icon: <SparklesIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Approche Personnalisée' : 'Personalized Approach',
              text:
                language === 'fr'
                  ? 'Solutions sur mesure avec accompagnement dédié'
                  : 'Tailor-made solutions with dedicated support',
            },
            {
              icon: <BuildingOffice2Icon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Écosystème Complet' : 'Complete Ecosystem',
              text:
                language === 'fr'
                  ? 'Développement + Hébergement + Formation en guichet unique'
                  : 'Development + Hosting + Training in one-stop shop',
            },
            {
              icon: <CheckBadgeIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Engagement Communautaire' : 'Community Engagement',
              text:
                language === 'fr'
                  ? 'Formation de talents et contribution open source'
                  : 'Talent development and open source contribution',
            },
          ].map((item, index) => (
            <DifferentiateurCard key={index} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Chiffres & Impact - Masqués temporairement (entreprise en création) */}
      {/* <section className="mb-24">
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative text-center">
            <h2 className="mb-8 font-display text-3xl text-ink md:text-4xl">
              {language === 'fr' ? 'Notre Impact' : 'Our Impact'}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {chiffres.map((chiffre, index) => (
                <StatCard key={index} stat={chiffre} index={index} language={language} />
              ))}
            </div>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { value: '200+', label: language === 'fr' ? 'Projets livrés' : 'Projects delivered', labelEn: 'Projects delivered' },
                { value: '98%', label: language === 'fr' ? 'Satisfaction client' : 'Client satisfaction', labelEn: 'Client satisfaction' },
                { value: '24/7', label: language === 'fr' ? 'Support disponible' : 'Support available', labelEn: 'Support available' },
              ].map((stat, index) => (
                <ExtraStatCard key={index} stat={stat} index={index} language={language} />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Garanties & Certifications */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr' ? 'Nos Garanties & Engagements' : 'Our Guarantees & Commitments'}
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600">
            {language === 'fr'
              ? 'Des engagements concrets pour votre tranquillité d\'esprit'
              : 'Concrete commitments for your peace of mind'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <ShieldCheckIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Garantie Qualité' : 'Quality Guarantee',
              description: language === 'fr'
                ? 'Code review systématique, tests automatisés (90%+ coverage) et documentation complète pour chaque projet.'
                : 'Systematic code review, automated tests (90%+ coverage) and complete documentation for each project.',
            },
            {
              icon: <ClockIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Respect des Délais' : 'Deadline Respect',
              description: language === 'fr'
                ? 'Engagement ferme sur les délais convenus avec communication proactive en cas de changement.'
                : 'Firm commitment on agreed deadlines with proactive communication in case of changes.',
            },
            {
              icon: <CheckBadgeIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Support Post-Lancement' : 'Post-Launch Support',
              description: language === 'fr'
                ? 'Support technique inclus pendant 6 mois après la livraison avec corrections gratuites.'
                : 'Technical support included for 6 months after delivery with free corrections.',
            },
            {
              icon: <GlobeAltIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Confidentialité Garantie' : 'Guaranteed Confidentiality',
              description: language === 'fr'
                ? 'NDA systématique, sécurité des données et conformité RGPD pour tous nos clients.'
                : 'Systematic NDA, data security and GDPR compliance for all our clients.',
            },
            {
              icon: <SparklesIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Innovation Continue' : 'Continuous Innovation',
              description: language === 'fr'
                ? 'Veille technologique constante et adoption des meilleures pratiques du marché.'
                : 'Constant technological watch and adoption of market best practices.',
            },
            {
              icon: <BuildingOffice2Icon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Scalabilité Assurée' : 'Assured Scalability',
              description: language === 'fr'
                ? 'Architectures conçues pour évoluer avec votre croissance et vos besoins futurs.'
                : 'Architectures designed to evolve with your growth and future needs.',
            },
          ].map((item, index) => (
            <GuaranteeCard key={index} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Processus Qualité */}
      <section className="mb-24">
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
                {language === 'fr' ? 'Notre Processus Qualité' : 'Our Quality Process'}
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                {language === 'fr'
                  ? 'Un processus rigoureux pour garantir l\'excellence à chaque étape'
                  : 'A rigorous process to ensure excellence at every step'}
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: '1',
                  title: language === 'fr' ? 'Analyse' : 'Analysis',
                  description: language === 'fr'
                    ? 'Analyse approfondie des besoins et définition des spécifications'
                    : 'In-depth needs analysis and specification definition',
                },
                {
                  step: '2',
                  title: language === 'fr' ? 'Conception' : 'Design',
                  description: language === 'fr'
                    ? 'Architecture technique et design UX/UI validés avec vous'
                    : 'Technical architecture and UX/UI design validated with you',
                },
                {
                  step: '3',
                  title: language === 'fr' ? 'Développement' : 'Development',
                  description: language === 'fr'
                    ? 'Code review, tests automatisés et intégration continue'
                    : 'Code review, automated tests and continuous integration',
                },
                {
                  step: '4',
                  title: language === 'fr' ? 'Livraison' : 'Delivery',
                  description: language === 'fr'
                    ? 'Tests finaux, documentation et formation des équipes'
                    : 'Final tests, documentation and team training',
                },
              ].map((item, index) => (
                <QualityStepCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Programmes Uniques */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr' ? 'Ce qui nous rend uniques' : 'What makes us unique'}
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600">
            {language === 'fr'
              ? 'Quatre programmes innovants qui transforment l\'écosystème tech africain'
              : 'Four innovative programs that transform the African tech ecosystem'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <BriefcaseIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Programme Freelance' : 'Freelance Program',
              description: language === 'fr'
                ? 'Cadre légal complet permettant aux freelances de facturer leurs clients sans créer leur entreprise. Gestion administrative, fiscale et juridique incluse.'
                : 'Complete legal framework allowing freelancers to invoice their clients without creating their company. Administrative, tax and legal management included.',
            },
            {
              icon: <AcademicCapIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Programme Étudiants' : 'Student Program',
              description: language === 'fr'
                ? 'Stages sur de VRAIS projets en production. Chaque ligne de code compte et impacte de vraies entreprises. Mentorat dédié et certification à la clé.'
                : 'Internships on REAL production projects. Every line of code counts and impacts real businesses. Dedicated mentoring and certification included.',
            },
            {
              icon: <CodeBracketIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Programme Open Source' : 'Open Source Program',
              description: language === 'fr'
                ? 'Contribuez à des projets open source utilisés par de vraies entreprises. Votre GitHub devient votre meilleur CV avec visibilité internationale.'
                : 'Contribute to open source projects used by real companies. Your GitHub becomes your best resume with international visibility.',
            },
            {
              icon: <UserGroupIcon className="h-8 w-8 text-brand-500" />,
              title: language === 'fr' ? 'Programme Networking' : 'Networking Program',
              description: language === 'fr'
                ? 'Accès à notre réseau de clients, projets et événements exclusifs. Plus KOBE grandit, plus vos opportunités augmentent.'
                : 'Access to our network of clients, projects and exclusive events. The more KOBE grows, the more your opportunities increase.',
            },
          ].map((item, index) => (
            <ProgramCard key={index} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Engagement Client */}
      <section className="mb-24">
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
                {language === 'fr' ? 'Notre Engagement Client' : 'Our Client Commitment'}
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                {language === 'fr'
                  ? 'Des promesses que nous tenons pour chaque projet'
                  : 'Promises we keep for every project'}
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: <ShieldCheckIcon className="h-6 w-6 text-brand-500" />,
                  title: language === 'fr' ? 'Transparence Totale' : 'Total Transparency',
                  description: language === 'fr'
                    ? 'Communication régulière, rapports détaillés et visibilité complète sur l\'avancement de votre projet.'
                    : 'Regular communication, detailed reports and complete visibility on your project progress.',
                },
                {
                  icon: <ClockIcon className="h-6 w-6 text-brand-500" />,
                  title: language === 'fr' ? 'Réactivité Garantie' : 'Guaranteed Responsiveness',
                  description: language === 'fr'
                    ? 'Réponse sous 2h en heures ouvrables, support 24/7 pour les urgences et disponibilité totale.'
                    : 'Response within 2h during business hours, 24/7 support for emergencies and total availability.',
                },
                {
                  icon: <SparklesIcon className="h-6 w-6 text-brand-500" />,
                  title: language === 'fr' ? 'Excellence Continue' : 'Continuous Excellence',
                  description: language === 'fr'
                    ? 'Amélioration continue, veille technologique et adoption des meilleures pratiques du marché.'
                    : 'Continuous improvement, technological watch and adoption of market best practices.',
                },
                {
                  icon: <CheckBadgeIcon className="h-6 w-6 text-brand-500" />,
                  title: language === 'fr' ? 'Partenariat Durable' : 'Long-term Partnership',
                  description: language === 'fr'
                    ? 'Accompagnement au-delà de la livraison, évolution de votre solution et support continu.'
                    : 'Support beyond delivery, evolution of your solution and continuous support.',
                },
              ].map((item, index) => (
                <EngagementCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Localisation avec carte */}
      <section>
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
                {language === 'fr' ? 'Où Nous Trouver' : 'Find Us'}
              </h2>
              <div className="mb-6 flex items-center justify-center gap-3">
                <MapPinIcon className="h-6 w-6 text-brand-500" />
                <p className="text-lg text-neutral-700">
                  {companyInfo.address.full}
                </p>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d11.5021!3d3.8480!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTAnNTIuOCJOIDExwrAzMCcwNy42IkU!5e0!3m2!1sfr!2scm!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={language === 'fr' ? 'Localisation KOBE Corporation' : 'KOBE Corporation Location'}
                className="w-full"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold text-ink">
                  {language === 'fr' ? 'Adresse' : 'Address'}
                </h3>
                <div className="space-y-2 text-neutral-600">
                  <p>{companyInfo.address.street}</p>
                  <p>{companyInfo.address.city}</p>
                  <p>{companyInfo.address.region}</p>
                  <p>{companyInfo.address.country}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-ink">
                  {language === 'fr' ? 'Zone de service' : 'Service area'}
                </h3>
                <div className="space-y-2 text-neutral-600">
                  <p className="flex items-center gap-2">
                    <CheckBadgeIcon className="h-5 w-5 text-brand-500" />
                    {language === 'fr' ? 'Cameroun (principal)' : 'Cameroon (main)'}
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckBadgeIcon className="h-5 w-5 text-brand-500" />
                    {language === 'fr' ? 'Afrique Centrale et de l\'Ouest' : 'Central and West Africa'}
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckBadgeIcon className="h-5 w-5 text-brand-500" />
                    {language === 'fr' ? 'International (projets à distance)' : 'International (remote projects)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default About
