import Link from 'next/link'

export default function GuidePage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* ── Header ── */}
      <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#bb9af7', marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>USER GUIDE</p>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#dde4fc', margin: '0 0 1rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        How to use RuneHub
      </h1>
      <p style={{ fontSize: '1rem', color: '#9aa4d2', lineHeight: 1.7, maxWidth: '620px', marginBottom: '3.5rem' }}>
        Pick a workflow, run one command, get results — no wiring required. This guide walks you from zero to your first running pipeline.
      </p>

      {/* ── Section 1: Three paths ── */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#bb9af7', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace', monospace", marginBottom: '1.25rem', marginTop: 0 }}>THREE WAYS TO START</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { emoji: '⬡', color: '#34d399', title: 'Run a pre-built Rune', desc: 'Browse 65+ verified Runes. Pick one that matches your workflow, install it with one command, and run.', cta: 'Browse Runes', href: '/runes' },
            { emoji: '⬡', color: '#bb9af7', title: 'Build your own pipeline', desc: 'Drag skills onto the canvas, click Auto-Fill to wire gaps, export as a shareable Rune.', cta: 'Open Builder', href: '/runes/build' },
            { emoji: '⬡', color: '#60a5fa', title: 'Explore the skill registry', desc: 'Browse 200+ individual actions across 40+ services. Understand what each skill does before wiring it.', cta: 'Browse Skills', href: '/skills' },
          ].map(p => (
            <div key={p.title} style={{ background: '#1e2030', border: `1px solid ${p.color}25`, borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem', color: p.color }}>{p.emoji}</span>
              <h3 style={{ color: '#dde4fc', fontSize: '1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: 0 }}>{p.title}</h3>
              <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.65, margin: 0, flex: 1 }}>{p.desc}</p>
              <Link href={p.href} style={{ fontSize: '0.8rem', color: p.color, textDecoration: 'none', fontWeight: 600 }}>{p.cta} ›</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Quick Start ── */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#34d399', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.25rem', marginTop: 0 }}>QUICK START — RUN YOUR FIRST RUNE</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            {
              step: '01', color: '#34d399',
              title: 'Find a Rune',
              body: 'Go to the Runes page, filter by category (Productivity, Research, DevOps…), or search by name. Each Rune shows a Trust Score and a full skill breakdown before you commit.',
            },
            {
              step: '02', color: '#60a5fa',
              title: 'Install with one command',
              body: 'Copy the install command from the Rune detail page. RuneHub resolves all skill dependencies automatically — no hunting for packages or versions.',
              code: 'rune install morning-brief --run',
            },
            {
              step: '03', color: '#bb9af7',
              title: 'Authorize scopes',
              body: 'The CLI prompts you for the exact OAuth/API scopes this Rune needs — nothing broader. Secrets are stored locally and never sent to the LLM.',
            },
            {
              step: '04', color: '#f472b6',
              title: 'Run and review',
              body: 'Every execution logs each step: token usage, duration, inputs/outputs, and any LLM calls. Use `rune logs` to audit exactly what ran.',
              code: 'rune logs morning-brief --last',
            },
          ].map(s => (
            <div key={s.step} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem 1.5rem', background: '#16161e', border: `1px solid ${s.color}18`, borderRadius: '12px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: `${s.color}14`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.step}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#dde4fc', fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.4rem' }}>{s.title}</h3>
                <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.65, margin: s.code ? '0 0 0.6rem' : 0 }}>{s.body}</p>
                {s.code && (
                  <code style={{ display: 'block', background: '#0d0e17', border: '1px solid #1f2335', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.code}</code>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Use case selector ── */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#60a5fa', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.25rem', marginTop: 0 }}>WHAT DO YOU WANT TO DO?</h2>
        <div style={{ background: '#13131a', border: '1px solid #1f2335', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '0.5rem 1.25rem', borderBottom: '1px solid #1f2335', fontSize: '0.65rem', color: '#4a5275', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.08em', gap: '1rem' }}>
            <span>I WANT TO…</span><span>RECOMMENDED RUNE</span><span>CATEGORY</span>
          </div>
          {[
            ['Get a daily briefing from email + calendar',           'Morning Brief',          'Productivity', '#34d399'],
            ['Summarize GitHub PRs and post to Slack',               'PR Digest',              'DevOps',       '#60a5fa'],
            ['Research a topic and save to Notion',                  'Deep Research',          'Research',     '#bb9af7'],
            ['Write a SEO blog post and publish it',                 'Blog Forge',             'Content',      '#f472b6'],
            ['Monitor crypto prices and send alerts',                'Market Alert',           'Finance',      '#ff9e64'],
            ['Transcribe a meeting and extract action items',        'Meeting Scribe',         'Productivity', '#34d399'],
            ['Auto-reply to support tickets with AI',                'Support Sage',           'DevOps',       '#60a5fa'],
            ['Build something custom from scratch',                  'Rune Builder →',         'Custom',       '#a78bfa'],
          ].map(([want, rune, cat, c], i, arr) => (
            <div key={want as string} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '0.75rem 1.25rem', borderBottom: i < arr.length - 1 ? '1px solid #1a1b2a' : 'none', fontSize: '0.875rem', gap: '1rem', alignItems: 'center' }}>
              <span style={{ color: '#9aa4d2' }}>{want as string}</span>
              <span style={{ color: c as string, fontWeight: 600 }}>{rune as string}</span>
              <span style={{ fontSize: '0.7rem', color: c as string, background: `${c}14`, border: `1px solid ${c}30`, padding: '2px 8px', borderRadius: '20px', whiteSpace: 'nowrap', textAlign: 'center' as const, fontFamily: "'JetBrains Mono', monospace" }}>{cat as string}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Build your own ── */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#a78bfa', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.25rem', marginTop: 0 }}>BUILDING A CUSTOM PIPELINE</h2>
        <div style={{ background: '#1e2030', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px', padding: '1.75rem', marginBottom: '1rem' }}>
          <p style={{ color: '#c8d2ec', fontSize: '0.9rem', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
            The Rune Builder lets you visually assemble a pipeline without writing code. Here&apos;s the fastest path:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              ['Pick a Quick Start template', 'Smart Alerts, Research Bot, or Daily Brief — loads a pre-wired starting point you can customize.'],
              ['Drag in more skills from the left panel', 'Search by name or service. Drag onto the canvas to add. Click × to remove.'],
              ['Click ✨ Auto-Fill Gaps', 'RuneHub detects missing LLM or output nodes and fills them in, then auto-connects all edges.'],
              ['Review and export', 'Check the Trust Score, then export as JSON. Use it with the CLI or share with teammates.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#a78bfa', flexShrink: 0, marginTop: '2px' }}>›</span>
                <div>
                  <span style={{ color: '#dde4fc', fontWeight: 600, fontSize: '0.875rem' }}>{title as string}</span>
                  <span style={{ color: '#748ab8', fontSize: '0.875rem' }}> — {desc as string}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link href="/runes/build" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.5rem', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.35)', borderRadius: '8px', color: '#a78bfa', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>
          Open the Builder ›
        </Link>
      </section>

      {/* ── Section 5: Token tips ── */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#ff9e64', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.25rem', marginTop: 0 }}>SAVING TOKENS (AUTOMATICALLY)</h2>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', marginTop: 0 }}>
          RuneHub cuts token usage by up to 70% automatically. You don&apos;t need to configure anything — but understanding how it works helps you build more efficient pipelines.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { icon: '🗺️', color: '#34d399', title: 'The graph is the plan', desc: 'RuneHub never burns tokens deciding what to do next. The pipeline structure is fixed — 0 planning tokens.' },
            { icon: '📦', color: '#60a5fa', title: 'Context isolation', desc: 'Each skill only sees its own inputs. No skill ever gets the full conversation history.' },
            { icon: '♻️', color: '#bb9af7', title: 'Semantic caching', desc: 'Run the same Rune with similar inputs? Cached result is returned instantly. LLM never called.' },
            { icon: '🔀', color: '#ff9e64', title: 'Smart model routing', desc: 'Simple tasks → Groq. Classification → Haiku. Heavy synthesis → Sonnet. Opus only when explicitly needed.' },
          ].map(t => (
            <div key={t.title} style={{ background: '#16161e', border: `1px solid ${t.color}20`, borderRadius: '10px', padding: '1.1rem 1.25rem' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t.icon}</div>
              <h3 style={{ color: t.color, fontSize: '0.875rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.4rem' }}>{t.title}</h3>
              <p style={{ color: '#748ab8', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 6: Trust Scores ── */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ color: '#f87171', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.25rem', marginTop: 0 }}>READING THE TRUST SCORE</h2>
        <div style={{ background: '#1e2030', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '12px', padding: '1.75rem' }}>
          <p style={{ color: '#c8d2ec', fontSize: '0.9rem', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
            Every Rune has a Trust Score (0–100) that quantifies its security risk before you run it. Higher is safer.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['90–100', '#a8d878', 'Read-only scopes, no external data sent to LLM, fully auditable. Safe to run in production.'],
              ['70–89',  '#ffb07a', 'Moderate scope. Some write permissions or third-party APIs. Review before running.'],
              ['50–69',  '#f87171', 'Sensitive services, write access, or high data-surface area. Run in sandboxed environments only.'],
              ['< 50',   '#f87171', 'Unverified or experimental. Community-submitted — audit manually before use.'],
            ].map(([range, c, desc]) => (
              <div key={range as string} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: c as string, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", flexShrink: 0, minWidth: '60px' }}>{range as string}</span>
                <div style={{ flex: 1, height: '4px', background: '#1f2335', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: range === '90–100' ? '95%' : range === '70–89' ? '80%' : range === '50–69' ? '60%' : '40%', background: c as string, borderRadius: '2px' }} />
                </div>
                <span style={{ color: '#748ab8', fontSize: '0.8rem', lineHeight: 1.55, flex: 2 }}>{desc as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/runes" style={{ padding: '0.75rem 1.75rem', background: 'linear-gradient(135deg, #9d7cd8, #bb9af7)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif" }}>
          Browse Runes ›
        </Link>
        <Link href="/runes/build" style={{ padding: '0.75rem 1.75rem', background: 'transparent', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
          Open Builder ›
        </Link>
      </div>

    </div>
  )
}
