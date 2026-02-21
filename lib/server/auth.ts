import type { NextRequest } from 'next/server';
import { normalizePhone } from './store';

export const HEADER_ROLE = 'x-role';
export const HEADER_TUTOR_PHONE = 'x-tutor-phone';

export function isAdminRequest(req: NextRequest): boolean {
  return req.headers.get(HEADER_ROLE)?.toLowerCase() === 'admin';
}

export function getRequesterTutorPhone(req: NextRequest): string | null {
  const phone = req.headers.get(HEADER_TUTOR_PHONE);
  return phone ? normalizePhone(phone) : null;
}
