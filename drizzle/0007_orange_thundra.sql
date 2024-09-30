ALTER TABLE "appointment" ADD COLUMN "date_time" timestamp NOT NULL;
ALTER TABLE "appointment" DROP COLUMN IF EXISTS "date_time  ";