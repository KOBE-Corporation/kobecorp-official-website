export type FAQEntry = { question: string; answer: string }

export function getContactFaqs(language: 'fr' | 'en'): FAQEntry[] {
  return [
    {
      question: language === 'fr'
        ? 'Où puis-je consulter tous les détails des forfaits SaaS ?'
        : 'Where can I find full details about SaaS plans?',
      answer: language === 'fr'
        ? 'Vous pouvez consulter la page dédiée https://pricing.kobecorporation.com pour voir les fonctionnalités complètes, les options et les conditions des forfaits Pro, Good Deal et Ultra.'
        : 'You can visit https://pricing.kobecorporation.com to view full features, options and terms for Pro, Good Deal and Ultra plans.',
    },
    {
      question: language === 'fr'
        ? 'Quel est votre délai de réponse ?'
        : 'What is your response time?',
      answer: language === 'fr'
        ? 'Nous répondons généralement sous 24 heures maximum, même les weekends. Pour les urgences, nous avons un support 24/7 disponible.'
        : 'We usually respond within 24 hours maximum, even on weekends. For emergencies, we have 24/7 support available.',
    },
    {
      question: language === 'fr'
        ? 'Proposez-vous des consultations gratuites ?'
        : 'Do you offer free consultations?',
      answer: language === 'fr'
        ? "Oui, la première consultation pour analyser votre projet et discuter de vos besoins est entièrement gratuite. C'est l'occasion de découvrir comment nous pouvons vous aider."
        : "Yes, the first consultation to analyze your project and discuss your needs is completely free. It's an opportunity to discover how we can help you.",
    },
    {
      question: language === 'fr'
        ? 'Quels sont vos tarifs ?'
        : 'What are your rates?',
      answer: language === 'fr'
        ? 'Nos tarifs varient selon le type de projet et sa complexité. Nous proposons des budgets adaptés aux particuliers, PME et grandes entreprises. Contactez-nous pour un devis personnalisé gratuit.'
        : 'Our rates vary depending on the type of project and its complexity. We offer budgets adapted to individuals, SMEs and large enterprises. Contact us for a free personalized quote.',
    },
    {
      question: language === 'fr'
        ? 'Travaillez-vous avec des clients internationaux ?'
        : 'Do you work with international clients?',
      answer: language === 'fr'
        ? 'Absolument ! Nous travaillons avec des clients du monde entier. Notre équipe est habituée aux projets à distance et nous utilisons les meilleurs outils de collaboration pour garantir une communication fluide.'
        : 'Absolutely! We work with clients from around the world. Our team is used to remote projects and we use the best collaboration tools to ensure smooth communication.',
    },
    {
      question: language === 'fr'
        ? 'Quelle est votre garantie sur les projets ?'
        : 'What is your guarantee on projects?',
      answer: language === 'fr'
        ? 'Nous garantissons la qualité de notre code avec des tests automatisés (90%+ coverage), code review systématique et documentation complète. Nous offrons également 6 mois de support post-lancement inclus.'
        : 'We guarantee the quality of our code with automated tests (90%+ coverage), systematic code review and complete documentation. We also offer 6 months of post-launch support included.',
    },
    {
      question: language === 'fr'
        ? 'Proposez-vous des formations ?'
        : 'Do you offer training?',
      answer: language === 'fr'
        ? 'Oui ! Nous proposons des bootcamps intensifs, formations en entreprise et mentorat individuel. Nos programmes couvrent le développement web, mobile, DevOps, cybersécurité et bien plus.'
        : 'Yes! We offer intensive bootcamps, corporate training and individual mentoring. Our programs cover web development, mobile, DevOps, cybersecurity and much more.',
    },
    {
      question: language === 'fr'
        ? 'Comment fonctionne le processus de développement ?'
        : 'How does the development process work?',
      answer: language === 'fr'
        ? 'Notre processus suit 5 étapes : Découverte (analyse des besoins), Planification (scope et timeline), Développement (avec code review et tests), Déploiement (mise en production) et Support (accompagnement continu).'
        : 'Our process follows 5 steps: Discovery (needs analysis), Planning (scope and timeline), Development (with code review and tests), Deployment (production) and Support (continuous support).',
    },
    {
      question: language === 'fr'
        ? 'Quels modes de paiement acceptez-vous ?'
        : 'What payment methods do you accept?',
      answer: language === 'fr'
        ? 'Nous acceptons les virements bancaires, Mobile Money (Orange Money, MTN Mobile Money), PayPal et les cartes bancaires. Les paiements peuvent être échelonnés selon le projet.'
        : 'We accept bank transfers, Mobile Money (Orange Money, MTN Mobile Money), PayPal and bank cards. Payments can be spread out according to the project.',
    },
  ]
}
