# Proxim Learning Network (PLN)

PLN is a small Next.js app for browsing and booking tutors. This README is written for contributors who are new to Next.js.

## Getting Started

### Prerequisites

- Node.js (LTS recommended, v18+)
- npm (comes with Node)
- Finch CLI (for local PostgreSQL container)

### Install dependencies

```bash
npm install
```

### First-time setup

Install dependencies, apply migrations, and seed local data:

```bash
npm run setup
```

Or do setup + start dev server in one command:

```bash
npm run dev:setup
```

### Database seed (local test data)

After migrations are applied, seed test tutors and offerings into Postgres:

```bash
npm run db:seed
```

### Local DB helpers (Finch)

```bash
npm run db:start
npm run db:status
npm run db:logs
npm run db:stop
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

## API Prototype (Design Implementation)

This repo includes a Prisma + PostgreSQL backend under `app/api` that implements the tutor directory design.

### Endpoints

- `POST /api/auth/login`
  - Admin: `{ "role": "admin", "password": "..." }`
  - Tutor: `{ "role": "tutor", "phone": "...", "code": "000000" }` (stub OTP)
- `POST /api/tutors` (idempotent by phone)
- `GET /api/tutors` (admin only)
- `GET /api/tutors/{tutor_id}` (approved tutors only)
- `PATCH /api/tutors/{tutor_id}` (owner or admin)
- `DELETE /api/tutors/{tutor_id}` (admin only)
- `POST /api/tutors/{tutor_id}/offerings` (owner or admin)
- `PATCH /api/offerings/{offering_id}` (owner or admin)
- `DELETE /api/offerings/{offering_id}` (owner or admin)
- `PATCH /api/tutors/{tutor_id}/status` (admin only; approved/denied/suspended)
- `GET /api/search/tutors`
  - Query params: `subject`, `grade`, `location_area`, `max_price_cents`, `availability`, `modality`

### Auth model in prototype

- Use `x-role: admin` for admin routes.
- Use `x-tutor-phone: <digits>` for tutor-owner routes.
- This is a lightweight development stub, not production auth.

### Design validation notes

- Phone uniqueness/idempotent registration is enforced in the store layer.
- Search returns approved tutors only and stays independent from notifications.
- Status-change notifications use a retrying queue with at-least-once delivery semantics.
- Storage is backed by PostgreSQL via Prisma.
