'use client';

import { Button, Typography } from 'antd';
import Link from 'next/link';
import { PublicShell } from '@/components/public/PublicShell';

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  return (
    <PublicShell>
      <div className="pageStack aboutPage">
        <section className="heroPanel aboutHero">
          <div className="aboutHeroGrid">
            <div>
              <Text className="eyebrow">ABOUT PLN</Text>
              <Title level={1} className="heroTitle aboutHeroTitle">
                A learning network built on shared growth.
              </Title>
              <Paragraph className="heroLead aboutBody">
                Proxim Learning Network helps students access quality tutoring
                while building a culture of mentorship, accountability, and
                shared progress.
              </Paragraph>
            </div>

            <blockquote className="aboutQuote" aria-label="PLN guiding quote">
              <p className="aboutQuoteText">
                “We are as fast as our slowest and as slow as our fastest.”
              </p>
              <cite className="aboutQuoteAuthor">— Franz Ladoo</cite>
            </blockquote>
          </div>
        </section>

        <section className="aboutSection">
          <div className="aboutSectionIntro">
            <span className="aboutSectionIndex">01</span>
            <Title level={2} className="sectionTitle aboutSectionTitle">
              Where it began
            </Title>
          </div>
          <div className="aboutSectionContent">
            <Paragraph className="bodyCopy aboutBody">
              In the classroom, Mr. Franz Ladoo observed something simple:
              students perform best when they receive focused attention. But one
              teacher cannot provide one-on-one support to every student at all
              times.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              The challenge wasn’t ability. It was scale.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              He began experimenting with structured peer-supported learning —
              small groups where students worked together, explained concepts to
              one another, and shared responsibility for understanding.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              The results were clear: progress improved when students moved
              forward together.
            </Paragraph>
          </div>
        </section>

        <section className="aboutSection">
          <div className="aboutSectionIntro">
            <span className="aboutSectionIndex">02</span>
            <Title level={2} className="sectionTitle aboutSectionTitle">
              What makes the model different
            </Title>
          </div>
          <div className="aboutSectionContent">
            <Paragraph className="bodyCopy aboutBody">
              PLN is built on the belief that learning is strongest when it is
              shared.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              Students are encouraged to support one another.
              <br />
              Mentorship is intentional.
              <br />
              Accountability is collective.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              Each learner has the capacity to teach.
              <br />
              Each learner has the responsibility to grow.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              No one is left behind. Progress is shared.
            </Paragraph>
          </div>
        </section>

        <section className="aboutSection">
          <div className="aboutSectionIntro">
            <span className="aboutSectionIndex">03</span>
            <Title level={2} className="sectionTitle aboutSectionTitle">
              Why expand beyond one classroom
            </Title>
          </div>
          <div className="aboutSectionContent">
            <Paragraph className="bodyCopy aboutBody">
              Today, Proxim Learning Network extends this philosophy beyond a
              single classroom.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              PLN connects students with trusted tutors across the community —
              including experienced educators and capable senior students.
            </Paragraph>
            <Paragraph className="bodyCopy aboutBody">
              By creating an open and transparent tutoring marketplace, PLN aims
              to:
            </Paragraph>
            <ul className="aboutList">
              <li>Improve access to quality support</li>
              <li>Encourage healthy competition</li>
              <li>Maintain high standards</li>
              <li>Help families find the right fit</li>
            </ul>
            <Paragraph className="bodyCopy aboutBody">
              Learning moves forward when knowledge is shared.
            </Paragraph>
          </div>
        </section>

        <section className="ctaBand aboutCta">
          <Title level={3} className="aboutCtaTitle">
            Ready to get started?
          </Title>
          <Paragraph className="aboutBody aboutCtaBody">
            Find the right tutor or apply to join the network.
          </Paragraph>
          <div className="aboutCtaActions">
            <Link href="/tutors">
              <Button type="primary">Find Tutors</Button>
            </Link>
            <Link href="/become-a-tutor">
              <Button>Apply as Tutor</Button>
            </Link>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
