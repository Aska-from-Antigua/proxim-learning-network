# Proxim Learning Network (PLN)

PLN is a small Next.js app for browsing and booking tutors. This README is written for contributors who are new to Next.js.

## Getting Started

### Prerequisites

- Node.js (LTS recommended, v18+)
- npm (comes with Node)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Project Structure (Quick Tour)

- `app/` — Next.js App Router pages and layouts
  - `app/(public)/` — public pages (home, tutors listing, tutor profile)
  - `app/globals.css` — global styles and design tokens (CSS variables)
- `components/public/` — UI components used by public pages
- `lib/` — shared types, enums, helpers, and data
- `public/` — static assets (e.g., placeholder avatar)

## Design & Styling Choices

- The UI uses a component library and lightweight custom styles.
- Shared colors, spacing, and sizing live in `app/globals.css` as CSS variables.
- Prefer scoped class hooks for styling over broad global overrides or CSS-in-JS.
- Reuse the existing public layout components where appropriate.

## Build

```bash
npm run build
```

## Development workflow

Formatting and linting:

```bash
npm run format
npm run format:check
npm run lint
npm run lint:fix
```

Type safety:

```bash
npm run typecheck
```

Pre-commit:

- Husky runs `lint-staged` on staged files (ESLint fix on TS/TSX, Prettier on common file types).
- Commit messages are checked with Conventional Commits (commitlint).

CI:

- On PRs and pushes to `main`: `npm run lint`, `npm run typecheck`, `npm run build`.

## Notes

- This app uses the Next.js App Router.
- Styles are intentionally lightweight and kept in `app/globals.css` with scoped class hooks.
