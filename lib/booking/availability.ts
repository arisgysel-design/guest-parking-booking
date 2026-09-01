export type BookingInterval = {
  startsOn: string;
  endsOn: string;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateInterval(interval: BookingInterval): boolean {
  return (
    ISO_DATE.test(interval.startsOn) &&
    ISO_DATE.test(interval.endsOn) &&
    interval.startsOn < interval.endsOn
  );
}

/** Date intervals are half-open: arrival is included, departure is excluded. */
export function intervalsOverlap(
  a: BookingInterval,
  b: BookingInterval,
): boolean {
  if (!isValidDateInterval(a) || !isValidDateInterval(b)) {
    throw new RangeError('Booking intervals must be valid ISO date ranges');
  }

  return a.startsOn < b.endsOn && b.startsOn < a.endsOn;
}

export function isParkingSpaceAvailable(
  requested: BookingInterval,
  blockingBookings: readonly BookingInterval[],
): boolean {
  return !blockingBookings.some((booking) =>
    intervalsOverlap(requested, booking),
  );
}
