# Repository instructions for Codex

## Start here

1. Read `README.md`, `docs/CURRENT_STATE.md`, and `docs/NEXT_TASK.md` before editing.
2. Confirm the current branch and inspect nearby tests before changing code.
3. Keep each pull request focused on one bounded outcome.

## Current product boundary

- This is an interactive frontend prototype plus tested booking-domain rules and a
  D1 schema.
- Real availability, booking persistence, Stripe Checkout/webhooks, email,
  cancellation endpoints, and production deployment are not implemented yet.
- `https://parking.justsunny.ch` is the planned hostname only. Do not deploy,
  create DNS records, or use live credentials without explicit owner approval.

## Commands

```bash
npm ci
cp .env.example .env.local
npm run dev
npm run verify
```

`npm run verify` is the required pre-PR gate. Do not weaken formatting, lint,
types, tests, coverage, build, or the production dependency audit to make it pass.

## Responsibility boundaries

- `app/`: route-level composition only.
- `components/`: UI and interaction orchestration; do not hide booking rules here.
- `components/ui/`: only primitives that are actually used. Add components one at
  a time when a real feature needs them.
- `lib/booking/`: pure, testable booking and money/date rules.
- `db/`: D1 schema and persistence adapters.
- `docs/`: product, architecture, security, operational, and state contracts.

Prefer a focused module over adding another responsibility to
`components/booking-planner.tsx`. Keep external input validation, domain logic,
persistence, and presentation separate.

## Safety rules

- Never commit secrets, real guest data, Stripe payloads, or access credentials.
- Use Stripe test mode only. Never execute payments, refunds, migrations, DNS
  changes, or deployments without explicit owner approval.
- Do not run `npm audit fix --force` or accept major dependency upgrades as a
  shortcut. Investigate and document the impact first.
- Cancellation-policy changes require owner confirmation, a new policy version,
  boundary tests, and preserved behavior for existing bookings.
- Database changes require a generated migration and tests for concurrency,
  idempotency, and rollback-relevant behavior.

## Testing expectations

- Add behavior tests for every business-rule change.
- Cover normal behavior plus time, money, overlap, idempotency, and failure edges.
- UI changes need a reproducible manual check until browser tests are introduced.
- A pull request is ready only when `npm run verify` passes from a clean install.

## GitHub workflow

- Create a branch from current `main`; never push directly to `main`.
- Open a pull request using the repository template.
- Include the reason, verification evidence, risks, and rollback path.
- Wait for the required `quality` check and owner approval before merge.

## Code review rules

- Flag code that makes the browser, redirect URL, or client state authoritative for
  payment or booking confirmation.
- Flag overlap checks and hold creation that are not part of one serialized write.
- Flag unversioned cancellation-rule changes, unsafe money arithmetic, secrets,
  personal data, and unvalidated external input.
- Flag generated or unused UI components and new dependencies without a current
  product need.
