'use client';

import React, { useState } from 'react';
import { tdghDb } from '@tdgh/db';
import {
  Application,
  ApplicationStage,
  IntakeWindow,
  ProgramTrack,
  TeamMember,
} from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import {
  UserCheck,
  Star,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Filter,
  Search,
  Users,
  Settings,
  UserPlus,
  FileCheck,
  ArrowRight,
  Lock,
  Unlock,
  CheckSquare,
  Square,
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<Application[]>(() => tdghDb.getApplications());
  const [intakeWindows, setIntakeWindows] = useState<IntakeWindow[]>(() => tdghDb.getIntakeWindows());
  const teamMembers = tdghDb.getTeamMembers();

  // Selected filters
  const [stageFilter, setStageFilter] = useState<'ALL' | ApplicationStage>('ALL');
  const [trackFilter, setTrackFilter] = useState<'ALL' | ProgramTrack>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [isWindowModalOpen, setIsWindowModalOpen] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState<IntakeWindow | null>(null);

  // Scoring rubric state
  const [motivationScore, setMotivationScore] = useState(8);
  const [technicalScore, setTechnicalScore] = useState(7);
  const [feasibilityScore, setFeasibilityScore] = useState(8);
  const [scoreNotes, setScoreNotes] = useState('');
  const [interviewDate, setInterviewDate] = useState('');

  // Document verification checklist state
  const [verificationForm, setVerificationForm] = useState({
    idDocumentVerified: false,
    proofOfAddressVerified: false,
    academicRecordVerified: false,
    complianceOrPitchVerified: false,
    verifiedByStaffId: 'team-admin',
    auditNotes: '',
    popiaConsentConfirmed: true,
  });

  // Mentor assignment state
  const [assignedMentorId, setAssignedMentorId] = useState('');
  const [mentorNotes, setMentorNotes] = useState('');

  // Window edit state
  const [windowForm, setWindowForm] = useState({
    isOpen: true,
    nextOpenDate: '',
    deadlineDate: '',
    capacityLimit: 30,
    statusNotice: '',
  });

  const refreshState = () => {
    setApps([...tdghDb.getApplications()]);
    setIntakeWindows([...tdghDb.getIntakeWindows()]);
  };

  // Quick toggle intake window open/closed
  const handleToggleWindow = (track: ProgramTrack, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;
    tdghDb.updateIntakeWindow(track, {
      isOpen: updatedStatus,
      statusNotice: updatedStatus
        ? 'Cohort Intake Active — Applications Open'
        : 'Intake Closed — Priority Waitlist Active',
    });
    refreshState();
  };

  // Open window edit modal
  const handleOpenWindowEdit = (win: IntakeWindow) => {
    setSelectedWindow(win);
    setWindowForm({
      isOpen: win.isOpen,
      nextOpenDate: win.nextOpenDate || '',
      deadlineDate: win.deadlineDate || '',
      capacityLimit: win.capacityLimit,
      statusNotice: win.statusNotice,
    });
    setIsWindowModalOpen(true);
  };

  const handleSaveWindowSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWindow) return;
    tdghDb.updateIntakeWindow(selectedWindow.track, {
      isOpen: windowForm.isOpen,
      nextOpenDate: windowForm.nextOpenDate || undefined,
      deadlineDate: windowForm.deadlineDate || undefined,
      capacityLimit: Number(windowForm.capacityLimit),
      statusNotice: windowForm.statusNotice,
    });
    refreshState();
    setIsWindowModalOpen(false);
  };

  // Open Document Verification Modal
  const handleOpenVerification = (app: Application) => {
    setSelectedApp(app);
    setVerificationForm({
      idDocumentVerified: app.verificationStatus?.idDocumentVerified || false,
      proofOfAddressVerified: app.verificationStatus?.proofOfAddressVerified || false,
      academicRecordVerified: app.verificationStatus?.academicRecordVerified || false,
      complianceOrPitchVerified: app.verificationStatus?.complianceOrPitchVerified || false,
      verifiedByStaffId: app.verificationStatus?.verifiedByStaffId || 'team-admin',
      auditNotes: app.verificationStatus?.auditNotes || '',
      popiaConsentConfirmed: true,
    });
    setIsVerificationModalOpen(true);
  };

  const handleSaveVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    tdghDb.updateApplicationVerification(selectedApp.id, {
      idDocumentVerified: verificationForm.idDocumentVerified,
      proofOfAddressVerified: verificationForm.proofOfAddressVerified,
      academicRecordVerified: verificationForm.academicRecordVerified,
      complianceOrPitchVerified: verificationForm.complianceOrPitchVerified,
      verifiedByStaffId: verificationForm.verifiedByStaffId,
      auditNotes: verificationForm.auditNotes,
    });

    refreshState();
    setIsVerificationModalOpen(false);
  };

  // Open Mentor Assignment Modal
  const handleOpenMentorAssignment = (app: Application) => {
    setSelectedApp(app);
    setAssignedMentorId(app.assignedMentorId || teamMembers[0]?.id || '');
    setMentorNotes('');
    setIsMentorModalOpen(true);
  };

  const handleSaveMentorAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const mentor = teamMembers.find((m) => m.id === assignedMentorId);
    if (mentor) {
      tdghDb.assignMentorToApplication(selectedApp.id, mentor.id, mentor.name);
    }
    refreshState();
    setIsMentorModalOpen(false);
  };

  // Open Scoring modal
  const handleOpenScore = (app: Application) => {
    setSelectedApp(app);
    if (app.scores && app.scores[0]) {
      setMotivationScore(app.scores[0].motivation);
      setTechnicalScore(app.scores[0].technicalAptitude);
      setFeasibilityScore(app.scores[0].feasibility);
      setScoreNotes(app.scores[0].notes);
    } else {
      setMotivationScore(8);
      setTechnicalScore(7);
      setFeasibilityScore(8);
      setScoreNotes('');
    }
    setInterviewDate(app.interviewDate || '');
    setIsScoreModalOpen(true);
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    tdghDb.updateApplicationStage(selectedApp.id, selectedApp.stage, [
      {
        motivation: motivationScore,
        technicalAptitude: technicalScore,
        feasibility: feasibilityScore,
        notes: scoreNotes,
        reviewerId: 'team-admin',
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (interviewDate) {
      selectedApp.interviewDate = interviewDate;
      tdghDb.updateApplicationStage(selectedApp.id, 'INTERVIEW_SCHEDULED');
    }

    refreshState();
    setIsScoreModalOpen(false);
  };

  const handleStageAdvance = (appId: string, stage: ApplicationStage) => {
    tdghDb.updateApplicationStage(appId, stage);
    refreshState();
  };

  // Filtered applications
  const filteredApps = apps.filter((app) => {
    if (stageFilter !== 'ALL' && app.stage !== stageFilter) return false;
    if (trackFilter !== 'ALL' && app.track !== trackFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = app.fullName.toLowerCase().includes(q);
      const matchEmail = app.email.toLowerCase().includes(q);
      const matchSuburb = app.suburb.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchSuburb) return false;
    }
    return true;
  });

  // Compute counts
  const stageCounts = {
    ALL: apps.length,
    SUBMITTED: apps.filter((a) => a.stage === 'SUBMITTED').length,
    IN_REVIEW: apps.filter((a) => a.stage === 'IN_REVIEW').length,
    INTERVIEW_SCHEDULED: apps.filter((a) => a.stage === 'INTERVIEW_SCHEDULED').length,
    ACCEPTED: apps.filter((a) => a.stage === 'ACCEPTED').length,
    WAITLISTED: apps.filter((a) => a.stage === 'WAITLISTED').length,
    REJECTED: apps.filter((a) => a.stage === 'REJECTED').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Admissions & Intake Governance</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Operational Funnel & Document Audit
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Candidate Review, Verification & Mentor Allocation
          </h1>
          <p className="text-xs font-mono text-obsidian-600 mt-1">
            Manage cohort intake seasonal windows, statutory FICA/POPIA checklists, and assign mentors upon acceptance.
          </p>
        </div>
      </div>

      {/* INTAKE WINDOWS CONTROL MODULE */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-porcelain-border pb-4">
          <div>
            <h2 className="text-lg font-bold text-obsidian flex items-center gap-2">
              <Calendar className="w-5 h-5 text-electric-cobalt" />
              Program Intake Window Controls
            </h2>
            <p className="text-xs text-obsidian-500 font-mono">
              Toggle live admissions on/off by track. Off-season applications are automatically preserved in the Priority Waitlist.
            </p>
          </div>
          <div className="text-xs font-mono text-obsidian-600 bg-porcelain px-3 py-1.5 rounded-xl border border-porcelain-border">
            Total Waitlisted Dossiers: <strong className="text-amber-700">{stageCounts.WAITLISTED} candidates</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {intakeWindows.map((win) => {
            const waitlistCount = apps.filter(
              (a) => a.track === win.track && a.stage === 'WAITLISTED'
            ).length;
            const acceptedCount = apps.filter(
              (a) => a.track === win.track && a.stage === 'ACCEPTED'
            ).length;

            return (
              <div
                key={win.track}
                className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                  win.isOpen
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-amber-200 bg-amber-50/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-obsidian">
                      {win.track}
                    </span>
                    <Badge variant={win.isOpen ? 'emerald' : 'amber'}>
                      {win.isOpen ? 'OPEN' : 'WAITLIST ACTIVE'}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-sm text-obsidian leading-snug">{win.title}</h4>
                  <p className="text-[11px] text-obsidian-600 line-clamp-2">
                    {win.statusNotice}
                  </p>

                  <div className="pt-2 border-t border-porcelain-border/60 space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-obsidian-600">
                      <span>Capacity:</span>
                      <strong className="text-obsidian">{acceptedCount} / {win.capacityLimit} enrolled</strong>
                    </div>
                    {win.isOpen && win.deadlineDate && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Deadline:</span>
                        <span>{win.deadlineDate}</span>
                      </div>
                    )}
                    {!win.isOpen && win.nextOpenDate && (
                      <div className="flex justify-between text-amber-700">
                        <span>Next Intake:</span>
                        <span>{win.nextOpenDate}</span>
                      </div>
                    )}
                    {waitlistCount > 0 && (
                      <div className="flex justify-between text-amber-800 font-bold bg-amber-100/60 px-2 py-0.5 rounded">
                        <span>Waitlist Queue:</span>
                        <span>{waitlistCount} banked</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-porcelain-border/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleWindow(win.track, win.isOpen)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                      win.isOpen
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    }`}
                  >
                    {win.isOpen ? (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Close (Waitlist)
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" /> Open Intake
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenWindowEdit(win)}
                    className="p-1.5 rounded-lg text-obsidian-500 hover:bg-white hover:text-obsidian border border-transparent hover:border-porcelain-border transition-colors"
                    title="Edit Window Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-4 shadow-sm space-y-4">
        {/* Stage Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-porcelain-border font-mono text-xs">
          {[
            { id: 'ALL', label: 'All Dossiers', count: stageCounts.ALL },
            { id: 'SUBMITTED', label: 'Submitted', count: stageCounts.SUBMITTED },
            { id: 'IN_REVIEW', label: 'In Review', count: stageCounts.IN_REVIEW },
            { id: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled', count: stageCounts.INTERVIEW_SCHEDULED },
            { id: 'ACCEPTED', label: 'Accepted (Cohort)', count: stageCounts.ACCEPTED },
            { id: 'WAITLISTED', label: 'Priority Waitlist', count: stageCounts.WAITLISTED, isWaitlist: true },
            { id: 'REJECTED', label: 'Rejected', count: stageCounts.REJECTED },
          ].map((tab) => {
            const isSelected = stageFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStageFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 font-semibold ${
                  isSelected
                    ? tab.isWaitlist
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-obsidian text-white shadow-sm'
                    : tab.isWaitlist
                    ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                    : 'bg-porcelain text-obsidian-600 hover:bg-porcelain-muted'
                }`}
              >
                {tab.isWaitlist && <Clock className="w-3 h-3" />}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-obsidian/10 text-obsidian'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Track Filter & Search Query */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-obsidian-400" />
            <select
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value as any)}
              className="bg-porcelain border border-porcelain-border text-obsidian text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-obsidian"
            >
              <option value="ALL">All Program Tracks</option>
              <option value="CODETREPRENEURS">Codetrepreneurs</option>
              <option value="MAKER_3D">3D Printing Studio</option>
              <option value="INCUBATION">Pre-Incubation BMS</option>
              <option value="COWORKING">Co-Working Desk</option>
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-400" />
            <input
              type="text"
              placeholder="Search candidate, email, suburb..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-porcelain border border-porcelain-border text-obsidian text-xs font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-obsidian"
            />
          </div>
        </div>
      </div>

      {/* APPLICATIONS TABLE */}
      <div className="bg-white rounded-3xl border border-porcelain-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-porcelain border-b border-porcelain-border font-mono text-[11px] uppercase text-obsidian-500">
              <tr>
                <th className="p-4">Candidate & Contact</th>
                <th className="p-4">Track</th>
                <th className="p-4">Location</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Document Verification</th>
                <th className="p-4">Assigned Mentor</th>
                <th className="p-4">Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-porcelain-border font-mono">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-obsidian-400">
                    No applications matching current filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => {
                  const avgScore =
                    app.scores && app.scores[0]
                      ? (
                          (app.scores[0].motivation +
                            app.scores[0].technicalAptitude +
                            app.scores[0].feasibility) /
                          3
                        ).toFixed(1)
                      : 'Unscored';

                  // Verification count
                  const v = app.verificationStatus;
                  const verifiedCount = [
                    v?.idDocumentVerified,
                    v?.proofOfAddressVerified,
                    v?.academicRecordVerified,
                    v?.complianceOrPitchVerified,
                  ].filter(Boolean).length;

                  return (
                    <tr key={app.id} className="hover:bg-porcelain/50 transition-colors">
                      <td className="p-4 font-sans text-obsidian">
                        <div className="font-bold">{app.fullName}</div>
                        <div className="text-[11px] font-mono font-normal text-obsidian-500">
                          {app.email} &bull; {app.phone}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-electric-cobalt">{app.track}</td>
                      <td className="p-4 text-obsidian-600">{app.suburb}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            app.stage === 'ACCEPTED'
                              ? 'emerald'
                              : app.stage === 'WAITLISTED'
                              ? 'amber'
                              : app.stage === 'IN_REVIEW'
                              ? 'electric'
                              : app.stage === 'INTERVIEW_SCHEDULED'
                              ? 'purple'
                              : 'default'
                          }
                        >
                          {app.stage === 'WAITLISTED' ? (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> WAITLISTED
                            </span>
                          ) : (
                            app.stage.replace('_', ' ')
                          )}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleOpenVerification(app)}
                          className="flex items-center gap-1.5 text-[11px] hover:underline"
                        >
                          {verifiedCount === 4 ? (
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" /> 4/4 Verified
                            </span>
                          ) : verifiedCount > 0 ? (
                            <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-amber-600" /> {verifiedCount}/4 Complete
                            </span>
                          ) : (
                            <span className="text-obsidian-500 bg-porcelain border border-porcelain-border px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FileCheck className="w-3 h-3" /> Pending Audit
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        {app.assignedMentorName ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full text-[11px] font-sans font-medium flex items-center gap-1">
                              <UserCheck className="w-3 h-3 text-electric-cobalt" />
                              {app.assignedMentorName}
                            </span>
                            <button
                              onClick={() => handleOpenMentorAssignment(app)}
                              className="text-obsidian-400 hover:text-obsidian"
                              title="Reassign Mentor"
                            >
                              <Settings className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenMentorAssignment(app)}
                            className="text-obsidian-400 hover:text-electric-cobalt text-[11px] flex items-center gap-1 font-sans"
                          >
                            <UserPlus className="w-3 h-3" /> Assign Mentor
                          </button>
                        )}
                      </td>
                      <td className="p-4 font-bold text-obsidian">
                        {avgScore !== 'Unscored' ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-current" /> {avgScore} / 10
                          </span>
                        ) : (
                          <span className="text-obsidian-400 font-normal">Pending</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenVerification(app)}
                          className="px-2 py-1 rounded bg-porcelain border border-porcelain-border text-obsidian text-[11px] font-semibold hover:bg-porcelain-muted transition-colors"
                          title="Audit Candidate Documents"
                        >
                          Verify Docs
                        </button>
                        <button
                          onClick={() => handleOpenScore(app)}
                          className="px-2.5 py-1 rounded bg-obsidian text-white text-[11px] font-semibold hover:bg-electric-cobalt transition-colors"
                          title="Score Rubric"
                        >
                          Score
                        </button>
                        {app.stage !== 'ACCEPTED' ? (
                          <button
                            onClick={() => handleOpenMentorAssignment(app)}
                            className="px-2 py-1 rounded bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors"
                            title="Accept Candidate & Assign Mentor"
                          >
                            &check; Accept
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStageAdvance(app.id, 'IN_REVIEW')}
                            className="px-2 py-1 rounded bg-porcelain text-obsidian-600 text-[11px] hover:bg-porcelain-muted"
                            title="Re-open Review"
                          >
                            Revert
                          </button>
                        )}
                        {app.stage !== 'WAITLISTED' && (
                          <button
                            onClick={() => handleStageAdvance(app.id, 'WAITLISTED')}
                            className="px-2 py-1 rounded bg-amber-100 text-amber-900 text-[11px] font-semibold hover:bg-amber-200 transition-colors"
                            title="Move Candidate to Priority Waitlist"
                          >
                            Waitlist
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: STATUTORY DOCUMENT VERIFICATION CHECKLIST */}
      {selectedApp && (
        <Modal
          isOpen={isVerificationModalOpen}
          onClose={() => setIsVerificationModalOpen(false)}
          title={`Document Verification Audit: ${selectedApp.fullName}`}
          description={`POPIA & FICA Compliance Checklist for ${selectedApp.track} • Dossier ID: ${selectedApp.id}`}
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveVerification} className="space-y-6">
            <div className="p-4 bg-porcelain rounded-xl border border-porcelain-border space-y-2 text-xs">
              <div className="flex justify-between font-mono text-obsidian-500 uppercase font-semibold">
                <span>Candidate: {selectedApp.fullName}</span>
                <span>Suburb: {selectedApp.suburb}</span>
              </div>
              <p className="text-obsidian-700 italic">
                "{selectedApp.payload.motivation}"
              </p>
            </div>

            {/* 4-Point Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase font-bold text-obsidian flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-electric-cobalt" />
                TDGH Statutory Verification Requirements
              </h4>

              <div
                onClick={() =>
                  setVerificationForm({
                    ...verificationForm,
                    idDocumentVerified: !verificationForm.idDocumentVerified,
                  })
                }
                className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                  verificationForm.idDocumentVerified
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-porcelain-border hover:bg-porcelain'
                }`}
              >
                {verificationForm.idDocumentVerified ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-obsidian-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <h5 className="text-xs font-bold text-obsidian">
                    1. Certified South African ID Document (13-Digit)
                  </h5>
                  <p className="text-[11px] text-obsidian-500">
                    SAPS certified within last 3 months. Validates citizen identity, legal age, and youth demographic criteria (18–35 years).
                  </p>
                </div>
              </div>

              <div
                onClick={() =>
                  setVerificationForm({
                    ...verificationForm,
                    proofOfAddressVerified: !verificationForm.proofOfAddressVerified,
                  })
                }
                className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                  verificationForm.proofOfAddressVerified
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-porcelain-border hover:bg-porcelain'
                }`}
              >
                {verificationForm.proofOfAddressVerified ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-obsidian-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <h5 className="text-xs font-bold text-obsidian">
                    2. Proof of Residential Address (&lt; 3 Months)
                  </h5>
                  <p className="text-[11px] text-obsidian-500">
                    Municipal rates statement, formal lease agreement, or signed Ward Councillor affidavit verifying Kraaifontein / Oostenberg residency.
                  </p>
                </div>
              </div>

              <div
                onClick={() =>
                  setVerificationForm({
                    ...verificationForm,
                    academicRecordVerified: !verificationForm.academicRecordVerified,
                  })
                }
                className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                  verificationForm.academicRecordVerified
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-porcelain-border hover:bg-porcelain'
                }`}
              >
                {verificationForm.academicRecordVerified ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-obsidian-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <h5 className="text-xs font-bold text-obsidian">
                    3. Highest Academic / Matric Certificate
                  </h5>
                  <p className="text-[11px] text-obsidian-500">
                    National Senior Certificate (Grade 12), TVET N4–N6 certificate, or university transcript verifying foundational numeracy/literacy.
                  </p>
                </div>
              </div>

              <div
                onClick={() =>
                  setVerificationForm({
                    ...verificationForm,
                    complianceOrPitchVerified: !verificationForm.complianceOrPitchVerified,
                  })
                }
                className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                  verificationForm.complianceOrPitchVerified
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-porcelain-border hover:bg-porcelain'
                }`}
              >
                {verificationForm.complianceOrPitchVerified ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-obsidian-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <h5 className="text-xs font-bold text-obsidian">
                    4. Venture Compliance / Concept Deck / Technical Assessment
                  </h5>
                  <p className="text-[11px] text-obsidian-500">
                    CIPC registration certificate, SARS Tax PIN (for Incubation track), or GitHub portfolio / tech challenge submission.
                  </p>
                </div>
              </div>
            </div>

            {/* Reviewer Stamp & POPIA Consent */}
            <div className="space-y-3 pt-3 border-t border-porcelain-border">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-900 text-xs font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-electric-cobalt shrink-0" />
                <span>POPIA Consent Record: Candidate has consented to background verification & grant audit storage.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    Reviewing Staff Member
                  </label>
                  <Input
                    value={verificationForm.verifiedByStaffId}
                    onChange={(e) =>
                      setVerificationForm({
                        ...verificationForm,
                        verifiedByStaffId: e.target.value,
                      })
                    }
                    placeholder="Staff Reviewer ID"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    Audit Verification Timestamp
                  </label>
                  <Input disabled value={new Date().toLocaleDateString() + ' (Automated)'} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  Internal Compliance Audit Notes
                </label>
                <Textarea
                  rows={2}
                  placeholder="Record SAPS verification dates, councillor stamp numbers, or document anomalies..."
                  value={verificationForm.auditNotes}
                  onChange={(e) =>
                    setVerificationForm({
                      ...verificationForm,
                      auditNotes: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsVerificationModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Commit Document Audit &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 2: MENTOR ASSIGNMENT UPON ACCEPTANCE */}
      {selectedApp && (
        <Modal
          isOpen={isMentorModalOpen}
          onClose={() => setIsMentorModalOpen(false)}
          title={`Accept & Assign Mentor: ${selectedApp.fullName}`}
          description={`Allocate an industry mentor and transition dossier to ACCEPTED for ${selectedApp.track}`}
          maxWidth="xl"
        >
          <form onSubmit={handleSaveMentorAssignment} className="space-y-6">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-xs text-emerald-900">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Admissions Board Acceptance Action
              </div>
              <p>
                Confirming this action marks candidate as <strong>ACCEPTED</strong> and establishes their dedicated mentorship line in the BMS portal.
              </p>
            </div>

            {/* Mentor Selection List */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Select Dedicated Mentor / Department Lead
              </label>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {teamMembers.map((mentor) => {
                  const isSelected = assignedMentorId === mentor.id;
                  return (
                    <div
                      key={mentor.id}
                      onClick={() => setAssignedMentorId(mentor.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                        isSelected
                          ? 'border-electric-cobalt bg-blue-50/50 shadow-sm'
                          : 'border-porcelain-border hover:bg-porcelain'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-porcelain border border-porcelain-border flex items-center justify-center font-bold text-obsidian shrink-0">
                        {mentor.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-obsidian">{mentor.name}</h5>
                          <Badge variant="electric" className="text-[10px]">
                            {mentor.department}
                          </Badge>
                        </div>
                        <p className="text-[11px] font-mono text-obsidian-600">{mentor.role}</p>
                        <p className="text-[11px] text-obsidian-500 mt-1 line-clamp-1">{mentor.bio}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Initial Mentorship Mandate / Focus Area
              </label>
              <Textarea
                rows={2}
                placeholder="e.g. Focus on Lean Business Model Canvas validation, sprint deliverables, and customer discovery interviews."
                value={mentorNotes}
                onChange={(e) => setMentorNotes(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsMentorModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="electric" size="md">
                Confirm Acceptance & Assign Mentor &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 3: INTAKE WINDOW SETTINGS */}
      {selectedWindow && (
        <Modal
          isOpen={isWindowModalOpen}
          onClose={() => setIsWindowModalOpen(false)}
          title={`Configure Intake Window: ${selectedWindow.title}`}
          description={`Manage intake season toggles, capacity quotas, and public waitlist messaging for ${selectedWindow.track}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveWindowSettings} className="space-y-4">
            {/* Status Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-porcelain-border bg-porcelain">
              <div>
                <span className="text-xs font-mono font-bold text-obsidian uppercase">
                  Intake Window Status
                </span>
                <p className="text-[11px] text-obsidian-500">
                  When closed, the public portal informs applicants and automatically files dossiers into the priority waitlist.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWindowForm({ ...windowForm, isOpen: !windowForm.isOpen })}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                  windowForm.isOpen
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 text-white'
                }`}
              >
                {windowForm.isOpen ? 'ACTIVE (OPEN)' : 'CLOSED (WAITLIST)'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  Cohort Capacity Limit
                </label>
                <Input
                  type="number"
                  min="1"
                  max="200"
                  value={windowForm.capacityLimit}
                  onChange={(e) =>
                    setWindowForm({ ...windowForm, capacityLimit: Number(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  {windowForm.isOpen ? 'Application Deadline' : 'Next Intake Opening Date'}
                </label>
                <Input
                  type="date"
                  value={windowForm.isOpen ? windowForm.deadlineDate : windowForm.nextOpenDate}
                  onChange={(e) =>
                    windowForm.isOpen
                      ? setWindowForm({ ...windowForm, deadlineDate: e.target.value })
                      : setWindowForm({ ...windowForm, nextOpenDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Public Admissions Status Notice
              </label>
              <Input
                value={windowForm.statusNotice}
                onChange={(e) =>
                  setWindowForm({ ...windowForm, statusNotice: e.target.value })
                }
                placeholder="e.g. Intake Closed — Priority Waitlist Active (Re-opens Feb 2027)"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsWindowModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Update Intake Window &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 4: SCORING RUBRIC & INTERVIEW */}
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
                value={scoreNotes}
                onChange={(e) => setScoreNotes(e.target.value)}
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

