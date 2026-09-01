import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const parkingSpaces = sqliteTable(
  'parking_spaces',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    dailyRateCents: integer('daily_rate_cents').notNull(),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [uniqueIndex('idx_parking_spaces_name').on(table.name)],
);

export const bookings = sqliteTable(
  'bookings',
  {
    id: text('id').primaryKey(),
    publicReference: text('public_reference').notNull(),
    parkingSpaceId: text('parking_space_id')
      .notNull()
      .references(() => parkingSpaces.id, { onDelete: 'restrict' }),
    guestName: text('guest_name').notNull(),
    guestEmail: text('guest_email').notNull(),
    vehiclePlate: text('vehicle_plate'),
    startsOn: text('starts_on').notNull(),
    endsOn: text('ends_on').notNull(),
    timezone: text('timezone').notNull().default('Europe/Zurich'),
    status: text('status', {
      enum: ['held', 'confirmed', 'cancelled', 'expired', 'refunded'],
    })
      .notNull()
      .default('held'),
    amountTotalCents: integer('amount_total_cents').notNull(),
    currency: text('currency').notNull().default('chf'),
    stripeCheckoutSessionId: text('stripe_checkout_session_id'),
    stripePaymentIntentId: text('stripe_payment_intent_id'),
    cancellationPolicyVersion: text('cancellation_policy_version').notNull(),
    holdExpiresAt: integer('hold_expires_at', { mode: 'timestamp_ms' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    uniqueIndex('idx_bookings_public_reference').on(table.publicReference),
    uniqueIndex('idx_bookings_checkout_session').on(
      table.stripeCheckoutSessionId,
    ),
    uniqueIndex('idx_bookings_payment_intent').on(table.stripePaymentIntentId),
    index('idx_bookings_space_dates_status').on(
      table.parkingSpaceId,
      table.startsOn,
      table.endsOn,
      table.status,
    ),
    index('idx_bookings_hold_expiry').on(table.status, table.holdExpiresAt),
  ],
);

export const paymentEvents = sqliteTable(
  'payment_events',
  {
    id: text('id').primaryKey(),
    stripeEventId: text('stripe_event_id').notNull(),
    eventType: text('event_type').notNull(),
    bookingId: text('booking_id').references(() => bookings.id, {
      onDelete: 'set null',
    }),
    processedAt: integer('processed_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    uniqueIndex('idx_payment_events_stripe_event').on(table.stripeEventId),
  ],
);

export const bookingEvents = sqliteTable(
  'booking_events',
  {
    id: text('id').primaryKey(),
    bookingId: text('booking_id')
      .notNull()
      .references(() => bookings.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    actor: text('actor').notNull(),
    details: text('details'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    index('idx_booking_events_booking_created').on(
      table.bookingId,
      table.createdAt,
    ),
  ],
);
