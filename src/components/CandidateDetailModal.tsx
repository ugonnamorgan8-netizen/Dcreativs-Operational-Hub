import React from 'react';
import { X, User, Mail, Calendar, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TalentCandidate } from '../types';

export const CandidateDetailModal: React.FC<{
  candidate: TalentCandidate | null;
  onClose: () => void;
}> = ({ candidate, onClose }) => {
  const { updateCandidateStage } = useApp();

  if (!candidate) return null;

  const stages: Array<{ key: TalentCandidate['status']; label: string }> = [
    { key: 'APPLIED', label: 'Applied' },
    { key: 'TECH_ASSESSMENT', label: 'Technical Assessment' },
    { key: 'FINAL_INTERVIEW', label: 'Final Interview' },
    { key: 'OFFER_SENT', label: 'Offer Sent' },
    { key: 'SIGNED', label: 'Signed' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 4, 34, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 580,
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={candidate.avatarUrl}
              alt={candidate.name}
              style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 700 }}>
                {candidate.name}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {candidate.title} · {candidate.department}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Progress and Current Status */}
          <div style={{ padding: 14, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>PIPELINE STAGE PROGRESS:</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--electric-violet)' }}>
                {candidate.progressPercent}% Complete
              </span>
            </div>
            <div style={{ width: '100%', height: 8, backgroundColor: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${candidate.progressPercent}%`,
                  height: '100%',
                  backgroundColor: 'var(--electric-violet)',
                  borderRadius: 9999
                }}
              />
            </div>
          </div>

          {/* Advance Stage Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 10 }}>
              Update Candidate Recruitment Stage:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stages.map((st) => (
                <button
                  key={st.key}
                  onClick={() => updateCandidateStage(candidate.id, st.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: candidate.status === st.key ? 'var(--electric-violet-light)' : '#FFFFFF',
                    color: candidate.status === st.key ? 'var(--electric-violet)' : 'var(--text-main)',
                    fontWeight: candidate.status === st.key ? 700 : 500,
                    fontSize: '0.85rem'
                  }}
                >
                  <span>{st.label}</span>
                  {candidate.status === st.key && <CheckCircle2 size={16} color="var(--electric-violet)" />}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <button onClick={onClose} className="btn-primary">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
