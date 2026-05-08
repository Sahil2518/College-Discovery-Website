'use client';

interface FiltersPanelProps {
  filters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  states: string[];
  streams?: string[];
}

export default function FiltersPanel({ filters, onFilterChange, states, streams }: FiltersPanelProps) {
  return (
    <div className="card-flat" style={{ padding: 20 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>🎯 Filters</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 6 }}>State</label>
          <select className="select" style={{ width: '100%' }} value={filters.state || ''} onChange={(e) => onFilterChange('state', e.target.value)}>
            <option value="">All States</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 6 }}>College Type</label>
          <select className="select" style={{ width: '100%' }} value={filters.type || ''} onChange={(e) => onFilterChange('type', e.target.value)}>
            <option value="">All Types</option>
            <option value="GOVERNMENT">Government</option>
            <option value="PRIVATE">Private</option>
            <option value="DEEMED">Deemed</option>
          </select>
        </div>

        {streams && (
          <div>
            <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 6 }}>Course Stream</label>
            <select className="select" style={{ width: '100%' }} value={filters.course || ''} onChange={(e) => onFilterChange('course', e.target.value)}>
              <option value="">All Streams</option>
              {streams.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        <div>
          <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 6 }}>Min Rating</label>
          <select className="select" style={{ width: '100%' }} value={filters.minRating || ''} onChange={(e) => onFilterChange('minRating', e.target.value)}>
            <option value="">Any Rating</option>
            <option value="4.5">4.5+ ★</option>
            <option value="4.0">4.0+ ★</option>
            <option value="3.5">3.5+ ★</option>
            <option value="3.0">3.0+ ★</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 6 }}>Sort By</label>
          <select className="select" style={{ width: '100%' }} value={filters.sortBy || ''} onChange={(e) => onFilterChange('sortBy', e.target.value)}>
            <option value="rating_desc">Rating (High → Low)</option>
            <option value="rating_asc">Rating (Low → High)</option>
            <option value="name_asc">Name (A → Z)</option>
            <option value="name_desc">Name (Z → A)</option>
            <option value="established_desc">Newest First</option>
          </select>
        </div>

        <button
          className="btn btn-ghost btn-sm"
          style={{ marginTop: 4 }}
          onClick={() => {
            onFilterChange('state', '');
            onFilterChange('type', '');
            onFilterChange('course', '');
            onFilterChange('minRating', '');
            onFilterChange('sortBy', 'rating_desc');
          }}
        >
          ✕ Clear All Filters
        </button>
      </div>
    </div>
  );
}
