import Link from 'next/link'
import { RUNES, FULL_GRAPH } from '@/data/runes'
import { RuneCard } from '@/components/ui/RuneCard'

export default function Home() {
  const stats = [
    { value: RUNES.length, label: 'Runes' },
    { value: FULL_GRAPH.nodes.length, label: 'Skills' },
    { value: FULL_GRAPH.edges.length, label: 'Connections' },
    { value: '∞', label: 'Possibilities' },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '100px', padding: '0.35rem 1rem', fontSize: '0.8rem', color: '#8B5CF6', marginBottom: '2rem' }}>
          🔮 Free & Open Source · 완전 무료
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 1rem' }}>
          <span style={{ color: '#E2E2E8' }}>Inscribe.</span>{' '}
          <span style={{ color: '#8B5CF6' }}>Invoke.</span>{' '}
          <span style={{ color: '#F59E0B' }}>Trust.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#888', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          See how AI skills connect. Build verified workflows. Share with the world.
        </p>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '2.5rem', fontStyle: 'italic' }}>
          Skills are ingredients. Runes are recipes. Graph is the map.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/runes" style={{ padding: '0.75rem 1.75rem', background: '#8B5CF6', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}>
            Explore Runes →
          </Link>
          <Link href="/graph" style={{ padding: '0.75rem 1.75rem', background: 'transparent', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
            View Graph
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '2rem', flexWrap: 'wrap', borderTop: '1px solid #1a1a24', borderBottom: '1px solid #1a1a24', background: '#0D0D15' }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8B5CF6' }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Featured Runes */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#E2E2E8', margin: 0 }}>Featured Runes</h2>
          <Link href="/runes" style={{ color: '#8B5CF6', textDecoration: 'none', fontSize: '0.875rem' }}>View all {RUNES.length} →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {RUNES.slice(0, 6).map(r => <RuneCard key={r.id} rune={r} />)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '4rem 2rem', borderTop: '1px solid #1a1a24' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#E2E2E8', marginBottom: '1rem' }}>Explore the Skill Graph</h2>
        <p style={{ color: '#888', marginBottom: '2rem' }}>See how all 41 skills connect across 10 Runes</p>
        <Link href="/graph" style={{ padding: '0.75rem 2rem', background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          Open Graph Explorer →
        </Link>
      </section>
    </div>
  )
}
