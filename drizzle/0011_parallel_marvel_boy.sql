ALTER TABLE "account" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;
ALTER TABLE "appointment" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;
ALTER TABLE "appointment" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;
ALTER TABLE "doctor" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;
ALTER TABLE "medicalinfo" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;
ALTER TABLE "userinfo" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;