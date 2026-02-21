import Link from 'next/link';
import { runes } from '@/data/runes';

const totalRunes = runes.length;
const totalSkills = new Set(runes.flatMap((rune) => rune.nodes.map((node) => node.id))).size;
const categories = new Set(runes.map((rune) => rune.category));

function HudStat({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-[#8888A0] uppercase tracking-wider">{label}</span>
      <span className="text-[#E2E2E8] ml-auto tabular-nums">{value}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      <section className="scanlines relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="runic-circle w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
        <div
          className="runic-circle w-[400px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{ animationDirection: 'reverse', animationDuration: '45s' }}
        />

        <div className="glow-orb w-64 h-64 bg-purple-500/10 top-20 left-10" />
        <div className="glow-orb w-48 h-48 bg-blue-500/10 bottom-20 right-20" style={{ animationDelay: '2s' }} />
        <div className="glow-orb w-32 h-32 bg-amber-500/5 top-40 right-40" style={{ animationDelay: '1s' }} />

        <div className="hud-panel absolute top-24 left-6 p-3 w-48 hidden lg:block" style={{ borderLeft: '2px solid #8B5CF6' }}>
          <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-2">System Status</div>
          <div className="space-y-1.5">
            <HudStat label="Runes" value={totalRunes} color="#8B5CF6" />
            <HudStat label="Skills" value={totalSkills} color="#3B82F6" />
            <HudStat label="Categories" value={categories.size} color="#10B981" />
          </div>
        </div>

        <div className="hud-panel absolute top-24 right-6 p-3 w-48 hidden lg:block" style={{ borderRight: '2px solid #F59E0B' }}>
          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-2">Protocol</div>
          <div className="space-y-1.5">
            <HudStat label="Version" value="0.1.0" color="#F59E0B" />
            <HudStat label="Trust" value="Active" color="#10B981" />
            <HudStat label="Network" value="Open" color="#3B82F6" />
          </div>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="text-[#2A2A35] text-sm tracking-[1em] mb-6">═══════════</div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase mb-6 text-glow-purple">
            RuneGraph
          </h1>

          <p className="font-display text-lg md:text-xl tracking-[0.3em] uppercase text-[#8888A0] mb-2">
            Inscribe · Invoke · Trust
          </p>
          <p className="font-mono text-sm text-[#8888A0] max-w-xl mx-auto mt-4 leading-relaxed">
            An open protocol for composable, trustworthy AI skill pipelines.
            Every rune is a spell — inscribed, invocable, verifiable.
          </p>

          <div className="text-[#2A2A35] text-sm tracking-[1em] mt-6 mb-10">═══════════</div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/runes" className="rpg-btn rpg-btn--filled">
              Enter the Tome
            </Link>
            <Link href="/graph" className="rpg-btn rpg-btn--gold">
              View Arcane Map
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono text-purple-400 tracking-[0.3em] uppercase mb-3">
              ◆ Ancient Knowledge ◆
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-[0.15em] uppercase">
              What is a Rune?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '✦',
                title: 'Inscribe',
                subtitle: 'Define Your Spell',
                description:
                  'A rune is a YAML manifest that declares an AI skill pipeline — its inputs, processing steps, LLM calls, and outputs. Like inscribing a spell scroll.',
                color: '#3B82F6',
              },
              {
                icon: '⟡',
                title: 'Invoke',
                subtitle: 'Cast the Pipeline',
                description:
                  'Once inscribed, a rune can be invoked by any agent. Skills compose together like elements in a spell chain — each step feeding the next.',
                color: '#8B5CF6',
              },
              {
                icon: '◈',
                title: 'Trust',
                subtitle: 'Verify the Craft',
                description:
                  'Every rune carries a trust score — a measure of its reliability, test coverage, and community validation. Trust is earned, not given.',
                color: '#F59E0B',
              },
            ].map((panel) => (
              <div key={panel.title} className="rpg-panel p-6 hover:border-[#3A3A4A] transition-colors group">
                <div className="rpg-panel-inner">
                  <div
                    className="text-3xl mb-4 transition-transform group-hover:scale-110"
                    style={{ color: panel.color, filter: `drop-shadow(0 0 8px ${panel.color}40)` }}
                  >
                    {panel.icon}
                  </div>

                  <h3 className="font-display text-lg tracking-[0.1em] uppercase mb-1">{panel.title}</h3>
                  <p className="text-xs font-mono text-[#8888A0] mb-4">{panel.subtitle}</p>
                  <p className="text-sm text-[#8888A0] leading-relaxed">{panel.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-center gap-0 text-xs font-mono text-[#8888A0]">
            <div className="rpg-panel px-4 py-2"><span className="cat-input">INPUT</span></div>
            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-green-500" />
            <div className="text-green-400">→</div>
            <div className="w-8 h-px bg-gradient-to-r from-green-500 to-purple-500" />
            <div className="rpg-panel px-4 py-2"><span className="cat-api">API</span></div>
            <div className="w-8 h-px bg-gradient-to-r from-green-500 to-purple-500" />
            <div className="text-purple-400">→</div>
            <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-amber-500" />
            <div className="rpg-panel px-4 py-2"><span className="cat-llm">LLM</span></div>
            <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-amber-500" />
            <div className="text-amber-400">→</div>
            <div className="w-8 h-px bg-amber-500/50" />
            <div className="rpg-panel px-4 py-2"><span className="cat-output">OUTPUT</span></div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6 border-t border-b border-[#2A2A35]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Runes Inscribed', value: totalRunes, icon: '◈', color: '#8B5CF6' },
              { label: 'Skills Cataloged', value: totalSkills, icon: '⚔', color: '#3B82F6' },
              { label: 'Categories', value: categories.size, icon: '⬡', color: '#10B981' },
              { label: 'Trust Protocol', value: 'Active', icon: '⟡', color: '#F59E0B' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl mb-2" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="font-display text-2xl md:text-3xl tracking-wider" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-[#8888A0] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl tracking-[0.15em] uppercase">Featured Runes</h2>
            <p className="text-xs font-mono text-[#8888A0] mt-2">Recently inscribed spells from the archive</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {runes.slice(0, 3).map((rune) => (
              <Link key={rune.slug} href={`/runes/${rune.slug}`}>
                <div className="rpg-panel p-5 hover:border-purple-500/30 transition-all group cursor-pointer">
                  <div className="rpg-panel-inner">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-base tracking-wider uppercase group-hover:text-purple-300 transition-colors">{rune.name}</h3>
                      <span className="cat-badge cat-input">{rune.category}</span>
                    </div>
                    <p className="text-xs text-[#8888A0] mb-4 line-clamp-2">{rune.description}</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8888A0]">
                      <span>⚔ {rune.nodes.length} nodes</span>
                      <span className="text-purple-400">View Scroll →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/runes" className="rpg-btn">
              Browse All Runes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
