import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { badRequest } from '@/lib/server/http';
import {
  isValidGrade,
  isValidModality,
  isValidSubject,
  normalizeAvailability,
  searchTutors,
} from '@/lib/server/store';

function readListParam(raw: string | null): string[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const subject = searchParams.get('subject');
  const grade = searchParams.get('grade');
  const locationArea = searchParams.get('location_area') ?? undefined;
  const modality = searchParams.get('modality');
  const availability = readListParam(searchParams.get('availability'));

  const maxPriceRaw = searchParams.get('max_price_cents');
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;

  if (subject && !isValidSubject(subject)) {
    return badRequest('subject is invalid');
  }

  if (grade && !isValidGrade(grade)) {
    return badRequest('grade is invalid');
  }

  if (modality && !isValidModality(modality)) {
    return badRequest('modality must be online, in_person, or both');
  }

  if (maxPrice !== undefined && Number.isNaN(maxPrice)) {
    return badRequest('max_price_cents must be a number');
  }

  const parsedSubject =
    subject && isValidSubject(subject) ? subject : undefined;
  const parsedGrade = grade && isValidGrade(grade) ? grade : undefined;
  const parsedModality =
    modality && isValidModality(modality) ? modality : undefined;

  const results = await searchTutors({
    subject: parsedSubject,
    grade: parsedGrade,
    location_area: locationArea,
    max_price_cents: maxPrice,
    availability: normalizeAvailability(availability),
    modality: parsedModality,
  });

  return NextResponse.json({
    count: results.length,
    tutors: results,
  });
}
