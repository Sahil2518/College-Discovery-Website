'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import Rating from '@/components/ui/Rating';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency, getCollegeTypeLabel } from '@/lib/utils';
import Link from 'next/link';

export default function CollegeDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const [activeTab, setActiveTab] = useState('overview');

  const { data, isLoading, error } = useQuery({
    queryKey: ['college', id],
    queryFn: () => api.getCollege(id),
    enabled: !!id,
  });

  if (isLoading) return <div className="page container"><Loader text="Loading college details..." /></div>;
  if (error || !data?.data) return <div className="page container"><EmptyState title="College not found" icon="🏫" /></div>;

  const college = data.data;
  const tabs = ['overview', 'courses', 'placements', 'reviews'];

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="card-flat animate-fadeIn" style={{ padding: 32, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, fontWeight: 700, color: 'white', flexShrink: 0,
            }}>{college.name.charAt(0)}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{college.name}</h1>
              <p className="text-muted" style={{ marginBottom: 12 }}>📍 {college.city}, {college.state} {college.address ? `• ${college.address}` : ''}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <Rating value={college.rating} />
                <span className="text-sm text-muted">({college.totalReviews} reviews)</span>
                <span className="badge badge-success">{getCollegeTypeLabel(college.type)}</span>
                {college.establishedYear && <span className="badge">Est. {college.establishedYear}</span>}
                {college.affiliation && <span className="badge badge-info">{college.affiliation}</span>}
                {college.approval && <span className="badge badge-warning">{college.approval}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href={`/compare?ids=${college.id}`} className="btn btn-secondary btn-sm">⚖️ Compare</Link>
              {college.websiteUrl && <a href={college.websiteUrl} target="_blank" rel="noopener" className="btn btn-primary btn-sm">🌐 Website</a>}
            </div>
          </div>
        </div>

        {/* Rankings */}
        {college.rankings?.length > 0 && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            {college.rankings.map((r: any) => (
              <div key={r.id} className="card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>🏆</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-gold)' }}>#{r.rank}</div>
                  <div className="text-sm text-muted">{r.body} {r.year}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 24 }}>
          {tabs.map((tab) => (
            <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 'overview' && (
            <div>
              {college.description && (
                <div className="card-flat" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>About</h3>
                  <p className="text-muted" style={{ lineHeight: 1.8 }}>{college.description}</p>
                </div>
              )}
              <div className="grid-2" style={{ marginBottom: 20 }}>
                {[
                  { label: 'Type', value: getCollegeTypeLabel(college.type), icon: '🏛️' },
                  { label: 'Established', value: college.establishedYear || 'N/A', icon: '📅' },
                  { label: 'City', value: college.city, icon: '🏙️' },
                  { label: 'State', value: college.state, icon: '📍' },
                  { label: 'Affiliation', value: college.affiliation || 'N/A', icon: '🎓' },
                  { label: 'Approval', value: college.approval || 'N/A', icon: '✅' },
                  { label: 'Contact', value: college.contactEmail || 'N/A', icon: '📧' },
                  { label: 'Phone', value: college.contactPhone || 'N/A', icon: '📞' },
                ].map((item) => (
                  <div key={item.label} className="card-flat" style={{ padding: 16, display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div className="text-sm text-muted">{item.label}</div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              {college.admissionProcess && (
                <div className="card-flat">
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Admission Process</h3>
                  <p className="text-muted">{college.admissionProcess}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              {college.courses?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {college.courses.map((cc: any) => (
                    <div key={cc.id} className="card-flat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{cc.course.name}</h4>
                        <p className="text-sm text-muted">
                          {cc.course.stream} • {cc.course.durationYears} years • {cc.course.level}
                        </p>
                        {cc.eligibility && <p className="text-sm text-muted" style={{ marginTop: 4 }}>Eligibility: {cc.eligibility || cc.course.eligibility}</p>}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-primary-light)' }}>{cc.fee ? formatCurrency(cc.fee) : 'N/A'}</div>
                        {cc.seats && <div className="text-sm text-muted">{cc.seats} seats</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : <EmptyState title="No courses listed" icon="📚" />}
            </div>
          )}

          {activeTab === 'placements' && (
            <div>
              {college.placements?.length > 0 ? (
                college.placements.map((p: any) => (
                  <div key={p.id} className="card-flat" style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Placements {p.year}</h3>
                    <div className="grid-4" style={{ marginBottom: 16 }}>
                      {[
                        { label: 'Highest Package', value: formatCurrency(p.highestPackage), icon: '🚀' },
                        { label: 'Average Package', value: formatCurrency(p.avgPackage), icon: '💼' },
                        { label: 'Median Package', value: formatCurrency(p.medianPackage), icon: '📊' },
                        { label: 'Placement Rate', value: p.placementRate ? `${p.placementRate}%` : 'N/A', icon: '📈' },
                      ].map((item) => (
                        <div key={item.label} style={{ textAlign: 'center', padding: 16, background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
                          <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
                          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-primary-light)' }}>{item.value}</div>
                          <div className="text-sm text-muted">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    {p.topRecruiters?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold" style={{ marginBottom: 8 }}>Top Recruiters</h4>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {p.topRecruiters.map((r: string) => <span key={r} className="badge">{r}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : <EmptyState title="No placement data" icon="💼" />}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {college.reviews?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {college.reviews.map((r: any) => (
                    <div key={r.id} className="card-flat">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 600 }}>
                            {r.user.name.charAt(0)}
                          </div>
                          <span style={{ fontWeight: 500 }}>{r.user.name}</span>
                        </div>
                        <Rating value={r.rating} />
                      </div>
                      <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{r.title}</h4>
                      <p className="text-sm text-muted">{r.content}</p>
                    </div>
                  ))}
                </div>
              ) : <EmptyState title="No reviews yet" icon="💬" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
