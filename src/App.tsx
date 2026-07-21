import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import type { ReactNode } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import { PageLoader } from './components/PageLoader'
import { useNavigation } from './contexts/NavigationContext'
import {
  DEFAULT_LOCALE,
  getPreferredLocale,
  isSupportedLocale,
  localizePath,
} from './utils/locale'
import type { Language } from './utils/i18n'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Programmes = lazy(() => import('./pages/Programmes'))
const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Legal = lazy(() => import('./pages/Legal'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Valide le paramètre :lang et redirige si invalide */
function LocaleGuard({ children }: { children: ReactNode }) {
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()

  if (!isSupportedLocale(lang)) {
    const preferred = getPreferredLocale()
    const rest = location.pathname.replace(/^\/[^/]+/, '') || ''
    return <Navigate to={`/${preferred}${rest}${location.search}${location.hash}`} replace />
  }

  return <>{children}</>
}

/** `/` → `/fr` ou `/en` selon préférence */
function RootRedirect() {
  const preferred = getPreferredLocale()
  return <Navigate to={`/${preferred}`} replace />
}

/** Anciennes URLs sans préfixe → URLs localisées */
function LegacyRedirect({ path }: { path: string }) {
  const preferred = getPreferredLocale()
  const location = useLocation()
  return (
    <Navigate
      to={`${localizePath(path, preferred)}${location.search}${location.hash}`}
      replace
    />
  )
}

const pageRoutes: Array<{ path: string; element: ReactNode }> = [
  { path: '', element: <Home /> },
  { path: 'services', element: <Services /> },
  { path: 'programmes', element: <Programmes /> },
  { path: 'about', element: <About /> },
  { path: 'portfolio', element: <Portfolio /> },
  { path: 'contact', element: <Contact /> },
  { path: 'privacy', element: <Privacy /> },
  { path: 'legal', element: <Legal /> },
  { path: 'terms', element: <Terms /> },
]

const legacyPaths = [
  '/home',
  '/services',
  '/programmes',
  '/about',
  '/portfolio',
  '/contact',
  '/privacy',
  '/legal',
  '/terms',
]

function AppContent() {
  const { isNavigating } = useNavigation()

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
      deviceMemory?: number
    }

    const cpuCores = nav.hardwareConcurrency ?? 8
    const ramGb = nav.deviceMemory ?? 8
    const saveData = nav.connection?.saveData === true
    const networkType = nav.connection?.effectiveType ?? ''
    const slowNetwork = networkType.includes('2g')
    const isLowPerfDevice = cpuCores <= 4 || ramGb <= 4 || saveData || slowNetwork

    document.documentElement.classList.toggle('low-perf-mode', isLowPerfDevice)

    return () => {
      document.documentElement.classList.remove('low-perf-mode')
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <PageLoader isLoading={isNavigating} />
      <ScrollToTop />
      <Header />
      <main
        className={`flex-1 bg-gradient-to-br from-transparent via-brand-50/20 to-transparent transition-opacity duration-300 ${
          isNavigating ? 'opacity-[0.985]' : 'opacity-100'
        }`}
      >
        <Suspense
          fallback={
            <div className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-gradient-to-b from-white/55 via-white/35 to-white/55 backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-6 py-5 shadow-soft">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
                <p className="text-sm font-medium text-neutral-600">Chargement...</p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<RootRedirect />} />

            {/* Routes localisées : /fr/... et /en/... */}
            <Route
              path="/:lang"
              element={
                <LocaleGuard>
                  <Home />
                </LocaleGuard>
              }
            />
            {pageRoutes
              .filter((route) => route.path !== '')
              .map((route) => (
                <Route
                  key={route.path}
                  path={`/:lang/${route.path}`}
                  element={<LocaleGuard>{route.element}</LocaleGuard>}
                />
              ))}

            {/* Compatibilité anciennes URLs sans préfixe */}
            {legacyPaths.map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <LegacyRedirect path={path === '/home' ? '/' : path} />
                }
              />
            ))}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

function App() {
  return <AppContent />
}

export default App

// Export utilitaire pour tests éventuels
export type { Language }
export { DEFAULT_LOCALE }
