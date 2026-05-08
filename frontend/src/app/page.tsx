'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';
import SearchBar from '@/components/ui/SearchBar';
import Rating from '@/components/ui/Rating';
import Loader from '@/components/ui/Loader';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const [search, setSearch] = useState('');

  const { data: statsData } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.getStats(),
  });

  const { data: topColleges, isLoading } = useQuery({
    queryKey: ['topColleges'],
    queryFn: () => api.getColleges({ sortBy: 'rating_desc', limit: 8, page: 1 }),
  });

  const stats = statsData?.data;
  const colleges = topColleges?.data || [];

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '80px 0 60px',
        background: 'linear-gradient(180deg, rgba(108,92,231,0.08) 0%, transparent 100%)',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            Find Your <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Perfect College</span>
          </h1>
          <p className="text-muted" style={{ fontSize: 18, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
            Compare colleges, explore courses, and make informed decisions about your higher education journey.
          </p>

          <div style={{ maxWidth: 640, margin: '0 auto 24px' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search colleges by name, city, or state..." />
            {search && (
              <Link href={`/colleges?search=${encodeURIComponent(search)}`} className="btn btn-primary" style={{ marginTop: 12 }}>
                Search Colleges →
              </Link>
            )}
          </div>

          {/* Quick Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {['Engineering', 'Medical', 'MBA', 'Law'].map((stream) => (
              <Link key={stream} href={`/colleges?course=${stream}`} className="btn btn-secondary btn-sm">
                {stream === 'Engineering' ? '⚙️' : stream === 'Medical' ? '🏥' : stream === 'MBA' ? '📊' : '⚖️'} {stream}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section style={{ padding: '40px 0' }}>
          <div className="container">
            <div className="grid-3" style={{ maxWidth: 600, margin: '0 auto' }}>
              {[
                { label: 'Colleges', value: stats.totalColleges, icon: '🏛️' },
                { label: 'Courses', value: stats.totalCourses, icon: '📚' },
                { label: 'Exams', value: stats.totalExams, icon: '📝' },
              ].map((stat) => (
                <div key={stat.label} className="card" style={{ textAlign: 'center', padding: 24 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-primary-light)' }}>{stat.value}+</div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Colleges */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>🏆 Top Rated Colleges</h2>
            <Link href="/colleges" className="btn btn-secondary btn-sm">View All →</Link>
          </div>

          {isLoading ? <Loader /> : (
            <div className="grid-2">
              {colleges.map((college: any) => (
                <Link key={college.id} href={`/colleges/${college.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card" style={{ display: 'flex', gap: 16 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, fontWeight: 700, color: 'white',
                    }}>{college.name.charAt(0)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{college.name}</h3>
                      <p className="text-sm text-muted" style={{ marginBottom: 6 }}>📍 {college.city}, {college.state}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Rating value={college.rating} />
                        <span className="badge badge-success" style={{ fontSize: 11 }}>{college.type === 'GOVERNMENT' ? 'Govt' : college.type === 'PRIVATE' ? 'Private' : 'Deemed'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '60px 0',
        background: 'linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,206,201,0.05))',
        borderTop: '1px solid var(--color-border-light)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to Compare?</h2>
          <p className="text-muted" style={{ marginBottom: 24 }}>Use our comparison tool to make data-driven decisions</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <Link href="/compare" className="btn btn-primary btn-lg">⚖️ Compare Colleges</Link>
            <Link href="/colleges" className="btn btn-secondary btn-lg">🔍 Explore All</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
