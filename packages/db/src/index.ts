export * from './seed-data';
import {
  SEED_COWORK_ZONES,
  SEED_COHORTS,
  SEED_TEAM,
  SEED_TICKETS,
  SEED_APPLICATIONS,
  SEED_INTAKE_WINDOWS,
  SEED_MENTORSHIP_SESSIONS,
  SEED_BMS_CANVAS,
  SEED_BMS_ROADMAP,
  SEED_BMS_KPIS,
  SEED_BMS_DOCS,
} from './seed-data';
import {
  CoworkZone,
  Cohort,
  TeamMember,
  Ticket,
  Application,
  IntakeWindow,
  ApplicationVerification,
  MentorshipSession,
  MenteePortfolioItem,
  ProgramTrack,
  BmsCanvas,
  BmsMilestone,
  BmsKpis,
  BmsDocument,
  TicketMessage,
} from '@tdgh/types';

// In-memory persistent state store for local dev & demo
class TdghRepository {
  private coworkZones: CoworkZone[] = [...SEED_COWORK_ZONES];
  private cohorts: Cohort[] = [...SEED_COHORTS];
  private teamMembers: TeamMember[] = [...SEED_TEAM];
  private tickets: Ticket[] = [...SEED_TICKETS];
  private applications: Application[] = [...SEED_APPLICATIONS];
  private intakeWindows: IntakeWindow[] = [...SEED_INTAKE_WINDOWS];
  private mentorshipSessions: MentorshipSession[] = [...SEED_MENTORSHIP_SESSIONS];
  private bmsCanvases: Record<string, BmsCanvas> = {
    kasipay: { ...SEED_BMS_CANVAS },
  };
  private bmsRoadmaps: Record<string, BmsMilestone[]> = {
    kasipay: [...SEED_BMS_ROADMAP],
  };
  private bmsKpis: Record<string, BmsKpis> = {
    kasipay: { ...SEED_BMS_KPIS },
  };
  private bmsDocs: Record<string, BmsDocument[]> = {
    kasipay: [...SEED_BMS_DOCS],
  };

  // Cowork Zones
  getCoworkZones(): CoworkZone[] {
    return this.coworkZones;
  }

  getCoworkZoneBySlug(slug: string): CoworkZone | undefined {
    return this.coworkZones.find((z) => z.slug === slug);
  }

  updateCoworkZone(zone: Partial<CoworkZone> & { id: string }): CoworkZone {
    const idx = this.coworkZones.findIndex((z) => z.id === zone.id);
    if (idx >= 0) {
      this.coworkZones[idx] = { ...this.coworkZones[idx], ...zone };
      return this.coworkZones[idx];
    }
    throw new Error(`Zone ${zone.id} not found`);
  }

  // Cohorts
  getCohorts(): Cohort[] {
    return this.cohorts;
  }

  getCohort(year: string, track: string): Cohort | undefined {
    return this.cohorts.find(
      (c) => c.year === year && c.track.toLowerCase() === track.toLowerCase().replace('-', '_')
    );
  }

  // Team
  getTeamMembers(): TeamMember[] {
    return [...this.teamMembers].sort((a, b) => a.order - b.order);
  }

  updateTeamMember(member: Partial<TeamMember> & { id: string }): TeamMember {
    const idx = this.teamMembers.findIndex((m) => m.id === member.id);
    if (idx >= 0) {
      this.teamMembers[idx] = { ...this.teamMembers[idx], ...member };
      return this.teamMembers[idx];
    }
    throw new Error(`Team member ${member.id} not found`);
  }

  // Tickets
  getTickets(): Ticket[] {
    return this.tickets;
  }

  getTicketById(id: string): Ticket | undefined {
    return this.tickets.find((t) => t.id === id || t.ticketNumber === id);
  }

  createTicket(ticket: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'messages'>): Ticket {
    const newId = `tkt-${Date.now()}`;
    const newTicket: Ticket = {
      ...ticket,
      id: newId,
      ticketNumber: `TDG-2025-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  addTicketMessage(ticketId: string, message: Omit<TicketMessage, 'id' | 'ticketId' | 'createdAt'>): TicketMessage {
    const ticket = this.getTicketById(ticketId);
    if (!ticket) throw new Error('Ticket not found');
    const newMsg: TicketMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      ticketId,
      createdAt: new Date().toISOString(),
    };
    ticket.messages.push(newMsg);
    ticket.updatedAt = new Date().toISOString();
    return newMsg;
  }

  updateTicketStatus(ticketId: string, status: Ticket['status']): Ticket {
    const ticket = this.getTicketById(ticketId);
    if (!ticket) throw new Error('Ticket not found');
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    return ticket;
  }

  // Applications
  getApplications(): Application[] {
    return this.applications;
  }

  getApplicationById(id: string): Application | undefined {
    return this.applications.find((a) => a.id === id);
  }

  createApplication(app: Omit<Application, 'id' | 'submittedAt' | 'updatedAt'>): Application {
    const newApp: Application = {
      ...app,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.applications.unshift(newApp);
    return newApp;
  }

  updateApplicationStage(id: string, stage: Application['stage'], score?: Application['scores']): Application {
    const app = this.getApplicationById(id);
    if (!app) throw new Error('Application not found');
    app.stage = stage;
    if (score) {
      app.scores = score;
    }
    app.updatedAt = new Date().toISOString();
    return app;
  }

  assignMentorToApplication(appId: string, mentorId: string, mentorName: string): Application {
    const app = this.getApplicationById(appId);
    if (!app) throw new Error('Application not found');
    app.assignedMentorId = mentorId;
    app.assignedMentorName = mentorName;
    app.stage = 'ACCEPTED';
    app.updatedAt = new Date().toISOString();
    return app;
  }

  updateApplicationVerification(appId: string, verification: ApplicationVerification): Application {
    const app = this.getApplicationById(appId);
    if (!app) throw new Error('Application not found');
    app.verificationStatus = {
      ...app.verificationStatus,
      ...verification,
      verifiedAt: new Date().toISOString(),
    };
    app.updatedAt = new Date().toISOString();
    return app;
  }

  // Intake Windows Controls
  getIntakeWindows(): IntakeWindow[] {
    return this.intakeWindows;
  }

  getIntakeWindowByTrack(track: ProgramTrack): IntakeWindow | undefined {
    return this.intakeWindows.find((w) => w.track === track);
  }

  updateIntakeWindow(track: ProgramTrack, updates: Partial<IntakeWindow>): IntakeWindow {
    const idx = this.intakeWindows.findIndex((w) => w.track === track);
    if (idx >= 0) {
      this.intakeWindows[idx] = { ...this.intakeWindows[idx], ...updates };
      return this.intakeWindows[idx];
    }
    throw new Error(`Intake window for track ${track} not found`);
  }

  // BMS Multi-Tenant
  getBmsCanvas(businessSlug: string): BmsCanvas {
    if (!this.bmsCanvases[businessSlug]) {
      this.bmsCanvases[businessSlug] = {
        ...SEED_BMS_CANVAS,
        businessSlug,
        businessName: businessSlug.toUpperCase(),
      };
    }
    return this.bmsCanvases[businessSlug];
  }

  updateBmsCanvas(businessSlug: string, canvas: BmsCanvas): BmsCanvas {
    this.bmsCanvases[businessSlug] = { ...canvas, lastEdited: new Date().toISOString() };
    return this.bmsCanvases[businessSlug];
  }

  getBmsRoadmap(businessSlug: string): BmsMilestone[] {
    if (!this.bmsRoadmaps[businessSlug]) {
      this.bmsRoadmaps[businessSlug] = [...SEED_BMS_ROADMAP];
    }
    return this.bmsRoadmaps[businessSlug];
  }

  toggleBmsMilestone(businessSlug: string, milestoneId: string): BmsMilestone {
    const list = this.getBmsRoadmap(businessSlug);
    const m = list.find((item) => item.id === milestoneId);
    if (!m) throw new Error('Milestone not found');
    m.completed = !m.completed;
    return m;
  }

  getBmsKpis(businessSlug: string): BmsKpis {
    if (!this.bmsKpis[businessSlug]) {
      this.bmsKpis[businessSlug] = { ...SEED_BMS_KPIS };
    }
    return this.bmsKpis[businessSlug];
  }

  updateBmsKpis(businessSlug: string, kpis: Partial<BmsKpis>): BmsKpis {
    const existing = this.getBmsKpis(businessSlug);
    this.bmsKpis[businessSlug] = { ...existing, ...kpis };
    return this.bmsKpis[businessSlug];
  }

  getBmsDocs(businessSlug: string): BmsDocument[] {
    if (!this.bmsDocs[businessSlug]) {
      this.bmsDocs[businessSlug] = [...SEED_BMS_DOCS];
    }
    return this.bmsDocs[businessSlug];
  }

  // Mentorship & Mentees Management
  getMentorshipSessions(mentorId?: string): MentorshipSession[] {
    if (!mentorId || mentorId === 'ALL') {
      return [...this.mentorshipSessions].sort(
        (a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
      );
    }
    return this.mentorshipSessions
      .filter((s) => s.mentorId === mentorId)
      .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime());
  }

  createMentorshipSession(
    session: Omit<MentorshipSession, 'id' | 'createdAt'>
  ): MentorshipSession {
    const newSession: MentorshipSession = {
      ...session,
      id: `ses-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.mentorshipSessions.unshift(newSession);
    return newSession;
  }

  getMenteePortfolio(mentorId?: string): MenteePortfolioItem[] {
    const acceptedApps = this.applications.filter(
      (a) => a.assignedMentorId || a.stage === 'ACCEPTED'
    );

    const filtered =
      !mentorId || mentorId === 'ALL'
        ? acceptedApps
        : acceptedApps.filter((a) => a.assignedMentorId === mentorId);

    return filtered.map((app) => {
      let slug = 'kasipay';
      if (app.payload.businessConcept?.toLowerCase().includes('kraai-med')) {
        slug = 'kraai-med';
      } else if (app.payload.businessConcept?.toLowerCase().includes('greenwaste') || app.track === 'MAKER_3D') {
        slug = 'greenwaste';
      } else if (app.track === 'CODETREPRENEURS') {
        slug = 'civicalert';
      }

      const roadmap = this.getBmsRoadmap(slug);
      const completed = roadmap.filter((m) => m.completed).length;
      const progressPercent = Math.round((completed / roadmap.length) * 100);
      const currentPhase = roadmap.find((m) => !m.completed)?.phaseTitle || 'Venture Scale & Governance';

      const sessions = this.mentorshipSessions.filter(
        (s) => s.menteeId === app.id || s.menteeName === app.fullName
      );
      const lastSession = sessions.find((s) => s.status === 'COMPLETED');
      const nextSession = sessions.find((s) => s.status === 'SCHEDULED');

      return {
        applicationId: app.id,
        menteeName: app.fullName,
        menteeEmail: app.email,
        menteePhone: app.phone,
        suburb: app.suburb,
        ventureName: app.payload.businessConcept || `${app.fullName}'s Capstone`,
        businessSlug: slug,
        track: app.track,
        stage: app.stage,
        assignedMentorId: app.assignedMentorId || 'team-4',
        assignedMentorName: app.assignedMentorName || 'Tariq Johnson',
        sprintProgressPercent: progressPercent,
        currentMilestonePhase: currentPhase,
        pendingDeliverable: roadmap.find((m) => !m.mentorApproved)?.phaseTitle,
        lastSessionDate: lastSession?.sessionDate,
        nextSessionDate: nextSession?.sessionDate,
        notes: app.scores?.[0]?.notes,
      };
    });
  }

  approveBmsMilestone(businessSlug: string, milestoneId: string): BmsMilestone {
    const list = this.getBmsRoadmap(businessSlug);
    const m = list.find((item) => item.id === milestoneId);
    if (!m) throw new Error('Milestone not found');
    m.completed = true;
    m.mentorApproved = true;
    return m;
  }
}

export const tdghDb = new TdghRepository();
