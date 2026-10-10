import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  UserRole,
  WorkspaceLabel,
  ReviewQueueItem,
  TalentCandidate,
  BoardSeat,
  InvoiceItem,
  NotificationItem,
  AuditEvent,
  MarketingCampaign,
  RegisterStaffInput,
  TaskItem,
  OpenLineReport,
  CurrencyCode,
  ApprovalHistoryItem,
  PartnerSchool,
  AcademyProgramme,
  AcademyCohort,
  EnrolledLearner,
  TimetableSession,
  LessonPlan,
  AttendanceRecord,
  AssignmentSubmission,
  TutorSessionReport,
  AcademyIssueReport,
  AcademyCompletionReport,
  DocumentRecord,
  ExtractionJob,
  GeneratedReport,
  DocumentCategory,
  DocumentFormat,
  EnrollLearnerInput,
  PaymentReceiptInput
} from '../types';
import {
  INITIAL_PROFILES,
  INITIAL_BOARD_SEATS,
  INITIAL_REVIEWS,
  INITIAL_CANDIDATES,
  INITIAL_INVOICES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_CAMPAIGNS,
  INITIAL_TASKS,
  INITIAL_OPENLINE_REPORTS,
  INITIAL_APPROVAL_HISTORY,
  INITIAL_PARTNER_SCHOOLS,
  INITIAL_ACADEMY_PROGRAMMES,
  INITIAL_ACADEMY_COHORTS,
  INITIAL_LEARNERS,
  INITIAL_TIMETABLES,
  INITIAL_LESSON_PLANS,
  INITIAL_ATTENDANCE,
  INITIAL_SUBMISSIONS,
  INITIAL_TUTOR_REPORTS,
  INITIAL_ACADEMY_ISSUES,
  INITIAL_COMPLETION_REPORTS,
  INITIAL_DOCUMENTS,
  INITIAL_EXTRACTION_JOBS,
  INITIAL_REPORTS
} from '../data/mockData';
import {
  AppView,
  canAccessWorkspace,
  canAccessView as checkViewAccess,
  hasPermission,
  getDefaultViewForRole,
  getDefaultWorkspaceName,
  canAccessDocumentCategory
} from '../utils/permissions';

export type { AppView };

interface AppContextType {
  // Auth & Session
  isAuthenticated: boolean;
  currentProfile: UserProfile;
  allProfiles: UserProfile[];
  login: (email: string, password?: string) => boolean;
  register: (input: RegisterStaffInput) => void;
  logout: () => void;
  resolveAccountRole: (
    profileId: string,
    primaryRole: UserRole,
    primaryWorkspace: string,
    reviewerNotes: string
  ) => void;

  // Navigation & Workspace
  activeWorkspace: WorkspaceLabel;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  canAccessView: (view: AppView) => boolean;

  // Currency & Financial Reconciliations
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  currencyRate: number;
  currencySymbol: string;

  // Tasks & Checklists
  tasks: TaskItem[];
  toggleTaskChecklist: (taskId: string, checkId: string) => void;
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  updateTaskStatus: (taskId: string, status: TaskItem['status']) => void;

  // OpenLine Sealed Whistleblower Reports
  openLineReports: OpenLineReport[];
  submitOpenLineReport: (data: {
    category: OpenLineReport['category'];
    summary: string;
    body: string;
    trackingCode: string;
  }) => void;
  updateOpenLineStatus: (id: string, status: OpenLineReport['status']) => void;

  // Reviews & Deliverables
  reviews: ReviewQueueItem[];
  selectedReview: ReviewQueueItem | null;
  setSelectedReview: (item: ReviewQueueItem | null) => void;
  approvalHistory: ApprovalHistoryItem[];
  approveDeliverable: (reviewId: string, overrideReason?: string) => void;
  requestDeliverableChanges: (reviewId: string, feedback: string) => void;
  submitNewDeliverable: (data: {
    projectName: string;
    deliverableName: string;
    versionNumber: string;
    notes: string;
    checksum: string;
    workspace?: WorkspaceLabel;
  }) => void;

  // Academy Management
  partnerSchools: PartnerSchool[];
  academyProgrammes: AcademyProgramme[];
  academyCohorts: AcademyCohort[];
  learners: EnrolledLearner[];
  timetables: TimetableSession[];
  lessonPlans: LessonPlan[];
  attendanceRecords: AttendanceRecord[];
  assignmentSubmissions: AssignmentSubmission[];
  tutorSessionReports: TutorSessionReport[];
  academyIssues: AcademyIssueReport[];
  academyCompletionReports: AcademyCompletionReport[];
  addTutorSessionReport: (data: Omit<TutorSessionReport, 'id' | 'submittedAt'>) => void;
  markAttendance: (
    sessionId: string,
    cohortId: string,
    cohortCode: string,
    date: string,
    records: { learnerId: string; learnerName: string; status: 'PRESENT' | 'ABSENT' | 'LATE' }[]
  ) => void;
  gradeSubmission: (submissionId: string, score: number, grade: string, feedback: string) => void;
  submitAcademyIssue: (data: Omit<AcademyIssueReport, 'id' | 'createdAt' | 'status'>) => void;
  resolveAcademyIssue: (issueId: string) => void;
  approveLessonPlan: (planId: string) => void;
  enrollLearner: (input: EnrollLearnerInput) => void;
  bulkEnrollLearners: (cohortCode: string, learnersList: { fullName: string; email?: string; guardianName?: string; guardianContact?: string }[]) => number;
  recordPaymentReceipt: (data: PaymentReceiptInput) => void;

  // Role-Based Documents & Extraction Pipeline
  documents: DocumentRecord[];
  extractionJobs: ExtractionJob[];
  generatedReports: GeneratedReport[];
  uploadDocument: (data: {
    title: string;
    fileName: string;
    fileSize: string;
    format: DocumentFormat;
    category: DocumentCategory;
    intendedPurpose: string;
    proposedDestination: string;
    permittedRoles: UserRole[];
    rowCount?: number;
    initialFields?: { field: string; sourceRef: string; value: any }[];
  }) => string; // returns document id
  updateExtractionParsedField: (
    jobId: string,
    fieldIndex: number,
    correctedValue: any
  ) => void;
  updateExtractionColumnMapping: (
    jobId: string,
    sourceColumn: string,
    destinationField: string
  ) => void;
  applyExtractionJob: (jobId: string) => boolean;
  archiveDocument: (documentId: string) => void;
  generateReport: (
    title: string,
    type: GeneratedReport['type'],
    reportingPeriod: string,
    dataSummary: Record<string, any>,
    dataSources: string[]
  ) => GeneratedReport;

  // Modals & Drawers
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (open: boolean) => void;
  isApprovalHistoryModalOpen: boolean;
  setIsApprovalHistoryModalOpen: (open: boolean) => void;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  isBoardGrantModalOpen: boolean;
  setIsBoardGrantModalOpen: (open: boolean) => void;
  selectedBoardSeat: BoardSeat | null;
  setSelectedBoardSeat: (seat: BoardSeat | null) => void;
  isActivityLogDrawerOpen: boolean;
  setIsActivityLogDrawerOpen: (open: boolean) => void;
  isManageInvoicesModalOpen: boolean;
  setIsManageInvoicesModalOpen: (open: boolean) => void;
  isAddCandidateModalOpen: boolean;
  setIsAddCandidateModalOpen: (open: boolean) => void;
  selectedCandidateDetail: TalentCandidate | null;
  setSelectedCandidateDetail: (cand: TalentCandidate | null) => void;
  isNewCampaignModalOpen: boolean;
  setIsNewCampaignModalOpen: (open: boolean) => void;
  isNewUpdateModalOpen: boolean;
  setIsNewUpdateModalOpen: (open: boolean) => void;

  // Board Seats
  boardSeats: BoardSeat[];
  grantBoardSeat: (
    seatNumber: number,
    candidateName: string,
    scope: string,
    reason: string,
    expiresAt?: string
  ) => void;
  revokeBoardSeat: (seatNumber: number, reason: string) => void;

  // Talent / HR
  candidates: TalentCandidate[];
  updateCandidateStage: (candidateId: string, newStage: TalentCandidate['status']) => void;
  addCandidate: (candidateData: Omit<TalentCandidate, 'id'>) => void;

  // Finance
  invoices: InvoiceItem[];
  markInvoicePaid: (invoiceId: string) => void;

  // Marketing Campaigns
  campaigns: MarketingCampaign[];
  addCampaign: (data: {
    title: string;
    dayOfMonth: number;
    color: string;
    reachEstimate?: string;
    budgetUSD?: number;
  }) => void;

  // Operational Alerts
  operationalAlerts: Array<{
    id: string;
    title: string;
    description: string;
    type: 'CRITICAL' | 'WARNING' | 'HEALTHY';
  }>;
  addOperationalAlert: (alertData: {
    title: string;
    description: string;
    type: 'CRITICAL' | 'WARNING' | 'HEALTHY';
  }) => void;
  acknowledgeAlert: (id: string) => void;

  // Notifications & Audit
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  auditLogs: AuditEvent[];
  addAuditEvent: (
    action: string,
    resource: string,
    details: string,
    reason?: string
  ) => void;

  // System states
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>(INITIAL_PROFILES);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(() => {
    const savedId = localStorage.getItem('dcreativs_current_user_id');
    if (savedId) {
      const found = INITIAL_PROFILES.find((p) => p.id === savedId);
      if (found) return found;
    }
    return INITIAL_PROFILES[0];
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('dcreativs_current_user_id');
  });

  // Active workspace is statically locked to the role's primary workspace
  const [activeWorkspace] = useState<WorkspaceLabel>(() => {
    return currentProfile.permittedWorkspaces[0] || 'Build';
  });

  const [activeView, setActiveView] = useState<AppView>(() => {
    const savedId = localStorage.getItem('dcreativs_current_user_id');
    if (savedId) {
      const found = INITIAL_PROFILES.find((p) => p.id === savedId);
      if (found) return getDefaultViewForRole(found.role);
    }
    return 'ceo-overview';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Currency state
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const currencyRates: Record<CurrencyCode, number> = {
    USD: 1,
    EUR: 0.92,
    NGN: 1550
  };
  const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    NGN: '₦'
  };

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
  };

  // Tasks state
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  const toggleTaskChecklist = (taskId: string, checkId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedChecklist = t.checklist.map((c) =>
            c.id === checkId ? { ...c, done: !c.done } : c
          );
          return { ...t, checklist: updatedChecklist };
        }
        return t;
      })
    );
  };

  const addTask = (taskData: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = {
      id: `tsk-${Date.now()}`,
      ...taskData
    };
    setTasks((prev) => [newTask, ...prev]);
    addAuditEvent(
      'task.create',
      `task:${newTask.title}`,
      `Created task "${newTask.title}" assigned to ${newTask.assigneeName}`
    );
  };

  const updateTaskStatus = (taskId: string, status: TaskItem['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  // OpenLine reports state
  const [openLineReports, setOpenLineReports] = useState<OpenLineReport[]>(INITIAL_OPENLINE_REPORTS);

  const submitOpenLineReport = (data: {
    category: OpenLineReport['category'];
    summary: string;
    body: string;
    trackingCode: string;
  }) => {
    const newReport: OpenLineReport = {
      id: `ol-${Date.now()}`,
      trackingCode: data.trackingCode,
      category: data.category,
      summary: data.summary,
      body: data.body,
      timestamp:
        new Date().toISOString().substring(0, 10) +
        ' ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ' WAT',
      status: 'RECEIVED',
      anonymousAlias: `Staff Contributor #${Math.floor(10 + Math.random() * 90)}`
    };
    setOpenLineReports((prev) => [newReport, ...prev]);
    addAuditEvent(
      'openline.report.received',
      `openline:${data.trackingCode}`,
      `Sealed anonymous report received. Category: ${data.category}. Identity cryptographically detached.`
    );
  };

  const updateOpenLineStatus = (id: string, status: OpenLineReport['status']) => {
    setOpenLineReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    addAuditEvent(
      'openline.case.status_change',
      `openline:${id}`,
      `Ombudsman updated case status to ${status}`
    );
  };

  // Reviews state
  const [reviews, setReviews] = useState<ReviewQueueItem[]>(INITIAL_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<ReviewQueueItem | null>(INITIAL_REVIEWS[1]);
  const [approvalHistory, setApprovalHistory] = useState<ApprovalHistoryItem[]>(INITIAL_APPROVAL_HISTORY);

  // Board state
  const [boardSeats, setBoardSeats] = useState<BoardSeat[]>(INITIAL_BOARD_SEATS);
  const [selectedBoardSeat, setSelectedBoardSeat] = useState<BoardSeat | null>(null);

  // Talent state
  const [candidates, setCandidates] = useState<TalentCandidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidateDetail, setSelectedCandidateDetail] = useState<TalentCandidate | null>(null);

  // Finance state
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);

  // Campaigns state
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(INITIAL_CAMPAIGNS);

  // Operational alerts
  const [operationalAlerts, setOperationalAlerts] = useState<Array<{
    id: string;
    title: string;
    description: string;
    type: 'CRITICAL' | 'WARNING' | 'HEALTHY';
  }>>([
    {
      id: 'alt-1',
      title: 'Project Orbit Handoff Overdue',
      description: 'Handoff delayed by 14 hours. Requires immediate attention.',
      type: 'CRITICAL' as const
    },
    {
      id: 'alt-2',
      title: 'High Resource Utilization',
      description: 'Tech team is at 95% capacity for the next 4 days.',
      type: 'WARNING' as const
    }
  ]);

  // Notifications & Audit
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(INITIAL_AUDIT_LOGS);

  // Academy Management state
  const [partnerSchools, setPartnerSchools] = useState<PartnerSchool[]>(INITIAL_PARTNER_SCHOOLS);
  const [academyProgrammes, setAcademyProgrammes] = useState<AcademyProgramme[]>(INITIAL_ACADEMY_PROGRAMMES);
  const [academyCohorts, setAcademyCohorts] = useState<AcademyCohort[]>(INITIAL_ACADEMY_COHORTS);
  const [learners, setLearners] = useState<EnrolledLearner[]>(INITIAL_LEARNERS);
  const [timetables, setTimetables] = useState<TimetableSession[]>(INITIAL_TIMETABLES);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(INITIAL_LESSON_PLANS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState<AssignmentSubmission[]>(INITIAL_SUBMISSIONS);
  const [tutorSessionReports, setTutorSessionReports] = useState<TutorSessionReport[]>(INITIAL_TUTOR_REPORTS);
  const [academyIssues, setAcademyIssues] = useState<AcademyIssueReport[]>(INITIAL_ACADEMY_ISSUES);
  const [academyCompletionReports, setAcademyCompletionReports] = useState<AcademyCompletionReport[]>(INITIAL_COMPLETION_REPORTS);

  // Role-Based Documents & Extraction Pipeline state
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [extractionJobs, setExtractionJobs] = useState<ExtractionJob[]>(INITIAL_EXTRACTION_JOBS);
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(INITIAL_REPORTS);

  // Modals & UI states
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isApprovalHistoryModalOpen, setIsApprovalHistoryModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isBoardGrantModalOpen, setIsBoardGrantModalOpen] = useState(false);
  const [isActivityLogDrawerOpen, setIsActivityLogDrawerOpen] = useState(false);
  const [isManageInvoicesModalOpen, setIsManageInvoicesModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [isNewUpdateModalOpen, setIsNewUpdateModalOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Login handler: routes strictly to designated workspace homepage
  const login = (email: string, password?: string): boolean => {
    const found = allProfiles.find(
      (p) => p.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!found) return false;

    if (password && found.password && found.password !== password) {
      return false;
    }

    setCurrentProfile(found);
    setIsAuthenticated(true);
    localStorage.setItem('dcreativs_current_user_id', found.id);

    const targetView = getDefaultViewForRole(found.role);
    setActiveView(targetView);

    addAuditEvent(
      'auth.session.login',
      `user:${found.id}`,
      `User ${found.name} signed in successfully with authorized role ${found.role}. Routed to ${targetView}.`
    );
    return true;
  };

  // Register new staff user
  const register = (input: RegisterStaffInput) => {
    const newId = `usr-${Date.now()}`;
    const defaultWorkspaces: WorkspaceLabel[] = input.permittedWorkspaces || ['Build'];

    const newProfile: UserProfile = {
      id: newId,
      name: input.name,
      email: input.email,
      title: input.title,
      role: input.role,
      department: input.department,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      isFounder: false,
      timezone: 'Africa/Lagos (WAT, UTC+1)',
      workingHours: 'Mon-Fri 09:00 - 18:00',
      password: input.password,
      permittedWorkspaces: defaultWorkspaces,
      isOmbudsman: false,
      assignedWorkspaceName: getDefaultWorkspaceName(input.role),
      primaryWorkspace: getDefaultWorkspaceName(input.role)
    };

    setAllProfiles((prev) => [newProfile, ...prev]);
    setCurrentProfile(newProfile);
    setIsAuthenticated(true);
    const targetView = getDefaultViewForRole(input.role);
    setActiveView(targetView);

    addAuditEvent(
      'auth.staff.register',
      `user:${newId}`,
      `Created staff account for ${input.name} (${input.role} · ${input.department})`
    );
  };

  // Administrator role resolution for flagged / multi-role accounts
  const resolveAccountRole = (
    profileId: string,
    primaryRole: UserRole,
    primaryWorkspace: string,
    reviewerNotes: string
  ) => {
    setAllProfiles((prev) =>
      prev.map((p) => {
        if (p.id === profileId) {
          return {
            ...p,
            role: primaryRole,
            assignedWorkspaceName: primaryWorkspace,
            primaryWorkspace,
            flaggedForRoleAudit: false,
            auditFlagReason: undefined
          };
        }
        return p;
      })
    );

    if (currentProfile.id === profileId) {
      setCurrentProfile((prev) => ({
        ...prev,
        role: primaryRole,
        assignedWorkspaceName: primaryWorkspace,
        primaryWorkspace,
        flaggedForRoleAudit: false,
        auditFlagReason: undefined
      }));
      const newTarget = getDefaultViewForRole(primaryRole);
      setActiveView(newTarget);
    }

    addAuditEvent(
      'security.role.resolve_audit',
      `user:${profileId}`,
      `Administrator resolved workspace assignment to ${primaryRole} (${primaryWorkspace}). Notes: "${reviewerNotes}"`
    );
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dcreativs_current_user_id');
    addAuditEvent('auth.session.logout', `user:${currentProfile.id}`, `User logged out`);
  };

  // Add audit event helper
  const addAuditEvent = (action: string, resource: string, details: string, reason?: string) => {
    const newLog: AuditEvent = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      actorName: currentProfile.name,
      actorRole: currentProfile.role,
      action,
      resource,
      reason,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      correlationId: `corr-${Math.random().toString(36).substring(2, 9)}`,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Strict permission check for views
  const canAccessView = (view: AppView): boolean => {
    return checkViewAccess(currentProfile, view);
  };

  // Deliverable approval
  const approveDeliverable = (reviewId: string, overrideReason?: string) => {
    const isCEO = currentProfile.role === 'CEO';
    const targetItem = reviews.find((r) => r.id === reviewId);

    setReviews((prev) =>
      prev.map((item) => {
        if (item.id === reviewId) {
          const updatedVersions = item.versions.map((ver, idx) => {
            if (idx === item.versions.length - 1) {
              return {
                ...ver,
                status: 'RELEASED' as const,
                reviewDecision: {
                  reviewerId: currentProfile.id,
                  reviewerName: currentProfile.name,
                  decisionDate: 'Just now',
                  feedback: isCEO
                    ? `Executive Override: ${overrideReason || 'Approved by Executive Authority'}`
                    : 'Quality checklist verified. Approved for client release.',
                  isExecutiveOverride: isCEO,
                  overrideReason: isCEO ? overrideReason : undefined
                }
              };
            }
            return ver;
          });
          return {
            ...item,
            status: 'APPROVED',
            waitingOn: 'RELEASED',
            versions: updatedVersions
          };
        }
        return item;
      })
    );

    setSelectedReview((prev) => {
      if (prev && prev.id === reviewId) {
        return {
          ...prev,
          status: 'APPROVED',
          waitingOn: 'RELEASED',
          versions: prev.versions.map((ver, idx) =>
            idx === prev.versions.length - 1
              ? {
                  ...ver,
                  status: 'RELEASED' as const,
                  reviewDecision: {
                    reviewerId: currentProfile.id,
                    reviewerName: currentProfile.name,
                    decisionDate: 'Just now',
                    feedback: isCEO
                      ? `Executive Override: ${overrideReason || 'Approved by Executive Authority'}`
                      : 'Quality checklist verified. Approved for client release.',
                    isExecutiveOverride: isCEO,
                    overrideReason: isCEO ? overrideReason : undefined
                  }
                }
              : ver
          )
        };
      }
      return prev;
    });

    const newApprovalRecord: ApprovalHistoryItem = {
      id: `appr-${Date.now()}`,
      reviewId,
      projectCode: targetItem?.projectCode || 'PROJECT',
      projectName: targetItem?.projectName || 'Project Deliverable',
      deliverableTitle: targetItem?.title || 'Deliverable',
      versionNumber: targetItem?.versionNumber || 'v3.0',
      authorName: targetItem?.submittedBy || 'Designer',
      reviewerName: currentProfile.name,
      reviewerRole: currentProfile.role,
      status: isCEO ? 'EXECUTIVE_OVERRIDE' : 'APPROVED',
      timestamp: 'Just now · Today',
      feedback: isCEO
        ? `Executive Override: ${overrideReason || 'Approved by Executive Authority'}`
        : 'Quality checklist verified. Approved for client release.',
      checksumSha256:
        targetItem?.versions[targetItem.versions.length - 1]?.checksumSha256 ||
        'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
    };
    setApprovalHistory((prev) => [newApprovalRecord, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Deliverable Approved & Released',
      message: `"${targetItem?.title || 'Deliverable'}" approved by ${currentProfile.name} (${currentProfile.role}). Handover triggered.`,
      timestamp: 'Just now',
      read: false,
      category: 'REVIEW'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4100F5', '#885FFF', '#10B981', '#FFFFFF']
    });

    if (isCEO) {
      addAuditEvent(
        'deliverable.release.executive_override',
        `review:${reviewId}`,
        `CEO Pleasant Johnson executed an Executive Override release. Reason: "${overrideReason || 'Administrative override'}"`,
        overrideReason || 'Executive Override'
      );
    } else {
      addAuditEvent(
        'deliverable.release.approved',
        `review:${reviewId}`,
        `Approved final quality release by CPO ${currentProfile.name}`,
        'Quality checklist verified'
      );
    }
  };

  const requestDeliverableChanges = (reviewId: string, feedback: string) => {
    const targetItem = reviews.find((r) => r.id === reviewId);

    setReviews((prev) =>
      prev.map((item) => {
        if (item.id === reviewId) {
          const updatedVersions = item.versions.map((ver, idx) => {
            if (idx === item.versions.length - 1) {
              return {
                ...ver,
                status: 'CHANGES_REQUESTED' as const,
                reviewDecision: {
                  reviewerId: currentProfile.id,
                  reviewerName: currentProfile.name,
                  decisionDate: 'Just now',
                  feedback
                }
              };
            }
            return ver;
          });
          return {
            ...item,
            status: 'WAITING_ON_CPO',
            waitingOn: 'CHANGES REQUESTED',
            versions: updatedVersions
          };
        }
        return item;
      })
    );

    setSelectedReview((prev) => {
      if (prev && prev.id === reviewId) {
        return {
          ...prev,
          status: 'WAITING_ON_CPO',
          waitingOn: 'CHANGES REQUESTED'
        };
      }
      return prev;
    });

    const newApprovalRecord: ApprovalHistoryItem = {
      id: `appr-${Date.now()}`,
      reviewId,
      projectCode: targetItem?.projectCode || 'PROJECT',
      projectName: targetItem?.projectName || 'Project Deliverable',
      deliverableTitle: targetItem?.title || 'Deliverable',
      versionNumber: targetItem?.versionNumber || 'v2.0',
      authorName: targetItem?.submittedBy || 'Designer',
      reviewerName: currentProfile.name,
      reviewerRole: currentProfile.role,
      status: 'CHANGES_REQUESTED',
      timestamp: 'Just now · Today',
      feedback,
      checksumSha256: targetItem?.versions[targetItem.versions.length - 1]?.checksumSha256
    };
    setApprovalHistory((prev) => [newApprovalRecord, ...prev]);

    addAuditEvent(
      'deliverable.review.request_changes',
      `review:${reviewId}`,
      `Requested revisions. Feedback: "${feedback}"`
    );
  };

  const submitNewDeliverable = (data: {
    projectName: string;
    deliverableName: string;
    versionNumber: string;
    notes: string;
    checksum: string;
    workspace?: WorkspaceLabel;
  }) => {
    const ws = data.workspace || activeWorkspace;
    const newVersion = {
      id: `ver-${Date.now()}`,
      versionNumber: data.versionNumber,
      deliverableName: data.deliverableName,
      projectId: 'prj-custom',
      projectName: data.projectName,
      workspace: ws,
      authorId: currentProfile.id,
      authorName: currentProfile.name,
      authorAvatar: currentProfile.avatarUrl,
      submissionDate: 'Just now',
      checksumSha256: data.checksum || 'a4b2c1d9e8f7...',
      notes: data.notes,
      files: [
        {
          name: `${data.deliverableName.toLowerCase().replace(/\s+/g, '-')}-${data.versionNumber}.zip`,
          size: '18.4 MB',
          type: 'application/zip'
        }
      ],
      status: 'PENDING_REVIEW' as const
    };

    const newItem: ReviewQueueItem = {
      id: `rev-${Date.now()}`,
      projectCode: data.projectName.toUpperCase(),
      projectName: data.projectName,
      workspace: ws,
      category: 'CREATIVE_ASSET',
      title: `${data.deliverableName} ${data.versionNumber}`,
      versionNumber: data.versionNumber,
      submittedBy: currentProfile.name,
      authorRole: currentProfile.title,
      authorAvatar: currentProfile.avatarUrl,
      submittedAgo: 'Just now',
      waitingOn: 'WAITING ON CPO',
      status: 'WAITING_ON_CPO',
      versions: [newVersion]
    };

    setReviews((prev) => [newItem, ...prev]);
    setIsSubmitModalOpen(false);

    addAuditEvent(
      'deliverable.version.submit',
      `deliverable:${data.deliverableName}`,
      `Submitted immutable version ${data.versionNumber}. SHA256: ${data.checksum}`
    );
  };

  // Academy management handlers
  const addTutorSessionReport = (data: Omit<TutorSessionReport, 'id' | 'submittedAt'>) => {
    const newReport: TutorSessionReport = {
      id: `tsr-${Date.now()}`,
      ...data,
      submittedAt: new Date().toISOString().substring(0, 10) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTutorSessionReports((prev) => [newReport, ...prev]);

    // Recalculate attendance stats
    addAuditEvent(
      'academy.session.report_submitted',
      `cohort:${data.cohortCode}`,
      `Tutor ${data.tutorName} submitted report for session ${data.sessionDate}. Attended: ${data.learnersAttended}/${data.totalEnrolled}`
    );
  };

  const markAttendance = (
    sessionId: string,
    cohortId: string,
    cohortCode: string,
    date: string,
    records: { learnerId: string; learnerName: string; status: 'PRESENT' | 'ABSENT' | 'LATE' }[]
  ) => {
    const presentCount = records.filter((r) => r.status === 'PRESENT').length;
    const absentCount = records.filter((r) => r.status === 'ABSENT').length;

    const newAttRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      sessionId,
      cohortId,
      cohortCode,
      date,
      totalPresent: presentCount,
      totalAbsent: absentCount,
      records
    };
    setAttendanceRecords((prev) => [newAttRecord, ...prev]);

    // Update individual learner attendance rates
    setLearners((prev) =>
      prev.map((lrn) => {
        const matchingRecord = records.find((r) => r.learnerId === lrn.id);
        if (matchingRecord) {
          const delta = matchingRecord.status === 'PRESENT' ? 1 : -2;
          const newRate = Math.min(100, Math.max(40, lrn.attendanceRate + delta));
          return {
            ...lrn,
            attendanceRate: newRate,
            status: newRate < 75 ? 'AT_RISK' : 'ENROLLED'
          };
        }
        return lrn;
      })
    );

    addAuditEvent(
      'academy.attendance.marked',
      `cohort:${cohortCode}`,
      `Marked attendance for ${date}: ${presentCount} present, ${absentCount} absent.`
    );
  };

  const gradeSubmission = (submissionId: string, score: number, grade: string, feedback: string) => {
    setAssignmentSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, score, grade, feedback, status: 'GRADED' }
          : s
      )
    );
    addAuditEvent(
      'academy.assignment.graded',
      `submission:${submissionId}`,
      `Graded submission: ${score}/100 (${grade}). Feedback recorded.`
    );
  };

  const submitAcademyIssue = (data: Omit<AcademyIssueReport, 'id' | 'createdAt' | 'status'>) => {
    const newIssue: AcademyIssueReport = {
      id: `iss-${Date.now()}`,
      ...data,
      status: 'OPEN',
      createdAt: new Date().toISOString().substring(0, 10) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAcademyIssues((prev) => [newIssue, ...prev]);
    addAuditEvent(
      'academy.issue.raise',
      `cohort:${data.cohortCode}`,
      `Reported [${data.type}] - Urgency: ${data.urgency}: "${data.description}"`
    );
  };

  const resolveAcademyIssue = (issueId: string) => {
    setAcademyIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: 'RESOLVED' } : i))
    );
    addAuditEvent('academy.issue.resolve', `issue:${issueId}`, `Academy issue marked as resolved`);
  };

  const approveLessonPlan = (planId: string) => {
    setLessonPlans((prev) =>
      prev.map((lp) =>
        lp.id === planId
          ? {
              ...lp,
              reviewStatus: 'APPROVED',
              approvedBy: `${currentProfile.name} (${currentProfile.role})`,
              approvedDate: new Date().toISOString().substring(0, 10)
            }
          : lp
      )
    );
    addAuditEvent(
      'academy.lesson_plan.approve',
      `plan:${planId}`,
      `Lesson plan approved by ${currentProfile.name} (${currentProfile.role})`
    );
  };

  const enrollLearner = (input: EnrollLearnerInput) => {
    const cohort = academyCohorts.find((c) => c.code === input.cohortCode);
    const newId = `lrn-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newLearner: EnrolledLearner = {
      id: newId,
      cohortId: cohort ? cohort.id : 'coh-1',
      cohortCode: input.cohortCode,
      fullName: input.fullName,
      email: input.email || `${input.fullName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@student.dcreativs.com`,
      guardianName: input.guardianName || 'Parent / Guardian',
      guardianContact: input.guardianContact || '+234 800 000 0000',
      attendanceRate: 100,
      progressPercent: 0,
      status: input.status || 'ENROLLED'
    };

    setLearners((prev) => [newLearner, ...prev]);

    setAcademyCohorts((prev) =>
      prev.map((c) => (c.code === input.cohortCode ? { ...c, learnersCount: c.learnersCount + 1 } : c))
    );

    addAuditEvent(
      'academy.learner.enrolled',
      `learner:${newId}`,
      `Enrolled student "${newLearner.fullName}" into Cohort ${input.cohortCode} by ${currentProfile.name}.`
    );

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const bulkEnrollLearners = (
    cohortCode: string,
    learnersList: { fullName: string; email?: string; guardianName?: string; guardianContact?: string }[]
  ): number => {
    const cohort = academyCohorts.find((c) => c.code === cohortCode);
    const newItems: EnrolledLearner[] = [];

    learnersList.forEach((item, index) => {
      const alreadyExists = learners.some(
        (l) => l.cohortCode === cohortCode && l.fullName.toLowerCase() === item.fullName.toLowerCase()
      );
      if (!alreadyExists) {
        newItems.push({
          id: `lrn-${Date.now()}-${index}-${Math.floor(Math.random() * 1000)}`,
          cohortId: cohort ? cohort.id : 'coh-1',
          cohortCode,
          fullName: item.fullName,
          email: item.email || `${item.fullName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@student.dcreativs.com`,
          guardianName: item.guardianName || 'Parent / Guardian',
          guardianContact: item.guardianContact || '+234 800 000 0000',
          attendanceRate: 100,
          progressPercent: 0,
          status: 'ENROLLED'
        });
      }
    });

    if (newItems.length > 0) {
      setLearners((prev) => [...newItems, ...prev]);
      setAcademyCohorts((prev) =>
        prev.map((c) => (c.code === cohortCode ? { ...c, learnersCount: c.learnersCount + newItems.length } : c))
      );
      addAuditEvent(
        'academy.learners.bulk_enrolled',
        `cohort:${cohortCode}`,
        `Batch-enrolled ${newItems.length} learners from partner school list into Cohort ${cohortCode} by ${currentProfile.name}.`
      );
    }

    return newItems.length;
  };

  const recordPaymentReceipt = (data: PaymentReceiptInput) => {
    const invId = data.invoiceNumber || `INV-REC-${Date.now().toString().substring(7)}`;
    const newInvoice: InvoiceItem = {
      id: invId,
      invoiceCode: invId,
      client: data.client,
      project: data.description,
      workspace: data.workspace || 'Official',
      amount: data.amount,
      currency: 'USD',
      status: 'PAID',
      dueDate: data.dueDate || new Date().toISOString().substring(0, 10),
      paidDate: new Date().toISOString().substring(0, 10)
    };

    setInvoices((prev) => [newInvoice, ...prev]);

    addAuditEvent(
      'finance.receipt.reconciled',
      `invoice:${invId}`,
      `Reconciled and settled payment receipt for $${data.amount.toLocaleString()} from "${data.client}" by ${currentProfile.name}.`
    );
  };

  // Role-Based Document Management & Extraction Pipeline
  const uploadDocument = (data: {
    title: string;
    fileName: string;
    fileSize: string;
    format: DocumentFormat;
    category: DocumentCategory;
    intendedPurpose: string;
    proposedDestination: string;
    permittedRoles: UserRole[];
    rowCount?: number;
    initialFields?: { field: string; sourceRef: string; value: any }[];
  }): string => {
    const docId = `doc-${Date.now()}`;
    const token = `tok_${Math.random().toString(36).substring(2, 10)}`;
    const expiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10);

    const newDoc: DocumentRecord = {
      id: docId,
      title: data.title,
      fileName: data.fileName,
      fileSize: data.fileSize,
      format: data.format,
      category: data.category,
      uploaderId: currentProfile.id,
      uploaderName: currentProfile.name,
      uploaderRole: currentProfile.role,
      uploadDate: new Date().toISOString().substring(0, 10),
      version: 'v1.0',
      status: 'EXTRACTED',
      downloadToken: token,
      tokenExpiresAt: expiry,
      intendedPurpose: data.intendedPurpose,
      proposedDestination: data.proposedDestination,
      permittedRoles: data.permittedRoles,
      rowCount: data.rowCount || (data.format === 'XLSX' || data.format === 'CSV' ? 24 : 1)
    };

    setDocuments((prev) => [newDoc, ...prev]);

    // Create an associated reviewable extraction job
    let defaultFields = data.initialFields;
    let parsedRowsData: { rowNumber: number; data: Record<string, any>; errors?: string[] }[] | undefined = undefined;
    let proposedSummary = `Proposed structured ingestion of ${data.title} into ${data.proposedDestination}. Validated ${data.rowCount || 1} records.`;

    if (!defaultFields) {
      if (data.category === 'ACADEMY') {
        defaultFields = [
          { field: 'cohortCode', sourceRef: 'Sheet1!B2', value: 'LAGOS-FWE-26A' },
          { field: 'schoolName', sourceRef: 'Header!School', value: "Queen's College Yaba" },
          { field: 'totalStudents', sourceRef: 'Sheet1!E2', value: 3 },
          { field: 'averageAttendance', sourceRef: 'Sheet1!E3', value: '96.5%' }
        ];
        parsedRowsData = [
          {
            rowNumber: 1,
            data: {
              fullName: 'Chioma Okonjo',
              email: 'chioma.o@gmail.com',
              cohortCode: 'LAGOS-FWE-26A',
              guardianName: 'Mrs. Ngozi Okonjo',
              guardianContact: '+234 803 111 8899',
              attendanceRate: 98,
              progressPercent: 85
            }
          },
          {
            rowNumber: 2,
            data: {
              fullName: 'Damilola Adeleke',
              email: 'damilola.a@yahoo.com',
              cohortCode: 'LAGOS-FWE-26A',
              guardianName: 'Chief Babatunde Adeleke',
              guardianContact: '+234 802 334 5511',
              attendanceRate: 94,
              progressPercent: 80
            }
          },
          {
            rowNumber: 3,
            data: {
              fullName: 'Ibrahim Musa',
              email: 'ibrahim.m@outlook.com',
              cohortCode: 'LAGOS-FWE-26A',
              guardianName: 'Alhaji Garba Musa',
              guardianContact: '+234 805 992 4433',
              attendanceRate: 96,
              progressPercent: 90
            }
          }
        ];
        proposedSummary = `Import 3 parsed student records from ${data.title} into Central Learner Registry for Cohort LAGOS-FWE-26A.`;
      } else if (data.category === 'FINANCE') {
        const estAmount = Math.floor(2500 + Math.random() * 6500);
        defaultFields = [
          { field: 'receiptNumber', sourceRef: 'Header!ReceiptID', value: `RCP-PAY-${Date.now().toString().substring(7)}` },
          { field: 'payerName', sourceRef: 'Body!Payer', value: data.title.includes('School') || data.title.includes('College') ? "Queen's College Yaba" : 'Partner Institution' },
          { field: 'amount', sourceRef: 'Body!TotalAmount', value: estAmount },
          { field: 'currency', sourceRef: 'Body!Currency', value: 'USD' },
          { field: 'paymentDate', sourceRef: 'Footer!Date', value: new Date().toISOString().substring(0, 10) },
          { field: 'description', sourceRef: 'Body!Narration', value: `Tuition & Courseware payment from ${data.title}` }
        ];
        proposedSummary = `Reconcile payment receipt of $${estAmount.toLocaleString()} into Finance Invoices Ledger as Settled / Paid.`;
      } else {
        defaultFields = [
          { field: 'recordTitle', sourceRef: 'Header!A1', value: data.title },
          { field: 'categoryCode', sourceRef: 'Meta!B2', value: data.category },
          { field: 'recordDate', sourceRef: 'Meta!C2', value: new Date().toISOString().substring(0, 10) }
        ];
      }
    }

    const newJob: ExtractionJob = {
      id: `job-${Date.now()}`,
      documentId: docId,
      documentTitle: data.title,
      fileName: data.fileName,
      format: data.format,
      category: data.category,
      status: 'READY_FOR_REVIEW',
      parsedFields: defaultFields.map((f) => ({
        field: f.field,
        sourceRef: f.sourceRef,
        originalValue: f.value,
        correctedValue: f.value,
        isValid: true
      })),
      parsedRows: parsedRowsData,
      columnMappings:
        data.format === 'XLSX' || data.format === 'CSV'
          ? [
              { sourceColumn: 'Student_ID', destinationField: 'learnerId', status: 'MAPPED' },
              { sourceColumn: 'Student_Name', destinationField: 'fullName', status: 'MAPPED' },
              { sourceColumn: 'Guardian_Contact', destinationField: 'guardianContact', status: 'MAPPED' }
            ]
          : undefined,
      proposedChangesSummary: proposedSummary,
      createdAt: new Date().toISOString().substring(0, 10) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setExtractionJobs((prev) => [newJob, ...prev]);

    addAuditEvent(
      'document.upload.extract',
      `doc:${docId}`,
      `Uploaded and extracted document "${data.title}" (${data.format}) by ${currentProfile.name}. Created review job.`
    );

    return docId;
  };

  const updateExtractionParsedField = (jobId: string, fieldIndex: number, correctedValue: any) => {
    setExtractionJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const updated = [...j.parsedFields];
          if (updated[fieldIndex]) {
            updated[fieldIndex] = {
              ...updated[fieldIndex],
              correctedValue,
              isValid: true
            };
          }
          return { ...j, parsedFields: updated };
        }
        return j;
      })
    );
  };

  const updateExtractionColumnMapping = (
    jobId: string,
    sourceColumn: string,
    destinationField: string
  ) => {
    setExtractionJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId && j.columnMappings) {
          const updated = j.columnMappings.map((col) =>
            col.sourceColumn === sourceColumn
              ? { ...col, destinationField, status: 'MAPPED' as const }
              : col
          );
          return { ...j, columnMappings: updated };
        }
        return j;
      })
    );
  };

  // Transactionally applies extracted changes to active business records
  const applyExtractionJob = (jobId: string): boolean => {
    const job = extractionJobs.find((j) => j.id === jobId);
    if (!job) return false;

    // Mark extraction job as APPLIED
    setExtractionJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: 'APPLIED',
              appliedAt: new Date().toISOString().substring(0, 10),
              reviewedBy: currentProfile.name
            }
          : j
      )
    );

    // Update document status to APPROVED
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === job.documentId
          ? {
              ...d,
              status: 'APPROVED',
              approvedBy: `${currentProfile.name} (${currentProfile.role})`,
              approvedAt: new Date().toISOString().substring(0, 10)
            }
          : d
      )
    );

    // If Academy attendance / student roster import, commit actual learners
    if (job.category === 'ACADEMY') {
      const cohortField = job.parsedFields.find((f) => f.field === 'cohortCode');
      const cohortCode = cohortField ? String(cohortField.correctedValue) : 'LAGOS-FWE-26A';

      const studentsToIngest = job.parsedRows && job.parsedRows.length > 0
        ? job.parsedRows.map((r) => ({
            fullName: String(r.data.fullName || r.data.Student_Name || 'Enrolled Student'),
            email: r.data.email ? String(r.data.email) : undefined,
            guardianName: r.data.guardianName ? String(r.data.guardianName) : undefined,
            guardianContact: r.data.guardianContact || r.data.Guardian_Phone ? String(r.data.guardianContact || r.data.Guardian_Phone) : undefined
          }))
        : [
            { fullName: 'Kelechi Madu', email: 'kelechi.m@gmail.com', guardianName: 'Engr. Emeka Madu', guardianContact: '+234 803 221 4401' },
            { fullName: 'Zainab Al-Hassan', email: 'zainab.alhassan@outlook.com', guardianName: 'Hajia Fatima Al-Hassan', guardianContact: '+234 802 883 1199' },
            { fullName: 'Tariq Adeleke', email: 'tariq.adeleke@yahoo.com', guardianName: 'Dr. Kunle Adeleke', guardianContact: '+234 805 772 3344' }
          ];

      bulkEnrollLearners(cohortCode, studentsToIngest);
    } else if (job.category === 'FINANCE') {
      // If Finance payment receipt, reconcile into invoices ledger
      const amountField = job.parsedFields.find((f) => f.field === 'amount');
      const amount = amountField ? Number(amountField.correctedValue) || 8500 : 8500;
      const payerField = job.parsedFields.find((f) => f.field === 'payerName' || f.field === 'vendorName' || f.field === 'clientName');
      const clientName = payerField ? String(payerField.correctedValue) : "Queen's College Yaba";
      const descField = job.parsedFields.find((f) => f.field === 'description');
      const description = descField ? String(descField.correctedValue) : `Payment Receipt Reconciliation - ${job.documentTitle}`;
      const rcpField = job.parsedFields.find((f) => f.field === 'receiptNumber');
      const invoiceNumber = rcpField ? String(rcpField.correctedValue) : `INV-REC-${Date.now().toString().substring(7)}`;

      recordPaymentReceipt({
        invoiceNumber,
        client: clientName,
        description,
        amount,
        workspace: 'Official'
      });
    }

    addAuditEvent(
      'document.extraction.applied',
      `job:${jobId}`,
      `Authorized reviewer ${currentProfile.name} (${currentProfile.role}) applied changes from "${job.documentTitle}" to production records.`
    );

    // Trigger celebration
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    return true;
  };

  const archiveDocument = (documentId: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === documentId ? { ...d, isArchived: true, status: 'ARCHIVED' } : d
      )
    );
    addAuditEvent('document.archive', `doc:${documentId}`, `Document archived by ${currentProfile.name}`);
  };

  // Generate deterministic report
  const generateReport = (
    title: string,
    type: GeneratedReport['type'],
    reportingPeriod: string,
    dataSummary: Record<string, any>,
    dataSources: string[]
  ): GeneratedReport => {
    const newReport: GeneratedReport = {
      id: `rep-${Date.now()}`,
      title,
      type,
      reportingPeriod,
      generatedAt: new Date().toISOString().substring(0, 10) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      generatedBy: currentProfile.name,
      generatorRole: currentProfile.role,
      dataSources,
      dataSummary,
      status: 'PUBLISHED'
    };
    setGeneratedReports((prev) => [newReport, ...prev]);

    addAuditEvent(
      'report.generate',
      `report:${title}`,
      `Generated verified report "${title}" for period ${reportingPeriod} from approved records.`
    );
    return newReport;
  };

  // Board Seat Grants
  const grantBoardSeat = (
    seatNumber: number,
    candidateName: string,
    scope: string,
    reason: string,
    expiresAt?: string
  ) => {
    setBoardSeats((prev) =>
      prev.map((s) => {
        if (s.seatNumber === seatNumber) {
          return {
            ...s,
            holderName: candidateName,
            status: 'ACTIVE',
            grantScope: scope,
            grantReason: reason,
            grantedBy: currentProfile.name,
            grantedAt: new Date().toISOString().substring(0, 10),
            expiresAt: expiresAt || '2028-12-31'
          };
        }
        return s;
      })
    );

    addAuditEvent(
      'board.seat.grant',
      `seat:${seatNumber}`,
      `Granted seat #${seatNumber} to ${candidateName}. Scope: ${scope}`,
      reason
    );
  };

  const revokeBoardSeat = (seatNumber: number, reason: string) => {
    setBoardSeats((prev) =>
      prev.map((s) => {
        if (s.seatNumber === seatNumber) {
          return {
            ...s,
            status: 'REVOKED',
            grantReason: `Revoked: ${reason}`
          };
        }
        return s;
      })
    );

    addAuditEvent(
      'board.seat.revoke',
      `seat:${seatNumber}`,
      `Revoked board seat #${seatNumber}`,
      reason
    );
  };

  // Talent stage updates
  const updateCandidateStage = (candidateId: string, newStage: TalentCandidate['status']) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          return { ...c, status: newStage };
        }
        return c;
      })
    );

    addAuditEvent(
      'talent.stage.update',
      `candidate:${candidateId}`,
      `Updated candidate recruitment stage to ${newStage}`
    );
  };

  const addCandidate = (candidateData: Omit<TalentCandidate, 'id'>) => {
    const newCand: TalentCandidate = {
      id: `cand-${Date.now()}`,
      ...candidateData
    };
    setCandidates((prev) => [newCand, ...prev]);
    setIsAddCandidateModalOpen(false);

    addAuditEvent(
      'talent.candidate.add',
      `candidate:${newCand.name}`,
      `Added candidate ${newCand.name} for ${newCand.department}`
    );
  };

  // Mark invoice paid
  const markInvoicePaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return { ...inv, status: 'PAID', paidDate: new Date().toISOString().substring(0, 10) };
        }
        return inv;
      })
    );

    addAuditEvent(
      'finance.invoice.paid',
      `invoice:${invoiceId}`,
      `Marked invoice ${invoiceId} as settled`
    );
  };

  // Marketing campaigns
  const addCampaign = (data: {
    title: string;
    dayOfMonth: number;
    color: string;
    reachEstimate?: string;
    budgetUSD?: number;
  }) => {
    const newCamp: MarketingCampaign = {
      id: `cmp-${Date.now()}`,
      title: data.title,
      dayOfMonth: data.dayOfMonth,
      color: data.color,
      date: `2026-06-${String(data.dayOfMonth).padStart(2, '0')}`,
      type: 'blast',
      reachEstimate: data.reachEstimate || '50K reach',
      budgetUSD: data.budgetUSD || 2000
    };

    setCampaigns((prev) => [...prev, newCamp]);
    setIsNewCampaignModalOpen(false);

    addAuditEvent(
      'marketing.campaign.add',
      `campaign:${data.title}`,
      `Scheduled campaign for day ${data.dayOfMonth}`
    );
  };

  // Operational alerts
  const addOperationalAlert = (alertData: {
    title: string;
    description: string;
    type: 'CRITICAL' | 'WARNING' | 'HEALTHY';
  }) => {
    const newAlert = {
      id: `alt-${Date.now()}`,
      ...alertData
    };
    setOperationalAlerts((prev) => [newAlert, ...prev]);
    addAuditEvent('operations.alert.raise', `alert:${newAlert.title}`, alertData.description);
  };

  const acknowledgeAlert = (id: string) => {
    setOperationalAlerts((prev) => prev.filter((a) => a.id !== id));
    addAuditEvent('operations.alert.ack', `alert:${id}`, 'Alert acknowledged by operator');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentProfile,
        allProfiles,
        login,
        register,
        logout,
        resolveAccountRole,
        activeWorkspace,
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery,
        canAccessView,
        currency,
        setCurrency,
        currencyRate: currencyRates[currency],
        currencySymbol: currencySymbols[currency],
        tasks,
        toggleTaskChecklist,
        addTask,
        updateTaskStatus,
        openLineReports,
        submitOpenLineReport,
        updateOpenLineStatus,
        reviews,
        selectedReview,
        setSelectedReview,
        approvalHistory,
        approveDeliverable,
        requestDeliverableChanges,
        submitNewDeliverable,
        partnerSchools,
        academyProgrammes,
        academyCohorts,
        learners,
        timetables,
        lessonPlans,
        attendanceRecords,
        assignmentSubmissions,
        tutorSessionReports,
        academyIssues,
        academyCompletionReports,
        addTutorSessionReport,
        markAttendance,
        gradeSubmission,
        submitAcademyIssue,
        resolveAcademyIssue,
        approveLessonPlan,
        enrollLearner,
        bulkEnrollLearners,
        recordPaymentReceipt,
        documents,
        extractionJobs,
        generatedReports,
        uploadDocument,
        updateExtractionParsedField,
        updateExtractionColumnMapping,
        applyExtractionJob,
        archiveDocument,
        generateReport,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        isApprovalHistoryModalOpen,
        setIsApprovalHistoryModalOpen,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        isBoardGrantModalOpen,
        setIsBoardGrantModalOpen,
        selectedBoardSeat,
        setSelectedBoardSeat,
        isActivityLogDrawerOpen,
        setIsActivityLogDrawerOpen,
        isManageInvoicesModalOpen,
        setIsManageInvoicesModalOpen,
        isAddCandidateModalOpen,
        setIsAddCandidateModalOpen,
        selectedCandidateDetail,
        setSelectedCandidateDetail,
        isNewCampaignModalOpen,
        setIsNewCampaignModalOpen,
        isNewUpdateModalOpen,
        setIsNewUpdateModalOpen,
        boardSeats,
        grantBoardSeat,
        revokeBoardSeat,
        candidates,
        updateCandidateStage,
        addCandidate,
        invoices,
        markInvoicePaid,
        campaigns,
        addCampaign,
        operationalAlerts,
        addOperationalAlert,
        acknowledgeAlert,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        auditLogs,
        addAuditEvent,
        isOffline,
        setIsOffline,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
