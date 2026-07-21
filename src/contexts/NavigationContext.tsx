import { createContext, useContext, useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface NavigationContextType {
  isNavigating: boolean
  setIsNavigating: (value: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const location = useLocation()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const checkCountRef = useRef(0)
  const previousPathname = useRef(location.pathname)

  useEffect(() => {
    // Nettoyer toutes les références précédentes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    checkCountRef.current = 0

    // Ne déclencher le loader que si on change vraiment de page
    const isPathChange = previousPathname.current !== location.pathname
    previousPathname.current = location.pathname

    if (!isPathChange) {
      // Si c'est juste un changement de hash, pas besoin de loader
      return
    }

    // Démarrer le chargement lors du changement de route
    setIsNavigating(true)

    // Vérifier si la page est complètement prête (version optimisée)
    const checkPageReady = (): boolean => {
      // Vérifier que le DOM est stable
      const main = document.querySelector('main')
      if (!main) {
        return false
      }

      // Vérifier si la section hero existe et est rendue
      const heroSection = document.getElementById('hero')
      
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        
        // Vérifier que l'élément est rendu (a une hauteur)
        const isRendered = rect.height > 0 && rect.width > 0
        
        // Avec un hash, ne pas exiger d'être en haut de page
        const hasHash = Boolean(window.location.hash)
        const isAtTop = hasHash || window.scrollY <= 150
        const isHeroVisible = hasHash || rect.top <= 250
        
        return isRendered && isAtTop && isHeroVisible
      } else {
        const mainHasContent = main.children.length > 0
        const hasHash = Boolean(window.location.hash)
        const isAtTop = hasHash || window.scrollY <= 150
        
        return mainHasContent && isAtTop
      }
    }

    // Fonction pour arrêter le chargement de manière sûre
    const stopLoading = () => {
      // Attendre que le navigateur ait fini de peindre
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsNavigating(false)
        })
      })
    }

    // Vérifier périodiquement avec un délai progressif
    // Réduire les délais pour un affichage plus rapide
    const checkDelay = 30
    const maxChecks = 20 // Maximum 0.6 secondes (20 * 30ms)

    // Vérifier immédiatement d'abord (optimisation)
    requestAnimationFrame(() => {
      if (checkPageReady() && checkCountRef.current < 3) {
        checkCountRef.current = 3
        stopLoading()
        return
      }
    })

    intervalRef.current = setInterval(() => {
      checkCountRef.current++
      
      if (checkPageReady()) {
        // Vérifier au moins 1 fois pour s'assurer que la page est stable
        if (checkCountRef.current >= 1) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          stopLoading()
          return
        }
      }

      // Arrêter après trop de vérifications (sécurité)
      if (checkCountRef.current >= maxChecks) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        stopLoading()
      }
    }, checkDelay)

    // Timeout de sécurité : arrêter le chargement après un délai maximum (réduit)
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsNavigating(false)
    }, 800) // Maximum 0.8 seconde de chargement (réduit de 2s)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [location.pathname]) // Ne pas dépendre du hash pour éviter les re-renders inutiles

  return (
    <NavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
