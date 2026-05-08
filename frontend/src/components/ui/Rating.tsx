export default function Rating({ value, max = 5 }: { value: number; max?: number }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(value)) stars.push('★');
    else if (i - 0.5 <= value) stars.push('★');
    else stars.push('☆');
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ color: 'var(--color-gold)', fontSize: 14, letterSpacing: 1 }}>{stars.join('')}</span>
      <span style={{ color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }}>{value.toFixed(1)}</span>
    </span>
  );
}
