'use client';

import { useMemo, useState } from 'react';
import { runes } from '@/data/runes';
import { SKILLS_REGISTRY, type Skill as RegistrySkill } from '@/data/skills-registry';

const CAT_COLORS: Record<string, string> = {
  input: '#3B82F6',
  api: '#10B981',
  llm: '#8B5CF6',
  output: '#F59E0B',
};

const CAT_ICONS: Record<string, string> = {
  Input: '⇥',
  API: '⚡',
  LLM: '⟡',
  Output: '⇤',
};

interface SkillWithRuntimes {
  skill: RegistrySkill;
  runeCount: number;
  runes: string[];
}

function normalizeCategory(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function SkillsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const skillIndex = useMemo<Record<string, string[]>>(() => {
    const map: Record<string, string[]> = {};
    for (const rune of runes) {
      for (const node of rune.nodes) {
        if (!map[node.id]) map[node.id] = [];
        map[node.id].push(rune.name);
      }
    }
    return map;
  }, []);

  const skills: SkillWithRuntimes[] = useMemo(() => {
    return SKILLS_REGISTRY.map((skill) => ({
      skill,
      runeCount: skillIndex[skill.id]?.length ?? 0,
      runes: skillIndex[skill.id] ?? [],
    })).filter((item) => item.runeCount > 0);
  }, [skillIndex]);

  const filtered = skills.filter((skillEntry) => {
    const catName = normalizeCategory(skillEntry.skill.category);
    const matchesCat = activeCategory === 'All' || catName === activeCategory;
    const matchesSearch = !search || skillEntry.skill.label.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="quest-header mb-8">
          <div className="text-xs font-mono text-blue-400 tracking-[0.3em] uppercase mb-3">◆ Skill Archive ◆</div>
          <h1>Spellbook</h1>
          <p className="text-sm font-mono text-[#8888A0] mt-3">{skills.length} skills cataloged across all runes</p>
        </div>

        <div className="max-w-md mx-auto mb-6 rpg-panel p-1">
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rpg-search"
          />
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {['All', 'Input', 'API', 'LLM', 'Output'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1.5 text-xs font-display tracking-wider uppercase border transition-all
                ${
                  activeCategory === cat
                    ? 'border-purple-500 text-[#E2E2E8] bg-purple-500/10'
                    : 'border-[#2A2A35] text-[#8888A0] hover:border-[#3A3A4A]'
                }
              `}
            >
              {CAT_ICONS[cat] ?? '◈'} {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filtered.map((entry) => {
            const color = CAT_COLORS[entry.skill.category] ?? '#8B5CF6';
            return (
              <div
                key={entry.skill.id}
                className="inventory-slot p-3 group"
                title={`${entry.skill.label} — Used in ${entry.runeCount} rune(s): ${entry.runes.join(', ')}`}
              >
                <div
                  className="text-2xl mb-2 transition-transform group-hover:scale-110"
                  style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
                >
                  {entry.skill.icon}
                </div>

                <div className="text-[10px] font-mono text-center leading-tight text-[#E2E2E8] line-clamp-2">
                  {entry.skill.label}
                </div>

                <div className="text-[9px] font-mono mt-1 uppercase tracking-wider" style={{ color }}>
                  Pwr {entry.runeCount}
                </div>

                <div
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ background: color, boxShadow: `0 0 4px ${color}` }}
                />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#8888A0] font-mono text-sm">No skills found.</div>
        )}
      </div>
    </div>
  );
}
