import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, FileText, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VersionComparisonModal: React.FC = () => {
  const {
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    selectedReview,
    approveDeliverable,
    requestDeliverableChanges,
    currentProfile
  } = useApp();

  const [feedback, setFeedback] = useState('');
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');
  const [showOverrideBox, setShowOverrideBox] = useState(false);

  if (!isComparisonModalOpen || !selectedReview) return null;

  const versions = selectedReview.versions;
  const currentVersion = versions[versions.length - 1]; // v3.0
  const previousVersion = versions.length > 1 ? versions[versions.length - 2] : null; // v2.0

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 4, 34, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
        padding: 24
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          maxWidth: 960,
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 4, 34, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-violet">{selectedReview.projectCode}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Immutable Deliverable Review</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginTop: 4 }}>
              Version Comparison: {previousVersion?.versionNumber || 'Initial'} vs {currentVersion.versionNumber}
            </h2>
          </div>
          <button
            onClick={() => setIsComparisonModalOpen(false)}
            style={{ color: 'var(--text-muted)', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Comparison Side-by-Side Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Previous Version */}
            <div
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
                backgroundColor: 'var(--bg-surface-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="badge badge-neutral">{previousVersion?.versionNumber || 'v2.0 (Baseline)'}</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {previousVersion?.submissionDate || 'Yesterday'}
                </span>
              </div>
              <div
                style={{
                  height: 180,
                  backgroundColor: '#0F172A',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  fontSize: '0.82rem',
                  flexDirection: 'column',
                  gap: 8,
                  border: '1px dashed #334155'
                }}
              >
                <div style={{ fontWeight: 600 }}>Previous Render ({previousVersion?.versionNumber})</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Standard chart alignment · Low dark contrast</div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PREVIOUS REVISION NOTE:</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: 4 }}>
                  {previousVersion?.notes || 'Initial revision uploaded for review.'}
                </p>
                {previousVersion?.reviewDecision && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: 10,
                      backgroundColor: 'var(--status-warning-bg)',
                      border: '1px solid var(--status-warning-border)',
                      borderRadius: 6,
                      fontSize: '0.78rem',
                      color: '#B45309'
                    }}
                  >
                    <strong>Feedback from CPO:</strong> {previousVersion.reviewDecision.feedback}
                  </div>
                )}
              </div>
            </div>

            {/* Current Candidate Version */}
            <div
              style={{
                border: '2px solid var(--electric-violet)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
                backgroundColor: '#FFFFFF',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="badge badge-healthy">{currentVersion.versionNumber} (Current Candidate)</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {currentVersion.submissionDate}
                </span>
              </div>
              <div
                style={{
                  height: 180,
                  background: 'linear-gradient(135deg, #090E28 0%, #15193B 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  flexDirection: 'column',
                  gap: 8,
                  border: '1px solid var(--lavender)'
                }}
              >
                <div style={{ fontWeight: 700, color: '#C7D2FE' }}>Refined High-Fi Output ({currentVersion.versionNumber})</div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={14} /> High contrast chart components · Fixed mobile grid
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--electric-violet)' }}>
                  DESIGNER'S NOTE & CHANGELOG:
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: 4, fontWeight: 500 }}>
                  "{currentVersion.notes}"
                </p>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.74rem', color: 'var(--text-subtle)' }}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span>SHA-256 Checksum: <code>{currentVersion.checksumSha256.substring(0, 16)}...</code></span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form if requesting changes */}
          {showFeedbackBox && (
            <div style={{ padding: 16, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                Specify Revision Requirements for {selectedReview.submittedBy}:
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Detail the exact adjustments required before approval can be granted..."
                rows={3}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button
                  onClick={() => setShowFeedbackBox(false)}
                  className="btn-secondary"
                  style={{ height: 36, padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!feedback) return alert('Please enter feedback');
                    requestDeliverableChanges(selectedReview.id, feedback);
                    setIsComparisonModalOpen(false);
                  }}
                  className="btn-danger"
                  style={{ height: 36, padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  Confirm Request Changes
                </button>
              </div>
            </div>
          )}

          {/* Executive Override Reason Form if CEO is overriding */}
          {showOverrideBox && (
            <div style={{ padding: 16, backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-sm)' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#991B1B', display: 'block', marginBottom: 4 }}>
                CEO Executive Override Justification (Recorded in Audit Ledger):
              </label>
              <p style={{ fontSize: '0.74rem', color: '#B91C1C', marginBottom: 8 }}>
                Primary deliverable quality sign-off belongs to the CPO. An executive override bypasses pending design reviews and immediately marks the asset as RELEASED. You must provide a documented commercial or administrative reason.
              </p>
              <textarea
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                placeholder="e.g. Critical client milestone SLA deadline; reviewed personally with lead designer on video sync..."
                rows={3}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #F87171',
                  fontSize: '0.85rem'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button
                  onClick={() => setShowOverrideBox(false)}
                  className="btn-secondary"
                  style={{ height: 36, padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!overrideReason.trim()) return alert('Please provide an explicit executive override justification');
                    approveDeliverable(selectedReview.id, overrideReason);
                    setIsComparisonModalOpen(false);
                  }}
                  style={{
                    height: 36,
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    borderRadius: 6,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Confirm Executive Override
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)',
            flexWrap: 'wrap',
            gap: 12
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Authenticated Persona: <strong>{currentProfile.name}</strong> ({currentProfile.role})
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => setShowFeedbackBox(true)}
              className="btn-secondary"
            >
              Request Changes
            </button>

            {/* Approval logic based on role */}
            {currentProfile.role === 'CPO' ? (
              <button
                onClick={() => {
                  approveDeliverable(selectedReview.id);
                  setIsComparisonModalOpen(false);
                }}
                className="btn-primary"
              >
                <CheckCircle size={16} />
                <span>Approve for Release (CPO)</span>
              </button>
            ) : currentProfile.role === 'CEO' ? (
              <button
                onClick={() => setShowOverrideBox(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Bypass quality gate with recorded executive override"
              >
                <AlertCircle size={16} />
                <span>Executive Override Release</span>
              </button>
            ) : (
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Release approval restricted to CPO
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
