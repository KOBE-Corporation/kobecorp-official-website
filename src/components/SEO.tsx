import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { companyInfo } from '../data/siteContent'
import { useLanguage } from '../contexts/LanguageContext'
import { localizePath, stripLocale, SUPPORTED_LOCALES } from '../utils/locale'
import {
  BRAND_IMAGE_URL,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_TYPE,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_BASE_URL,
} from '../constants/brand'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: string
  noindex?: boolean
  canonical?: string
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

const baseUrl = SITE_BASE_URL
const defaultImage = OG_IMAGE_URL
const defaultDescription =
  'KOBE Corporation - Build Your Own Legacy. Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes. Développement logiciel, hébergement, consultation et formation au Cameroun.'

const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined
const facebookVerification = import.meta.env.VITE_FACEBOOK_DOMAIN_VERIFICATION as string | undefined
const bingVerification = import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined

function absoluteImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image.replace(/https?:\/\/(www\.)?kobecorporation\.com/, baseUrl)
  }
  return `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`
}

/**
 * Normalise une URL canonique pour éviter les duplications
 * - Utilise toujours www.kobecorporation.com
 * - Supprime les paramètres de requête (UTM, tracking, etc.)
 * - Normalise les trailing slashes (supprime sauf pour la home)
 */
function normalizeCanonicalUrl(pathname: string, customCanonical?: string): string {
  if (customCanonical) {
    return customCanonical.replace(/https?:\/\/(www\.)?kobecorporation\.com/, baseUrl)
  }

  let normalizedPath = pathname

  if (stripLocale(normalizedPath) === '/home') {
    const localeMatch = pathname.match(/^\/(fr|en)/)
    normalizedPath = localeMatch ? `/${localeMatch[1]}` : '/'
  }

  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1)
  }

  // Racine → home EN (x-default), cohérent avec la redirection Nginx
  if (normalizedPath === '/') {
    normalizedPath = '/en'
  }

  return `${baseUrl}${normalizedPath}`
}

function setMetaByAttr(
  attr: 'name' | 'property',
  key: string,
  content: string,
) {
  let meta = document.querySelector(`meta[${attr}="${key}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, key)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function SEO({
  title,
  description = defaultDescription,
  keywords = 'KOBE Corporation, développement logiciel, Cameroun, Yaoundé, applications web, applications mobiles, hébergement, consultation, formation, Ben Djibril, Kotlin, KMP, Spring Boot',
  image = defaultImage,
  type = 'website',
  noindex = false,
  canonical,
  structuredData,
}: SEOProps) {
  const location = useLocation()
  const { language } = useLanguage()
  const fullTitle = title
    ? title.includes(companyInfo.name)
      ? title
      : `${title} | ${companyInfo.name}`
    : `${companyInfo.name} - ${companyInfo.slogan}`
  const url = normalizeCanonicalUrl(location.pathname, canonical)
  const imageUrl = absoluteImageUrl(image)
  const imageAlt = `${companyInfo.name} - ${description.substring(0, 100)}`
  const pathWithoutLocale = stripLocale(location.pathname)
  const ogLocale = language === 'en' ? 'en_US' : 'fr_FR'
  const ogLocaleAlternate = language === 'en' ? 'fr_FR' : 'en_US'
  const isDefaultOgImage = imageUrl === OG_IMAGE_URL

  useEffect(() => {
    const updateSEO = () => {
      document.title = fullTitle
      document.documentElement.lang = language

      setMetaByAttr('name', 'description', description)
      setMetaByAttr('name', 'keywords', keywords)
      setMetaByAttr(
        'name',
        'robots',
        noindex
          ? 'noindex, nofollow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      )
      setMetaByAttr(
        'name',
        'googlebot',
        noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
      )

      // Vérifications Search Console / Meta Business (si définies dans .env)
      if (googleVerification) {
        setMetaByAttr('name', 'google-site-verification', googleVerification)
      }
      if (facebookVerification) {
        setMetaByAttr('name', 'facebook-domain-verification', facebookVerification)
      }
      if (bingVerification) {
        setMetaByAttr('name', 'msvalidate.01', bingVerification)
      }

      let linkCanonical = document.querySelector('link[rel="canonical"]')
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.setAttribute('rel', 'canonical')
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.setAttribute('href', url)

      SUPPORTED_LOCALES.forEach((locale) => {
        const href = `${baseUrl}${localizePath(pathWithoutLocale, locale)}`
        let link = document.querySelector(`link[rel="alternate"][hreflang="${locale}"]`)
        if (!link) {
          link = document.createElement('link')
          link.setAttribute('rel', 'alternate')
          link.setAttribute('hreflang', locale)
          document.head.appendChild(link)
        }
        link.setAttribute('href', href)
      })
      const defaultHref = `${baseUrl}${localizePath(pathWithoutLocale, 'en')}`
      let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]')
      if (!xDefault) {
        xDefault = document.createElement('link')
        xDefault.setAttribute('rel', 'alternate')
        xDefault.setAttribute('hreflang', 'x-default')
        document.head.appendChild(xDefault)
      }
      xDefault.setAttribute('href', defaultHref)

      // Open Graph — Meta / Facebook / LinkedIn / WhatsApp
      const ogTags: Array<{ property: string; content: string }> = [
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:secure_url', content: imageUrl },
        { property: 'og:image:alt', content: imageAlt },
        { property: 'og:url', content: url },
        { property: 'og:type', content: type },
        { property: 'og:site_name', content: companyInfo.name },
        { property: 'og:locale', content: ogLocale },
        { property: 'og:locale:alternate', content: ogLocaleAlternate },
      ]

      if (isDefaultOgImage) {
        ogTags.push(
          { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
          { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
          { property: 'og:image:type', content: OG_IMAGE_TYPE },
        )
      }

      ogTags.forEach(({ property, content }) => setMetaByAttr('property', property, content))

      // Twitter / X Card
      ;[
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:image:alt', content: imageAlt },
        { name: 'twitter:site', content: '@kobecorporation' },
        { name: 'twitter:creator', content: '@le_bendji' },
        { name: 'twitter:url', content: url },
      ].forEach(({ name, content }) => setMetaByAttr('name', name, content))
    }

    updateSEO()

    const createSchemas = () => {
      const existingSchemas = document.querySelectorAll(
        'script[type="application/ld+json"][data-kobe-seo="true"]',
      )
      existingSchemas.forEach((schema) => schema.remove())

      const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: companyInfo.name,
        alternateName: 'KOBE Corp',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: BRAND_IMAGE_URL,
          width: 512,
          height: 512,
        },
        image: imageUrl,
        description,
        foundingDate: companyInfo.year,
        address: {
          '@type': 'PostalAddress',
          streetAddress: companyInfo.address.street,
          addressLocality: companyInfo.address.city,
          addressRegion: companyInfo.address.region,
          addressCountry: companyInfo.address.country,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: companyInfo.contact.phone,
            contactType: 'customer service',
            email: companyInfo.contact.email,
            availableLanguage: ['French', 'English'],
            areaServed: 'CM',
          },
        ],
        sameAs: [
          companyInfo.social.linkedin,
          companyInfo.social.facebook,
          companyInfo.social.instagram,
          companyInfo.social.whatsapp,
        ],
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: '1-10',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Cameroun',
        },
        founder: {
          '@type': 'Person',
          name: companyInfo.founder,
          url: 'https://ben-djibril.kobecorporation.com',
        },
      }

      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: companyInfo.name,
        url: baseUrl,
        description,
        publisher: {
          '@type': 'Organization',
          name: companyInfo.name,
        },
        inLanguage: ['fr', 'en'],
      }

      const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description,
        url,
        isPartOf: {
          '@type': 'WebSite',
          url: baseUrl,
        },
        inLanguage: language,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
        },
      }

      const pageSchemas = structuredData
        ? Array.isArray(structuredData)
          ? structuredData
          : [structuredData]
        : []

      ;[organizationSchema, websiteSchema, webPageSchema, ...pageSchemas].forEach((schema) => {
        const schemaScript = document.createElement('script')
        schemaScript.type = 'application/ld+json'
        schemaScript.setAttribute('data-kobe-seo', 'true')
        schemaScript.textContent = JSON.stringify(schema)
        document.head.appendChild(schemaScript)
      })
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(createSchemas, { timeout: 2000 })
    } else {
      setTimeout(createSchemas, 0)
    }
  }, [
    fullTitle,
    description,
    keywords,
    imageUrl,
    imageAlt,
    type,
    noindex,
    url,
    pathWithoutLocale,
    ogLocale,
    ogLocaleAlternate,
    structuredData,
    language,
    isDefaultOgImage,
  ])

  return null
}

export default SEO
