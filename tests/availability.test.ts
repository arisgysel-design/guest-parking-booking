import { describe, expect, it } from 'vitest';

import {
  intervalsOverlap,
  isParkingSpaceAvailable,
  isValidDateInterval,
} from '@/lib/booking/availability';

describe('parking availability', () => {
  it('allows two bookings that touch on the departure date', () => {
    expect(
      intervalsOverlap(
        { startsOn: '2026-09-01', endsOn: '2026-09-03' },
        { startsOn: '2026-09-03', endsOn: '2026-09-05' },
      ),
    ).toBe(false);
  });

  it('detects an overlap inside an existing booking', () => {
    expect(
      intervalsOverlap(
        { startsOn: '2026-09-02', endsOn: '2026-09-04' },
        { startsOn: '2026-09-01', endsOn: '2026-09-05' },
      ),
    ).toBe(true);
  });

  it('reports a space as unavailable when any booking overlaps', () => {
    expect(
      isParkingSpaceAvailable(
        { startsOn: '2026-09-04', endsOn: '2026-09-07' },
        [
          { startsOn: '2026-09-01', endsOn: '2026-09-03' },
          { startsOn: '2026-09-06', endsOn: '2026-09-08' },
        ],
      ),
    ).toBe(false);
  });

  it('rejects zero-length and malformed ranges', () => {
    expect(
      isValidDateInterval({ startsOn: '2026-09-01', endsOn: '2026-09-01' }),
    ).toBe(false);
    expect(
      isValidDateInterval({ startsOn: '01.09.2026', endsOn: '2026-09-02' }),
    ).toBe(false);
  });

  it('throws when overlap comparison receives an invalid range', () => {
    expect(() =>
      intervalsOverlap(
        { startsOn: '2026-09-01', endsOn: '2026-09-01' },
        { startsOn: '2026-09-02', endsOn: '2026-09-03' },
      ),
    ).toThrow(RangeError);
  });
});
