import {
  UserProfile,
  ReviewQueueItem,
  ActiveWorkflow,
  TalentCandidate,
  MarketingCampaign,
  BoardSeat,
  InvoiceItem,
  NotificationItem,
  AuditEvent,
  TaskItem,
  OpenLineReport,
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
  GeneratedReport
} from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'usr-ceo',
    name: 'Pleasant Johnson (CEO)',
    email: 'pleasant@dcreativs.com',
    title: 'Chief Executive Officer',
    role: 'CEO',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Executive',
    isFounder: true,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 09:00 - 18:00',
    approvalLimitUSD: 1000000,
    boardSeatNumber: 1,
    boardAccessStatus: 'ACTIVE',
    password: 'password123',
    permittedWorkspaces: ['Build', 'Studio', 'Blenders', 'Feed', 'Official', 'Mainframe'],
    isOmbudsman: false,
    assignedWorkspaceName: 'CEO Executive Suite',
    primaryWorkspace: 'CEO Executive Suite'
  },
  {
    id: 'usr-coo',
    name: 'Morgan Thorne',
    email: 'morgan@dcreativs.com',
    title: 'Chief Operating Officer',
    role: 'COO',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Operations',
    isFounder: true,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 08:30 - 18:30',
    approvalLimitUSD: 50000,
    boardSeatNumber: 2,
    boardAccessStatus: 'PENDING',
    password: 'password123',
    permittedWorkspaces: ['Build', 'Studio', 'Blenders', 'Feed', 'Official', 'Mainframe'],
    isOmbudsman: false,
    assignedWorkspaceName: 'COO Operations Desk',
    primaryWorkspace: 'COO Operations Desk'
  },
  {
    id: 'usr-cpo',
    name: 'Kingsley (Sarah Chen)',
    email: 'kingsley@dcreativs.com',
    title: 'Chief Product Officer',
    role: 'CPO',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    department: 'Brand and Graphic Design',
    isFounder: true,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 09:00 - 17:30',
    approvalLimitUSD: 25000,
    password: 'password123',
    permittedWorkspaces: ['Studio', 'Build', 'Blenders'],
    isOmbudsman: false,
    assignedWorkspaceName: 'CPO Product Suite',
    primaryWorkspace: 'CPO Product Suite'
  },
  {
    id: 'usr-cfo',
    name: 'Xant (Interim CFO)',
    email: 'finance@dcreativs.com',
    title: 'Chief Financial Officer (Interim)',
    role: 'CFO',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Finance',
    isFounder: true,
    isInterim: true,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 09:00 - 17:00',
    approvalLimitUSD: 250000,
    password: 'password123',
    permittedWorkspaces: ['Official', 'Build'],
    isOmbudsman: false,
    assignedWorkspaceName: 'Finance Workspace',
    primaryWorkspace: 'Finance Workspace',
    flaggedForRoleAudit: true,
    auditFlagReason: 'Multiple role assignments: Interim CFO role assigned to founding team. System requires administrator verification to confirm dedicated financial workspace.'
  },
  {
    id: 'usr-chro',
    name: 'Estella (Elena Rossi)',
    email: 'estella@dcreativs.com',
    title: 'Chief Human Resources Officer & Ombudsman',
    role: 'CHRO',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'People',
    isFounder: true,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 09:00 - 17:00',
    password: 'password123',
    permittedWorkspaces: ['Official', 'Mainframe'],
    isOmbudsman: true,
    assignedWorkspaceName: 'People & Talent Workspace',
    primaryWorkspace: 'People & Talent Workspace'
  },
  {
    id: 'usr-cmo',
    name: 'Nina Williams (CMO Confirmed)',
    email: 'nina@dcreativs.com',
    title: 'Chief Marketing Officer',
    role: 'CMO',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    department: 'Marketing and Social',
    isFounder: true,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 09:30 - 18:00',
    password: 'password123',
    permittedWorkspaces: ['Feed', 'Studio'],
    isOmbudsman: false,
    assignedWorkspaceName: 'Marketing Workspace',
    primaryWorkspace: 'Marketing Workspace'
  },
  {
    id: 'usr-coordinator',
    name: 'Tunde Bakare',
    email: 'tunde.bakare@dcreativs.com',
    title: 'Academy Operations Coordinator',
    role: 'ACADEMY_COORDINATOR',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    department: 'D\'Creativs Academy',
    isFounder: false,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Sat 08:30 - 17:30',
    password: 'password123',
    permittedWorkspaces: ['Build', 'Studio'],
    isOmbudsman: false,
    assignedWorkspaceName: 'Academy Operations Desk',
    primaryWorkspace: 'Academy Operations Desk'
  },
  {
    id: 'usr-tutor',
    name: 'Amara Okafor',
    email: 'amara.tutor@dcreativs.com',
    title: 'Lead Coding & Robotics Tutor',
    role: 'ACADEMY_TUTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    department: 'D\'Creativs Academy',
    isFounder: false,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Tue-Sat 09:00 - 16:30',
    password: 'password123',
    permittedWorkspaces: ['Build'],
    isOmbudsman: false,
    assignedWorkspaceName: 'Academy Tutor Workspace',
    primaryWorkspace: 'Academy Tutor Workspace',
    assignedCohortIds: ['coh-lagos-a', 'coh-st-saviour']
  },
  {
    id: 'usr-designer',
    name: 'Maya Ray',
    email: 'maya@dcreativs.com',
    title: 'Senior Product & Brand Designer',
    role: 'BRAND_DESIGNER',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'Brand and Graphic Design',
    isFounder: false,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 10:00 - 18:00',
    password: 'password123',
    permittedWorkspaces: ['Studio', 'Blenders'],
    isOmbudsman: false,
    assignedWorkspaceName: 'Staff Workspace',
    primaryWorkspace: 'Staff Workspace'
  },
  {
    id: 'usr-dev',
    name: 'Leo Marcus',
    email: 'leo@dcreativs.com',
    title: 'Lead Fullstack Developer',
    role: 'DEVELOPER',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    department: 'Web and Digital Products',
    isFounder: false,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Mon-Fri 09:00 - 18:00',
    password: 'password123',
    permittedWorkspaces: ['Build', 'Mainframe'],
    isOmbudsman: false,
    assignedWorkspaceName: 'Staff Workspace',
    primaryWorkspace: 'Staff Workspace'
  },
  {
    id: 'usr-board',
    name: 'Dr. Arthur Sterling',
    email: 'arthur.sterling@advisory.org',
    title: 'Independent Board Director',
    role: 'BOARD_MEMBER',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    department: 'Governance & Board',
    isFounder: false,
    boardSeatNumber: 3,
    boardAccessStatus: 'ACTIVE',
    timezone: 'Europe/London (GMT, UTC+0)',
    workingHours: 'Advisory Sessions',
    password: 'password123',
    permittedWorkspaces: ['Official'],
    isOmbudsman: false,
    assignedWorkspaceName: 'Board Room Workspace',
    primaryWorkspace: 'Board Room Workspace'
  },
  {
    id: 'usr-unassigned',
    name: 'Kemi Adebayo',
    email: 'kemi.adebayo@dcreativs.com',
    title: 'Onboarding Associate (Pending Assignment)',
    role: 'UNASSIGNED',
    avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
    department: 'Pending Designation',
    isFounder: false,
    timezone: 'Africa/Lagos (WAT, UTC+1)',
    workingHours: 'Pending Verification',
    password: 'password123',
    permittedWorkspaces: [],
    isOmbudsman: false,
    assignedWorkspaceName: 'Access Awaiting Assignment',
    flaggedForRoleAudit: true,
    auditFlagReason: 'Account created without primary role allocation. Held in quarantine awaiting administrator workspace assignment.'
  }
];

export const INITIAL_BOARD_SEATS: BoardSeat[] = [
  {
    seatNumber: 1,
    holderName: 'Pleasant Johnson (CEO)',
    holderEmail: 'pleasant@dcreativs.com',
    holderTitle: 'Executive Chairman & CEO',
    status: 'ACTIVE',
    grantScope: 'Full Governance & Strategy Oversight',
    grantReason: 'Founding Organization Owner',
    grantedBy: 'Pleasant Johnson',
    grantedAt: '2026-01-01',
    expiresAt: '2028-12-31'
  },
  {
    seatNumber: 2,
    holderName: 'Morgan Thorne (COO)',
    holderEmail: 'morgan@dcreativs.com',
    holderTitle: 'Operations Director',
    status: 'PENDING',
    grantScope: 'Operational Governance & Delivery Oversight',
    grantReason: 'Executive Operational Partner',
    grantedBy: 'Pending CEO Confirmation',
    grantedAt: '2026-05-15'
  },
  {
    seatNumber: 3,
    holderName: 'Dr. Arthur Sterling',
    holderEmail: 'arthur.sterling@advisory.org',
    holderTitle: 'Independent Board Director',
    status: 'ACTIVE',
    grantScope: 'Audit, Risk & International Strategy',
    grantReason: 'Appointed Independent Governance Lead',
    grantedBy: 'Pleasant Johnson',
    grantedAt: '2026-02-10',
    expiresAt: '2027-02-10'
  },
  { seatNumber: 4, status: 'VACANT' },
  { seatNumber: 5, status: 'VACANT' },
  { seatNumber: 6, status: 'VACANT' },
  { seatNumber: 7, status: 'VACANT' },
  { seatNumber: 8, status: 'VACANT' }
];

export const INITIAL_REVIEWS: ReviewQueueItem[] = [
  {
    id: 'rev-01',
    projectCode: 'PROJECT ORBIT',
    projectName: 'Orbit FinTech Rebrand',
    workspace: 'Studio',
    category: 'CREATIVE_ASSET',
    title: 'App Icon Set v2 — Dark Mode Iterations',
    versionNumber: 'v2.0',
    submittedBy: 'Leo Marcus',
    authorRole: 'UI/UX Designer',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    submittedAgo: '2 hours ago',
    waitingOn: 'WAITING ON CPO',
    status: 'WAITING_ON_CPO',
    versions: [
      {
        id: 'ver-orbit-1',
        versionNumber: 'v1.0',
        deliverableName: 'App Icon Set',
        projectId: 'prj-orbit',
        projectName: 'Project Orbit',
        workspace: 'Studio',
        authorId: 'usr-dev',
        authorName: 'Leo Marcus',
        authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        submissionDate: '2026-06-01 14:20 WAT',
        checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        notes: 'Initial icon submission. Primary brand glyph in flat electric violet.',
        files: [{ name: 'orbit-icon-pack-v1.zip', size: '24.2 MB', type: 'application/zip' }],
        status: 'CHANGES_REQUESTED',
        reviewDecision: {
          reviewerId: 'usr-cpo',
          reviewerName: 'Sarah Chen (CPO)',
          decisionDate: '2026-06-02 09:15 WAT',
          feedback: 'Contrast is slightly low on dark AMOLED backgrounds. Please iterate on neon glow.'
        }
      },
      {
        id: 'ver-orbit-2',
        versionNumber: 'v2.0',
        deliverableName: 'App Icon Set',
        projectId: 'prj-orbit',
        projectName: 'Project Orbit',
        workspace: 'Studio',
        authorId: 'usr-dev',
        authorName: 'Leo Marcus',
        authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        submissionDate: '2026-06-03 10:00 WAT',
        checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        notes: 'Iterated on AMOLED contrast and refined secondary badge contours.',
        files: [{ name: 'orbit-icon-pack-v2-dark.zip', size: '28.1 MB', type: 'application/zip' }],
        status: 'PENDING_REVIEW'
      }
    ]
  },
  {
    id: 'rev-02',
    projectCode: 'MARVEL SMS',
    projectName: 'Marvel SMS V2',
    workspace: 'Studio',
    category: 'CREATIVE_ASSET',
    title: 'Dashboard High-Fi Mockups v3',
    versionNumber: 'v3.0',
    submittedBy: 'Maya Ray',
    authorRole: 'Senior Designer',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    submittedAgo: '4 hours ago',
    waitingOn: 'CURRENTLY VIEWING',
    currentlyViewing: true,
    designerNote: 'Updated the chart components as requested in the last review. Increased contrast on the secondary navigation and fixed the alignment issue on the mobile layout. Ready for approval for handover.',
    status: 'CURRENTLY_VIEWING',
    versions: [
      {
        id: 'ver-marvel-1',
        versionNumber: 'v1.0',
        deliverableName: 'Dashboard Mockups',
        projectId: 'prj-marvel',
        projectName: 'Marvel SMS',
        workspace: 'Studio',
        authorId: 'usr-designer',
        authorName: 'Maya Ray',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        submissionDate: '2026-05-28 11:00 WAT',
        checksumSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        notes: 'Initial dashboard layout exploration.',
        files: [{ name: 'marvel-sms-v1.fig', size: '42.8 MB', type: 'application/figma' }],
        status: 'CHANGES_REQUESTED',
        reviewDecision: {
          reviewerId: 'usr-cpo',
          reviewerName: 'Sarah Chen (CPO)',
          decisionDate: '2026-05-29 16:00 WAT',
          feedback: 'Need dedicated delivery status badges and clearer mobile responsive grids.'
        }
      },
      {
        id: 'ver-marvel-2',
        versionNumber: 'v2.0',
        deliverableName: 'Dashboard Mockups',
        projectId: 'prj-marvel',
        projectName: 'Marvel SMS',
        workspace: 'Studio',
        authorId: 'usr-designer',
        authorName: 'Maya Ray',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        submissionDate: '2026-06-01 15:30 WAT',
        checksumSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
        notes: 'Added badges and responsive layout.',
        files: [{ name: 'marvel-sms-v2.fig', size: '45.1 MB', type: 'application/figma' }],
        status: 'CHANGES_REQUESTED',
        reviewDecision: {
          reviewerId: 'usr-cpo',
          reviewerName: 'Sarah Chen (CPO)',
          decisionDate: '2026-06-02 14:12 WAT',
          feedback: 'Chart components need higher contrast and secondary nav needs clearer labels.'
        }
      },
      {
        id: 'ver-marvel-3',
        versionNumber: 'v3.0',
        deliverableName: 'Dashboard Mockups',
        projectId: 'prj-marvel',
        projectName: 'Marvel SMS',
        workspace: 'Studio',
        authorId: 'usr-designer',
        authorName: 'Maya Ray',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        submissionDate: '2026-06-03 08:30 WAT',
        checksumSha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
        notes: 'Updated the chart components as requested. Increased contrast on secondary nav and fixed mobile alignment. Ready for handover.',
        files: [{ name: 'marvel-sms-v3-final.fig', size: '46.7 MB', type: 'application/figma' }],
        status: 'PENDING_REVIEW'
      }
    ]
  },
  {
    id: 'rev-03',
    projectCode: 'INTERNAL TOOLING',
    projectName: 'Automation Script',
    workspace: 'Mainframe',
    category: 'CODE_REVIEW',
    title: 'Automated Social Scheduler v1.0',
    versionNumber: 'v1.0',
    submittedBy: 'Leo Marcus',
    authorRole: 'Fullstack Dev',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    submittedAgo: 'Yesterday',
    waitingOn: 'PENDING DEP. CHECK',
    status: 'PENDING_DEP_CHECK',
    versions: [
      {
        id: 'ver-tooling-1',
        versionNumber: 'v1.0',
        deliverableName: 'Social Scheduler Script',
        projectId: 'prj-tooling',
        projectName: 'Internal Tooling',
        workspace: 'Mainframe',
        authorId: 'usr-dev',
        authorName: 'Leo Marcus',
        authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        submissionDate: '2026-06-02 18:00 WAT',
        checksumSha256: 'bc948a43f886f3458739cfc1a5b48ff2270921447fb98075f10f4f9f7d452097',
        notes: 'Automated queue worker for campaign media scheduling. Includes unit tests.',
        files: [{ name: 'scheduler-v1.0.bundle.js', size: '1.4 MB', type: 'application/javascript' }],
        status: 'PENDING_REVIEW'
      }
    ]
  }
];

export const INITIAL_APPROVAL_HISTORY: ApprovalHistoryItem[] = [
  {
    id: 'appr-hist-1',
    reviewId: 'rev-orbit',
    projectCode: 'PROJECT NEXUS',
    projectName: 'Brand Identity',
    deliverableTitle: 'Brand Kit Release',
    versionNumber: 'v2.1',
    authorName: 'Sarah Chen',
    reviewerName: 'Kingsley (Sarah Chen)',
    reviewerRole: 'CPO',
    status: 'APPROVED',
    timestamp: '10:45 AM · Today',
    feedback: 'Brand guidelines and asset exports verified against agency standards. Approved for client release.',
    checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'appr-hist-2',
    reviewId: 'rev-02',
    projectCode: 'MARVEL SMS',
    projectName: 'Marvel SMS V2',
    deliverableTitle: "Maya's UI Mockups v2",
    versionNumber: 'v2.0',
    authorName: 'Maya Ray',
    reviewerName: 'Kingsley (Sarah Chen)',
    reviewerRole: 'CPO',
    status: 'CHANGES_REQUESTED',
    timestamp: 'Yesterday · 04:12 PM',
    feedback: 'Chart components need higher contrast and secondary nav needs clearer labels.',
    checksumSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
  },
  {
    id: 'appr-hist-3',
    reviewId: 'rev-aero',
    projectCode: 'AERO DYNAMICS',
    projectName: 'Investor Deck',
    deliverableTitle: 'Aero Pitch Deck',
    versionNumber: 'v1.4',
    authorName: 'David K.',
    reviewerName: 'Kingsley (Sarah Chen)',
    reviewerRole: 'CPO',
    status: 'APPROVED',
    timestamp: 'May 29 · 11:00 AM',
    feedback: 'Approved after typography and slide layout checks.',
    checksumSha256: 'bc948a43f886f3458739cfc1a5b48ff2270921447fb98075f10f4f9f7d452097'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-1',
    title: 'Marvel SMS: Refine Chart Contrast & Mobile Viewports',
    project: 'Marvel SMS V2',
    workspace: 'Studio',
    assigneeId: 'usr-designer',
    assigneeName: 'Maya Ray',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    due: 'Today · 17:00 WAT',
    status: 'IN_PROGRESS',
    category: 'DESIGN',
    checklist: [
      { id: 'chk-1-1', text: 'AMOLED black balance & color tokens', done: true },
      { id: 'chk-1-2', text: 'Mobile navbar touch target minimum 44px', done: true },
      { id: 'chk-1-3', text: 'Export Figma responsive assets & spec bundle', done: false }
    ]
  },
  {
    id: 'tsk-2',
    title: 'Project Orbit: Export SVG Icons & Dark Mode Palette Tokens',
    project: 'Project Orbit',
    workspace: 'Studio',
    assigneeId: 'usr-dev',
    assigneeName: 'Leo Marcus',
    assigneeAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    due: 'Tomorrow · 12:00 WAT',
    status: 'PENDING_REVIEW',
    category: 'ENGINEERING',
    checklist: [
      { id: 'chk-2-1', text: 'Checksum validation and file integrity verification', done: true },
      { id: 'chk-2-2', text: 'SVGO compression to under 15kb per asset', done: true },
      { id: 'chk-2-3', text: 'Package asset bundle with cryptographic manifest', done: true }
    ]
  },
  {
    id: 'tsk-3',
    title: 'Client Review n8n Webhook Deduplication Adapter',
    project: 'Mainframe Tooling',
    workspace: 'Mainframe',
    assigneeId: 'usr-dev',
    assigneeName: 'Leo Marcus',
    assigneeAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    due: 'June 09, 2026',
    status: 'PLANNED',
    category: 'AUTOMATION',
    checklist: [
      { id: 'chk-3-1', text: 'HMAC-SHA256 signature check', done: false },
      { id: 'chk-3-2', text: 'Idempotency key cache with 24h TTL', done: false },
      { id: 'chk-3-3', text: 'Dead-letter retry queue fallback', done: false }
    ]
  },
  {
    id: 'tsk-4',
    title: 'Q3 Agency Growth Reel Motion Graphics Render',
    project: 'Growth Marketing',
    workspace: 'Blenders',
    assigneeId: 'usr-designer',
    assigneeName: 'Maya Ray',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    due: 'June 14, 2026',
    status: 'IN_PROGRESS',
    category: 'DESIGN',
    checklist: [
      { id: 'chk-4-1', text: '3D viewport camera choreography', done: true },
      { id: 'chk-4-2', text: 'Electric violet lighting passes', done: false }
    ]
  }
];

export const INITIAL_OPENLINE_REPORTS: OpenLineReport[] = [
  {
    id: 'ol-101',
    trackingCode: 'OL-8921-X',
    category: 'CONDUCT',
    summary: 'Cross-team scope creep concerns regarding Project Orbit timeline commitments',
    body: 'Concerns that recent timeline cuts for Orbit were approved without developer consultation, leading to unaddressed technical debt and overtime.',
    timestamp: '2026-06-01 16:40 WAT',
    status: 'INVESTIGATING',
    anonymousAlias: 'Staff Member #14'
  },
  {
    id: 'ol-102',
    trackingCode: 'OL-8924-B',
    category: 'FEEDBACK',
    summary: 'Suggestion for asynchronous review SLAs during sprint crunches',
    body: 'Deliverables often sit in executive queues for >24 hours while client deadlines tick. Recommend maximum 12-hour review turnaround SLAs.',
    timestamp: '2026-06-02 11:15 WAT',
    status: 'RECEIVED',
    anonymousAlias: 'Contributor #09'
  }
];

export const INITIAL_WORKFLOWS: ActiveWorkflow[] = [
  {
    id: 'wf-1',
    name: 'Client Onboarding v2',
    workspace: 'Official',
    owner: 'Marcus Thorne',
    ownerRole: 'COO',
    currentStage: 'AUTOMATION',
    health: 'healthy'
  },
  {
    id: 'wf-2',
    name: 'Creative Handoff',
    workspace: 'Studio',
    owner: 'Sarah Chen',
    ownerRole: 'CPO',
    currentStage: 'REVIEW',
    health: 'healthy'
  },
  {
    id: 'wf-3',
    name: 'Internal Review Cycle',
    workspace: 'Build',
    owner: 'Marcus Thorne',
    ownerRole: 'COO',
    currentStage: 'STAKEHOLDER',
    health: 'warning'
  }
];

export const INITIAL_CANDIDATES: TalentCandidate[] = [
  {
    id: 'cand-1',
    name: "Liam O'Connell",
    title: 'Senior Automation Engineer · Candidate',
    status: 'TECH_ASSESSMENT',
    appliedDate: 'May 24, 2026',
    email: 'liam@example.com',
    progressPercent: 60,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    department: 'AI and Automation'
  },
  {
    id: 'cand-2',
    name: 'Isabella Vance',
    title: '3D Artist (Generalist) · Candidate',
    status: 'FINAL_INTERVIEW',
    appliedDate: 'May 28, 2026',
    email: 'isabella@example.com',
    progressPercent: 90,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: '3D and Motion'
  },
  {
    id: 'cand-3',
    name: 'Nathan Drake',
    title: 'Lead Content Creator · Onboarding',
    status: 'SIGNED',
    appliedDate: 'May 10, 2026',
    email: 'nathan@example.com',
    progressPercent: 100,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Content and Video',
    startDate: 'June 15, 2026'
  }
];

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-1',
    invoiceCode: 'INV-2026-042',
    client: 'Orbit FinTech',
    project: 'Orbit — Milestone 2',
    workspace: 'Official',
    amount: 45000,
    currency: 'USD',
    status: 'PENDING',
    dueDate: '2026-06-15'
  },
  {
    id: 'inv-2',
    invoiceCode: 'INV-2026-038',
    client: 'Marvel Telecom',
    project: 'Marvel — Dashboard v1',
    workspace: 'Official',
    amount: 18500,
    currency: 'USD',
    status: 'OVERDUE',
    dueDate: '2026-05-30',
    overdueDays: 4
  },
  {
    id: 'inv-3',
    invoiceCode: 'INV-2026-045',
    client: 'Aero Dynamics',
    project: 'Aero — Branding Kit',
    workspace: 'Official',
    amount: 12000,
    currency: 'USD',
    status: 'PENDING',
    dueDate: '2026-06-20'
  },
  {
    id: 'inv-4',
    invoiceCode: 'INV-4421',
    client: 'Meridian Global',
    project: 'Corporate Identity Systems',
    workspace: 'Official',
    amount: 28400,
    currency: 'USD',
    status: 'FLAGGED',
    dueDate: '2026-06-04'
  },
  {
    id: 'inv-5',
    invoiceCode: 'INV-4422',
    client: 'Apex Fintech Europe',
    project: 'European Market Expansion',
    workspace: 'Official',
    amount: 65000,
    currency: 'USD',
    status: 'PAID',
    dueDate: '2026-05-15',
    paidDate: '2026-05-14'
  },
  {
    id: 'inv-6',
    invoiceCode: 'INV-4423',
    client: 'Lagos Tech Hub',
    project: 'Digital Operations Portal',
    workspace: 'Official',
    amount: 35000,
    currency: 'USD',
    status: 'PAID',
    dueDate: '2026-05-20',
    paidDate: '2026-05-19'
  }
];

export const INITIAL_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: 'cmp-1',
    title: 'Orbit Launch Prep',
    client: 'Orbit',
    date: '2026-06-01',
    dayOfMonth: 1,
    type: 'prep',
    color: '#4100F5',
    reachEstimate: '45K impressions',
    budgetUSD: 3500
  },
  {
    id: 'cmp-2',
    title: 'Social Blast — Aero',
    client: 'Aero',
    date: '2026-06-02',
    dayOfMonth: 2,
    type: 'blast',
    color: '#885FFF',
    reachEstimate: '120K reach',
    budgetUSD: 5000
  },
  {
    id: 'cmp-3',
    title: 'Review Cycle #4',
    date: '2026-06-03',
    dayOfMonth: 3,
    type: 'review',
    color: '#4100F5'
  },
  {
    id: 'cmp-4',
    title: 'Press Release',
    date: '2026-06-03',
    dayOfMonth: 3,
    type: 'release',
    color: '#10B981',
    reachEstimate: '85K readers'
  },
  {
    id: 'cmp-5',
    title: 'Internal Sync',
    date: '2026-06-05',
    dayOfMonth: 5,
    type: 'internal',
    color: '#F59E0B'
  },
  {
    id: 'cmp-6',
    title: 'MAIN LAUNCH — ORBIT',
    client: 'Orbit',
    date: '2026-06-08',
    dayOfMonth: 8,
    type: 'release',
    color: '#4100F5',
    reachEstimate: '350K reach',
    budgetUSD: 12000
  },
  {
    id: 'cmp-7',
    title: 'Recap Video Edit',
    date: '2026-06-12',
    dayOfMonth: 12,
    type: 'video',
    color: '#885FFF'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'CPO Review Requested',
    message: 'Dashboard High-Fi Mockups v3 submitted by Maya Ray for Marvel SMS.',
    timestamp: '12 min ago',
    read: false,
    category: 'REVIEW'
  },
  {
    id: 'notif-2',
    title: 'Operational Blocker Overdue',
    message: 'Project Orbit Handoff is delayed by 14 hours. Requires COO manual override.',
    timestamp: '1 hour ago',
    read: false,
    category: 'ALERT'
  },
  {
    id: 'notif-3',
    title: 'Invoice Flagged',
    message: 'Meridian invoice #INV-4421 flagged for mismatched payment terms.',
    timestamp: 'Yesterday · 09:12',
    read: true,
    category: 'FINANCE'
  },
  {
    id: 'notif-4',
    title: 'Staff Onboarding Update',
    message: 'Nathan Drake signed agreement. Start date June 15, 2026.',
    timestamp: 'May 28',
    read: true,
    category: 'PEOPLE'
  }
];

export const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'aud-101',
    actorName: 'Pleasant Johnson',
    actorRole: 'CEO',
    action: 'board.grant.create',
    resource: 'board_seat_1',
    reason: 'Initial organizational seat establishment',
    timestamp: '2026-06-03 08:00:12 UTC',
    correlationId: 'req-8902-ceo-grant',
    details: 'Scope: Full Governance & Strategy Oversight. Expiry: 2028-12-31'
  },
  {
    id: 'aud-102',
    actorName: 'Maya Ray',
    actorRole: 'BRAND_DESIGNER',
    action: 'deliverable.submit.v3',
    resource: 'prj-marvel/deliverables/dashboard',
    timestamp: '2026-06-03 08:30:44 UTC',
    correlationId: 'req-9014-submit-v3',
    details: 'SHA-256: ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
  },
  {
    id: 'aud-103',
    actorName: 'Sarah Chen',
    actorRole: 'CPO',
    action: 'deliverable.review.requested_changes',
    resource: 'prj-orbit/deliverables/app-icons-v1',
    reason: 'Contrast adjustment needed for AMOLED display',
    timestamp: '2026-06-02 09:15:02 UTC',
    correlationId: 'req-8841-review-cpo',
    details: 'Rejected v1.0. Author Leo Marcus notified via durable outbox.'
  }
];

// ==========================================
// ACADEMY MANAGEMENT SYSTEM MOCK DATA
// ==========================================

export const INITIAL_PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    id: 'sch-1',
    name: 'Queens College Lagos',
    code: 'QC-YABA',
    contactPerson: 'Mrs. Funke Adeleke (Head of Science)',
    contactEmail: 'adeleke.f@queenscollege.edu.ng',
    contactPhone: '+234 802 345 6789',
    address: 'P.M.B. 2005, Yaba, Lagos Mainland',
    activeCohortsCount: 4,
    status: 'ACTIVE',
    mouExpiryDate: '2027-12-31',
    notes: 'Physical coding and robotics lab partnership. 120 students enrolled across secondary streams.'
  },
  {
    id: 'sch-2',
    name: 'Lagos Preparatory & Secondary School',
    code: 'LPS-IKOYI',
    contactPerson: 'Dr. David Campbell (ICT Director)',
    contactEmail: 'dcampbell@lagosprep.sch.ng',
    contactPhone: '+234 818 901 2345',
    address: '36/40 Glover Road, Ikoyi, Lagos Island',
    activeCohortsCount: 3,
    status: 'ACTIVE',
    mouExpiryDate: '2027-09-30',
    notes: 'Hybrid curriculum partnership. After-school Python AI and Web Development.'
  },
  {
    id: 'sch-3',
    name: 'Landmark Academy',
    code: 'LAL-LEKKI',
    contactPerson: 'Engr. Bayo Shonibare (Principal)',
    contactEmail: 'principal@landmarkacademy.edu.ng',
    contactPhone: '+234 803 112 4455',
    address: 'Plot 14 Admiralty Way, Lekki Phase 1',
    activeCohortsCount: 2,
    status: 'ACTIVE',
    mouExpiryDate: '2026-11-30',
    notes: 'STEM robotics and computational design club.'
  },
  {
    id: 'sch-4',
    name: 'Greensprings International School',
    code: 'GSI-ANTHONY',
    contactPerson: 'Mrs. Vivian Okon (VP Academic)',
    contactEmail: 'v.okon@greenspringsschool.com',
    contactPhone: '+234 805 778 9900',
    address: '32 Olatunde Ayoola Avenue, Anthony, Lagos',
    activeCohortsCount: 1,
    status: 'ONBOARDING',
    mouExpiryDate: '2028-01-15',
    notes: 'MOU under legal review. Expected launch Q3 2026.'
  }
];

export const INITIAL_ACADEMY_PROGRAMMES: AcademyProgramme[] = [
  {
    id: 'prg-1',
    title: 'Kids Creative Code & Robotics',
    code: 'KCC-101',
    category: 'PARTNER_SCHOOL',
    durationWeeks: 12,
    currentCurriculumVersion: 'v3.2',
    description: 'Foundational computing, block logic, micro:bit physical computing, and introductory Python.',
    coursesCount: 8,
    curriculumApprovedBy: 'Kingsley (CPO)',
    curriculumApprovalDate: '2026-05-10'
  },
  {
    id: 'prg-2',
    title: 'Fullstack Web Engineering Bootcamp',
    code: 'FWE-202',
    category: 'PHYSICAL_CODING',
    durationWeeks: 16,
    currentCurriculumVersion: 'v4.0',
    description: 'Intensive physical cohort covering TypeScript, React, Node.js APIs, SQL and Cloud deployment.',
    coursesCount: 12,
    curriculumApprovedBy: 'Kingsley (CPO)',
    curriculumApprovalDate: '2026-04-18'
  },
  {
    id: 'prg-3',
    title: 'Python for AI & Data Exploration',
    code: 'PY-301',
    category: 'HYBRID',
    durationWeeks: 10,
    currentCurriculumVersion: 'v2.1',
    description: 'Practical machine learning, data processing with Pandas, and LLM application development.',
    coursesCount: 6,
    curriculumApprovedBy: 'Kingsley (CPO)',
    curriculumApprovalDate: '2026-05-22'
  },
  {
    id: 'prg-4',
    title: 'UI/UX & Creative Digital Design',
    code: 'DES-105',
    category: 'ONLINE',
    durationWeeks: 8,
    currentCurriculumVersion: 'v2.0',
    description: 'Design systems, Figma mastery, responsive prototyping, and design-to-code handover.',
    coursesCount: 5,
    curriculumApprovedBy: 'Kingsley (CPO)',
    curriculumApprovalDate: '2026-03-30'
  }
];

export const INITIAL_ACADEMY_COHORTS: AcademyCohort[] = [
  {
    id: 'coh-lagos-a',
    code: 'LAGOS-FWE-26A',
    programmeId: 'prg-2',
    programmeName: 'Fullstack Web Engineering Bootcamp',
    venueOrLink: 'D\'Creativs Hub Lab 1 (Physical)',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    startDate: '2026-05-02',
    endDate: '2026-08-20',
    learnersCount: 24,
    scheduleDays: 'Tue, Thu & Sat · 10:00 - 14:00',
    status: 'ACTIVE'
  },
  {
    id: 'coh-qc-jnr',
    code: 'QC-ROBOT-26B',
    programmeId: 'prg-1',
    programmeName: 'Kids Creative Code & Robotics',
    schoolId: 'sch-1',
    schoolName: 'Queens College Lagos',
    venueOrLink: 'Queens College Computer Lab B',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    startDate: '2026-05-15',
    endDate: '2026-07-31',
    learnersCount: 32,
    scheduleDays: 'Wed & Fri · 14:30 - 16:30',
    status: 'ACTIVE'
  },
  {
    id: 'coh-st-saviour',
    code: 'LPS-PY-26C',
    programmeId: 'prg-3',
    programmeName: 'Python for AI & Data Exploration',
    schoolId: 'sch-2',
    schoolName: 'Lagos Preparatory & Secondary School',
    venueOrLink: 'LPS Senior ICT Suite',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    startDate: '2026-05-18',
    endDate: '2026-07-25',
    learnersCount: 18,
    scheduleDays: 'Mon & Thu · 15:00 - 17:00',
    status: 'ACTIVE'
  },
  {
    id: 'coh-virt-ai',
    code: 'VIRT-AI-26D',
    programmeId: 'prg-3',
    programmeName: 'Python for AI & Data Exploration',
    venueOrLink: 'https://meet.google.com/dcr-acad-ai26',
    tutorId: 'usr-coordinator',
    tutorName: 'Tunde Bakare',
    startDate: '2026-06-01',
    endDate: '2026-08-10',
    learnersCount: 28,
    scheduleDays: 'Tue & Thu · 18:00 - 20:00',
    status: 'ACTIVE'
  }
];

export const INITIAL_LEARNERS: EnrolledLearner[] = [
  {
    id: 'lrn-1',
    cohortId: 'coh-lagos-a',
    cohortCode: 'LAGOS-FWE-26A',
    fullName: 'Somtochukwu Obi',
    email: 'somto.obi@student.dcreativs.com',
    guardianName: 'Engr. Kenneth Obi',
    guardianContact: '+234 803 234 1122',
    attendanceRate: 96,
    progressPercent: 78,
    status: 'ENROLLED'
  },
  {
    id: 'lrn-2',
    cohortId: 'coh-lagos-a',
    cohortCode: 'LAGOS-FWE-26A',
    fullName: 'Damilola Adeleke',
    email: 'damilola.a@student.dcreativs.com',
    guardianName: 'Mrs. Bukola Adeleke',
    guardianContact: '+234 812 445 7788',
    attendanceRate: 92,
    progressPercent: 82,
    status: 'ENROLLED'
  },
  {
    id: 'lrn-3',
    cohortId: 'coh-qc-jnr',
    cohortCode: 'QC-ROBOT-26B',
    fullName: 'Kimberly Clark',
    email: 'k.clark@qc.sch.ng',
    guardianName: 'Dr. Michael Clark',
    guardianContact: '+234 809 990 1123',
    attendanceRate: 100,
    progressPercent: 90,
    status: 'ENROLLED'
  },
  {
    id: 'lrn-4',
    cohortId: 'coh-qc-jnr',
    cohortCode: 'QC-ROBOT-26B',
    fullName: 'Faruq Bello',
    email: 'f.bello@qc.sch.ng',
    guardianName: 'Alhaji Rasheed Bello',
    guardianContact: '+234 802 119 8834',
    attendanceRate: 70,
    progressPercent: 55,
    status: 'AT_RISK'
  },
  {
    id: 'lrn-5',
    cohortId: 'coh-st-saviour',
    cohortCode: 'LPS-PY-26C',
    fullName: 'Zainab Aliyu',
    email: 'z.aliyu@lagosprep.sch.ng',
    guardianName: 'Barrister Amina Aliyu',
    guardianContact: '+234 807 443 2211',
    attendanceRate: 98,
    progressPercent: 88,
    status: 'ENROLLED'
  },
  {
    id: 'lrn-6',
    cohortId: 'coh-st-saviour',
    cohortCode: 'LPS-PY-26C',
    fullName: 'Jason Peters',
    email: 'j.peters@lagosprep.sch.ng',
    guardianName: 'Mr. Richard Peters',
    guardianContact: '+234 818 200 4455',
    attendanceRate: 88,
    progressPercent: 74,
    status: 'ENROLLED'
  }
];

export const INITIAL_TIMETABLES: TimetableSession[] = [
  {
    id: 'ses-1',
    cohortId: 'coh-lagos-a',
    cohortCode: 'LAGOS-FWE-26A',
    title: 'Building RESTful APIs with Node.js & Express',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    venue: 'D\'Creativs Hub Lab 1',
    onlineMeetingLink: 'https://meet.google.com/hub-lab1-stream',
    date: '2026-06-09',
    startTime: '10:00',
    endTime: '13:00',
    status: 'SCHEDULED'
  },
  {
    id: 'ses-2',
    cohortId: 'coh-qc-jnr',
    cohortCode: 'QC-ROBOT-26B',
    title: 'Micro:bit Autonomous Obstacle Detection Rover',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    venue: 'Queens College Lab B',
    date: '2026-06-10',
    startTime: '14:30',
    endTime: '16:30',
    status: 'SCHEDULED'
  },
  {
    id: 'ses-3',
    cohortId: 'coh-st-saviour',
    cohortCode: 'LPS-PY-26C',
    title: 'Data Visualization with Matplotlib & Pandas',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    venue: 'LPS Senior ICT Suite',
    onlineMeetingLink: 'https://zoom.us/j/94827103948',
    date: '2026-06-11',
    startTime: '15:00',
    endTime: '17:00',
    status: 'SCHEDULED'
  },
  {
    id: 'ses-4',
    cohortId: 'coh-virt-ai',
    cohortCode: 'VIRT-AI-26D',
    title: 'Prompt Engineering & Open-Source LLMs',
    tutorId: 'usr-coordinator',
    tutorName: 'Tunde Bakare',
    venue: 'Online Google Meet',
    onlineMeetingLink: 'https://meet.google.com/dcr-acad-ai26',
    date: '2026-06-11',
    startTime: '18:00',
    endTime: '20:00',
    status: 'SCHEDULED'
  }
];

export const INITIAL_LESSON_PLANS: LessonPlan[] = [
  {
    id: 'lp-1',
    programmeId: 'prg-1',
    programmeName: 'Kids Creative Code & Robotics',
    weekNumber: 5,
    topic: 'Ultrasonic Sensors & Pulse-Width Modulation',
    learningObjectives: [
      'Understand how sound waves determine obstacle distance in centimeters.',
      'Write conditional branch logic in Python for distance < 15cm.',
      'Calibrate servo motors to reverse direction automatically upon obstacle detection.'
    ],
    resources: [
      { name: 'Ultrasonic-Pinout-Diagram.pdf', url: '#', type: 'PDF' },
      { name: 'Obstacle-Avoidance-Starter-Code.py', url: '#', type: 'Python' }
    ],
    reviewStatus: 'APPROVED',
    approvedBy: 'Kingsley (CPO)',
    approvedDate: '2026-05-20'
  },
  {
    id: 'lp-2',
    programmeId: 'prg-2',
    programmeName: 'Fullstack Web Engineering Bootcamp',
    weekNumber: 6,
    topic: 'Relational Database Schema Design & PostgreSQL Indexes',
    learningObjectives: [
      'Design normalized Third Normal Form database entities.',
      'Implement foreign key constraints with cascade behaviors.',
      'Analyze query execution plans using EXPLAIN ANALYZE and B-Tree indexes.'
    ],
    resources: [
      { name: 'Postgres-Schema-Best-Practices.pdf', url: '#', type: 'PDF' },
      { name: 'Ecommerce-Database-Seed.sql', url: '#', type: 'SQL' }
    ],
    reviewStatus: 'APPROVED',
    approvedBy: 'Kingsley (CPO)',
    approvedDate: '2026-05-18'
  },
  {
    id: 'lp-3',
    programmeId: 'prg-3',
    programmeName: 'Python for AI & Data Exploration',
    weekNumber: 4,
    topic: 'Exploratory Data Analysis with Seaborn & Data Cleaning',
    learningObjectives: [
      'Handle missing and corrupted values in real-world CSV datasets.',
      'Generate distribution heatmaps and correlation matrices.',
      'Format data pipelines for downstream machine learning inputs.'
    ],
    resources: [
      { name: 'Nigerian-Retail-Dataset-Sample.csv', url: '#', type: 'CSV' },
      { name: 'Seaborn-Cheatsheet.pdf', url: '#', type: 'PDF' }
    ],
    reviewStatus: 'PENDING_APPROVAL'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    sessionId: 'ses-1',
    cohortId: 'coh-lagos-a',
    cohortCode: 'LAGOS-FWE-26A',
    date: '2026-06-02',
    totalPresent: 23,
    totalAbsent: 1,
    records: [
      { learnerId: 'lrn-1', learnerName: 'Somtochukwu Obi', status: 'PRESENT' },
      { learnerId: 'lrn-2', learnerName: 'Damilola Adeleke', status: 'PRESENT' }
    ]
  },
  {
    id: 'att-2',
    sessionId: 'ses-2',
    cohortId: 'coh-qc-jnr',
    cohortCode: 'QC-ROBOT-26B',
    date: '2026-06-03',
    totalPresent: 30,
    totalAbsent: 2,
    records: [
      { learnerId: 'lrn-3', learnerName: 'Kimberly Clark', status: 'PRESENT' },
      { learnerId: 'lrn-4', learnerName: 'Faruq Bello', status: 'ABSENT' }
    ]
  }
];

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    cohortId: 'coh-lagos-a',
    learnerId: 'lrn-1',
    learnerName: 'Somtochukwu Obi',
    assignmentTitle: 'Fullstack Authentication with JWT & Refresh Tokens',
    submissionDate: '2026-06-04',
    score: 95,
    maxScore: 100,
    grade: 'A',
    feedback: 'Excellent security considerations. HTTP-only cookies utilized correctly.',
    status: 'GRADED'
  },
  {
    id: 'sub-2',
    cohortId: 'coh-qc-jnr',
    learnerId: 'lrn-3',
    learnerName: 'Kimberly Clark',
    assignmentTitle: 'Micro:bit Autonomous Maze Navigator Project',
    submissionDate: '2026-06-05',
    score: 98,
    maxScore: 100,
    grade: 'A+',
    feedback: 'Flawless code structure and very creative handling of dead ends.',
    status: 'GRADED'
  },
  {
    id: 'sub-3',
    cohortId: 'coh-st-saviour',
    learnerId: 'lrn-5',
    learnerName: 'Zainab Aliyu',
    assignmentTitle: 'Global Weather Trend Analysis Script',
    submissionDate: '2026-06-06',
    maxScore: 100,
    status: 'SUBMITTED'
  }
];

export const INITIAL_TUTOR_REPORTS: TutorSessionReport[] = [
  {
    id: 'tsr-1',
    sessionId: 'ses-1',
    cohortId: 'coh-lagos-a',
    cohortCode: 'LAGOS-FWE-26A',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    sessionDate: '2026-06-02',
    learnersAttended: 23,
    totalEnrolled: 24,
    topicsCovered: 'Express middleware chains, CORS configuration, and bcrypt password hashing.',
    challengesEncountered: 'Two students had Node v16 compatibility issues; upgraded to v20 LTS successfully.',
    equipmentIssues: 'None. Lab fiber network speed was 85 Mbps.',
    submittedAt: '2026-06-02 14:15'
  },
  {
    id: 'tsr-2',
    sessionId: 'ses-2',
    cohortId: 'coh-qc-jnr',
    cohortCode: 'QC-ROBOT-26B',
    tutorId: 'usr-tutor',
    tutorName: 'Amara Okafor',
    sessionDate: '2026-06-03',
    learnersAttended: 30,
    totalEnrolled: 32,
    topicsCovered: 'Micro:bit radio broadcast between robot units and leader-follower sync.',
    challengesEncountered: 'Faruq Bello missed the session due to inter-house sports practice.',
    equipmentIssues: 'Two rechargeable 9V battery packs failed to hold charge. Requested 4 fresh packs.',
    submittedAt: '2026-06-03 17:05'
  }
];

export const INITIAL_ACADEMY_ISSUES: AcademyIssueReport[] = [
  {
    id: 'iss-1',
    type: 'EQUIPMENT_REQUEST',
    cohortCode: 'QC-ROBOT-26B',
    raisedBy: 'Amara Okafor',
    description: 'Urgent requisition: 4 rechargeable 9V battery packs and 2 micro:bit USB interface cables for Queens College Lab B.',
    urgency: 'HIGH',
    status: 'OPEN',
    createdAt: '2026-06-03 17:10'
  },
  {
    id: 'iss-2',
    type: 'VENUE_ACCESS',
    cohortCode: 'LAGOS-FWE-26A',
    raisedBy: 'Tunde Bakare',
    description: 'Building management scheduled power generator service on Saturday 10:00 AM. Coordinated inverter backup for Hub Lab 1.',
    urgency: 'MEDIUM',
    status: 'RESOLVED',
    createdAt: '2026-06-01 09:30'
  }
];

export const INITIAL_COMPLETION_REPORTS: AcademyCompletionReport[] = [
  {
    id: 'comp-1',
    cohortId: 'coh-prev-25',
    cohortCode: 'LAGOS-FWE-25D',
    programmeName: 'Fullstack Web Engineering Bootcamp',
    completionRate: 91.6,
    graduatedCount: 22,
    topPerformer: 'Emeka Nwosu (98.4% Aggregate)',
    generatedDate: '2026-04-15',
    certificateBatchStatus: 'ISSUED'
  }
];

// ==========================================
// DOCUMENTS & EXTRACTION PIPELINE MOCK DATA
// ==========================================

export const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc-1',
    title: 'D\'Creativs Q2 Consolidated Operational Summary',
    fileName: 'DCreativs_Q2_Operations_Summary.pdf',
    fileSize: '3.4 MB',
    format: 'PDF',
    category: 'OPERATIONS',
    uploaderId: 'usr-coo',
    uploaderName: 'Morgan Thorne',
    uploaderRole: 'COO',
    uploadDate: '2026-06-01',
    version: 'v2.1',
    status: 'APPROVED',
    downloadToken: 'tok_ops_9921_exp',
    tokenExpiresAt: '2026-06-15',
    intendedPurpose: 'Executive operational review and resource planning',
    proposedDestination: 'Operations Ledger / Executive Repository',
    permittedRoles: ['COO', 'CEO', 'OPERATIONS_COORDINATOR'],
    approvedBy: 'Morgan Thorne (COO)',
    approvedAt: '2026-06-02'
  },
  {
    id: 'doc-2',
    title: 'Academy Q2 Physical Cohort Master Attendance & Performance Roster',
    fileName: 'Academy_Q2_Attendance_Scores.xlsx',
    fileSize: '1.8 MB',
    format: 'XLSX',
    category: 'ACADEMY',
    uploaderId: 'usr-coordinator',
    uploaderName: 'Tunde Bakare',
    uploaderRole: 'ACADEMY_COORDINATOR',
    uploadDate: '2026-06-04',
    version: 'v1.0',
    status: 'PENDING_REVIEW',
    downloadToken: 'tok_acad_4421_exp',
    tokenExpiresAt: '2026-06-18',
    intendedPurpose: 'Sync student attendance benchmarks and project grades into central records',
    proposedDestination: 'D\'Creativs Academy Student Registry',
    permittedRoles: ['ACADEMY_COORDINATOR', 'ACADEMY_TUTOR', 'COO', 'CEO'],
    rowCount: 74,
    notes: 'Parsed 74 records across 4 cohorts. Column mapping validated.'
  },
  {
    id: 'doc-3',
    title: 'May 2026 Operational Disbursals & Receipts Reconciliation',
    fileName: 'May2026_Disbursals_Reconciliation.csv',
    fileSize: '420 KB',
    format: 'CSV',
    category: 'FINANCE',
    uploaderId: 'usr-cfo',
    uploaderName: 'Xant (Interim CFO)',
    uploaderRole: 'CFO',
    uploadDate: '2026-06-03',
    version: 'v1.0',
    status: 'APPROVED',
    downloadToken: 'tok_fin_8820_exp',
    tokenExpiresAt: '2026-06-17',
    intendedPurpose: 'Monthly financial ledger closing and vendor reconciliation',
    proposedDestination: 'Finance Treasury Database',
    permittedRoles: ['CFO', 'CEO'],
    rowCount: 52,
    approvedBy: 'Xant (Interim CFO)',
    approvedAt: '2026-06-04'
  },
  {
    id: 'doc-4',
    title: 'Lead Tutor Service Agreement & Compliance Packet',
    fileName: 'Amara_Okafor_LeadTutor_ServiceAgreement.pdf',
    fileSize: '2.1 MB',
    format: 'PDF',
    category: 'PEOPLE',
    uploaderId: 'usr-chro',
    uploaderName: 'Estella (Elena Rossi)',
    uploaderRole: 'CHRO',
    uploadDate: '2026-05-12',
    version: 'v1.0',
    status: 'APPROVED',
    downloadToken: 'tok_hr_1102_exp',
    tokenExpiresAt: '2026-06-30',
    intendedPurpose: 'Personnel record archiving and compliance verification',
    proposedDestination: 'Personnel Encrypted Safe',
    permittedRoles: ['CHRO', 'CEO'],
    approvedBy: 'Estella (CHRO)',
    approvedAt: '2026-05-14'
  },
  {
    id: 'doc-5',
    title: 'Summer Creative Code & Robotics Camp Marketing Strategy',
    fileName: 'Summer2026_Camp_Strategy_Deck.docx',
    fileSize: '4.8 MB',
    format: 'DOCX',
    category: 'MARKETING',
    uploaderId: 'usr-cmo',
    uploaderName: 'Nina Williams',
    uploaderRole: 'CMO',
    uploadDate: '2026-05-28',
    version: 'v1.2',
    status: 'APPROVED',
    downloadToken: 'tok_mkt_3301_exp',
    tokenExpiresAt: '2026-06-25',
    intendedPurpose: 'Quarterly ad blitz and partner school student acquisition',
    proposedDestination: 'Marketing Campaign Repository',
    permittedRoles: ['CMO', 'CEO', 'CONTENT_CREATOR', 'SOCIAL_MANAGER'],
    approvedBy: 'Nina Williams (CMO)',
    approvedAt: '2026-05-30'
  },
  {
    id: 'doc-6',
    title: 'Marvel SMS Mobile Application Design System Specifications',
    fileName: 'MarvelSMS_DesignSystem_Spec_v3.pdf',
    fileSize: '8.2 MB',
    format: 'PDF',
    category: 'PRODUCT_DELIVERABLE',
    uploaderId: 'usr-cpo',
    uploaderName: 'Kingsley (Sarah Chen)',
    uploaderRole: 'CPO',
    uploadDate: '2026-06-03',
    version: 'v3.0',
    status: 'APPROVED',
    downloadToken: 'tok_cpo_5592_exp',
    tokenExpiresAt: '2026-06-20',
    intendedPurpose: 'Client design handover and release sign-off verification',
    proposedDestination: 'Product Release Archive',
    permittedRoles: ['CPO', 'CEO', 'BRAND_DESIGNER', 'DEVELOPER'],
    approvedBy: 'Kingsley (CPO)',
    approvedAt: '2026-06-03'
  },
  {
    id: 'doc-7',
    title: "Queen's College Q2 Robotics Tuition Bank Transfer Receipt",
    fileName: 'QueensCollege_TuitionReceipt_QC2026.pdf',
    fileSize: '740 KB',
    format: 'PDF',
    category: 'FINANCE',
    uploaderId: 'usr-cfo',
    uploaderName: 'Xant (Interim CFO)',
    uploaderRole: 'CFO',
    uploadDate: '2026-06-04',
    version: 'v1.0',
    status: 'PENDING_REVIEW',
    downloadToken: 'tok_fin_9912_exp',
    tokenExpiresAt: '2026-06-18',
    intendedPurpose: "Tuition fee payment reconciliation for Queen's College Q2 Robotics Cohort",
    proposedDestination: 'Finance Treasury Database / Invoices Ledger',
    permittedRoles: ['CFO', 'CEO', 'ACADEMY_COORDINATOR'],
    rowCount: 1,
    notes: 'Parsed Zenith Bank Transfer Slip. Verification pending reviewer approval.'
  }
];

export const INITIAL_EXTRACTION_JOBS: ExtractionJob[] = [
  {
    id: 'job-1',
    documentId: 'doc-2',
    documentTitle: 'Academy Q2 Physical Cohort Master Attendance & Performance Roster',
    fileName: 'Academy_Q2_Attendance_Scores.xlsx',
    format: 'XLSX',
    category: 'ACADEMY',
    status: 'READY_FOR_REVIEW',
    parsedFields: [
      { field: 'cohortCode', sourceRef: 'Sheet1!B2', originalValue: 'LAGOS-FWE-26A', correctedValue: 'LAGOS-FWE-26A', isValid: true },
      { field: 'reportingPeriod', sourceRef: 'Sheet1!B3', originalValue: 'May-June 2026', correctedValue: '2026-05 / 2026-06', isValid: true },
      { field: 'totalStudents', sourceRef: 'Sheet1!E2', originalValue: 3, correctedValue: 3, isValid: true },
      { field: 'averageAttendance', sourceRef: 'Sheet1!E3', originalValue: '95.0%', correctedValue: 95.0, isValid: true }
    ],
    parsedRows: [
      {
        rowNumber: 1,
        data: {
          fullName: 'Kelechi Madu',
          email: 'kelechi.m@gmail.com',
          cohortCode: 'LAGOS-FWE-26A',
          guardianName: 'Engr. Emeka Madu',
          guardianContact: '+234 803 221 4401',
          progressPercent: 78,
          attendanceRate: 95
        }
      },
      {
        rowNumber: 2,
        data: {
          fullName: 'Zainab Al-Hassan',
          email: 'zainab.alhassan@outlook.com',
          cohortCode: 'LAGOS-FWE-26A',
          guardianName: 'Hajia Fatima Al-Hassan',
          guardianContact: '+234 802 883 1199',
          progressPercent: 88,
          attendanceRate: 98
        }
      },
      {
        rowNumber: 3,
        data: {
          fullName: 'Tariq Adeleke',
          email: 'tariq.adeleke@yahoo.com',
          cohortCode: 'LAGOS-FWE-26A',
          guardianName: 'Dr. Kunle Adeleke',
          guardianContact: '+234 805 772 3344',
          progressPercent: 82,
          attendanceRate: 92
        }
      }
    ],
    columnMappings: [
      { sourceColumn: 'Student_ID', destinationField: 'learnerId', status: 'MAPPED' },
      { sourceColumn: 'Student_Name', destinationField: 'fullName', status: 'MAPPED' },
      { sourceColumn: 'Attendance_Rate', destinationField: 'attendanceRate', status: 'MAPPED' },
      { sourceColumn: 'Project_Score', destinationField: 'progressPercent', status: 'MAPPED' },
      { sourceColumn: 'Guardian_Phone', destinationField: 'guardianContact', status: 'MAPPED' }
    ],
    proposedChangesSummary: 'Import 3 new learner admission records and update attendance benchmarks for Cohort LAGOS-FWE-26A.',
    duplicateAlerts: ['Record for Somtochukwu Obi matches existing learner ID #lrn-1. Action: Skipped duplicate.'],
    createdAt: '2026-06-04 11:20'
  },
  {
    id: 'job-2',
    documentId: 'doc-7',
    documentTitle: "Queen's College Q2 Robotics Tuition Bank Transfer Receipt",
    fileName: 'QueensCollege_TuitionReceipt_QC2026.pdf',
    format: 'PDF',
    category: 'FINANCE',
    status: 'READY_FOR_REVIEW',
    parsedFields: [
      { field: 'receiptNumber', sourceRef: 'Header!ReceiptID', originalValue: 'RCP-QC-2026-881', correctedValue: 'RCP-QC-2026-881', isValid: true },
      { field: 'payerName', sourceRef: 'Body!Payer', originalValue: "Queen's College Yaba (PTA Board)", correctedValue: "Queen's College Yaba", isValid: true },
      { field: 'amount', sourceRef: 'Body!TotalAmount', originalValue: 8500, correctedValue: 8500, isValid: true },
      { field: 'currency', sourceRef: 'Body!Currency', originalValue: 'USD', correctedValue: 'USD', isValid: true },
      { field: 'paymentDate', sourceRef: 'Footer!Date', originalValue: '2026-06-03', correctedValue: '2026-06-03', isValid: true },
      { field: 'description', sourceRef: 'Body!Narration', originalValue: 'Tuition Payment for 32 Students - Cohort QC-ROBOTICS-26', correctedValue: 'Tuition Payment for 32 Students - Cohort QC-ROBOTICS-26', isValid: true }
    ],
    proposedChangesSummary: "Reconcile payment receipt of $8,500.00 from Queen's College Yaba into Finance Ledger as Settled / Paid Invoice.",
    createdAt: '2026-06-04 14:15'
  }
];

export const INITIAL_REPORTS: GeneratedReport[] = [
  {
    id: 'rep-1',
    title: 'Weekly Operations & Resource Execution Report',
    type: 'OPERATIONS_SUMMARY',
    reportingPeriod: '2026-W22 (May 29 - Jun 05)',
    generatedAt: '2026-06-05 09:00',
    generatedBy: 'Morgan Thorne',
    generatorRole: 'COO',
    dataSources: ['Operations Desk Logs', 'Resource Utilization Matrix', 'Deliverable Queue'],
    dataSummary: {
      onTimeDeliveryRate: '94.8%',
      activeBlockers: 1,
      totalHoursLogged: 420,
      resourceUtilization: '88.5%'
    },
    status: 'PUBLISHED'
  },
  {
    id: 'rep-2',
    title: 'D\'Creativs Academy Delivery & Attendance Performance Summary',
    type: 'ACADEMY_DELIVERY',
    reportingPeriod: 'May 2026',
    generatedAt: '2026-06-04 16:30',
    generatedBy: 'Tunde Bakare',
    generatorRole: 'ACADEMY_COORDINATOR',
    dataSources: ['Cohort Records', 'Tutor Session Reports', 'QC & LPS School Attendance'],
    dataSummary: {
      enrolledLearnersCount: 102,
      activePartnerSchools: 4,
      aggregateAttendance: '93.5%',
      curriculumsApproved: 4,
      openEquipmentRequests: 1
    },
    status: 'PUBLISHED'
  },
  {
    id: 'rep-3',
    title: 'Executive Treasury & Monthly Revenue Reconciled Report',
    type: 'FINANCIAL_SUMMARY',
    reportingPeriod: 'May 2026',
    generatedAt: '2026-06-02 18:00',
    generatedBy: 'Xant (Interim CFO)',
    generatorRole: 'CFO',
    dataSources: ['Stripe Gateway', 'Zenith Bank Treasury', 'Client Invoices #INV-4401 to #INV-4428'],
    dataSummary: {
      grossInvoicedUSD: 98500,
      collectedUSD: 76000,
      outstandingUSD: 22500,
      burnRateUSD: 24200
    },
    status: 'PUBLISHED'
  }
];

