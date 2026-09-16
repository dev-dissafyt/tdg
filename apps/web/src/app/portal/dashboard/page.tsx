'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tdghDb } from '@tdgh/db';
import { Badge, Button, Card, CardContent } from '@tdgh/ui';
import { Terminal, Box, Sparkles, Building2, Plus, Clock, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export default function PortalDashboardPage() {
  const applications = tdghDb.getApplications();
  const tickets = tdghDb.getTickets().filter((t) => t.submittedByEmail.includes('outlook') || t.submittedByName.includes('Kaylin') || true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="The Daily Grind Hub"
              width={140}
              height={33}
              className="h-7 w-auto object-contain"
              priority
            />
            <span className="text-obsidian-300">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-obsidian-500">
                Verified Candidate Dossier
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight">
            Welcome back, Kaylin Fortuin
          </h1>
          <p className="text-xs font-mono text-obsidian-600">
            Scottsville, Kraaifontein &bull; Primary Track: Codetrepreneurs Fellowship
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/portal/tickets"
            className="px-4 py-2.5 rounded-lg border border-porcelain-border text-xs font-mono font-semibold text-obsidian hover:bg-porcelain transition-colors"
          >
            My Support Inquiries ({tickets.length})
          </Link>
          <Link
            href="/portal/applications/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-obsidian text-white text-xs font-mono font-semibold hover:bg-electric-cobalt transition-colors shadow-tactile"
          >
            <Plus className="w-4 h-4" /> Start New Multi-Track Application
          </Link>
        </div>
      </div>

      {/* Active Applications Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-obsidian tracking-tight">
              Active Fellowship & Incubation Applications
            </h2>
            <p className="text-xs text-obsidian-500 font-mono mt-0.5">
              Real-time admission status tracking and interview scheduling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm flex flex-col justify-between space-y-6 hover:border-obsidian transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={app.stage === 'ACCEPTED' ? 'emerald' : app.stage === 'IN_REVIEW' ? 'electric' : 'amber'}>
                    {app.stage.replace('_', ' ')}
                  </Badge>
                  <span className="text-[11px] font-mono text-obsidian-400">
                    ID: {app.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-obsidian tracking-tight">
                    {app.track === 'CODETREPRENEURS'
                      ? 'Codetrepreneurs 2026'
                      : app.track === 'MAKER_3D'
                      ? '3D Maker Lab 2026'
                      : 'Pre-Incubation Startup'}
                  </h3>
                  <p className="text-xs font-mono text-obsidian-500">
                    Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <p className="text-xs text-obsidian-600 line-clamp-2 leading-relaxed">
                  "{app.payload.motivation}"
                </p>

                {app.interviewDate && (
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-950 font-mono">
                    <strong>Interview Confirmed:</strong>
                    <br />
                    {new Date(app.interviewDate).toLocaleString()} (4 Midway Boardroom)
                  </div>
                )}
              </div>

              <Link
                href={`/portal/applications/${app.id}`}
                className="w-full py-2.5 rounded-lg border border-porcelain-border bg-porcelain text-obsidian text-xs font-mono font-semibold text-center hover:bg-obsidian hover:text-white transition-colors"
              >
                Open Application Wizard & Dossier &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launch Track Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-obsidian">Available Open Intake Tracks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/portal/applications/new?track=CODETREPRENEURS"
            className="p-5 bg-white rounded-2xl border border-porcelain-border hover:border-electric-cobalt transition-colors flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-electric-cobalt flex items-center justify-center shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-obsidian group-hover:text-electric-cobalt">
                Codetrepreneurs 2026
              </div>
              <div className="text-xs text-obsidian-500 font-mono">1-Year Full-Stack Software</div>
            </div>
          </Link>

          <Link
            href="/portal/applications/new?track=MAKER_3D"
            className="p-5 bg-white rounded-2xl border border-porcelain-border hover:border-amber-500 transition-colors flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-obsidian group-hover:text-amber-600">
                3D Additive FabLab
              </div>
              <div className="text-xs text-obsidian-500 font-mono">6-Month Hardware Diploma</div>
            </div>
          </Link>

          <Link
            href="/portal/applications/new?track=INCUBATION"
            className="p-5 bg-white rounded-2xl border border-porcelain-border hover:border-purple-600 transition-colors flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-obsidian group-hover:text-purple-600">
                Pre-Incubator BMS
              </div>
              <div className="text-xs text-obsidian-500 font-mono">10-Week Venture Sprint</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
