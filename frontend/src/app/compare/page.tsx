'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import SearchBar from '@/components/ui/SearchBar';
import CompareTable from '@/components/compare/CompareTable';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import { useDebounce } from '@/hooks/useDebounce';

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data: searchResults } = useQuery({
    queryKey: ['searchColleges', debouncedSearch],
    queryFn: () => api.searchColleges(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
  });

  const { data: compareData, isLoading: isComparing, refetch } = useQuery({
    queryKey: ['compare', selectedIds],
    queryFn: () => api.compareColleges(selectedIds),
    enabled: selectedIds.length >= 2,
  });

  const addCollege = (id: number) => {
    if (selectedIds.length >= 3 || selectedIds.includes(id)) return;
    setSelectedIds((prev) => [...prev, id]);
    setSearch('');
  };

  const removeCollege = (id: number) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const colleges = compareData?.data || [];
  const suggestions = searchResults?.data || [];

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>⚖️ Compare Colleges</h1>
          <p className="text-muted">Select 2-3 colleges to compare side by side</p>
        </div>

        {/* College Selector */}
        {selectedIds.length < 3 && (
          <div style={{ marginBottom: 32, position: 'relative', maxWidth: 500 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search to add a college..." />
            {suggestions.length > 0 && search.length >= 2 && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)', marginTop: 4, maxHeight: 300, overflowY: 'auto',
                boxShadow: 'var(--shadow-lg)',
              }}>
                {suggestions.filter((s: any) => !selectedIds.includes(s.id)).map((college: any) => (
                  <button
                    key={college.id}
                    onClick={() => addCollege(college.id)}
                    style={{
                      width: '100%', padding: '12px 16px', background: 'none', border: 'none',
                      color: 'var(--color-text)', textAlign: 'left', cursor: 'pointer',
                      borderBottom: '1px solid var(--color-border-light)',
                      display: 'flex', alignItems: 'center', gap: 12,
                      transition: 'background var(--transition)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 6,
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 700, color: 'white', flexShrink: 0,
                    }}>{college.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{college.name}</div>
                      <div className="text-sm text-muted">{college.city}, {college.state}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Selected pills */}
        {selectedIds.length > 0 && selectedIds.length < 2 && (
          <div className="card-flat" style={{ padding: 20, marginBottom: 24, textAlign: 'center' }}>
            <p className="text-muted">Add {2 - selectedIds.length} more college{selectedIds.length === 0 ? 's' : ''} to compare</p>
          </div>
        )}

        {/* Compare Table */}
        {isComparing ? (
          <Loader text="Loading comparison..." />
        ) : colleges.length >= 2 ? (
          <div className="animate-fadeIn">
            <CompareTable colleges={colleges} onRemove={removeCollege} />
          </div>
        ) : selectedIds.length === 0 ? (
          <EmptyState title="No colleges selected" message="Search and add 2-3 colleges to start comparing" icon="⚖️" />
        ) : null}
      </div>
    </div>
  );
}
