import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { badRequest, unauthorized } from '@/lib/server/http';
import { findTutorByPhone, normalizePhone } from '@/lib/server/store';

type Body = {
  role?: 'admin' | 'tutor';
  phone?: string;
  code?: string;
  password?: string;
};

function issueToken(payload: Record<string, string>): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json().catch(() => ({}))) as Body;

  if (!body.role) {
    return badRequest('role is required (admin or tutor)');
  }

  if (body.role === 'admin') {
    const password = body.password ?? '';
    const expected = process.env.ADMIN_PASSWORD ?? 'admin123';

    if (password !== expected) {
      return unauthorized('Invalid admin credentials');
    }

    return NextResponse.json({
      token: issueToken({ role: 'admin' }),
      role: 'admin',
    });
  }

  if (!body.phone || !body.code) {
    return badRequest('phone and code are required for tutor login');
  }

  // Prototype OTP verification. Replace with SMS OTP provider in production.
  if (body.code !== '000000') {
    return unauthorized('Invalid one-time code');
  }

  const phone = normalizePhone(body.phone);
  const tutor = await findTutorByPhone(phone);
  if (!tutor) {
    return unauthorized('No tutor account found for this phone number');
  }

  return NextResponse.json({
    token: issueToken({ role: 'tutor', phone }),
    role: 'tutor',
    tutor_id: tutor.tutor_id,
    phone,
  });
}
