'use client';

import { Card, Typography } from 'antd';

const { Text } = Typography;

export function TutorAvailabilityCard() {
  return (
    <Card className="contentCard" title="Availability & Scheduling">
      <Text type="secondary">
        In-app scheduling is coming soon. For now, coordinate session times
        directly with this tutor via WhatsApp or email.
      </Text>
    </Card>
  );
}
