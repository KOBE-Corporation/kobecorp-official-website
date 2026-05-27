# KOBE Corporation — Frontend

Application frontend de KOBE Corporation, développée avec React + TypeScript + Vite.

## Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- Docker (multi-stage build Node -> Nginx)

## Prérequis

- Node.js 22
- npm
- Docker (optionnel pour exécution conteneurisée)

## Installation locale

```bash
npm ci --legacy-peer-deps
```

## Commandes utiles

```bash
# développement
npm run dev

# lint
npm run lint

# build production
npm run build

# preview local du build
npm run preview
```

## Docker

### Build image

```bash
docker build -f setup-front/Dockerfile -t kobecorporation-web:local .
```

### Run image

```bash
docker run --rm -p 8080:80 kobecorporation-web:local
```

Puis ouvrir `http://localhost:8080`.

## Déploiement VPS (résumé)

Le déploiement CI/CD utilise le workflow `/.github/workflows/cicd.yml`.

Flow principal:

1. Build et tests
2. Build image Docker
3. Push image sur Docker Hub
4. Signature image (cosign)
5. Déploiement VPS via SSH:
   - `docker pull <image>`
   - `docker compose -f compose.yaml pull`
   - `docker compose -f compose.yaml up -d --force-recreate --remove-orphans`
6. Smoke test post-déploiement

Le reverse proxy Nginx est géré dans un dépôt séparé.

## Secrets GitHub Actions requis

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_PASSWORD`
- `VPS_HOST`
- `VPS_PORT` (optionnel, défaut 22)
- `VPS_USERNAME`
- `VPS_SSH_KEY`
- `VPS_DEPLOY_DIR` (optionnel)
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID`
- `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID`

## Notes

- `setup-front/.env` ne doit jamais être commité.
- Le conteneur applicatif expose uniquement le port interne `80` sur le réseau Docker.
- Documentation de déploiement détaillée: `DEPLOYMENT.md`.
