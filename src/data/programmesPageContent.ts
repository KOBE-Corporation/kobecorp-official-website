export const programmeDetails = {
  freelances: {
    benefits: [
      'Facturation simplifiée et automatisée',
      'Gestion complète de la TVA et fiscalité',
      'Contrats pré-rédigés et personnalisables',
      'Support juridique et administratif',
      'Statut professionnel reconnu',
      'Accès à des projets premium',
    ],
    benefitsEn: [
      'Simplified and automated invoicing',
      'Complete VAT and tax management',
      'Pre-written and customizable contracts',
      'Legal and administrative support',
      'Recognized professional status',
      'Access to premium projects',
    ],
    stats: [
      { label: 'Freelances actifs', labelEn: 'Active freelancers', value: '50+' },
      { label: 'Projets livrés', labelEn: 'Projects delivered', value: '200+' },
      { label: 'Satisfaction', labelEn: 'Satisfaction', value: '98%' },
    ],
    guarantees: [
      'Cadre légal 100% conforme',
      'Support administratif dédié',
      'Facturation sous 24h',
      'Protection juridique incluse',
    ],
    guaranteesEn: [
      '100% compliant legal framework',
      'Dedicated administrative support',
      'Invoicing within 24h',
      'Legal protection included',
    ],
  },
  etudiants: {
    benefits: [
      'Projets réels en production',
      'Mentorat personnalisé par expert',
      'Code reviews hebdomadaires',
      'Portfolio professionnel valorisé',
      'Certification de compétences',
      'Opportunités d\'embauche',
    ],
    benefitsEn: [
      'Real projects in production',
      'Personalized mentoring by expert',
      'Weekly code reviews',
      'Valued professional portfolio',
      'Skills certification',
      'Hiring opportunities',
    ],
    stats: [
      { label: 'Stagiaires formés', labelEn: 'Trainees trained', value: '100+' },
      { label: 'Taux d\'embauche', labelEn: 'Hiring rate', value: '75%' },
      { label: 'Projets en prod', labelEn: 'Projects in prod', value: '150+' },
    ],
    guarantees: [
      'Projets réels garantis',
      'Mentor dédié expérimenté',
      'Certification à la fin',
      'Possibilité d\'embauche',
    ],
    guaranteesEn: [
      'Real projects guaranteed',
      'Dedicated experienced mentor',
      'Certification at the end',
      'Hiring possibility',
    ],
  },
  'open-source': {
    benefits: [
      'Visibilité internationale',
      'Contributions valorisées',
      'Apprentissage collaboratif',
      'Networking avec experts',
      'Portfolio technique solide',
      'Reconnaissance communautaire',
    ],
    benefitsEn: [
      'International visibility',
      'Valued contributions',
      'Collaborative learning',
      'Networking with experts',
      'Strong technical portfolio',
      'Community recognition',
    ],
    stats: [
      { label: 'Contributeurs', labelEn: 'Contributors', value: '200+' },
      { label: 'Projets actifs', labelEn: 'Active projects', value: '30+' },
      { label: 'Stars GitHub', labelEn: 'GitHub stars', value: '5K+' },
    ],
    guarantees: [
      'Projets professionnels uniquement',
      'Code review par experts',
      'Reconnaissance publique',
      'Mentorat communautaire',
    ],
    guaranteesEn: [
      'Professional projects only',
      'Code review by experts',
      'Public recognition',
      'Community mentoring',
    ],
  },
  networking: {
    benefits: [
      'Accès réseau clients premium',
      'Projets innovants exclusifs',
      'Événements tech privés',
      'Workshops avec experts',
      'Meetups développeurs',
      'Conférences techniques',
    ],
    benefitsEn: [
      'Access to premium client network',
      'Exclusive innovative projects',
      'Private tech events',
      'Workshops with experts',
      'Developer meetups',
      'Technical conferences',
    ],
    stats: [
      { label: 'Membres actifs', labelEn: 'Active members', value: '300+' },
      { label: 'Événements/an', labelEn: 'Events/year', value: '50+' },
      { label: 'Clients partenaires', labelEn: 'Partner clients', value: '100+' },
    ],
    guarantees: [
      'Accès réseau exclusif',
      'Événements premium',
      'Networking facilité',
      'Opportunités régulières',
    ],
    guaranteesEn: [
      'Exclusive network access',
      'Premium events',
      'Facilitated networking',
      'Regular opportunities',
    ],
  },
} as const

export type ProgrammeDetail = (typeof programmeDetails)[keyof typeof programmeDetails]
