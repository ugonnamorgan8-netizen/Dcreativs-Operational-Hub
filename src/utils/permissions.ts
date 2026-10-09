import { UserProfile, WorkspaceLabel, ActionPermission, UserRole, DocumentCategory } from '../types';

export type AppView =
  | 'ceo-overview'
  | 'operations-desk'
  | 'review-queue'
  | 'finance-summary'
  | 'talent-onboarding'
  | 'campaign-calendar'
  | 'academy-operations'
  | 'tutor-workspace'
  | 'my-work'
  | 'documents-desk'
  | 'messaging'
  | 'board-room'
  | 'security-matrix'
  | 'openline-reports'
  | 'access-awaiting-assignment'
  | 'access-denied';

/**
 * Maps each role strictly to its designated default workspace homepage.
 */
export function getDefaultViewForRole(role: UserRole): AppView {
  switch (role) {
    case 'CEO':
      return 'ceo-overview';
    case 'COO':
      return 'operations-desk';
    case 'CPO':
      return 'review-queue';
    case 'CFO':
      return 'finance-summary';
    case 'CHRO':
      return 'talent-onboarding';
    case 'CMO':
      return 'campaign-calendar';
    case 'ACADEMY_COORDINATOR':
      return 'academy-operations';
    case 'ACADEMY_TUTOR':
      return 'tutor-workspace';
    case 'BOARD_MEMBER':
      return 'board-room';
    case 'UNASSIGNED':
      return 'access-awaiting-assignment';
    case 'DEVELOPER':
    case 'AI_ENGINEER':
    case 'BRAND_DESIGNER':
    case '3D_ARTIST':
    case 'CONTENT_CREATOR':
    case 'SOCIAL_MANAGER':
    case 'CONTRACTOR':
    case 'OPERATIONS_COORDINATOR':
    default:
      return 'my-work';
  }
}

/**
 * Returns the human-readable designated workspace name for a role.
 */
export function getDefaultWorkspaceName(role: UserRole): string {
  switch (role) {
    case 'CEO':
      return 'CEO Executive Suite';
    case 'COO':
      return 'COO Operations Desk';
    case 'CPO':
      return 'CPO Product Suite';
    case 'CFO':
      return 'Finance Workspace';
    case 'CHRO':
      return 'People & Talent Workspace';
    case 'CMO':
      return 'Marketing Workspace';
    case 'ACADEMY_COORDINATOR':
      return 'Academy Operations Desk';
    case 'ACADEMY_TUTOR':
      return 'Academy Tutor Workspace';
    case 'BOARD_MEMBER':
      return 'Board Room Workspace';
    case 'UNASSIGNED':
      return 'Access Awaiting Assignment';
    default:
      return 'Staff Workspace';
  }
}

/**
 * Checks whether a user profile is authorized to access a given workspace.
 */
export function canAccessWorkspace(profile: UserProfile, workspace: WorkspaceLabel): boolean {
  if (!profile || !profile.permittedWorkspaces) return false;
  return profile.permittedWorkspaces.includes(workspace);
}

/**
 * Strict role-to-page permission map.
 * Enforces strictly separated role-based workspaces.
 * Prohibits cross-dashboard access (e.g., CEO cannot enter COO/CPO/Finance/Staff dashboards).
 */
export function canAccessView(profile: UserProfile, view: AppView): boolean {
  if (!profile) return false;
  const role = profile.role;

  // Unassigned accounts are quarantined strictly to access awaiting assignment
  if (role === 'UNASSIGNED') {
    return view === 'access-awaiting-assignment' || view === 'access-denied';
  }

  // Universal fallback and shared workspaces (permission-filtered inside the view)
  if (view === 'access-denied') return true;
  if (view === 'access-awaiting-assignment') return false;

  // Role-specific homepages and views (Strict Isolation)
  switch (view) {
    case 'ceo-overview':
      // CEO Overview is strictly for CEO. Other executives and staff are blocked.
      return role === 'CEO';

    case 'operations-desk':
      // Operations Desk is strictly for COO.
      return role === 'COO';

    case 'review-queue':
      // Review queue is strictly accessible to CPO.
      return role === 'CPO';

    case 'finance-summary':
      // Finance summary is strictly for CFO.
      return role === 'CFO';

    case 'talent-onboarding':
      // Talent onboarding is strictly for CHRO.
      return role === 'CHRO';

    case 'campaign-calendar':
      // Campaign calendar is strictly for CMO.
      return role === 'CMO';

    case 'academy-operations':
      // Academy operational coordination is for Academy Coordinator and COO.
      return role === 'ACADEMY_COORDINATOR' || role === 'COO';

    case 'tutor-workspace':
      // Tutor Workspace is strictly for assigned Tutors.
      return role === 'ACADEMY_TUTOR';

    case 'my-work':
      // Staff Desk is strictly for individual staff contributors and contractors.
      return [
        'DEVELOPER',
        'AI_ENGINEER',
        'BRAND_DESIGNER',
        '3D_ARTIST',
        'CONTENT_CREATOR',
        'SOCIAL_MANAGER',
        'CONTRACTOR',
        'OPERATIONS_COORDINATOR'
      ].includes(role);

    case 'documents-desk':
      // Shared document management service - available to all assigned roles,
      // filtered strictly by role within the desk.
      return true;

    case 'messaging':
      // Team inbox within authorized channels
      return role !== 'BOARD_MEMBER';

    case 'board-room':
      // Board Room requires CEO role OR an approved ACTIVE board member grant
      if (role === 'CEO') return true;
      return role === 'BOARD_MEMBER' && profile.boardAccessStatus === 'ACTIVE';

    case 'security-matrix':
      // RBAC Matrix accessible only to CEO
      return role === 'CEO';

    case 'openline-reports':
      // Sealed whistleblower channel. CEO, COO, and Board members are strictly excluded to preserve reporter anonymity.
      if (role === 'CEO' || role === 'COO' || role === 'BOARD_MEMBER') {
        return false;
      }
      return true;

    default:
      return false;
  }
}

/**
 * Checks whether a role can view a specific category of documents.
 */
export function canAccessDocumentCategory(role: UserRole, category: DocumentCategory): boolean {
  switch (category) {
    case 'OPERATIONS':
      return ['COO', 'CEO', 'ACADEMY_COORDINATOR', 'OPERATIONS_COORDINATOR'].includes(role);
    case 'FINANCE':
      return ['CFO', 'CEO'].includes(role);
    case 'PEOPLE':
      return ['CHRO', 'CEO'].includes(role);
    case 'ACADEMY':
      return ['ACADEMY_COORDINATOR', 'ACADEMY_TUTOR', 'COO', 'CEO', 'CPO'].includes(role);
    case 'MARKETING':
      return ['CMO', 'CEO', 'CONTENT_CREATOR', 'SOCIAL_MANAGER'].includes(role);
    case 'PRODUCT_DELIVERABLE':
      return ['CPO', 'CEO', 'DEVELOPER', 'BRAND_DESIGNER', '3D_ARTIST', 'AI_ENGINEER'].includes(role);
    default:
      return false;
  }
}

/**
 * Granular action permission check.
 */
export function hasPermission(
  profile: UserProfile,
  permission: ActionPermission,
  context?: {
    workspace?: WorkspaceLabel;
    targetRole?: string;
  }
): boolean {
  if (!profile) return false;
  const role = profile.role;

  if (role === 'UNASSIGNED') return false;

  switch (permission) {
    case 'view':
      if (context?.workspace) {
        return canAccessWorkspace(profile, context.workspace);
      }
      return true;

    case 'create':
    case 'edit':
      if (role === 'BOARD_MEMBER') return false;
      if (context?.workspace) {
        return canAccessWorkspace(profile, context.workspace);
      }
      return true;

    case 'assign':
      return ['CEO', 'COO', 'CPO', 'CFO', 'CHRO', 'CMO', 'ACADEMY_COORDINATOR'].includes(role);

    case 'review':
      return ['CPO', 'CEO', 'COO', 'DEVELOPER', 'ACADEMY_COORDINATOR'].includes(role);

    case 'approve_release':
      return role === 'CPO';

    case 'executive_override':
      return role === 'CEO';

    case 'export':
      return ['CEO', 'COO', 'CFO', 'CHRO', 'ACADEMY_COORDINATOR'].includes(role);

    case 'manage_access':
    case 'manage_board':
      return role === 'CEO';

    case 'read_openline_reports':
      return Boolean(profile.isOmbudsman);

    default:
      return false;
  }
}
