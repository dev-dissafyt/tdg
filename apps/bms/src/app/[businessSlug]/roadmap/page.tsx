'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { tdghDb } from '@tdgh/db';
import { BmsMilestone } from '@tdgh/types';
import { Badge, Button } from '@tdgh/ui';
import { CheckCircle2, Circle, FileText, Check, ShieldCheck, Clock, Award } from 'lucide-react';

export default function BmsRoadmapPage() {
  const params = useParams();
  const businessSlug = (params?.businessSlug as string) || 'kasipay';

  const [milestones, setMilestones] = useState<BmsMilestone[]>(
    tdghDb.getBmsRoadmap(businessSlug)
  );

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const handleToggle = (id: string) => {
    tdghDb.toggleBmsMilestone(businessSlug, id);
    setMilestones([...tdghDb.getBmsRoadmap(businessSlug)]);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple">10-Week Sprint Architecture</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              TDGH Pre-Incubator Accelerator Syllabus
            </span>
          </div>
          <h1 className="text-2xl font-black text-obsidian tracking-tight mt-1">
            Pre-Incubation Milestone Roadmap
          </h1>
        </div>

        {/* Progress Metric */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-porcelain-border shadow-xs">
          <div className="text-right">
            <div className="text-[11px] font-mono text-obsidian-500">Milestone Progress</div>
            <div className="text-lg font-black font-mono text-purple-700">
              {progressPercent}% Complete ({completedCount}/{milestones.length})
            </div>
          </div>
          <div className="w-16 h-2 rounded-full bg-porcelain-muted overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 10-Week Sprint Timeline Stages */}
      <div className="space-y-4">
        {milestones.map((milestone, idx) => (
          <div
            key={milestone.id}
            className={`bg-white rounded-3xl border p-6 shadow-sm transition-all ${
              milestone.completed
                ? 'border-emerald-200 bg-emerald-50/20'
                : 'border-porcelain-border hover:border-obsidian'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggle(milestone.id)}
                  className="mt-1 text-obsidian hover:text-emerald-600 transition-colors"
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-obsidian-300" />
                  )}
                </button>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {milestone.weekRange}
                    </span>
                    <h3 className="text-lg font-bold text-obsidian tracking-tight">
                      {milestone.phaseTitle}
                    </h3>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {milestone.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-obsidian-600 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>

                  {milestone.notes && (
                    <div className="p-3 rounded-xl bg-porcelain border border-porcelain-border text-xs text-obsidian-600 italic">
                      Mentor Feedback: "{milestone.notes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badges & Deliverables */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                <Badge variant={milestone.completed ? 'emerald' : 'amber'}>
                  {milestone.completed ? 'Sprint Validated' : 'In Progress'}
                </Badge>

                {milestone.mentorApproved && (
                  <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Tariq Johnson Approved
                  </span>
                )}

                {milestone.deliverableSubmitted && (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-obsidian-500 bg-porcelain px-2 py-1 rounded border border-porcelain-border">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>{milestone.deliverableSubmitted}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
