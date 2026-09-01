CREATE TABLE `booking_events` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`type` text NOT NULL,
	`actor` text NOT NULL,
	`details` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_booking_events_booking_created` ON `booking_events` (`booking_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`public_reference` text NOT NULL,
	`parking_space_id` text NOT NULL,
	`guest_name` text NOT NULL,
	`guest_email` text NOT NULL,
	`vehicle_plate` text,
	`starts_on` text NOT NULL,
	`ends_on` text NOT NULL,
	`timezone` text DEFAULT 'Europe/Zurich' NOT NULL,
	`status` text DEFAULT 'held' NOT NULL,
	`amount_total_cents` integer NOT NULL,
	`currency` text DEFAULT 'chf' NOT NULL,
	`stripe_checkout_session_id` text,
	`stripe_payment_intent_id` text,
	`cancellation_policy_version` text NOT NULL,
	`hold_expires_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`parking_space_id`) REFERENCES `parking_spaces`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_bookings_public_reference` ON `bookings` (`public_reference`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_bookings_checkout_session` ON `bookings` (`stripe_checkout_session_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_bookings_payment_intent` ON `bookings` (`stripe_payment_intent_id`);--> statement-breakpoint
CREATE INDEX `idx_bookings_space_dates_status` ON `bookings` (`parking_space_id`,`starts_on`,`ends_on`,`status`);--> statement-breakpoint
CREATE INDEX `idx_bookings_hold_expiry` ON `bookings` (`status`,`hold_expires_at`);--> statement-breakpoint
CREATE TABLE `parking_spaces` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`daily_rate_cents` integer NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_parking_spaces_name` ON `parking_spaces` (`name`);--> statement-breakpoint
CREATE TABLE `payment_events` (
	`id` text PRIMARY KEY NOT NULL,
	`stripe_event_id` text NOT NULL,
	`event_type` text NOT NULL,
	`booking_id` text,
	`processed_at` integer NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payment_events_stripe_event` ON `payment_events` (`stripe_event_id`);