'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, Tag, Typography } from 'antd';

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
    const cost = label.length + 4;
    if (visible.length > 0 && used + cost > maxChars) break;
    if (visible.length === 0 && cost > maxChars) {
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
  activeSubjectFilter?: Subject[];
  activeGradeFilter?: Grade[];
};

export function TutorCard({
  tutor,
  activeSubjectFilter = [],
  activeGradeFilter = [],
}: Props) {
  const router = useRouter();
  const hasSubjectFilter = activeSubjectFilter.length > 0;
  const hasGradeFilter = activeGradeFilter.length > 0;

  const relevantOfferings = hasSubjectFilter
    ? tutor.offerings.filter((o) => activeSubjectFilter.includes(o.subject))
    : tutor.offerings;

  const subjectsToShow = unique(relevantOfferings.map((o) => o.subject));
  const { visible: visibleSubjects, hiddenCount: hiddenSubjectCount } =
    takeWithinCharBudget(subjectsToShow, (s) => SubjectLabel[s], 54);

  const relevantGradesUnion = unique(
    relevantOfferings.flatMap((o) => effectiveGrades(tutor, o)),
  );

  const gradesToShow = hasGradeFilter
    ? unique(intersect(relevantGradesUnion, activeGradeFilter))
    : relevantGradesUnion;

  const { visible: visibleGrades, hiddenCount: hiddenGradeCount } =
    takeWithinCharBudget(gradesToShow, (g) => GradeLabel[g], 34);

  return (
    <Card
      className="tutorCard"
      hoverable
      onClick={() => router.push(`/tutors/${tutor.slug}`)}
      title={
        <div className="tutorCardHead">
          <Text strong className="tutorCardName">
            {tutor.name}
          </Text>
          <Text type="secondary">{tutor.defaults.locationLabel}</Text>
        </div>
      }
      extra={
        <Text strong className="ratePill">
          {tutor.defaults.rateXcd} XCD+
        </Text>
      }
    >
      <div className="tutorCardContent">
        <div className="tutorSection tutorSectionTagline">
          <Text className="tutorTagline">{tutor.tagline}</Text>
        </div>

        {subjectsToShow.length > 0 ? (
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
        ) : null}

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

        <div className="tutorCardFooter">
          <Text type="secondary">
            Preferred contact:{' '}
            {tutor.preferredContactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
          </Text>
          <Button size="small">View profile</Button>
        </div>
      </div>
    </Card>
  );
}
