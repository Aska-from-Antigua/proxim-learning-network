'use client';

import { Layout } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

type NavItem = {
  href: string;
  key: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/about', key: 'about', label: 'About' },
  { href: '/tutors', key: 'tutors', label: 'Find a Tutor' },
  { href: '/become-a-tutor', key: 'become-a-tutor', label: 'Become a Tutor' },
  { href: '/testimonials', key: 'testimonials', label: 'Testimonials' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <Header className="publicHeader">
      <div className="headerInner" style={{ display: 'flex' }}>
        <Link href="/" className="brandMark" aria-label="Proxim home">
          <span className="brandText">PLN</span>
        </Link>

        <nav
          className="headerNav"
          aria-label="Primary"
          style={{ display: 'flex' }}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`headerLink ${isActive(pathname, item.href) ? 'isActive' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </Header>
  );
}
