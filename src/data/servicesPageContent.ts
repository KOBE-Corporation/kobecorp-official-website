import { createElement, type ReactNode } from 'react'
import {
  CodeBracketIcon,
  ServerIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'

export const serviceImages = {
  'developpement-logiciel': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80',
  ],
  'hebergement-infrastructure': [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
  ],
  'consultation-audit': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  ],
  'formation-bootcamp': [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80',
  ],
} as const

export const sectionIdMap: Record<string, string> = {
  'developpement-logiciel': 'development',
  'hebergement-infrastructure': 'hosting',
  'consultation-audit': 'consultation',
  'formation-bootcamp': 'training',
}

export type ServiceDetail = {
  id: string
  icon: ReactNode
  title: string
  description: string
  sections?: Array<{ subtitle: string; content: string; icon: ReactNode }>
  guarantees?: string[]
  features?: string[]
  plans?: Array<{ name: string; desc: string; features?: string[] }>
  services?: string[]
  deliverables?: string[]
  programs?: string[]
  formats?: string[]
}

export function getServiceDetails(language: 'fr' | 'en'): ServiceDetail[] {
  return [
    {
      id: 'developpement-logiciel',
      icon: createElement(CodeBracketIcon, { className: 'h-8 w-8 text-brand-500' }),
      title: language === 'fr' ? 'Développement de Logiciels Sur Mesure' : 'Custom Software Development',
      description: language === 'fr'
        ? "Nous transformons vos idées en solutions logicielles performantes, évolutives et sécurisées. De la conception à la mise en production, notre équipe d'experts vous accompagne à chaque étape."
        : 'We transform your ideas into performant, scalable and secure software solutions. From design to production, our team of experts accompanies you at every step.',
      sections: [
        {
          subtitle: language === 'fr' ? 'Pour les Individus' : 'For Individuals',
          content: language === 'fr'
            ? "Applications personnelles, sites web portfolio, outils d'automatisation adaptés à vos besoins individuels. Solutions légères et performantes pour vos projets personnels."
            : 'Personal applications, portfolio websites, automation tools tailored to your individual needs. Lightweight and performant solutions for your personal projects.',
          icon: createElement(UserGroupIcon, { className: 'h-5 w-5 text-brand-500' }),
        },
        {
          subtitle: language === 'fr' ? 'Pour les PME' : 'For SMEs',
          content: language === 'fr'
            ? "Solutions de gestion d'entreprise, CRM, systèmes de facturation, applications métier pour optimiser vos opérations. ROI mesurable et amélioration de la productivité."
            : 'Business management solutions, CRM, billing systems, business applications to optimize your operations. Measurable ROI and productivity improvement.',
          icon: createElement(RocketLaunchIcon, { className: 'h-5 w-5 text-brand-500' }),
        },
        {
          subtitle: language === 'fr' ? 'Pour les Grandes Entreprises' : 'For Large Enterprises',
          content: language === 'fr'
            ? "Architectures complexes, intégrations système, applications d'entreprise scalables et sécurisées. Support dédié et SLA garantis pour vos opérations critiques."
            : 'Complex architectures, system integrations, scalable and secure enterprise applications. Dedicated support and guaranteed SLA for your critical operations.',
          icon: createElement(ShieldCheckIcon, { className: 'h-5 w-5 text-brand-500' }),
        },
      ],
      guarantees: [
        language === 'fr' ? 'Code review systématique' : 'Systematic code review',
        language === 'fr' ? 'Tests automatisés (90%+ coverage)' : 'Automated tests (90%+ coverage)',
        language === 'fr' ? 'Documentation complète' : 'Complete documentation',
        language === 'fr' ? 'Support post-lancement 6 mois' : '6 months post-launch support',
        language === 'fr' ? 'Formation des équipes' : 'Team training',
        language === 'fr' ? 'Garantie de performance' : 'Performance guarantee',
      ],
    },
    {
      id: 'hebergement-infrastructure',
      icon: createElement(ServerIcon, { className: 'h-8 w-8 text-brand-500' }),
      title: language === 'fr' ? 'Hébergement & Infrastructure Cloud' : 'Hosting & Cloud Infrastructure',
      description: language === 'fr'
        ? "Infrastructure cloud sécurisée et performante pour vos applications. Disponibilité garantie 99.9%, monitoring 24/7 et support technique réactif pour votre tranquillité d'esprit."
        : 'Secure and performant cloud infrastructure for your applications. 99.9% guaranteed availability, 24/7 monitoring and reactive technical support for your peace of mind.',
      features: [
        language === 'fr' ? 'Hébergement sécurisé avec SSL/TLS' : 'Secure hosting with SSL/TLS',
        language === 'fr' ? 'Sauvegardes automatiques quotidiennes' : 'Daily automatic backups',
        language === 'fr' ? 'Monitoring 24/7 avec alertes proactives' : '24/7 monitoring with proactive alerts',
        language === 'fr' ? 'Scalabilité automatique selon la charge' : 'Automatic scalability based on load',
        language === 'fr' ? 'Support technique dédié (réponse < 2h)' : 'Dedicated technical support (response < 2h)',
        language === 'fr' ? 'Disponibilité garantie 99.9% (SLA)' : '99.9% uptime guarantee (SLA)',
        language === 'fr' ? 'CDN global pour performances optimales' : 'Global CDN for optimal performance',
        language === 'fr' ? 'Conformité RGPD et sécurité renforcée' : 'GDPR compliance and enhanced security',
      ],
      plans: [
        {
          name: 'Starter',
          desc: language === 'fr' ? 'Pour petits projets et startups' : 'For small projects and startups',
          features: ['10GB storage', '100GB bandwidth', 'Email support'],
        },
        {
          name: 'Business',
          desc: language === 'fr' ? 'Pour PME en croissance' : 'For growing SMEs',
          features: ['100GB storage', '1TB bandwidth', 'Priority support'],
        },
        {
          name: 'Enterprise',
          desc: language === 'fr' ? 'Pour grandes structures' : 'For large organizations',
          features: ['Unlimited storage', 'Unlimited bandwidth', '24/7 dedicated support'],
        },
        {
          name: 'Custom',
          desc: language === 'fr' ? 'Solutions personnalisées' : 'Custom solutions',
          features: ['Tailored infrastructure', 'Custom SLA', 'Dedicated team'],
        },
      ],
      guarantees: [
        language === 'fr' ? 'SLA 99.9% garanti' : '99.9% SLA guaranteed',
        language === 'fr' ? 'Support 24/7/365' : '24/7/365 support',
        language === 'fr' ? 'Migration gratuite' : 'Free migration',
        language === 'fr' ? 'Sauvegardes incluses' : 'Backups included',
      ],
    },
    {
      id: 'consultation-audit',
      icon: createElement(ChartBarIcon, { className: 'h-8 w-8 text-brand-500' }),
      title: language === 'fr' ? 'Consultation Technique & Audit IT' : 'Technical Consultation & IT Audit',
      description: language === 'fr'
        ? 'Audit complet de votre infrastructure, analyse de vos besoins et recommandations stratégiques pour optimiser vos performances et réduire vos coûts. Expertise reconnue et approche méthodique.'
        : 'Complete audit of your infrastructure, analysis of your needs and strategic recommendations to optimize your performance and reduce costs. Recognized expertise and methodical approach.',
      services: [
        language === 'fr' ? 'Audit complet de votre infrastructure existante' : 'Complete audit of existing infrastructure',
        language === 'fr' ? 'Analyse des besoins et recommandations stratégiques' : 'Needs analysis and strategic recommendations',
        language === 'fr' ? 'Roadmap technologique sur 12-24 mois' : 'Technology roadmap for 12-24 months',
        language === 'fr' ? 'Optimisation de performance et coûts' : 'Performance and cost optimization',
        language === 'fr' ? 'Conseil en architecture logicielle' : 'Software architecture consulting',
        language === 'fr' ? 'Évaluation de sécurité et conformité' : 'Security and compliance assessment',
        language === 'fr' ? 'Analyse de la dette technique' : 'Technical debt analysis',
        language === 'fr' ? "Recommandations d'outils et technologies" : 'Tools and technology recommendations',
      ],
      deliverables: [
        language === 'fr' ? "Rapport d'audit détaillé (50+ pages)" : 'Detailed audit report (50+ pages)',
        language === 'fr' ? 'Roadmap priorisée avec budget' : 'Prioritized roadmap with budget',
        language === 'fr' ? 'Présentation executive summary' : 'Executive summary presentation',
        language === 'fr' ? "Plan d'action immédiat" : 'Immediate action plan',
      ],
      guarantees: [
        language === 'fr' ? 'Audit en 2-3 semaines' : 'Audit in 2-3 weeks',
        language === 'fr' ? 'Expertise certifiée' : 'Certified expertise',
        language === 'fr' ? 'Recommandations actionnables' : 'Actionable recommendations',
        language === 'fr' ? 'Suivi post-audit inclus' : 'Post-audit follow-up included',
      ],
    },
    {
      id: 'formation-bootcamp',
      icon: createElement(AcademicCapIcon, { className: 'h-8 w-8 text-brand-500' }),
      title: language === 'fr' ? 'Formation Professionnelle & Bootcamps' : 'Professional Training & Bootcamps',
      description: language === 'fr'
        ? 'Programmes de formation intensifs et certifiants pour développer les compétences techniques de vos équipes. Approche pratique avec projets réels et mentorat personnalisé.'
        : "Intensive and certifying training programs to develop your teams' technical skills. Practical approach with real projects and personalized mentoring.",
      programs: [
        language === 'fr' ? 'Développement Web Full-Stack' : 'Full-Stack Web Development',
        language === 'fr' ? 'Développement Mobile (React Native, Flutter)' : 'Mobile Development (React Native, Flutter)',
        language === 'fr' ? 'DevOps & Cloud Computing (AWS, Azure, GCP)' : 'DevOps & Cloud Computing (AWS, Azure, GCP)',
        language === 'fr' ? 'Cybersécurité & Ethical Hacking' : 'Cybersecurity & Ethical Hacking',
        language === 'fr' ? 'Data Science & Intelligence Artificielle' : 'Data Science & Artificial Intelligence',
        language === 'fr' ? 'Gestion de projet Agile & Scrum' : 'Agile & Scrum Project Management',
      ],
      formats: [
        language === 'fr' ? 'Bootcamps intensifs (8-12 semaines)' : 'Intensive bootcamps (8-12 weeks)',
        language === 'fr' ? 'Formations à la carte sur mesure' : 'Custom tailored training',
        language === 'fr' ? 'Formations en entreprise (on-site/remote)' : 'Corporate training (on-site/remote)',
        language === 'fr' ? 'Mentorat individuel et coaching' : 'Individual mentoring and coaching',
        language === 'fr' ? 'Workshops et masterclasses' : 'Workshops and masterclasses',
      ],
      guarantees: [
        language === 'fr' ? 'Certification reconnue' : 'Recognized certification',
        language === 'fr' ? 'Projets réels en portfolio' : 'Real projects in portfolio',
        language === 'fr' ? 'Support post-formation 3 mois' : '3 months post-training support',
        language === 'fr' ? 'Garantie emploi ou remboursement' : 'Job guarantee or refund',
      ],
    },
  ]
}
