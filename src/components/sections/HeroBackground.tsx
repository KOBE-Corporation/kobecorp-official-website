import { forwardRef, type ReactNode } from 'react'

interface HeroBackgroundProps {
  children: ReactNode
  className?: string
  /** default = home ; compact = pages internes */
  variant?: 'default' | 'compact'
}

export const HeroBackground = forwardRef<HTMLElement, HeroBackgroundProps>(
  function HeroBackground({ children, className = '', variant = 'default' }, ref) {
    const sizeClasses =
      variant === 'compact'
        ? 'pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10 min-h-[380px] lg:min-h-[420px] mb-16 md:mb-20'
        : 'pt-4 pb-8 md:pt-6 md:pb-12 lg:pt-8 lg:pb-16 min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]'

    return (
      <section
        ref={ref}
        id="hero"
        className={`relative ${sizeClasses} ${className}`}
        style={{ isolation: 'isolate' }}
      >
        <div
          className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,122,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* 2 formes max pour la perf */}
          <div
            className="absolute top-20 right-16 h-28 w-28 rounded-2xl border-2 border-brand-300/70 animate-float-shape md:right-20 md:h-32 md:w-32"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute bottom-24 left-12 h-20 w-20 rounded-full border-2 border-brand-300/65 animate-float-gentle md:bottom-32 md:left-16 md:h-24 md:w-24"
            style={{ animationDelay: '1s' }}
          />
          {variant === 'default' && (
            <div
              className="absolute top-1/2 right-1/4 hidden h-20 w-20 border-2 border-brand-300/50 md:block"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            />
          )}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    )
  },
)
