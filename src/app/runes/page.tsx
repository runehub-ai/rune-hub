'use client';

import { useState } from 'react';
import { runes } from '@/data/runes';
import RuneCard from '@/components/ui/RuneCard';

const CATEGORIES = ['All', 'Input', 'API', 'LLM', 'Output'];

const CAT_ICONS: Record<string, string> = {
  All: '◈',
  Input: '⇥',
  API: '⚡',
  LLM: '⟡',
  Output: '⇤',
};

export default function RunesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = runes.filter((rune) => {
    const matchesCat = activeCategory === 'All' || rune.category === activeCategory;
    const matchesSearch =
      !search ||
      rune.name.toLowerCase().includes(search.toLowerCase()) ||
      rune.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="quest-header mb-8">
          <div className="text-xs font-mono text-purple-400 tracking-[0.3em] uppercase mb-3">◆ Archive Chamber ◆</div>
          <h1>Rune Tome</h1>
          <p className="text-sm font-mono text-[#8888A0] mt-3">
            {runes.length} runes inscribed · Browse the complete spell archive
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8 rpg-panel p-1">
          <input
            type="text"
            placeholder="Search runes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rpg-search"
          />
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex items-center gap-2 px-4 py-2 text-xs font-display tracking-wider uppercase
                border transition-all
                ${
                  activeCategory === cat
                    ? 'border-purple-500 text-[#E2E2E8] bg-purple-500/10 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                    : 'border-[#2A2A35] text-[#8888A0] hover:border-[#3A3A4A] hover:text-[#E2E2E8]'
                }
              `}
            >
              <span>{CAT_ICONS[cat]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-[#8888A0] mb-6">⟐ Showing {filtered.length} of {runes.length} runes</div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rune) => (
            <RuneCard key={rune.slug} rune={rune} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#8888A0] font-mono text-sm">No runes found matching your query.</div>
        )}
      </div>
    </div>
  );
}
