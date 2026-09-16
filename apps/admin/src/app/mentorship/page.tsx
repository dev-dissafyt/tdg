'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import {
  MenteePortfolioItem,
  MentorshipSession,
  TeamMember,
} from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import {
  UserCheck,
  Compass,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  Search,
  Filter,
  Users,
  Award,
  BookOpen,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  Building,
  Target,
  FileText,
} from 'lucide-react';

export default function AdminMentorshipPage() {
  const teamMembers = tdghDb.getTeamMembers();
  const [selectedMentorId, setSelectedMentorId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Mentee portfolio & sessions
  const [mentees, setMentees] = useState<MenteePortfolioItem[]>(() =>
    tdghDb.getMenteePortfolio('ALL')
  );
  const [sessions, setSessions] = useState<MentorshipSession[]>(() =>
    tdghDb.getMentorshipSessions('ALL')
  );

  // Modal for logging 1-on-1 coaching session
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState<MenteePortfolioItem | null>(null);
  const [sessionForm, setSessionForm] = useState({
    sessionDate: new Date().toISOString().split('T')[0],
    topic: '',
    feedbackNotes: '',
    actionItem1: '',
    actionItem2: '',
    actionItem3: '',
    nextMeetingDate: '',
    status: 'COMPLETED' as 'COMPLETED' | 'SCHEDULED',
  });

  const refreshState = () => {
    setMentees(tdghDb.getMenteePortfolio(selectedMentorId));
    setSessions(tdghDb.getMentorshipSessions(selectedMentorId));
  };

  const handleMentorFilterChange = (mentorId: string) => {
    setSelectedMentorId(mentorId);
    setMentees(tdghDb.getMenteePortfolio(mentorId));
    setSessions(tdghDb.getMentorshipSessions(mentorId));
  };

  const handleOpenLogSession = (mentee: MenteePortfolioItem) => {
    setSelectedMentee(mentee);
    setSessionForm({
      sessionDate: new Date().toISOString().split('T')[0],
      topic: '',
      feedbackNotes: '',
      actionItem1: '',
      actionItem2: '',
      actionItem3: '',
      nextMeetingDate: '',
      status: 'COMPLETED',
    });
    setIsSessionModalOpen(true);
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentee) return;

    const actionItems = [
      sessionForm.actionItem1,
      sessionForm.actionItem2,
      sessionForm.actionItem3,
    ].filter(Boolean);

    tdghDb.createMentorshipSession({
      mentorId: selectedMentee.assignedMentorId,
      mentorName: selectedMentee.assignedMentorName,
      menteeId: selectedMentee.applicationId,
      menteeName: selectedMentee.menteeName,
      ventureName: selectedMentee.ventureName,
      sessionDate: new Date(sessionForm.sessionDate).toISOString(),
      topic: sessionForm.topic,
      feedbackNotes: sessionForm.feedbackNotes,
      actionItems,
      nextMeetingDate: sessionForm.nextMeetingDate
        ? new Date(sessionForm.nextMeetingDate).toISOString()
        : undefined,
      status: sessionForm.status,
    });

    refreshState();
    setIsSessionModalOpen(false);
  };

  const handleApproveMilestone = (businessSlug: string, milestoneTitle?: string) => {
    // Approve first pending milestone
    const roadmap = tdghDb.getBmsRoadmap(businessSlug);
    const pending = roadmap.find((m) => !m.mentorApproved);
    if (pending) {
      tdghDb.approveBmsMilestone(businessSlug, pending.id);
      refreshState();
    }
  };

  // Filtered mentees by search
  const filteredMentees = mentees.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.menteeName.toLowerCase().includes(q) ||
      m.ventureName.toLowerCase().includes(q) ||
      m.track.toLowerCase().includes(q) ||
      m.suburb.toLowerCase().includes(q)
    );
  });

  const activeMentor = teamMembers.find((m) => m.id === selectedMentorId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple">Mentorship Faculty Cockpit</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Venture Advisory & Sprint Reviews
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Mentor Portfolio & Mentee Tracking
          </h1>
          <p className="text-xs font-mono text-obsidian-600 mt-1">
            Where mentors track their assigned incubatees, review sprint milestones, and record 1-on-1 coaching notes.
          </p>
        </div>

        {/* Quick External BMS Link */}
        <div className="flex items-center gap-2">
          <a
            href="http://localhost:3002/kasipay/canvas"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-obsidian text-white text-xs font-mono font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-tactile"
          >
            <span>Open Incubatee BMS</span>
            <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
          </a>
        </div>
      </div>

      {/* MENTOR ROSTER SWITCHER */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-porcelain-border pb-4">
          <div>
            <h2 className="text-base font-bold text-obsidian flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-600" />
              Select Mentor Cockpit View
            </h2>
            <p className="text-xs text-obsidian-500 font-mono">
              Switch perspective to view mentees assigned to a specific advisor or department lead.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => handleMentorFilterChange('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors whitespace-nowrap ${
                selectedMentorId === 'ALL'
                  ? 'bg-obsidian text-white shadow-sm'
                  : 'bg-porcelain text-obsidian-600 hover:bg-porcelain-muted'
              }`}
            >
              All Faculty ({mentees.length} Mentees)
            </button>
            {teamMembers.map((m) => {
              const count = tdghDb.getMenteePortfolio(m.id).length;
              const isSelected = selectedMentorId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleMentorFilterChange(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'bg-porcelain text-obsidian-600 hover:bg-porcelain-muted'
                  }`}
                >
                  <span>{m.name.split(' ')[0]}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-obsidian/10 text-obsidian'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Mentor Profile Callout */}
        {activeMentor && (
          <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={activeMentor.avatarUrl}
                alt={activeMentor.name}
                className="w-12 h-12 rounded-xl object-cover border border-purple-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-obsidian">{activeMentor.name}</h3>
                  <Badge variant="purple" className="text-[10px]">
                    {activeMentor.department}
                  </Badge>
                </div>
                <p className="text-xs font-mono text-purple-900 font-medium">
                  {activeMentor.role}
                </p>
                <p className="text-[11px] text-obsidian-600 mt-0.5 max-w-xl line-clamp-1">
                  {activeMentor.bio}
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-purple-200 sm:pl-6 text-xs font-mono text-purple-950 shrink-0">
              <div>Assigned Mentees: <strong>{mentees.length} Ventures</strong></div>
              <div>Sessions Logged: <strong>{sessions.length} Touches</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-porcelain-border shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-obsidian-500 uppercase tracking-wider">
            Active Venture Mentees
          </span>
          <div className="text-2xl font-black text-obsidian font-mono">
            {filteredMentees.length}
          </div>
          <p className="text-[11px] text-emerald-600 font-mono">100% On-Boarded & Retained</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-porcelain-border shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-obsidian-500 uppercase tracking-wider">
            In-Flight 10-Wk Sprints
          </span>
          <div className="text-2xl font-black text-purple-700 font-mono">
            {filteredMentees.filter((m) => m.sprintProgressPercent < 100).length}
          </div>
          <p className="text-[11px] text-obsidian-500 font-mono">Active Sprint Roadmap Execution</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-porcelain-border shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-obsidian-500 uppercase tracking-wider">
            Milestones Awaiting Sign-Off
          </span>
          <div className="text-2xl font-black text-amber-600 font-mono">
            {filteredMentees.filter((m) => m.pendingDeliverable).length}
          </div>
          <p className="text-[11px] text-amber-700 font-mono">Deliverables Pending Advisor Review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-porcelain-border shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-obsidian-500 uppercase tracking-wider">
            1-on-1 Sessions Conducted
          </span>
          <div className="text-2xl font-black text-electric-cobalt font-mono">
            {sessions.filter((s) => s.status === 'COMPLETED').length}
          </div>
          <p className="text-[11px] text-electric-cobalt font-mono">Detailed Guidance Logs Kept</p>
        </div>
      </div>

      {/* MENTEES PORTFOLIO ROSTER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-obsidian tracking-tight">
              Assigned Mentee Portfolio & Venture Cockpits
            </h2>
            <p className="text-xs text-obsidian-500 font-mono">
              Click to open an incubatee's live BMS Business Model Canvas, inspect milestones, or log coaching sessions.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400" />
            <input
              type="text"
              placeholder="Search mentee or venture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-porcelain-border text-obsidian text-xs font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-obsidian shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentees.map((item) => (
            <div
              key={item.applicationId}
              className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Top Info Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold text-lg font-mono shrink-0">
                      {item.ventureName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-obsidian leading-snug">
                          {item.ventureName}
                        </h3>
                        <Badge variant="purple" className="text-[10px]">
                          {item.track}
                        </Badge>
                      </div>
                      <p className="text-xs text-obsidian-600 font-medium">
                        Founder: <strong>{item.menteeName}</strong> &bull; {item.suburb}
                      </p>
                      <p className="text-[11px] font-mono text-obsidian-400">
                        {item.menteeEmail} &bull; {item.menteePhone}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono bg-porcelain px-2.5 py-1 rounded-lg border border-porcelain-border text-obsidian-600">
                    Advisor: <strong className="text-purple-700">{item.assignedMentorName}</strong>
                  </span>
                </div>

                {/* Sprint Progress Meter */}
                <div className="p-4 bg-porcelain rounded-2xl border border-porcelain-border space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-obsidian-600 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-purple-600" />
                      Current Sprint Phase:
                    </span>
                    <strong className="text-purple-700">{item.sprintProgressPercent}% Complete</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-porcelain-muted overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-300"
                      style={{ width: `${item.sprintProgressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-obsidian-500 font-mono">
                    <span>{item.currentMilestonePhase}</span>
                    <span>10-Week Roadmap</span>
                  </div>
                </div>

                {/* Pending Deliverable Alert */}
                {item.pendingDeliverable && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-mono flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Deliverable Review: <strong>{item.pendingDeliverable}</strong></span>
                    </div>
                    <button
                      onClick={() => handleApproveMilestone(item.businessSlug)}
                      className="px-2 py-1 rounded bg-amber-600 text-white text-[10px] font-bold hover:bg-amber-700 transition-colors shrink-0"
                    >
                      &check; Sign Off
                    </button>
                  </div>
                )}

                {/* Next Touchpoint schedule */}
                <div className="flex items-center justify-between text-xs font-mono text-obsidian-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-obsidian-400" />
                    <span>
                      Next 1-on-1:{' '}
                      {item.nextSessionDate ? (
                        <strong className="text-obsidian">
                          {new Date(item.nextSessionDate).toLocaleDateString()}
                        </strong>
                      ) : (
                        <span className="text-obsidian-400">Not scheduled</span>
                      )}
                    </span>
                  </div>
                  {item.lastSessionDate && (
                    <span>Last Check-In: {new Date(item.lastSessionDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-porcelain-border flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`http://localhost:3002/${item.businessSlug}/canvas`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-porcelain border border-porcelain-border text-obsidian text-xs font-mono font-semibold hover:bg-obsidian hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>BMS Canvas</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <a
                    href={`http://localhost:3002/${item.businessSlug}/roadmap`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-porcelain border border-porcelain-border text-obsidian text-xs font-mono font-semibold hover:bg-obsidian hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Roadmap</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <Button
                  type="button"
                  variant="electric"
                  size="sm"
                  onClick={() => handleOpenLogSession(item)}
                  className="text-xs font-mono"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1" /> Log 1-on-1 Check-In
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT 1-ON-1 SESSIONS TIMELINE */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-porcelain-border pb-4">
          <div>
            <h2 className="text-lg font-bold text-obsidian flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-electric-cobalt" />
              Recent 1-on-1 Mentorship Sessions & Guidance Audit
            </h2>
            <p className="text-xs text-obsidian-500 font-mono">
              Chronological log of coaching touchpoints, advisor feedback, and agreed action items.
            </p>
          </div>
          <span className="text-xs font-mono text-obsidian-500">
            {sessions.length} Recorded Sessions
          </span>
        </div>

        <div className="divide-y divide-porcelain-border">
          {sessions.map((ses) => (
            <div key={ses.id} className="py-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-obsidian font-sans text-sm">
                    {ses.menteeName} ({ses.ventureName})
                  </span>
                  <Badge variant={ses.status === 'COMPLETED' ? 'emerald' : 'amber'}>
                    {ses.status}
                  </Badge>
                </div>
                <span className="font-mono text-obsidian-500">
                  {new Date(ses.sessionDate).toLocaleDateString()} &bull; Advisor:{' '}
                  <strong className="text-obsidian">{ses.mentorName}</strong>
                </span>
              </div>

              <div className="text-xs font-mono font-bold text-purple-700">
                Topic: {ses.topic}
              </div>

              <p className="text-xs text-obsidian-700 italic bg-porcelain p-3 rounded-xl border border-porcelain-border">
                "{ses.feedbackNotes}"
              </p>

              {ses.actionItems && ses.actionItems.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono font-bold text-obsidian-500 uppercase">
                    Action Items:
                  </span>
                  {ses.actionItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-0.5 rounded-full"
                    >
                      &bull; {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: LOG 1-ON-1 COACHING SESSION */}
      {selectedMentee && (
        <Modal
          isOpen={isSessionModalOpen}
          onClose={() => setIsSessionModalOpen(false)}
          title={`Log 1-on-1 Session: ${selectedMentee.menteeName}`}
          description={`Coaching & sprint guidance log for ${selectedMentee.ventureName} • Mentor: ${selectedMentee.assignedMentorName}`}
          maxWidth="xl"
        >
          <form onSubmit={handleSaveSession} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  Session Date *
                </label>
                <Input
                  type="date"
                  required
                  value={sessionForm.sessionDate}
                  onChange={(e) =>
                    setSessionForm({ ...sessionForm, sessionDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  Session Status
                </label>
                <select
                  value={sessionForm.status}
                  onChange={(e) =>
                    setSessionForm({ ...sessionForm, status: e.target.value as any })
                  }
                  className="w-full h-11 bg-white border border-porcelain-border text-xs font-mono rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-obsidian"
                >
                  <option value="COMPLETED">Completed Session</option>
                  <option value="SCHEDULED">Upcoming Scheduled Session</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Session Discussion Topic *
              </label>
              <Input
                required
                placeholder="e.g. BMC Channel Validation, Spaza Merchant Pilot, Cash Flow Burn"
                value={sessionForm.topic}
                onChange={(e) => setSessionForm({ ...sessionForm, topic: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Mentor Advice, Guidance & Feedback Notes *
              </label>
              <Textarea
                required
                rows={3}
                placeholder="Record qualitative feedback, observed hurdles, and strategic recommendations..."
                value={sessionForm.feedbackNotes}
                onChange={(e) =>
                  setSessionForm({ ...sessionForm, feedbackNotes: e.target.value })
                }
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-porcelain-border">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Agreed Action Items for Mentee (Up to 3)
              </label>
              <Input
                placeholder="1. Action item (e.g. Finalize pricing matrix with 5 customers)"
                value={sessionForm.actionItem1}
                onChange={(e) =>
                  setSessionForm({ ...sessionForm, actionItem1: e.target.value })
                }
              />
              <Input
                placeholder="2. Action item (e.g. Upload CIPC MOI document to vault)"
                value={sessionForm.actionItem2}
                onChange={(e) =>
                  setSessionForm({ ...sessionForm, actionItem2: e.target.value })
                }
              />
              <Input
                placeholder="3. Action item (e.g. Complete sprint week 5 deliverable)"
                value={sessionForm.actionItem3}
                onChange={(e) =>
                  setSessionForm({ ...sessionForm, actionItem3: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Next Follow-Up Touchpoint Date (Optional)
              </label>
              <Input
                type="date"
                value={sessionForm.nextMeetingDate}
                onChange={(e) =>
                  setSessionForm({ ...sessionForm, nextMeetingDate: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsSessionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="electric" size="md">
                Save Mentorship Log &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

