'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const links = [
    { href: '/colleges', label: 'Colleges' },
    { href: '/courses', label: 'Courses' },
    { href: '/exams', label: 'Exams' },
    { href: '/compare', label: 'Compare' },
    { href: '/saved', label: 'Saved' },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          🎓 <span>CollegeScope</span>
        </Link>
        <nav className="header-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || pathname?.startsWith(link.href + '/') ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
