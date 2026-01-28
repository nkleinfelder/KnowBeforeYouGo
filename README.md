# Know Before You Go

## About

**Know Before You Go** is a web application that helps users prepare for traveling to different countries. It provides comprehensive destination information including cultural norms, daily life tips, health advice, language guides, payment methods, transportation options, and safety information. Users can match with and compare destinations and find the most important information about the country.
International Offices of Universities can mantain and update the information for each country based on feedback of students in a Content Management System (CMS).
**Deployed Prod Branch:** [Know Before You Go]([https://example.com](https://know-before-you-go.simonbiel.com))

## License

This project is licensed under the [MIT License](LICENSE).

## Tech Stack & Core Libraries

### Frontend

- **[Next.js](https://nextjs.org/)** (v16) - React framework with App Router
- **[React](https://react.dev/)** (v19) - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** / **[shadcn/ui](https://ui.shadcn.com/)** - Accessible, unstyled UI primitives
- **[Recharts](https://recharts.org/)** - Charting library

### Backend & Data

- **[PayloadCMS](https://payloadcms.com/)** (v3) - Headless Content Management System
- **[tRPC](https://trpc.io/)** (v11) - End-to-end typesafe APIs
- **[TanStack Query](https://tanstack.com/query/)** - Data fetching & caching
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Database

- **PostgreSQL** - Primary database

## Code Quality

### Linting

- **[ESLint](https://eslint.org/)** (v9) - JavaScript/TypeScript linting
- **eslint-config-next** - Next.js specific ESLint rules
- **eslint-plugin-tailwindcss** - Tailwind CSS class linting

### Formatting

- **[Prettier](https://prettier.io/)** - Code formatter
- **prettier-plugin-tailwindcss** - Automatic Tailwind class sorting

### Git Hooks

- **[Husky](https://typicode.github.io/husky/)** - Git hooks management
- **[lint-staged](https://github.com/lint-staged/lint-staged)** - Run linters on staged files
- **[Commitlint](https://commitlint.js.org/)** - Enforce conventional commit messages

## Folder Structure

```
KnowBeforeYouGo/
├── public/                     # Static assets
│   └── images/                 # Image assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/              # Main application routes
│   │   │   ├── _components/    # Page-specific components
│   │   │   ├── compare/        # Destination comparison page
│   │   │   ├── destination/    # Destination detail pages
│   │   │   │   └── [slug]/     # Dynamic destination routes
│   │   │   ├── match-finder/   # Match finder feature
│   │   │   └── data-privacy/   # Legal pages
│   │   ├── (payload)/          # PayloadCMS admin routes
│   │   │   ├── admin/          # CMS admin dashboard
│   │   │   └── api/            # CMS API routes
│   │   └── api/                # general API routes handled by tRPC
│   │       └── trpc/           
│   ├── collections/            # PayloadCMS collection definitions
│   │   ├── categories/         # Category collections
│   │   └── custom-fields/      # Custom field definitions
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Base UI components (shadcn/ui)
│   │   └── charts/             # Chart components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions & types
│   └── server/                 # Server-side code
│       └── routers/            # tRPC routers
```

## Setup Local Development

### Prerequisites

#### Docker

If you don't have `docker` installed, follow its [installation guide](https://docs.docker.com/desktop/).

#### PNPM

If you don't have `pnpm` installed, follow its [installation guide](https://pnpm.io/installation).

Example ways to install `pnpm`:

- (MacOS) `brew install pnpm`
- Using `npm`: `npm install -g pnpm`

#### Database

Create postgres migration:

##### Development

> Postgres has to be running for this. See [Starting App](#starting-app)

- for dev:

```
pnpm run payload migrate
pnpm run payload migrate:create
```

- for prod:

```
NODE_ENV=production pnpm run payload migrate
NODE_ENV=production pnpm run payload migrate:create
```

- test prod:

```
  NODE_ENV=production pnpm run build
  NODE_ENV=production pnpm run start
```

#### Environment Variables

Define your environment variables in `.env` as described in `.example.env`

Use the following commands to generate secrets:

- `PAYLOAD_SECRET`: `openssl rand -hex 32`
- `DATABASE_AUTH_TOKEN`: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Starting App

#### Starting Postgres

Run `docker compose -f dev.docker-compose.yml up`

#### Starting Frontend

1. Run `pnpm install`
2. Run `pnpm dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to get to the PayloadCMS admin dashboard

## Development Conventions

- Pre-Commit Hooks with Husky
  - ESLint -> Linting
  - Prettier -> Formatting
  - Commitlint -> Commit Message Validation

### Commit Message Conventions

Following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification, we use the following types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Branch Naming Conventions

Following the [Conventional Branch](https://conventional-branch.github.io/#summary) specification, we use the following branch names/prefixes:

- `main`: The main development branch
- `feat/`: A new feature
- `fix/`: A bug fix
- `hotfix/`: A hotfix
- `release/`: For branches preparing a release
- `chore/`: For non-code tasks like dependency, docs updates

Examples:

- `feat/new-sidebar`
- `fix/broken-link`
- `hotfix/broken-link`
- `release/v1.0.0`
- `chore/update-deps`
