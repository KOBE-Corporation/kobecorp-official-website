import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

function HeroHome() {
  const { language, t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      ref={elementRef}
      id="hero"
      className="relative pt-4 pb-8 md:pt-6 md:pb-12 lg:pt-8 lg:pb-16 min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]"
      style={{ isolation: 'isolate' }}
    >
      {/* Modern Background with grid pattern and geometric shapes */}
      <div 
        className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden" 
        style={{ 
          zIndex: 0,
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        {/* Subtle grid pattern - Similar to Laravel Bootcamp - More visible */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,122,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Geometric shapes - Rounded square - Animated floating */}
        <div 
          className="absolute top-20 right-20 h-32 w-32 rounded-2xl border-2 border-brand-300/70 animate-float-shape" 
          style={{ 
            animationDelay: '0s',
            willChange: 'transform',
          }} 
        />
        
        {/* Geometric shapes - Circle - Animated gentle float */}
        <div 
          className="absolute bottom-32 left-16 h-24 w-24 rounded-full border-2 border-brand-300/65 animate-float-gentle animate-pulse-border" 
          style={{ 
            animationDelay: '1s',
            willChange: 'transform, opacity',
          }} 
        />
        
        {/* Geometric shapes - Hexagon - Animated slow rotation */}
        <div 
          className="absolute top-1/2 right-1/4 h-20 w-20 border-2 border-brand-300/60 animate-rotate-slow" 
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            transformOrigin: 'center',
            animationDelay: '2s',
            willChange: 'transform',
          }} 
        />
        
        {/* Additional small shapes for depth - Animated */}
        <div 
          className="absolute top-40 left-1/3 h-16 w-16 rounded-lg border-2 border-accent-300/60 animate-float-shape" 
          style={{ 
            transform: 'rotate(-15deg)',
            animationDelay: '0.5s',
            willChange: 'transform',
          }} 
        />
        <div 
          className="absolute bottom-40 right-1/3 h-12 w-12 rounded-full border-2 border-accent-300/55 animate-float-gentle animate-pulse-border" 
          style={{ 
            animationDelay: '1.5s',
            willChange: 'transform, opacity',
          }} 
        />
        
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge with enhanced animation */}
          <div
            className={`mb-8 flex justify-center transition-all duration-800 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-8 opacity-0 scale-90'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <Badge variant="primary" icon={<SparklesIcon className="h-4 w-4 animate-pulse" />}>
              {companyInfo.slogan}
            </Badge>
          </div>

          {/* Main Title - Centered with black text */}
          <h1
            className={`mb-6 font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {t('home.hero.title')}
          </h1>

          {/* Subtitle with refined typography - Centered */}
          <p
            className={`mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-neutral-700 transition-all duration-1000 ease-out md:text-xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            {t('home.hero.subtitle')}
          </p>

          {/* Description - Centered */}
          <p
            className={`mx-auto mb-10 max-w-2xl text-base leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {t('home.hero.description')}
          </p>

          {/* CTA Buttons - Centered with enhanced hover effects */}
          <div
            className={`mb-16 flex flex-wrap justify-center gap-4 transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '750ms' }}
          >
            <Button
              to="/services"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              iconPosition="right"
              className="group/btn relative overflow-hidden"
            >
              <span className="relative z-10">{t('home.hero.cta1')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
            </Button>
            <Button
              to="/contact"
              variant="secondary"
              size="lg"
              className="group/btn"
            >
              {t('home.hero.cta2')}
            </Button>
          </div>
        </div>

        {/* Mission Card - Centered below content */}
        <div className="mx-auto max-w-3xl">
          <Card
            elevation="lg"
            className={`group relative overflow-hidden transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100 scale-100 rotate-0'
                : 'translate-y-16 opacity-0 scale-90 -rotate-2'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-accent-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Content */}
            <div className="relative z-10 space-y-6 p-8 text-center md:p-10">
              {/* Header with animated line - Centered */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative h-1.5 w-16 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-600 transition-colors duration-300 group-hover:text-brand-700">
                  {language === 'fr' ? 'Notre mission' : 'Our Mission'}
                </p>
                <div className="relative h-1.5 w-16 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </div>
              </div>

              {/* Mission text with improved readability - Centered */}
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-700 transition-colors duration-300 group-hover:text-neutral-800 md:text-xl">
                {language === 'fr'
                  ? 'Nous créons des expériences et des opérations qui mettent vos équipes et vos clients au centre. Notre approche holistique combine stratégie, design et technologies pour livrer des résultats mesurables.'
                  : 'We create experiences and operations that put your teams and clients at the center. Our holistic approach combines strategy, design and technology to deliver measurable results.'}
              </p>

              {/* Decorative elements - Centered */}
              <div className="flex justify-center gap-2 pt-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-1 w-12 rounded-full bg-gradient-to-r from-brand-400 to-brand-500 opacity-30 transition-all duration-500 group-hover:opacity-60"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HeroHome
