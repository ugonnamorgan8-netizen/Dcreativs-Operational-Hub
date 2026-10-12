import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  EyeOff,
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OpenLineReport } from '../types';

export const OpenLineReports: React.FC = () => {
  const { currentProfile, openLineReports, submitOpenLineReport, updateOpenLineStatus } = useApp();

  const isOmbudsman = Boolean(currentProfile.isOmbudsman);

  // Submission state for any staff/whistleblower
  const [reportCategory, setReportCategory] = useState<OpenLineReport['category']>('FEEDBACK');
  const [reportSummary, setReportSummary] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportSummary.trim() || !reportDetails.trim()) return;

    const generatedCode = `OL-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    submitOpenLineReport({
      category: reportCategory,
      summary: reportSummary,
      body: reportDetails,
      trackingCode: generatedCode
    });

    setSubmittedCode(generatedCode);
    setReportSummary('');
    setReportDetails('');
  };

  return (
    <div className="hub-view-container" style={{ maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
            OpenLine Confidential Channel
          </h1>
          <span
            style={{
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FCD34D',
              borderRadius: 9999,
              padding: '3px 10px',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <Lock size={12} />
            ZERO-KNOWLEDGE PRIVACY
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
          Strictly segregated whistleblowing & anonymous organizational feedback infrastructure.
        </p>
      </div>

      {/* Access Enforcement Banner for Non-Ombudsman (including CEO) */}
      {!isOmbudsman && (
        <div
          style={{
            padding: 20,
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: '#EDE9FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--electric-violet)',
              flexShrink: 0
            }}
          >
            <EyeOff size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              Sealed Whistleblowing Channel — Protected from Executive Access
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
              Under corporate governance standards and whistleblowing protection statutes, raw OpenLine feedback reports are strictly sealed from CEO and general executive access. Reports are cryptographically delivered directly to the designated independent Ombudsman (Elena Rossi, CHRO).
            </p>
            <div style={{ marginTop: 8, fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              Current User: <strong>{currentProfile.name}</strong> ({currentProfile.role}) · Access Status: <strong>Encrypted / Unprivileged</strong>
            </div>
          </div>
        </div>
      )}

      {/* If Ombudsman is logged in: Display Active Reports Queue */}
      {isOmbudsman && (
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', fontWeight: 700 }}>
                Ombudsman Review Queue ({openLineReports.length})
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Authorized officer view: Elena Rossi (CHRO & Ombudsman). Whistleblower IP, identity and metadata are stripped.
              </p>
            </div>
            <span className="badge badge-healthy">OMBUDSMAN KEY ACTIVE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {openLineReports.map((report) => (
              <div
                key={report.id}
                style={{
                  padding: 16,
                  borderRadius: 8,
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <code style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--electric-violet)' }}>
                      {report.trackingCode}
                    </code>
                    <span className="badge badge-violet">{report.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      From: <em>{report.anonymousAlias}</em> · {report.timestamp}
                    </span>
                  </div>

                  {/* Status update controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 4,
                        backgroundColor:
                          report.status === 'RESOLVED'
                            ? '#DCFCE7'
                            : report.status === 'INVESTIGATING'
                            ? '#FEF3C7'
                            : '#F1F5F9',
                        color:
                          report.status === 'RESOLVED'
                            ? '#166534'
                            : report.status === 'INVESTIGATING'
                            ? '#92400E'
                            : '#475569'
                      }}
                    >
                      {report.status}
                    </span>

                    {report.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateOpenLineStatus(report.id, 'RESOLVED')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 4,
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Mark Resolved
                      </button>
                    )}
                    {report.status === 'RECEIVED' && (
                      <button
                        onClick={() => updateOpenLineStatus(report.id, 'INVESTIGATING')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 4,
                          backgroundColor: '#F59E0B',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Start Investigation
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {report.summary}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: 6, lineHeight: 1.5 }}>
                    "{report.body}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anonymous Report Submission Box (Accessible to anyone in company) */}
      <div className="hub-card" style={{ maxWidth: 800 }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: 4 }}>
          Submit Anonymous Concern or Feedback
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 18 }}>
          Submissions are cryptographically detached from your session, IP address, and identity.
        </p>

        {submittedCode ? (
          <div
            style={{
              padding: 20,
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: 8,
              color: '#065F46'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.95rem' }}>
              <CheckCircle2 size={20} color="#10B981" />
              <span>Report Submitted Anonymously</span>
            </div>
            <p style={{ fontSize: '0.82rem', marginTop: 6 }}>
              Your concern was received. Keep your unique reference tracking code below:
            </p>
            <div style={{ margin: '12px 0', fontSize: '1.3rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--electric-violet)' }}>
              {submittedCode}
            </div>
            <button
              onClick={() => setSubmittedCode(null)}
              className="btn-secondary"
              style={{ marginTop: 8, fontSize: '0.78rem', height: 34 }}
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                Category
              </label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="FEEDBACK">Operational Feedback / Process Suggestion</option>
                <option value="CONDUCT">Workplace Conduct & Fair Treatment</option>
                <option value="GOVERNANCE">Governance & Delivery Integrity</option>
                <option value="FINANCE">Financial / Resource Irregularity</option>
                <option value="SAFETY">Wellbeing & Psychological Safety</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                Summary (One sentence overview)
              </label>
              <input
                type="text"
                required
                value={reportSummary}
                onChange={(e) => setReportSummary(e.target.value)}
                placeholder="e.g. Unrealistic sprint commitments causing burnout on Project Orbit..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                Detailed Report
              </label>
              <textarea
                required
                rows={5}
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Describe what occurred, any relevant projects or timelines. Do not include identifying personal information if you wish to remain strictly anonymous."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
              <Send size={15} />
              <span>Submit Sealed Report</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
