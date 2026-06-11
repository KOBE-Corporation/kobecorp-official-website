# DEPLOYMENT.md — KOBE Corporation

> **Guide complet de déploiement** pour le site React (Vite) sur VPS Docker avec Cloudflare Flexible SSL.
>
> Dernière mise à jour : 2026-05-27

---

## Table des matières

1. [Architecture cible](#1-architecture-cible)
2. [État actuel — Inventaire des fichiers](#2-état-actuel--inventaire-des-fichiers)
3. [Modifications du Dockerfile](#3-modifications-du-dockerfile)
4. [Modifications du compose.yaml](#4-modifications-du-composeyaml)
5. [Nginx interne au container](#5-nginx-interne-au-container)
6. [Nginx reverse proxy sur le VPS](#6-nginx-reverse-proxy-sur-le-vps)
7. [Variables d'environnement](#7-variables-denvironnement)
8. [CI/CD — Workflow GitHub Actions simplifié](#8-cicd--workflow-github-actions-simplifié)
9. [Checklist de déploiement](#9-checklist-de-déploiement)
10. [Dépannage](#10-dépannage)

---

## 1. Architecture cible

```
Internet
   │
   ▼
Cloudflare (HTTPS terminé ici — mode Flexible)
   │
   ▼ HTTP (port 80)
┌──────────────────────────────────────────────────┐
│  VPS Ubuntu 24.04                                │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ blogpress-nginx (reverse proxy principal)│    │
│  │ Écoute :80                               │    │
│  │                                          │    │
│  │  kobecorporation.com ──► kobecorporation │    │
│  │  ben-djibril.kobe..  ──► kobecorporation │    │
│  │  pricing.kobe..      ──► kobecorporation │    │
│  │  (autres projets)    ──► iRedMail, etc.  │    │
│  └──────────┬───────────────────────────────┘    │
│             │ réseau Docker: kobecorp-network     │
│  ┌──────────▼───────────────────────────────┐    │
│  │ kobecorporation-web                       │    │
│  │ Nginx Alpine → sert dist/ sur :80         │    │
│  │ Image: azerty78/kobecorporation-web       │    │
│  └───────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

**Points clés :**

- **Cloudflare Flexible** : Cloudflare termine le HTTPS côté client, puis envoie du HTTP simple (port 80) vers le VPS. **Aucun certificat SSL sur le VPS.**
- **blogpress-nginx** : reverse proxy Docker déjà en place, partagé avec iRedMail, TRIDOM, etc.
- **kobecorporation-web** : container qui sert les fichiers statiques React (`dist/`) via Nginx Alpine sur le port 80 interne.
- **Réseau Docker `kobecorp-network`** : réseau bridge externe partagé entre le reverse proxy et les containers applicatifs.

---

## 2. État actuel — Inventaire des fichiers

### 2.1. Fichiers Docker

#### `setup-front/Dockerfile` (actuel)

```dockerfile
# Stage 1: Build de l'application
ARG NODE_VERSION=22.13.1

ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_CONTACT_TEMPLATE_ID
ARG VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --legacy-peer-deps --no-audit

COPY . .

ENV VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}
ENV VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}
ENV VITE_EMAILJS_CONTACT_TEMPLATE_ID=${VITE_EMAILJS_CONTACT_TEMPLATE_ID}
ENV VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=${VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID}

ENV NODE_ENV=production

RUN rm -rf node_modules/.cache .vite dist || true

RUN npm run build -- --mode production

# Stage 2: Serveur nginx pour la production
FROM nginx:alpine AS production

COPY setup-front/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

> **Verdict** : Le Dockerfile est déjà correct (multi-stage, sert `dist/` via Nginx Alpine sur le port 80). **Aucune modification nécessaire.**

#### `setup-front/compose.yaml` (actuel)

```yaml
services:
  web:
    image: azerty78/kobecorporation-web:latest
    container_name: kobecorporation-web
    restart: unless-stopped
    expose:
      - "80"
    environment:
      - NODE_ENV=production
    networks:
      - kobecorp-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  kobecorp-network:
    name: kobecorp-network
    external: true
```

> **Verdict** : Le compose.yaml est correct. L'image est pullée depuis Docker Hub (`azerty78/kobecorporation-web:latest`), expose uniquement le port 80 en interne, et se connecte au réseau Docker externe partagé. **Aucune modification nécessaire.**

#### `setup-front/.dockerignore` (actuel)

```
**/.classpath
**/.dockerignore
**/.env
**/.git
**/.gitignore
**/.project
**/.settings
**/.toolstarget
**/.vs
**/.vscode
**/.next
**/.cache
**/*.*proj.user
**/*.dbmdl
**/*.jfm
**/charts
**/docker-compose*
**/compose.y*ml
**/Dockerfile*
**/node_modules
**/npm-debug.log
**/obj
**/secrets.dev.yaml
**/values.dev.yaml
**/build
**/dist
**/setup-front/*
!**/setup-front/nginx.conf
LICENSE
README.md
*.md
```

> **Verdict** : Correct. Exclut tout le superflu, garde uniquement `setup-front/nginx.conf` pour la copie dans le stage de production.

### 2.2. Nginx interne au container

#### `setup-front/nginx.conf` (actuel)

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript
               application/xml+rss application/javascript application/json
               application/font-woff application/font-woff2 font/woff font/woff2
               image/svg+xml;

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp|avif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* ^/(favicon\.png|favicon\.ico|robots\.txt|sitemap\.xml|og-image\.png)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'
      'unsafe-eval' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline'
      https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https:; connect-src 'self' https://api.emailjs.com;
      frame-ancestors 'self';" always;

    server_tokens off;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;
}
```

> **Verdict** : Correct. Sert les fichiers statiques, gère le SPA routing (`try_files $uri /index.html`), compression gzip, cache des assets, security headers. **Aucune modification nécessaire.**

### 2.3. Nginx reverse proxy (blogpress-nginx sur le VPS)

#### `setup-kobe-proxy/conf.d/kobecorporation.com.conf` (actuel — À REMPLACER)

**Problèmes identifiés :**

- Contient des blocs `listen 443 ssl` avec des chemins vers `/etc/letsencrypt/` → **inutile avec Cloudflare Flexible**
- Redirection HTTP→HTTPS → **contre-productive** (Cloudflare envoie déjà du HTTP au VPS)
- Logique Certbot challenge → **inutile** (pas de Let's Encrypt)
- Le fichier `.with-ssl` est identique → redondant

#### `setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf` (actuel — À REMPLACER)

**Mêmes problèmes** : blocs SSL, Certbot, redirection HTTPS.

### 2.4. Variables d'environnement

#### `setup-front/.env` (actuel)

```env
NODE_ENV=production
VITE_APP_NAME=KOBE Corporation
VITE_APP_URL=https://kobecorporation.com
VITE_BUILD_TIME=__BUILD_TIME__

DOMAIN=kobecorporation.com

VITE_COMPANY_NAME=KOBE Corporation
VITE_COMPANY_SLOGAN=Build Your Own Legacy
VITE_COMPANY_EMAIL=contact@kobecorporation.com
VITE_COMPANY_PHONE=+237-655-938-501
VITE_COMPANY_ADDRESS=Carrefour Belle Mere, Yaounde, Cameroun

VITE_EMAILJS_PUBLIC_KEY=votre_public_key_ici
VITE_EMAILJS_SERVICE_ID=votre_service_id_ici
VITE_EMAILJS_CONTACT_TEMPLATE_ID=votre_template_contact_id_ici
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=votre_template_newsletter_id_ici

VITE_CONTACT_EMAIL=contact@kobecorporation.com

VITE_SOCIAL_WHATSAPP=https://whatsapp.com/channel/0029VbByklp7oQhjSR9w482f
VITE_SOCIAL_FACEBOOK=https://www.facebook.com/share/14cRYHeBKCY/
VITE_SOCIAL_LINKEDIN=https://www.linkedin.com/company/kobe-corporation/
VITE_SOCIAL_INSTAGRAM=https://www.instagram.com/kobecorporation?igsh=MWVyZWs0eGk3MnVwNA==

MAIN_DOMAIN=kobecorporation.com
SUBDOMAINS=www.kobecorporation.com,ben-djibril.kobecorporation.com
CERTBOT_EMAIL=contact@kobecorporation.com
```

> **Problèmes** : Les clés EmailJS sont des placeholders, les variables `CERTBOT_EMAIL`, `MAIN_DOMAIN`, `SUBDOMAINS` sont inutiles avec Cloudflare.

### 2.5. CI/CD

#### `.github/workflows/setup-cicd.yml` (actuel — ~1585 lignes)

**Structure des jobs :**

| Job | Description | Problèmes |
|-----|-------------|-----------|
| `tags` | Crée des tags Git automatiques | OK |
| `build` | Build Docker + push sur Docker Hub | Workarounds buildx/activity, trop de boilerplate |
| `test` | Pull l'image + test de démarrage | OK |
| `deploy` | SSH vers VPS, rsync fichiers source, docker compose up | **Copie TOUT le code source sur le VPS** (inutile si on pull l'image), logique SSL/Certbot lourde |
| `release` | Crée une GitHub Release | OK |

**Problème majeur du deploy actuel** : Le workflow copie `package.json`, `src/`, `public/`, `.env`, etc. sur le VPS via `rsync`, **puis** tente de faire `docker compose pull` de l'image pré-construite. C'est contradictoire — soit on pull l'image (et on n'a besoin que du `compose.yaml`), soit on build sur le VPS (et on a besoin des sources). **Le bon flow est de pull l'image.**

### 2.6. Fichiers de configuration Vite

#### `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
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
  css: {
    devSourcemap: false,
    postcss: './postcss.config.js',
  },
})
```

> **Verdict** : Correct. Pas de changement nécessaire.

---

## 3. Modifications du Dockerfile

Le Dockerfile actuel est **déjà correct** pour l'architecture cible. Récapitulatif de ce qu'il fait :

```
Stage 1 (builder):
  node:22.13.1-alpine → npm install → npm run build → produit dist/

Stage 2 (production):
  nginx:alpine → copie nginx.conf + dist/ → expose 80 → CMD nginx
```

**Aucune modification requise.** Le Dockerfile ne contient aucune logique SSL/TLS/Certbot.

Si toutefois le Dockerfile n'existait pas ou devait être recréé de zéro, voici la version de référence :

```dockerfile
ARG NODE_VERSION=22.13.1

ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_CONTACT_TEMPLATE_ID
ARG VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID

# ---------- Stage 1 : Build ----------
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit

COPY . .

ENV VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY} \
    VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID} \
    VITE_EMAILJS_CONTACT_TEMPLATE_ID=${VITE_EMAILJS_CONTACT_TEMPLATE_ID} \
    VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=${VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID} \
    NODE_ENV=production

RUN npm run build -- --mode production

# ---------- Stage 2 : Serveur ----------
FROM nginx:alpine
COPY setup-front/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

> **Note** : La seule amélioration serait de remplacer `npm install` par `npm ci` (plus rapide, déterministe, adapté au CI).

---

## 4. Modifications du compose.yaml

Le compose.yaml actuel est **déjà correct** :

```yaml
services:
  web:
    image: azerty78/kobecorporation-web:latest
    container_name: kobecorporation-web
    restart: unless-stopped
    expose:
      - "80"
    environment:
      - NODE_ENV=production
    networks:
      - kobecorp-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  kobecorp-network:
    name: kobecorp-network
    external: true
```

**Points de validation :**

| Critère | Statut |
|---------|--------|
| Image pullée depuis Docker Hub | ✅ `azerty78/kobecorporation-web:latest` |
| Pas de `ports:` exposé sur l'hôte | ✅ utilise `expose: ["80"]` (interne uniquement) |
| Pas de `build:` (pull only) | ✅ |
| Réseau Docker externe partagé | ✅ `kobecorp-network` (le reverse proxy y est aussi) |
| Healthcheck | ✅ |
| Pas de volumes SSL | ✅ |

**Aucune modification requise.**

---

## 5. Nginx interne au container

Le fichier `setup-front/nginx.conf` est **déjà correct**. Il sert les fichiers statiques sur le port 80 avec :

- Gestion SPA : `try_files $uri $uri/ /index.html`
- Compression gzip
- Cache agressif sur les assets (1 an, immutable)
- Security headers (CSP, X-Frame-Options, etc.)
- `server_tokens off`

**Aucune modification requise.**

---

## 6. Nginx reverse proxy sur le VPS

### 6.1. Problèmes actuels

Les fichiers dans `setup-kobe-proxy/conf.d/` contiennent :

- Des blocs `listen 443 ssl` avec chemins vers `/etc/letsencrypt/`
- Des redirections HTTP → HTTPS
- Des locations Certbot `/.well-known/acme-challenge/`

**Tout cela est incompatible avec Cloudflare Flexible** où :
- Cloudflare gère HTTPS côté client
- Le VPS ne reçoit que du HTTP sur le port 80
- Aucun certificat SSL n'est nécessaire sur le VPS

### 6.2. Nouveau fichier — `setup-kobe-proxy/conf.d/kobecorporation.com.conf`

Remplacer **intégralement** le fichier actuel par :

```nginx
# ==========================================
# KOBE Corporation — Reverse Proxy (Cloudflare Flexible)
# ==========================================
# Cloudflare termine le HTTPS côté client.
# Le VPS reçoit uniquement du HTTP (port 80).
# Aucun certificat SSL local nécessaire.
# ==========================================

upstream kobe_web_backend {
    server kobecorporation-web:80;
    keepalive 32;
}

# ==========================================
# kobecorporation.com + www
# ==========================================
server {
    listen 80;
    server_name kobecorporation.com www.kobecorporation.com;

    access_log /var/log/nginx/kobecorp_access.log;
    error_log  /var/log/nginx/kobecorp_error.log warn;

    # Redirection /home vers / (SEO)
    location = /home  { return 301 /; }
    location = /home/ { return 301 /; }

    # Proxy vers le container React
    location / {
        proxy_pass http://kobe_web_backend;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_buffering off;
    }

    # Cache des assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)$ {
        proxy_pass http://kobe_web_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Healthcheck
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # SEO — Sitemap
    location = /sitemap.xml {
        proxy_pass http://kobe_web_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Content-Type "application/xml; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
    }

    # SEO — Robots
    location = /robots.txt {
        proxy_pass http://kobe_web_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Content-Type "text/plain; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
    }

    # Favicon
    location = /favicon.ico {
        proxy_pass http://kobe_web_backend;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
        log_not_found off;
    }

    # Manifest PWA
    location = /manifest.json {
        proxy_pass http://kobe_web_backend;
        add_header Content-Type "application/manifest+json; charset=utf-8" always;
        add_header Cache-Control "public, max-age=86400" always;
        access_log off;
    }

    # Google Search Console
    location ~* ^/google[a-zA-Z0-9]+\.html$ {
        proxy_pass http://kobe_web_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Bloquer les fichiers cachés
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}

# ==========================================
# pricing.kobecorporation.com
# ==========================================
server {
    listen 80;
    server_name pricing.kobecorporation.com;

    access_log /var/log/nginx/kobecorp_pricing_access.log;
    error_log  /var/log/nginx/kobecorp_pricing_error.log warn;

    location / {
        proxy_pass http://kobe_web_backend;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_buffering off;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)$ {
        proxy_pass http://kobe_web_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 6.3. Nouveau fichier — `setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf`

Remplacer **intégralement** le fichier actuel par :

```nginx
# ==========================================
# Ben Djibril — Sous-domaine (Cloudflare Flexible)
# ==========================================

upstream ben_djibril_backend {
    server ben-djibril-site:80;
    keepalive 32;
}

server {
    listen 80;
    server_name ben-djibril.kobecorporation.com;

    access_log /var/log/nginx/ben-djibril_access.log;
    error_log  /var/log/nginx/ben-djibril_error.log warn;

    # Redirection /home → / (SEO)
    location = /home  { return 301 /; }
    location = /home/ { return 301 /; }

    # Proxy vers l'application
    location / {
        proxy_pass http://ben_djibril_backend;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
        proxy_set_header X-Forwarded-Port  $server_port;

        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_connect_timeout 60s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;

        proxy_buffering         off;
        proxy_request_buffering off;
    }

    # Cache assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)$ {
        proxy_pass http://ben_djibril_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Healthcheck
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # SEO
    location = /sitemap.xml {
        proxy_pass http://ben_djibril_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Content-Type "application/xml; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
    }

    location = /robots.txt {
        proxy_pass http://ben_djibril_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Content-Type "text/plain; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
    }

    location = /favicon.ico {
        proxy_pass http://ben_djibril_backend;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
        log_not_found off;
    }

    location = /manifest.json {
        proxy_pass http://ben_djibril_backend;
        add_header Content-Type "application/manifest+json; charset=utf-8" always;
        add_header Cache-Control "public, max-age=86400" always;
        access_log off;
    }

    location ~* ^/google[a-zA-Z0-9]+\.html$ {
        proxy_pass http://ben_djibril_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 6.4. Fichiers à supprimer

Les fichiers `.with-ssl` sont désormais **inutiles** :

- `setup-kobe-proxy/conf.d/kobecorporation.com.conf.with-ssl`
- `setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf.with-ssl`

---

## 7. Variables d'environnement

### 7.1. Variables nécessaires au build Docker (Vite `--build-arg`)

Ces variables sont injectées au moment du `docker build` via `--build-arg` et consommées par Vite au moment du build (`import.meta.env.VITE_*`). Elles sont **figées dans le bundle final** :

| Variable | Rôle | Valeur prod |
|----------|------|-------------|
| `VITE_EMAILJS_PUBLIC_KEY` | Clé publique EmailJS | `<votre vraie clé>` |
| `VITE_EMAILJS_SERVICE_ID` | ID du service EmailJS | `<votre vrai ID>` |
| `VITE_EMAILJS_CONTACT_TEMPLATE_ID` | Template contact EmailJS | `<votre vrai ID>` |
| `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID` | Template newsletter EmailJS | `<votre vrai ID>` |

> **IMPORTANT** : Ces valeurs doivent être configurées en tant que **GitHub Secrets** et passées au job `build` via `--build-arg`. Elles sont actuellement des placeholders (`votre_public_key_ici`).

### 7.2. Variables runtime du container

| Variable | Rôle | Valeur |
|----------|------|--------|
| `NODE_ENV` | Mode d'exécution | `production` |

> C'est la seule variable passée au container via `compose.yaml`. Nginx n'en a pas besoin, mais elle est inoffensive.

### 7.3. Variables à supprimer du `.env`

Ces variables étaient liées à la gestion SSL par Certbot et sont **inutiles avec Cloudflare Flexible** :

```env
# À SUPPRIMER :
MAIN_DOMAIN=kobecorporation.com
SUBDOMAINS=www.kobecorporation.com,ben-djibril.kobecorporation.com
CERTBOT_EMAIL=contact@kobecorporation.com
```

### 7.4. Fichier `.env` recommandé pour la production

```env
# ==========================================
# Variables d'environnement — KOBE Corporation (Production)
# ==========================================

NODE_ENV=production
VITE_APP_NAME=KOBE Corporation
VITE_APP_URL=https://kobecorporation.com

# Informations de l'entreprise
VITE_COMPANY_NAME=KOBE Corporation
VITE_COMPANY_SLOGAN=Build Your Own Legacy
VITE_COMPANY_EMAIL=contact@kobecorporation.com
VITE_COMPANY_PHONE=+237-655-938-501
VITE_COMPANY_ADDRESS=Carrefour Belle Mere, Yaounde, Cameroun

# EmailJS (mettre les VRAIES clés)
VITE_EMAILJS_PUBLIC_KEY=<VOTRE_CLE_PUBLIQUE>
VITE_EMAILJS_SERVICE_ID=<VOTRE_SERVICE_ID>
VITE_EMAILJS_CONTACT_TEMPLATE_ID=<VOTRE_TEMPLATE_CONTACT>
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=<VOTRE_TEMPLATE_NEWSLETTER>

VITE_CONTACT_EMAIL=contact@kobecorporation.com

# Réseaux sociaux
VITE_SOCIAL_WHATSAPP=https://whatsapp.com/channel/0029VbByklp7oQhjSR9w482f
VITE_SOCIAL_FACEBOOK=https://www.facebook.com/share/14cRYHeBKCY/
VITE_SOCIAL_LINKEDIN=https://www.linkedin.com/company/kobe-corporation/
VITE_SOCIAL_INSTAGRAM=https://www.instagram.com/kobecorporation?igsh=MWVyZWs0eGk3MnVwNA==
```

### 7.5. GitHub Secrets requis

| Secret | Rôle |
|--------|------|
| `DOCKERHUB_USERNAME` | Nom d'utilisateur Docker Hub |
| `DOCKERHUB_PASSWORD` | Mot de passe / token Docker Hub |
| `VPS_HOST` | IP ou hostname du VPS |
| `VPS_USERNAME` | Utilisateur SSH sur le VPS |
| `VPS_SSH_KEY` | Clé privée SSH |
| `VPS_PORT` | Port SSH (défaut : 22) |
| `GITHUB_TOKEN` | Fourni automatiquement par GitHub Actions |

---

## 8. CI/CD — Workflow GitHub Actions simplifié

### 8.1. Problèmes du workflow actuel

1. **~1585 lignes** de code pour un déploiement de site statique — trop complexe
2. **Copie des sources sur le VPS via rsync** puis pull de l'image → contradictoire
3. **Logique SSL/Certbot/Let's Encrypt** dans le deploy → inutile avec Cloudflare
4. **Workarounds buildx** (`activity` file, nettoyage contextes) → fragile
5. **SSH config recréée dans chaque step** → code dupliqué
6. **Le step deploy rebuild le compose.yaml avec `--build`** → inutile puisque l'image est sur Docker Hub

### 8.2. Workflow cible simplifié

Le flow correct est :

```
push main → tags → build image → push Docker Hub → test → SSH VPS → pull + up
```

Voici la version simplifiée recommandée du workflow. Elle conserve la même structure de jobs mais élimine tout le code superflu :

```yaml
name: 🚀 KOBE Corporation CI/CD

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write
  packages: write

env:
  DOCKER_IMAGE: azerty78/kobecorporation-web

jobs:
  # ==========================================
  # JOB 1: Build & Push Docker Image
  # ==========================================
  build:
    name: 🔨 Build & Push
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: 🔐 Login Docker Hub
        run: echo "${{ secrets.DOCKERHUB_PASSWORD }}" | docker login -u "${{ secrets.DOCKERHUB_USERNAME }}" --password-stdin

      - name: 📋 Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.DOCKER_IMAGE }}
          tags: |
            type=ref,event=branch
            type=sha,prefix=${{ github.ref_name }}-
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master' }}
            type=ref,event=pr

      - name: 📄 Load .env variables
        id: env
        run: |
          if [ -f "setup-front/.env" ]; then
            get_var() { grep -E "^$1=" setup-front/.env | sed "s/^$1=//" | tr -d "'" | tr -d '"' | head -1; }
            echo "VITE_EMAILJS_PUBLIC_KEY=$(get_var VITE_EMAILJS_PUBLIC_KEY)" >> $GITHUB_ENV
            echo "VITE_EMAILJS_SERVICE_ID=$(get_var VITE_EMAILJS_SERVICE_ID)" >> $GITHUB_ENV
            echo "VITE_EMAILJS_CONTACT_TEMPLATE_ID=$(get_var VITE_EMAILJS_CONTACT_TEMPLATE_ID)" >> $GITHUB_ENV
            echo "VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=$(get_var VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID)" >> $GITHUB_ENV
          fi

      - name: 🔨 Build & Push
        run: |
          TAGS="${{ steps.meta.outputs.tags }}"
          TAG_ARGS=""
          for tag in $TAGS; do
            if [ -n "$tag" ] && echo "$tag" | grep -qE '^[^:]+:[^:]+$'; then
              TAG_ARGS="$TAG_ARGS --tag $tag"
            fi
          done
          [ -z "$TAG_ARGS" ] && TAG_ARGS="--tag ${{ env.DOCKER_IMAGE }}:latest"

          docker build \
            --pull \
            --file setup-front/Dockerfile \
            $TAG_ARGS \
            --build-arg VITE_EMAILJS_PUBLIC_KEY="${VITE_EMAILJS_PUBLIC_KEY}" \
            --build-arg VITE_EMAILJS_SERVICE_ID="${VITE_EMAILJS_SERVICE_ID}" \
            --build-arg VITE_EMAILJS_CONTACT_TEMPLATE_ID="${VITE_EMAILJS_CONTACT_TEMPLATE_ID}" \
            --build-arg VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID="${VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID}" \
            .

          if [ "${{ github.event_name }}" != "pull_request" ]; then
            for tag in $TAGS; do
              [ -n "$tag" ] && echo "$tag" | grep -qE '^[^:]+:[^:]+$' && docker push "$tag" || true
            done
          fi

  # ==========================================
  # JOB 2: Test
  # ==========================================
  test:
    name: 🧪 Test
    runs-on: ubuntu-latest
    needs: build
    if: needs.build.result == 'success'

    steps:
      - name: 🔐 Login Docker Hub
        run: echo "${{ secrets.DOCKERHUB_PASSWORD }}" | docker login -u "${{ secrets.DOCKERHUB_USERNAME }}" --password-stdin

      - name: 🧪 Test container
        run: |
          docker pull ${{ env.DOCKER_IMAGE }}:latest
          docker run -d --name test-kobe -p 8080:80 ${{ env.DOCKER_IMAGE }}:latest
          sleep 5
          curl -f http://localhost:8080 || exit 1
          echo "✅ Container test passed"
          docker stop test-kobe && docker rm test-kobe

  # ==========================================
  # JOB 3: Deploy to VPS
  # ==========================================
  deploy:
    name: 🚀 Deploy
    runs-on: ubuntu-latest
    needs: [build, test]
    if: >
      github.event_name != 'pull_request' &&
      (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master') &&
      needs.build.result == 'success' &&
      needs.test.result == 'success'

    steps:
      - uses: actions/checkout@v4
        with:
          sparse-checkout: |
            setup-front/compose.yaml
            setup-kobe-proxy/conf.d

      - name: 🔑 Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.VPS_SSH_KEY }}

      - name: 🔧 Configure SSH
        run: |
          mkdir -p ~/.ssh
          cat > ~/.ssh/config << EOF
          Host vps
            HostName ${{ secrets.VPS_HOST }}
            User ${{ secrets.VPS_USERNAME }}
            Port ${{ secrets.VPS_PORT || 22 }}
            StrictHostKeyChecking no
            UserKnownHostsFile=/dev/null
            ServerAliveInterval 30
            ServerAliveCountMax 60
            TCPKeepAlive yes
          EOF
          chmod 600 ~/.ssh/config

      - name: 📦 Copy config files to VPS
        run: |
          # Copier compose.yaml
          ssh vps "mkdir -p ~/kobe-corporation/setup-front"
          scp setup-front/compose.yaml vps:~/kobe-corporation/setup-front/compose.yaml

          # Copier les configs Nginx du reverse proxy
          ssh vps "mkdir -p ~/kobe-corporation/setup-kobe-proxy/conf.d"
          scp setup-kobe-proxy/conf.d/*.conf vps:~/kobe-corporation/setup-kobe-proxy/conf.d/ || true

      - name: 🔑 Docker Login on VPS
        run: |
          ssh vps "echo '${{ secrets.DOCKERHUB_PASSWORD }}' | docker login -u '${{ secrets.DOCKERHUB_USERNAME }}' --password-stdin"

      - name: 🐳 Pull & Deploy
        run: |
          ssh vps << 'DEPLOY'
          set -e

          # Réseau Docker
          docker network inspect kobecorp-network &>/dev/null || docker network create kobecorp-network

          cd ~/kobe-corporation/setup-front

          # Pull la dernière image et (re)démarrer
          docker compose pull
          docker compose up -d --force-recreate

          sleep 10

          # Vérification
          if docker compose ps | grep -q "Up\|running"; then
            echo "✅ Container déployé avec succès"
            docker ps --filter name=kobecorporation-web --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
          else
            echo "❌ Erreur de déploiement"
            docker compose logs --tail=50
            exit 1
          fi
          DEPLOY

      - name: 🔄 Update reverse proxy
        continue-on-error: true
        run: |
          ssh vps << 'PROXY'
          set -e
          NGINX_CONTAINER="blogpress-nginx"
          KOBE_CONF_DIR="$HOME/kobe-corporation/setup-kobe-proxy"

          # Connecter blogpress-nginx au réseau si nécessaire
          docker network connect kobecorp-network $NGINX_CONTAINER 2>/dev/null || true

          # Copier les configs dans le container Nginx
          for conf in "$KOBE_CONF_DIR/conf.d/"*.conf; do
            [ -f "$conf" ] && docker cp "$conf" "$NGINX_CONTAINER:/etc/nginx/conf.d/"
          done

          # Test et reload
          if docker exec $NGINX_CONTAINER nginx -t 2>/dev/null; then
            docker exec $NGINX_CONTAINER nginx -s reload
            echo "✅ Reverse proxy mis à jour"
          else
            echo "⚠️ Config Nginx invalide — rollback"
            docker exec $NGINX_CONTAINER nginx -t
          fi
          PROXY

      - name: 🎉 Summary
        run: |
          echo "🎉 Déploiement terminé !"
          echo "📦 Image: ${{ env.DOCKER_IMAGE }}:latest"
          echo "🌐 https://kobecorporation.com"
          echo "🌐 https://ben-djibril.kobecorporation.com"
          echo "🌐 https://pricing.kobecorporation.com"
```

### 8.3. Ce qui change par rapport au workflow actuel

| Aspect | Avant | Après |
|--------|-------|-------|
| Lignes | ~1585 | ~150 |
| rsync de `src/`, `public/`, `package.json` | Oui (inutile) | Non — seul `compose.yaml` + configs Nginx |
| Build sur le VPS | `docker compose up --build` | `docker compose pull` (image pré-construite) |
| SSL/Certbot steps | ~250 lignes | Supprimé (Cloudflare gère) |
| Workarounds buildx | 3 steps | Supprimé (build standard) |
| SSH config dupliquée | 6 fois | 1 seule fois |
| Docker login VPS | Dans un heredoc (broken) | Step SSH dédié |

---

## 9. Checklist de déploiement

### 9.1. Prérequis (une seule fois)

```bash
# 1. Sur le VPS — Créer le réseau Docker partagé
docker network create kobecorp-network

# 2. Sur le VPS — Connecter blogpress-nginx au réseau
docker network connect kobecorp-network blogpress-nginx

# 3. Sur le VPS — Créer le répertoire de déploiement
mkdir -p ~/kobe-corporation/setup-front
mkdir -p ~/kobe-corporation/setup-kobe-proxy/conf.d

# 4. Sur GitHub — Configurer les secrets (Settings → Secrets)
#    DOCKERHUB_USERNAME, DOCKERHUB_PASSWORD
#    VPS_HOST, VPS_USERNAME, VPS_SSH_KEY, VPS_PORT

# 5. Sur Cloudflare — Configurer les DNS (A records)
#    kobecorporation.com       → IP du VPS (Proxied ☁️)
#    www.kobecorporation.com   → IP du VPS (Proxied ☁️)
#    ben-djibril.kobecorporation.com → IP du VPS (Proxied ☁️)
#    pricing.kobecorporation.com     → IP du VPS (Proxied ☁️)

# 6. Sur Cloudflare — SSL/TLS → mode "Flexible"
```

### 9.2. Premier déploiement (manuel)

```bash
# 1. Copier compose.yaml sur le VPS
scp setup-front/compose.yaml user@vps:~/kobe-corporation/setup-front/

# 2. Copier les configs Nginx
scp setup-kobe-proxy/conf.d/*.conf user@vps:~/kobe-corporation/setup-kobe-proxy/conf.d/

# 3. Sur le VPS — Docker login
docker login -u azerty78

# 4. Sur le VPS — Déployer
cd ~/kobe-corporation/setup-front
docker compose pull
docker compose up -d

# 5. Sur le VPS — Copier les configs dans blogpress-nginx
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/

# 6. Sur le VPS — Tester et recharger Nginx
docker exec blogpress-nginx nginx -t
docker exec blogpress-nginx nginx -s reload

# 7. Vérifier
curl -I http://kobecorporation.com
docker ps --filter name=kobecorporation-web
```

### 9.3. Déploiements suivants (automatique via CI/CD)

Chaque `git push main` déclenche automatiquement :

1. Build de l'image Docker sur GitHub Actions
2. Push vers Docker Hub (`azerty78/kobecorporation-web:latest`)
3. Test du container
4. SSH vers VPS → `docker compose pull` + `docker compose up -d`
5. Mise à jour des configs Nginx dans blogpress-nginx

---

## 10. Dépannage

### Container ne démarre pas

```bash
# Voir les logs
cd ~/kobe-corporation/setup-front
docker compose logs -f

# Vérifier le status
docker compose ps

# Recréer from scratch
docker compose down
docker compose pull
docker compose up -d
```

### Le site ne répond pas

```bash
# 1. Vérifier que le container tourne
docker ps --filter name=kobecorporation-web

# 2. Tester la connectivité directe
docker exec kobecorporation-web wget -q -O- http://localhost/ | head

# 3. Vérifier le réseau
docker network inspect kobecorp-network

# 4. Vérifier que blogpress-nginx voit le container
docker exec blogpress-nginx ping -c 1 kobecorporation-web

# 5. Tester la config Nginx
docker exec blogpress-nginx nginx -t
docker exec blogpress-nginx cat /etc/nginx/conf.d/kobecorporation.com.conf
```

### Erreur SSH "Broken pipe" dans le CI/CD

Les options `ServerAliveInterval=30` et `ServerAliveCountMax=60` dans la config SSH empêchent le timeout. Si le problème persiste :

```bash
# Augmenter les valeurs dans ~/.ssh/config
ServerAliveInterval 15
ServerAliveCountMax 120
```

### Cloudflare affiche une erreur 502/521

- **502** : Le container ne répond pas sur le port 80. Vérifier que le container tourne et que le réseau est correct.
- **521** : Le VPS ne répond pas du tout sur le port 80. Vérifier que blogpress-nginx est en marche et écoute sur le port 80.

```bash
# Sur le VPS
docker ps --filter name=blogpress-nginx
ss -tlnp | grep :80
```

### Mise à jour manuelle rapide

```bash
ssh user@vps "cd ~/kobe-corporation/setup-front && docker compose pull && docker compose up -d --force-recreate"
```

---

> **Ce document est la source de vérité pour le déploiement.** Toute modification de l'infrastructure doit être reflétée ici.
