'use client';

import { useEffect, useMemo, useState } from 'react';
import { Alert, Col, Empty, Row, Spin, Typography } from 'antd';

import type { Grade, Subject } from '@/lib/enums';
import { TutorCard } from '@/components/public/TutorCard';
import { tutorDisplayRateXcd, tutorMatchesFilters } from '@/lib/helpers/tutor';
import type { ModalityFilter, RateSort } from '@/lib/helpers/tutor';
import { TutorFilters } from '@/components/public/TutorFilters';
import { PublicShell } from '@/components/public/PublicShell';
import { fetchTutorDirectory } from '@/lib/api/tutors';
import type { Tutor } from '@/lib/types';

const { Title, Paragraph, Text } = Typography;

export default function TutorsPage() {
  const [subjectFilter, setSubjectFilter] = useState<Subject[]>([]);
  const [gradeFilter, setGradeFilter] = useState<Grade[]>([]);
  const [modalityFilter, setModalityFilter] = useState<ModalityFilter>('ANY');
  const [rateSort, setRateSort] = useState<RateSort>('RATE_DESC');
  const [allTutors, setAllTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTutors(): Promise<void> {
      try {
        setLoading(true);
        setError(null);
        const tutors = await fetchTutorDirectory();
        if (active) {
          setAllTutors(tutors);
        }
      } catch (caught) {
        const message =
          caught instanceof Error
            ? caught.message
            : 'Failed to load tutor directory';

        if (active) {
          setError(message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadTutors();

    return () => {
      active = false;
    };
  }, []);

  const filteredTutors = useMemo(() => {
    const filtered = allTutors.filter((t) =>
      tutorMatchesFilters(t, subjectFilter, gradeFilter, modalityFilter),
    );

    return filtered
      .map((tutor) => ({
        tutor,
        rate: tutorDisplayRateXcd(tutor, subjectFilter, gradeFilter),
      }))
      .sort((a, b) =>
        rateSort === 'RATE_ASC' ? a.rate - b.rate : b.rate - a.rate,
      )
      .map((x) => x.tutor);
  }, [allTutors, subjectFilter, gradeFilter, modalityFilter, rateSort]);

  return (
    <PublicShell>
      <div className="pageStack tutorsPage">
        <section className="heroPanel heroPanelCompact">
          <Text className="eyebrow">Tutor Directory</Text>
          <Title level={1} className="heroTitle">
            Browse trusted tutors by subject, grade, and learning style.
          </Title>
          <Paragraph className="heroLead">
            Compare offerings, rates, and modalities to find the best match.
          </Paragraph>
        </section>

        {error ? <Alert type="error" message={error} showIcon /> : null}

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
          totalCount={allTutors.length}
        />

        {loading ? (
          <Spin size="large" />
        ) : filteredTutors.length === 0 ? (
          <Empty description="No tutors match your filters." />
        ) : (
          <>
            <Row className="tutorGrid" gutter={[16, 16]}>
              {filteredTutors.map((tutor) => (
                <Col key={tutor.id} xs={24} sm={12} xl={8}>
                  <TutorCard
                    tutor={tutor}
                    activeSubjectFilter={subjectFilter}
                    activeGradeFilter={gradeFilter}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </PublicShell>
  );
}
