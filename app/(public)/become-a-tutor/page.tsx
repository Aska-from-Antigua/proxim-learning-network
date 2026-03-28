'use client';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { PublicShell } from '@/components/public/PublicShell';
import { Grade, Subject } from '@/lib/enums';
import { GradeLabel, SubjectLabel } from '@/lib/labels';

const { Title, Paragraph, Text } = Typography;

type RegistrationPayload = {
  full_name: string;
  phone: string;
  email: string;
  preferred_contact_method: 'whatsapp' | 'email';
  bio?: string;
};

type OfferingInput = {
  subject: Subject;
  grades: Grade[];
  modality: 'online' | 'in_person' | 'both';
  location_area?: string;
  price_cents: number;
  availability_tags: ('mornings' | 'weekdays' | 'evenings' | 'weekends')[];
  currency?: string;
};

type ApplicationFormValues = RegistrationPayload & {
  offerings?: OfferingInput[];
};

type TutorApiResponse = {
  tutor_id: number;
  status: 'pending' | 'approved' | 'denied' | 'suspended';
  full_name: string;
};

const modalityOptions = [
  { label: 'Online', value: 'online' },
  { label: 'In person', value: 'in_person' },
  { label: 'Both', value: 'both' },
];

const availabilityOptions = [
  { label: 'Mornings', value: 'mornings' },
  { label: 'Weekdays', value: 'weekdays' },
  { label: 'Evenings', value: 'evenings' },
  { label: 'Weekends', value: 'weekends' },
];

export default function BecomeATutorPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TutorApiResponse | null>(null);

  async function submitOfferings(
    tutorId: number,
    phone: string,
    offerings: OfferingInput[],
  ): Promise<void> {
    for (const offering of offerings) {
      const payload = {
        ...offering,
        currency: offering.currency || 'XCD',
        location_area:
          offering.modality === 'online'
            ? null
            : offering.location_area || null,
      };

      const offeringRes = await fetch(`/api/tutors/${tutorId}/offerings`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-tutor-phone': phone,
        },
        body: JSON.stringify(payload),
      });

      if (!offeringRes.ok) {
        const errBody = (await offeringRes.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(
          errBody.error || 'Failed to create one or more offerings',
        );
      }
    }
  }

  async function onFinish(values: ApplicationFormValues): Promise<void> {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!values.offerings || values.offerings.length === 0) {
        setError('Please add at least one offering.');
        return;
      }

      const response = await fetch('/api/tutors', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          full_name: values.full_name,
          phone: values.phone,
          email: values.email,
          preferred_contact_method: values.preferred_contact_method,
          bio: values.bio,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as
        | TutorApiResponse
        | { error?: string };

      if (!response.ok) {
        setError(
          data && 'error' in data
            ? (data.error ?? 'Registration failed')
            : 'Registration failed',
        );
        return;
      }

      const tutor = data as TutorApiResponse;
      await submitOfferings(tutor.tutor_id, values.phone, values.offerings);

      setResult(tutor);
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Unexpected error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicShell>
      <div className="pageStack">
        <section className="heroPanel heroPanelCompact">
          <Text className="eyebrow">Tutor Application</Text>
          <Title level={1} className="heroTitle">
            Join the PLN tutor directory.
          </Title>
          <Paragraph className="heroLead">
            Applications are reviewed before going live. If you re-apply with
            the same phone number, we return your existing tutor profile.
          </Paragraph>
        </section>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card className="contentCard">
              <Title level={4} style={{ marginTop: 0 }}>
                What to expect
              </Title>
              <Paragraph className="bodyCopy">
                1. Submit your profile and offerings.
              </Paragraph>
              <Paragraph className="bodyCopy">
                2. Admin reviews your application.
              </Paragraph>
              <Paragraph className="bodyCopy" style={{ marginBottom: 0 }}>
                3. Receive a status update by your preferred contact method.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Card className="contentCard">
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  preferred_contact_method: 'whatsapp',
                  offerings: [
                    {
                      modality: 'online',
                      availability_tags: ['weekdays'],
                      currency: 'XCD',
                    },
                  ],
                }}
              >
                <Form.Item
                  name="full_name"
                  label="Full name"
                  rules={[{ required: true, message: 'Full name is required' }]}
                >
                  <Input placeholder="e.g. Asha Edwards" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone number"
                  rules={[
                    { required: true, message: 'Phone number is required' },
                  ]}
                >
                  <Input placeholder="e.g. +1 268 555 0101" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Email is required' },
                    { type: 'email', message: 'Enter a valid email address' },
                  ]}
                >
                  <Input placeholder="you@example.com" />
                </Form.Item>

                <Form.Item
                  name="preferred_contact_method"
                  label="Preferred communication method"
                  rules={[
                    {
                      required: true,
                      message: 'Select your preferred communication method',
                    },
                  ]}
                >
                  <Radio.Group
                    options={[
                      { label: 'WhatsApp', value: 'whatsapp' },
                      { label: 'Email', value: 'email' },
                    ]}
                  />
                </Form.Item>

                <Form.Item name="bio" label="Short bio (optional)">
                  <Input.TextArea
                    rows={4}
                    placeholder="Tell students what you teach and your tutoring style."
                  />
                </Form.Item>

                <Title level={4} style={{ marginTop: 8 }}>
                  Offerings
                </Title>
                <Paragraph className="bodyCopy" style={{ marginBottom: 10 }}>
                  Add at least one offering with subject, grades, modality,
                  schedule tags, and price.
                </Paragraph>

                <Form.List name="offerings">
                  {(fields, { add, remove }) => (
                    <Space
                      orientation="vertical"
                      size={14}
                      style={{ width: '100%' }}
                    >
                      {fields.map((field) => {
                        const { key: _fieldKey, ...restField } = field;

                        return (
                          <Card key={field.key} className="offeringBuilderCard">
                            <Row gutter={[12, 12]}>
                              <Col xs={24} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[field.name, 'subject']}
                                  label="Subject"
                                  rules={[
                                    { required: true, message: 'Required' },
                                  ]}
                                >
                                  <Select
                                    placeholder="Select subject"
                                    options={Object.values(Subject).map(
                                      (s) => ({
                                        value: s,
                                        label: SubjectLabel[s],
                                      }),
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              <Col xs={24} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[field.name, 'grades']}
                                  label="Grades"
                                  rules={[
                                    { required: true, message: 'Required' },
                                  ]}
                                >
                                  <Select
                                    mode="multiple"
                                    placeholder="Select grades"
                                    options={Object.values(Grade).map((g) => ({
                                      value: g,
                                      label: GradeLabel[g],
                                    }))}
                                  />
                                </Form.Item>
                              </Col>

                              <Col xs={24} md={8}>
                                <Form.Item
                                  {...restField}
                                  name={[field.name, 'modality']}
                                  label="Modality"
                                  rules={[
                                    { required: true, message: 'Required' },
                                  ]}
                                >
                                  <Select options={modalityOptions} />
                                </Form.Item>
                              </Col>

                              <Col xs={24} md={8}>
                                <Form.Item
                                  {...restField}
                                  name={[field.name, 'availability_tags']}
                                  label="Availability"
                                  rules={[
                                    { required: true, message: 'Required' },
                                  ]}
                                >
                                  <Select
                                    mode="multiple"
                                    placeholder="Select tags"
                                    options={availabilityOptions}
                                  />
                                </Form.Item>
                              </Col>

                              <Col xs={24} md={8}>
                                <Form.Item
                                  {...restField}
                                  name={[field.name, 'price_cents']}
                                  label="Price (XCD cents)"
                                  rules={[
                                    { required: true, message: 'Required' },
                                  ]}
                                >
                                  <InputNumber
                                    min={1}
                                    step={100}
                                    style={{ width: '100%' }}
                                    placeholder="e.g. 5000"
                                  />
                                </Form.Item>
                              </Col>

                              <Col xs={24}>
                                <Form.Item
                                  {...restField}
                                  name={[field.name, 'location_area']}
                                  label="Location area (required for in-person/both)"
                                >
                                  <Input placeholder="e.g. St. John's" />
                                </Form.Item>
                              </Col>
                            </Row>

                            <Button
                              danger
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(field.name)}
                            >
                              Remove offering
                            </Button>
                          </Card>
                        );
                      })}

                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() =>
                          add({
                            modality: 'online',
                            availability_tags: ['weekdays'],
                            currency: 'XCD',
                          })
                        }
                      >
                        Add another offering
                      </Button>
                    </Space>
                  )}
                </Form.List>

                <div style={{ marginTop: 18 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit Registration
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>

        {error ? <Alert type="error" message={error} showIcon /> : null}

        {result ? (
          <Alert
            type="success"
            showIcon
            message="Registration received"
            description={`Tutor #${result.tutor_id} (${result.full_name}) is currently ${result.status}.`}
          />
        ) : null}
      </div>
    </PublicShell>
  );
}
