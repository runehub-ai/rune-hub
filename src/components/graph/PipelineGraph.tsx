'use client'
import ReactFlow, { Background, Controls, type Node, type Edge } from 'reactflow'
import 'reactflow/dist/style.css'
import { SkillNode } from './SkillNode'
import { CATEGORY_COLORS, type Rune } from '@/data/runes'

const nodeTypes = { skill: SkillNode }

export function PipelineGraph({ rune }: { rune: Rune }) {
  // Simple left-to-right layout
  const categoryOrder = ['input', 'api', 'llm', 'output']
  const byCategory: Record<string, typeof rune.nodes> = { input: [], api: [], llm: [], output: [] }
  rune.nodes.forEach(n => { byCategory[n.category]?.push(n) })

  const nodes: Node[] = []
  let col = 0
  categoryOrder.forEach(cat => {
    const catNodes = byCategory[cat]
    catNodes.forEach((n, row) => {
      nodes.push({
        id: n.id,
        type: 'skill',
        position: { x: col * 200, y: row * 90 },
        data: { label: n.label, category: n.category },
      })
    })
    if (catNodes.length) col++
  })

  const edges: Edge[] = rune.edges.map((e, i) => ({
    id: `e-${i}`,
    source: e.source,
    target: e.target,
    label: e.label,
    animated: true,
    style: { stroke: '#8B5CF6', strokeWidth: 1.5 },
    labelStyle: { fill: '#888', fontSize: 10 },
    labelBgStyle: { fill: '#13131A' },
  }))

  return (
    <div style={{ height: 280, background: '#0A0A0F', borderRadius: '12px', border: '1px solid #2A2A35', overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
      >
        <Background color="#1a1a24" gap={20} />
        <Controls showInteractive={false} style={{ background: '#13131A', border: '1px solid #2A2A35' }} />
      </ReactFlow>
    </div>
  )
}
