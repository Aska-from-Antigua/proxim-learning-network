'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, Col, Empty, Row, Space, Typography } from 'antd';

import { PublicShell } from '@/components/public/PublicShell';
import { TutorHeroCard } from '@/components/public/TutorHeroCard';
import { TutorOfferingCard } from '@/components/public/TutorOfferingCard';
import { TutorAvailabilityCard } from '@/components/public/TutorAvailabilityCard';
import { TUTORS } from '@/lib/data/tutors';
import type { Offering, Tutor } from '@/lib/types';

const { Title, Paragraph } = Typography;

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

  const tutor = TUTORS.find((t) => t.slug === slug);

  if (!tutor) {
    return (
      <PublicShell>
        <div className="tutorsPage">
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
      <div className="tutorsPage">
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          {/* Hero */}
          <TutorHeroCard tutor={tutor} />

          {/* About */}
          <Card className="filtersCard" title="About">
            <Paragraph style={{ marginBottom: 0 }}>{tutor.bio}</Paragraph>
          </Card>

          {/* What I teach */}
          <Card className="filtersCard" title="What I teach">
            <Row gutter={[12, 12]}>
              {offeringCards.map((o) => (
                <Col key={o.key} xs={24} sm={12} lg={8}>
                  <TutorOfferingCard tutor={tutor} offering={o.offering} />
                </Col>
              ))}
            </Row>
          </Card>

          {/* Availability */}
          <TutorAvailabilityCard />
        </Space>
      </div>
    </PublicShell>
  );
}

export {};
