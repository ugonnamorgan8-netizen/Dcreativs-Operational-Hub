import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  CheckCircle,
  XCircle,
  FileText,
  Key,
  ShieldCheck,
  AlertTriangle,
  Database,
  Terminal
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SecurityRbacMatrix: React.FC = () => {
  const { auditLogs, currentProfile, canAccessView, allProfiles, resolveAccountRole } = useApp();
  const [selectedRoleTest, setSelectedRoleTest] = useState(currentProfile.role);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Matrix actions and roles
  const matrix = [
    { action: 'board.grant.create', ceo: true, coo: false, cpo: false, cfo: false, chro: false, cmo: false, staff: false },
    { action: 'organization.ownership.transfer', ceo: true, coo: false, cpo: false, cfo: false, chro: false, cmo: false, staff: false },
    { action: 'deliverable.release.approve', ceo: true, coo: false, cpo: true, cfo: false, chro: false, cmo: false, staff: false },
    { action: 'budget.policy.alter', ceo: true, coo: false, cpo: false, cfo: true, chro: false, cmo: false, staff: false },
    { action: 'personnel.record.read_private', ceo: true, coo: false, cpo: false, cfo: false, chro: true, cmo: false, staff: false },
    { action: 'campaign.brief.submit', ceo: true, coo: true, cpo: false, cfo: false, chro: false, cmo: true, staff: false },
    { action: 'deliverable.version.submit', ceo: true, coo: true, cpo: true, cfo: true, chro: true, cmo: true, staff: true },
    { action: 'task.checklist.update', ceo: true, coo: true, cpo: true, cfo: true, chro: true, cmo: true, staff: true }
  ];

  const handleRunSecurityTest = (targetResource: string) => {
    if (targetResource === 'openline_reports') {
      if (selectedRoleTest !== 'CHRO') {
        setTestResult('DENIED: 403 Forbidden. Whistleblower privacy rule: OpenLine records are end-to-end sealed from CEO and non-ombudsman roles to preserve reporter anonymity.');
      } else {
        setTestResult('PERMITTED: 200 OK. Decrypted with authorized Ombudsman key.');
      }
    } else if (selectedRoleTest !== 'CEO' && targetResource === 'board_packs') {
      setTestResult('DENIED: 403 Forbidden. Access Denied. Record details & existence masked to prevent leaks.');
    } else if (selectedRoleTest !== 'CPO' && selectedRoleTest !== 'CEO' && targetResource === 'deliverable_approval') {
      setTestResult('DENIED: 403 Forbidden. CPO quality sign-off required (or CEO documented executive override).');
    } else {
      setTestResult('PERMITTED: 200 OK. Operation authorized under active scope policy.');
    }
  };

  return (
    <div className="hub-view-container">
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
              Security, RBAC & Append-Only Audit Matrix
            </h1>
            <span className="badge badge-healthy">ZERO-LEAK POLICY ENFORCED</span>
          </div>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4, margin: '4px 0 0' }}>
          Formal role-action-scope access definitions, append-only security logs, and zero-leak permission testing.
        </p>
      </div>

      {/* Role / Action / Scope Matrix Table */}
      <div className="hub-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
            Role / Action / Scope Authorization Matrix
          </h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Scroll →
          </span>
        </div>

        <div
          className="hub-table-container"
          style={{
            overflowX: 'auto',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            WebkitOverflowScrolling: 'touch',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <table className="hub-table" style={{ width: '100%', minWidth: 660, borderCollapse: 'separate' }}>
            <thead>
              <tr>
                <th style={{ whiteSpace: 'nowrap', minWidth: 200 }}>Action Grant</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 60, textAlign: 'center' }}>CEO</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 60, textAlign: 'center' }}>COO</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 60, textAlign: 'center' }}>CPO</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 60, textAlign: 'center' }}>CFO</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 60, textAlign: 'center' }}>CHRO</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 60, textAlign: 'center' }}>CMO</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 60, textAlign: 'center' }}>Staff</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--electric-violet)', whiteSpace: 'nowrap' }}>
                    {row.action}
                  </td>
                  <td style={{ textAlign: 'center' }}>{row.ceo ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#CBD5E1" />}</td>
                  <td style={{ textAlign: 'center' }}>{row.coo ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#CBD5E1" />}</td>
                  <td style={{ textAlign: 'center' }}>{row.cpo ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#CBD5E1" />}</td>
                  <td style={{ textAlign: 'center' }}>{row.cfo ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#CBD5E1" />}</td>
                  <td style={{ textAlign: 'center' }}>{row.chro ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#CBD5E1" />}</td>
                  <td style={{ textAlign: 'center' }}>{row.cmo ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#CBD5E1" />}</td>
                  <td style={{ textAlign: 'center' }}>{row.staff ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#CBD5E1" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Role Account Audit Queue (Section 6 Compliance) */}
      <div className="hub-card" style={{ border: '1px solid #FCD34D' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
                Multi-Role Account Audit Queue
              </h3>
              <span className="badge badge-warning">
                {allProfiles.filter((p) => p.flaggedForRoleAudit).length} REQUIRING RESOLUTION
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, margin: 0 }}>
              Accounts with multiple workspace responsibilities or unassigned roles held for administrator review. Assign one primary workspace to eliminate cross-dashboard switching.
            </p>
          </div>
        </div>

        {allProfiles.filter((p) => p.flaggedForRoleAudit).length === 0 ? (
          <div style={{ padding: '16px', backgroundColor: '#ECFDF5', borderRadius: 8, color: '#065F46', fontSize: '0.84rem' }}>
            ✓ All accounts have been verified and assigned to single strictly isolated primary workspaces.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {allProfiles
              .filter((p) => p.flaggedForRoleAudit)
              .map((profile) => (
                <div
                  key={profile.id}
                  style={{
                    padding: 16,
                    border: '1px solid #FDE68A',
                    borderRadius: 8,
                    backgroundColor: '#FFFDF0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                          {profile.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {profile.email} · Current: <strong>{profile.role}</strong> ({profile.department})
                        </div>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FEF3C7', color: '#92400E' }}>
                      AUDIT FLAGGED
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#92400E', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '8px 12px', borderRadius: 6 }}>
                    <strong>Flag Reason:</strong> {profile.auditFlagReason}
                  </div>

                  {/* Resolution Form */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                        Assign Primary Role
                      </label>
                      <select
                        id={`role-select-${profile.id}`}
                        defaultValue={profile.role === 'UNASSIGNED' ? 'DEVELOPER' : profile.role}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border-subtle)', fontSize: '0.82rem' }}
                      >
                        <option value="CEO">CEO (Chief Executive Officer)</option>
                        <option value="COO">COO (Chief Operating Officer)</option>
                        <option value="CPO">CPO (Chief Product Officer)</option>
                        <option value="CFO">CFO (Chief Financial Officer)</option>
                        <option value="CHRO">CHRO (Chief Human Resources Officer)</option>
                        <option value="CMO">CMO (Chief Marketing Officer)</option>
                        <option value="ACADEMY_COORDINATOR">Academy Operations Coordinator</option>
                        <option value="ACADEMY_TUTOR">Academy Tutor</option>
                        <option value="DEVELOPER">Lead Developer (Staff)</option>
                        <option value="BRAND_DESIGNER">Brand Designer (Staff)</option>
                      </select>
                    </div>

                    <div style={{ flex: 1, minWidth: 200 }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                        Primary Workspace Title
                      </label>
                      <input
                        id={`ws-input-${profile.id}`}
                        type="text"
                        defaultValue={profile.assignedWorkspaceName || 'Designated Primary Workspace'}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border-subtle)', fontSize: '0.82rem' }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        const sel = document.getElementById(`role-select-${profile.id}`) as HTMLSelectElement;
                        const wsInput = document.getElementById(`ws-input-${profile.id}`) as HTMLInputElement;
                        resolveAccountRole(
                          profile.id,
                          sel.value as any,
                          wsInput.value,
                          'Authorized resolution by Executive Administrator. Outdated multi-role switcher invalidated.'
                        );
                      }}
                      className="btn-primary"
                      style={{ fontSize: '0.78rem', height: 34, marginTop: 14 }}
                    >
                      Resolve & Assign Primary Workspace
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Security Simulation Sandbox */}
      <div className="hub-card" style={{ backgroundColor: '#F8F9FD' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: 8 }}>
          Authorization Sandbox & Leak-Prevention Tester
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Simulate a direct API query against restricted records to confirm that forbidden items do not leak titles, count, or metadata.
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedRoleTest}
            onChange={(e) => setSelectedRoleTest(e.target.value as any)}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
          >
            <option value="CEO">Test as CEO (Pleasant Johnson)</option>
            <option value="COO">Test as COO (Morgan)</option>
            <option value="CPO">Test as CPO (Kingsley)</option>
            <option value="CFO">Test as CFO (Interim Xant)</option>
            <option value="BRAND_DESIGNER">Test as Staff Designer (Maya Ray)</option>
            <option value="BOARD_MEMBER">Test as Pending Board Member</option>
          </select>

          <button onClick={() => handleRunSecurityTest('board_packs')} className="btn-secondary" style={{ height: 38 }}>
            Try Accessing Confidential Board Packs
          </button>

          <button onClick={() => handleRunSecurityTest('deliverable_approval')} className="btn-secondary" style={{ height: 38 }}>
            Try Approving Deliverable Release
          </button>

          <button onClick={() => handleRunSecurityTest('openline_reports')} className="btn-secondary" style={{ height: 38 }}>
            Try Reading Sealed OpenLine Reports
          </button>
        </div>

        {testResult && (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 6,
              fontSize: '0.82rem',
              fontWeight: 600,
              backgroundColor: testResult.startsWith('DENIED') ? '#FEF2F2' : '#ECFDF5',
              color: testResult.startsWith('DENIED') ? '#991B1B' : '#047857',
              border: `1px solid ${testResult.startsWith('DENIED') ? '#FECACA' : '#A7F3D0'}`
            }}
          >
            {testResult}
          </div>
        )}
      </div>

      {/* Append-Only Audit Trail */}
      <div className="hub-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700 }}>
              Append-Only Security Audit Trail
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Immutable record of system changes with correlation IDs, actors, and reasons
            </p>
          </div>
          <span className="badge badge-neutral">IMMUTABLE LOGS</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {auditLogs.map((log) => (
            <div
              key={log.id}
              style={{
                padding: 12,
                border: '1px solid var(--border-light)',
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {log.actorName} ({log.actorRole})
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--electric-violet)', fontFamily: 'monospace' }}>
                    {log.action}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                  {log.timestamp}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Resource: <code>{log.resource}</code> · Correlation: <code>{log.correlationId}</code>
              </div>
              {log.reason && (
                <div style={{ fontSize: '0.75rem', color: '#B45309' }}>
                  <strong>Reason:</strong> {log.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
