import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SUBJECTS = [
  'MATH',
  'INT_SCI',
  'ENG_A',
  'ENG_B',
  'IT',
  'BIO',
  'CHEM',
  'PHYS',
  'SOC_STU',
  'POA',
  'POB',
];

const SEED_TUTORS = [
  {
    full_name: 'Jerry Aska',
    phone: '+1-268-555-0001',
    email: 'jerry.aska@pln.com',
    preferred_contact_method: 'whatsapp',
    status: 'approved',
    bio: 'Concept-first tutoring focused on strong fundamentals and confidence.',
    offerings: [
      {
        subject: 'MATH',
        grades: ['F1', 'F2', 'F3'],
        modality: 'online',
        location_area: null,
        price_cents: 4000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
      {
        subject: 'IT',
        grades: ['F1', 'F2', 'F3'],
        modality: 'online',
        location_area: null,
        price_cents: 4000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
    ],
  },
  {
    full_name: 'Ophellia Ladoo',
    phone: '+1-268-555-0002',
    email: 'ophellia.ladoo@pln.com',
    preferred_contact_method: 'whatsapp',
    status: 'approved',
    bio: 'Exam-focused POA and POB support for senior forms.',
    offerings: [
      {
        subject: 'POA',
        grades: ['F4', 'F5'],
        modality: 'both',
        location_area: 'Town',
        price_cents: 5000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
      {
        subject: 'POB',
        grades: ['F4', 'F5'],
        modality: 'both',
        location_area: 'Town',
        price_cents: 5000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
    ],
  },
  {
    full_name: 'Lucia Murray',
    phone: '+1-268-555-0003',
    email: 'lucia.murray@pln.com',
    preferred_contact_method: 'email',
    status: 'approved',
    bio: 'English tutoring that improves writing, comprehension, and exam technique.',
    offerings: [
      {
        subject: 'ENG_A',
        grades: ['F1', 'F2', 'F3', 'F4', 'F5'],
        modality: 'in_person',
        location_area: 'Cedar Valley',
        price_cents: 5500,
        currency: 'XCD',
        availability_tags: ['weekdays', 'mornings'],
      },
      {
        subject: 'ENG_B',
        grades: ['F1', 'F2', 'F3', 'F4', 'F5'],
        modality: 'in_person',
        location_area: 'Cedar Valley',
        price_cents: 5500,
        currency: 'XCD',
        availability_tags: ['weekdays', 'mornings'],
      },
    ],
  },
  {
    full_name: 'Kyle Sukhdeo',
    phone: '+1-268-555-0004',
    email: 'kyle.sukhdeo@pln.com',
    preferred_contact_method: 'whatsapp',
    status: 'approved',
    bio: 'Math and Biology tutoring with strong problem-solving methods.',
    offerings: [
      {
        subject: 'MATH',
        grades: ['F1', 'F2', 'F3', 'F4', 'F5'],
        modality: 'both',
        location_area: 'Near Transport Board',
        price_cents: 4000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings', 'weekends'],
      },
      {
        subject: 'BIO',
        grades: ['F3', 'F4', 'F5'],
        modality: 'in_person',
        location_area: 'Near Transport Board',
        price_cents: 5000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
    ],
  },
  {
    full_name: 'Kevin Joseph',
    phone: '+1-268-555-0005',
    email: 'kevin.joseph@pln.com',
    preferred_contact_method: 'whatsapp',
    status: 'approved',
    bio: 'Senior science tutoring for CSEC preparation.',
    offerings: [
      {
        subject: 'BIO',
        grades: ['F5'],
        modality: 'in_person',
        location_area: 'Upper All Saints Road',
        price_cents: 7500,
        currency: 'XCD',
        availability_tags: ['weekdays', 'weekends'],
      },
      {
        subject: 'CHEM',
        grades: ['F5'],
        modality: 'in_person',
        location_area: 'Upper All Saints Road',
        price_cents: 7500,
        currency: 'XCD',
        availability_tags: ['weekdays', 'weekends'],
      },
      {
        subject: 'PHYS',
        grades: ['F5'],
        modality: 'in_person',
        location_area: 'Upper All Saints Road',
        price_cents: 7500,
        currency: 'XCD',
        availability_tags: ['weekdays', 'weekends'],
      },
    ],
  },
  {
    full_name: 'Shaniyah Matthews',
    phone: '+1-268-555-0006',
    email: 'shaniyah.matthews@pln.com',
    preferred_contact_method: 'email',
    status: 'approved',
    bio: 'Supportive tutoring in Social Studies and Integrated Science.',
    offerings: [
      {
        subject: 'SOC_STU',
        grades: ['F3', 'F4', 'F5'],
        modality: 'both',
        location_area: 'Upper All Saints Road',
        price_cents: 4500,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
      {
        subject: 'INT_SCI',
        grades: ['F1', 'F2', 'F3'],
        modality: 'both',
        location_area: 'Upper All Saints Road',
        price_cents: 4000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
    ],
  },
  {
    full_name: 'Ovante Burnette',
    phone: '+1-268-555-0007',
    email: 'ovante.burnette@pln.com',
    preferred_contact_method: 'whatsapp',
    status: 'approved',
    bio: 'Affordable tutoring in POB and IT for Forms 1-5.',
    offerings: [
      {
        subject: 'POB',
        grades: ['F1', 'F2', 'F3', 'F4', 'F5'],
        modality: 'both',
        location_area: 'Jonas Road',
        price_cents: 3000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
      {
        subject: 'IT',
        grades: ['F1', 'F2', 'F3', 'F4', 'F5'],
        modality: 'both',
        location_area: 'Jonas Road',
        price_cents: 3000,
        currency: 'XCD',
        availability_tags: ['weekdays', 'evenings'],
      },
    ],
  },
];

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
