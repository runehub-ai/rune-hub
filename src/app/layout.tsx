import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'RuneGraph — Arcane Skill Registry',
  description: 'Inscribe. Invoke. Trust. The open rune protocol for AI skill composition.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-hex-grid bg-runic-pattern min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>

        {/* ── RPG Footer ── */}
        <footer className="relative z-10 border-t border-[#2A2A35] py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-purple-400 text-xl">◈</span>
              <span className="font-display text-sm tracking-[0.15em] uppercase text-[#8888A0]">
                RuneGraph Protocol
              </span>
            </div>

            <div className="text-[#2A2A35] text-xs tracking-[0.5em] hidden md:block">
              ─── ◆ ─── ◇ ─── ◆ ───
            </div>

            <div className="flex items-center gap-6 text-xs font-mono text-[#8888A0]">
              <a href="/about" className="hover:text-[#E2E2E8] transition-colors">
                :: ABOUT
              </a>
              <a href="/strategy" className="hover:text-[#E2E2E8] transition-colors">
                :: STRATEGY
              </a>
              <a
                href="https://github.com/runegraph"
                target="_blank"
                rel="noopener"
                className="hover:text-[#E2E2E8] transition-colors"
              >
                :: GUILD ARCHIVES
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#2A2A35]">
            <span>╔══</span>
            <span className="text-[#8888A0]">v0.1.0</span>
            <span>══╗</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
