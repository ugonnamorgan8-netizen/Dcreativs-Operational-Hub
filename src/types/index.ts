export type UserRole =
  | 'CEO'
  | 'COO'
  | 'CFO'
  | 'CPO'
  | 'CHRO'
  | 'CMO'
  | 'DEVELOPER'
  | 'AI_ENGINEER'
  | 'BRAND_DESIGNER'
  | '3D_ARTIST'
  | 'CONTENT_CREATOR'
  | 'SOCIAL_MANAGER'
  | 'ACADEMY_TUTOR'
  | 'ACADEMY_COORDINATOR'
  | 'OPERATIONS_COORDINATOR'
  | 'CONTRACTOR'
  | 'BOARD_MEMBER'
  | 'UNASSIGNED';

export type WorkspaceLabel =
  | 'Build'
  | 'Studio'
  | 'Blenders'
  | 'Feed'
  | 'Official'
  | 'Mainframe';

export type ActionPermission =
  | 'view'
  | 'create'
  | 'edit'
  | 'assign'
  | 'review'
  | 'approve_release'
  | 'executive_override'
  | 'export'
  | 'manage_access'
  | 'manage_board'
  | 'read_openline_reports';

export type ProjectStage =
  | 'intake'
  | 'planned'
  | 'in_progress'
  | 'internal_review'
  | 'changes_requested'
  | 'approved'
  | 'released'
  | 'archived';

export type CurrencyCode = 'USD' | 'EUR' | 'NGN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  role: UserRole;
  avatarUrl: string;
  department: string;
  isFounder: boolean;
  isInterim?: boolean;
  boardSeatNumber?: number;
  boardAccessStatus?: 'NONE' | 'PENDING' | 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  approvalLimitUSD?: number;
  timezone: string;
  workingHours: string;
  password?: string;
  permittedWorkspaces: WorkspaceLabel[];
  isOmbudsman?: boolean; // Only Ombudsman or authorized neutral investigator can read OpenLine reports
  assignedWorkspaceName: string;
  primaryWorkspace?: string;
  flaggedForRoleAudit?: boolean;
  auditFlagReason?: string;
  assignedCohortIds?: string[];
}

export interface RegisterStaffInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
  title: string;
  permittedWorkspaces?: WorkspaceLabel[];
}

export interface DeliverableVersion {
  id: string;
  versionNumber: string; // e.g., 'v1.0', 'v2.0', 'v3.0'
  deliverableName: string;
  projectId: string;
  projectName: string;
  workspace: WorkspaceLabel;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  submissionDate: string;
  checksumSha256: string;
  notes: string;
  files: { name: string; size: string; type: string; downloadUrl?: string }[];
  status: 'PENDING_REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED' | 'RELEASED';
  reviewDecision?: {
    reviewerId: string;
    reviewerName: string;
    decisionDate: string;
    feedback: string;
    isExecutiveOverride?: boolean;
    overrideReason?: string;
  };
}

export interface ReviewQueueItem {
  id: string;
  projectCode: string;
  projectName: string;
  workspace: WorkspaceLabel;
  category: 'CREATIVE_ASSET' | 'CODE_REVIEW' | 'CLIENT_FEEDBACK' | 'INTERNAL_TOOLING';
  title: string;
  versionNumber: string;
  submittedBy: string;
  authorRole: string;
  authorAvatar: string;
  submittedAgo: string;
  waitingOn: string;
  currentlyViewing?: boolean;
  designerNote?: string;
  thumbnailUrl?: string;
  status: 'WAITING_ON_CPO' | 'CURRENTLY_VIEWING' | 'PENDING_DEP_CHECK' | 'APPROVED';
  versions: DeliverableVersion[];
}

export interface ApprovalHistoryItem {
  id: string;
  reviewId: string;
  projectCode: string;
  projectName: string;
  deliverableTitle: string;
  versionNumber: string;
  authorName: string;
  reviewerName: string;
  reviewerRole: string;
  status: 'APPROVED' | 'CHANGES_REQUESTED' | 'EXECUTIVE_OVERRIDE';
  timestamp: string;
  feedback: string;
  checksumSha256?: string;
}

export interface TaskChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  project: string;
  workspace: WorkspaceLabel;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar: string;
  due: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'COMPLETED' | 'BLOCKED';
  category: 'ENGINEERING' | 'DESIGN' | 'AUTOMATION' | 'CONTENT' | 'OPS';
  checklist: TaskChecklistItem[];
  blockedReason?: string;
}

export interface ActiveWorkflow {
  id: string;
  name: string;
  workspace: WorkspaceLabel;
  owner: string;
  ownerRole: string;
  currentStage: 'AUTOMATION' | 'REVIEW' | 'STAKEHOLDER' | 'RELEASE';
  health: 'healthy' | 'warning' | 'critical';
  details?: string;
}

export interface TalentCandidate {
  id: string;
  name: string;
  title: string;
  status: 'APPLIED' | 'TECH_ASSESSMENT' | 'FINAL_INTERVIEW' | 'OFFER_SENT' | 'SIGNED' | 'REJECTED';
  appliedDate: string;
  email: string;
  progressPercent: number;
  avatarUrl: string;
  department: string;
  notes?: string;
  startDate?: string;
  portfolioUrl?: string;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  client?: string;
  date: string; // YYYY-MM-DD
  dayOfMonth: number;
  type: 'prep' | 'blast' | 'review' | 'release' | 'internal' | 'video';
  color: string;
  reachEstimate?: string;
  budgetUSD?: number;
}

export interface BoardSeat {
  seatNumber: number;
  holderName?: string;
  holderEmail?: string;
  holderTitle?: string;
  status: 'VACANT' | 'PENDING' | 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  grantScope?: string;
  grantReason?: string;
  grantedBy?: string;
  grantedAt?: string;
  expiresAt?: string;
}

export interface InvoiceItem {
  id: string;
  invoiceCode: string;
  client: string;
  project: string;
  workspace: WorkspaceLabel;
  amount: number;
  currency: CurrencyCode;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'FLAGGED';
  dueDate: string;
  overdueDays?: number;
  paidDate?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'REVIEW' | 'ALERT' | 'FINANCE' | 'SYSTEM' | 'PEOPLE';
  actionUrl?: string;
}

export interface AuditEvent {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  resource: string;
  reason?: string;
  timestamp: string;
  correlationId: string;
  details: string;
}

export interface OpenLineReport {
  id: string;
  trackingCode: string;
  category: 'CONDUCT' | 'GOVERNANCE' | 'SAFETY' | 'FINANCE' | 'FEEDBACK';
  summary: string;
  body: string;
  timestamp: string;
  status: 'RECEIVED' | 'INVESTIGATING' | 'RESOLVED';
  anonymousAlias: string;
}

// ==========================================
// ACADEMY MANAGEMENT SYSTEM TYPES
// ==========================================

export interface PartnerSchool {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  activeCohortsCount: number;
  status: 'ACTIVE' | 'ONBOARDING' | 'PAUSED';
  mouExpiryDate: string;
  notes?: string;
}

export interface AcademyProgramme {
  id: string;
  title: string;
  code: string;
  category: 'PHYSICAL_CODING' | 'PARTNER_SCHOOL' | 'ONLINE' | 'HYBRID';
  durationWeeks: number;
  currentCurriculumVersion: string;
  description: string;
  coursesCount: number;
  curriculumApprovedBy?: string;
  curriculumApprovalDate?: string;
}

export interface AcademyCohort {
  id: string;
  code: string;
  programmeId: string;
  programmeName: string;
  schoolId?: string;
  schoolName?: string;
  venueOrLink: string;
  tutorId: string;
  tutorName: string;
  startDate: string;
  endDate: string;
  learnersCount: number;
  scheduleDays: string;
  status: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'FLAGGED';
}

export interface EnrolledLearner {
  id: string;
  cohortId: string;
  cohortCode: string;
  fullName: string;
  email: string;
  guardianName: string;
  guardianContact: string;
  attendanceRate: number;
  progressPercent: number;
  status: 'ENROLLED' | 'AT_RISK' | 'GRADUATED';
}

export interface EnrollLearnerInput {
  cohortCode: string;
  fullName: string;
  email?: string;
  guardianName?: string;
  guardianContact?: string;
  status?: 'ENROLLED' | 'AT_RISK' | 'GRADUATED';
}

export interface PaymentReceiptInput {
  invoiceNumber?: string;
  client: string;
  description: string;
  amount: number;
  dueDate?: string;
  workspace?: WorkspaceLabel;
}

export interface TimetableSession {
  id: string;
  cohortId: string;
  cohortCode: string;
  title: string;
  tutorId: string;
  tutorName: string;
  venue: string;
  onlineMeetingLink?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface LessonPlan {
  id: string;
  programmeId: string;
  programmeName: string;
  weekNumber: number;
  topic: string;
  learningObjectives: string[];
  resources: { name: string; url: string; type: string }[];
  reviewStatus: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED';
  approvedBy?: string;
  approvedDate?: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  cohortId: string;
  cohortCode: string;
  date: string;
  totalPresent: number;
  totalAbsent: number;
  records: {
    learnerId: string;
    learnerName: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
  }[];
}

export interface AssignmentSubmission {
  id: string;
  cohortId: string;
  learnerId: string;
  learnerName: string;
  assignmentTitle: string;
  submissionDate: string;
  score?: number;
  maxScore: number;
  grade?: string;
  feedback?: string;
  status: 'SUBMITTED' | 'GRADED' | 'RESUBMIT' | 'PENDING';
}

export interface TutorSessionReport {
  id: string;
  sessionId: string;
  cohortId: string;
  cohortCode: string;
  tutorId: string;
  tutorName: string;
  sessionDate: string;
  learnersAttended: number;
  totalEnrolled: number;
  topicsCovered: string;
  challengesEncountered?: string;
  equipmentIssues?: string;
  submittedAt: string;
}

export interface AcademyIssueReport {
  id: string;
  type: 'EQUIPMENT_REQUEST' | 'DELIVERY_ISSUE' | 'VENUE_ACCESS' | 'LEARNER_SUPPORT';
  cohortCode: string;
  raisedBy: string;
  description: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  createdAt: string;
}

export interface AcademyCompletionReport {
  id: string;
  cohortId: string;
  cohortCode: string;
  programmeName: string;
  completionRate: number;
  graduatedCount: number;
  topPerformer: string;
  generatedDate: string;
  certificateBatchStatus: 'PENDING' | 'ISSUED';
}

// ==========================================
// ROLE-BASED DOCUMENTS & EXTRACTION PIPELINE
// ==========================================

export type DocumentCategory =
  | 'OPERATIONS'
  | 'FINANCE'
  | 'PEOPLE'
  | 'ACADEMY'
  | 'MARKETING'
  | 'PRODUCT_DELIVERABLE';

export type DocumentFormat =
  | 'PDF'
  | 'DOCX'
  | 'XLSX'
  | 'CSV'
  | 'TXT'
  | 'PNG'
  | 'JPEG';

export interface DocumentRecord {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  format: DocumentFormat;
  category: DocumentCategory;
  uploaderId: string;
  uploaderName: string;
  uploaderRole: UserRole;
  uploadDate: string;
  version: string;
  status: 'UPLOADED' | 'VALIDATED' | 'EXTRACTED' | 'PENDING_REVIEW' | 'APPROVED' | 'ARCHIVED' | 'QUARANTINED';
  downloadToken: string;
  tokenExpiresAt: string;
  intendedPurpose: string;
  proposedDestination: string;
  permittedRoles: UserRole[];
  rowCount?: number;
  validationErrors?: string[];
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
  isArchived?: boolean;
}

export interface ExtractionParsedField {
  field: string;
  sourceRef: string;
  originalValue: any;
  correctedValue: any;
  isValid: boolean;
  error?: string;
}

export interface ExtractionJob {
  id: string;
  documentId: string;
  documentTitle: string;
  fileName: string;
  format: DocumentFormat;
  category: DocumentCategory;
  status: 'QUEUED' | 'EXTRACTING' | 'PARSED' | 'FAILED' | 'READY_FOR_REVIEW' | 'APPLIED';
  parsedFields: ExtractionParsedField[];
  parsedRows?: { rowNumber: number; data: Record<string, any>; errors?: string[] }[];
  columnMappings?: { sourceColumn: string; destinationField: string; status: 'MAPPED' | 'UNMAPPED' | 'IGNORED' }[];
  proposedChangesSummary: string;
  duplicateAlerts?: string[];
  reviewedBy?: string;
  appliedAt?: string;
  createdAt: string;
}

export interface GeneratedReport {
  id: string;
  title: string;
  type:
    | 'OPERATIONS_SUMMARY'
    | 'PROJECT_STATUS'
    | 'FINANCIAL_SUMMARY'
    | 'TEAM_CAPACITY'
    | 'ACADEMY_DELIVERY'
    | 'CAMPAIGN_PERFORMANCE';
  reportingPeriod: string;
  generatedAt: string;
  generatedBy: string;
  generatorRole: UserRole;
  dataSources: string[];
  dataSummary: Record<string, any>;
  status: 'DRAFT' | 'APPROVED' | 'PUBLISHED';
}

