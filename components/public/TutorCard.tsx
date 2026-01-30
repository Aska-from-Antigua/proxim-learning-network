
'use client';

import { useRouter } from 'next/navigation';
import { Card, Tag, Typography } from 'antd';

import { SubjectLabel, GradeLabel, ModalityLabel } from '@/lib/labels';
import { effectiveGrades } from '@/lib/helpers/tutor';
import type { Tutor } from '@/lib/types';
import type { Grade, Subject } from '@/lib/enums';

const { Text } = Typography;

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
}

type Props = {
  tutor: Tutor;
  activeSubjectFilter?: Subject[]; // the selected subjects from the page
  activeGradeFilter?: Grade[];     // the selected grades from the page
};

export function TutorCard({
  tutor,
  activeSubjectFilter = [],
  activeGradeFilter = [],
}: Props) {
  const router = useRouter();
  const hasSubjectFilter = activeSubjectFilter.length > 0;
  const hasGradeFilter = activeGradeFilter.length > 0;

  // Which offerings are relevant to show on this card?
  const relevantOfferings = hasSubjectFilter
    ? tutor.offerings.filter((o) => activeSubjectFilter.includes(o.subject))
    : tutor.offerings;

  // Subjects to display
  const subjectsToShow = unique(relevantOfferings.map((o) => o.subject));

  // Grades to display: union of effective grades across relevant offerings
  const relevantGradesUnion = unique(
    relevantOfferings.flatMap((o) => effectiveGrades(tutor, o)),
  );

  const gradesToShow = hasGradeFilter
    ? unique(intersect(relevantGradesUnion, activeGradeFilter))
    : relevantGradesUnion;

  const modalityText = tutor.defaults.modalities
    .map((m) => ModalityLabel[m])
    .join(' • ');

  return (
    <Card
      className="tutorCard"
      hoverable
      onClick={() => router.push(`/tutors/${tutor.slug}`)}
      title={tutor.name}
      extra={<Text strong>{tutor.defaults.rateXcd} XCD+</Text>}
    >
      <div className="tutorCardContent">
        {/* Subjects */}
        {subjectsToShow.length > 0 && (
          <div>
            {subjectsToShow.map((s) => (
              <Tag key={s}>{SubjectLabel[s]}</Tag>
            ))}
          </div>
        )}

        {/* Grades */}
        <div>
          {gradesToShow.map((g) => (
            <Tag key={g}>{GradeLabel[g]}</Tag>
          ))}
        </div>

        <Text type="secondary">{modalityText}</Text>
        <span
          style={{
            display: 'block',
            whiteSpace: 'pre-line',
            marginBottom: 4,
            paddingRight: 4,
          }}
        >
          {tutor.bio}
        </span>
      </div>
    </Card>
  );
}
