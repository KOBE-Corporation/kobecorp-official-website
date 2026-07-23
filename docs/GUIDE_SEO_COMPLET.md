# 🚀 Guide SEO Complet - Configuration et Optimisations

**Version** : 1.0  
**Date** : 17 janvier 2026  
**Framework** : React + Vite (adaptable à tout projet web)

---

## 📋 Table des Matières

1. [Configuration de Base](#1-configuration-de-base)
2. [Fichiers SEO Requis](#2-fichiers-seo-requis)
3. [Composant SEO React](#3-composant-seo-react)
4. [Configuration Nginx (Reverse Proxy)](#4-configuration-nginx-reverse-proxy)
5. [Configuration Nginx (Frontend)](#5-configuration-nginx-frontend)
6. [Optimisations Performances](#6-optimisations-performances)
7. [Images SEO](#7-images-seo)
8. [Vérification et Tests](#8-vérification-et-tests)
9. [Checklist Complète](#9-checklist-complète)

---

## 1. Configuration de Base

### 1.1 Fichier `index.html`

#### Métadonnées Essentielles

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />

    <!-- Favicons Multi-Résolutions -->
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/android-chrome-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="512x512"
      href="/android-chrome-512x512.png"
    />
    <link rel="manifest" href="/manifest.json" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Métadonnées de Base -->
    <meta
      name="description"
      content="Description de votre site (150-160 caractères)"
    />
    <meta
      name="keywords"
      content="mots-clés, pertinents, séparés, par, virgules"
    />
    <meta name="author" content="Votre Nom" />
    <meta name="creator" content="Votre Nom" />
    <meta name="publisher" content="Nom de l'Entreprise" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="French, English" />
    <meta name="revisit-after" content="7 days" />
    <meta name="theme-color" content="#3b82f6" />

    <!-- Vérification des Moteurs de Recherche -->
    <!-- Google Search Console - À remplacer par votre code -->
    <meta
      name="google-site-verification"
      content="VOTRE_CODE_GOOGLE_SEARCH_CONSOLE"
    />
    <!-- Bing Webmaster Tools - À remplacer par votre code -->
    <meta name="msvalidate.01" content="VOTRE_CODE_BING_WEBMASTER" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.votresite.com/" />
    <meta property="og:title" content="Titre de votre site" />
    <meta property="og:description" content="Description de votre site" />
    <meta
      property="og:image"
      content="https://www.votresite.com/og-image.png"
    />
    <meta property="og:site_name" content="Nom de votre site" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:locale:alternate" content="en_US" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://www.votresite.com/" />
    <meta name="twitter:title" content="Titre de votre site" />
    <meta name="twitter:description" content="Description de votre site" />
    <meta
      name="twitter:image"
      content="https://www.votresite.com/og-image.png"
    />
    <meta name="twitter:site" content="@votrecompte" />
    <meta name="twitter:creator" content="@votrecompte" />

    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.votresite.com/" />

    <!-- Alternate languages -->
    <link rel="alternate" hreflang="fr" href="https://www.votresite.com/" />
    <link rel="alternate" hreflang="en" href="https://www.votresite.com/" />
    <link
      rel="alternate"
      hreflang="x-default"
      href="https://www.votresite.com/"
    />

    <!-- DNS Prefetch pour améliorer les performances -->
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

    <!-- Preconnect pour les ressources critiques -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <title>Votre Site - Votre Slogan</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 2. Fichiers SEO Requis

### 2.1 `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Page d'accueil -->
  <url>
    <loc>https://www.votresite.com/</loc>
    <lastmod>2026-01-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="https://www.votresite.com/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.votresite.com/" />
  </url>

  <!-- Autres pages -->
  <url>
    <loc>https://www.votresite.com/services</loc>
    <lastmod>2026-01-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="https://www.votresite.com/services" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.votresite.com/services" />
  </url>

  <!-- Ajoutez toutes vos pages importantes -->

</urlset>
```

**Priorités recommandées** :

- Page d'accueil : `1.0`
- Pages importantes : `0.8 - 0.9`
- Pages secondaires : `0.6 - 0.7`
- Pages légales : `0.3`

**Fréquences de changement** :

- `daily` : Contenu qui change quotidiennement
- `weekly` : Contenu qui change hebdomadairement
- `monthly` : Contenu qui change mensuellement
- `yearly` : Contenu qui change rarement

### 2.2 `public/robots.txt`

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.votresite.com/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Allow all search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Crawl-delay (optional, in seconds)
Crawl-delay: 1
```

### 2.3 `public/manifest.json`

```json
{
  "name": "Nom de votre application",
  "short_name": "Nom Court",
  "description": "Description de votre application",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "fr",
  "dir": "ltr",
  "categories": ["business", "technology"],
  "icons": [
    {
      "src": "/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "Services",
      "short_name": "Services",
      "description": "Découvrez nos services",
      "url": "/services",
      "icons": [
        {
          "src": "/favicon-192x192.png",
          "sizes": "192x192"
        }
      ]
    }
  ]
}
```

---

## 3. Composant SEO React

### 3.1 Structure du Composant (`src/components/SEO.tsx`)

```typescript
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { companyInfo } from "../data/siteContent"; // Adaptez selon votre structure

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  canonical?: string;
}

const baseUrl = "https://www.votresite.com"; // À adapter
const defaultImage = `${baseUrl}/og-image.png`;
const defaultDescription = "Description par défaut de votre site";

function SEO({
  title,
  description = defaultDescription,
  keywords = "mots-clés, par, défaut",
  image = defaultImage,
  type = "website",
  noindex = false,
  canonical,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title
    ? `${title} | ${companyInfo.name}`
    : `${companyInfo.name} - ${companyInfo.slogan}`;
  const url = canonical || `${baseUrl}${location.pathname}${location.search}`;

  useEffect(() => {
    const updateSEO = () => {
      // Titre de la page
      document.title = fullTitle;

      const updates: Array<() => void> = [];

      // Meta description
      updates.push(() => {
        let metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (!metaDescription) {
          metaDescription = document.createElement("meta");
          metaDescription.setAttribute("name", "description");
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", description);
      });

      // Meta keywords
      updates.push(() => {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement("meta");
          metaKeywords.setAttribute("name", "keywords");
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", keywords);
      });

      // Robots
      updates.push(() => {
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (noindex) {
          if (!metaRobots) {
            metaRobots = document.createElement("meta");
            metaRobots.setAttribute("name", "robots");
            document.head.appendChild(metaRobots);
          }
          metaRobots.setAttribute("content", "noindex, nofollow");
        } else {
          if (metaRobots) {
            metaRobots.remove();
          }
        }
      });

      // Canonical URL
      updates.push(() => {
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
          linkCanonical = document.createElement("link");
          linkCanonical.setAttribute("rel", "canonical");
          document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute("href", url);
      });

      // Open Graph
      const ogTags = [
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: `${companyInfo.name} - ${description.substring(0, 100)}`,
        },
        { property: "og:url", content: url },
        { property: "og:type", content: type },
        { property: "og:site_name", content: companyInfo.name },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:locale:alternate", content: "en_US" },
      ];

      ogTags.forEach(({ property, content }) => {
        updates.push(() => {
          let meta = document.querySelector(`meta[property="${property}"]`);
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("property", property);
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", content);
        });
      });

      // Twitter Card
      const twitterTags = [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: fullTitle },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        { name: "twitter:site", content: "@votrecompte" },
        { name: "twitter:creator", content: "@votrecompte" },
      ];

      twitterTags.forEach(({ name, content }) => {
        updates.push(() => {
          let meta = document.querySelector(`meta[name="${name}"]`);
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", name);
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", content);
        });
      });

      // Exécuter toutes les mises à jour
      updates.forEach((update) => update());
    };

    updateSEO();

    // Schema.org JSON-LD
    const createSchemas = () => {
      const existingSchemas = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      existingSchemas.forEach((schema) => schema.remove());

      // Schema Organization
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: companyInfo.name,
        alternateName: "Nom Court",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        description: description,
        foundingDate: companyInfo.year,
        address: {
          "@type": "PostalAddress",
          streetAddress: companyInfo.address.street,
          addressLocality: companyInfo.address.city,
          addressRegion: companyInfo.address.region,
          addressCountry: companyInfo.address.country,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: companyInfo.contact.phone,
            contactType: "customer service",
            email: companyInfo.contact.email,
            availableLanguage: ["French", "English"],
            areaServed: "CM", // Code pays ISO
          },
        ],
        sameAs: [
          companyInfo.social.linkedin,
          companyInfo.social.facebook,
          companyInfo.social.instagram,
          companyInfo.social.whatsapp,
        ],
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: "1-10",
        },
        areaServed: {
          "@type": "Country",
          name: "Cameroun",
        },
      };

      // Schema WebSite
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: companyInfo.name,
        url: baseUrl,
        description: description,
        publisher: {
          "@type": "Organization",
          name: companyInfo.name,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: ["fr", "en"],
      };

      const schemas = [organizationSchema, websiteSchema];
      schemas.forEach((schema) => {
        const schemaScript = document.createElement("script");
        schemaScript.type = "application/ld+json";
        schemaScript.textContent = JSON.stringify(schema);
        document.head.appendChild(schemaScript);
      });
    };

    // Décaler la création des schémas
    if ("requestIdleCallback" in window) {
      requestIdleCallback(createSchemas, { timeout: 2000 });
    } else {
      setTimeout(createSchemas, 0);
    }
  }, [fullTitle, description, keywords, image, type, noindex, url]);

  return null;
}

export default SEO;
```

### 3.2 Utilisation dans les Pages

```typescript
import SEO from "../components/SEO";

function HomePage() {
  return (
    <>
      <SEO
        title="Accueil"
        description="Description spécifique de la page d'accueil"
        keywords="mots-clés, spécifiques, page, accueil"
      />
      {/* Votre contenu */}
    </>
  );
}
```

---

## 4. Configuration Nginx (Reverse Proxy)

### 4.1 Configuration Complète (`setup-kobe-proxy/conf.d/votresite.com.conf`)

```nginx
# ==========================================
# Configuration Reverse Proxy (HTTPS)
# ==========================================

upstream votre_backend {
    server votre-app:80;
    keepalive 32;
}

# Mapping pour WebSocket
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# ==========================================
# Redirection HTTP -> HTTPS
# ==========================================
server {
    listen 80;
    server_name votresite.com www.votresite.com;

    # Certbot challenge
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
        allow all;
        default_type text/plain;
        try_files $uri =404;
    }

    # Redirection HTTPS vers www
    location / {
        return 301 https://www.votresite.com$request_uri;
    }
}

# ==========================================
# Redirection non-www -> www (HTTPS)
# ==========================================
server {
    listen 443 ssl;
    http2 on;
    server_name votresite.com;

    ssl_certificate /etc/letsencrypt/live/www.votresite.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.votresite.com/privkey.pem;

    return 301 https://www.votresite.com$request_uri;
}

# ==========================================
# Configuration HTTPS principale
# ==========================================
server {
    listen 443 ssl;
    http2 on;
    server_name www.votresite.com;

    # Certificats SSL
    ssl_certificate /etc/letsencrypt/live/www.votresite.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.votresite.com/privkey.pem;

    # Protocoles et ciphers SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;

    # Headers de sécurité
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Logs
    access_log /var/log/nginx/votre_access.log combined;
    error_log /var/log/nginx/votre_error.log warn;

    # Proxy vers l'application
    location / {
        proxy_pass http://votre_backend;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        proxy_buffering off;
    }

    # Cache des assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)$ {
        proxy_pass http://votre_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Healthcheck endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # ==========================================
    # DIRECTIVES SEO
    # ==========================================

    # Sitemap XML
    location = /sitemap.xml {
        proxy_pass http://votre_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Content-Type "application/xml; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
        add_header X-Robots-Tag "all" always;
        access_log /var/log/nginx/votre_seo.log main;
    }

    # Robots.txt
    location = /robots.txt {
        proxy_pass http://votre_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Content-Type "text/plain; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
        access_log /var/log/nginx/votre_seo.log main;
    }

    # Favicon
    location = /favicon.ico {
        proxy_pass http://votre_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
        log_not_found off;
    }

    # Web App Manifest (PWA)
    location = /manifest.json {
        proxy_pass http://votre_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Content-Type "application/manifest+json; charset=utf-8" always;
        add_header Cache-Control "public, max-age=86400" always;
        access_log off;
    }

    # Fichiers de vérification Google Search Console
    location ~* ^/google[a-zA-Z0-9]+\.html$ {
        proxy_pass http://votre_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Content-Type "text/html; charset=utf-8" always;
        access_log /var/log/nginx/votre_seo.log main;
    }

    # Bloquer l'accès aux fichiers cachés
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

**Points importants** :

- ✅ Content-Type correct pour sitemap.xml (`application/xml`)
- ✅ Content-Type correct pour robots.txt (`text/plain`)
- ✅ Cache configuré (1 heure pour sitemap/robots, 30 jours pour favicon)
- ✅ Logs SEO séparés pour le monitoring
- ✅ Headers proxy corrects pour HTTPS

---

## 5. Configuration Nginx (Frontend)

### 5.1 Configuration Complète (`setup-front/nginx.conf`)

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Compression gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json application/font-woff application/font-woff2 font/woff font/woff2 image/svg+xml;

    # Compression Brotli (optionnel - nécessite le module)
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/plain text/css text/xml text/javascript application/javascript application/json application/font-woff application/font-woff2 font/woff font/woff2 image/svg+xml;

    # Cache pour les assets statiques
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp|avif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Servir les fichiers SEO du dossier public
    location ~* ^/(favicon\.png|favicon\.ico|robots\.txt|sitemap\.xml|og-image\.png|manifest\.json)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Gestion du routing SPA (React Router)
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Sécurité - Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Content Security Policy (ajustez selon vos besoins)
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.emailjs.com; frame-ancestors 'self';" always;

    # Désactiver l'affichage de la version nginx
    server_tokens off;

    # Logs
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;
}
```

---

## 6. Optimisations Performances

### 6.1 Code Splitting (Vite)

**Fichier** : `vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    cssMinify: "esbuild",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
        // Optimisation du code splitting
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          icons: ["@heroicons/react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  publicDir: "public",
  css: {
    devSourcemap: false,
    postcss: "./postcss.config.js",
  },
});
```

### 6.2 Lazy Loading des Routes (React)

**Fichier** : `src/App.tsx`

```typescript
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy loading des pages
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
// ... autres pages

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        {/* ... autres routes */}
      </Routes>
    </Suspense>
  );
}
```

### 6.3 Composant Image Optimisé

**Fichier** : `src/components/OptimizedImage.tsx`

```typescript
import { useState, useEffect } from "react";
import type { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: "high" | "low" | "auto";
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = "auto",
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fetchPriority =
    priority === "high" ? "high" : priority === "low" ? "low" : undefined;
  const loading = priority === "high" ? "eager" : "lazy";

  useEffect(() => {
    if (priority === "high" && src) {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={`${className} ${
        !isLoaded && !error ? "opacity-0" : "opacity-100"
      } transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      {...props}
    />
  );
}
```

**Utilisation** :

```typescript
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority="high" // ou "low" pour les images non critiques
/>
```

---

## 7. Images SEO

### 7.1 Liste des Images Requises

| Fichier                      | Taille            | Usage             | Outil                |
| ---------------------------- | ----------------- | ----------------- | -------------------- |
| `favicon-16x16.png`          | 16x16px           | Favicon standard  | RealFaviconGenerator |
| `favicon-32x32.png`          | 32x32px           | Favicon standard  | RealFaviconGenerator |
| `favicon.png`                | 48x48px           | Favicon standard  | RealFaviconGenerator |
| `apple-touch-icon.png`       | 180x180px         | iOS Safari        | RealFaviconGenerator |
| `android-chrome-192x192.png` | 192x192px         | Android Chrome    | RealFaviconGenerator |
| `android-chrome-512x512.png` | 512x512px         | Android Chrome    | RealFaviconGenerator |
| `favicon.ico`                | Multi-résolutions | Favicon classique | RealFaviconGenerator |
| `og-image.png`               | 1200x630px        | Open Graph        | Canva/Figma          |
| `twitter-image.png`          | 1200x600px        | Twitter Card      | Canva/Figma          |
| `logo.png`                   | 512x512px         | Schema.org        | Image editor         |

### 7.2 Outils de Création

1. **RealFaviconGenerator** : https://realfavicongenerator.net/

   - Upload votre logo
   - Génère tous les formats automatiquement
   - Télécharge un package complet

2. **Canva** : https://www.canva.com/

   - Templates Open Graph disponibles
   - Design professionnel
   - Export optimisé

3. **TinyPNG** : https://tinypng.com/
   - Compression d'images
   - Réduction du poids sans perte de qualité

### 7.3 Spécifications Techniques

**Favicons** :

- Format : PNG (recommandé) ou ICO
- Fond : Transparent (PNG) ou solide (ICO)
- Optimisation : Compresser avec TinyPNG

**Images Open Graph** :

- Format : PNG (meilleure qualité) ou JPG (plus léger)
- Ratio : 1.91:1 (1200x630px)
- Poids : < 300 KB
- Couleurs : sRGB
- Texte : Lisible même en miniature (minimum 24px)

---

## 8. Vérification et Tests

### 8.1 Obtenir les Codes de Vérification

#### Google Search Console

1. Aller sur https://search.google.com/search-console
2. Ajouter la propriété `www.votresite.com`
3. Choisir "Balise HTML" comme méthode
4. Copier le code et remplacer dans `index.html`
5. Soumettre le sitemap : `https://www.votresite.com/sitemap.xml`

#### Bing Webmaster Tools

1. Aller sur https://www.bing.com/webmasters
2. Ajouter votre site
3. Choisir "Meta tag" comme méthode
4. Copier le code et remplacer dans `index.html`

### 8.2 Tests de Validation

#### Test Open Graph (Facebook)

- URL : https://developers.facebook.com/tools/debug/
- Entrer votre URL
- Vérifier l'aperçu

#### Test Twitter Card

- URL : https://cards-dev.twitter.com/validator
- Entrer votre URL
- Vérifier l'aperçu

#### Test LinkedIn

- URL : https://www.linkedin.com/post-inspector/
- Entrer votre URL
- Vérifier l'aperçu

#### Test Données Structurées

- URL : https://search.google.com/test/rich-results
- Entrer votre URL
- Vérifier que les schémas sont valides

#### Test Sitemap

```bash
curl -I https://www.votresite.com/sitemap.xml
# Doit retourner : Content-Type: application/xml; charset=utf-8
```

#### Test Robots.txt

```bash
curl -I https://www.votresite.com/robots.txt
# Doit retourner : Content-Type: text/plain; charset=utf-8
```

---

## 9. Checklist Complète

### Configuration de Base

- [ ] Métadonnées dans `index.html` complètes
- [ ] Codes de vérification Google/Bing ajoutés
- [ ] Favicons multi-résolutions configurés
- [ ] Manifest.json créé et configuré

### Fichiers SEO

- [ ] `public/sitemap.xml` créé avec toutes les pages
- [ ] `public/robots.txt` configuré avec référence au sitemap
- [ ] Dates `lastmod` à jour dans le sitemap
- [ ] Priorités définies correctement

### Composant SEO

- [ ] Composant SEO créé et fonctionnel
- [ ] Utilisé sur toutes les pages
- [ ] Données structurées JSON-LD générées
- [ ] Open Graph tags complets
- [ ] Twitter Card tags complets

### Configuration Nginx

- [ ] Reverse proxy configuré avec directives SEO
- [ ] Frontend nginx configuré
- [ ] Content-Type corrects pour sitemap/robots
- [ ] Cache configuré
- [ ] Logs SEO séparés

### Images

- [ ] Tous les favicons créés
- [ ] `og-image.png` créé (1200x630px)
- [ ] `logo.png` créé (512x512px)
- [ ] Images optimisées (< 300 KB)

### Optimisations

- [ ] Code splitting configuré
- [ ] Lazy loading des routes implémenté
- [ ] Composant OptimizedImage créé
- [ ] Images avec width/height
- [ ] DNS prefetch/preconnect configurés

### Tests

- [ ] Sitemap accessible et valide
- [ ] Robots.txt accessible
- [ ] Open Graph testé (Facebook)
- [ ] Twitter Card testé
- [ ] Données structurées validées
- [ ] Google Search Console configuré
- [ ] Bing Webmaster Tools configuré

---

## 🔗 Ressources Utiles

### Outils de Test

- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### Outils de Création

- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Canva](https://www.canva.com/)
- [TinyPNG](https://tinypng.com/)

### Services

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## 📝 Notes Importantes

1. **Adaptation** : Remplacez tous les `votresite.com` par votre domaine
2. **Codes de vérification** : À remplacer dès que vous créez les comptes
3. **Images** : Créer toutes les images avant le déploiement final
4. **Cache** : Vider le cache après chaque modification
5. **Mise à jour** : Mettre à jour le sitemap quand vous ajoutez des pages
6. **Monitoring** : Surveiller les logs SEO pour détecter les problèmes

---

**Dernière mise à jour** : 17 janvier 2026  
**Version** : 1.0  
**Statut** : Guide complet et réutilisable ✅
