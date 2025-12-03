# Know Before You Go

## Starting Development

1. Define your environment variables in `.env` as described in `.example.env`
2. Run `pnpm install`
3. Run `pnpm dev`

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
