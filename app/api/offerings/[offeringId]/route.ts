import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getRequesterTutorPhone, isAdminRequest } from '@/lib/server/auth';
import { badRequest, forbidden, notFound } from '@/lib/server/http';
import {
  findOfferingById,
  findTutorById,
  isValidGrade,
  isValidModality,
  isValidSubject,
  normalizeAvailability,
  removeOffering,
  updateOffering,
} from '@/lib/server/store';

type Params = { params: Promise<{ offeringId: string }> };

type PatchBody = {
  subject?: string;
  grades?: string[];
  modality?: string;
  location_area?: string | null;
  price_cents?: number;
  currency?: string;
  availability_tags?: string[];
};

function parseOfferingId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function canMutate(
  req: NextRequest,
  offeringId: number,
): Promise<boolean> {
  if (isAdminRequest(req)) {
    return true;
  }

  const offering = await findOfferingById(offeringId);
  if (!offering) {
    return false;
  }

  const tutor = await findTutorById(offering.tutor_id);
  if (!tutor) {
    return false;
  }

  return getRequesterTutorPhone(req) === tutor.phone;
}

export async function PATCH(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  const { offeringId } = await params;
  const parsedId = parseOfferingId(offeringId);
  if (!parsedId) {
    return badRequest('Invalid offering_id');
  }

  const existing = await findOfferingById(parsedId);
  if (!existing) {
    return notFound('Offering not found');
  }

  if (!(await canMutate(req, parsedId))) {
    return forbidden('You can only update your own offerings');
  }

  const body = (await req.json().catch(() => ({}))) as PatchBody;

  if (body.subject !== undefined && !isValidSubject(body.subject)) {
    return badRequest('Invalid subject');
  }

  if (body.modality !== undefined && !isValidModality(body.modality)) {
    return badRequest('modality must be online, in_person, or both');
  }

  if (
    body.grades !== undefined &&
    (!Array.isArray(body.grades) ||
      body.grades.length === 0 ||
      !body.grades.every(isValidGrade))
  ) {
    return badRequest('grades must be a non-empty list of valid grade values');
  }

  try {
    const updated = await updateOffering(parsedId, {
      subject: body.subject,
      grades: body.grades,
      modality: body.modality,
      location_area: body.location_area,
      price_cents: body.price_cents,
      currency: body.currency,
      availability_tags:
        body.availability_tags !== undefined
          ? normalizeAvailability(body.availability_tags)
          : undefined,
    });

    if (!updated) {
      return notFound('Offering not found');
    }

    return NextResponse.json(updated);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to update offering';
    return badRequest(message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  const { offeringId } = await params;
  const parsedId = parseOfferingId(offeringId);
  if (!parsedId) {
    return badRequest('Invalid offering_id');
  }

  const existing = await findOfferingById(parsedId);
  if (!existing) {
    return notFound('Offering not found');
  }

  if (!(await canMutate(req, parsedId))) {
    return forbidden('You can only delete your own offerings');
  }

  const removed = await removeOffering(parsedId);
  if (!removed) {
    return notFound('Offering not found');
  }

  return new NextResponse(null, { status: 204 });
}
