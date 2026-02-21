'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Sanctum' },
  { href: '/runes', label: 'Rune Tome' },
  { href: '/skills', label: 'Spellbook' },
  { href: '/graph', label: 'Arcane Map' },
  { href: '/strategy', label: 'Codex' },
  { href: '/about', label: 'Lore' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="runic-border-bottom relative z-50 bg-[#0A0A0F]/90 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <span className="text-2xl text-purple-400 group-hover:text-purple-300 transition-colors">
              ◈
            </span>
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-lg tracking-[0.2em] uppercase text-[#E2E2E8]">
            RuneGraph
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <a
          href="https://github.com/runegraph"
          target="_blank"
          rel="noopener"
          className="hidden md:flex items-center gap-2 text-xs font-mono text-[#8888A0] hover:text-[#E2E2E8] transition-colors border border-[#2A2A35] px-3 py-1.5 hover:border-purple-500/50"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>Guild Archives</span>
        </a>

        <button className="md:hidden text-[#8888A0] hover:text-[#E2E2E8]">
          <span className="font-mono text-lg">☰</span>
        </button>
      </div>
    </nav>
  );
}
