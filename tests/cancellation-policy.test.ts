import { describe, expect, it } from 'vitest';

import { quoteCancellation } from '@/lib/booking/cancellation-policy';

const startsAt = new Date('2026-09-20T12:00:00.000Z');

describe('cancellation policy', () => {
  it('refunds 100% at least seven full days before arrival', () => {
    expect(
      quoteCancellation({
        paidAmountCents: 4_800,
        startsAt,
        cancelledAt: new Date('2026-09-13T12:00:00.000Z'),
      }),
    ).toMatchObject({ refundPercentage: 100, refundAmountCents: 4_800 });
  });

  it('refunds 50% between two and seven days before arrival', () => {
    expect(
      quoteCancellation({
        paidAmountCents: 4_801,
        startsAt,
        cancelledAt: new Date('2026-09-16T12:00:00.000Z'),
      }),
    ).toMatchObject({ refundPercentage: 50, refundAmountCents: 2_400 });
  });

  it('does not refund within 48 hours', () => {
    expect(
      quoteCancellation({
        paidAmountCents: 4_800,
        startsAt,
        cancelledAt: new Date('2026-09-19T12:00:01.000Z'),
      }),
    ).toMatchObject({ refundPercentage: 0, reason: 'non_refundable' });
  });

  it('does not refund after the booking has started', () => {
    expect(
      quoteCancellation({
        paidAmountCents: 4_800,
        startsAt,
        cancelledAt: new Date('2026-09-20T12:00:00.000Z'),
      }),
    ).toMatchObject({ refundPercentage: 0, reason: 'already_started' });
  });

  it('rejects invalid amounts', () => {
    expect(() =>
      quoteCancellation({
        paidAmountCents: -1,
        startsAt,
        cancelledAt: new Date(),
      }),
    ).toThrow(RangeError);
  });
});
