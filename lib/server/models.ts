import type { Grade, Subject } from '@/lib/enums';

export const TutorStatus = {
  Pending: 'pending',
  Approved: 'approved',
  Denied: 'denied',
  Suspended: 'suspended',
} as const;

export type TutorStatus = (typeof TutorStatus)[keyof typeof TutorStatus];

export const ContactMethod = {
  WhatsApp: 'whatsapp',
  Email: 'email',
} as const;

export type ContactMethod = (typeof ContactMethod)[keyof typeof ContactMethod];

export const OfferingModality = {
  Online: 'online',
  InPerson: 'in_person',
  Both: 'both',
} as const;

export type OfferingModality =
  (typeof OfferingModality)[keyof typeof OfferingModality];

export const AvailabilityTag = {
  Mornings: 'mornings',
  Weekdays: 'weekdays',
  Evenings: 'evenings',
  Weekends: 'weekends',
} as const;

export type AvailabilityTag =
  (typeof AvailabilityTag)[keyof typeof AvailabilityTag];

export const ALL_AVAILABILITY_TAGS = Object.values(AvailabilityTag);

export type TutorRecord = {
  tutor_id: number;
  full_name: string;
  phone: string;
  email: string;
  preferred_contact_method: ContactMethod;
  status: TutorStatus;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type SubjectRecord = {
  subject_id: number;
  name: Subject;
};

export type OfferingRecord = {
  offering_id: number;
  tutor_id: number;
  subject_id: number;
  grades: Grade[];
  modality: OfferingModality;
  location_area: string | null;
  price_cents: number;
  currency: string;
  availability_tags: AvailabilityTag[];
  created_at: string;
  updated_at: string;
};

export type TutorSearchResult = TutorRecord & {
  offerings: OfferingResult[];
};

export type OfferingResult = OfferingRecord & {
  subject_name: Subject;
};
