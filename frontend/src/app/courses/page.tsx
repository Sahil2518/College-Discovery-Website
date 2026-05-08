'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';

export default function CoursesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.getCourses({ page: 1, limit: 50 }),
  });
  const courses = data?.data || [];
  return (
    <div className="page">
      <div className="container">
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📚 Explore Courses</h1>
        <p className="text-muted" style={{ marginBottom: 24 }}>Browse courses across all colleges</p>
        {isLoading ? <Loader /> : courses.length === 0 ? <EmptyState title="No courses" icon="📚" /> : (
          <div className="grid-2">
            {courses.map((c: any) => (
              <div key={c.id} className="card">
                <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{c.name}</h3>
                <p className="text-sm text-muted" style={{ marginBottom: 8 }}>{c.description}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: 13, color: 'var(--color-text-secondary)', flexWrap: 'wrap' }}>
                  <span>📂 {c.stream}</span>
                  <span>⏱️ {c.durationYears}y</span>
                  <span>🏛️ {c._count?.colleges || 0} colleges</span>
                </div>
                <Link href={`/colleges?course=${encodeURIComponent(c.name)}`} className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>View Colleges →</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
