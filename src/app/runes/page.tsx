import { RUNES } from '@/data/runes'
import { RuneCard } from '@/components/ui/RuneCard'

const CATEGORIES = ['All', ...Array.from(new Set(RUNES.map(r => r.category)))]

export default function RunesPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', marginBottom: '0.5rem' }}>🔮 Rune Catalog</h1>
        <p style={{ color: '#888', fontSize: '0.95rem' }}>Verified skill orchestration workflows. Free to use, forever.</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <span key={cat} style={{ padding: '0.35rem 0.9rem', borderRadius: '6px', fontSize: '0.8rem', background: cat === 'All' ? '#8B5CF6' : '#13131A', color: cat === 'All' ? '#fff' : '#888', border: '1px solid', borderColor: cat === 'All' ? '#8B5CF6' : '#2A2A35', cursor: 'pointer' }}>{cat}</span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {RUNES.map(r => <RuneCard key={r.id} rune={r} />)}
      </div>
    </div>
  )
}
