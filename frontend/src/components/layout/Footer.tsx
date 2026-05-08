import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="header-logo" style={{ marginBottom: 12 }}>🎓 <span>CollegeScope</span></div>
            <p className="text-sm text-muted" style={{ maxWidth: 300 }}>
              Making college discovery simple, structured, and decision-focused.
              Compare, explore, and find your perfect institution.
            </p>
          </div>
          <div>
            <div className="footer-title">Explore</div>
            <div className="footer-links">
              <Link href="/colleges">All Colleges</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/exams">Exams</Link>
              <Link href="/compare">Compare Tool</Link>
            </div>
          </div>
          <div>
            <div className="footer-title">Quick Links</div>
            <div className="footer-links">
              <Link href="/saved">Saved Colleges</Link>
              <Link href="/colleges?type=GOVERNMENT">Govt Colleges</Link>
              <Link href="/colleges?type=PRIVATE">Private Colleges</Link>
            </div>
          </div>
          <div>
            <div className="footer-title">Top Streams</div>
            <div className="footer-links">
              <Link href="/colleges?course=Engineering">Engineering</Link>
              <Link href="/colleges?course=Medical">Medical</Link>
              <Link href="/colleges?course=Management">Management</Link>
              <Link href="/colleges?course=Law">Law</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} CollegeScope. Built for smarter decisions.
        </div>
      </div>
    </footer>
  );
}
