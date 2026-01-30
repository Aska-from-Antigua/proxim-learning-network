import type { Tutor, Offering } from '@/lib/types';
import type { Grade, Modality, Subject } from '@/lib/enums';

export type ModalityFilter = 'ANY' | Modality;
export type RateSort = 'RATE_DESC' | 'RATE_ASC';

export function effectiveRateXcd(tutor: Tutor, offering: Offering): number {
  return offering.overrides?.rateXcd ?? tutor.defaults.rateXcd;
}

export function effectiveGrades(tutor: Tutor, offering: Offering): Grade[] {
  return offering.overrides?.grades ?? tutor.defaults.grades;
}

export function effectiveModalities(tutor: Tutor, offering: Offering): Modality[] {
  return offering.overrides?.modalities ?? tutor.defaults.modalities;
}

export function tutorSubjects(tutor: Tutor): Subject[] {
  return Array.from(new Set(tutor.offerings.map((o) => o.subject)));
}

export function tutorMatchesFilters(
  tutor: Tutor,
  subjectFilter: Subject[],
  gradeFilter: Grade[],
  modalityFilter: ModalityFilter,
): boolean {
  return tutor.offerings.some((offering) => {
    if (subjectFilter.length > 0 && !subjectFilter.includes(offering.subject)) {
      return false;
    }

    const grades = effectiveGrades(tutor, offering);
    const modalities = effectiveModalities(tutor, offering);

    if (gradeFilter.length > 0 && !gradeFilter.some((g) => grades.includes(g))) {
      return false;
    }

    if (modalityFilter !== 'ANY' && !modalities.includes(modalityFilter)) {
      return false;
    }

    return true;
  });
}

export function tutorDisplayRateXcd(
  tutor: Tutor,
  subjectFilter: Subject[],
  gradeFilter: Grade[],
): number {
  const relevant = tutor.offerings.filter((o) => {
    if (subjectFilter.length > 0 && !subjectFilter.includes(o.subject)) return false;
    if (gradeFilter.length > 0) {
      const grades = effectiveGrades(tutor, o);
      if (!gradeFilter.some((g) => grades.includes(g))) return false;
    }
    return true;
  });

  if (relevant.length === 0) return tutor.defaults.rateXcd;

  return Math.min(...relevant.map((o) => effectiveRateXcd(tutor, o)));
}