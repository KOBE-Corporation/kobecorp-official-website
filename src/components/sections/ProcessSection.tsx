import {
  LightBulbIcon,
  DocumentCheckIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

interface ProcessStep {
  icon: React.ComponentType<{ className?: string }>
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  color: string
}

const processSteps: ProcessStep[] = [
  {
    icon: LightBulbIcon,
    title: 'Découverte & Stratégie',
    titleEn: 'Discovery & Strategy',
    description:
      'Analyse approfondie de vos besoins, définition des objectifs et élaboration d\'une feuille de route stratégique.',
    descriptionEn:
      'In-depth analysis of your needs, goal definition and development of a strategic roadmap.',
    color: 'from-blue-500/10 to-blue-600/10',
  },
  {
    icon: DocumentCheckIcon,
    title: 'Conception & Planification',
    titleEn: 'Design & Planning',
    description:
      'Architecture technique, design UX/UI et planification détaillée pour garantir la réussite du projet.',
    descriptionEn:
      'Technical architecture, UX/UI design and detailed planning to ensure project success.',
    color: 'from-green-500/10 to-green-600/10',
  },
  {
    icon: RocketLaunchIcon,
    title: 'Développement & Implémentation',
    titleEn: 'Development & Implementation',
    description:
      'Développement agile avec des livraisons régulières, tests continus et intégration progressive.',
    descriptionEn:
      'Agile development with regular deliveries, continuous testing and progressive integration.',
    color: 'from-purple-500/10 to-purple-600/10',
  },
  {
    icon: ChartBarIcon,
    title: 'Déploiement & Optimisation',
    titleEn: 'Deployment & Optimization',
    description:
      'Mise en production sécurisée, monitoring des performances et optimisation continue.',
    descriptionEn:
      'Secure production deployment, performance monitoring and continuous optimization.',
    color: 'from-orange-500/10 to-orange-600/10',
  },
  {
    icon: ArrowPathIcon,
    title: 'Support & Évolution',
    titleEn: 'Support & Evolution',
    description:
      'Accompagnement post-lancement, maintenance proactive et évolution selon vos besoins.',
    descriptionEn:
      'Post-launch support, proactive maintenance and evolution according to your needs.',
    color: 'from-indigo-500/10 to-indigo-600/10',
  },
]

function ProcessStepCard({
  step,
  index,
  language,
}: {
  step: ProcessStep
  index: number
  language: 'fr' | 'en'
}) {
  const Icon = step.icon
  const isEven = index % 2 === 0
  const { elementRef: stepRef, isVisible: stepVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={stepRef}
      className={`relative flex items-center justify-center lg:justify-start ${
        !isEven ? 'lg:justify-end' : ''
      }`}
    >
      <div
        className={`absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-500 text-white shadow-lg transition-all duration-500 lg:flex ${
          stepVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100 + 500}ms` }}
      >
        <span className="font-display text-lg font-bold">{index + 1}</span>
      </div>

      <Card
        elevation="md"
        hover={false}
        className={`group relative w-full lg:w-[calc(50%-40px)] ${
          stepVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="relative">
          <div className="mb-5 flex items-start gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50 group-hover:scale-150" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl">
                <Icon className="h-7 w-7 text-brand-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]" />
              </div>
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                {index + 1}
              </div>
            </div>

            <div className="flex-1 pt-1">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600 transition-colors duration-300 group-hover:text-brand-700">
                {language === 'fr' ? 'Étape' : 'Step'} {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
                {language === 'fr' ? step.title : step.titleEn}
              </h3>
            </div>
          </div>
          <p className="leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
            {language === 'fr' ? step.description : step.descriptionEn}
          </p>
        </div>
      </Card>
    </div>
  )
}

function ProcessSection() {
  const { language } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section ref={elementRef} id="process" className="space-y-10 md:space-y-12">
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {language === 'fr' ? 'Notre Approche' : 'Our Approach'}
        </p>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          {language === 'fr'
            ? 'Un Processus Structuré pour Votre Réussite'
            : 'A Structured Process for Your Success'}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
          {language === 'fr'
            ? 'De la conception à la mise en production, nous vous accompagnons à chaque étape avec une méthodologie éprouvée et une communication transparente.'
            : 'From design to production, we accompany you at every step with proven methodology and transparent communication.'}
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 lg:block">
          <div className="absolute inset-0 bg-neutral-200 opacity-30" />
          <div
            className="absolute top-0 left-0 w-full bg-brand-500 transition-all duration-1000"
            style={{
              height: isVisible ? '100%' : '0%',
              transitionDelay: '500ms',
            }}
          />
          {isVisible && (
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500 shadow-lg animate-pulse"
                  style={{
                    top: `${25 + i * 25}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8 lg:space-y-12">
          {processSteps.map((step, index) => (
            <ProcessStepCard key={index} step={step} index={index} language={language} />
          ))}
        </div>
      </div>

      <div
        className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="mb-6 text-lg text-neutral-600 transition-colors duration-300">
          {language === 'fr' ? 'Prêt à démarrer votre projet ?' : 'Ready to start your project?'}
        </p>
        <Button
          to="/contact"
          variant="primary"
          size="lg"
          icon={<ArrowRightIcon className="h-5 w-5" />}
          iconPosition="right"
        >
          {language === 'fr' ? 'Discutons de votre projet' : "Let's discuss your project"}
        </Button>
      </div>
    </section>
  )
}

export default ProcessSection
