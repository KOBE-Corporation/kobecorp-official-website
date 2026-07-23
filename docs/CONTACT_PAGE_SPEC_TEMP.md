# Spécification complète : page Contact (jusqu’avant la FAQ)

Document temporaire pour reproduire à l’identique la page Contact : structure, styles, couleurs, composants, jusqu’à la fin du bloc « Informations de contact » + réseaux sociaux (sans la section FAQ).

---

## 1. Conteneur global de la page

- **Wrapper** : `div` avec `className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8"`
- **Largeur max** : 80rem (1280px)
- **Padding** : `py-14` (3.5rem) / `md:py-20` (5rem) ; horizontal `px-4` / `sm:px-6` / `lg:px-8`

---

## 2. Section Hero (#hero)

### 2.1 Conteneur de la section

- **Balise** : `<section id="hero">`
- **Classes** : `relative overflow-hidden pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10 min-h-[450px] lg:min-h-[500px] xl:min-h-[550px] mb-20`
- **Style inline** : `isolation: isolate`
- **Hauteur min** : 450px (mobile), 500px (lg), 550px (xl)
- **Marge bas** : `mb-20` (5rem)

### 2.2 Fond (arrière-plan)

- **Conteneur fond** : `div` avec `absolute inset-0 overflow-hidden bg-white`, `z-index: 0`, `aria-hidden="true"`.

  **Grille** :
  - `absolute inset-0`
  - `bg-[linear-gradient(to_right,rgba(10,122,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,122,255,0.15)_1px,transparent_1px)]`
  - `bg-[size:40px_40px]`
  - Couleur de ligne : `rgba(10,122,255,0.15)` (brand-500 à 15 %)

  **Formes géométriques** (toutes en `absolute`, bordures 2px) :
  1. Carré arrondi : `top-20 right-20`, `h-32 w-32`, `rounded-2xl`, `border-brand-300/70`, animation `float-shape`
  2. Cercle : `bottom-32 left-16`, `h-24 w-24`, `rounded-full`, `border-brand-300/65`, `animate-float-gentle animate-pulse-border`
  3. Hexagone : `top-1/2 right-1/4`, `h-20 w-20`, `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`, `border-brand-300/60`, `animate-rotate-slow`
  4. Carré : `top-40 left-1/3`, `h-16 w-16`, `rounded-lg`, `border-accent-300/60`, `rotate(-15deg)`, `animate-float-shape`
  5. Cercle : `bottom-40 right-1/3`, `h-12 w-12`, `rounded-full`, `border-accent-300/55`, `animate-float-gentle animate-pulse-border`

  **Overlay gradient** :
  - `absolute inset-0 bg-gradient-to-br from-transparent via-brand-50/20 to-transparent`

### 2.3 Contenu Hero (texte centré)

- **Conteneur** : `div` avec `relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- **Bloc centré** : `div` avec `mx-auto max-w-4xl text-center`

**Badge (au-dessus du titre)**  
- Composant type Badge, variant `primary`
- Icône : `RocketLaunchIcon` (Heroicons 24/outline), `h-4 w-4 animate-pulse`
- Texte : « Contactez-Nous » (FR) / « Contact Us » (EN)
- Style Badge primary : `inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm` + `bg-gradient-to-r from-brand-50 to-brand-100 text-brand-600`
- Animation d’entrée : `transition-all duration-800 ease-out` ; si visible : `translate-y-0 opacity-100 scale-100` ; sinon : `translate-y-8 opacity-0 scale-90` ; `transitionDelay: 150ms`

**Titre H1**  
- Texte : « Contactez-Nous » / « Contact Us »
- Classes : `mb-6 font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl lg:text-6xl`
- Visible : `translate-y-0 opacity-100` ; caché : `translate-y-12 opacity-0` ; `transitionDelay: 300ms`
- Typo : police **Space Grotesk** (`font-display`), couleur **ink** (#171717), tailles 2.25rem / 3rem / 3.75rem

**Sous-titre (paragraphe 1)**  
- Texte FR : « Nous sommes disponibles 24/7 pour répondre à vos besoins et transformer vos idées en réalité. »
- Classes : `mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-neutral-700 md:text-xl` + même logique d’animation (visible/caché, `translate-y-10`), `transitionDelay: 450ms`

**Paragraphe 2**  
- Texte FR : « Discutons de votre projet, explorons vos besoins… » (description longue)
- Classes : `mx-auto mb-6 max-w-2xl text-base leading-relaxed text-neutral-600` + animation, `transitionDelay: 600ms`

---

## 3. Grille principale : formulaire + colonne droite

- **Conteneur** : `div` avec `grid gap-12 lg:grid-cols-3 mb-16`
- **Colonne formulaire** : `lg:col-span-2`
- **Colonne droite** : 1 colonne, `space-y-6`

---

## 4. Carte formulaire (Card)

- **Composant** : Card avec `elevation="lg"`, `className="group relative p-8 md:p-10"`
- **Card de base** (à répliquer si pas de composant) :
  - `rounded-2xl border border-neutral-200 bg-white p-6` (ou p-8 / md:p-10)
  - Ombre : `shadow-card-hover` = `0 8px 24px rgba(0, 0, 0, 0.08)`
  - Hover : `transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover`

### 4.1 Titre du formulaire

- **Titre H2** : « Envoyez-nous un message » / « Send us a message »
- Classes : `mb-6 font-display text-2xl text-ink md:text-3xl`

### 4.2 Messages de statut (succès / erreur)

**Succès** (si submitStatus === 'success')  
- Conteneur : `mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800 shadow-sm transition-all duration-500`
- Icône : `CheckCircleIcon` h-5 w-5, `text-green-600`
- Ligne 1 : `font-semibold` — « Message envoyé avec succès ! »
- Ligne 2 : `text-xs text-green-700` — « Nous vous répondrons sous 24h. »

**Erreur** (si submitStatus === 'error')  
- Conteneur : `mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 shadow-sm`
- Icône : `XCircleIcon` h-5 w-5, `text-red-600`
- Textes : « Erreur lors de l'envoi » / « Veuillez réessayer plus tard. »

### 4.3 Formulaire

- **Form** : `className="space-y-6"`

**Champs (grille 2 colonnes sur md)**  
- Wrapper : `grid gap-6 md:grid-cols-2` pour les lignes Nom/Email, Téléphone/Entreprise, Type de projet/Budget.
- Chaque champ est dans un `div` avec `className="group/field"`.

**Label** (tous les champs)  
- Classes : `mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600`

**Input / Select / Textarea** (style commun)  
- `w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-neutral-300`
- Select : mêmes classes.
- Textarea : en plus `rows={6}` et `resize-none`.

**Champs**  
1. Nom complet * (required) — placeholder « Votre nom » / « Your name »
2. Email * (required) — placeholder « votre@email.com »
3. Téléphone — placeholder « +237 XXX XXX XXX »
4. Entreprise — placeholder « Nom de votre entreprise » / « Company name »
5. Type de projet — select avec options : Développement Web, Développement Mobile, Hébergement, Formation, Consultation, Autre (FR/EN)
6. Budget estimé — select avec options FCFA (< 500k, 500k–1m, 1m–5m, 5m–10m, > 10m, À discuter)
7. Message * (textarea, required) — placeholder « Décrivez votre projet… » / « Describe your project… »
8. Pièce jointe (optionnel) — input file ; label avec `PaperClipIcon` h-4 w-4. Style du bouton file : `file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-600 hover:file:bg-brand-100`
9. Case à cocher consentement * (required) : conteneur `flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm` ; checkbox `mt-1 h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-2 focus:ring-brand-500/20` ; label `text-sm leading-relaxed text-neutral-600`. Texte FR : « J'accepte que mes données soient utilisées pour me recontacter * »

**Bouton d’envoi**  
- Type submit, full width : `className="w-full"`
- Variant primary, size lg, icône à droite : `RocketLaunchIcon` h-4 w-4
- Texte : « Envoyer le message » / « Send message » ; pendant envoi : spinner (h-4 w-4, border-2 border-white border-t-transparent, animate-spin) + « Envoi en cours… » / « Sending… »
- Style Button primary : `bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-lg` ; size lg : `px-8 py-4 text-base` ; base : `inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5`

---

## 5. Colonne droite : Informations de contact

### 5.1 Titre

- **H2** : « Informations de Contact » / « Contact Information »
- Classes : `mb-6 font-display text-2xl text-ink md:text-3xl`

### 5.2 Cartes Contact (ContactInfoCard)

Pour chaque entrée (Adresse, Téléphone, Email) :

- **Composant** : Card `elevation="md"` avec `className="group flex items-start gap-3"` + animation (visible : `translate-y-0 opacity-100` ; caché : `translate-y-8 opacity-0`), `transitionDelay: index * 100ms`.
- **Card** : `rounded-2xl border border-neutral-200 bg-white p-6` + `shadow-card` + hover `-translate-y-1 border-brand-300 shadow-card-hover`.

**Contenu d’une carte** :  
- **Icône** : conteneur `flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6` ; à l’intérieur une icône Heroicons (MapPin, Phone, Envelope) `h-5 w-5 text-brand-500`.
- **Label** : `mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500` — « Adresse » / « Téléphone » / « Email ».
- **Valeur** : si lien → `<a href="..." className="text-sm font-semibold text-ink transition-colors duration-300 hover:text-brand-600 focus:outline-none">` ; sinon `<p className="text-sm font-semibold text-ink">`.

- **Espacement** entre cartes : `space-y-4`.

### 5.3 Réseaux sociaux

- **Titre H3** : « Suivez-Nous » / « Follow Us »
- Classes : `mb-4 text-sm font-semibold text-ink`
- **Conteneur icônes** : `flex gap-3`

**Boutons sociaux** (4 liens) :  
- Taille : `h-12 w-12`, `rounded-xl`, `flex items-center justify-center`
- Transition : `transition-all duration-300 hover:scale-110 hover:shadow-lg`
- Icône : `h-6 w-6`, `group-hover/social:scale-110`

Couleurs par réseau :
- WhatsApp : `bg-[#25D366]/10 text-[#25D366]` → hover `bg-[#25D366] text-white`
- Facebook : `bg-[#1877F2]/10 text-[#1877F2]` → hover `bg-[#1877F2] text-white`
- LinkedIn : `bg-[#0A66C2]/10 text-[#0A66C2]` → hover `bg-[#0A66C2] text-white`
- Instagram : `bg-[#E4405F]/10 text-[#E4405F]` → hover `bg-[#E4405F] text-white`

---

## 6. Palette de couleurs (Tailwind / valeurs)

À utiliser pour reproduire exactement les styles :

```text
Couleurs brand
  brand-50:  #f0f7ff
  brand-100: #e0efff
  brand-200: #b8dfff
  brand-300: #7cc2ff
  brand-500: #0a7aff
  brand-600: #0066e6
  brand-700: #0052cc

Neutres
  neutral-200: #e8e8e8
  neutral-300: #d4d4d4
  neutral-500: #737373
  neutral-600: #525252
  neutral-700: #404040

Texte principal
  ink: #171717

Ombres (boxShadow)
  shadow-subtle:  0 1px 3px rgba(0, 0, 0, 0.05)
  shadow-card:    0 2px 8px rgba(0, 0, 0, 0.04)
  shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.08)

Succès / erreur (messages)
  green-50, green-600, green-700, green-800
  red-50, red-600, red-800
```

---

## 7. Typographie

- **Polices** :  
  - Titres / display : **Space Grotesk** (`font-display`)  
  - Corps : **Inter** (`font-sans`)
- **Import Google Fonts** :  
  `Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap`
- **Titres H1 Hero** : `font-display text-4xl md:text-5xl lg:text-6xl`, `leading-[1.1]`, `text-ink`
- **Titres H2** : `font-display text-2xl md:text-3xl`, `text-ink`
- **Labels** : `text-sm font-medium text-ink`
- **Corps** : `text-sm` ou `text-base`, `text-neutral-600` / `text-neutral-700`

---

## 8. Animations CSS (si à recréer)

- **float-shape** : légère translation + rotation (8s ease-in-out infinite)
- **float-gentle** : translateY (6s ease-in-out infinite)
- **pulse-border** : opacité + scale (3s ease-in-out infinite)
- **rotate-slow** : rotation 360deg (20s linear infinite)

Les éléments de la Hero utilisent ces classes + des `transition-all duration-1000 ease-out` avec délais (150ms, 300ms, 450ms, 600ms) pour l’entrée en vue.

---

## 9. Données à prévoir

- **contactInfo** : tableau de 3 éléments avec `icon`, `label`, `labelEn`, `value`, `link` (null ou URL tel/mail).
- **companyInfo.social** : `whatsapp`, `facebook`, `linkedin`, `instagram` (URLs).
- **Options** : projectTypes (value, label, labelEn), budgetRanges (value, label, labelEn).

---

## 10. Ordre des blocs (du haut vers le bas, jusqu’avant FAQ)

1. Conteneur page `max-w-7xl` + padding
2. Section Hero (#hero) : fond (grille + formes + overlay), puis contenu (badge, H1, 2 paragraphes)
3. Grille `lg:grid-cols-3` avec `mb-16`
   - Colonne 1–2 : Card formulaire (titre, messages succès/erreur, formulaire complet, bouton)
   - Colonne 3 : Titre « Informations de Contact », liste ContactInfoCard, titre « Suivez-Nous », 4 boutons sociaux

La section **FAQ** (titre « Questions Fréquentes », bloc avec icône + FAQAccordion) commence juste après ce `div` de grille ; elle n’est pas incluse dans cette spec.

---

*Fichier temporaire — à supprimer ou déplacer après utilisation.*
