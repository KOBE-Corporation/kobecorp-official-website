import { createElement, type ReactNode } from 'react'
import {
  LightBulbIcon,
  RocketLaunchIcon,
  StarIcon,
  FireIcon,
} from '@heroicons/react/24/outline'
import { companyInfo } from './siteContent'

export type AboutHistoryMilestone = {
  year: string
  icon: ReactNode
  title: string
  description: string
  bgColor: string
  iconColor: string
}

export function getAboutHistory(language: 'fr' | 'en'): AboutHistoryMilestone[] {
  return [
    {
      year: companyInfo.year,
      icon: createElement(LightBulbIcon, { className: 'h-8 w-8' }),
      title: language === 'fr' ? 'La Vision' : 'The Vision',
      description:
        language === 'fr'
          ? `${companyInfo.founder} crée KOBE Corporation avec l'ambition de transformer l'écosystème technologique africain. Contrairement aux entreprises traditionnelles, nous ne nous contentons pas de développer des logiciels : nous construisons un pont entre les talents locaux et les opportunités mondiales.`
          : `${companyInfo.founder} creates KOBE Corporation with the ambition to transform the African technology ecosystem. Unlike traditional companies, we don't just develop software: we build a bridge between local talent and global opportunities.`,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      year: '2024',
      icon: createElement(RocketLaunchIcon, { className: 'h-8 w-8' }),
      title: language === 'fr' ? 'Le Lancement' : 'The Launch',
      description:
        language === 'fr'
          ? 'Développement de solutions logicielles de classe mondiale et création des premiers programmes pour les talents locaux. Nous avons commencé à opérer depuis Yaoundé, au Cameroun, avec une compréhension profonde du marché africain tout en respectant les standards internationaux.'
          : 'Development of world-class software solutions and creation of the first programs for local talent. We started operating from Yaoundé, Cameroon, with a deep understanding of the African market while respecting international standards.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      year: '2024-2025',
      icon: createElement(StarIcon, { className: 'h-8 w-8' }),
      title: language === 'fr' ? "L'Expansion" : 'The Expansion',
      description:
        language === 'fr'
          ? 'Création de quatre programmes uniques qui transforment la façon dont les développeurs africains travaillent : un cadre légal pour les freelances, des stages sur de vrais projets en production pour les étudiants, une communauté open source active, et un réseau de networking qui grandit avec nous.'
          : 'Creation of four unique programs that transform how African developers work: a legal framework for freelancers, internships on real production projects for students, an active open source community, and a networking network that grows with us.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      year: language === 'fr' ? "Aujourd'hui" : 'Today',
      icon: createElement(FireIcon, { className: 'h-8 w-8' }),
      title: language === 'fr' ? "L'Impact" : 'The Impact',
      description:
        language === 'fr'
          ? "Notre modèle d'affaires unique combine développement logiciel, hébergement cloud, formation professionnelle et accompagnement communautaire - une approche holistique que peu d'entreprises offrent. Chaque programme est conçu pour créer des opportunités réelles et mesurables."
          : 'Our unique business model combines software development, cloud hosting, professional training and community support - a holistic approach that few companies offer. Each program is designed to create real and measurable opportunities.',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
  ]
}
