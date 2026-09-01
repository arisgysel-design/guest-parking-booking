# Starter task: make calendar dates safe over time

This is the recommended first contribution for a developer learning to work with
Codex. It is small, real, testable, and does not require secrets or external systems.

## Problem

`components/booking-planner.tsx` contains a fixed September 2026 initial range and
currently allows past dates. The prototype will become confusing as time passes.

## Required outcome

- Default to a deterministic future range derived from today's local date.
- Prevent selecting dates before today.
- Keep arrival inclusive and departure exclusive.
- Put date-default logic in a focused pure module under `lib/booking/`, not inside
  the UI component.
- Add tests for a normal date, month-end, and year-end behavior.
- Keep the task frontend-only: no D1, Stripe, email, DNS, or deployment work.

## Acceptance gate

1. `npm run verify` passes.
2. `npm run dev` shows a selectable future default range.
3. A past date cannot be selected.
4. The pull request explains the date and timezone assumptions.

## Suggested Codex prompt

> Read `AGENTS.md`, `docs/CURRENT_STATE.md`, and `docs/NEXT_TASK.md`. Implement only
> the starter calendar task. Inspect the current calendar component and tests first,
> keep date logic pure and testable, run `npm run verify`, and report any assumptions.
