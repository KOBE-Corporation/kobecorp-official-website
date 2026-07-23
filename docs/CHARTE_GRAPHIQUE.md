# 🎨 Charte Graphique - KOBE Corporation

**Date** : 17 janvier 2026  
**Version** : 1.0  
**Style** : Épuré, moderne, professionnel

---

## 📊 Analyse de l'Existant

### Couleurs Actuelles

- **Couleur principale** : Bleu (#3b82f6) - `brand-500`
- **Header/Footer** : Noir (#000000)
- **Fond** : Blanc (#ffffff)
- **Texte** : Gris foncé (#1f2937) - `ink`
- **Gris** : Palette slate (50-900)

### Points à Améliorer

1. **Contraste Header/Footer** : Le noir est très contrasté avec le blanc
2. **Cohérence des couleurs** : Besoin d'une palette plus unifiée
3. **Hiérarchie visuelle** : Peut être renforcée
4. **Espacement** : Peut être optimisé pour plus d'air

---

## 🎨 Proposition de Charte Graphique Épurée

### Palette de Couleurs Principale

#### Couleur Primaire - Bleu Professionnel (Conservée mais raffinée)

```css
Primary Blue:
  50:  #f0f7ff  /* Fond très clair */
  100: #e0efff  /* Fond clair */
  200: #b8dfff  /* Accent léger */
  300: #7cc2ff  /* Accent moyen */
  400: #3b9eff  /* Accent fort */
  500: #0a7aff  /* Couleur principale - Plus profond et professionnel */
  600: #0066e6  /* Hover states */
  700: #0052cc  /* Active states */
  800: #003d99  /* Texte sur fond clair */
  900: #002966  /* Texte très foncé */
```

**Justification** : Le bleu actuel (#3b82f6) est un peu trop "web standard". Un bleu plus profond (#0a7aff) est plus professionnel et moderne.

#### Couleur Secondaire - Gris Neutre Épuré

```css
Neutral Gray:
  50:  #fafafa  /* Fond ultra-clair */
  100: #f5f5f5  /* Fond clair */
  200: #e8e8e8  /* Bordures subtiles */
  300: #d4d4d4  /* Bordures */
  400: #a3a3a3  /* Texte secondaire */
  500: #737373  /* Texte tertiaire */
  600: #525252  /* Texte */
  700: #404040  /* Texte principal */
  800: #262626  /* Texte foncé */
  900: #171717  /* Texte très foncé */
```

#### Couleur d'Accent - Orange/Corail Énergique (Nouveau)

```css
Accent Orange:
  50:  #fff7ed  /* Fond très clair */
  100: #ffedd5  /* Fond clair */
  200: #fed7aa  /* Accent léger */
  300: #fdba74  /* Accent moyen */
  400: #fb923c  /* Accent fort */
  500: #f97316  /* Couleur accent principale */
  600: #ea580c  /* Hover states */
  700: #c2410c  /* Active states */
```

**Justification** : Un accent orange/corail apporte de l'énergie et de la modernité, tout en restant professionnel. Complémentaire du bleu.

#### Couleur de Succès - Vert Moderne

```css
Success Green:
  500: #10b981  /* Vert moderne */
  600: #059669  /* Hover */
```

#### Couleur d'Erreur - Rouge Doux

```css
Error Red:
  500: #ef4444  /* Rouge doux */
  600: #dc2626  /* Hover */
```

---

## 🎯 Principes de Design

### 1. Minimalisme et Espace Blanc

- **Espacement généreux** : Utiliser beaucoup d'espace blanc pour aérer
- **Groupement visuel** : Regrouper les éléments liés
- **Hiérarchie claire** : Tailles de texte bien différenciées

### 2. Typographie

- **Titres** : Space Grotesk (actuel) - Conserver
- **Corps** : Inter (actuel) - Conserver
- **Tailles** :
  - H1 : 48px (mobile) / 64px (desktop)
  - H2 : 36px (mobile) / 48px (desktop)
  - H3 : 24px (mobile) / 32px (desktop)
  - Body : 16px / 18px
  - Small : 14px

### 3. Composants Épurés

#### Cartes (Cards)

```css
- Fond : Blanc pur (#ffffff)
- Bordure : 1px solid #e8e8e8 (très subtile)
- Ombre : Subtile (0 2px 8px rgba(0,0,0,0.04))
- Border-radius : 16px (arrondi moderne)
- Padding : 24px (généreux)
- Hover : Légère élévation + bordure colorée
```

#### Boutons

```css
Primary Button:
- Fond : Bleu primaire (#0a7aff)
- Texte : Blanc
- Border-radius : 12px (pill moderne)
- Padding : 12px 24px
- Hover : Légèrement plus foncé + élévation

Secondary Button:
- Fond : Transparent
- Bordure : 1px solid #e8e8e8
- Texte : Gris foncé
- Hover : Fond gris très clair (#fafafa)
```

#### Badges/Tags

```css
- Fond : Couleur accent très claire (orange-50)
- Texte : Couleur accent (orange-600)
- Border-radius : 20px (très arrondi)
- Padding : 6px 12px
- Taille : 12px font
```

---

## 🎨 Application de la Charte

### Header - Proposition Épurée

**Option 1 : Header Blanc (Recommandé)**

```css
- Fond : Blanc (#ffffff)
- Bordure : 1px solid #e8e8e8 (subtile)
- Texte : Gris foncé (#262626)
- Logo : Couleur originale
- Navigation : Texte gris, hover bleu
- CTA : Bouton bleu primaire
```

**Option 2 : Header avec Fond Subtile**

```css
- Fond : Gris très clair (#fafafa)
- Bordure : 1px solid #e8e8e8
- Texte : Gris foncé
- Effet : Légère transparence (backdrop-blur)
```

### Footer - Proposition Épurée

**Option 1 : Footer Gris Clair (Recommandé)**

```css
- Fond : Gris très clair (#fafafa)
- Bordure : 1px solid #e8e8e8 (top)
- Texte : Gris moyen (#525252)
- Liens : Gris foncé, hover bleu
- Séparateurs : #e8e8e8
```

**Option 2 : Footer Blanc avec Accent**

```css
- Fond : Blanc
- Bordure : 1px solid #e8e8e8 (top)
- Accent : Ligne bleue en haut (2px)
```

### Sections - Design Épuré

#### Hero Section

```css
- Fond : Blanc pur
- Titre : Gris très foncé (#171717)
- Sous-titre : Gris moyen (#525252)
- CTA Principal : Bleu primaire
- CTA Secondaire : Bordure grise
- Badge : Orange accent (f97316)
```

#### Cards de Services

```css
- Fond : Blanc
- Bordure : 1px solid #e8e8e8
- Ombre : Subtile au repos
- Hover :
  - Élévation (shadow-lg)
  - Bordure bleue subtile
  - Ligne décorative bleue en haut
- Icône : Cercle avec fond bleu très clair
```

#### Sections avec Background

```css
Alternance :
- Section 1 : Blanc
- Section 2 : Gris très clair (#fafafa)
- Section 3 : Blanc
- etc.
```

---

## 📐 Système de Grille et Espacement

### Grille

- **Container max-width** : 1280px (7xl)
- **Padding horizontal** : 16px (mobile) / 24px (tablet) / 32px (desktop)
- **Gap entre sections** : 80px (mobile) / 120px (desktop)

### Espacement (Spacing Scale)

```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 80px
5xl: 120px
```

---

## 🎨 Palette de Couleurs Complète (Tailwind Config)

```javascript
colors: {
  // Bleu primaire (raffiné)
  primary: {
    50: '#f0f7ff',
    100: '#e0efff',
    200: '#b8dfff',
    300: '#7cc2ff',
    400: '#3b9eff',
    500: '#0a7aff',  // Principal
    600: '#0066e6',
    700: '#0052cc',
    800: '#003d99',
    900: '#002966',
  },

  // Orange accent (nouveau)
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Principal
    600: '#ea580c',
    700: '#c2410c',
  },

  // Gris neutre (raffiné)
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

  // Texte
  ink: '#171717',  // Texte principal (plus foncé)

  // Success & Error
  success: {
    500: '#10b981',
    600: '#059669',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
}
```

---

## 🎯 Éléments de Design Épurés

### 1. Badges/Tags Modernes

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: #fff7ed; /* Orange-50 */
  color: #ea580c; /* Orange-600 */
  border: none;
}
```

### 2. Cards Épurées

```css
.card {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: #0a7aff; /* Primary-500 */
  transform: translateY(-4px);
}
```

### 3. Boutons Modernes

```css
.btn-primary {
  background: #0a7aff; /* Primary-500 */
  color: #ffffff;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #0066e6; /* Primary-600 */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(10, 122, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #262626; /* Neutral-800 */
  border: 1px solid #e8e8e8; /* Neutral-200 */
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
}

.btn-secondary:hover {
  background: #fafafa; /* Neutral-50 */
  border-color: #0a7aff;
  color: #0a7aff;
}
```

### 4. Séparateurs Subtils

```css
.separator {
  height: 1px;
  background: #e8e8e8; /* Neutral-200 */
  border: none;
  margin: 32px 0;
}
```

---

## 🎨 Exemples d'Application

### Hero Section Épurée

```
┌─────────────────────────────────────┐
│                                     │
│  [Badge Orange] "Build Your Legacy" │
│                                     │
│  KOBE Corporation                   │
│  Votre partenaire technologique     │
│                                     │
│  [Bouton Bleu] Découvrir           │
│  [Bouton Gris] Contact             │
│                                     │
└─────────────────────────────────────┘
```

### Card de Service Épurée

```
┌─────────────────────────┐
│ ┌─────┐                 │
│ │ Icon│ Titre Service   │
│ └─────┘                 │
│                         │
│ Description du service  │
│ en quelques lignes...   │
│                         │
│ En savoir plus →        │
└─────────────────────────┘
```

---

## 📋 Checklist d'Application

### Phase 1 : Configuration de Base

- [ ] Mettre à jour `tailwind.config.js` avec la nouvelle palette
- [ ] Créer les variables CSS pour les couleurs
- [ ] Définir les composants de base (buttons, cards, badges)

### Phase 2 : Header & Footer

- [ ] Redesigner le header (blanc ou gris clair)
- [ ] Redesigner le footer (gris clair)
- [ ] Ajuster les contrastes et espacements

### Phase 3 : Sections Principales

- [ ] Hero section épurée
- [ ] Cards de services modernisées
- [ ] Sections avec alternance de fonds

### Phase 4 : Détails et Finitions

- [ ] Badges/Tags modernes
- [ ] Boutons cohérents
- [ ] Espacements optimisés
- [ ] Animations subtiles

---

## 🎨 Inspiration du Design Épuré

### Caractéristiques Clés

1. **Beaucoup d'espace blanc** : Aérer les éléments
2. **Bordures subtiles** : 1px gris très clair
3. **Ombres douces** : Très subtiles, pas agressives
4. **Couleurs limitées** : 2-3 couleurs max par section
5. **Typographie claire** : Hiérarchie évidente
6. **Arrondis modernes** : 12px-16px pour les cards, 20px pour les badges

---

## 🚀 Prochaines Étapes

1. **Valider la palette** : Choisir entre les options proposées
2. **Appliquer progressivement** : Commencer par le header/footer
3. **Tester la cohérence** : Vérifier sur toutes les pages
4. **Affiner les détails** : Espacements, ombres, animations

---

**Dernière mise à jour** : 17 janvier 2026
