'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, Col, Empty, Row, Space, Spin, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { PublicShell } from '@/components/public/PublicShell';
import { TutorHeroCard } from '@/components/public/TutorHeroCard';
import { TutorOfferingCard } from '@/components/public/TutorOfferingCard';
import { TutorAvailabilityCard } from '@/components/public/TutorAvailabilityCard';
import type { Offering, Tutor } from '@/lib/types';
import { fetchTutorDirectory } from '@/lib/api/tutors';

const { Title, Paragraph, Text } = Typography;

type OfferingCardModel = {
  key: string;
  offering: Offering;
};

function buildOfferingCards(tutor: Tutor): OfferingCardModel[] {
  return tutor.offerings.map((offering, idx) => ({
    key: `${tutor.id}-${offering.subject}-${idx}`,
    offering,
  }));
}

export default function TutorProfilePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

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
          caught instanceof Error ? caught.message : 'Failed to load tutor';

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

  const tutor = useMemo(
    () => allTutors.find((candidate) => candidate.slug === slug),
    [allTutors, slug],
  );

  if (loading) {
    return (
      <PublicShell>
        <div className="pageStack tutorsPage">
          <Spin size="large" />
        </div>
      </PublicShell>
    );
  }

  if (error) {
    return (
      <PublicShell>
        <div className="pageStack tutorsPage">
          <Title level={4} style={{ margin: 0 }}>
            Unable to load tutor profile
          </Title>
          <Paragraph>{error}</Paragraph>
          <Text type="secondary">
            <Link href="/tutors">Back to directory</Link>
          </Text>
        </div>
      </PublicShell>
    );
  }

  if (!tutor) {
    return (
      <PublicShell>
        <div className="pageStack tutorsPage">
          <Space orientation="vertical" size={16} style={{ width: '100%' }}>
            <Title level={3} style={{ margin: 0 }}>
              Tutor not found
            </Title>
            <Empty description="We couldn't find that tutor." />
            <div>
              <Link href="/tutors">Back to tutors</Link>
            </div>
          </Space>
        </div>
      </PublicShell>
    );
  }

  const offeringCards = buildOfferingCards(tutor);

  return (
    <PublicShell>
      <div className="pageStack tutorsPage">
        <Text type="secondary">
          <Link href="/tutors">← Back to directory</Link>
        </Text>

        <TutorHeroCard tutor={tutor} />

        <Card className="contentCard" title="About this tutor">
          <Paragraph style={{ marginBottom: 0 }}>{tutor.bio}</Paragraph>
        </Card>

        <Card className="contentCard" title="Offerings">
          <Row gutter={[12, 12]}>
            {offeringCards.map((o) => (
              <Col key={o.key} xs={24} md={12} xl={8}>
                <TutorOfferingCard tutor={tutor} offering={o.offering} />
              </Col>
            ))}
          </Row>
        </Card>

        <TutorAvailabilityCard />
      </div>
    </PublicShell>
  );
}

export {};
