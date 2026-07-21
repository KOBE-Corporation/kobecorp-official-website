import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { HEADER_SCROLL_OFFSET } from '../constants/layout'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef(pathname)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    const isPathChange = previousPathname.current !== pathname
    previousPathname.current = pathname

    const scrollToElement = (element: HTMLElement, headerOffset: number) => {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        left: 0,
        behavior: 'auto',
      })
    }

    if (isPathChange && !hash) {
      scrollTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        })
      }, 50)
      return
    }

    if (hash) {
      const checkAndScroll = () => {
        const element = document.querySelector(hash) as HTMLElement
        if (element) {
          scrollToElement(element, HEADER_SCROLL_OFFSET)
          return true
        }
        return false
      }

      let attempts = 0
      const maxAttempts = 10

      const tryScroll = () => {
        attempts++
        if (checkAndScroll() || attempts >= maxAttempts) {
          return
        }

        scrollTimeoutRef.current = setTimeout(() => {
          tryScroll()
        }, 50 * attempts)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        tryScroll()
      }, 100)

      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
