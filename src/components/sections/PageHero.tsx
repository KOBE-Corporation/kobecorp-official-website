import type { ReactNode } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Badge } from '../ui/Badge'
import { HeroBackground } from './HeroBackground'

interface PageHeroProps {
  badge: string
  badgeIcon?: ReactNode
  title: string
  subtitle: string
  description?: string
  variant?: 'default' | 'compact'
}

/** Hero marketing standardisé (pages internes) */
export function PageHero({
  badge,
  badgeIcon,
  title,
  subtitle,
  description,
  variant = 'compact',
}: PageHeroProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <HeroBackground ref={elementRef} variant={variant}>
      <div className="mx-auto max-w-4xl text-center">
        <div
          className={`mb-8 flex justify-center transition-all duration-800 ease-out ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <Badge variant="primary" icon={badgeIcon}>
            {badge}
          </Badge>
        </div>

        <h1
          className={`mb-6 font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {title}
        </h1>

        <p
          className={`mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-neutral-700 transition-all duration-1000 ease-out md:text-xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          {subtitle}
        </p>

        {description && (
          <p
            className={`mx-auto mb-6 max-w-2xl text-base leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {description}
          </p>
        )}
      </div>
    </HeroBackground>
  )
}
