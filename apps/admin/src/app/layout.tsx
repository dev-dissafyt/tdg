'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './globals.css';
import {
  LayoutDashboard,
  Inbox,
  UserCheck,
  Compass,
  GraduationCap,
  Users,
  Building2,
  Search,
  ExternalLink,
  Bell,
  Shield,
  LogOut,
  Command,
} from 'lucide-react';
import { Badge } from '@tdgh/ui';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Operational Telemetry', href: '/', icon: LayoutDashboard },
    { label: 'Ticketing Triage Console', href: '/tickets', icon: Inbox, badge: '3' },
    { label: 'Admissions Funnel', href: '/applications', icon: UserCheck, badge: '3 New' },
    { label: 'Mentorship & Mentees', href: '/mentorship', icon: Compass, badge: 'Faculty' },
    { label: 'Cohort Manager', href: '/cohorts', icon: GraduationCap },
    { label: 'Team & Mentors CMS', href: '/team', icon: Users },
    { label: 'Cowork Space & Floorplan', href: '/cms/cowork-spaces', icon: Building2 },
  ];

  return (
    <html lang="en">
      <head>
        <title>TDGH Control Room | Admin & Ticketing Triage</title>
      </head>
      <body className="min-h-screen bg-[#F4F5F7] text-obsidian flex font-sans">
        {/* Persistent Admin Sidebar */}
        <aside className="w-64 bg-obsidian text-white flex flex-col justify-between border-r border-obsidian-800 shrink-0 select-none">
          <div className="p-6 space-y-6">
            {/* Logo & Console Identity */}
            <div className="space-y-3">
              <Link
                href="/"
                className="block bg-white px-3.5 py-2.5 rounded-2xl shadow-tactile hover:bg-porcelain transition-all group"
                title="The Daily Grind Hub"
              >
                <Image
                  src="/logo.png"
                  alt="The Daily Grind Hub"
                  width={180}
                  height={43}
                  className="h-7 w-auto object-contain mx-auto transition-transform group-hover:scale-102"
                  priority
                />
              </Link>
              <div className="flex items-center justify-between px-1">
                <span className="font-mono text-[11px] font-bold text-obsidian-300 uppercase tracking-wider">
                  Control Room
                </span>
                <span className="bg-electric-cobalt text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </div>

            {/* Quick Search Shortcut Command */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search hub... (⌘+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-obsidian-900 border border-obsidian-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-obsidian-500 focus:outline-none focus:border-electric-cobalt font-mono"
              />
              <Search className="w-3.5 h-3.5 text-obsidian-500 absolute right-2.5 top-2.5" />
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-electric-cobalt text-white font-semibold shadow-sm'
                        : 'text-obsidian-300 hover:bg-obsidian-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-obsidian-800 text-obsidian-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Cross Ecosystem Portals & User Footer */}
          <div className="p-6 border-t border-obsidian-800 space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-obsidian-400">
                Cross-Domain Switcher
              </span>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-xs text-obsidian-300 hover:text-white py-1 transition-colors"
              >
                <span>Public Web & Portal</span>
                <ExternalLink className="w-3 h-3 text-obsidian-500" />
              </a>
              <a
                href="http://localhost:3002/kasipay/canvas"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-xs text-amber-400 hover:text-amber-300 py-1 transition-colors"
              >
                <span>Incubatee BMS (KasiPay)</span>
                <ExternalLink className="w-3 h-3 text-amber-500" />
              </a>
            </div>

            <div className="pt-3 border-t border-obsidian-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                  KM
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-tight">Kurt Minnaar</span>
                  <span className="text-[10px] font-mono text-obsidian-400">Super Admin</span>
                </div>
              </div>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </aside>

        {/* Admin Content Canvas */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Operational Bar */}
          <header className="h-16 bg-white border-b border-porcelain-border px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-xs font-mono text-obsidian-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Scottsville Server Cluster &bull; Latency: 4ms &bull; Database: PostgreSQL / Supabase</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-mono text-obsidian-600 bg-porcelain px-3 py-1.5 rounded-lg border border-porcelain-border">
                <Bell className="w-3.5 h-3.5 text-electric-cobalt" />
                <span>3 Pending Triage</span>
              </div>
            </div>
          </header>

          {/* Main Subpage Viewport */}
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
