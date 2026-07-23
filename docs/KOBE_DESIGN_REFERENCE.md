# KOBE Corporation – Référence Design System

**Usage** : Donner ce fichier à l’IA du projet (ex. site Pricing / Offres KOBE) pour reproduire **Header**, **Footer**, **couleurs**, **thème**, **background des sections Hero**, **navigation**, **polices**, **icônes**, **i18n** et **techniques** sans tout reprompter.

**Table des matières**  
0. [Dépendances et stack](#0-dépendances-et-stack-technique) · 1. [Couleurs & thème](#1-couleurs--thème-tailwind) · 2. [Header](#2-header) · 3. [Footer](#3-footer) · 4. [Hero](#4-hero--background-des-sections-hero) · 5. [Composants UI](#5-composants-ui-réutilisables) · 6. [Données KOBE](#6-données-kobe-à-réutiliser) · 7. [Récap Pricing](#7-récap-pour-le-site-pricing--offres) · 8. [Techniques](#8-techniques-routing-perf-i18n) · 9. [index.html](#9-indexhtml-et-tête-du-document) · 10. [Snippets](#10-snippets-prêts-à-lemploi)

---

## 0. Dépendances et stack technique

### 0.1 Commandes d’installation

```bash
npm create vite@latest mon-projet -- --template react-ts
cd mon-projet
npm install react react-dom react-router-dom @heroicons/react
npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react
npx tailwindcss init -p
```

(Vite + React TS inclut déjà `typescript`, `@types/react`, `@types/react-dom`. Ajouter `@types/react-router-dom` si besoin.)

### 0.2 `package.json` – dépendances utilisées

**Dependencies (runtime)** :
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `react-router-dom` ^7.11.0
- `@heroicons/react` ^2.2.0

**DevDependencies** :
- `vite` ^7.2.4
- `@vitejs/plugin-react` ^5.1.1
- `typescript` ~5.9.3
- `@types/react` ^19.2.5, `@types/react-dom` ^19.2.3, `@types/react-router-dom` ^5.3.3
- `tailwindcss` ^3.4.19
- `postcss` ^8.5.6
- `autoprefixer` ^10.4.23

### 0.3 Fichiers de config

**`vite.config.ts`** (extrait) :
```ts
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['@heroicons/react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  publicDir: 'public',
  css: { devSourcemap: false, postcss: './postcss.config.js' },
})
```

**`postcss.config.js`** :
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
    },
  },
}
```

**`tailwind.config.js`** :
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { /* voir § 1.1 */ } },
  plugins: [],
}
```

---

## 1. Couleurs & Thème (Tailwind)

### 1.1 Extension `theme` dans `tailwind.config.js`

```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
    },
    colors: {
      brand: {
        50: '#f0f7ff',
        100: '#e0efff',
        200: '#b8dfff',
        300: '#7cc2ff',
        400: '#3b9eff',
        500: '#0a7aff',   // Principal
        600: '#0066e6',
        700: '#0052cc',
        800: '#003d99',
        900: '#002966',
      },
      accent: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
      },
      neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e8e8e8',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },
      ink: '#171717',
      success: { 500: '#10b981', 600: '#059669' },
      error: { 500: '#ef4444', 600: '#dc2626' },
    },
    boxShadow: {
      soft: '0 20px 50px -25px rgba(17, 24, 39, 0.35)',
      card: '0 2px 8px rgba(0, 0, 0, 0.04)',
      'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
      subtle: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
  },
},
```

### 1.2 Variables globales (`index.css` ou équivalent)

- **Fond** : `#ffffff`
- **Texte** : `#1f2937` (fallback), `ink` = `#171717` pour titres/texte principal
- **Font** : `Inter` (body), `Space Grotesk` (titres)

### 1.3 Polices (Google Fonts)

**Import CSS** (en tête de `index.css` ou équivalent) :
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap');
```

**URL brute** :  
`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap`

**`:root` et `body`** :
```css
:root {
  color: #1f2937;
  background-color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  min-height: 100vh;
  background: #ffffff;
}
#root { min-height: 100vh; }
```

**Usage Tailwind** :
- **Corps de texte** : `font-sans` → Inter
- **Titres / display** : `font-display` → Space Grotesk  
Exemples : `font-display text-4xl font-semibold text-ink`, `font-sans text-sm text-neutral-600`.

**Graisses** : Inter 400, 500, 600, 700 ; Space Grotesk 500, 600.

### 1.4 Icônes (Heroicons)

- **Lib** : `@heroicons/react`
- **Variantes** : `24/outline` (défaut), `24/solid` (ex. étoiles, remplissage)
- **Import** : `import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'`

**Classes typiques** :
- `h-4 w-4`, `h-5 w-5`, `h-6 w-6` selon le contexte
- Couleur : `text-brand-500`, `text-neutral-600`, `text-white`, etc.

**Icônes utilisées dans Header / Footer / Hero / Nav** :
- `ArrowRightIcon` – CTA, liens « en savoir plus »
- `Bars3Icon`, `XMarkIcon` – menu mobile (ouvrir / fermer)
- `ChevronDownIcon` – dropdowns nav, accordéons
- `GlobeAltIcon` – switch langue
- `SparklesIcon` – badge Hero, décor

**Autres (pages / sections)** :  
`MapPinIcon`, `PhoneIcon`, `EnvelopeIcon`, `CodeBracketIcon`, `ServerIcon`, `ChartBarIcon`, `AcademicCapIcon`, `BriefcaseIcon`, `UserGroupIcon`, `BookOpenIcon`, `CheckBadgeIcon`, `ShieldCheckIcon`, `StarIcon` (solid), `ChevronLeftIcon` / `ChevronRightIcon` (solid), etc.

**Réseaux sociaux** : pas dans Heroicons ; utiliser des SVG custom (WhatsApp, Facebook, LinkedIn, Instagram) ou un composant dédié. Couleurs : `#25D366`, `#1877F2`, `#0A66C2`, `#E4405F`.

---

## 2. Header

### 2.1 Structure

- **Sticky** en haut, **z-50**
- **Barre** : fond blanc semi‑transparent, bordure basse, léger blur
- **Contenu** : logo + nom + slogan | navigation (desktop) | switch langue + CTA | menu mobile (icône)

### 2.2 Classes Tailwind principales

```txt
Header conteneur:
  sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md shadow-subtle

Conteneur interne (max-w-7xl):
  mx-auto flex h-auto min-h-16 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-8 lg:py-0 lg:h-16
```

### 2.3 Logo

- Lien vers `/` (ou page d’accueil du site)
- **Image** : `logo` (ex. `kobe_corp_logo.jpeg` ou `logo-nom.jpeg`), `rounded-lg object-contain`, 48×48 (sm 48, lg ~48)
- **Nom** : `font-display font-semibold text-ink` – `KOBE Corporation`
- **Slogan** : `text-brand-500 font-semibold` – `Build Your Own Legacy`
- Hover sur le bloc logo : `hover:scale-105`, `transition-transform duration-200`

### 2.4 Navigation desktop

- Liens en `rounded-full px-4 py-2 text-sm font-medium`
- Inactif : `text-neutral-700 hover:bg-neutral-50 hover:text-brand-500`
- Actif : `text-brand-500 font-semibold` + petit trait `h-0.5 w-8` en `bg-brand-500` sous le lien
- Dropdown : fond `bg-white`, `shadow-card-hover`, `rounded-xl`, `animate-fadeInUp`

### 2.5 Switch langue (desktop)

- Bouton `rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-subtle`
- Hover : `hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md`
- Icône `GlobeAltIcon` (Heroicons), label `FR` / `EN`

### 2.6 CTA principal (desktop)

- Lien `rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md`
- Hover : `hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg`
- Ex. libellé : « Discuter avec Ben Djibril », lien : `https://ben-djibril.kobecorporation.com`
- **Pricing** : adapter le lien (ex. `/contact`, `/#offres`, ou autre CTA offres).

### 2.7 Mobile

- **Switch langue** : même style, `p-2` seulement (icône)
- **Menu** : `Bars3Icon` / `XMarkIcon`, même style de bouton
- **Menu ouvert** : `border-t border-neutral-200 bg-white backdrop-blur-md`, transition `max-h` / `opacity`, contient la nav + CTA en pleine largeur

### 2.8 À adapter pour le site Pricing

- Remplacer ou compléter les liens de navigation (ex. Accueil, Services, **Pricing/Offres**, Contact).
- Adapter le CTA (ex. « Voir les offres », « Choisir un forfait ») et l’URL.

### 2.9 Navigation complète – structure et options

**Type `NavItem`** :
```ts
type NavItem = {
  label: string      // Libellé du menu (ex. "Accueil", "Services")
  path: string       // Route (ex. "/", "/services")
  sections?: { label: string; anchor: string }[]  // Sous-liens avec ancre
}
```

**Fonction `useNavigationItems()`** : retourne un `NavItem[]` en utilisant `language` et `t()` (i18n). Les libellés viennent de `t('nav.home')`, etc.

**Items avec dropdown (sections)** :
- **Accueil** `/` : hero, services, programs, missions, process, cta
- **Services** `/services` : hero, development, hosting, consultation, training
- **Programmes** `/programmes` : hero, freelances, students, opensource, networking
- **À propos** `/about` : hero, story, team, values

**Items sans dropdown** :
- **Portfolio** `/portfolio`
- **Contact** `/contact`

**Comportement** :
- **Desktop** : clic sur l’item → ouverture du dropdown ; clic sur une section → `navigate(path + '#' + anchor)` ou scroll si déjà sur la page.
- **Mobile** : accordéon (toggle sections) ; clic section → fermeture menu + navigation ou scroll.
- **Scroll vers ancre** : `document.getElementById(anchor)`, offset ≈ 80px pour le header fixe, `behavior: 'smooth'`.

**Classes dropdown** : `min-w-[200px]`, `rounded-xl`, `bg-white`, `shadow-card-hover`, `animate-fadeInUp`, `py-2`.  
**Classes section** : `block w-full px-4 py-2 text-left text-sm`, `text-neutral-600 hover:bg-neutral-50 hover:text-brand-500`, actif `text-brand-500 font-semibold`.

**Indicateur actif** : trait `h-0.5 w-8 rounded-full bg-brand-500` sous l’item (desktop) ou à gauche (footer / mobile).

---

## 3. Footer

### 3.1 Structure

- Fond `bg-neutral-50`, `border-t border-neutral-200`, `py-12`
- Grille : `grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5`
- Colonnes : **À propos** (lg col-span-2) | **Liens rapides** | **Programmes** (ou équivalent) | **Contact**

### 3.2 Colonne « À propos »

- Logo + nom (lien vers `/`), `font-display text-lg font-semibold text-ink`
- Slogan : `text-sm font-semibold text-brand-500` – `Build Your Own Legacy`
- Court paragraphe : `text-sm text-neutral-600`
- Switch langue : même style que header (bouton `rounded-lg`)

### 3.3 Colonnes navigation

- Titres : `text-sm font-semibold uppercase tracking-wide text-ink`
- Liens : `text-sm text-neutral-600 hover:text-brand-500`

### 3.4 Colonne Contact

- Même titre
- Bloc contact : icône `text-brand-500` + valeur (lien ou texte) `text-sm text-neutral-600`
- Petit texte : « Disponible 24/7 », `text-xs text-neutral-500`

### 3.5 Réseaux sociaux

- Titre « Suivez-nous »
- Liens en cercles/arrondis (`rounded-lg`), `h-11 w-11`, bordure fine, couleur du réseau au hover :
  - WhatsApp `#25D366`
  - Facebook `#1877F2`
  - LinkedIn `#0A66C2`
  - Instagram `#E4405F`

### 3.6 Copyright & légal

- `border-t` (ex. `border-white/10` ou `border-neutral-200`) puis `pt-8`
- Copyright : `text-sm font-medium text-neutral-700`
- Liens : Privacy, Legal, CGU, Cookies – `text-neutral-600 hover:text-brand-500`

### 3.7 Données à utiliser

- **companyInfo** : `name`, `slogan`, `address`, `contact`, `social` (voir § 6).

---

## 4. Hero – Background des sections Hero

### 4.1 Conteneur section

- `relative overflow-hidden`, `min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]`
- Padding : `pt-4 pb-8 md:pt-6 md:pb-12 lg:pt-8 lg:pb-16`
- `isolation: isolate` pour empiler correctement les calques

### 4.2 Fond (calque arrière, `z-index: 0`)

- Base : `bg-white`
- **Grille** :
  ```css
  background: linear-gradient(to right, rgba(10,122,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(10,122,255,0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  ```
  En Tailwind :  
  `bg-[linear-gradient(to_right,rgba(10,122,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]`

### 4.3 Formes géométriques (flottantes / légèrement animées)

Toutes en `absolute`, bordures `border-2`, couleurs `brand` / `accent` avec opacité (~0.55–0.7). Exemples :

| Élément      | Position              | Taille    | Forme              | Animation            |
|-------------|------------------------|-----------|--------------------|----------------------|
| Carré       | `top-20 right-20`     | `h-32 w-32` | `rounded-2xl`      | `animate-float-shape` |
| Cercle      | `bottom-32 left-16`   | `h-24 w-24` | `rounded-full`     | `animate-float-gentle animate-pulse-border` |
| Hexagone    | `top-1/2 right-1/4`   | `h-20 w-20` | `clip-path` hexagone | `animate-rotate-slow` |
| Petit carré | `top-40 left-1/3`     | `h-16 w-16` | `rounded-lg`, `-rotate-15` | `animate-float-shape` |
| Petit cercle| `bottom-40 right-1/3` | `h-12 w-12` | `rounded-full`     | `animate-float-gentle animate-pulse-border` |

**Hexagone** :
```css
clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
```

Couleurs des formes : `border-brand-300/70`, `border-brand-300/65`, `border-brand-300/60`, `border-accent-300/60`, `border-accent-300/55`.

### 4.4 Overlay gradient

- `absolute inset-0 bg-gradient-to-br from-transparent via-brand-50/20 to-transparent`

### 4.5 Contenu (au-dessus du fond)

- Conteneur : `relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Le contenu (titre, sous-titre, CTA, etc.) va **à l’intérieur** de ce conteneur.

### 4.6 Animations CSS à définir

```css
@keyframes float-shape {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  25%      { transform: translateY(-10px) translateX(5px) rotate(2deg); }
  50%      { transform: translateY(-5px) translateX(-5px) rotate(-2deg); }
  75%      { transform: translateY(-15px) translateX(3px) rotate(1deg); }
}
@keyframes float-gentle {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes pulse-border {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.05); }
}
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Classes utilitaires :  
`animate-float-shape`, `animate-float-gentle`, `animate-pulse-border`, `animate-rotate-slow`, `animate-fadeInUp` (durées ~6–20s selon l’animation, ou 0.3s pour `fadeInUp`).

---

## 5. Composants UI réutilisables

### 5.1 Button

- **Base** : `inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5`
- **Variants** :
  - **primary** : `bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-lg`
  - **secondary** : `bg-white text-neutral-700 border border-neutral-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 shadow-subtle hover:shadow-md`
  - **outline** : `bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-50 hover:border-brand-600`
- **Tailles** : `sm` → `px-4 py-2 text-sm` ; `md` → `px-6 py-3.5 text-sm` ; `lg` → `px-8 py-4 text-base`
- Support `icon` + `iconPosition` (left/right).

### 5.2 Badge

- `inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm`
- **Variants** :
  - **primary** : `bg-gradient-to-r from-brand-50 to-brand-100 text-brand-600`
  - **accent** : `bg-accent-50 text-accent-600`
  - **neutral** : `bg-neutral-100 text-neutral-700`

### 5.3 Card

- `rounded-2xl border border-neutral-200 bg-white p-6`
- **Ombres** : `shadow-subtle` | `shadow-card` | `shadow-card-hover`
- Hover : `hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover`

---

## 6. Données « KOBE » à réutiliser

### 6.1 Company info (pour Header, Footer, alt logo, etc.)

```ts
const companyInfo = {
  name: 'KOBE Corporation',
  founder: 'Ben Djibril',
  year: '2025',
  slogan: 'Build Your Own Legacy',
  address: {
    street: 'Carrefour Belle Mère',
    city: 'Yaoundé',
    region: 'Région du Centre',
    country: 'Cameroun',
    full: 'Carrefour Belle Mère, Yaoundé, Cameroun',
  },
  contact: {
    phone: '+237-655-938-501',
    email: 'contact@kobecorporation.com',
    availability: '24/7',
  },
  social: {
    whatsapp: 'https://whatsapp.com/channel/0029VbByklp7oQhjSR9w482f',
    facebook: 'https://www.facebook.com/share/14cRYHeBKCY/',
    linkedin: 'https://www.linkedin.com/company/kobe-corporation/',
    instagram: 'https://www.instagram.com/kobecorporation?igsh=MWVyZWs0eGk3MnVwNA==',
    website: 'www.kobecorporation.com',
  },
}
```

### 6.2 Assets

- **Logo** : `/logo-nom.jpeg` ou `kobe_corp_logo.jpeg` (selon structure du projet). À servir depuis `public/` ou équivalent.

### 6.3 Liens de navigation (exemple site principal)

À adapter pour Pricing (remplacer « Programmes » par « Offres » / « Pricing », etc.) :

- `/` → Accueil  
- `/services` → Services  
- `/programmes` → Programmes (ou **/pricing** / **/offres**)  
- `/about` → À propos  
- `/portfolio` → Portfolio (optionnel sur pricing)  
- `/contact` → Contact  

Libellés i18n : `nav.home`, `nav.services`, `nav.programs`, `nav.about`, `nav.portfolio`, `nav.contact`, `nav.chatWithBen`, etc.

### 6.4 Footer – clés i18n

- `footer.quickLinks`, `footer.programs`, `footer.followUs`, `footer.available247`, `footer.copyright`
- `footer.legal.privacy`, `footer.legal.terms`, `footer.legal.cookies`

### 6.5 i18n – translations complètes (nav, footer, home.hero)

**Format** : `{ fr: { ... }, en: { ... } }`. Helper `getTranslation(lang, path)` avec `path` en `'nav.home'`, `'footer.quickLinks'`, etc.

**FR** :
```ts
nav: {
  home: 'Accueil',
  services: 'Services',
  programs: 'Programmes',
  about: 'À propos',
  portfolio: 'Portfolio',
  contact: 'Contact',
  startProject: 'Démarrer un Projet',
  chatWithBen: 'Discuter avec Ben Djibril',
  overview: "Vue d'ensemble",
},
footer: {
  quickLinks: 'Liens rapides',
  programs: 'Programmes',
  followUs: 'Suivez-nous',
  available247: 'Disponible 24/7',
  copyright: '© 2025 KOBE Corporation. Tous droits réservés.',
  legal: {
    privacy: 'Mentions légales',
    terms: 'Politique de confidentialité',
    cookies: "Conditions d'utilisation",
  },
},
home: {
  hero: {
    title: 'Construisez Votre Propre Héritage Numérique',
    subtitle: 'KOBE Corporation - Votre partenaire technologique…',
    description: 'Depuis 2025, nous développons des logiciels sur mesure…',
    cta1: 'Découvrir nos services',
    cta2: 'Nous contacter',
  },
},
```

**EN** : mêmes clés, valeurs en anglais (`Home`, `Services`, `Programs`, `Quick Links`, `Follow Us`, `Build Your Own Legacy`, etc.).

**Liens footer** :  
- `/privacy` → `footer.legal.privacy`  
- `/legal` → `footer.legal.terms`  
- `/terms` → « CGU » / « Terms » (libellé spécifique)  
- Cookies → bouton qui ouvre les préférences (ex. `openSettings`).

### 6.6 contactInfo (footer)

Structure pour la colonne Contact :

```ts
const contactInfo = [
  {
    label: 'Adresse',
    labelEn: 'Address',
    value: companyInfo.address.full,
    link: null,
    icon: 'MapPinIcon',  // Heroicons, h-5 w-5 text-brand-500
  },
  {
    label: 'Téléphone',
    labelEn: 'Phone',
    value: companyInfo.contact.phone,
    link: `tel:${companyInfo.contact.phone}`,
    icon: 'PhoneIcon',
  },
  {
    label: 'Email',
    labelEn: 'Email',
    value: companyInfo.contact.email,
    link: `mailto:${companyInfo.contact.email}`,
    icon: 'EnvelopeIcon',
  },
]
```

Afficher icône + valeur ; si `link` existe, utiliser `<a href={link}>`, sinon `<p>`.

### 6.7 programmes (colonne Footer « Programmes »)

Liens vers `/programmes#id` :

```ts
const programmes = [
  { id: 'freelances', title: 'Freelances', titleEn: 'Freelances' },
  { id: 'etudiants', title: 'Étudiants', titleEn: 'Students' },
  { id: 'open-source', title: 'Open Source', titleEn: 'Open Source' },
  { id: 'networking', title: 'Networking', titleEn: 'Networking' },
]
```

Affichage : `programmes.map(p => <NavLink to={\`/programmes#${p.id}\`}>{language === 'fr' ? p.title : p.titleEn}</NavLink>)`.  
Pour un site **Pricing** : remplacer par des liens vers offres (ex. `/pricing#starter`) ou supprimer la colonne.

### 6.8 Clé i18n optionnelle

- `nav.showSections` : pour `aria-label` du dropdown (ex. « Afficher les sections » / « Show sections »). Si absente, utiliser un fallback.

---

## 7. Récap pour le site Pricing / Offres

1. **Tailwind** : réutiliser les `colors`, `boxShadow`, `fontFamily` ci‑dessus.
2. **Header** : même structure et styles ; adapter les liens (Pricing/Offres) et le CTA (ex. « Voir les offres » → `/pricing` ou ancre).
3. **Footer** : identique ; garder companyInfo, contact, réseaux, légal. Adapter « Programmes » en « Offres » ou supprimer selon le besoin.
4. **Hero** : réutiliser le **même background** (grille + formes + overlay) ; seul le contenu (titre, CTA) change pour la page Pricing.
5. **Composants** : Button, Badge, Card avec les mêmes variants et classes.
6. **Logo** : même fichier, même emplacement (`public/`), alt `KOBE Corporation - Build Your Own Legacy`.

En fournissant ce fichier à l’IA du projet, tu peux lui demander de **créer le site Pricing en réutilisant ce design system** (Header, Footer, Hero, couleurs, composants) et d’adapter uniquement le contenu (offres, grilles de prix, CTA).

---

## 8. Techniques (routing, perf, i18n)

### 8.1 React Router

- **Router** : `BrowserRouter` à la racine.
- **Routes** : `Routes` + `Route path="..." element={...}`.
- **Liens** : `NavLink` (avec `className` / `activeClassName` si besoin) ou `Link` ; **naviguation impérative** : `useNavigate()`, `useLocation()`.
- **SPA** : `try_files $uri $uri/ /index.html` (Nginx) pour que les routes côté client fonctionnent.

### 8.2 Lazy loading des pages

```ts
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
// …
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
    // …
  </Routes>
</Suspense>
```

`PageLoader` : spinner centré (ex. `border-4 border-brand-500 border-t-transparent rounded-full animate-spin`).

### 8.3 OptimizedImage

- **Rôle** : lazy load, `width` / `height` pour limiter le CLS, `loading="lazy"` sauf si `priority="high"`, `decoding="async"`, `fetchPriority`.
- **Props** : `src`, `alt`, `width`, `height`, `priority?: 'high' | 'low' | 'auto'`, `className`, …
- **Usage** : logo header/footer `priority="high"` ; images below-the-fold en `priority="low"` ou défaut.

### 8.4 Langue (LanguageContext)

- **Contexte** : `{ language: 'fr' | 'en', setLanguage, t }`.
- **`t(path)`** : ex. `t('nav.home')` → « Accueil » ou « Home » selon `language`.
- **Persistance** : `localStorage` (ex. `kobe-language`), éventuellement gated par consentement cookies.
- **Détection** : `navigator.language` en fallback si pas de valeur stockée.

### 8.5 Scroll vers ancres

- Sur même page : `document.getElementById(anchor)`, `getBoundingClientRect().top + window.pageYOffset - headerOffset`, `window.scrollTo({ behavior: 'smooth' })`.
- **Header offset** : ~80px (hauteur du header sticky).
- Mise à jour URL : `window.history.replaceState(null, '', path + '#' + anchor)` ou équivalent.

### 8.6 Conteneur global

- **Max-width** : `max-w-7xl` (1280px).
- **Padding** : `px-4 sm:px-6 lg:px-8`, `py-*` selon les sections.

---

## 9. `index.html` et tête du document

### 9.1 Polices et perf

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Les polices sont chargées via `@import` dans le CSS (voir § 1.3).

### 9.2 Meta et favicon

- **Favicon** : `link rel="icon" type="image/png" href="/favicon.png"`, `link rel="apple-touch-icon" href="/favicon.png"`.
- **Theme** : `meta name="theme-color" content="#0a7aff"` (ou `#3b82f6` selon charte).
- **Viewport** : `width=device-width, initial-scale=1.0`.

### 9.3 Base pour une SPA

- `div#root` + `script type="module" src="/src/main.tsx"`.
- Si tu utilises React Router, le serveur doit renvoyer `index.html` pour toutes les routes (voir § 8.1).

---

## 10. Snippets prêts à l’emploi

### 10.1 Wrapper Hero (HTML structure)

À placer dans ta section Hero. Insère le contenu (titre, badges, CTA, etc.) dans le `div` indiqué.

```html
<section id="hero" class="relative overflow-hidden pt-4 pb-8 md:pt-6 md:pb-12 lg:pt-8 lg:pb-16 min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]" style="isolation: isolate">
  <!-- Fond -->
  <div class="absolute inset-0 overflow-hidden bg-white" style="z-index: 0" aria-hidden="true">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,122,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div class="absolute top-20 right-20 h-32 w-32 rounded-2xl border-2 border-brand-300/70 animate-float-shape"></div>
    <div class="absolute bottom-32 left-16 h-24 w-24 rounded-full border-2 border-brand-300/65 animate-float-gentle animate-pulse-border"></div>
    <div class="absolute top-1/2 right-1/4 h-20 w-20 border-2 border-brand-300/60 animate-rotate-slow" style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); transform-origin: center"></div>
    <div class="absolute top-40 left-1/3 h-16 w-16 rounded-lg border-2 border-accent-300/60 animate-float-shape" style="transform: rotate(-15deg)"></div>
    <div class="absolute bottom-40 right-1/3 h-12 w-12 rounded-full border-2 border-accent-300/55 animate-float-gentle animate-pulse-border"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-brand-50/20 to-transparent"></div>
  </div>
  <!-- Contenu (titre, badges, CTA, etc.) -->
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!-- Insérer ici le contenu de la hero -->
  </div>
</section>
```

### 10.2 Icônes réseaux sociaux (SVG inline)

Utiliser avec `fill="currentColor"` et `class="h-6 w-6"` (ou autre taille). Couleurs des liens : WhatsApp `#25D366`, Facebook `#1877F2`, LinkedIn `#0A66C2`, Instagram `#E4405F`.

**WhatsApp**  
```html
<svg viewBox="0 0 24 24" fill="currentColor" class="…"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
```

**Facebook, LinkedIn, Instagram** : paths complets dans le repo (fichier `SocialIcons.tsx`). Tu peux aussi utiliser Heroicons ou une lib d’icônes avec les mêmes réseaux.

### 10.3 Ordre des éléments Header (mobile)

1. Logo + nom + slogan (lien vers `/`)  
2. Switch langue (bouton icône)  
3. Bouton menu (Bars3 / XMark)  
Menu déroulant : `NavigationMenu` mobile puis CTA « Discuter avec Ben » (ou équivalent pricing).

---

**Dernière mise à jour** : Janvier 2026 · Référentiel design KOBE Corporation
