import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getRequesterTutorPhone, isAdminRequest } from '@/lib/server/auth';
import { badRequest, forbidden, notFound } from '@/lib/server/http';
import {
  findTutorById,
  isValidContactMethod,
  removeTutor,
  updateTutor,
} from '@/lib/server/store';
import { TutorStatus } from '@/lib/server/models';

type Params = { params: Promise<{ tutorId: string }> };

type PatchBody = {
  full_name?: string;
  email?: string;
  preferred_contact_method?: string;
  bio?: string | null;
};

function parseTutorId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  _: NextRequest,
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

  if (tutor.status !== TutorStatus.Approved) {
    return notFound('Tutor not found');
  }

  return NextResponse.json(tutor);
}

export async function PATCH(
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
  const phone = getRequesterTutorPhone(req);

  if (!isAdmin && phone !== tutor.phone) {
    return forbidden('You can only update your own tutor profile');
  }

  const body = (await req.json().catch(() => ({}))) as PatchBody;

  if (
    body.preferred_contact_method !== undefined &&
    !isValidContactMethod(body.preferred_contact_method)
  ) {
    return badRequest('preferred_contact_method must be whatsapp or email');
  }

  const updated = await updateTutor(parsedId, {
    full_name: body.full_name,
    email: body.email,
    preferred_contact_method: body.preferred_contact_method,
    bio: body.bio,
  });

  if (!updated) {
    return notFound('Tutor not found');
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return forbidden('Admin role required');
  }

  const { tutorId } = await params;
  const parsedId = parseTutorId(tutorId);
  if (!parsedId) {
    return badRequest('Invalid tutor_id');
  }

  const removed = await removeTutor(parsedId);
  if (!removed) {
    return notFound('Tutor not found');
  }

  return new NextResponse(null, { status: 204 });
}
