'use client';

import { Layout } from 'antd';

const { Footer } = Layout;

export function PublicFooter() {
  return (
    <Footer className="publicFooter" style={{ textAlign: 'center' }}>
      Proxim Learning Network (PLN) © {new Date().getFullYear()}
    </Footer>
  );
}
