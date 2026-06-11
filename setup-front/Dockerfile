# Stage 1: Build de l'application
# (Pas de directive syntax= pour éviter d'appeler Docker Hub sur le serveur de déploiement)
ARG NODE_VERSION=22.13.1

# Variables d'environnement pour le build (Vite les nécessite au moment du build)
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_CONTACT_TEMPLATE_ID
ARG VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (y compris devDependencies pour le build)
# Configurer npm pour des timeouts plus longs et retry automatique
RUN npm ci --legacy-peer-deps --no-audit

# Copier le code source
COPY . .

# Définir les variables d'environnement pour le build
ENV VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}
ENV VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}
ENV VITE_EMAILJS_CONTACT_TEMPLATE_ID=${VITE_EMAILJS_CONTACT_TEMPLATE_ID}
ENV VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=${VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID}

# Définir NODE_ENV explicitement pour garantir un build de production identique
ENV NODE_ENV=production

# Nettoyer les caches pour garantir un build propre et identique
RUN rm -rf node_modules/.cache .vite dist || true

# Construire l'application pour la production
# Utiliser --mode production pour garantir un build identique à la production locale
RUN npm run build -- --mode production

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
