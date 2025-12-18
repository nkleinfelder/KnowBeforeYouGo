# Know Before You Go

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
