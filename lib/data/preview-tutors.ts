import type { Grade, Subject } from '@/lib/enums';
import { Modality } from '@/lib/enums';
import type { Tutor } from '@/lib/types';
import { SEED_TUTORS } from './seed-tutors.js';

type PreviewContactMethod = Tutor['preferredContactMethod'];
type SeedModality = 'online' | 'in_person' | 'both';

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function mapModality(modality: 'online' | 'in_person' | 'both'): Modality[] {
  if (modality === 'both') {
    return [Modality.Online, Modality.InPerson];
  }

  if (modality === 'in_person') {
    return [Modality.InPerson];
  }

  return [Modality.Online];
}

function defaultLocation(
  offerings: (typeof SEED_TUTORS)[number]['offerings'],
): string {
  return (
    offerings.find((offering) => offering.location_area)?.location_area ??
    'Online'
  );
}

export const PREVIEW_TUTORS: Tutor[] = SEED_TUTORS.map((tutor, index) => {
  const offerings = tutor.offerings.map((offering) => ({
    subject: offering.subject as Subject,
    overrides: {
      rateXcd: Math.ceil(offering.price_cents / 100),
      grades: offering.grades as Grade[],
      modalities: mapModality(offering.modality as SeedModality),
    },
  }));

  const defaultRateXcd =
    offerings.length > 0
      ? Math.min(...offerings.map((offering) => offering.overrides.rateXcd))
      : 0;

  const defaultGrades = Array.from(
    new Set(offerings.flatMap((offering) => offering.overrides.grades)),
  );

  const defaultModalities = Array.from(
    new Set(offerings.flatMap((offering) => offering.overrides.modalities)),
  );

  return {
    id: index + 1,
    slug: slugifyName(tutor.full_name),
    name: tutor.full_name,
    tagline: tutor.bio,
    bio: tutor.bio,
    email: tutor.email,
    whatsapp: tutor.phone,
    preferredContactMethod:
      tutor.preferred_contact_method as PreviewContactMethod,
    defaults: {
      rateXcd: defaultRateXcd,
      grades: defaultGrades,
      modalities: defaultModalities,
      locationLabel: defaultLocation(tutor.offerings),
    },
    offerings,
  };
});
