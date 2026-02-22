'use client'
import { useCallback } from 'react'
import ReactFlow, { Background, Controls, type Node, type Edge, type ReactFlowInstance } from 'reactflow'
import { SkillNode } from './SkillNode'
import { type Rune } from '@/data/runes'

const nodeTypes = { skill: SkillNode }

// ── Layout constants ───────────────────────────────────────────────────
const NODE_W   = 168
const NODE_H   = 66
const COL_GAP  = 72
const COL_STEP = NODE_W + COL_GAP   // = 240px
const ROW_STEP = 160

export function PipelineGraph({ rune }: { rune: Rune }) {
  // ── Topological layer assignment (Kahn's BFS) ─────────────────────────
  const adj: Record<string, string[]> = {}
  const inDeg: Record<string, number> = {}
  rune.nodes.forEach(n => { adj[n.id] = []; inDeg[n.id] = 0 })
  rune.edges.forEach(e => {
    adj[e.source].push(e.target)
    inDeg[e.target]++
  })

  const nodeLayer: Record<string, number> = {}
  rune.nodes.forEach(n => { nodeLayer[n.id] = 0 })
  const inDegCopy = { ...inDeg }
  const queue: string[] = rune.nodes.filter(n => inDeg[n.id] === 0).map(n => n.id)

  while (queue.length > 0) {
    const cur = queue.shift()!
    adj[cur].forEach(nxt => {
      nodeLayer[nxt] = Math.max(nodeLayer[nxt], nodeLayer[cur] + 1)
      inDegCopy[nxt]--
      if (inDegCopy[nxt] === 0) queue.push(nxt)
    })
  }

  // ── Group by layer, center each row ───────────────────────────────────
  const numLayers = Math.max(...rune.nodes.map(n => nodeLayer[n.id])) + 1
  const byLayer: string[][] = Array.from({ length: numLayers }, () => [])
  rune.nodes.forEach(n => byLayer[nodeLayer[n.id]].push(n.id))

  const maxCols = Math.max(...byLayer.map(l => l.length))
  const canvasW = maxCols * COL_STEP - COL_GAP

  const nodes: Node[] = []
  byLayer.forEach((layerNodes, rowIdx) => {
    const rowW = layerNodes.length * COL_STEP - COL_GAP
    const startX = (canvasW - rowW) / 2
    layerNodes.forEach((nodeId, colIdx) => {
      const rn = rune.nodes.find(n => n.id === nodeId)!
      nodes.push({
        id: rn.id,
        type: 'skill',
        position: { x: startX + colIdx * COL_STEP, y: rowIdx * ROW_STEP },
        data: { label: rn.label, category: rn.category },
        style: { overflow: 'visible' },
      })
    })
  })

  // ── Edges ──────────────────────────────────────────────────────────────
  const edges: Edge[] = rune.edges.map((e, i) => ({
    id:       `e-${i}`,
    source:   e.source,
    target:   e.target,
    label:    e.label,
    type:     'smoothstep',
    animated: true,
    style: { stroke: '#bb9af7', strokeWidth: 1.6 },
    labelStyle:     { fill: '#c8d2ec', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle:   { fill: '#1a1b26', fillOpacity: 1 },
    labelBgPadding: [4, 5] as [number, number],
    labelBgBorderRadius: 4,
  }))

  // ── Container height: based on content, bounded ────────────────────────
  // naturalH = actual pixel height of graph content at 1x scale
  const naturalH = (numLayers - 1) * ROW_STEP + NODE_H
  // graphH: tall enough to show full graph at reasonable zoom, max 580px
  const graphH = Math.min(580, Math.max(240, naturalH + 80))

  // ── fitView after nodes mount (avoids pre-mount measurement issues) ────
  const onInit = useCallback((instance: ReactFlowInstance) => {
    // Brief delay so ReactFlow measures node sizes before fitting
    requestAnimationFrame(() => {
      instance.fitView({ padding: 0.10, includeHiddenNodes: false })
    })
  }, [])

  return (
    <div style={{ height: graphH, overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        style={{ background: '#1a1b26' }}
        onInit={onInit}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
        minZoom={0.2}
        maxZoom={1.8}
      >
        <Background color="#1f2335" gap={22} size={1} />
        <Controls
          showInteractive={false}
          style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '6px' }}
        />
      </ReactFlow>
    </div>
  )
}
