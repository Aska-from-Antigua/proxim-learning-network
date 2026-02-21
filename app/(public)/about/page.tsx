'use client';

import { Button, Card, Col, Row, Space, Typography } from 'antd';
import Link from 'next/link';
import { PublicShell } from '@/components/public/PublicShell';
import { Subject } from '@/lib/enums';
import { SubjectLabel } from '@/lib/labels';

const { Title, Paragraph, Text } = Typography;

const timeline = [
  {
    year: '2014',
    title: 'The model starts',
    description:
      'Educator Franz Ladoo introduced a learning model centered on peer support, discipline, and collective accountability.',
  },
  {
    year: '2018',
    title: 'Community adoption',
    description:
      'Families and students began adopting the approach more widely, with mentorship becoming a consistent part of learning.',
  },
  {
    year: 'Today',
    title: 'PLN network',
    description:
      'PLN connects students with trusted tutors while preserving the same principle: progress is stronger when it is shared.',
  },
];

const principles = [
  {
    title: 'Rigor with support',
    text: 'Students should receive high standards and patient guidance at the same time.',
  },
  {
    title: 'Progress is visible',
    text: 'Clear goals and regular check-ins help students, parents, and tutors stay aligned.',
  },
  {
    title: 'Mentorship matters',
    text: 'Confidence grows faster when learners have consistent mentors who know their context.',
  },
  {
    title: 'Local relevance',
    text: 'Tutoring should reflect the curriculum, pace, and realities of our community.',
  },
];

const subjects = Object.values(Subject).map((subject) => SubjectLabel[subject]);

export default function AboutPage() {
  return (
    <PublicShell>
      <div className="pageStack aboutPage">
        <section className="heroPanel heroPanelCompact aboutHeroV2">
          <Text className="eyebrow">About PLN</Text>
          <Title level={1} className="heroTitle">
            A learning network built on shared growth.
          </Title>
          <Paragraph className="heroLead">
            Proxim Learning Network helps students access quality tutoring while
            building a culture of mentorship, consistency, and accountability.
          </Paragraph>
          <Card className="aboutQuoteV2">
            <Text className="quoteText">
              “We are as fast as our slowest and as slow as our fastest.”
            </Text>
            <Text type="secondary">- Franz Ladoo</Text>
          </Card>
        </section>

        <section>
          <div className="sectionHeading">
            <Title level={2} className="sectionTitle">
              How PLN evolved
            </Title>
            <Paragraph className="sectionLead">
              The network grew from one clear idea: learners move farther when
              they move together.
            </Paragraph>
          </div>

          <div className="aboutTimeline">
            {timeline.map((item) => (
              <Card key={item.title} className="aboutTimelineCard">
                <Text className="aboutYear">{item.year}</Text>
                <Title level={4} className="aboutTimelineTitle">
                  {item.title}
                </Title>
                <Paragraph className="aboutTimelineText" style={{ margin: 0 }}>
                  {item.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="sectionHeading">
            <Title level={2} className="sectionTitle">
              What guides our work
            </Title>
          </div>

          <Row gutter={[16, 16]}>
            {principles.map((item) => (
              <Col key={item.title} xs={24} md={12}>
                <Card className="featureCard" title={item.title}>
                  {item.text}
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <Card className="contentCard aboutImpactCard">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
                Subjects currently represented
              </Title>
              <Paragraph className="bodyCopy" style={{ marginBottom: 0 }}>
                Tutors in PLN currently cover these areas, with availability by
                tutor profile.
              </Paragraph>
            </Col>
            <Col xs={24} lg={12}>
              <div className="aboutSubjectGrid">
                {subjects.map((subject) => (
                  <span key={subject} className="aboutSubjectChip">
                    {subject}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Card>

        <Card className="ctaBand">
          <Space
            align="center"
            style={{ width: '100%', justifyContent: 'space-between' }}
            wrap
          >
            <div>
              <Title level={3} style={{ margin: 0 }}>
                Ready to get started?
              </Title>
              <Paragraph style={{ margin: '6px 0 0 0' }}>
                Find the right tutor or apply to join the network.
              </Paragraph>
            </div>
            <Space>
              <Link href="/tutors">
                <Button type="primary">Find Tutors</Button>
              </Link>
              <Link href="/become-a-tutor">
                <Button>Apply as Tutor</Button>
              </Link>
            </Space>
          </Space>
        </Card>
      </div>
    </PublicShell>
  );
}
