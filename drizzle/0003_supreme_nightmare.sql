ALTER TABLE "medicalinfo" RENAME COLUMN "insurance_phone" TO "insurance_number";--> statement-breakpoint
ALTER TABLE "medicalinfo" ALTER COLUMN "insurance_number" SET DATA TYPE varchar(255);