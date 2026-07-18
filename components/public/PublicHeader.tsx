'use client';

import { Layout } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const innerRef = useRef<HTMLDivElement>(null);
  const [moreRight, setMoreRight] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) {
      return;
    }

    const update = () => {
      setMoreRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 1);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const active = innerRef.current?.querySelector<HTMLElement>(
      '.headerLink.isActive',
    );
    active?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [pathname]);

  return (
    <Header className={`publicHeader ${moreRight ? 'navHasMore' : ''}`}>
      <div ref={innerRef} className="headerInner" style={{ display: 'flex' }}>
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
