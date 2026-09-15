'use client';

import React, { useState } from 'react';
import { tdghDb } from '@tdgh/db';
import { Application, ApplicationStage } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import { UserCheck, Star, Calendar, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<Application[]>(tdghDb.getApplications());
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  // Scoring rubric state
  const [motivationScore, setMotivationScore] = useState(8);
  const [technicalScore, setTechnicalScore] = useState(7);
  const [feasibilityScore, setFeasibilityScore] = useState(8);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [interviewDate, setInterviewDate] = useState('');

  const handleStageAdvance = (appId: string, stage: ApplicationStage) => {
    tdghDb.updateApplicationStage(appId, stage);
    setApps([...tdghDb.getApplications()]);
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    tdghDb.updateApplicationStage(selectedApp.id, selectedApp.stage, [
      {
        motivation: motivationScore,
        technicalAptitude: technicalScore,
        feasibility: feasibilityScore,
        notes: reviewerNotes,
        reviewerId: 'team-admin',
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (interviewDate) {
      selectedApp.interviewDate = interviewDate;
      tdghDb.updateApplicationStage(selectedApp.id, 'INTERVIEW_SCHEDULED');
    }

    setApps([...tdghDb.getApplications()]);
    setIsScoreModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Admissions Funnel</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Cohort Intake Review
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Applicant Review & Scoring Rubrics
          </h1>
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="bg-white rounded-3xl border border-porcelain-border overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-porcelain border-b border-porcelain-border font-mono text-[11px] uppercase text-obsidian-500">
            <tr>
              <th className="p-4">Candidate</th>
              <th className="p-4">Track</th>
              <th className="p-4">Location</th>
              <th className="p-4">Submitted</th>
              <th className="p-4">Stage</th>
              <th className="p-4">Score</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-porcelain-border font-mono">
            {apps.map((app) => {
              const avgScore =
                app.scores && app.scores[0]
                  ? (
                      (app.scores[0].motivation +
                        app.scores[0].technicalAptitude +
                        app.scores[0].feasibility) /
                      3
                    ).toFixed(1)
                  : 'Unscored';

              return (
                <tr key={app.id} className="hover:bg-porcelain/50 transition-colors">
                  <td className="p-4 font-sans font-bold text-obsidian">
                    <div>{app.fullName}</div>
                    <div className="text-[11px] font-mono font-normal text-obsidian-500">
                      {app.email}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-electric-cobalt">{app.track}</td>
                  <td className="p-4 text-obsidian-600">{app.suburb}</td>
                  <td className="p-4 text-obsidian-500">
                    {new Date(app.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Badge variant={app.stage === 'ACCEPTED' ? 'emerald' : app.stage === 'IN_REVIEW' ? 'electric' : 'amber'}>
                      {app.stage}
                    </Badge>
                  </td>
                  <td className="p-4 font-bold text-obsidian">
                    {avgScore !== 'Unscored' ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" /> {avgScore} / 10
                      </span>
                    ) : (
                      <span className="text-obsidian-400">Pending</span>
                    )}
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setIsScoreModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 rounded bg-obsidian text-white text-[11px] font-semibold hover:bg-electric-cobalt transition-colors"
                    >
                      Score / Review
                    </button>
                    <button
                      onClick={() => handleStageAdvance(app.id, 'ACCEPTED')}
                      className="px-2 py-1.5 rounded bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors"
                      title="Accept Candidate"
                    >
                      &check; Accept
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Scoring Rubric & Interview Modal */}
      {selectedApp && (
        <Modal
          isOpen={isScoreModalOpen}
          onClose={() => setIsScoreModalOpen(false)}
          title={`Review Rubric: ${selectedApp.fullName}`}
          description={`Applying for ${selectedApp.track} • ${selectedApp.suburb}`}
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveScore} className="space-y-6">
            <div className="p-4 bg-porcelain rounded-xl border border-porcelain-border space-y-2 text-xs">
              <div className="font-mono text-obsidian-500 uppercase font-semibold">
                Candidate Motivation Payload:
              </div>
              <p className="text-obsidian-700 italic">"{selectedApp.payload.motivation}"</p>
              {selectedApp.payload.githubOrPortfolioUrl && (
                <div className="pt-2 text-[11px] font-mono">
                  <span>Portfolio Link: </span>
                  <a
                    href={selectedApp.payload.githubOrPortfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-electric-blue hover:underline"
                  >
                    {selectedApp.payload.githubOrPortfolioUrl} &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* Rubric Sliders */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase font-bold text-obsidian">
                Admissions Scoring Matrix (1 - 10)
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span>1. Motivation & Community Grit:</span>
                  <strong>{motivationScore} / 10</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={motivationScore}
                  onChange={(e) => setMotivationScore(Number(e.target.value))}
                  className="w-full accent-electric-cobalt"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span>2. Logical & Technical Aptitude:</span>
                  <strong>{technicalScore} / 10</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={technicalScore}
                  onChange={(e) => setTechnicalScore(Number(e.target.value))}
                  className="w-full accent-electric-cobalt"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span>3. Feasibility & Time Commitment:</span>
                  <strong>{feasibilityScore} / 10</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={feasibilityScore}
                  onChange={(e) => setFeasibilityScore(Number(e.target.value))}
                  className="w-full accent-electric-cobalt"
                />
              </div>
            </div>

            {/* Interview Trigger */}
            <div className="space-y-1.5 pt-2 border-t border-porcelain-border">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Schedule On-Site Interview (Optional)
              </label>
              <Input
                type="datetime-local"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Reviewer Evaluation Notes
              </label>
              <Textarea
                rows={3}
                placeholder="Internal commentary for admissions board..."
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsScoreModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Commit Score & Advance Stage &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
