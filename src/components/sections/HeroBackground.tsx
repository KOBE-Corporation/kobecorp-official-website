import type { ReactNode } from 'react'

interface HeroBackgroundProps {
  children: ReactNode
  className?: string
}

export function HeroBackground({ children, className = '' }: HeroBackgroundProps) {
  return (
    <section
      id="hero"
      className={`relative pt-4 pb-8 md:pt-6 md:pb-12 lg:pt-8 lg:pb-16 min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] ${className}`}
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

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
