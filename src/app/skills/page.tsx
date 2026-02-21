import { CATEGORY_COLORS, FULL_GRAPH, HUB_SKILLS, RUNES, type Rune } from '@/data/runes'

const skills = FULL_GRAPH.nodes
const runeById = Object.fromEntries(RUNES.map((r: Rune) => [r.id, r.name])) as Record<string, string>
const skillByRune = FULL_GRAPH.nodes.map((node) => {
  const connectedRunes = Array.from(
    new Set(
      FULL_GRAPH.edges
        .filter((edge) => edge.source === node.id || edge.target === node.id)
        .map((edge) => edge.rune)
        .filter((id): id is string => Boolean(id))
        .map((id) => runeById[id] ?? id)
    )
  )
  return {
    ...node,
    count: node.id.startsWith('llm-') || node.id.includes('summarize')
      ? FULL_GRAPH.edges.filter((edge) => edge.source === node.id || edge.target === node.id).length + 1
      : FULL_GRAPH.edges.filter((edge) => edge.source === node.id || edge.target === node.id).length,
    connectedRunes,
    isHub: HUB_SKILLS.includes(node.id),
  }
})

const byCategory = {
  input: skillByRune.filter((s) => s.category === 'input'),
  api: skillByRune.filter((s) => s.category === 'api'),
  llm: skillByRune.filter((s) => s.category === 'llm'),
  output: skillByRune.filter((s) => s.category === 'output'),
}

const totalSkills = skills.length

export default function SkillsPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', marginBottom: '0.5rem' }}>Skills Encyclopedia</h1>
        <p style={{ color: '#888', margin: 0, lineHeight: 1.6 }}>
          전체 {totalSkills}개 스킬을 카테고리별로 정리했습니다. Hub 스킬은 여러 Rune에서 핵심적으로 재사용되는 노드입니다.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
        {Object.entries(byCategory).map(([category, group]) => (
          <div key={category} style={{ border: '1px solid #2A2A35', borderRadius: '10px', background: '#13131A', padding: '1rem' }}>
            <h2 style={{ margin: 0, color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS], fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{category}</h2>
            <div style={{ marginTop: '0.75rem', color: '#ddd', fontSize: '0.9rem' }}>{group.length} skills</div>
            <div style={{ marginTop: '0.55rem', color: '#777', fontSize: '0.78rem' }}>핵심 연결: {group.reduce((sum, item) => sum + item.count, 0)}개</div>
          </div>
        ))}
      </div>

      <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1rem' }}>
        <h2 style={{ marginTop: 0, color: '#E2E2E8', fontSize: '1.05rem' }}>전체 목록</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {skillByRune.map((skill) => (
            <article key={skill.id} style={{ border: '1px solid #262636', borderRadius: '8px', padding: '0.85rem', background: '#0F0F15' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: '#E2E2E8', fontWeight: 600 }}>{skill.label}</div>
                  <div style={{ marginTop: '0.25rem', color: '#888', fontSize: '0.78rem' }}>id: {skill.id}</div>
                </div>
                <div style={{ color: CATEGORY_COLORS[skill.category], fontSize: '0.76rem', fontWeight: 700 }}>
                  {skill.isHub && '⭐ HUB · '}
                  {skill.connectedRunes.length} Rune 포함
                </div>
              </div>
              <div style={{ marginTop: '0.55rem', color: '#666', fontSize: '0.76rem' }}>
                {skill.connectedRunes.length ? skill.connectedRunes.join(', ') : '미사용'}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
