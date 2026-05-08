export default function EmptyState({ title = 'No results found', message = 'Try adjusting your filters or search query.', icon = '🔍' }: { title?: string; message?: string; icon?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, gap: 12 }}>
      <span style={{ fontSize: 48 }}>{icon}</span>
      <h3 style={{ fontSize: 18, fontWeight: 600 }}>{title}</h3>
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}
