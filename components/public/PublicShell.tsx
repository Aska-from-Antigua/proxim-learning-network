'use client';

import React from 'react';
import { Layout } from 'antd';
import { PublicHeader } from './PublicHeader';

const { Content } = Layout;

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="publicShell">
      <PublicHeader />
      <Content className="publicContent">{children}</Content>
    </Layout>
  );
}
