/**
 * The Daily Grind Innovation Hub (TDGH) — Unified Domain Types
 */

export type UserRole =
  | 'GUEST'
  | 'APPLICANT'
  | 'INCUBATEE'
  | 'STUDENT_CODER'
  | 'STUDENT_3D'
  | 'DEPARTMENT_STAFF'
  | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProgramTrack =
  | 'CODETREPRENEURS'
  | 'MAKER_3D'
  | 'INCUBATION'
  | 'COWORKING';

export type ApplicationStage =
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'INTERVIEW_SCHEDULED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WAITLISTED';

export interface ApplicationScore {
  motivation: number; // 1-10
  technicalAptitude: number; // 1-10
  feasibility: number; // 1-10
  notes: string;
  reviewerId: string;
  updatedAt: string;
}

export interface ApplicationVerification {
  idDocumentVerified: boolean;
  proofOfAddressVerified: boolean;
  academicRecordVerified: boolean;
  complianceOrPitchVerified: boolean;
  verifiedByStaffId?: string;
  verifiedAt?: string;
  auditNotes?: string;
}

export interface IntakeWindow {
  track: ProgramTrack;
  title: string;
  isOpen: boolean;
  nextOpenDate?: string;
  deadlineDate?: string;
  capacityLimit: number;
  statusNotice: string;
}

export interface Application {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  suburb: string;
  track: ProgramTrack;
  stage: ApplicationStage;
  submittedAt: string;
  updatedAt: string;
  payload: {
    motivation: string;
    educationLevel?: string;
    priorExperience?: string;
    githubOrPortfolioUrl?: string;
    businessConcept?: string;
    pitchDeckUrl?: string;
    deskTypePreference?: string;
  };
  scores?: ApplicationScore[];
  interviewDate?: string;
  assignedMentorId?: string;
  assignedMentorName?: string;
  verificationStatus?: ApplicationVerification;
}

export type TicketDepartment =
  | 'GENERAL'
  | 'COWORKING'
  | 'INCUBATION'
  | 'CODETREPRENEURS'
  | 'MAKER_3D';

export type TicketPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_ON_USER'
  | 'RESOLVED'
  | 'CLOSED';

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  isInternalNote: boolean;
  content: string;
  createdAt: string;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  department: TicketDepartment;
  status: TicketStatus;
  priority: TicketPriority;
  submittedByUserId?: string;
  submittedByName: string;
  submittedByEmail: string;
  submittedByPhone?: string;
  assignedToUserId?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export type CohortTrack = 'CODETREPRENEURS' | '3D_PRINTING';

export interface ProjectShowcase {
  id: string;
  title: string;
  tagline: string;
  description: string;
  creators: string[];
  thumbnailUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  cadFileUrl?: string;
  tags: string[];
  featured: boolean;
}

export interface CohortMember {
  id: string;
  name: string;
  suburb: string;
  track: CohortTrack;
  bio: string;
  avatarUrl: string;
  capstoneTitle: string;
  employedOrLaunched: boolean;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface Cohort {
  id: string;
  year: '2024' | '2025' | '2026';
  track: CohortTrack;
  title: string;
  summary: string;
  startDate: string;
  endDate: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
  membersCount: number;
  members: CohortMember[];
  capstones: ProjectShowcase[];
}

export type ZoneStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';

export interface CoworkZone {
  id: string;
  slug: string;
  name: string;
  floor: number;
  capacity: number;
  svgCoordinates: string; // SVG polygon points or path data
  colorToken: string;
  status: ZoneStatus;
  amenities: string[];
  hourlyRateZar: number;
  dailyRateZar: number;
  monthlyRateZar: number;
  specs: {
    powerOutlets: number;
    hasBackboneWifi: boolean;
    hasAvDisplay: boolean;
    ergonomicChairs: number;
    naturalLight: boolean;
  };
  description: string;
  photoGallery: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  department: TicketDepartment;
  avatarUrl: string;
  order: number;
  email: string;
  linkedin?: string;
}

export type BmcBlockType =
  | 'KEY_PARTNERS'
  | 'KEY_ACTIVITIES'
  | 'VALUE_PROPOSITIONS'
  | 'CUSTOMER_RELATIONSHIPS'
  | 'CUSTOMER_SEGMENTS'
  | 'KEY_RESOURCES'
  | 'CHANNELS'
  | 'COST_STRUCTURE'
  | 'REVENUE_STREAMS';

export interface BmcCard {
  id: string;
  title: string;
  notes: string;
  color?: string;
  createdAt: string;
}

export interface BmsCanvas {
  id: string;
  businessSlug: string;
  businessName: string;
  tagline: string;
  founderId: string;
  lastEdited: string;
  blocks: Record<BmcBlockType, BmcCard[]>;
}

export interface BmsMilestone {
  id: string;
  weekRange: string;
  phaseTitle: string;
  objectives: string[];
  completed: boolean;
  notes?: string;
  deliverableSubmitted?: string;
  mentorApproved: boolean;
}

export interface BmsKpis {
  cashOnHandZar: number;
  monthlyBurnZar: number;
  runwayMonths: number;
  monthlyRecurringRevenueZar: number;
  customerAcquisitionCostZar: number;
  totalCustomers: number;
  teamSize: number;
}

export type ComplianceDocType =
  | 'CIPC_REGISTRATION'
  | 'BBBEE_AFFIDAVIT'
  | 'TAX_PIN_SARS'
  | 'BANK_CONFIRMATION'
  | 'FOUNDER_AGREEMENT'
  | 'INVESTOR_PITCH_DECK';

export type ComplianceStatus = 'VERIFIED' | 'PENDING_REVIEW' | 'EXPIRED' | 'MISSING';

export interface BmsDocument {
  id: string;
  title: string;
  type: ComplianceDocType;
  status: ComplianceStatus;
  filename?: string;
  fileSize?: string;
  uploadedAt?: string;
  expiryDate?: string;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  mentorName: string;
  menteeId: string;
  menteeName: string;
  ventureName: string;
  sessionDate: string;
  topic: string;
  feedbackNotes: string;
  actionItems: string[];
  nextMeetingDate?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface MenteePortfolioItem {
  applicationId: string;
  menteeName: string;
  menteeEmail: string;
  menteePhone?: string;
  suburb: string;
  ventureName: string;
  businessSlug: string;
  track: ProgramTrack;
  stage: ApplicationStage;
  assignedMentorId: string;
  assignedMentorName: string;
  sprintProgressPercent: number;
  currentMilestonePhase: string;
  pendingDeliverable?: string;
  lastSessionDate?: string;
  nextSessionDate?: string;
  notes?: string;
}
