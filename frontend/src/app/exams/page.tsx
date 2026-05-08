'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';

export default function ExamsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: () => api.getExams({ page: 1, limit: 50 }),
  });
  const exams = data?.data || [];
  return (
    <div className="page">
      <div className="container">
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📝 Entrance Exams</h1>
        <p className="text-muted" style={{ marginBottom: 24 }}>Key entrance exams for college admissions</p>
        {isLoading ? <Loader /> : exams.length === 0 ? <EmptyState title="No exams" icon="📝" /> : (
          <div className="grid-2">
            {exams.map((e: any) => (
              <div key={e.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 16 }}>{e.name}</h3>
                  <span className="badge badge-primary">{e.type}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 8 }}>{e.fullName}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--color-text-muted)' }}>
                  <span>🏢 {e.conductingBody}</span>
                  {e.examDate && <span>📅 Exam: {new Date(e.examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                  <span>🏛️ {e._count?.colleges || 0} colleges accept this exam</span>
                </div>
                {e.eligibility && <p className="text-sm text-muted" style={{ marginTop: 8 }}>Eligibility: {e.eligibility}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
