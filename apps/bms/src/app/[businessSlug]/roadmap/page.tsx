'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { tdghDb } from '@tdgh/db';
import { BmsMilestone } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import {
  CheckCircle2,
  Circle,
  FileText,
  Check,
  ShieldCheck,
  Sparkles,
  Plus,
  Upload,
  UserCheck,
  Clock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export default function BmsRoadmapPage() {
  const params = useParams();
  const businessSlug = (params?.businessSlug as string) || 'kasipay';

  const [milestones, setMilestones] = useState<BmsMilestone[]>(() =>
    tdghDb.getBmsRoadmap(businessSlug)
  );
  const [canvas] = useState(() => tdghDb.getBmsCanvas(businessSlug));

  // Mentor Feed Modal State
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [newWeekRange, setNewWeekRange] = useState('Weeks 11-12');
  const [newPhaseTitle, setNewPhaseTitle] = useState('');
  const [newDirective, setNewDirective] = useState('');
  const [newObjectives, setNewObjectives] = useState('');

  // Deliverable Submission Modal State
  const [submittingMilestone, setSubmittingMilestone] = useState<BmsMilestone | null>(null);
  const [deliverableFile, setDeliverableFile] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const handleToggle = (id: string) => {
    tdghDb.toggleBmsMilestone(businessSlug, id);
    setMilestones([...tdghDb.getBmsRoadmap(businessSlug)]);
  };

  const handleFeedDirectiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhaseTitle.trim() || !newDirective.trim()) return;

    const parsedObjectives = newObjectives
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    tdghDb.addBmsMilestone(businessSlug, {
      weekRange: newWeekRange.trim(),
      phaseTitle: newPhaseTitle.trim(),
      mentorDirective: newDirective.trim(),
      objectives: parsedObjectives.length > 0 ? parsedObjectives : ['Execute mentor directive deliverables'],
      completed: false,
      mentorApproved: false,
      assignedMentorId: canvas.assignedMentorId || 'team-4',
      assignedMentorName: canvas.assignedMentorName || 'Tariq Johnson',
    });

    setMilestones([...tdghDb.getBmsRoadmap(businessSlug)]);
    setIsFeedModalOpen(false);
    setNewPhaseTitle('');
    setNewDirective('');
    setNewObjectives('');
    triggerBanner(`New sprint milestone fed into roadmap by Mentor ${canvas.assignedMentorName || 'Tariq Johnson'}!`);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingMilestone || !deliverableFile.trim()) return;

    tdghDb.submitBmsDeliverable(
      businessSlug,
      submittingMilestone.id,
      deliverableFile.trim(),
      deliverableUrl.trim() || undefined
    );

    setMilestones([...tdghDb.getBmsRoadmap(businessSlug)]);
    setSubmittingMilestone(null);
    setDeliverableFile('');
    setDeliverableUrl('');
    triggerBanner('Milestone deliverable proof submitted for mentor review & sign-off!');
  };

  const handleMentorSignOff = (milestoneId: string) => {
    tdghDb.approveBmsMilestone(businessSlug, milestoneId);
    setMilestones([...tdghDb.getBmsRoadmap(businessSlug)]);
    triggerBanner(`Milestone signed off and officially approved by Mentor ${canvas.assignedMentorName || 'Tariq Johnson'}!`);
  };

  const triggerBanner = (msg: string) => {
    setSuccessBanner(msg);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* 1. MENTOR DIRECTIVE & SYLLABUS FEED BANNER */}
      <div className="bg-gradient-to-br from-purple-900 via-obsidian to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold">
                Mentor-Fed Sprint Syllabus
              </span>
              <span className="text-purple-300 text-xs font-mono">
                Curated by Faculty Lead: {canvas.assignedMentorName || 'Tariq Johnson'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Pre-Incubation Sprint Roadmap
            </h1>

            <p className="text-xs sm:text-sm text-purple-200/90 max-w-2xl leading-relaxed">
              This roadmap is fed directly into the BMS by your mentor. Every milestone reflects concrete customer validation targets, regulatory gates, and deliverable sign-offs required prior to Demo Day.
            </p>
          </div>

          {/* Action to Feed New Sprint Directives */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              onClick={() => setIsFeedModalOpen(true)}
              variant="electric"
              size="sm"
              className="bg-white text-obsidian hover:bg-purple-50 font-mono text-xs font-bold gap-1.5 shadow-md"
            >
              <Plus className="w-3.5 h-3.5 text-purple-700" />
              <span>Feed Mentor Directive</span>
            </Button>

            <a
              href="http://localhost:3001/mentorship"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-medium text-white transition-colors flex items-center gap-1.5"
            >
              <span>Faculty Cockpit</span>
              <ExternalLink className="w-3 h-3 text-purple-300" />
            </a>
          </div>
        </div>

        {/* Sprint Progress Gauge */}
        <div className="mt-6 pt-6 border-t border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-purple-400/30 flex items-center justify-center font-mono font-black text-lg text-purple-200">
              {progressPercent}%
            </div>
            <div>
              <div className="text-xs font-mono text-purple-200 font-semibold">
                Syllabus Validation Progress
              </div>
              <div className="text-[11px] font-mono text-purple-300/80">
                {completedCount} of {milestones.length} sprint milestones validated
              </div>
            </div>
          </div>

          <div className="w-full sm:w-64 bg-white/10 rounded-full h-2.5 overflow-hidden border border-purple-400/20">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {successBanner && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* 2. TIMELINE OF MENTOR-FED MILESTONES */}
      <div className="space-y-5">
        {milestones.map((milestone, idx) => (
          <div
            key={milestone.id}
            className={`bg-white rounded-3xl border p-6 sm:p-7 shadow-xs transition-all ${
              milestone.completed
                ? 'border-emerald-200 bg-emerald-50/15'
                : 'border-porcelain-border hover:border-obsidian'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left Column: Milestone Info & Mentor Directives */}
              <div className="flex items-start gap-4 flex-1">
                <button
                  onClick={() => handleToggle(milestone.id)}
                  className="mt-1 text-obsidian hover:text-emerald-600 transition-colors shrink-0"
                  title="Toggle milestone completion"
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-obsidian-300" />
                  )}
                </button>

                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                      {milestone.weekRange}
                    </span>
                    <h3 className="text-lg font-bold text-obsidian tracking-tight">
                      {milestone.phaseTitle}
                    </h3>
                  </div>

                  {/* Highlighted Mentor Directive Box */}
                  {milestone.mentorDirective && (
                    <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-800 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                        <span>Mentor Directive &bull; {milestone.assignedMentorName || 'Tariq Johnson'}</span>
                      </div>
                      <p className="text-xs text-obsidian-700 leading-relaxed font-sans">
                        "{milestone.mentorDirective}"
                      </p>
                    </div>
                  )}

                  {/* Concrete Milestone Objectives */}
                  <ul className="space-y-1.5 pt-1">
                    {milestone.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-obsidian-700 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>

                  {milestone.notes && (
                    <div className="p-3 rounded-xl bg-porcelain border border-porcelain-border text-xs text-obsidian-600 italic">
                      Mentor Evaluation: "{milestone.notes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Deliverables, Verification & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0 pt-2 lg:pt-0 border-t sm:border-t-0 border-porcelain-border">
                <Badge variant={milestone.completed ? 'emerald' : 'amber'}>
                  {milestone.completed ? 'Sprint Validated' : 'In Progress'}
                </Badge>

                {milestone.mentorApproved ? (
                  <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1.5 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Mentor Approved
                  </span>
                ) : (
                  <button
                    onClick={() => handleMentorSignOff(milestone.id)}
                    className="text-[11px] font-mono text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-200 font-semibold flex items-center gap-1 transition-colors"
                    title="Sign off as assigned mentor"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Mentor Sign-Off</span>
                  </button>
                )}

                {/* Deliverable Proof Badge or Submission Trigger */}
                {milestone.deliverableSubmitted ? (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-obsidian-700 bg-porcelain px-3 py-1.5 rounded-xl border border-porcelain-border">
                    <FileText className="w-3.5 h-3.5 text-purple-700" />
                    <span className="truncate max-w-[180px]">{milestone.deliverableSubmitted}</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => setSubmittingMilestone(milestone)}
                    variant="secondary"
                    size="sm"
                    className="font-mono text-xs gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-purple-700" />
                    <span>Submit Deliverable</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. FEED MENTOR DIRECTIVE MODAL */}
      {isFeedModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsFeedModalOpen(false)}
          title="Feed New Sprint Directive into Incubatee BMS"
          description={`Calibrate syllabus deliverables for ${canvas.businessName} as Mentor ${canvas.assignedMentorName || 'Tariq Johnson'}.`}
          maxWidth="lg"
        >
          <form onSubmit={handleFeedDirectiveSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Week Range *
                </label>
                <Input
                  required
                  placeholder="e.g. Weeks 11-12"
                  value={newWeekRange}
                  onChange={(e) => setNewWeekRange(e.target.value)}
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Sprint Phase Title *
                </label>
                <Input
                  required
                  placeholder="e.g. Institutional Seed Round & Growth GTM"
                  value={newPhaseTitle}
                  onChange={(e) => setNewPhaseTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                Mentor Directive & Strategic Focus *
              </label>
              <Textarea
                rows={3}
                required
                placeholder="Specify the exact challenge, customer interview quotas, or technical deliverable required..."
                value={newDirective}
                onChange={(e) => setNewDirective(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                Key Objectives (one per line)
              </label>
              <Textarea
                rows={3}
                placeholder="Conduct 15 merchant follow-up visits&#10;Finalize audited monthly revenue report&#10;Present to TDGH Angel Syndicate"
                value={newObjectives}
                onChange={(e) => setNewObjectives(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsFeedModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Feed Directive to Incubatee &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* 4. SUBMIT DELIVERABLE PROOF MODAL */}
      {submittingMilestone && (
        <Modal
          isOpen={true}
          onClose={() => setSubmittingMilestone(null)}
          title={`Submit Deliverable: ${submittingMilestone.phaseTitle}`}
          description="Provide proof of completion (document, repository link, or video demo) for mentor verification."
          maxWidth="md"
        >
          <form onSubmit={handleSubmitProof} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                Deliverable Document / Artifact Name *
              </label>
              <Input
                required
                placeholder="e.g. spaza_survey_data_q3.pdf or figma_pos_prototype.fig"
                value={deliverableFile}
                onChange={(e) => setDeliverableFile(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                External Artifact Link / Demo URL (Optional)
              </label>
              <Input
                type="url"
                placeholder="https://github.com/... or https://figma.com/..."
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
              />
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
              <span className="font-bold font-mono text-[10px] uppercase">Review Notice</span>
              <p>
                Once submitted, Mentor {submittingMilestone.assignedMentorName || 'Tariq Johnson'} will be notified in the TDGH Faculty Cockpit to evaluate and sign off on this deliverable.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setSubmittingMilestone(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Submit for Mentor Review &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
