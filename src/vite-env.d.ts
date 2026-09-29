/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string
  readonly VITE_FACEBOOK_DOMAIN_VERIFICATION?: string
  readonly VITE_BING_SITE_VERIFICATION?: string
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_CONTACT_TEMPLATE_ID?: string
  readonly VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.avif' {
  const src: string
  export default src
}
