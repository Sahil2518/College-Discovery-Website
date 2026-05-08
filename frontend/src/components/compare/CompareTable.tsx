'use client';
import { CompareCollege } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import Rating from '@/components/ui/Rating';

interface CompareTableProps {
  colleges: CompareCollege[];
  onRemove: (id: number) => void;
}

export default function CompareTable({ colleges, onRemove }: CompareTableProps) {
  if (colleges.length === 0) return null;

  const rows: { label: string; icon: string; render: (c: CompareCollege) => React.ReactNode }[] = [
    { label: 'Type', icon: '🏛️', render: (c) => c.type },
    { label: 'Location', icon: '📍', render: (c) => `${c.city}, ${c.state}` },
    { label: 'Established', icon: '📅', render: (c) => c.establishedYear || 'N/A' },
    { label: 'Rating', icon: '⭐', render: (c) => <Rating value={c.rating} /> },
    { label: 'Reviews', icon: '💬', render: (c) => c.totalReviews },
    { label: 'Courses', icon: '📚', render: (c) => c.totalCourses },
    { label: 'Fee Range', icon: '💰', render: (c) => c.feeRange.min ? `${formatCurrency(c.feeRange.min)} - ${formatCurrency(c.feeRange.max)}` : 'N/A' },
    { label: 'Highest Package', icon: '🚀', render: (c) => c.placement ? formatCurrency(c.placement.highestPackage) : 'N/A' },
    { label: 'Avg Package', icon: '💼', render: (c) => c.placement ? formatCurrency(c.placement.avgPackage) : 'N/A' },
    { label: 'Placement Rate', icon: '📊', render: (c) => c.placement ? `${c.placement.placementRate}%` : 'N/A' },
    { label: 'Ranking', icon: '🏆', render: (c) => c.ranking ? `#${c.ranking.rank} (${c.ranking.body})` : 'N/A' },
    { label: 'Exams Accepted', icon: '📝', render: (c) => c.examsAccepted.join(', ') || 'N/A' },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 14 }}>
        <thead>
          <tr>
            <th style={{ padding: '16px 20px', textAlign: 'left', background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm) 0 0 0', minWidth: 160 }}>
              Criteria
            </th>
            {colleges.map((c, i) => (
              <th key={c.id} style={{
                padding: '16px 20px', textAlign: 'center',
                background: 'var(--color-bg-elevated)',
                borderBottom: '1px solid var(--color-border)',
                borderRadius: i === colleges.length - 1 ? '0 var(--radius-sm) 0 0' : 0,
                minWidth: 200,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 700, color: 'white',
                  }}>{c.name.charAt(0)}</div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</span>
                  <button className="btn btn-ghost btn-sm" style={{ fontSize: 12, padding: '2px 8px' }} onClick={() => onRemove(c.id)}>✕ Remove</button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label}>
              <td style={{
                padding: '12px 20px', fontWeight: 500,
                background: i % 2 === 0 ? 'var(--color-bg-card)' : 'transparent',
                borderBottom: '1px solid var(--color-border-light)',
                color: 'var(--color-text-secondary)',
              }}>
                {row.icon} {row.label}
              </td>
              {colleges.map((c) => (
                <td key={c.id} style={{
                  padding: '12px 20px', textAlign: 'center',
                  background: i % 2 === 0 ? 'var(--color-bg-card)' : 'transparent',
                  borderBottom: '1px solid var(--color-border-light)',
                }}>
                  {row.render(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
