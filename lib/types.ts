import type { Grade, Subject, Modality } from './enums';

export type TutorDefaults = {
  rateXcd: number;
  modalities: Modality[];
  grades: Grade[];
  locationLabel: string;
};

export type OfferingOverrides = Partial<{
  rateXcd: number;
  modalities: Modality[];
  grades: Grade[];
}>;

export type Offering = {
  subject: Subject;
  overrides?: OfferingOverrides;
};

export type Tutor = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  email: string;
  whatsapp: string;
  preferredContactMethod: 'whatsapp' | 'email';
  defaults: TutorDefaults;
  offerings: Offering[];
};
