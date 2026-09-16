'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Users,
  GraduationCap,
  Box,
  Info,
  Sparkles,
  Building2,
  Terminal,
  Printer,
  Rocket,
  ArrowRight,
  Menu,
  X,
  Calendar,
  Layers,
} from 'lucide-react';
import { Badge, Button } from '@tdgh/ui';

export function HeaderNav() {
  const pathname = usePathname();
  const [whoOpen, setWhoOpen] = useState(false);
  const [whatOpen, setWhatOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whoRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click or route change
  useEffect(() => {
    setWhoOpen(false);
    setWhatOpen(false);
    setApplyOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-porcelain-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-obsidian text-white flex items-center justify-center font-mono font-black text-xl tracking-tighter group-hover:bg-electric-cobalt transition-colors shadow-tactile">
            TDG
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tight text-lg leading-tight text-obsidian uppercase">
              The Daily Grind
            </span>
            <span className="text-[11px] font-mono tracking-widest text-obsidian-500 uppercase">
              Innovation Hub &bull; Scottsville
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-obsidian-700">
          {/* Dropdown 1: "Who are we" */}
          <div
            ref={whoRef}
            className="relative"
            onMouseEnter={() => setWhoOpen(true)}
            onMouseLeave={() => setWhoOpen(false)}
          >
            <button
              onClick={() => setWhoOpen(!whoOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg hover:text-obsidian hover:bg-porcelain transition-colors text-sm font-semibold select-none cursor-pointer"
            >
              <span>Who are we</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  whoOpen ? 'rotate-180 text-electric-cobalt' : 'text-obsidian-400'
                }`}
              />
            </button>

            {/* "Who are we" Dropdown Menu */}
            {whoOpen && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl border border-porcelain-border shadow-2xl p-2.5 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                <Link
                  href="/team"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-porcelain transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-electric-cobalt flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-electric-cobalt group-hover:text-white transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-electric-cobalt transition-colors">
                      Meet the team
                    </div>
                    <div className="text-[11px] text-obsidian-500 line-clamp-1">
                      Leadership, executive directors & mentors
                    </div>
                  </div>
                </Link>

                <Link
                  href="/cohorts/2025/codetrepreneurs"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-porcelain transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-emerald-600 transition-colors">
                      Meet the interns
                    </div>
                    <div className="text-[11px] text-obsidian-500 line-clamp-1">
                      Codetrepreneurs software fellows & portfolios
                    </div>
                  </div>
                </Link>

                <Link
                  href="/cohorts/2025/3d-printing"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-porcelain transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-amber-600 transition-colors">
                      Meet the 3D cohort
                    </div>
                    <div className="text-[11px] text-obsidian-500 line-clamp-1">
                      Additive manufacturing & CAD hardware makers
                    </div>
                  </div>
                </Link>

                <div className="pt-1 border-t border-porcelain-border mt-1">
                  <Link
                    href="/about"
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-porcelain transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-obsidian group-hover:text-purple-600 transition-colors">
                        About TDGH & Impact
                      </div>
                      <div className="text-[11px] text-obsidian-500 line-clamp-1">
                        Origins, Section 18A & Scottsville narrative
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 2: "What we do" */}
          <div
            ref={whatRef}
            className="relative"
            onMouseEnter={() => setWhatOpen(true)}
            onMouseLeave={() => setWhatOpen(false)}
          >
            <button
              onClick={() => setWhatOpen(!whatOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg hover:text-obsidian hover:bg-porcelain transition-colors text-sm font-semibold select-none cursor-pointer"
            >
              <span>What we do</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  whatOpen ? 'rotate-180 text-electric-cobalt' : 'text-obsidian-400'
                }`}
              />
            </button>

            {/* "What we do" Dropdown Menu */}
            {whatOpen && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-2xl border border-porcelain-border shadow-2xl p-2.5 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                <Link
                  href="/incubation"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-porcelain transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-purple-600 transition-colors">
                      Business Incubation
                    </div>
                    <div className="text-[11px] text-obsidian-500 line-clamp-1">
                      10-week sprint, 9-box BMC & investor seed readiness
                    </div>
                  </div>
                </Link>

                <Link
                  href="/coworking"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-porcelain transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-electric-cobalt flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-electric-cobalt group-hover:text-white transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-electric-cobalt transition-colors">
                      Co-Working Space
                    </div>
                    <div className="text-[11px] text-obsidian-500 line-clamp-1">
                      Interactive floorplan, hot desks, boardroom & fiber
                    </div>
                  </div>
                </Link>

                <Link
                  href="/codetrepreneurs"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-porcelain transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-cyan-700 transition-colors">
                      Codetrepreneurs
                    </div>
                    <div className="text-[11px] text-obsidian-500 line-clamp-1">
                      1-year full-stack engineering fellowship & live terminal
                    </div>
                  </div>
                </Link>

                <Link
                  href="/3d-printing"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-porcelain transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-amber-700 transition-colors">
                      3D Printing & FabLab
                    </div>
                    <div className="text-[11px] text-obsidian-500 line-clamp-1">
                      Additive manufacturing, CAD design & recycling lab
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="px-3.5 py-2 rounded-lg hover:text-obsidian hover:bg-porcelain transition-colors text-sm font-semibold"
          >
            Contact & Tickets
          </Link>
        </nav>

        {/* Right Action Controls: Portal Login & Specific-Reason Apply */}
        <div className="flex items-center gap-3">
          <Link
            href="/portal/dashboard"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono font-semibold text-obsidian hover:text-electric-cobalt transition-colors"
          >
            Portal Login
          </Link>

          {/* Targeted "Apply" Dropdown Selector based on the actual reason */}
          <div
            ref={applyRef}
            className="relative"
            onMouseEnter={() => setApplyOpen(true)}
            onMouseLeave={() => setApplyOpen(false)}
          >
            <button
              onClick={() => setApplyOpen(!applyOpen)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-obsidian text-white text-xs font-mono font-bold hover:bg-electric-cobalt transition-all shadow-tactile hover:shadow-tactile-hover select-none cursor-pointer"
            >
              <span>Apply</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  applyOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Targeted Reason Apply Flyout Menu */}
            {applyOpen && (
              <div className="absolute top-full right-0 w-80 bg-white rounded-2xl border border-porcelain-border shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-150 space-y-2 z-50">
                <div className="px-2 py-1 border-b border-porcelain-border">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-400 font-bold">
                    Select Your Specific Reason
                  </span>
                </div>

                <Link
                  href="/portal/applications/new?track=CODETREPRENEURS"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/60 border border-transparent hover:border-blue-200 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-electric-cobalt flex items-center justify-center shrink-0 mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-electric-cobalt">
                      Codetrepreneurs Fellowship
                    </div>
                    <div className="text-[11px] text-obsidian-500">
                      1-Year full-stack software development
                    </div>
                  </div>
                </Link>

                <Link
                  href="/portal/applications/new?track=MAKER_3D"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/60 border border-transparent hover:border-amber-200 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-amber-700">
                      3D Printing Studio Fellowship
                    </div>
                    <div className="text-[11px] text-obsidian-500">
                      6-Month CAD & physical hardware prototyping
                    </div>
                  </div>
                </Link>

                <Link
                  href="/portal/applications/new?track=INCUBATION"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-50/60 border border-transparent hover:border-purple-200 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-purple-700">
                      Business Incubation Program
                    </div>
                    <div className="text-[11px] text-obsidian-500">
                      10-Week sprint, BMC, & seed capital pitch
                    </div>
                  </div>
                </Link>

                <Link
                  href="/contact?plan=day-pass"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian group-hover:text-emerald-700">
                      Co-Working Desk or Boardroom
                    </div>
                    <div className="text-[11px] text-obsidian-500">
                      Day pass, monthly desk, or meeting space
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-obsidian hover:bg-porcelain transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-porcelain-border px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-obsidian-400 font-bold px-3 py-1">
              Who are we
            </div>
            <Link
              href="/team"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <Users className="w-4 h-4 text-electric-cobalt" /> Meet the team
            </Link>
            <Link
              href="/cohorts/2025/codetrepreneurs"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" /> Meet the interns
            </Link>
            <Link
              href="/cohorts/2025/3d-printing"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <Box className="w-4 h-4 text-amber-600" /> Meet the 3D cohort
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <Info className="w-4 h-4 text-purple-600" /> About TDGH & Impact
            </Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-porcelain-border">
            <div className="text-[11px] font-mono uppercase tracking-wider text-obsidian-400 font-bold px-3 py-1">
              What we do
            </div>
            <Link
              href="/incubation"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <Sparkles className="w-4 h-4 text-purple-600" /> Business Incubation
            </Link>
            <Link
              href="/coworking"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <Building2 className="w-4 h-4 text-electric-cobalt" /> Co-Working Space
            </Link>
            <Link
              href="/codetrepreneurs"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <Terminal className="w-4 h-4 text-cyan-600" /> Codetrepreneurs
            </Link>
            <Link
              href="/3d-printing"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              <Printer className="w-4 h-4 text-amber-600" /> 3D Printing
            </Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-porcelain-border">
            <Link
              href="/contact"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-obsidian hover:bg-porcelain font-medium"
            >
              Contact & Tickets
            </Link>
            <Link
              href="/portal/dashboard"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono text-electric-cobalt font-semibold"
            >
              Portal Login &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
