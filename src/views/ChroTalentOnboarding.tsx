import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Plus,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  HelpCircle,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChroTalentOnboarding: React.FC = () => {
  const {
    candidates,
    setIsAddCandidateModalOpen,
    setSelectedCandidateDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Active Pipeline' | 'Hired' | 'Rejected' | 'Drafts'>('Active Pipeline');
  const [task1Checked, setTask1Checked] = useState(false);
  const [task2Checked, setTask2Checked] = useState(true);
  const [task3Checked, setTask3Checked] = useState(false);

  const filteredCandidates = candidates.filter((c) => {
    if (activeTab === 'Active Pipeline') return c.status !== 'REJECTED';
    if (activeTab === 'Hired') return c.status === 'SIGNED';
    if (activeTab === 'Rejected') return c.status === 'REJECTED';
    return true;
  });

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', fontWeight: 700 }}>
            Talent Onboarding
          </h1>
          <span
            style={{
              backgroundColor: 'rgba(65, 0, 245, 0.1)',
              color: 'var(--electric-violet)',
              border: '1px solid rgba(65, 0, 245, 0.2)',
              padding: '4px 10px',
              borderRadius: 9999,
              fontSize: '0.74rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--electric-violet)' }} />
            {candidates.length < 10 ? `0${candidates.length}` : candidates.length} ACTIVE CANDIDATES
          </span>
        </div>

        <button
          onClick={() => setIsAddCandidateModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          <span>ADD CANDIDATE</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
        {(['Active Pipeline', 'Hired', 'Rejected', 'Drafts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: activeTab === tab ? 700 : 500,
              backgroundColor: activeTab === tab ? '#FFFFFF' : 'transparent',
              color: activeTab === tab ? 'var(--electric-violet)' : 'var(--text-muted)',
              border: activeTab === tab ? '1px solid var(--border-subtle)' : '1px solid transparent',
              boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid: Candidates List + Talent Funnel & HR Tasks */}
      <div className="hub-grid-split">
        {/* Left: Candidate Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {filteredCandidates.map((cand) => {
            const isSigned = cand.status === 'SIGNED';

            if (isSigned) {
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidateDetail(cand)}
                  className="hub-card"
                  style={{
                    background: 'linear-gradient(135deg, #05081E 0%, #0F172A 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <img
                      src={cand.avatarUrl}
                      alt={cand.name}
                      style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--lavender)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>{cand.name}</span>
                        <span className="badge badge-violet" style={{ fontSize: '0.65rem' }}>SIGNED</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 2 }}>
                        {cand.title}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8' }}>START DATE</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', marginTop: 2 }}>
                        {cand.startDate || 'June 15, 2026'}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Welcome Kit & Credentials dispatched to ${cand.name}!`);
                      }}
                      className="btn-primary"
                      style={{ height: 38 }}
                    >
                      Send Kit
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={cand.id}
                onClick={() => setSelectedCandidateDetail(cand)}
                className="hub-card"
                style={{ display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <img
                      src={cand.avatarUrl}
                      alt={cand.name}
                      style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700 }}>
                        {cand.name}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {cand.title}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                      CURRENT STAGE
                    </div>
                    <span
                      className={
                        cand.status === 'FINAL_INTERVIEW'
                          ? 'badge badge-warning'
                          : cand.status === 'SIGNED'
                          ? 'badge badge-healthy'
                          : 'badge badge-violet'
                      }
                      style={{ marginTop: 4 }}
                    >
                      {cand.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span>Applied {cand.appliedDate}</span>
                    <span>·</span>
                    <span>{cand.email}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--electric-violet)' }}>
                    {cand.progressPercent}% COMPLETE
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: 6, backgroundColor: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${cand.progressPercent}%`,
                      height: '100%',
                      backgroundColor: cand.progressPercent > 80 ? '#10B981' : 'var(--electric-violet)',
                      borderRadius: 9999
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Rail: Talent Funnel, HR Tasks & Internal Tip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Talent Funnel Card */}
          <div className="hub-card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 16 }}>
              Talent Funnel
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>SOURCING</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                  42 Candidates
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>INTERVIEWING</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                  08 Candidates
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>OFFER SENT</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                  02 Candidates
                </span>
              </div>

              <div style={{ height: 6, width: '100%', backgroundColor: '#E2E8F0', borderRadius: 9999, overflow: 'hidden', marginTop: 4 }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: '#10B981', borderRadius: 9999 }} />
              </div>
            </div>
          </div>

          {/* HR Tasks Checklist Card */}
          <div className="hub-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                HR Tasks
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <input
                  type="checkbox"
                  checked={task1Checked}
                  onChange={() => setTask1Checked(!task1Checked)}
                  style={{ marginTop: 3, cursor: 'pointer', accentColor: 'var(--electric-violet)' }}
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: task1Checked ? 'var(--text-muted)' : 'var(--text-heading)', textDecoration: task1Checked ? 'line-through' : 'none' }}>
                    Review Isabella's Portfolio
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#EF4444' }}>
                    Due Tomorrow · High Priority
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <input
                  type="checkbox"
                  checked={task2Checked}
                  onChange={() => setTask2Checked(!task2Checked)}
                  style={{ marginTop: 3, cursor: 'pointer', accentColor: 'var(--electric-violet)' }}
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: task2Checked ? 'var(--text-muted)' : 'var(--text-heading)', textDecoration: task2Checked ? 'line-through' : 'none' }}>
                    Draft Nathan's contract
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#10B981' }}>
                    Completed Yesterday
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <input
                  type="checkbox"
                  checked={task3Checked}
                  onChange={() => setTask3Checked(!task3Checked)}
                  style={{ marginTop: 3, cursor: 'pointer', accentColor: 'var(--electric-violet)' }}
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: task3Checked ? 'var(--text-muted)' : 'var(--text-heading)', textDecoration: task3Checked ? 'line-through' : 'none' }}>
                    Update Academy Onboarding PDF
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                    Due Friday
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Tip Box */}
          <div
            style={{
              padding: 18,
              backgroundColor: '#F8F9FD',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--electric-violet)', fontWeight: 700, fontSize: '0.82rem' }}>
              <HelpCircle size={16} />
              <span>Internal Tip</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontStyle: 'italic', marginTop: 8, lineHeight: 1.5 }}>
              "Elena, candidate feedback for Liam is pending from the Tech Lead. Remind Marcus to ping him today."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
