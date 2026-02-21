'use client';

import { Card, Col, Row, Typography } from 'antd';
import { PublicShell } from '@/components/public/PublicShell';

const { Title, Paragraph, Text } = Typography;

const stories = [
  {
    quote:
      'My daughter moved from struggling in Form 3 Maths to confidently explaining her process. The tutor stayed patient and structured.',
    by: "Parent, St. John's",
  },
  {
    quote:
      'I liked that sessions were practical. We focused on the exact areas I kept missing and built from there week by week.',
    by: 'Student, Form 5',
  },
  {
    quote:
      'The communication was clear from day one. We could coordinate quickly on WhatsApp and keep lessons consistent.',
    by: 'Parent, All Saints',
  },
];

export default function TestimonialsPage() {
  return (
    <PublicShell>
      <div className="pageStack">
        <section className="heroPanel heroPanelCompact">
          <Text className="eyebrow">Testimonials</Text>
          <Title level={1} className="heroTitle">
            Families trust PLN for consistent academic support.
          </Title>
          <Paragraph className="heroLead">
            Feedback from students and parents working with tutors in the
            network.
          </Paragraph>
        </section>

        <Row gutter={[16, 16]}>
          {stories.map((story) => (
            <Col key={story.by} xs={24} md={12} lg={8}>
              <Card className="testimonialCard">
                <Paragraph className="quoteText">“{story.quote}”</Paragraph>
                <Text type="secondary">{story.by}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PublicShell>
  );
}
