'use client';

import { Button, Card, Col, Row, Space, Typography } from 'antd';
import Link from 'next/link';
import { PublicShell } from '@/components/public/PublicShell';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <PublicShell>
      <Space orientation="vertical" size={24} style={{ width: '100%' }}>
        <Card>
          <Title level={2} style={{ marginTop: 0 }}>Proxim Learning Network</Title>
          <Paragraph>
            A local network connecting Antiguan students with trusted tutors.
          </Paragraph>
          <Space>
            <Link href="/tutors"><Button type="primary" size="large">Find a tutor</Button></Link>
            <Button size="large" href="#how">How it works</Button>
          </Space>
        </Card>

        <div id="how" />
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card title="1) Browse">
              Search tutors by subject, grade, and availability.
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="2) Book">
              Choose a time that works and confirm the session.
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="3) Learn">
              Meet online or in-person and keep progressing.
            </Card>
          </Col>
        </Row>
      </Space>
    </PublicShell>
  );
}