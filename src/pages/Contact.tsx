import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { getContactFaqs, type FAQEntry } from '../data/contactFaqs'
import { companyInfo, contactInfo } from '../data/siteContent'
import {
  PaperClipIcon,
  CheckCircleIcon,
  XCircleIcon,
  RocketLaunchIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { WhatsAppIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../components/icons/SocialIcons'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { PageHero } from '../components/sections/PageHero'

// Composant pour les informations de contact
function ContactInfoCard({ info, index, language }: { info: any; index: number; language: 'fr' | 'en' }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <Card
      ref={elementRef}
      elevation="md"
      className={`group flex items-start gap-3 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        {info.icon}
      </div>
      <div className="flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {language === 'fr' ? info.label : info.labelEn}
        </p>
        {info.link ? (
          <a
            href={info.link}
            className="text-sm font-semibold text-ink transition-colors duration-300 hover:text-brand-600 focus:outline-none"
            aria-label={language === 'fr' ? `Contact ${info.label}` : `Contact ${info.labelEn}`}
          >
            {info.value}
          </a>
        ) : (
          <p className="text-sm font-semibold text-ink">
            {info.value}
          </p>
        )}
      </div>
    </Card>
  )
}

// Composant pour un item FAQ individuel
function FAQItem({ faq, index, isOpen, onToggle }: { faq: { question: string; answer: string }; index: number; isOpen: boolean; onToggle: () => void }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`group/faq relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
        isOpen
          ? 'border-brand-300 bg-gradient-to-br from-brand-50/80 to-white shadow-lg'
          : 'border-neutral-200 bg-white hover:border-brand-200 hover:shadow-md'
      } ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Ligne décorative animée */}
      <div className={`absolute top-0 left-0 h-1 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 ${
        isOpen ? 'w-full' : 'w-0'
      }`} />
      
      {/* Gradient au hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover/faq:opacity-100" />
      
      <button
        onClick={onToggle}
        className="relative flex w-full items-center justify-between gap-4 p-4 text-left transition-all duration-300 hover:bg-brand-50/30"
        aria-expanded={isOpen}
      >
        <div className="flex flex-1 items-start gap-3">
          <div className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold shadow-sm transition-all duration-300 ${
            isOpen
              ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white scale-110 rotate-6'
              : 'bg-brand-50 text-brand-600 group-hover/faq:bg-brand-100 group-hover/faq:scale-105'
          }`}>
            {index + 1}
          </div>
          <h4 className={`flex-1 font-semibold leading-snug transition-all duration-300 ${
            isOpen ? 'text-brand-700 text-base' : 'text-ink text-sm'
          }`}>
            {faq.question}
          </h4>
        </div>
        <div className={`flex-shrink-0 rounded-lg p-1 transition-all duration-300 ${
          isOpen ? 'bg-brand-100 rotate-180' : 'bg-white border border-neutral-200 group-hover/faq:bg-brand-50'
        }`}>
          <ChevronDownIcon className={`h-5 w-5 transition-colors duration-300 ${
            isOpen ? 'text-brand-600' : 'text-neutral-600'
          }`} />
        </div>
      </button>
      
      {/* Contenu de la réponse */}
      <div className={`overflow-hidden transition-all duration-500 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm leading-relaxed text-neutral-600">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQAccordion({ faqs }: { faqs: FAQEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => toggleFAQ(index)}
        />
      ))}
    </div>
  )
}

function Contact() {
  const { language } = useLanguage()
  const seo = getSEOData('/contact', language)
  const faqs = getContactFaqs(language)
  const contactStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: language === 'fr' ? 'Contact KOBE Corporation' : 'KOBE Corporation Contact',
      url: 'https://www.kobecorporation.com/contact',
      description: seo.description,
      inLanguage: language,
      about: {
        '@type': 'Organization',
        name: companyInfo.name,
        url: 'https://www.kobecorporation.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    attachment: null as File | null,
    consent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const projectTypes = [
    { value: 'web', label: 'Développement Web', labelEn: 'Web Development' },
    { value: 'mobile', label: 'Développement Mobile', labelEn: 'Mobile Development' },
    { value: 'hosting', label: 'Hébergement', labelEn: 'Hosting' },
    { value: 'training', label: 'Formation', labelEn: 'Training' },
    { value: 'consulting', label: 'Consultation', labelEn: 'Consulting' },
    { value: 'other', label: 'Autre', labelEn: 'Other' },
  ]

  const budgetRanges = [
    { value: '<500k', label: '< 500 000 FCFA', labelEn: '< 500,000 FCFA' },
    { value: '500k-1m', label: '500 000 - 1 000 000 FCFA', labelEn: '500,000 - 1,000,000 FCFA' },
    { value: '1m-5m', label: '1 000 000 - 5 000 000 FCFA', labelEn: '1,000,000 - 5,000,000 FCFA' },
    { value: '5m-10m', label: '5 000 000 - 10 000 000 FCFA', labelEn: '5,000,000 - 10,000,000 FCFA' },
    { value: '>10m', label: '> 10 000 000 FCFA', labelEn: '> 10,000,000 FCFA' },
    { value: 'discuss', label: 'À discuter', labelEn: 'To discuss' },
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(false)
    setSubmitStatus('error')
  }

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={contactStructuredData}
      />
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
      <PageHero
        badge={language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
        badgeIcon={<RocketLaunchIcon className="h-4 w-4 animate-pulse" />}
        title={language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
        subtitle={
          language === 'fr'
            ? 'Nous sommes disponibles 24/7 pour répondre à vos besoins et transformer vos idées en réalité.'
            : 'We are available 24/7 to meet your needs and transform your ideas into reality.'
        }
        description={
          language === 'fr'
            ? 'Discutons de votre projet, explorons vos besoins et découvrons ensemble comment nous pouvons vous accompagner vers le succès. Notre équipe d\'experts est prête à écouter vos défis et à proposer des solutions sur mesure qui correspondent à vos objectifs.'
            : 'Let\'s discuss your project, explore your needs and discover together how we can support you towards success. Our team of experts is ready to listen to your challenges and propose tailor-made solutions that match your objectives.'
        }
      />

      {/* Layout principal : Formulaire + Informations */}
      <div className="grid gap-12 lg:grid-cols-3 mb-16">
        {/* Formulaire de Contact amélioré - Prend plus d'espace */}
        <div className="lg:col-span-2">
          <Card elevation="lg" className="group relative p-8 md:p-10">

            <div className="relative">
              <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">
                {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
              </h2>

              {/* Message de succès amélioré */}
              {submitStatus === 'success' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800 shadow-sm transition-all duration-500">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <div>
                    <p className="font-semibold">
                      {language === 'fr'
                        ? 'Message envoyé avec succès !'
                        : 'Message sent successfully!'}
                    </p>
                    <p className="text-xs text-green-700">
                      {language === 'fr'
                        ? 'Nous vous répondrons sous 24h.'
                        : 'We will respond within 24h.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Message d'erreur */}
              {submitStatus === 'error' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">
                  <XCircleIcon className="h-5 w-5 flex-shrink-0 text-amber-600" />
                  <div>
                    <p className="font-semibold">
                      {language === 'fr'
                        ? 'Formulaire bientôt disponible'
                        : 'Form coming soon'}
                    </p>
                    <p className="text-xs text-amber-800">
                      {language === 'fr'
                        ? 'Contactez-nous par email ou WhatsApp en attendant.'
                        : 'Please reach us by email or WhatsApp in the meantime.'}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group/field">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Nom complet' : 'Full name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300"
                      placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                    />
                  </div>
                  <div className="group/field">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group/field">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300"
                      placeholder="+237 XXX XXX XXX"
                    />
                  </div>
                  <div className="group/field">
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Entreprise' : 'Company'}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300"
                      placeholder={language === 'fr' ? 'Nom de votre entreprise' : 'Company name'}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group/field">
                    <label
                      htmlFor="projectType"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Type de projet' : 'Project type'}
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300"
                    >
                      <option value="">
                        {language === 'fr' ? 'Sélectionner...' : 'Select...'}
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {language === 'fr' ? type.label : type.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="group/field">
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Budget estimé' : 'Estimated budget'}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300"
                    >
                      <option value="">
                        {language === 'fr' ? 'Sélectionner...' : 'Select...'}
                      </option>
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {language === 'fr' ? range.label : range.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="group/field">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                  >
                    {language === 'fr' ? 'Message' : 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300 resize-none"
                    placeholder={language === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'}
                  />
                </div>

                <div className="group/field">
                  <label
                    htmlFor="attachment"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                  >
                    <PaperClipIcon className="h-4 w-4" />
                    {language === 'fr'
                      ? 'Pièce jointe (optionnel)'
                      : 'Attachment (optional)'}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      onChange={handleFileChange}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
                    />
                    {formData.attachment && (
                      <p className="mt-2 text-xs text-neutral-600">
                        {language === 'fr' ? 'Fichier sélectionné :' : 'Selected file:'} {formData.attachment.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-neutral-300 text-brand-500 transition-all duration-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm leading-relaxed text-neutral-600"
                  >
                    {language === 'fr' ? (
                      <>
                        J'accepte que mes données soient utilisées pour me
                        recontacter *
                      </>
                    ) : (
                      <>I agree that my data be used to contact me back *</>
                    )}
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  icon={!isSubmitting ? <RocketLaunchIcon className="h-4 w-4" /> : undefined}
                  iconPosition="right"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                    </>
                  ) : (
                    language === 'fr' ? 'Envoyer le message' : 'Send message'
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Informations de Contact avec animations - Colonne droite */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">
              {language === 'fr' ? 'Informations de Contact' : 'Contact Information'}
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={index} info={info} index={index} language={language} />
              ))}
            </div>
          </div>

          {/* Réseaux Sociaux améliorés */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-ink">
              {language === 'fr' ? 'Suivez-Nous' : 'Follow Us'}
            </h3>
            <div className="flex gap-3">
              <a
                href={companyInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-all duration-300 hover:scale-110 hover:bg-[#25D366] hover:text-white hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#1877F2]/10 text-[#1877F2] transition-all duration-300 hover:scale-110 hover:bg-[#1877F2] hover:text-white hover:shadow-lg"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:bg-[#0A66C2] hover:text-white hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4405F]/10 text-[#E4405F] transition-all duration-300 hover:scale-110 hover:bg-[#E4405F] hover:text-white hover:shadow-lg"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Interactive avec accordéon - En bas verticalement sur grands écrans */}
      <section className="mt-16">
        <Card elevation="lg" className="group relative p-8 md:p-12">
          <div className="relative">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg">
                <QuestionMarkCircleIcon className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl text-ink md:text-3xl">
                {language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
              </h2>
            </div>
            <FAQAccordion faqs={faqs} />
          </div>
        </Card>
      </section>
    </div>
    </>
  )
}

export default Contact
