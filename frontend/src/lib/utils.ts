export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return 'N/A';
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString('en-IN');
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getCollegeTypeColor(type: string): string {
  switch (type) {
    case 'GOVERNMENT': return 'var(--color-success)';
    case 'PRIVATE': return 'var(--color-info)';
    case 'DEEMED': return 'var(--color-warning)';
    default: return 'var(--color-text-secondary)';
  }
}

export function getCollegeTypeLabel(type: string): string {
  switch (type) {
    case 'GOVERNMENT': return 'Government';
    case 'PRIVATE': return 'Private';
    case 'DEEMED': return 'Deemed';
    default: return type;
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
