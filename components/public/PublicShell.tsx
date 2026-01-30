'use client';

import React from 'react';
import { Layout } from 'antd';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

const { Content } = Layout;

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PublicHeader />
      <Content style={{ padding: 24, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        {children}
      </Content>
      <PublicFooter />
    </Layout>
  );
}