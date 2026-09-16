'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './globals.css';
import {
  LayoutGrid,
  Milestone,
  LineChart,
  FileCheck,
  ExternalLink,
  Download,
  CheckCircle2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Minimize2,
  Maximize2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Badge, Button } from '@tdgh/ui';

export default function BmsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '';
  // Extract businessSlug from pathname (e.g. /kasipay/canvas -> kasipay)
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];
  const currentSlug = segments[0] || 'kasipay';

  // Interactive UI states
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSprintMinimized, setIsSprintMinimized] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  const navLinks = [
    {
      label: 'Canvas',
      fullLabel: '9-Box Model Canvas (BMC)',
      href: `/${currentSlug}/canvas`,
      icon: LayoutGrid,
    },
    {
      label: 'Roadmap',
      fullLabel: '10-Week Sprint Roadmap',
      href: `/${currentSlug}/roadmap`,
      icon: Milestone,
    },
    {
      label: 'Economics',
      fullLabel: 'Runway & Unit Economics',
      href: `/${currentSlug}/kpis`,
      icon: LineChart,
    },
    {
      label: 'Vault',
      fullLabel: 'Compliance & Pitch Vault',
      href: `/${currentSlug}/documents`,
      icon: FileCheck,
    },
  ];

  // Active module title for breadcrumbs
  const activeNav = navLinks.find((item) => pathname === item.href) || navLinks[0];

  return (
    <html lang="en">
      <head>
        <title>TDGH Incubator BMS | Business Model Canvas & Venture OS</title>
      </head>
      <body className="min-h-screen bg-[#F8F9FA] text-obsidian flex font-sans antialiased selection:bg-purple-600 selection:text-white">
        {/* Mobile Slide-Over Overlay */}
        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 bg-obsidian/60 z-50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileDrawerOpen(false)}
          />
        )}

        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR (Desktop Collapsible + Mobile Slide-Out Drawer) */}
        {/* ========================================================================= */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-porcelain-border flex flex-col justify-between transition-all duration-300 ease-in-out select-none
            ${mobileDrawerOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
            ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Brand Header with Platform Logo */}
            <div className="h-18 px-4 flex items-center justify-between border-b border-porcelain-border shrink-0">
              <Link
                href="http://localhost:3000"
                className="flex items-center gap-2 overflow-hidden group"
                title="Return to The Daily Grind Hub Main Site"
              >
                <div className="bg-porcelain px-2.5 py-1.5 rounded-xl border border-porcelain-border group-hover:border-purple-400 transition-colors shrink-0">
                  <Image
                    src="/logo.png"
                    alt="The Daily Grind Hub"
                    width={isCollapsed ? 100 : 130}
                    height={30}
                    className={`h-7 w-auto object-contain transition-all duration-200 ${
                      isCollapsed ? 'max-w-[40px] object-left' : ''
                    }`}
                    priority
                  />
                </div>
                {!isCollapsed && (
                  <span className="font-mono text-[10px] uppercase font-bold text-purple-700 tracking-wider hidden sm:inline">
                    Incubator
                  </span>
                )}
              </Link>

              {/* Mobile Close Button */}
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-obsidian-400 hover:text-obsidian hover:bg-porcelain transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Desktop Collapse / Expand Toggle Button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-1.5 rounded-lg text-obsidian-400 hover:text-purple-700 hover:bg-porcelain transition-colors"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-label="Toggle sidebar collapse"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Sidebar Icon-Predominant Navigation Menu */}
            <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
              {!isCollapsed && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-obsidian-400 font-bold">
                  Venture Workspace
                </div>
              )}

              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.fullLabel}
                    className={`flex items-center gap-3.5 rounded-xl transition-all group ${
                      isCollapsed
                        ? 'justify-center p-3'
                        : 'px-3.5 py-2.5'
                    } ${
                      isActive
                        ? 'bg-purple-700 text-white font-bold shadow-tactile'
                        : 'text-obsidian-600 hover:text-obsidian hover:bg-porcelain'
                    }`}
                  >
                    <div
                      className={`shrink-0 flex items-center justify-center ${
                        isActive
                          ? 'text-white'
                          : 'text-obsidian-500 group-hover:text-purple-700 transition-colors'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="text-xs tracking-tight truncate">
                          {item.fullLabel}
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer: Export Deck / PDF & Main Hub Link */}
            <div className="p-3 border-t border-porcelain-border bg-porcelain/40 space-y-2 shrink-0">
              {/* Export Deck / PDF Button */}
              {isCollapsed ? (
                <button
                  onClick={() => alert('Exporting 12-Slide Investor Summary & Canvas to PDF...')}
                  title="Export 12-Slide Deck / PDF"
                  className="w-full h-11 flex items-center justify-center rounded-xl bg-obsidian text-white hover:bg-purple-700 transition-colors shadow-tactile"
                >
                  <Download className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => alert('Exporting 12-Slide Investor Summary & Canvas to PDF...')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-obsidian text-white text-xs font-mono font-semibold hover:bg-purple-700 transition-colors shadow-tactile"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Deck / PDF</span>
                </button>
              )}

              {/* Return to Main Hub Link */}
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                title="Return to Public Hub Site"
                className={`flex items-center text-xs font-mono text-obsidian-500 hover:text-obsidian transition-colors rounded-lg py-1.5 ${
                  isCollapsed ? 'justify-center px-1' : 'justify-between px-2'
                }`}
              >
                {!isCollapsed && <span>TDGH Main Hub</span>}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. MAIN APPLICATION CONTENT WRAPPER */}
        {/* ========================================================================= */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
            isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          }`}
        >
          {/* ======================================================================= */}
          {/* 3. SIMPLIFIED TOP HEADER (With Right-Aligned Incubatee Info) */}
          {/* ======================================================================= */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-porcelain-border h-18 px-4 sm:px-8 flex items-center justify-between shadow-xs">
            {/* Left: Mobile Drawer Trigger + Active Module Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden p-2 rounded-xl text-obsidian-600 hover:bg-porcelain border border-porcelain-border transition-colors"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-obsidian-400 hidden sm:inline">
                  TDGH Incubator
                </span>
                <span className="text-obsidian-300 hidden sm:inline">/</span>
                <span className="text-xs font-mono font-bold text-obsidian tracking-tight">
                  {activeNav.label}
                </span>
              </div>
            </div>

            {/* Right: Incubatee Venture Information (Clean & Prominent) */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-black text-sm sm:text-base text-obsidian tracking-tight">
                    KasiPay Technologies (Pty) Ltd
                  </span>
                  <Badge variant="purple" className="shrink-0 text-[10px] py-0.5">
                    Sprint #3
                  </Badge>
                </div>
                <div className="text-[11px] font-mono text-obsidian-500 hidden md:block">
                  Founder: Sipho Ndlovu &bull; Mentor: Tariq Johnson
                </div>
              </div>

              <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-mono font-black text-sm shadow-tactile shrink-0">
                KP
              </div>
            </div>
          </header>

          {/* Main Viewport Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-28 lg:pb-12">
            {children}
          </main>
        </div>

        {/* ========================================================================= */}
        {/* 4. MOBILE BOTTOM DOCK BAR (Icon-Predominant Quick Switching) */}
        {/* ========================================================================= */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-porcelain-border flex items-center justify-around py-2 px-2 shadow-2xl">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                  isActive
                    ? 'text-purple-700 font-bold'
                    : 'text-obsidian-500 hover:text-obsidian'
                }`}
              >
                <div
                  className={`p-1 rounded-lg ${
                    isActive ? 'bg-purple-100 text-purple-700' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ========================================================================= */}
        {/* 5. FLOATING SPRINT PROGRESS WIDGET (Bottom-Right Docked) */}
        {/* ========================================================================= */}
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 transition-all duration-300">
          {isSprintMinimized ? (
            /* Minimized Floating Pill */
            <button
              onClick={() => setIsSprintMinimized(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-porcelain-border shadow-tactile-hover hover:border-purple-400 transition-all group"
              title="Expand Sprint Progress"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-obsidian group-hover:text-purple-700">
                Sprint #3: 60%
              </span>
              <Maximize2 className="w-3.5 h-3.5 text-obsidian-400 group-hover:text-obsidian" />
            </button>
          ) : (
            /* Expanded Floating Status Card */
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-porcelain-border shadow-tactile-hover p-4 w-72 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between border-b border-porcelain-border pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-obsidian-600">
                    Sprint Progress
                  </span>
                </div>
                <button
                  onClick={() => setIsSprintMinimized(true)}
                  className="p-1 rounded-md text-obsidian-400 hover:text-obsidian hover:bg-porcelain transition-colors"
                  title="Minimize Widget"
                  aria-label="Minimize progress widget"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-obsidian-500">Week 6 of 10</span>
                <span className="font-mono font-bold text-purple-700">60% Validated</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-porcelain rounded-full h-2 overflow-hidden border border-porcelain-border">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-800 rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>

              <div className="text-[11px] font-mono text-obsidian-500 flex items-center justify-between pt-0.5">
                <span className="truncate">Current: Field Survey</span>
                <span className="text-emerald-600 font-bold shrink-0">On Track</span>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}

