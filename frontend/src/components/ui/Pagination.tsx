'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const range = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - range && i <= page + range)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 32 }}>
      <button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        ← Prev
      </button>
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={i}
            className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onPageChange(p)}
            style={{ minWidth: 36 }}
          >{p}</button>
        ) : (
          <span key={i} style={{ color: 'var(--color-text-muted)', padding: '0 4px' }}>…</span>
        )
      )}
      <button className="btn btn-secondary btn-sm" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next →
      </button>
    </div>
  );
}
