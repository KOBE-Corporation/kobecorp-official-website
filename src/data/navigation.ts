import { useLanguage } from '../contexts/LanguageContext'
import { localizePath } from '../utils/locale'

export type NavItem = {
  label: string
  path: string
  sections?: { label: string; anchor: string }[]
}

export function useNavigationItems(): NavItem[] {
  const { language, t } = useLanguage()

  return [
    {
      label: t('nav.home'),
      path: localizePath('/', language),
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Services' : 'Services', anchor: 'services' },
        { label: language === 'fr' ? 'Programmes' : 'Programs', anchor: 'programs' },
        { label: language === 'fr' ? 'Missions' : 'Missions', anchor: 'missions' },
        { label: language === 'fr' ? 'Processus' : 'Process', anchor: 'process' },
        { label: language === 'fr' ? 'Contact' : 'Contact', anchor: 'cta' },
      ],
    },
    {
      label: t('nav.services'),
      path: localizePath('/services', language),
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Forfaits SaaS' : 'SaaS Plans', anchor: 'forfait-saas' },
        { label: language === 'fr' ? 'Développement Logiciel' : 'Software Development', anchor: 'development' },
        { label: language === 'fr' ? 'Hébergement' : 'Hosting', anchor: 'hosting' },
        { label: language === 'fr' ? 'Consultation' : 'Consultation', anchor: 'consultation' },
        { label: language === 'fr' ? 'Formation' : 'Training', anchor: 'training' },
      ],
    },
    {
      label: t('nav.programs'),
      path: localizePath('/programmes', language),
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Freelances' : 'Freelances', anchor: 'freelances' },
        { label: language === 'fr' ? 'Étudiants' : 'Students', anchor: 'etudiants' },
        { label: language === 'fr' ? 'Open Source' : 'Open Source', anchor: 'open-source' },
        { label: language === 'fr' ? 'Networking' : 'Networking', anchor: 'networking' },
      ],
    },
    {
      label: t('nav.about'),
      path: localizePath('/about', language),
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Notre Histoire' : 'Our Story', anchor: 'story' },
        { label: language === 'fr' ? 'Équipe' : 'Team', anchor: 'team' },
        { label: language === 'fr' ? 'Valeurs' : 'Values', anchor: 'values' },
      ],
    },
    {
      label: t('nav.portfolio'),
      path: localizePath('/portfolio', language),
    },
    {
      label: t('nav.contact'),
      path: localizePath('/contact', language),
    },
  ]
}
