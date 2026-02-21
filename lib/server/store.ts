import { Prisma } from '@prisma/client';
import { Grade, Subject } from '@/lib/enums';
import { prisma } from './prisma';
import type {
  AvailabilityTag,
  ContactMethod,
  OfferingModality,
  OfferingRecord,
  OfferingResult,
  TutorRecord,
  TutorSearchResult,
  TutorStatus,
} from './models';
import {
  AvailabilityTag as AvailabilityTagEnum,
  ContactMethod as ContactMethodEnum,
  OfferingModality as OfferingModalityEnum,
  TutorStatus as TutorStatusEnum,
} from './models';

export type CreateTutorInput = {
  full_name: string;
  phone: string;
  email: string;
  preferred_contact_method: ContactMethod;
  bio?: string | null;
};

export type UpdateTutorInput = Partial<
  Omit<CreateTutorInput, 'phone'> & {
    status: TutorStatus;
  }
>;

export type CreateOfferingInput = {
  subject: Subject;
  grades: Grade[];
  modality: OfferingModality;
  location_area?: string | null;
  price_cents: number;
  currency: string;
  availability_tags: AvailabilityTag[];
};

export type SearchFilters = {
  subject?: Subject;
  grade?: Grade;
  location_area?: string;
  max_price_cents?: number;
  availability?: AvailabilityTag[];
  modality?: OfferingModality;
};

function toTutorRecord(row: {
  tutor_id: number;
  full_name: string;
  phone: string;
  email: string;
  preferred_contact_method: ContactMethod;
  status: TutorStatus;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
}): TutorRecord {
  return {
    ...row,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  };
}

function toOfferingRecord(row: {
  offering_id: number;
  tutor_id: number;
  subject_id: number;
  grades: string[];
  modality: OfferingModality;
  location_area: string | null;
  price_cents: number;
  currency: string;
  availability_tags: string[];
  created_at: Date;
  updated_at: Date;
}): OfferingRecord {
  return {
    ...row,
    grades: row.grades as Grade[],
    availability_tags: row.availability_tags as AvailabilityTag[],
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  };
}

let bootstrappedPromise: Promise<void> | null = null;

async function ensureBootstrapped(): Promise<void> {
  if (process.env.PLN_SKIP_BOOTSTRAP === 'true') {
    return;
  }

  if (!bootstrappedPromise) {
    bootstrappedPromise = (async () => {
      // Ensure subject catalog always exists.
      await Promise.all(
        Object.values(Subject).map((name) =>
          prisma.subject.upsert({
            where: { name },
            update: {},
            create: { name },
          }),
        ),
      );
    })();
  }

  await bootstrappedPromise;
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export async function subjectIdFor(subject: Subject): Promise<number> {
  await ensureBootstrapped();
  const row = await prisma.subject.findUnique({
    where: { name: subject },
    select: { subject_id: true },
  });

  if (!row) {
    throw new Error(`Unknown subject: ${subject}`);
  }

  return row.subject_id;
}

export async function subjectNameFor(subjectId: number): Promise<Subject> {
  await ensureBootstrapped();
  const row = await prisma.subject.findUnique({
    where: { subject_id: subjectId },
    select: { name: true },
  });

  if (!row) {
    throw new Error(`Unknown subject id: ${subjectId}`);
  }

  return row.name as Subject;
}

export async function listTutors(): Promise<TutorRecord[]> {
  await ensureBootstrapped();
  const rows = await prisma.tutor.findMany({
    orderBy: { tutor_id: 'asc' },
  });

  return rows.map((row) => toTutorRecord(row));
}

export async function findTutorById(
  tutorId: number,
): Promise<TutorRecord | undefined> {
  await ensureBootstrapped();
  const row = await prisma.tutor.findUnique({
    where: { tutor_id: tutorId },
  });

  return row ? toTutorRecord(row) : undefined;
}

export async function findTutorByPhone(
  phone: string,
): Promise<TutorRecord | undefined> {
  await ensureBootstrapped();
  const normalized = normalizePhone(phone);
  const row = await prisma.tutor.findUnique({
    where: { phone: normalized },
  });

  return row ? toTutorRecord(row) : undefined;
}

export async function registerTutor(input: CreateTutorInput): Promise<{
  tutor: TutorRecord;
  created: boolean;
}> {
  await ensureBootstrapped();
  const normalizedPhone = normalizePhone(input.phone);

  const existing = await prisma.tutor.findUnique({
    where: { phone: normalizedPhone },
  });

  if (existing) {
    return { tutor: toTutorRecord(existing), created: false };
  }

  try {
    const created = await prisma.tutor.create({
      data: {
        full_name: input.full_name,
        phone: normalizedPhone,
        email: input.email,
        preferred_contact_method: input.preferred_contact_method,
        status: TutorStatusEnum.Pending,
        bio: input.bio ?? null,
      },
    });

    return { tutor: toTutorRecord(created), created: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const row = await prisma.tutor.findUnique({
        where: { phone: normalizedPhone },
      });

      if (row) {
        return { tutor: toTutorRecord(row), created: false };
      }
    }

    throw error;
  }
}

export async function updateTutor(
  tutorId: number,
  patch: UpdateTutorInput,
): Promise<TutorRecord | null> {
  await ensureBootstrapped();

  const existing = await prisma.tutor.findUnique({
    where: { tutor_id: tutorId },
  });

  if (!existing) {
    return null;
  }

  const updated = await prisma.tutor.update({
    where: { tutor_id: tutorId },
    data: {
      full_name: patch.full_name,
      email: patch.email,
      preferred_contact_method: patch.preferred_contact_method,
      bio: patch.bio === undefined ? undefined : patch.bio,
      status: patch.status,
    },
  });

  return toTutorRecord(updated);
}

export async function removeTutor(tutorId: number): Promise<boolean> {
  await ensureBootstrapped();

  const existing = await prisma.tutor.findUnique({
    where: { tutor_id: tutorId },
    select: { tutor_id: true },
  });

  if (!existing) {
    return false;
  }

  await prisma.tutor.delete({ where: { tutor_id: tutorId } });
  return true;
}

function validateLocationForModality(
  modality: OfferingModality,
  locationArea?: string | null,
): void {
  if (
    (modality === OfferingModalityEnum.InPerson ||
      modality === OfferingModalityEnum.Both) &&
    (!locationArea || locationArea.trim().length === 0)
  ) {
    throw new Error(
      'location_area is required for in_person and both modalities',
    );
  }
}

export async function createOffering(
  tutorId: number,
  input: CreateOfferingInput,
): Promise<OfferingRecord> {
  await ensureBootstrapped();

  const tutor = await prisma.tutor.findUnique({
    where: { tutor_id: tutorId },
    select: { tutor_id: true },
  });

  if (!tutor) {
    throw new Error('Tutor not found');
  }

  validateLocationForModality(input.modality, input.location_area);

  const subjectId = await subjectIdFor(input.subject);

  const created = await prisma.offering.create({
    data: {
      tutor_id: tutorId,
      subject_id: subjectId,
      grades: input.grades as string[],
      modality: input.modality,
      location_area:
        input.modality === OfferingModalityEnum.Online
          ? null
          : (input.location_area ?? null),
      price_cents: input.price_cents,
      currency: input.currency,
      availability_tags: input.availability_tags as string[],
    },
  });

  return toOfferingRecord(created);
}

export async function findOfferingById(
  offeringId: number,
): Promise<OfferingRecord | undefined> {
  await ensureBootstrapped();

  const row = await prisma.offering.findUnique({
    where: { offering_id: offeringId },
  });

  return row ? toOfferingRecord(row) : undefined;
}

export async function updateOffering(
  offeringId: number,
  patch: Partial<CreateOfferingInput>,
): Promise<OfferingRecord | null> {
  await ensureBootstrapped();

  const existing = await prisma.offering.findUnique({
    where: { offering_id: offeringId },
  });

  if (!existing) {
    return null;
  }

  let nextSubjectId: number | undefined;
  if (patch.subject !== undefined) {
    nextSubjectId = await subjectIdFor(patch.subject);
  }

  const nextModality =
    patch.modality ?? (existing.modality as OfferingModality);
  const nextLocation =
    patch.location_area !== undefined
      ? patch.location_area
      : existing.location_area;

  validateLocationForModality(nextModality, nextLocation);

  const updated = await prisma.offering.update({
    where: { offering_id: offeringId },
    data: {
      subject_id: nextSubjectId,
      grades: patch.grades as string[] | undefined,
      modality: patch.modality,
      location_area:
        nextModality === OfferingModalityEnum.Online
          ? null
          : (nextLocation ?? null),
      price_cents: patch.price_cents,
      currency: patch.currency,
      availability_tags: patch.availability_tags as string[] | undefined,
    },
  });

  return toOfferingRecord(updated);
}

export async function removeOffering(offeringId: number): Promise<boolean> {
  await ensureBootstrapped();

  const existing = await prisma.offering.findUnique({
    where: { offering_id: offeringId },
    select: { offering_id: true },
  });

  if (!existing) {
    return false;
  }

  await prisma.offering.delete({ where: { offering_id: offeringId } });
  return true;
}

function offeringWhereModality(
  modality?: OfferingModality,
): Prisma.OfferingWhereInput | undefined {
  if (!modality) {
    return undefined;
  }

  if (modality === OfferingModalityEnum.Both) {
    return { modality: OfferingModalityEnum.Both };
  }

  return {
    OR: [{ modality }, { modality: OfferingModalityEnum.Both }],
  };
}

export async function searchTutors(
  filters: SearchFilters,
): Promise<TutorSearchResult[]> {
  await ensureBootstrapped();

  const where: Prisma.OfferingWhereInput = {
    tutor: {
      status: TutorStatusEnum.Approved,
    },
  };

  if (filters.subject) {
    where.subject = { name: filters.subject };
  }

  if (filters.grade) {
    where.grades = { has: filters.grade };
  }

  if (filters.max_price_cents !== undefined) {
    where.price_cents = { lte: filters.max_price_cents };
  }

  if (filters.location_area) {
    where.location_area = {
      contains: filters.location_area,
      mode: 'insensitive',
    };
  }

  const modalityWhere = offeringWhereModality(filters.modality);
  if (modalityWhere) {
    Object.assign(where, modalityWhere);
  }

  if (filters.availability && filters.availability.length > 0) {
    where.availability_tags = { hasSome: filters.availability };
  }

  const rows = await prisma.offering.findMany({
    where,
    include: {
      tutor: true,
      subject: true,
    },
    orderBy: [{ tutor_id: 'asc' }, { offering_id: 'asc' }],
  });

  const grouped = new Map<number, TutorSearchResult>();

  for (const row of rows) {
    const tutorRecord = toTutorRecord(row.tutor);
    const offering: OfferingResult = {
      ...toOfferingRecord(row),
      subject_name: row.subject.name as Subject,
    };

    const existing = grouped.get(tutorRecord.tutor_id);
    if (existing) {
      existing.offerings.push(offering);
    } else {
      grouped.set(tutorRecord.tutor_id, {
        ...tutorRecord,
        offerings: [offering],
      });
    }
  }

  return Array.from(grouped.values());
}

export function normalizeAvailability(tags: string[]): AvailabilityTag[] {
  const allowed = new Set(Object.values(AvailabilityTagEnum));
  return tags.filter((x): x is AvailabilityTag =>
    allowed.has(x as AvailabilityTag),
  );
}

export function isValidStatus(status: string): status is TutorStatus {
  return Object.values(TutorStatusEnum).includes(status as TutorStatus);
}

export function isValidContactMethod(method: string): method is ContactMethod {
  return Object.values(ContactMethodEnum).includes(method as ContactMethod);
}

export function isValidModality(
  modality: string,
): modality is OfferingModality {
  return Object.values(OfferingModalityEnum).includes(
    modality as OfferingModality,
  );
}

export function isValidGrade(grade: string): grade is Grade {
  return Object.values(Grade).includes(grade as Grade);
}

export function isValidSubject(subject: string): subject is Subject {
  return Object.values(Subject).includes(subject as Subject);
}

export function listAllAvailability(): AvailabilityTag[] {
  return Object.values(AvailabilityTagEnum);
}
