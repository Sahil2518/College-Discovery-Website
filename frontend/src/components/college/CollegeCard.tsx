'use client';
import Link from 'next/link';
import Rating from '@/components/ui/Rating';
import { formatCurrency, getCollegeTypeLabel } from '@/lib/utils';

interface CollegeCardProps {
  college: any;
  onSave?: (id: number) => void;
  isSaved?: boolean;
}

export default function CollegeCard({ college, onSave, isSaved }: CollegeCardProps) {
  const topCourses = college.courses?.slice(0, 3).map((c: any) => c.course?.name || c.name) || [];
  const examsAccepted = college.exams?.slice(0, 3).map((e: any) => e.exam?.name || e.name) || [];
  const ranking = college.rankings?.[0];

  return (
    <div className="card animate-fadeIn" style={{ position: 'relative' }}>
      {onSave && (
        <button
          onClick={(e) => { e.preventDefault(); onSave(college.id); }}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', fontSize: 20, cursor: 'pointer',
            color: isSaved ? 'var(--color-accent)' : 'var(--color-text-muted)',
            transition: 'all var(--transition)',
          }}
          title={isSaved ? 'Remove from saved' : 'Save college'}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      )}

      <Link href={`/colleges/${college.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: 'white', flexShrink: 0,
          }}>
            {college.name?.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{college.name}</h3>
            <p className="text-sm text-muted">📍 {college.city}, {college.state}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <Rating value={college.rating || 0} />
          <span className="badge" style={{
            background: college.type === 'GOVERNMENT' ? 'rgba(0,184,148,0.15)' : college.type === 'PRIVATE' ? 'rgba(116,185,255,0.15)' : 'rgba(253,203,110,0.15)',
            color: college.type === 'GOVERNMENT' ? 'var(--color-success)' : college.type === 'PRIVATE' ? 'var(--color-info)' : 'var(--color-warning)',
            borderColor: 'transparent',
          }}>
            {getCollegeTypeLabel(college.type)}
          </span>
          {ranking && <span className="badge badge-primary">#{ranking.rank} {ranking.body}</span>}
          {college.establishedYear && <span className="text-sm text-muted">Est. {college.establishedYear}</span>}
        </div>

        {topCourses.length > 0 && (
          <div style={{ marginBottom: 8 }}>
            <span className="text-sm text-muted">Courses: </span>
            {topCourses.map((c: string, i: number) => (
              <span key={i} className="badge" style={{ marginRight: 4, marginBottom: 4, fontSize: 11 }}>{c}</span>
            ))}
          </div>
        )}

        {examsAccepted.length > 0 && (
          <div>
            <span className="text-sm text-muted">Exams: </span>
            {examsAccepted.map((e: string, i: number) => (
              <span key={i} style={{ fontSize: 13, color: 'var(--color-primary-light)' }}>{e}{i < examsAccepted.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
