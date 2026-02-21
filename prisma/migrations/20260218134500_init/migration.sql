-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."TutorStatus" AS ENUM ('pending', 'approved', 'denied', 'suspended');

-- CreateEnum
CREATE TYPE "public"."ContactMethod" AS ENUM ('whatsapp', 'email');

-- CreateEnum
CREATE TYPE "public"."OfferingModality" AS ENUM ('online', 'in_person', 'both');

-- CreateTable
CREATE TABLE "public"."Tutor" (
    "tutor_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferred_contact_method" "public"."ContactMethod" NOT NULL,
    "status" "public"."TutorStatus" NOT NULL DEFAULT 'pending',
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("tutor_id")
);

-- CreateTable
CREATE TABLE "public"."Subject" (
    "subject_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "public"."Offering" (
    "offering_id" SERIAL NOT NULL,
    "tutor_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "grades" TEXT[],
    "modality" "public"."OfferingModality" NOT NULL,
    "location_area" TEXT,
    "price_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "availability_tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offering_pkey" PRIMARY KEY ("offering_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_phone_key" ON "public"."Tutor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "public"."Subject"("name");

-- CreateIndex
CREATE INDEX "Offering_tutor_id_idx" ON "public"."Offering"("tutor_id");

-- CreateIndex
CREATE INDEX "Offering_subject_id_idx" ON "public"."Offering"("subject_id");

-- CreateIndex
CREATE INDEX "Offering_price_cents_idx" ON "public"."Offering"("price_cents");

-- CreateIndex
CREATE INDEX "Offering_modality_idx" ON "public"."Offering"("modality");

-- AddForeignKey
ALTER TABLE "public"."Offering" ADD CONSTRAINT "Offering_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "public"."Tutor"("tutor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Offering" ADD CONSTRAINT "Offering_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Enforce location requirement for in_person/both modalities
ALTER TABLE "public"."Offering"
ADD CONSTRAINT "Offering_modality_location_check" CHECK (
  (modality = 'online' AND location_area IS NULL) OR
  (modality IN ('in_person', 'both') AND location_area IS NOT NULL)
);
