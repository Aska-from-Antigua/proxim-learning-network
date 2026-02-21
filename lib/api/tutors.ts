import type { Grade, Subject } from '@/lib/enums';
import { Modality } from '@/lib/enums';
import type { Tutor, Offering } from '@/lib/types';

type ApiOffering = {
  offering_id: number;
  tutor_id: number;
  subject_id: number;
  grades: Grade[];
  modality: 'online' | 'in_person' | 'both';
  location_area: string | null;
  price_cents: number;
  currency: string;
  availability_tags: string[];
  created_at: string;
  updated_at: string;
  subject_name: Subject;
};

type ApiTutor = {
  tutor_id: number;
  full_name: string;
  phone: string;
  email: string;
  preferred_contact_method: 'whatsapp' | 'email';
  status: 'pending' | 'approved' | 'denied' | 'suspended';
  bio: string | null;
  created_at: string;
  updated_at: string;
  offerings: ApiOffering[];
};

type SearchResponse = {
  count: number;
  tutors: ApiTutor[];
};

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

function mapModalityToUi(modality: ApiOffering['modality']): Modality[] {
  if (modality === 'both') {
    return [Modality.Online, Modality.InPerson];
  }

  if (modality === 'in_person') {
    return [Modality.InPerson];
  }

  return [Modality.Online];
}

function mapOfferingToUi(offering: ApiOffering): Offering {
  return {
    subject: offering.subject_name,
    overrides: {
      rateXcd: Math.ceil(offering.price_cents / 100),
      grades: offering.grades,
      modalities: mapModalityToUi(offering.modality),
    },
  };
}

function mapTutorToUi(tutor: ApiTutor): Tutor {
  const mappedOfferings = tutor.offerings.map(mapOfferingToUi);

  const defaultRateXcd =
    mappedOfferings.length > 0
      ? Math.min(
          ...mappedOfferings.map(
            (offering) => offering.overrides?.rateXcd ?? 0,
          ),
        )
      : 0;

  const defaultGrades = Array.from(
    new Set(
      mappedOfferings.flatMap((offering) => offering.overrides?.grades ?? []),
    ),
  ) as Grade[];

  const defaultModalities = Array.from(
    new Set(
      mappedOfferings.flatMap(
        (offering) => offering.overrides?.modalities ?? [],
      ),
    ),
  ) as Modality[];

  const defaultLocation =
    tutor.offerings.find((o) => o.location_area)?.location_area ?? 'Online';

  const bio = tutor.bio || 'No bio provided yet.';

  return {
    id: tutor.tutor_id,
    slug: slugifyName(tutor.full_name),
    name: tutor.full_name,
    tagline: bio,
    bio,
    email: tutor.email,
    whatsapp: formatPhone(tutor.phone),
    preferredContactMethod: tutor.preferred_contact_method,
    defaults: {
      rateXcd: defaultRateXcd,
      grades: defaultGrades,
      modalities: defaultModalities,
      locationLabel: defaultLocation,
    },
    offerings: mappedOfferings,
  };
}

export async function fetchTutorDirectory(): Promise<Tutor[]> {
  const response = await fetch('/api/search/tutors', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to load tutor directory');
  }

  const data = (await response.json()) as SearchResponse;
  return data.tutors.map(mapTutorToUi);
}
