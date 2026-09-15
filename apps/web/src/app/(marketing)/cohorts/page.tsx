'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { CohortTrack } from '@tdgh/types';
import { Badge, Tabs, Button } from '@tdgh/ui';
import { Terminal, Box, ArrowRight, Calendar, Users, ExternalLink } from 'lucide-react';

export default function CohortsDirectoryPage() {
  const allCohorts = tdghDb.getCohorts();
  const [activeTrack, setActiveTrack] = useState<string>('ALL');

  const filtered = allCohorts.filter((c) => {
    if (activeTrack === 'ALL') return true;
    return c.track === activeTrack;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="electric">Graduate Archive & Capstones</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              2024 &bull; 2025 &bull; 2026 Intakes
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-4xl">
            The Pioneers of The Daily Grind Hub.
          </h1>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            Explore past and active student cohorts from Scottsville, Bloekombos, and Wallacedene. Review capstone code repositories, live deployed web applications, and 3D hardware prototypes.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-porcelain-border">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTrack('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors ${
                activeTrack === 'ALL'
                  ? 'bg-obsidian text-white'
                  : 'bg-porcelain text-obsidian-700 hover:bg-porcelain-muted border border-porcelain-border'
              }`}
            >
              All Tracks ({allCohorts.length})
            </button>
            <button
              onClick={() => setActiveTrack('CODETREPRENEURS')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTrack === 'CODETREPRENEURS'
                  ? 'bg-electric-cobalt text-white'
                  : 'bg-porcelain text-obsidian-700 hover:bg-porcelain-muted border border-porcelain-border'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> Codetrepreneurs
            </button>
            <button
              onClick={() => setActiveTrack('3D_PRINTING')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTrack === '3D_PRINTING'
                  ? 'bg-amber-600 text-white'
                  : 'bg-porcelain text-obsidian-700 hover:bg-porcelain-muted border border-porcelain-border'
              }`}
            >
              <Box className="w-3.5 h-3.5" /> 3D Maker Studio
            </button>
          </div>

          <span className="text-xs font-mono text-obsidian-500">
            Showing {filtered.length} Cohort Cycles
          </span>
        </div>

        {/* Cohort Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c) => {
            const trackSlug = c.track.toLowerCase().replace('_', '-');

            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors group space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-obsidian">
                      {c.year}
                    </span>
                    <Badge variant={c.status === 'ACTIVE' ? 'emerald' : 'default'}>
                      {c.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-obsidian tracking-tight group-hover:text-electric-cobalt transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-obsidian-500 font-mono mt-0.5">
                      {c.track === 'CODETREPRENEURS' ? '12-Month Software Engineering' : '6-Month Additive Lab'}
                    </p>
                  </div>

                  <p className="text-xs text-obsidian-600 leading-relaxed">
                    {c.summary}
                  </p>

                  <div className="pt-3 border-t border-porcelain-border space-y-2 text-xs font-mono text-obsidian-600">
                    <div className="flex items-center justify-between">
                      <span>Enrollment:</span>
                      <strong>{c.membersCount} Fellows</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Graduated Capstones:</span>
                      <strong>{c.capstones.length} Live Projects</strong>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/cohorts/${c.year}/${trackSlug}`}
                  className="w-full py-3 rounded-xl bg-obsidian text-white text-xs font-mono font-semibold text-center hover:bg-electric-cobalt transition-colors flex items-center justify-center gap-1.5 shadow-tactile"
                >
                  View Showcase & Capstones &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
