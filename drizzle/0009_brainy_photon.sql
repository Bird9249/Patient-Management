ALTER TABLE "appointment" ADD COLUMN "reason_of_scheduled" text;--> statement-breakpoint
ALTER TABLE "appointment" ADD COLUMN "reason_of_cancelled" text;--> statement-breakpoint
ALTER TABLE "appointment" ADD COLUMN "updated_at" timestamp (6) with time zone;