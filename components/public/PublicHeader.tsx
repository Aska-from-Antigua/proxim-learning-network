'use client';

import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Header } = Layout;

export function PublicHeader() {
  return (
    <Header className="publicHeader" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ color: 'white', fontWeight: 700, marginRight: 24 }}>
        PLN
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        items={[
          { key: 'tutors', label: <Link href="/tutors">Find a tutor</Link> },
          { key: 'how', label: <Link href="/#how">How it works</Link> },
        ]}
        style={{ flex: 1 }}
      />
    </Header>
  );
}
