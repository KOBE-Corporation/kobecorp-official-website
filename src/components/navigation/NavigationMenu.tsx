import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import type { NavItem } from '../../data/navigation'
import { HEADER_SCROLL_OFFSET } from '../../constants/layout'

interface NavigationMenuProps {
  items: NavItem[]
  className?: string
}

export function NavigationMenu({ items, className = '' }: NavigationMenuProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Note: Le scroll vers les sections est géré par ScrollToTop
  // On ne gère plus le scroll ici pour éviter les conflits

  // Gérer la fermeture du dropdown en cliquant en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      let clickedInside = false

      Object.keys(dropdownRefs.current).forEach((key) => {
        if (dropdownRefs.current[key]?.contains(target)) {
          clickedInside = true
        }
      })

      if (!clickedInside && openDropdown) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown) {
      // Petit délai pour éviter que le clic qui ouvre le dropdown ne le ferme immédiatement
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  const handleNavClick = (e: React.MouseEvent, path: string, anchor?: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Fermer le dropdown
    setOpenDropdown(null)
    
    if (anchor) {
      // Si on est déjà sur la page, scroll vers la section
      if (location.pathname === path) {
        setTimeout(() => {
          const element = document.getElementById(anchor)
          if (element) {
            const headerOffset = HEADER_SCROLL_OFFSET
              const elementPosition = element.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
            // Mettre à jour l'URL avec le hash
            window.history.replaceState(null, '', `${path}#${anchor}`)
          }
        }, 100)
      } else {
        // Sinon, naviguer avec le hash - le useEffect gérera le scroll
        navigate(`${path}#${anchor}`)
      }
    } else {
      // Si pas d'ancre, naviguer vers la page
      navigate(path)
    }
  }

  const handleMainNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDropdown(null)
    navigate(item.path)
  }

  const handleToggleSections = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDropdown(openDropdown === item.path ? null : item.path)
  }

  // Détecter si c'est un layout vertical (footer)
  const isVertical = className.includes('flex-col')

  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      {items.map((item) => {
        const hasSections = item.sections && item.sections.length > 0
        const isOpen = openDropdown === item.path

        if (hasSections) {
          const isActive = location.pathname === item.path
          return (
            <div
              key={item.path}
              ref={(el) => {
                dropdownRefs.current[item.path] = el
              }}
              className={`relative ${isVertical ? 'w-full' : ''}`}
            >
              <div className={`relative ${isVertical ? 'w-full' : 'inline-flex'} items-center`}>
                <button
                  onClick={(e) => handleMainNavClick(e, item)}
                  className={`relative ${isVertical ? 'flex-1 justify-start' : 'inline-flex'} flex items-center gap-1.5 ${isVertical ? 'rounded-lg px-3 py-2' : 'rounded-full px-4 py-2'} text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                  }`}
                  aria-label={item.label}
                >
                  {isActive && !isVertical && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-500" />
                  )}
                  {isActive && isVertical && (
                    <span className="absolute bottom-0 left-3 h-0.5 w-8 rounded-full bg-brand-500" />
                  )}
                  {item.label}
                </button>
                <button
                  onClick={(e) => handleToggleSections(e, item)}
                  className="rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                  aria-label={`${item.label} - ${t('nav.showSections') || 'Show sections'}`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {isOpen && (
                <div
                  className={`${isVertical ? 'relative mt-1 w-full' : 'absolute top-full left-0 mt-2'} ${isVertical ? 'min-w-full' : 'min-w-[200px]'} rounded-xl bg-white shadow-card-hover z-50 animate-fadeInUp`}
                  style={{ zIndex: 50 }}
                >
                  <div className="py-2">
                    {item.sections?.map((section, index) => {
                      // Vérifier si cette section est actuellement visible (basé sur le hash de l'URL)
                      const currentHash = window.location.hash.replace('#', '')
                      const isSectionActive = location.pathname === item.path && currentHash === section.anchor
                      
                      return (
                        <button
                          key={section.anchor}
                          onClick={(e) => handleNavClick(e, item.path, section.anchor)}
                          className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-200 focus:outline-none focus:ring-0 focus:border-0 ${
                            isSectionActive
                              ? 'text-brand-500 font-semibold'
                              : 'text-neutral-600 hover:bg-neutral-50 hover:text-brand-500'
                          }`}
                          style={{
                            animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                          }}
                          aria-label={`${item.label} - ${section.label}`}
                        >
                          {section.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        }

        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative ${isVertical ? 'w-full text-left rounded-lg px-3 py-2' : 'rounded-full px-4 py-2'} text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0 ${
              isActive
                ? 'text-brand-500 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
            }`}
            aria-label={item.label}
          >
            {item.label}
            {isActive && !isVertical && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-500" />
            )}
            {isActive && isVertical && (
              <span className="absolute bottom-0 left-3 h-0.5 w-8 rounded-full bg-brand-500" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
