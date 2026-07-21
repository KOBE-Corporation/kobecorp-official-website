import { useState, memo } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo } from '../../data/siteContent'
import { NavigationMenu } from '../navigation/NavigationMenu'
import { MobileNavigationMenu } from '../navigation/MobileNavigationMenu'
import { useNavigationItems } from '../../data/navigation'
import { OptimizedImage } from '../OptimizedImage'
import { useLocalizedPath } from '../../hooks/useLocalizedPath'

const Header = memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const navItems = useNavigationItems()
  const lp = useLocalizedPath()

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md shadow-subtle">
      <div className="mx-auto flex h-auto min-h-16 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-8 lg:py-0 lg:h-16">
        {/* Logo avec Nom et Slogan - Toujours visible même en mobile */}
        <NavLink
          to={lp('/')}
          className="flex min-w-0 flex-1 items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-transparent transition-all duration-200 hover:scale-105 p-1 sm:h-12 sm:w-12">
            <OptimizedImage
              src="/logo-nom.jpeg"
              alt={`${companyInfo.name} - ${companyInfo.slogan}`}
              width={48}
              height={48}
              priority="high"
              className="h-full w-full rounded-lg object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold text-ink sm:text-base lg:text-xl">
              {companyInfo.name}
            </p>
            <p className="truncate text-[10px] font-semibold text-brand-500 sm:text-xs">
              {companyInfo.slogan}
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu items={navItems} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-subtle transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 group"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <GlobeAltIcon className="h-4 w-4 text-neutral-600 transition-colors duration-300 group-hover:text-brand-500" />
            <span className="uppercase text-neutral-700 group-hover:text-brand-600">{language}</span>
          </button>

          {/* CTA Button */}
          <a
            href="https://ben-djibril.kobecorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            aria-label={language === 'fr' ? 'Discuter avec Ben Djibril' : 'Chat with Ben Djibril'}
          >
            {t('nav.chatWithBen')}
            <ArrowRightIcon className="h-4 w-4 text-white" />
          </a>
        </div>

        {/* Mobile Actions - Toujours visible */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {/* Language Switcher Mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-subtle transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 group"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <GlobeAltIcon className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-brand-500" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-subtle transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 group"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5 text-neutral-700 transition-colors duration-300 group-hover:text-brand-500" />
            ) : (
              <Bars3Icon className="h-5 w-5 text-neutral-700 transition-colors duration-300 group-hover:text-brand-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`border-t border-neutral-200 bg-white backdrop-blur-md lg:hidden transition-all duration-200 ease-in-out overflow-hidden ${
          mobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ 
          zIndex: 40,
          willChange: 'max-height, opacity',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <MobileNavigationMenu items={navItems} onClose={() => setMobileMenuOpen(false)} />
          <a
            href="https://ben-djibril.kobecorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-600 hover:shadow-lg focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
            aria-label={language === 'fr' ? 'Discuter avec Ben Djibril' : 'Chat with Ben Djibril'}
          >
            {t('nav.chatWithBen')}
            <ArrowRightIcon className="h-4 w-4 text-white" />
          </a>
        </div>
      </div>
    </header>
  )
})

export default Header
