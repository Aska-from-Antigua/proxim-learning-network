'use client';

import { Card, Typography } from 'antd';

const { Text } = Typography;

export function TutorAvailabilityCard() {
  return (
    <Card className="filtersCard" title="Availability">
      <Text type="secondary">
        Coming soon: in-app availability and booking. For now, use WhatsApp or email to coordinate a time.
      </Text>
    </Card>
  );
}
