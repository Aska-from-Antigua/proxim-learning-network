import { PrismaClient } from '@prisma/client';
import { SEED_TUTORS, SUBJECTS } from '../lib/data/seed-tutors.js';

const prisma = new PrismaClient();

function normalizePhone(phone) {
  return phone.replace(/\D/g, '');
}

async function upsertSubjects() {
  await Promise.all(
    SUBJECTS.map((name) =>
      prisma.subject.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );
}

async function upsertTutorWithOfferings(tutor) {
  const savedTutor = await prisma.tutor.upsert({
    where: { phone: normalizePhone(tutor.phone) },
    update: {
      full_name: tutor.full_name,
      email: tutor.email,
      preferred_contact_method: tutor.preferred_contact_method,
      status: tutor.status,
      bio: tutor.bio,
    },
    create: {
      full_name: tutor.full_name,
      phone: normalizePhone(tutor.phone),
      email: tutor.email,
      preferred_contact_method: tutor.preferred_contact_method,
      status: tutor.status,
      bio: tutor.bio,
    },
  });

  await prisma.offering.deleteMany({
    where: { tutor_id: savedTutor.tutor_id },
  });

  for (const offering of tutor.offerings) {
    const subject = await prisma.subject.findUnique({
      where: { name: offering.subject },
      select: { subject_id: true },
    });

    if (!subject) {
      throw new Error(`Missing subject in seed catalog: ${offering.subject}`);
    }

    await prisma.offering.create({
      data: {
        tutor_id: savedTutor.tutor_id,
        subject_id: subject.subject_id,
        grades: offering.grades,
        modality: offering.modality,
        location_area:
          offering.modality === 'online' ? null : offering.location_area,
        price_cents: offering.price_cents,
        currency: offering.currency,
        availability_tags: offering.availability_tags,
      },
    });
  }
}

async function main() {
  await upsertSubjects();

  for (const tutor of SEED_TUTORS) {
    await upsertTutorWithOfferings(tutor);
  }

  console.log(`Seed completed. Upserted ${SEED_TUTORS.length} tutors.`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
