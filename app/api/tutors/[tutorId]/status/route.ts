import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isAdminRequest } from '@/lib/server/auth';
import { badRequest, forbidden, notFound } from '@/lib/server/http';
import {
  enqueueStatusNotification,
  processNotificationQueueOnce,
} from '@/lib/server/notifications';
import { findTutorById, isValidStatus, updateTutor } from '@/lib/server/store';
import { TutorStatus } from '@/lib/server/models';

type Params = { params: Promise<{ tutorId: string }> };

type Body = {
  status?: string;
};

function parseTutorId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(
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

  const body = (await req.json().catch(() => ({}))) as Body;
  if (
    !body.status ||
    !isValidStatus(body.status) ||
    body.status === TutorStatus.Pending
  ) {
    return badRequest('status must be approved, denied, or suspended');
  }

  const tutor = await findTutorById(parsedId);
  if (!tutor) {
    return notFound('Tutor not found');
  }

  const updated = await updateTutor(parsedId, { status: body.status });
  if (!updated) {
    return notFound('Tutor not found');
  }

  enqueueStatusNotification({
    tutorId: updated.tutor_id,
    tutorPhone: updated.phone,
    tutorEmail: updated.email,
    preferredMethod: updated.preferred_contact_method,
    status: updated.status,
  });

  // Fire-and-forget queue processing to emulate a worker in this prototype.
  setTimeout(() => {
    processNotificationQueueOnce();
  }, 0);

  return NextResponse.json(updated);
}
