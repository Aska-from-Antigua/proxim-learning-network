import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isAdminRequest } from '@/lib/server/auth';
import { badRequest, forbidden } from '@/lib/server/http';
import {
  isValidContactMethod,
  listTutors,
  registerTutor,
} from '@/lib/server/store';

type Body = {
  full_name?: string;
  phone?: string;
  email?: string;
  preferred_contact_method?: string;
  bio?: string | null;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json().catch(() => ({}))) as Body;

  if (
    !body.full_name ||
    !body.phone ||
    !body.email ||
    !body.preferred_contact_method
  ) {
    return badRequest(
      'full_name, phone, email, and preferred_contact_method are required',
    );
  }

  if (!isValidContactMethod(body.preferred_contact_method)) {
    return badRequest('preferred_contact_method must be whatsapp or email');
  }

  const result = await registerTutor({
    full_name: body.full_name,
    phone: body.phone,
    email: body.email,
    preferred_contact_method: body.preferred_contact_method,
    bio: body.bio ?? null,
  });

  return NextResponse.json(result.tutor, {
    status: result.created ? 201 : 200,
  });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return forbidden('Admin role required');
  }

  return NextResponse.json({ tutors: await listTutors() });
}
