'use client';

import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd';

import type { Tutor } from '@/lib/types';
import { subjectSummary, gradeSummary } from '@/lib/helpers/summary';
import { effectiveGrades } from '@/lib/helpers/tutor';
import { waMeLink } from '@/lib/helpers/contact';

const { Text } = Typography;

type Props = {
  tutor: Tutor;
};

export function TutorHeroCard({ tutor }: Props) {
  const allGrades = tutor.offerings.flatMap((offering) =>
    effectiveGrades(tutor, offering),
  );
  const subjectsSummaryText = subjectSummary(tutor.offerings);
  const gradesSummaryText = `Grades: ${gradeSummary(allGrades)}`;
  const preferredContactLabel =
    tutor.preferredContactMethod === 'whatsapp' ? 'WhatsApp' : 'Email';

  return (
    <Card
      className="contentCard"
      title={
        <div className="tutorHeroTitle">
          <Text className="tutorHeroName">{tutor.name}</Text>
          <Text type="secondary" className="tutorHeroTagline">
            {tutor.tagline}
          </Text>
        </div>
      }
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={15}>
          <div className="tutorProfileHero">
            <Avatar
              className="tutorAvatarLg tutorAvatarXl"
              src="/avatar-placeholder.svg"
              alt={`${tutor.name} profile`}
            />
            <div className="tutorProfileMeta">
              <Text className="tutorProfileSummary">{subjectsSummaryText}</Text>
              <Text className="tutorProfileSummary">{gradesSummaryText}</Text>
              <Text className="tutorProfileSummary">
                Location/Platform: {tutor.defaults.locationLabel}
              </Text>
            </div>
          </div>
        </Col>

        <Col xs={24} md={9}>
          <Space direction="vertical" size={8} className="tutorProfileCtas">
            <Button
              type="primary"
              block
              href={waMeLink(tutor.whatsapp)}
              target="_blank"
              rel="noreferrer"
            >
              Message on WhatsApp
            </Button>
            <Button
              block
              href={`mailto:${tutor.email}?subject=${encodeURIComponent('Tutoring request')}`}
            >
              Send Email
            </Button>
            <Text type="secondary" className="tutorProfileContact">
              {tutor.email}
            </Text>
            <Text type="secondary" className="tutorProfileContact">
              {tutor.whatsapp}
            </Text>
            <Text type="secondary" className="tutorProfileContact">
              Preferred contact: {preferredContactLabel}
            </Text>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
