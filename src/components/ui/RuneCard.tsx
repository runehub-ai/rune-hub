 'use client'
import Link from 'next/link'
import { CATEGORY_COLORS, type Rune } from '@/data/runes'

export function RuneCard({ rune }: { rune: Rune }) {
  const skillCats = [...new Set(rune.nodes.map(n => n.category))]
  return (
    <Link href={`/runes/${rune.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px',
        padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s',
        display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = '#8B5CF6'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(139,92,246,0.2)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2A35'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.75rem' }}>{rune.emoji}</span>
          <span style={{ fontSize: '0.7rem', background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(139,92,246,0.3)' }}>{rune.category}</span>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#E2E2E8', marginBottom: '0.35rem', fontSize: '1rem' }}>{rune.name}</div>
          <div style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.5 }}>{rune.purpose}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {skillCats.map(cat => (
            <span key={cat} style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '3px', background: `${CATEGORY_COLORS[cat]}15`, color: CATEGORY_COLORS[cat], border: `1px solid ${CATEGORY_COLORS[cat]}40`, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat}</span>
          ))}
          <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '3px', background: '#1a1a24', color: '#555', marginLeft: 'auto' }}>{rune.nodes.length} skills</span>
        </div>
      </div>
    </Link>
  )
}
