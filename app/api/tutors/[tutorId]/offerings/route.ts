import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getRequesterTutorPhone, isAdminRequest } from '@/lib/server/auth';
import { badRequest, forbidden, notFound } from '@/lib/server/http';
import {
  createOffering,
  findTutorById,
  isValidGrade,
  isValidModality,
  isValidSubject,
  normalizeAvailability,
} from '@/lib/server/store';

type Params = { params: Promise<{ tutorId: string }> };

type Body = {
  subject?: string;
  grades?: string[];
  modality?: string;
  location_area?: string | null;
  price_cents?: number;
  currency?: string;
  availability_tags?: string[];
};

function parseTutorId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function POST(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  const { tutorId } = await params;
  const parsedId = parseTutorId(tutorId);
  if (!parsedId) {
    return badRequest('Invalid tutor_id');
  }

  const tutor = await findTutorById(parsedId);
  if (!tutor) {
    return notFound('Tutor not found');
  }

  const isAdmin = isAdminRequest(req);
  const requesterPhone = getRequesterTutorPhone(req);
  if (!isAdmin && requesterPhone !== tutor.phone) {
    return forbidden('You can only add offerings to your own tutor profile');
  }

  const body = (await req.json().catch(() => ({}))) as Body;
  if (
    !body.subject ||
    !body.grades ||
    !body.modality ||
    body.price_cents === undefined ||
    !body.currency ||
    !body.availability_tags
  ) {
    return badRequest(
      'subject, grades, modality, price_cents, currency, and availability_tags are required',
    );
  }

  if (!isValidSubject(body.subject)) {
    return badRequest('Invalid subject');
  }

  if (!isValidModality(body.modality)) {
    return badRequest('modality must be online, in_person, or both');
  }

  if (
    !Array.isArray(body.grades) ||
    body.grades.length === 0 ||
    !body.grades.every(isValidGrade)
  ) {
    return badRequest('grades must be a non-empty list of valid grade values');
  }

  const availability = normalizeAvailability(body.availability_tags);
  if (availability.length === 0) {
    return badRequest('availability_tags must include valid values');
  }

  try {
    const offering = await createOffering(parsedId, {
      subject: body.subject,
      grades: body.grades,
      modality: body.modality,
      location_area: body.location_area,
      price_cents: body.price_cents,
      currency: body.currency,
      availability_tags: availability,
    });

    return NextResponse.json(offering, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to create offering';
    return badRequest(message);
  }
}
