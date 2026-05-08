export default function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, gap: 16 }}>
      <div style={{
        width: 40, height: 40, border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p className="text-sm text-muted">{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
