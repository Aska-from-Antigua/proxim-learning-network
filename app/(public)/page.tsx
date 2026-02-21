'use client';

import { Button, Space, Typography } from 'antd';
import Link from 'next/link';
import { PublicShell } from '@/components/public/PublicShell';

const { Title, Paragraph, Text } = Typography;

const featuredThemes = [
  'Mentorship',
  'Shared responsibility',
  'Local excellence',
];

export default function HomePage() {
  return (
    <PublicShell>
      <div className="pageStack homePageV2">
        <section className="homeHero">
          <div className="homeHeroContent">
            <Title level={1} className="homeHeroTitle">
              Proxim Learning Network
            </Title>
            <Text className="homeHeroTagline">Each One Teach One</Text>
            <Paragraph className="homeHeroLead">
              Proxim is a community-driven approach to <strong>learning</strong>{' '}
              built on mentorship, collaboration, and shared responsibility.
            </Paragraph>
            <div className="homeHeroThemes">
              {featuredThemes.map((theme) => (
                <span key={theme} className="homeHeroThemeChip">
                  {theme}
                </span>
              ))}
            </div>
            <Space size={14} wrap className="homeHeroActions">
              <Link href="/tutors">
                <Button type="primary" size="large" className="homeCtaPrimary">
                  Find a tutor
                </Button>
              </Link>
              <Link href="/become-a-tutor">
                <Button size="large" className="homeCtaSecondary">
                  Become a tutor
                </Button>
              </Link>
            </Space>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
