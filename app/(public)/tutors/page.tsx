'use client';

import { useMemo, useState } from 'react';
import {
  Card,
  Col,
  Row,
  Select,
  Slider,
  Segmented,
  Space,
  Typography,
  Empty,
} from 'antd';

import { TUTORS } from '@/lib/data/tutors';
import { Grade, Subject } from '@/lib/enums';
import { TutorCard } from '@/components/public/TutorCard';
import { tutorDisplayRateXcd, tutorMatchesFilters, type ModalityFilter } from '@/lib/helpers/tutor';
import { TutorFilters } from '@/components/public/TutorFilters';
import type { RateSort } from '@/lib/helpers/tutor';

const { Title, Text } = Typography;

const MIN_RATE = 20;
const MAX_RATE = 300;

export default function TutorsPage() {
  const [subjectFilter, setSubjectFilter] = useState<Subject[]>([]);
  const [gradeFilter, setGradeFilter] = useState<Grade[]>([]);
  const [modalityFilter, setModalityFilter] = useState<ModalityFilter>('ANY');
  const [rateSort, setRateSort] = useState<RateSort>('RATE_DESC');

  const filteredTutors = useMemo(() => {
    const filtered = TUTORS.filter((t) =>
      tutorMatchesFilters(t, subjectFilter, gradeFilter, modalityFilter),
    );

    return filtered
      .map((tutor) => ({
        tutor,
        rate: tutorDisplayRateXcd(tutor, subjectFilter, gradeFilter),
      }))
      .sort((a, b) =>
        rateSort === 'RATE_ASC'
          ? a.rate - b.rate
          : b.rate - a.rate,
      )
      .map((x) => x.tutor);
  }, [subjectFilter, gradeFilter, modalityFilter, rateSort]);

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Title level={3} style={{ margin: 0 }}>
        Find a tutor
      </Title>

      <TutorFilters
        subjectFilter={subjectFilter}
        onSubjectFilterChange={setSubjectFilter}
        gradeFilter={gradeFilter}
        onGradeFilterChange={setGradeFilter}
        modalityFilter={modalityFilter}
        onModalityFilterChange={setModalityFilter}
        sort={rateSort}
        onSortChange={setRateSort}
        resultsCount={filteredTutors.length}
        totalCount={TUTORS.length}
      />

      {/* Results */}
      {filteredTutors.length === 0 ? (
        <Empty description="No tutors match your filters." />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredTutors.map((tutor) => (
            <Col key={tutor.id} xs={24} sm={12} md={8} lg={6}>
              <TutorCard
                tutor={tutor}
                activeSubjectFilter={subjectFilter}
                activeGradeFilter={gradeFilter}
              />
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
}