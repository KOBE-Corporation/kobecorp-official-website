export const seoData = {
  home: {
    fr: {
      title: 'Accueil - KOBE Corporation',
      description: 'KOBE Corporation - Build Your Own Legacy. Développement logiciel sur mesure, hébergement, consultation et formation au Cameroun. Transformez vos idées en solutions innovantes.',
      keywords: 'KOBE Corporation, développement logiciel Cameroun, applications web Yaoundé, développement mobile, hébergement applications, consultation IT, formation développeurs, Ben Djibril',
    },
    en: {
      title: 'Home - KOBE Corporation',
      description: 'KOBE Corporation - Build Your Own Legacy. Custom software development, hosting, consulting and training in Cameroon. Transform your ideas into innovative solutions.',
      keywords: 'KOBE Corporation, software development Cameroon, web applications Yaoundé, mobile development, application hosting, IT consulting, developer training, Ben Djibril',
    },
  },
  services: {
    fr: {
      title: 'Nos Services & Forfaits SaaS - Développement, Hébergement, Consultation',
      description: 'Découvrez nos services technologiques et nos forfaits SaaS (Pro, Good Deal, Ultra) : développement logiciel sur mesure, hébergement cloud sécurisé, consultation IT et formation au Cameroun.',
      keywords: 'forfaits SaaS Cameroun, pricing SaaS KOBE Corporation, services développement logiciel, développement web Cameroun, hébergement cloud sécurisé, consultation IT, formation développeurs, PME Cameroun',
    },
    en: {
      title: 'Our Services & SaaS Plans - Development, Hosting, Consulting',
      description: 'Discover our technology services and SaaS plans (Pro, Good Deal, Ultra): custom software development, secure cloud hosting, IT consulting and training in Cameroon.',
      keywords: 'SaaS plans Cameroon, KOBE Corporation pricing, software development services, web development Cameroon, secure cloud hosting, IT consulting, developer training, SMEs Cameroon',
    },
  },
  programmes: {
    fr: {
      title: 'Nos Programmes - Freelances, Étudiants & Open Source',
      description: 'Rejoignez nos programmes pour freelances, étudiants et développeurs open source. Opportunités de projets réels, mentorat et certification au Cameroun.',
      keywords: 'programme freelance Cameroun, stage développeur, programme étudiant, open source Cameroun, mentorat développeur, certification développeur',
    },
    en: {
      title: 'Our Programs - Freelancers, Students & Open Source',
      description: 'Join our programs for freelancers, students and open source developers. Real project opportunities, mentoring and certification in Cameroon.',
      keywords: 'freelance program Cameroon, developer internship, student program, open source Cameroon, developer mentoring, developer certification',
    },
  },
  about: {
    fr: {
      title: 'À Propos - Notre Histoire & Vision',
      description: 'Découvrez l\'histoire de KOBE Corporation, fondée par Ben Djibril en 2025. Notre mission : transformer l\'écosystème technologique africain avec des solutions innovantes.',
      keywords: 'KOBE Corporation histoire, Ben Djibril, entreprise tech Cameroun, vision technologique, écosystème tech africain, fondateur développeur',
    },
    en: {
      title: 'About Us - Our Story & Vision',
      description: 'Discover the story of KOBE Corporation, founded by Ben Djibril in 2025. Our mission: transform the African technology ecosystem with innovative solutions.',
      keywords: 'KOBE Corporation story, Ben Djibril, tech company Cameroon, technology vision, African tech ecosystem, developer founder',
    },
  },
  portfolio: {
    fr: {
      title: 'Portfolio - Nos Réalisations',
      description: 'Découvrez les projets réalisés par KOBE Corporation : applications web, mobiles et solutions d\'entreprise développées au Cameroun.',
      keywords: 'portfolio KOBE Corporation, projets développés, réalisations Cameroun, applications web, applications mobiles, projets entreprise',
    },
    en: {
      title: 'Portfolio - Our Achievements',
      description: 'Discover projects completed by KOBE Corporation: web applications, mobile apps and enterprise solutions developed in Cameroon.',
      keywords: 'KOBE Corporation portfolio, developed projects, achievements Cameroon, web applications, mobile applications, enterprise projects',
    },
  },
  contact: {
    fr: {
      title: 'Contact - Parlons de Votre Projet',
      description: 'Contactez KOBE Corporation pour votre projet logiciel ou SaaS. FAQ complète, formulaire, email et téléphone. Disponible 24/7 depuis Yaoundé, Cameroun.',
      keywords: 'contact KOBE Corporation, devis développement logiciel, consultation gratuite, FAQ services IT, forfaits SaaS Cameroun, Yaoundé Cameroun, téléphone entreprise, email contact',
    },
    en: {
      title: 'Contact - Let\'s Talk About Your Project',
      description: 'Contact KOBE Corporation for your software or SaaS project. Full FAQ, contact form, email and phone. Available 24/7 from Yaoundé, Cameroon.',
      keywords: 'contact KOBE Corporation, software development quote, free consultation, IT services FAQ, SaaS plans Cameroon, Yaoundé Cameroon, business phone, contact email',
    },
  },
  privacy: {
    fr: {
      title: 'Politique de Confidentialité - KOBE Corporation',
      description: 'Politique de confidentialité de KOBE Corporation. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.',
      keywords: 'politique confidentialité, protection données, RGPD, vie privée, KOBE Corporation, données personnelles',
    },
    en: {
      title: 'Privacy Policy - KOBE Corporation',
      description: 'KOBE Corporation privacy policy. Learn how we collect, use and protect your personal data in accordance with GDPR.',
      keywords: 'privacy policy, data protection, GDPR, privacy, KOBE Corporation, personal data',
    },
  },
  legal: {
    fr: {
      title: 'Mentions Légales - KOBE Corporation',
      description: 'Mentions légales de KOBE Corporation. Informations sur l\'éditeur du site, l\'hébergement et les droits de propriété intellectuelle.',
      keywords: 'mentions légales, éditeur site, hébergement, propriété intellectuelle, KOBE Corporation',
    },
    en: {
      title: 'Legal Notice - KOBE Corporation',
      description: 'KOBE Corporation legal notice. Information about the site publisher, hosting and intellectual property rights.',
      keywords: 'legal notice, site publisher, hosting, intellectual property, KOBE Corporation',
    },
  },
  terms: {
    fr: {
      title: 'Conditions Générales d\'Utilisation - KOBE Corporation',
      description: 'Conditions générales d\'utilisation du site web KOBE Corporation. Règles et conditions d\'accès et d\'utilisation de nos services.',
      keywords: 'conditions générales, CGU, termes utilisation, règles site, KOBE Corporation',
    },
    en: {
      title: 'Terms & Conditions - KOBE Corporation',
      description: 'Terms and conditions of use of the KOBE Corporation website. Rules and conditions for accessing and using our services.',
      keywords: 'terms conditions, T&C, terms of use, site rules, KOBE Corporation',
    },
  },
}

export const getSEOData = (path: string, language: 'fr' | 'en' = 'en') => {
  const pathKey = path.replace('/', '') || 'home'
  const data = seoData[pathKey as keyof typeof seoData]
  return data ? data[language] : seoData.home[language]
}
