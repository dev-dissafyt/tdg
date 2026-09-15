'use client';

import React, { useState } from 'react';
import { tdghDb } from '@tdgh/db';
import { Cohort, CohortTrack } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import { GraduationCap, Plus, Users, Calendar, Check, ExternalLink } from 'lucide-react';

export default function AdminCohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>(tdghDb.getCohorts());
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newCohortForm, setNewCohortForm] = useState({
    year: '2026' as '2024' | '2025' | '2026',
    track: 'CODETREPRENEURS' as CohortTrack,
    title: 'Codetrepreneurs Fellowship 2026',
    summary: '12-month full-stack immersion in Next.js, PostgreSQL and Lean Startup product launch.',
    startDate: '2026-02-01',
    endDate: '2026-11-30',
    membersCount: 24,
  });

  const handleCreateCohort = (e: React.FormEvent) => {
    e.preventDefault();
    const newCohort: Cohort = {
      id: `cohort-${Date.now()}`,
      year: newCohortForm.year,
      track: newCohortForm.track,
      title: newCohortForm.title,
      summary: newCohortForm.summary,
      startDate: newCohortForm.startDate,
      endDate: newCohortForm.endDate,
      status: 'UPCOMING',
      membersCount: newCohortForm.membersCount,
      members: [],
      capstones: [],
    };

    cohorts.unshift(newCohort);
    setCohorts([...cohorts]);
    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Cohort Operations</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Curriculum & Cycle Management
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Cohort Manager
          </h1>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsNewModalOpen(true)}
          className="shadow-tactile"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create New Cohort Cycle
        </Button>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-black font-mono text-obsidian">
                  {cohort.year}
                </span>
                <Badge variant={cohort.status === 'ACTIVE' ? 'emerald' : cohort.status === 'UPCOMING' ? 'amber' : 'default'}>
                  {cohort.status}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-obsidian tracking-tight">
                {cohort.title}
              </h3>
              <p className="text-xs text-obsidian-500 font-mono">
                Track: <strong>{cohort.track}</strong>
              </p>

              <p className="text-xs text-obsidian-600 leading-relaxed">
                {cohort.summary}
              </p>

              <div className="pt-3 border-t border-porcelain-border space-y-1 text-xs font-mono text-obsidian-500">
                <div className="flex justify-between">
                  <span>Enrolled Fellows:</span>
                  <strong className="text-obsidian">{cohort.membersCount} Students</strong>
                </div>
                <div className="flex justify-between">
                  <span>Graduated Capstones:</span>
                  <strong className="text-obsidian">{cohort.capstones.length} Projects</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-porcelain-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-600 font-bold">
                &bull; Mentors Assigned
              </span>
              <button className="px-3 py-1.5 bg-porcelain hover:bg-porcelain-muted rounded-lg text-xs font-mono font-semibold text-obsidian">
                Manage Roster &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Initialize New Cohort Cycle"
        description="Add a new annual slot for Codetrepreneurs or 3D Printing Studio"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateCohort} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Year Slot</label>
              <select
                className="w-full h-11 border rounded-lg px-3 text-sm"
                value={newCohortForm.year}
                onChange={(e) =>
                  setNewCohortForm({ ...newCohortForm, year: e.target.value as any })
                }
              >
                <option value="2026">2026 Intake</option>
                <option value="2025">2025 Intake</option>
                <option value="2024">2024 Intake</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Program Track</label>
              <select
                className="w-full h-11 border rounded-lg px-3 text-sm"
                value={newCohortForm.track}
                onChange={(e) =>
                  setNewCohortForm({ ...newCohortForm, track: e.target.value as any })
                }
              >
                <option value="CODETREPRENEURS">CODETREPRENEURS (1-Year)</option>
                <option value="3D_PRINTING">3D_PRINTING (6-Month)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold uppercase">Cohort Title</label>
            <Input
              required
              value={newCohortForm.title}
              onChange={(e) => setNewCohortForm({ ...newCohortForm, title: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold uppercase">Curriculum Summary</label>
            <Textarea
              rows={3}
              required
              value={newCohortForm.summary}
              onChange={(e) => setNewCohortForm({ ...newCohortForm, summary: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Start Date</label>
              <Input
                type="date"
                required
                value={newCohortForm.startDate}
                onChange={(e) => setNewCohortForm({ ...newCohortForm, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Target Cap Size</label>
              <Input
                type="number"
                value={newCohortForm.membersCount}
                onChange={(e) =>
                  setNewCohortForm({ ...newCohortForm, membersCount: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsNewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create Cohort Cycle &rarr;
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
