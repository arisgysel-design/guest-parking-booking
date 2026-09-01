const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const CANCELLATION_POLICY_VERSION = '2026-09-v1';

export type CancellationQuote = {
  refundable: boolean;
  refundPercentage: 0 | 50 | 100;
  refundAmountCents: number;
  reason:
    | 'full_refund'
    | 'partial_refund'
    | 'non_refundable'
    | 'already_started';
  policyVersion: string;
};

/**
 * Initial policy: 100% at least 7 full days before arrival, 50% from 2 to
 * under 7 days, and no refund within 48 hours or after arrival.
 */
export function quoteCancellation(params: {
  paidAmountCents: number;
  startsAt: Date;
  cancelledAt: Date;
}): CancellationQuote {
  const { paidAmountCents, startsAt, cancelledAt } = params;

  if (!Number.isInteger(paidAmountCents) || paidAmountCents < 0) {
    throw new RangeError('paidAmountCents must be a non-negative integer');
  }

  const noticeDays = (startsAt.getTime() - cancelledAt.getTime()) / MS_PER_DAY;

  if (noticeDays <= 0) return quote(0, paidAmountCents, 'already_started');
  if (noticeDays >= 7) return quote(100, paidAmountCents, 'full_refund');
  if (noticeDays >= 2) return quote(50, paidAmountCents, 'partial_refund');
  return quote(0, paidAmountCents, 'non_refundable');
}

function quote(
  refundPercentage: 0 | 50 | 100,
  paidAmountCents: number,
  reason: CancellationQuote['reason'],
): CancellationQuote {
  return {
    refundable: refundPercentage > 0,
    refundPercentage,
    refundAmountCents: Math.floor((paidAmountCents * refundPercentage) / 100),
    reason,
    policyVersion: CANCELLATION_POLICY_VERSION,
  };
}
