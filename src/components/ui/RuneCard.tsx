import Link from 'next/link';

const CAT_COLORS: Record<string, { text: string; border: string; glow: string }> = {
  Input: { text: '#3B82F6', border: 'rgba(59,130,246,0.3)', glow: 'rgba(59,130,246,0.1)' },
  API: { text: '#10B981', border: 'rgba(16,185,129,0.3)', glow: 'rgba(16,185,129,0.1)' },
  LLM: { text: '#8B5CF6', border: 'rgba(139,92,246,0.3)', glow: 'rgba(139,92,246,0.1)' },
  Output: { text: '#F59E0B', border: 'rgba(245,158,11,0.3)', glow: 'rgba(245,158,11,0.1)' },
};

function getGrade(skillCount: number) {
  if (skillCount >= 10) return { label: 'Rune Lord', class: 'grade-badge--runelord' };
  if (skillCount >= 7) return { label: 'Archmage', class: 'grade-badge--archmage' };
  if (skillCount >= 5) return { label: 'Artisan', class: 'grade-badge--artisan' };
  if (skillCount >= 3) return { label: 'Smith', class: 'grade-badge--smith' };
  return { label: 'Apprentice', class: 'grade-badge--apprentice' };
}

interface RuneCardProps {
  rune: {
    slug: string;
    name: string;
    description?: string;
    category?: string;
    nodes?: { id: string; name?: string; category?: string }[];
  };
}

export default function RuneCard({ rune }: RuneCardProps) {
  const skillCount = rune.nodes?.length ?? 0;
  const grade = getGrade(skillCount);
  const trust = Math.min(100, 40 + skillCount * 8);

  return (
    <Link href={`/runes/${rune.slug}`}>
      <div
        className="rpg-panel p-5 h-full hover:translate-y-[-2px] transition-all cursor-pointer group"
        style={{ borderColor: 'rgba(139,92,246,0.3)' }}
      >
        <div className="rpg-panel-inner">
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="font-display text-base tracking-wider uppercase group-hover:text-purple-300 transition-colors leading-tight">{rune.name}</h3>
            <span className="cat-badge flex-shrink-0">{rune.category}</span>
          </div>

          <p className="text-xs text-[#8888A0] mb-4 line-clamp-2 leading-relaxed">{rune.description}</p>

          <div className="mb-3">
            <span className={`grade-badge ${grade.class}`}>Lv.{skillCount} {grade.label}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {rune.nodes?.slice(0, 5).map((skill) => {
              const sc = CAT_COLORS[skill.category ?? 'LLM'] ?? CAT_COLORS.LLM;
              return (
                <span
                  key={skill.id}
                  className="text-[10px] font-mono px-2 py-0.5 border rounded-sm"
                  style={{
                    color: sc.text,
                    borderColor: `${sc.text}33`,
                    background: `${sc.text}0D`,
                  }}
                >
                  {skill.id}
                </span>
              );
            })}
            {skillCount > 5 && (
              <span className="text-[10px] font-mono text-[#8888A0] px-2 py-0.5">+{skillCount - 5} more</span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8888A0] mb-1">
              <span>Trust Score</span>
              <span style={{ color: 'var(--purple)' }}>{trust}%</span>
            </div>
            <div className="stat-bar" style={{ height: '14px' }}>
              <div className="stat-bar__fill stat-bar__fill--purple" style={{ width: `${trust}%` }} />
              <div className="stat-bar__label">{trust}/100</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-[10px] font-mono">
            <span className="text-[#8888A0]">⚔ {skillCount} nodes</span>
            <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">Open Scroll →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
