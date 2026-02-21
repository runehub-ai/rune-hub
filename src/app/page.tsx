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

      {/* What is a Rune? */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        {/* Section label */}
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#8B5CF6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          The Core Concept
        </p>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#E2E2E8', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          What is a Rune?
        </h2>
        <p style={{ textAlign: 'center', color: '#777', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 3.5rem', lineHeight: 1.7 }}>
          A Rune is a verified, composable AI workflow — a recipe that chains multiple skills together into one reliable, repeatable action.
        </p>

        {/* 3-column analogy cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(139,92,246,0.15)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(139,92,246,0.2)' }}>
          {/* Skill */}
          <div style={{ background: '#0D0D15', padding: '2rem 1.75rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🧪</div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#3B82F6', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Skill</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E2E2E8', marginBottom: '0.6rem' }}>The Ingredient</div>
            <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              A single, atomic capability — like <span style={{ color: '#aaa' }}>web-search</span>, <span style={{ color: '#aaa' }}>llm-summarize</span>, or <span style={{ color: '#aaa' }}>slack-notify</span>. Skills do one thing well.
            </p>
          </div>

          {/* Rune */}
          <div style={{ background: '#0D0D15', padding: '2rem 1.75rem', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔮</div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#8B5CF6', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Rune</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E2E2E8', marginBottom: '0.6rem' }}>The Recipe</div>
            <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              A verified multi-skill workflow — skills chained in sequence or parallel, with trust-scored security, ready to invoke with one command.
            </p>
          </div>

          {/* Graph */}
          <div style={{ background: '#0D0D15', padding: '2rem 1.75rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🗺️</div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#F59E0B', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Graph</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E2E2E8', marginBottom: '0.6rem' }}>The Map</div>
            <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              A visual map of how all skills connect — see which skills are reused across Runes, discover dependencies, and find your next build.
            </p>
          </div>
        </div>

        {/* Flow diagram: Skill → Rune → Output */}
        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
          {/* Skills cluster */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
            {['web-search', 'llm-summarize', 'notion-save'].map((s, i) => (
              <div key={s} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '6px', padding: '0.3rem 0.75rem', fontSize: '0.75rem', color: '#3B82F6', fontFamily: 'monospace', opacity: i === 1 ? 1 : 0.6 }}>
                {s}
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 1rem' }}>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, rgba(59,130,246,0.4), rgba(139,92,246,0.8))' }} />
            <div style={{ fontSize: '0.65rem', color: '#444', marginTop: '0.3rem' }}>compose</div>
          </div>

          {/* Rune */}
          <div style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '10px', padding: '0.6rem 1.25rem', textAlign: 'center', boxShadow: '0 0 20px rgba(139,92,246,0.15)' }}>
            <div style={{ fontSize: '1.25rem' }}>🔮</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8B5CF6', fontFamily: 'monospace' }}>deep-research</div>
            <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '0.2rem' }}>Trust Score 94</div>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 1rem' }}>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, rgba(139,92,246,0.8), rgba(245,158,11,0.4))' }} />
            <div style={{ fontSize: '0.65rem', color: '#444', marginTop: '0.3rem' }}>invoke</div>
          </div>

          {/* Output */}
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', padding: '0.5rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1rem' }}>📄</div>
            <div style={{ fontSize: '0.75rem', color: '#F59E0B', fontFamily: 'monospace' }}>notion-save</div>
          </div>
        </div>

        {/* Bottom tagline */}
        <p style={{ textAlign: 'center', color: '#444', fontSize: '0.8rem', marginTop: '2rem', fontStyle: 'italic' }}>
          Think npm for AI workflows — but every package is security-verified before it ships.
        </p>
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
