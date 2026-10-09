import { INITIAL_PROFILES, INITIAL_INVOICES, INITIAL_TASKS } from '../src/data/mockData.ts';
import { canAccessWorkspace, canAccessView, hasPermission } from '../src/utils/permissions.ts';

console.log('====================================================');
console.log("  D'CREATIVS OPERATIONS HUB — VERIFICATION SUITE   ");
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// 1. Roles and Default Homepages
const ceo = INITIAL_PROFILES.find((p) => p.role === 'CEO');
const coo = INITIAL_PROFILES.find((p) => p.role === 'COO');
const cpo = INITIAL_PROFILES.find((p) => p.role === 'CPO');
const cfo = INITIAL_PROFILES.find((p) => p.role === 'CFO');
const chro = INITIAL_PROFILES.find((p) => p.role === 'CHRO');
const cmo = INITIAL_PROFILES.find((p) => p.role === 'CMO');
const dev = INITIAL_PROFILES.find((p) => p.role === 'DEVELOPER');
const designer = INITIAL_PROFILES.find((p) => p.role === 'BRAND_DESIGNER');
const boardMember = INITIAL_PROFILES.find((p) => p.role === 'BOARD_MEMBER');

assert(ceo && ceo.permittedWorkspaces.length === 6, 'CEO has access to all 6 operational workspaces');
assert(coo && coo.permittedWorkspaces.length === 6, 'COO has access to all 6 operational workspaces');
assert(cpo && cpo.permittedWorkspaces.includes('Studio') && !cpo.permittedWorkspaces.includes('Official'), 'CPO has department-scoped workspace access');
assert(cfo && cfo.permittedWorkspaces.includes('Official') && !cfo.permittedWorkspaces.includes('Feed'), 'CFO has Official & Build workspace access');
assert(dev && dev.permittedWorkspaces.includes('Build') && !dev.permittedWorkspaces.includes('Feed'), 'Developer restricted from non-engineering workspaces');

// 2. View Access & Strict Dashboard Boundaries
assert(canAccessView(ceo, 'ceo-overview'), 'CEO can access ceo-overview');
assert(!canAccessView(dev, 'ceo-overview'), 'Developer CANNOT access ceo-overview');
assert(!canAccessView(designer, 'ceo-overview'), 'Designer CANNOT access ceo-overview');
assert(!canAccessView(dev, 'finance-summary'), 'Developer CANNOT access finance-summary');
assert(canAccessView(cfo, 'finance-summary'), 'CFO can access finance-summary');
assert(canAccessView(cpo, 'review-queue'), 'CPO can access review-queue');
assert(!canAccessView(cmo, 'review-queue'), 'CMO CANNOT access review-queue');
assert(canAccessView(dev, 'my-work'), 'Developer can access my-work');
assert(canAccessView(designer, 'my-work'), 'Designer can access my-work');

// 3. COO exclusion of CEO governance
assert(hasPermission(ceo, 'manage_board'), 'CEO has manage_board permission');
assert(!hasPermission(coo, 'manage_board'), 'COO DOES NOT have manage_board permission');
assert(hasPermission(ceo, 'manage_access'), 'CEO has manage_access permission');
assert(!hasPermission(coo, 'manage_access'), 'COO DOES NOT have manage_access permission');

// 4. Deliverable Approval vs Executive Override
assert(hasPermission(cpo, 'approve_release'), 'CPO has standard quality approve_release authority');
assert(!hasPermission(ceo, 'approve_release'), 'CEO does not bypass standard CPO quality role');
assert(hasPermission(ceo, 'executive_override'), 'CEO has explicit executive_override authority');
assert(!hasPermission(coo, 'executive_override'), 'COO cannot perform executive override');
assert(!hasPermission(dev, 'executive_override'), 'Staff developer cannot perform executive override');

// 5. OpenLine Whistleblower Zero-Knowledge Protection
assert(!canAccessView(ceo, 'openline-reports'), 'CEO is STRICTLY EXCLUDED from reading OpenLine whistleblower reports');
assert(!canAccessView(coo, 'openline-reports'), 'COO is STRICTLY EXCLUDED from reading OpenLine reports');
assert(canAccessView(chro, 'openline-reports'), 'Independent Ombudsman (Elena Rossi, CHRO) CAN read OpenLine reports');
assert(hasPermission(chro, 'read_openline_reports'), 'Ombudsman has read_openline_reports permission');
assert(!hasPermission(ceo, 'read_openline_reports'), 'CEO DOES NOT have read_openline_reports permission');

// 6. Board Member Isolation
assert(canAccessView(boardMember, 'board-room'), 'Active Board Member can access board-room');
assert(!canAccessView(boardMember, 'finance-summary'), 'Board Member cannot access operational finance-summary');
assert(!canAccessView(boardMember, 'review-queue'), 'Board Member cannot access CPO review queue');
assert(!canAccessView(boardMember, 'operations-desk'), 'Board Member cannot access COO operations desk');
assert(!hasPermission(boardMember, 'create'), 'Board Member cannot create operational records');

// 7. Financial Ledger Reconciliation
const unsettledTotal = INITIAL_INVOICES
  .filter((i) => i.status !== 'PAID')
  .reduce((sum, i) => sum + i.amount, 0);

assert(unsettledTotal === 103900, `Invoices reconcile: Pending/Overdue total is $${unsettledTotal.toLocaleString()} (expected $103,900)`);

// 8. Tasks and Checklists
const allChecklists = INITIAL_TASKS.flatMap((t) => t.checklist);
assert(allChecklists.length >= 8, `Tasks contain ${allChecklists.length} individual acceptance checklist gates`);

console.log('\n====================================================');
console.log(`  RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('====================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
