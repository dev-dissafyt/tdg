'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './globals.css';
import {
  Sparkles,
  LayoutGrid,
  Milestone,
  LineChart,
  FileCheck,
  ExternalLink,
  Download,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { Badge, Button } from '@tdgh/ui';

export default function BmsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Extract businessSlug from pathname if present (e.g. /kasipay/canvas -> kasipay)
  const segments = pathname.split('/').filter(Boolean);
  const currentSlug = segments[0] || 'kasipay';

  const navLinks = [
    { label: '9-Box Model Canvas (BMC)', href: `/${currentSlug}/canvas`, icon: LayoutGrid },
    { label: '10-Week Sprint Roadmap', href: `/${currentSlug}/roadmap`, icon: Milestone },
    { label: 'Runway & Unit Economics', href: `/${currentSlug}/kpis`, icon: LineChart },
    { label: 'Compliance & Pitch Vault', href: `/${currentSlug}/documents`, icon: FileCheck },
  ];

  return (
    <html lang="en">
      <head>
        <title>TDGH Incubator BMS | Business Model Canvas & Venture OS</title>
      </head>
      <body className="min-h-screen bg-[#F8F9FA] text-obsidian flex flex-col font-sans">
        {/* Top Venture Operational Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-porcelain-border shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            {/* TDGH Incubator & Venture Switcher */}
            <div className="flex items-center gap-4">
              <Link
                href="http://localhost:3000"
                className="flex items-center border-r border-porcelain-border pr-4 hover:opacity-85 transition-opacity shrink-0"
                title="Return to The Daily Grind Hub Main Site"
              >
                <Image
                  src="/logo.png"
                  alt="The Daily Grind Hub"
                  width={150}
                  height={36}
                  className="h-7 sm:h-8 w-auto object-contain"
                  priority
                />
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-mono font-black text-base shadow-tactile shrink-0">
                  KP
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-obsidian">
                      KasiPay Technologies (Pty) Ltd
                    </span>
                    <Badge variant="purple">Sprint #3</Badge>
                  </div>
                  <span className="text-[11px] font-mono text-obsidian-500">
                    Incubatee BMS &bull; Founder: Sipho Ndlovu &bull; Mentor: Tariq Johnson
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Cross Ecosystem Links */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-porcelain px-3 py-1.5 rounded-lg border border-porcelain-border text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sprint Progress: Week 6 of 10 (60% Validated)</span>
              </div>

              <button
                onClick={() => alert('Exporting 12-Slide Investor Summary & Canvas to PDF...')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-obsidian text-white text-xs font-mono font-semibold hover:bg-purple-700 transition-colors shadow-tactile"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export Deck / PDF</span>
              </button>

              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-obsidian-500 hover:text-obsidian flex items-center gap-1 px-2"
                title="Return to Public Hub"
              >
                <span>Hub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Secondary Sub-Navigation Bar */}
          <div className="border-t border-porcelain-border bg-porcelain/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 overflow-x-auto no-scrollbar py-1.5">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-white text-purple-700 font-bold shadow-xs border border-porcelain-border'
                        : 'text-obsidian-600 hover:text-obsidian hover:bg-white/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {/* BMS Module Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
