# Current implementation state

This file separates working code from the intended production architecture. Read it
before planning a change.

## Implemented and verified

- Responsive German booking-planner prototype.
- Date-range selection and hard-coded parking-space cards.
- Pure half-open interval and overlap rules in `lib/booking/availability.ts`.
- Versioned cancellation quote rules in `lib/booking/cancellation-policy.ts`.
- D1/SQLite schema and initial migration for spaces, bookings, payment events, and
  booking audit events.
- CI for formatting, lint, type checking, domain tests, build, and high-severity
  production dependency audit.

## Prepared but not connected

- `db/schema.ts`, the initial migration, and `db/index.ts` define the persistence
  foundation, but the page does not read or write D1.
- The interface describes Stripe payment and booking management, but the buttons do
  not start those workflows.

## Not implemented

- Server-side availability queries and serialized booking holds.
- Guest form validation and booking persistence.
- Stripe Checkout, signed webhook handling, refunds, and event idempotency.
- Email confirmation and signed booking-management links.
- Operator/admin workflows, observability, retention jobs, and recovery runbooks.
- Cloudflare production resources, DNS, secrets, and deployment automation.

## Deployment status

- Planned public hostname: `https://parking.justsunny.ch`.
- No DNS record or live deployment exists yet.
- Live payments and production deployment require explicit owner approval and the
  pre-live decisions listed in `README.md`.

## Source map

- Start at `app/page.tsx` and `components/booking-planner.tsx` for the working UI.
- Read `lib/booking/` and its tests for implemented business rules.
- Read `db/schema.ts` and `docs/ARCHITECTURE.md` for the planned backend boundary.
- Use `docs/NEXT_TASK.md` for the current starter contribution.

## Licensing status

The repository currently has no open-source licence. Public visibility permits
inspection and pull-request collaboration, but does not grant general reuse rights.
The owner must choose a licence before describing the project as open source.

## Known development-tool advisory

`npm audit` reports a moderate advisory in a legacy `esbuild` copy pulled only by
`drizzle-kit`. `npm audit --omit=dev` reports no production vulnerabilities, and
the current upstream dependency graph has no supported non-breaking fix. Do not use
`npm audit fix --force`; keep development servers loopback-only and revisit the
advisory when `drizzle-kit` provides a compatible upgrade path.
