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
        { label: t('nav.sections.home'), anchor: 'hero' },
        { label: t('nav.sections.services'), anchor: 'services' },
        { label: t('nav.sections.programs'), anchor: 'programs' },
        { label: t('nav.sections.missions'), anchor: 'missions' },
        { label: t('nav.sections.process'), anchor: 'process' },
        { label: t('nav.sections.contact'), anchor: 'cta' },
      ],
    },
    {
      label: t('nav.services'),
      path: localizePath('/services', language),
      sections: [
        { label: t('nav.sections.home'), anchor: 'hero' },
        { label: t('nav.sections.saasPlans'), anchor: 'forfait-saas' },
        { label: t('nav.sections.development'), anchor: 'development' },
        { label: t('nav.sections.hosting'), anchor: 'hosting' },
        { label: t('nav.sections.consultation'), anchor: 'consultation' },
        { label: t('nav.sections.training'), anchor: 'training' },
      ],
    },
    {
      label: t('nav.programs'),
      path: localizePath('/programmes', language),
      sections: [
        { label: t('nav.sections.home'), anchor: 'hero' },
        { label: t('nav.sections.freelances'), anchor: 'freelances' },
        { label: t('nav.sections.students'), anchor: 'etudiants' },
        { label: t('nav.sections.openSource'), anchor: 'open-source' },
        { label: t('nav.sections.networking'), anchor: 'networking' },
      ],
    },
    {
      label: t('nav.about'),
      path: localizePath('/about', language),
      sections: [
        { label: t('nav.sections.home'), anchor: 'hero' },
        { label: t('nav.sections.story'), anchor: 'story' },
        { label: t('nav.sections.team'), anchor: 'team' },
        { label: t('nav.sections.values'), anchor: 'values' },
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
