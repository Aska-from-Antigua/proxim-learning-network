'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';

import { PublicShell } from '@/components/public/PublicShell';
import { TUTORS } from '@/lib/data/tutors';
import { GradeLabel, ModalityLabel, SubjectLabel } from '@/lib/labels';
import {
  effectiveGrades,
  effectiveModalities,
  effectiveRateXcd,
} from '@/lib/helpers/tutor';
import type { Tutor } from '@/lib/types';
import { Grade, Modality, Subject } from '@/lib/enums';

const { Title, Text, Paragraph } = Typography;

function waMeLink(whatsapp: string): string {
  // wa.me requires digits only, typically with country code.
  const digits = whatsapp.replace(/\D/g, '');
  // If user stored something like "1268..." this will work.
  return `https://wa.me/${digits}`;
}

function tutorOfferingsRows(tutor: Tutor) {
  return tutor.offerings.map((o, idx) => {
    const grades = effectiveGrades(tutor, o);
    const modalities = effectiveModalities(tutor, o);
    const rate = effectiveRateXcd(tutor, o);

    return {
      key: `${tutor.id}-${o.subject}-${idx}`,
      subject: o.subject,
      grades,
      modalities,
      rate,
      hasOverrides: Boolean(o.overrides && Object.keys(o.overrides).length > 0),
    };
  });
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

  const rows = tutorOfferingsRows(tutor);

  return (
    <PublicShell>
      <div className="tutorsPage">
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          {/* Header */}
          <Card className="filtersCard">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={16}>
                <div className="tutorProfileHeader">
                  <Avatar className="tutorAvatarLg" src="/avatar-placeholder.svg" alt={`${tutor.name} profile`} />
                  <div className="tutorProfileMeta">
                    <Title level={3} style={{ margin: 0 }}>
                      {tutor.name}
                    </Title>
                    <Text type="secondary">From {tutor.defaults.rateXcd} XCD</Text>
                    <Paragraph style={{ marginTop: 10, marginBottom: 0 }}>
                      {tutor.bio}
                    </Paragraph>
                  </div>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    block
                    href={waMeLink(tutor.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    block
                    href={`mailto:${tutor.email}`}
                  >
                    Email
                  </Button>
                  <Text type="secondary" style={{ display: 'block' }}>
                    {tutor.email}
                  </Text>
                  <Text type="secondary" style={{ display: 'block' }}>
                    {tutor.whatsapp}
                  </Text>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Details + Calendar placeholder */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card className="filtersCard" title="Details">
                <Descriptions column={1} size="small" bordered>
                  <Descriptions.Item label="Default rate">
                    {tutor.defaults.rateXcd} XCD
                  </Descriptions.Item>
                  <Descriptions.Item label="Default grades">
                    <Space size={[6, 6]} wrap>
                      {tutor.defaults.grades.map((g) => (
                        <Tag key={g}>{GradeLabel[g]}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Default modalities">
                    <Space size={[6, 6]} wrap>
                      {tutor.defaults.modalities.map((m) => (
                        <Tag key={m}>{ModalityLabel[m]}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {tutor.defaults.locationLabel ?? '—'}
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '14px 0' }} />
                <Text type="secondary">
                  Some offerings may override defaults (rate, grades, or modality).
                </Text>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card className="filtersCard" title="Availability">
                <Empty
                  description={
                    <span>
                      Calendar integration placeholder. In V2, show available slots and allow booking.
                    </span>
                  }
                />
                <Divider style={{ margin: '14px 0' }} />
                <Space size={10} wrap>
                  <Button type="primary" href={waMeLink(tutor.whatsapp)} target="_blank" rel="noreferrer">
                    Request a session
                  </Button>
                  <Button href={`mailto:${tutor.email}?subject=${encodeURIComponent('Tutoring request')}`}>
                    Email for availability
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Offerings */}
          <Card className="filtersCard" title="Offerings">
            <Table
              size="small"
              pagination={false}
              dataSource={rows}
              columns={[
                {
                  title: 'Subject',
                  dataIndex: 'subject',
                  key: 'subject',
                  render: (s) => <Tag>{SubjectLabel[s as Subject]}</Tag>,
                },
                {
                  title: 'Grades',
                  dataIndex: 'grades',
                  key: 'grades',
                  render: (grades: string[]) => (
                    <Space size={[6, 6]} wrap>
                      {grades.map((g) => (
                        <Tag key={g}>{GradeLabel[g as Grade]}</Tag>
                      ))}
                    </Space>
                  ),
                },
                {
                  title: 'Modality',
                  dataIndex: 'modalities',
                  key: 'modalities',
                  render: (mods: string[]) => (
                    <Space size={[6, 6]} wrap>
                      {mods.map((m) => (
                        <Tag key={m}>{ModalityLabel[m as Modality]}</Tag>
                      ))}
                    </Space>
                  ),
                },
                {
                  title: 'Rate (XCD)',
                  dataIndex: 'rate',
                  key: 'rate',
                  align: 'right',
                  render: (r: number) => <Text strong>{r}</Text>,
                },
              ]}
            />
          </Card>

          <div>
            <Link href="/tutors">← Back to tutors</Link>
          </div>
        </Space>
      </div>
    </PublicShell>
  );
}

export {};
