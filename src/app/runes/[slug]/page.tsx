import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RUNES, type Rune } from '@/data/runes'
import { PipelineGraph } from '@/components/graph/PipelineGraph'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{}>

const CATEGORY_LABELS = {
  input: '입력',
  api: '데이터/연동',
  llm: '추론',
  output: '출력',
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
          <span style={{ fontSize: '1.75rem' }}>{rune.emoji}</span>
          <span style={{ fontSize: '0.75rem', color: '#8B5CF6', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.35)', padding: '0.2rem 0.7rem', borderRadius: '999px' }}>
            {rune.category}
          </span>
        </div>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#E2E2E8', lineHeight: 1.2 }}>{rune.name}</h1>
        <p style={{ color: '#888', marginTop: '0.6rem', marginBottom: 0, maxWidth: '760px', lineHeight: 1.6 }}>{rune.purpose}</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '1.5rem' }}>
        <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '10px', padding: '1rem' }}>
          <h2 style={{ marginTop: 0, color: '#E2E2E8', fontSize: '1rem' }}>사용 사례</h2>
          <p style={{ margin: 0, color: '#888', lineHeight: 1.6, fontSize: '0.9rem' }}>{rune.useCase}</p>
        </section>
        <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '10px', padding: '1rem' }}>
          <h2 style={{ marginTop: 0, color: '#E2E2E8', fontSize: '1rem' }}>스킬 파이프라인 ({rune.nodes.length}개)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {rune.nodes.map((node, index) => (
              <div key={node.id} style={{ fontSize: '0.88rem', color: '#C9C9D6', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span style={{ color: '#ddd' }}>{index + 1}. {node.label}</span>
                <span style={{ color: '#8B5CF6', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{CATEGORY_LABELS[node.category]}</span>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '10px', padding: '1rem' }}>
          <h2 style={{ marginTop: 0, color: '#E2E2E8', fontSize: '1rem' }}>의존 연결 ({edgeSummary.length}개)</h2>
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

      <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1rem 1rem 0.2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#E2E2E8', fontSize: '1rem' }}>실행 그래프</h2>
        <PipelineGraph rune={rune} />
      </section>
    </div>
  )
}
