'use client';
import { useState, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import SearchBar from '@/components/ui/SearchBar';
import CollegeCard from '@/components/college/CollegeCard';
import FiltersPanel from '@/components/filters/FiltersPanel';
import Pagination from '@/components/ui/Pagination';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';

function CollegesContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams?.get('search') || '',
    state: searchParams?.get('state') || '',
    type: searchParams?.get('type') || '',
    course: searchParams?.get('course') || '',
    minRating: searchParams?.get('minRating') || '',
    sortBy: searchParams?.get('sortBy') || 'rating_desc',
    page: 1,
    limit: 20,
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const queryParams = {
    ...filters,
    search: debouncedSearch,
    minRating: filters.minRating ? Number(filters.minRating) : undefined,
    state: filters.state || undefined,
    type: filters.type || undefined,
    course: filters.course || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['colleges', queryParams],
    queryFn: () => api.getColleges(queryParams as any),
  });

  const { data: statesData } = useQuery({
    queryKey: ['states'],
    queryFn: () => api.getStates(),
  });

  const { data: streamsData } = useQuery({
    queryKey: ['streams'],
    queryFn: () => api.getStreams(),
  });

  const colleges = data?.data || [];
  const meta = data?.meta;
  const states = statesData?.data || [];
  const streams = streamsData?.data || [];

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === 'page' ? value : 1 }));
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Explore Colleges</h1>
          <p className="text-muted">
            {meta ? `${meta.total} colleges found` : 'Discover your perfect college'}
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <SearchBar value={filters.search} onChange={(v) => handleFilterChange('search', v)} placeholder="Search by name, city, state..." />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
          {/* Filters Sidebar */}
          <div className="hide-mobile">
            <FiltersPanel filters={filters} onFilterChange={handleFilterChange} states={states} streams={streams} />
          </div>

          {/* Results */}
          <div>
            {isLoading ? (
              <Loader text="Finding colleges..." />
            ) : error ? (
              <EmptyState title="Something went wrong" message="Failed to load colleges. Please try again." icon="❌" />
            ) : colleges.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
                  {colleges.map((college: any) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
                {meta && <Pagination page={filters.page} totalPages={meta.totalPages} onPageChange={(p) => handleFilterChange('page', p)} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="page container"><Loader text="Loading colleges..." /></div>}>
      <CollegesContent />
    </Suspense>
  );
}
