import { Subject, Grade } from '@/lib/enums';
import { SubjectLabel, GradeLabel } from '@/lib/labels';
import type { Offering } from '@/lib/types';
import { unique } from '@/lib/helpers/array';

export function subjectSummary(offerings: Offering[], maxSubjects = 5): string {
  const orderedSubjects = Object.values(Subject);
  const subjects = unique(offerings.map((o) => o.subject))
    .sort((a, b) => orderedSubjects.indexOf(a) - orderedSubjects.indexOf(b))
    .map((s) => SubjectLabel[s]);

  if (subjects.length <= maxSubjects) {
    return `Subjects: ${subjects.join(', ')}`;
  }

  const visible = subjects.slice(0, maxSubjects);
  const remaining = subjects.length - visible.length;
  return `Subjects: ${visible.join(', ')} +${remaining} more`;
}

export function gradeSummary(grades: Grade[]): string {
  const uniqueGrades = unique(grades);
  const formMap: Record<Grade, number> = {
    [Grade.Grade1]: 0,
    [Grade.Form1]: 1,
    [Grade.Form2]: 2,
    [Grade.Form3]: 3,
    [Grade.Form4]: 4,
    [Grade.Form5]: 5,
    [Grade.ALevels]: 0,
  };

  const formNumbers = uniqueGrades
    .filter((g) => g !== Grade.Grade1 && g !== Grade.ALevels)
    .map((g) => formMap[g])
    .filter((n) => n > 0)
    .sort((a, b) => a - b);

  const ranges: Array<{ start: number; end: number }> = [];
  for (const number of formNumbers) {
    const last = ranges[ranges.length - 1];
    if (!last || number > last.end + 1) {
      ranges.push({ start: number, end: number });
    } else {
      last.end = number;
    }
  }

  const parts: string[] = [];
  if (ranges.length === 1) {
    const { start, end } = ranges[0];
    parts.push(start === end ? `Form ${start}` : `Forms ${start}–${end}`);
  } else if (ranges.length > 1) {
    const rangesText = ranges
      .map(({ start, end }) => (start === end ? `${start}` : `${start}–${end}`))
      .join(', ');
    parts.push(`Forms ${rangesText}`);
  }

  if (uniqueGrades.includes(Grade.Grade1)) {
    parts.push(GradeLabel[Grade.Grade1]);
  }

  if (uniqueGrades.includes(Grade.ALevels)) {
    parts.push(GradeLabel[Grade.ALevels]);
  }

  return parts.join(' + ');
}
