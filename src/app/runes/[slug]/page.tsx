import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RUNES, type Rune } from '@/data/runes'
import { PipelineGraph } from '@/components/graph/PipelineGraph'

type Params = Promise<{ slug: string }>

const CATEGORY_LABELS: Record<string, string> = {
  input:  'Input',
  api:    'API',
  llm:    'LLM',
  output: 'Output',
}

const CATEGORY_COLORS: Record<string, string> = {
  input:  '#7aa2f7',
  api:    '#9ece6a',
  llm:    '#bb9af7',
  output: '#ff9e64',
}

// RPG corner bracket helper
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const s: React.CSSProperties = {
    position: 'absolute', width: 10, height: 10, opacity: 0.5,
    top:    pos.startsWith('t') ? 5 : undefined,
    bottom: pos.startsWith('b') ? 5 : undefined,
    left:   pos.endsWith('l')   ? 5 : undefined,
    right:  pos.endsWith('r')   ? 5 : undefined,
    borderTop:    pos.startsWith('t') ? '1.5px solid #bb9af7' : undefined,
    borderBottom: pos.startsWith('b') ? '1.5px solid #bb9af7' : undefined,
    borderLeft:   pos.endsWith('l')   ? '1.5px solid #bb9af7' : undefined,
    borderRight:  pos.endsWith('r')   ? '1.5px solid #bb9af7' : undefined,
  }
  return <div style={s} />
}

export default async function RuneDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const rune = RUNES.find((r: Rune) => r.slug === slug)
  if (!rune) notFound()

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      {/* Back */}
      <Link href="/runes" style={{ color: '#bb9af7', textDecoration: 'none', fontSize: '0.9rem', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>← Runes</Link>

      {/* Header */}
      <div style={{ marginTop: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.85rem' }}>
          {/* Emoji with glow */}
          <div style={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'radial-gradient(circle, rgba(187,154,247,0.2) 0%, transparent 70%)', border: '1px solid rgba(187,154,247,0.2)', flexShrink: 0, fontSize: '1.75rem' }}>
            {rune.emoji}
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#bb9af7', background: 'rgba(187,154,247,0.12)', border: '1px solid rgba(187,154,247,0.3)', padding: '0.2rem 0.75rem', borderRadius: '999px', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.05em' }}>
              {rune.category}
            </span>
          </div>
        </div>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#c0caf5', lineHeight: 1.2, fontFamily: "'Cinzel', serif", letterSpacing: '0.03em' }}>{rune.name}</h1>
        <p style={{ color: '#9aa5ce', marginTop: '0.6rem', marginBottom: 0, maxWidth: '760px', lineHeight: 1.6, fontSize: '0.95rem' }}>{rune.purpose}</p>
      </div>

      {/* 3 info cards */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '1.5rem' }}>
        {/* Use Case */}
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          <h2 style={{ marginTop: 0, color: '#c0caf5', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 700, marginBottom: '0.75rem' }}>Use Case</h2>
          <p style={{ margin: 0, color: '#9aa5ce', lineHeight: 1.65, fontSize: '0.875rem' }}>{rune.useCase}</p>
        </section>

        {/* Skill Pipeline */}
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          <h2 style={{ marginTop: 0, color: '#c0caf5', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 700, marginBottom: '0.75rem' }}>
            Skill Pipeline <span style={{ color: '#565f89', fontSize: '0.75rem', fontWeight: 400 }}>({rune.nodes.length} nodes)</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {rune.nodes.map((node, i) => (
              <div key={node.id} style={{ fontSize: '0.83rem', color: '#a9b1d6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#ddd' }}>{i + 1}. {node.label}</span>
                <span style={{
                  color: CATEGORY_COLORS[node.category] || '#a9b1d6',
                  fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace",
                  background: `${CATEGORY_COLORS[node.category] || '#a9b1d6'}18`,
                  border: `1px solid ${CATEGORY_COLORS[node.category] || '#a9b1d6'}35`,
                  padding: '1px 6px', borderRadius: '3px', whiteSpace: 'nowrap', flexShrink: 0,
                }}>{CATEGORY_LABELS[node.category] || node.category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Dependencies */}
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          <h2 style={{ marginTop: 0, color: '#c0caf5', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 700, marginBottom: '0.75rem' }}>
            Dependencies <span style={{ color: '#565f89', fontSize: '0.75rem', fontWeight: 400 }}>({rune.edges.length})</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {rune.edges.map((e, i) => (
              <div key={`${e.source}-${e.target}-${i}`} style={{ fontSize: '0.8rem', color: '#a9b1d6', lineHeight: 1.4 }}>
                <span style={{ color: '#7aa2f7', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>{e.source}</span>
                <span style={{ margin: '0 0.3rem', color: '#565f89' }}>→</span>
                <span style={{ color: '#ff9e64', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>{e.target}</span>
                <span style={{ marginLeft: '0.3rem', color: '#565f89', fontSize: '0.72rem' }}>· {e.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Pipeline Graph */}
      <section style={{ background: '#1a1b26', border: '1px solid #292e42', borderRadius: '12px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#c0caf5', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 700 }}>Pipeline Graph</h2>
        <PipelineGraph rune={rune} />
      </section>
    </div>
  )
}
