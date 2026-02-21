import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RUNES, type Rune } from '@/data/runes'
import { PipelineGraph } from '@/components/graph/PipelineGraph'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{}>

const CATEGORY_LABELS = {
  input: 'Input',
  api: 'API',
  llm: 'LLM',
  output: 'Output',
}

export default async function RuneDetailPage({
  params,
}: {
  params: Params
  searchParams?: SearchParams
}) {
  const { slug } = await params
  const rune = RUNES.find((r: Rune) => r.slug === slug)

  if (!rune) {
    notFound()
  }

  const edgeSummary = rune.edges

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <Link href="/runes" style={{ color: '#8B5CF6', textDecoration: 'none', fontSize: '0.85rem' }}>← Runes</Link>
      <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)' }}>
            <span style={{ fontSize: '1.75rem' }}>{rune.emoji}</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#8B5CF6', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.35)', padding: '0.2rem 0.7rem', borderRadius: '999px' }}>
            {rune.category}
          </span>
        </div>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#E2E2E8', lineHeight: 1.2, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>{rune.name}</h1>
        <p style={{ color: '#888', marginTop: '0.6rem', marginBottom: 0, maxWidth: '760px', lineHeight: 1.6 }}>{rune.purpose}</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '1.5rem' }}>
        <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '10px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <h2 style={{ marginTop: 0, color: '#E2E2E8', fontSize: '1rem' }}>Use Case</h2>
          <p style={{ margin: 0, color: '#888', lineHeight: 1.6, fontSize: '0.9rem' }}>{rune.useCase}</p>
        </section>
        <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '10px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <h2 style={{ marginTop: 0, color: '#E2E2E8', fontSize: '1rem' }}>Skill Pipeline ({rune.nodes.length} nodes)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {rune.nodes.map((node, index) => (
              <div key={node.id} style={{ fontSize: '0.88rem', color: '#C9C9D6', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span style={{ color: '#ddd' }}>{index + 1}. {node.label}</span>
                <span style={{ color: '#8B5CF6', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{CATEGORY_LABELS[node.category]}</span>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '10px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
          <h2 style={{ marginTop: 0, color: '#E2E2E8', fontSize: '1rem' }}>Dependencies ({edgeSummary.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {edgeSummary.map((e, index) => (
              <div key={`${e.source}-${e.target}-${index}`} style={{ fontSize: '0.84rem', color: '#A8A8B8' }}>
                <span style={{ color: '#8B5CF6' }}>{e.source}</span>
                <span style={{ margin: '0 0.4rem' }}>→</span>
                <span style={{ color: '#F59E0B' }}>{e.target}</span>
                <span style={{ marginLeft: '0.35rem', color: '#666' }}>· {e.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section style={{ background: '#0A0A0F', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1rem 1rem 0.2rem', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.5 }} />
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#E2E2E8', fontSize: '1rem' }}>Pipeline Graph</h2>
        <PipelineGraph rune={rune} />
      </section>
    </div>
  )
}
