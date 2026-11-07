# Stage 1: Build de l'application
# bookworm-slim (pas Alpine) : Playwright/Chromium nécessite une base Debian.
ARG NODE_VERSION=22.13.1

# Variables d'environnement pour le build (Vite les nécessite au moment du build)
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_CONTACT_TEMPLATE_ID
ARG VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID

FROM node:${NODE_VERSION}-bookworm-slim AS builder

WORKDIR /app

# Dépendances système minimales pour npm + Chromium Playwright
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (y compris devDependencies pour le build + prerender)
# postinstall installe Chromium Playwright
RUN npm ci --legacy-peer-deps --no-audit

# Dépendances OS + binaire Chromium (Playwright prerender)
RUN npx playwright install-deps chromium \
  && npx playwright install chromium

# Copier le code source
COPY . .

# Définir les variables d'environnement pour le build
ENV VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}
ENV VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}
ENV VITE_EMAILJS_CONTACT_TEMPLATE_ID=${VITE_EMAILJS_CONTACT_TEMPLATE_ID}
ENV VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=${VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID}

# NODE_ENV=production après npm ci pour ne pas exclure les devDependencies
ENV NODE_ENV=production

# Nettoyer les caches pour garantir un build propre et identique
RUN rm -rf node_modules/.cache .vite dist || true

# tsc + sitemap + images WebP/AVIF + vite (mode production) + prerender Playwright
# (ne pas utiliser `npm run build -- --mode production` : les args iraient au mauvais binaire)
RUN npx tsc -b \
  && node scripts/generate-sitemap.mjs \
  && node scripts/optimize-images.mjs \
  && npx vite build --mode production \
  && node scripts/prerender.mjs

# Stage 2: Serveur nginx pour la production
FROM nginx:alpine AS production

# Copier la configuration nginx personnalisée
COPY setup-front/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
