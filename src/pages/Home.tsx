import HeroHome from '../components/sections/HeroHome'
import ServicesGrid from '../components/sections/ServicesGrid'
import ProgramsPreview from '../components/sections/ProgramsPreview'
import MissionsSection from '../components/sections/MissionsSection'
import ProcessSection from '../components/sections/ProcessSection'
import CTASection from '../components/sections/CTASection'
import SEO from '../components/SEO'
import { useLanguage } from '../contexts/LanguageContext'
import { getSEOData } from '../data/seoData'

function Home() {
  const { language } = useLanguage()
  const seo = getSEOData('/', language)

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
    <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 pb-8 sm:px-6 md:gap-24 md:pb-12 lg:px-8">
      {/* Hero Section */}
      <HeroHome />

      {/* Services Section */}
      <section id="services">
        <ServicesGrid />
      </section>

      {/* Programs Section */}
      <section id="programs">
        <ProgramsPreview />
      </section>

      {/* Missions Section */}
      <section id="missions">
        <MissionsSection />
      </section>

      {/* Process Section */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Testimonials Section - Masquée temporairement */}
      {/* <section>
        <TestimonialsSection />
      </section> */}

      {/* CTA Section - Plus d'espace avant le footer */}
      <section id="cta" className="pb-8">
        <CTASection />
      </section>
    </div>
    </>
  )
}

export default Home
