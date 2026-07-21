type Language = 'fr' | 'en'

export type { Language }

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      services: 'Services',
      programs: 'Programmes',
      about: 'À propos',
      portfolio: 'Portfolio',
      contact: 'Contact',
      startProject: 'Démarrer un Projet',
      chatWithBen: 'Discuter avec Ben Djibril',
      overview: 'Vue d\'ensemble',
      showSections: 'Afficher les sections',
      sections: {
        home: 'Accueil',
        services: 'Services',
        programs: 'Programmes',
        missions: 'Missions',
        process: 'Processus',
        contact: 'Contact',
        saasPlans: 'Forfaits SaaS',
        development: 'Développement Logiciel',
        hosting: 'Hébergement',
        consultation: 'Consultation',
        training: 'Formation',
        freelances: 'Freelances',
        students: 'Étudiants',
        openSource: 'Open Source',
        networking: 'Networking',
        story: 'Notre Histoire',
        team: 'Équipe',
        values: 'Valeurs',
      },
    },
    // Home Page
    home: {
      hero: {
        title: 'Construisez Votre Propre Héritage Numérique',
        subtitle: 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes',
        description: 'Depuis 2025, nous développons des logiciels sur mesure pour les individus, PME et grandes entreprises. Nous hébergeons vos applications et accompagnons votre croissance digitale.',
        cta1: 'Découvrir nos services',
        cta2: 'Nous contacter',
      },
      mission: {
        title: 'Notre mission',
        text: 'Nous créons des expériences et des opérations qui mettent vos équipes et vos clients au centre. Notre approche holistique combine stratégie, design et technologies pour livrer des résultats mesurables.',
      },
      stats: {
        year: 'Année de création',
        availability: 'Disponibilité',
        clientTypes: 'Types de clients',
        customSolutions: 'Solutions personnalisées',
      },
      services: {
        title: 'Nos Expertises',
        service1: {
          title: 'Développement Logiciel',
          desc: 'Applications web, mobiles et desktop sur mesure pour répondre à vos besoins spécifiques',
        },
        service2: {
          title: 'Hébergement & Infrastructure',
          desc: 'Hébergement sécurisé de vos applications avec une disponibilité optimale',
        },
        service3: {
          title: 'Consultation & Audit',
          desc: 'Analyse de vos besoins et recommandations stratégiques pour votre transformation digitale',
        },
        service4: {
          title: 'Formation & Bootcamp',
          desc: 'Programmes de formation intensive pour développer vos compétences techniques',
        },
      },
      programs: {
        title: 'Nos Programmes',
        freelance: 'Freelances',
        students: 'Étudiants',
        openSource: 'Open Source',
        networking: 'Networking',
      },
      testimonials: {
        title: 'Ce Que Disent Nos Clients',
      },
      cta: {
        title: 'Prêt à Démarrer Votre Projet ?',
        text: 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins',
        button: 'Commencer maintenant',
      },
    },
    // Services Page
    services: {
      title: 'Nos Services',
      subtitle: 'Des solutions technologiques complètes pour votre réussite',
      // ... (à compléter)
    },
    // Pricing (Forfait SaaS)
    pricing: {
      sectionBadge: 'Forfaits SaaS',
      sectionTitle: 'Forfait SaaS',
      sectionSubtitle: 'Choisissez le forfait adapté à votre projet. Tarifs mensuels hors taxes.',
      redirectText: 'Pour plus de détails sur les fonctionnalités et options, consultez la page complète de nos offres.',
      redirectCta: 'En savoir plus sur les offres',
      included: 'Ce qui est inclus',
      perMonth: 'mois (Hors Taxes)',
      annualPayment: 'Paiement Annuel',
      goodDealLabel: 'Bon plan',
      plans: {
        pro: 'Pro',
        proDescription: 'Forfait équilibré pour les entrepreneurs ambitieux, avec un suivi régulier.',
        proStrikethrough: '50 000f',
        goodDeal: 'Good Deal',
        goodDealDescription: 'Forfait accessible pour lancer votre plateforme personnalisée à moindre coût.',
        goodDealStrikethrough: '30 000f',
        ultra: 'Ultra',
        ultraDescription: 'Forfait haut de gamme pour les projets stratégiques, avec accompagnement rapproché.',
        ultraStrikethrough: '60 000f',
      },
      features: {
        domainSubdomainMailPro: 'Domaine + sous-domaine + Mail pro',
        fiftyPercentPremium: '50% des fonctionnalités premium débloquées',
        hosting15Go: 'Hébergement cloud 15Go extensible',
        advancedSearchFilters: 'Recherche avancée + filtres personnalisés',
        supportEmailWhatsapp24h: 'Support Email + WhatsApp (24h)',
        graphicCustomization: 'Personnalisation graphique (couleurs, logo etc.)',
        analyticsDashboard: 'Tableau de bord analytique complet',
        limitedAds: 'Publicité limitées',
        domainMailPro: 'Nom de domaine + Mail pro',
        freeModulesCrm: 'Modules gratuits (CRM - Produits - Commandes - Facturation)',
        hosting10Go: 'Hébergement cloud 10Go extensible',
        threeInterfaces: '3 interfaces (Admin, Employee, User)',
        basicSearchFilters: 'Recherche & filtres basiques',
        supportEmail48h: 'Support email (48h)',
        premiumModulesLocked: 'Modules Premium verrouillés',
        kobeAdsIncluded: 'Annonces Kobe Corp incluses',
        domainTwoSubdomainsMailPremium: 'Domaine + 2 sous-domaines + Mail premium',
        allFeaturesUnlocked: 'Toutes les fonctionnalités débloquées',
        aiSearchAdvancedFilters: 'Recherche intelligente IA + filtres avancés',
        biAnalyticsUnlimited: 'BI Analytics prédictifs + rapports illimités',
        fullUiUxCustomization: 'Personnalisation totale UI/UX sur mesure',
        unlimitedCloudBackup: 'Sauvegarde cloud illimitée',
        hosting20Go: 'Hébergement cloud 20Go extensible',
        restApiIntegrations: 'API REST complète + Intégrations tierces',
        dedicatedProjectManagerVip: 'Chef de projet dédié + Support VIP 7j/7',
        noAdsNoRestrictions: 'Sans publicité + Aucune restriction',
      },
    },
    // Footer
    footer: {
      slogan: 'Build Your Own Legacy',
      description: 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes.',
      quickLinks: 'Liens rapides',
      programs: 'Programmes',
      followUs: 'Suivez-nous',
      available247: 'Disponible 24/7',
      copyright: '© 2025 KOBE Corporation. Tous droits réservés.',
      legal: {
        privacy: 'Politique de confidentialité',
        terms: 'Mentions légales',
        cookies: 'Cookies',
      },
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      programs: 'Programs',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
      startProject: 'Start a Project',
      chatWithBen: 'Chat with Ben Djibril',
      overview: 'Overview',
      showSections: 'Show sections',
      sections: {
        home: 'Home',
        services: 'Services',
        programs: 'Programs',
        missions: 'Missions',
        process: 'Process',
        contact: 'Contact',
        saasPlans: 'SaaS Plans',
        development: 'Software Development',
        hosting: 'Hosting',
        consultation: 'Consultation',
        training: 'Training',
        freelances: 'Freelances',
        students: 'Students',
        openSource: 'Open Source',
        networking: 'Networking',
        story: 'Our Story',
        team: 'Team',
        values: 'Values',
      },
    },
    // Home Page
    home: {
      hero: {
        title: 'Build Your Own Legacy',
        subtitle: 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions',
        description: 'Since 2025, we develop custom software for individuals, SMEs and large enterprises. We host your applications and support your digital growth.',
        cta1: 'Discover our services',
        cta2: 'Contact us',
      },
      mission: {
        title: 'Our Mission',
        text: 'We create experiences and operations that put your teams and clients at the center. Our holistic approach combines strategy, design and technology to deliver measurable results.',
      },
      stats: {
        year: 'Year founded',
        availability: 'Availability',
        clientTypes: 'Client types',
        customSolutions: 'Custom solutions',
      },
      services: {
        title: 'Our Expertise',
        service1: {
          title: 'Software Development',
          desc: 'Custom web, mobile and desktop applications tailored to your specific needs',
        },
        service2: {
          title: 'Hosting & Infrastructure',
          desc: 'Secure hosting of your applications with optimal availability',
        },
        service3: {
          title: 'Consultation & Audit',
          desc: 'Analysis of your needs and strategic recommendations for your digital transformation',
        },
        service4: {
          title: 'Training & Bootcamp',
          desc: 'Intensive training programs to develop your technical skills',
        },
      },
      programs: {
        title: 'Our Programs',
        freelance: 'Freelances',
        students: 'Students',
        openSource: 'Open Source',
        networking: 'Networking',
      },
      testimonials: {
        title: 'What Our Clients Say',
      },
      cta: {
        title: 'Ready to Start Your Project?',
        text: 'Contact us today to discuss your needs',
        button: 'Get started now',
      },
    },
    // Services Page
    services: {
      title: 'Our Services',
      subtitle: 'Complete technology solutions for your success',
      // ... (à compléter)
    },
    // Pricing (SaaS Plans)
    pricing: {
      sectionBadge: 'SaaS Plans',
      sectionTitle: 'SaaS Plans',
      sectionSubtitle: 'Choose the plan that fits your project. Monthly prices excluding tax.',
      redirectText: 'For full details of all features and options, visit our dedicated pricing page.',
      redirectCta: 'See full pricing details',
      included: 'What\'s included',
      perMonth: 'month (Excl. tax)',
      annualPayment: 'Annual Payment',
      goodDealLabel: 'Good Deal',
      plans: {
        pro: 'Pro',
        proDescription: 'Balanced package for ambitious entrepreneurs, with regular follow-up.',
        proStrikethrough: '50,000f',
        goodDeal: 'Good Deal',
        goodDealDescription: 'Affordable package to launch your personalized platform at lower cost.',
        goodDealStrikethrough: '30,000f',
        ultra: 'Ultra',
        ultraDescription: 'High-end package for strategic projects, with close support.',
        ultraStrikethrough: '60,000f',
      },
      features: {
        domainSubdomainMailPro: 'Domain + subdomain + Pro mail',
        fiftyPercentPremium: '50% premium features unlocked',
        hosting15Go: 'Cloud hosting 15GB expandable',
        advancedSearchFilters: 'Advanced search + custom filters',
        supportEmailWhatsapp24h: 'Email + WhatsApp support (24h)',
        graphicCustomization: 'Graphic customization (colors, logo, etc.)',
        analyticsDashboard: 'Full analytics dashboard',
        limitedAds: 'Limited advertising',
        domainMailPro: 'Domain name + Pro mail',
        freeModulesCrm: 'Free modules (CRM - Products - Orders - Invoicing)',
        hosting10Go: 'Cloud hosting 10GB expandable',
        threeInterfaces: '3 interfaces (Admin, Employee, User)',
        basicSearchFilters: 'Basic search & filters',
        supportEmail48h: 'Email support (48h)',
        premiumModulesLocked: 'Premium modules locked',
        kobeAdsIncluded: 'Kobe Corp ads included',
        domainTwoSubdomainsMailPremium: 'Domain + 2 subdomains + Premium mail',
        allFeaturesUnlocked: 'All features unlocked',
        aiSearchAdvancedFilters: 'AI smart search + advanced filters',
        biAnalyticsUnlimited: 'Predictive BI Analytics + unlimited reports',
        fullUiUxCustomization: 'Full custom UI/UX',
        unlimitedCloudBackup: 'Unlimited cloud backup',
        hosting20Go: 'Cloud hosting 20GB expandable',
        restApiIntegrations: 'Full REST API + third-party integrations',
        dedicatedProjectManagerVip: 'Dedicated project manager + VIP support 7/7',
        noAdsNoRestrictions: 'No ads + No restrictions',
      },
    },
    // Footer
    footer: {
      slogan: 'Build Your Own Legacy',
      description: 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions.',
      quickLinks: 'Quick Links',
      programs: 'Programs',
      followUs: 'Follow Us',
      available247: 'Available 24/7',
      copyright: '© 2025 KOBE Corporation. All rights reserved.',
      legal: {
        privacy: 'Privacy policy',
        terms: 'Legal notices',
        cookies: 'Cookies',
      },
    },
  },
}

export const getTranslation = (lang: Language, path: string): string => {
  const keys = path.split('.')
  let value: any = translations[lang]
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path // Fallback to path if translation not found
    }
  }
  
  return typeof value === 'string' ? value : path
}
