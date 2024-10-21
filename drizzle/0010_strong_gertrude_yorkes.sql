ALTER TABLE "appointment" ADD COLUMN "reason_of_Admin" text;
ALTER TABLE "appointment" DROP COLUMN IF EXISTS "reason_of_scheduled";
ALTER TABLE "appointment" DROP COLUMN IF EXISTS "reason_of_cancelled";