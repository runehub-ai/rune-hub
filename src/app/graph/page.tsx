import { FullGraph } from '@/components/graph/FullGraph'

export default function GraphPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', marginBottom: '0.5rem' }}>Full Skill Relationship Graph</h1>
        <p style={{ color: '#888', lineHeight: 1.6 }}>
          전체 스킬 생태계를 한 번에 탐색하세요. 카테고리를 토글하거나 Hub 스킬만 보여줘 흐름을 압축할 수 있습니다.
        </p>
      </div>

      <FullGraph />
    </div>
  )
}
