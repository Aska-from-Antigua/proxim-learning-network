'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Tag, Typography } from 'antd';

import { SubjectLabel, GradeLabel } from '@/lib/labels';
import { intersect, unique } from '@/lib/helpers/array';
import { effectiveGrades } from '@/lib/helpers/tutor';
import type { Tutor } from '@/lib/types';
import type { Grade, Subject } from '@/lib/enums';

const { Text } = Typography;

function takeWithinCharBudget<T>(
  items: T[],
  labelFor: (item: T) => string,
  maxChars: number,
): { visible: T[]; hiddenCount: number } {
  const visible: T[] = [];
  let used = 0;

  for (const item of items) {
    const label = labelFor(item);
    // Approximate spacing / padding cost per tag so we don't overfill.
    const cost = label.length + 4;
    if (visible.length > 0 && used + cost > maxChars) break;
    if (visible.length === 0 && cost > maxChars) {
      // Always show at least one tag.
      visible.push(item);
      used += cost;
      continue;
    }
    if (used + cost > maxChars) break;
    visible.push(item);
    used += cost;
  }

  return { visible, hiddenCount: Math.max(0, items.length - visible.length) };
}

type Props = {
  tutor: Tutor;
  activeSubjectFilter?: Subject[]; // the selected subjects from the page
  activeGradeFilter?: Grade[]; // the selected grades from the page
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
  // 3-ish rows of chips depending on label length. This is an approximation that
  // avoids internal scrollbars while handling long subject names better.
  const { visible: visibleSubjects, hiddenCount: hiddenSubjectCount } =
    takeWithinCharBudget(subjectsToShow, (s) => SubjectLabel[s], 48);

  // Grades to display: union of effective grades across relevant offerings
  const relevantGradesUnion = unique(
    relevantOfferings.flatMap((o) => effectiveGrades(tutor, o)),
  );

  const gradesToShow = hasGradeFilter
    ? unique(intersect(relevantGradesUnion, activeGradeFilter))
    : relevantGradesUnion;

  const { visible: visibleGrades, hiddenCount: hiddenGradeCount } =
    takeWithinCharBudget(gradesToShow, (g) => GradeLabel[g], 28);

  return (
    <Card
      className="tutorCard"
      hoverable
      onClick={() => router.push(`/tutors/${tutor.slug}`)}
      title={
        <>
          <Text strong>{tutor.name}</Text>
          <br />
          <Text type="secondary">{tutor.defaults.locationLabel}</Text>
        </>
      }
      extra={<Text strong>{tutor.defaults.rateXcd} XCD+</Text>}
    >
      <div className="tutorCardContent">
        <div className="tutorSection tutorSectionTagline">
          <Text className="tutorTagline">{tutor.tagline}</Text>
        </div>

        {/* Subjects */}
        {subjectsToShow.length > 0 && (
          <div className="tutorSection tutorSectionSubjects">
            <div className="tutorSubjects">
              {visibleSubjects.map((s) => (
                <Tag key={s}>{SubjectLabel[s]}</Tag>
              ))}
              {hiddenSubjectCount > 0 ? (
                <Tag>
                  <Link href={`/tutors/${tutor.slug}`}>
                    +{hiddenSubjectCount} more
                  </Link>
                </Tag>
              ) : null}
            </div>
          </div>
        )}

        {/* Grades */}
        <div className="tutorSection tutorSectionGrades">
          <div className="tutorGrades">
            {visibleGrades.map((g) => (
              <Tag key={g}>{GradeLabel[g]}</Tag>
            ))}
            {hiddenGradeCount > 0 ? (
              <Tag>
                <Link href={`/tutors/${tutor.slug}`}>
                  +{hiddenGradeCount} more
                </Link>
              </Tag>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
