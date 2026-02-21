'use client';

import { Card, Typography } from 'antd';

import { ModalityLabel, SubjectLabel } from '@/lib/labels';
import type { Offering, Tutor } from '@/lib/types';
import { gradeSummary } from '@/lib/helpers/summary';
import {
  effectiveGrades,
  effectiveModalities,
  effectiveRateXcd,
} from '@/lib/helpers/tutor';

const { Text } = Typography;

type Props = {
  tutor: Tutor;
  offering: Offering;
};

export function TutorOfferingCard({ tutor, offering }: Props) {
  const grades = effectiveGrades(tutor, offering);
  const modalities = effectiveModalities(tutor, offering);
  const rateXcd = effectiveRateXcd(tutor, offering);

  return (
    <Card
      type="inner"
      className="offeringCard"
      title={
        <>
          <Text strong>{SubjectLabel[offering.subject]}</Text>
          <br />
          <Text type="secondary">
            {modalities.map((m) => ModalityLabel[m]).join(' • ')}
          </Text>
        </>
      }
      extra={<Text strong>{rateXcd} XCD</Text>}
      styles={{ body: { padding: 16 } }}
    >
      <Text type="secondary">{gradeSummary(grades)}</Text>
    </Card>
  );
}
