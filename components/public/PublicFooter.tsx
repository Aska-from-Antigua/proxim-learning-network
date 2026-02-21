'use client';

import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <Footer className="publicFooter">
      <div className="footerInner">
        <div className="footerMeta">
          <Text className="footerBrand">Proxim Learning Network</Text>
          <Text type="secondary" className="footerTagline">
            Local tutoring network for steady academic growth.
          </Text>
        </div>
        <Text type="secondary">© {year} PLN. All rights reserved.</Text>
      </div>
    </Footer>
  );
}
