import React from 'react';
import {
  Award,
  Shield,
  UserPlus,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Key,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BoardRoom: React.FC = () => {
  const {
    boardSeats,
    currentProfile,
    setSelectedBoardSeat,
    setIsBoardGrantModalOpen
  } = useApp();

  const isCEO = currentProfile.role === 'CEO';
  const hasBoardAccess = isCEO || currentProfile.boardAccessStatus === 'ACTIVE';

  const boardPacks = [
    {
      id: 'pack-1',
      title: 'Q2 2026 Executive Strategy & Valuation Pack',
      date: 'May 30, 2026',
      classification: 'STRICTLY CONFIDENTIAL · BOARD EYES ONLY',
      pages: 34
    },
    {
      id: 'pack-2',
      title: 'Agency Expansion & Studio Equity Allocation Model',
      date: 'April 15, 2026',
      classification: 'FOUNDERS & DIRECTORS ONLY',
      pages: 18
    }
  ];

  return (
    <div className="hub-view-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
              Board of Directors (8 Seats)
            </h1>
            <span className="badge badge-violet">GOVERNANCE CHAMBER</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4, margin: '4px 0 0' }}>
            CEO-controlled governance authority, board seat activation lifecycle, and restricted decision records.
          </p>
        </div>

        {isCEO && (
          <div
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(65, 0, 245, 0.08)',
              border: '1px solid var(--electric-violet)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--electric-violet)',
              whiteSpace: 'nowrap'
            }}
          >
            CEO Governance Active: Pleasant Johnson
          </div>
        )}
      </div>

      {/* Access Guard Notice */}
      {!hasBoardAccess && (
        <div
          style={{
            padding: 16,
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 'var(--radius-md)',
            color: '#991B1B',
            display: 'flex',
            alignItems: 'center',
            gap: 14
          }}
        >
          <Lock size={22} color="#DC2626" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Confidential Board Workspace Restricted</div>
            <div style={{ fontSize: '0.8rem', marginTop: 2 }}>
              Your current profile ({currentProfile.name}) does not hold an active CEO-approved board grant. You can view seat statuses, but confidential board packs and decisions remain completely inaccessible.
            </div>
          </div>
        </div>
      )}

      {/* 8 Named Board Seats Grid */}
      <div>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: 14 }}>
          Board Seat Allocation Lifecycle (8 Seats)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {boardSeats.map((seat) => {
            const isActive = seat.status === 'ACTIVE';
            const isPending = seat.status === 'PENDING';
            const isVacant = seat.status === 'VACANT';

            return (
              <div
                key={seat.seatNumber}
                className="hub-card"
                style={{
                  border: isActive ? '2px solid var(--electric-violet)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 14
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                      SEAT #{seat.seatNumber}
                    </span>
                    <span
                      className={
                        isActive
                          ? 'badge badge-healthy'
                          : isPending
                          ? 'badge badge-warning'
                          : 'badge badge-neutral'
                      }
                    >
                      {seat.status}
                    </span>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {seat.holderName || 'Unassigned Seat'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {seat.holderTitle || 'Awaiting verified individual appointment'}
                    </div>
                  </div>

                  {isActive && seat.grantScope && (
                    <div style={{ marginTop: 10, padding: 8, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 6, fontSize: '0.74rem', color: 'var(--text-main)' }}>
                      <strong>Scope:</strong> {seat.grantScope}
                    </div>
                  )}
                </div>

                {isCEO && (
                  <button
                    onClick={() => {
                      setSelectedBoardSeat(seat);
                      setIsBoardGrantModalOpen(true);
                    }}
                    className={isActive ? 'btn-secondary' : 'btn-primary'}
                    style={{ width: '100%', justifyContent: 'center', height: 36, fontSize: '0.8rem' }}
                  >
                    {isActive ? 'Manage / Revoke' : 'Approve & Grant Seat'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Board Packs Section (Protected) */}
      {hasBoardAccess && (
        <div className="hub-card">
          <div
            className="board-packs-header"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 14
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-heading)',
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.25,
                  wordBreak: 'normal',
                  overflowWrap: 'break-word'
                }}
              >
                Board Packs & Governance Records
              </h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 3, margin: '3px 0 0' }}>
                Encrypted executive packs with expiring time-limited download tokens
              </p>
            </div>
            <span className="badge badge-healthy board-delegate-badge" title="Authenticated Delegate">
              <span className="delegate-line-1">AUTHENTICATED</span>
              <span className="delegate-line-2">DELEGATE</span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {boardPacks.map((pack) => (
              <div
                key={pack.id}
                className="board-pack-item"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                  <FileText size={18} color="var(--electric-violet)" style={{ flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--text-heading)',
                        lineHeight: 1.25,
                        wordBreak: 'normal',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {pack.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#DC2626', fontWeight: 600, marginTop: 2, lineHeight: 1.2 }}>
                      {pack.classification} · {pack.pages} pages
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Generated expiring private token for ${pack.title}. Downloading...`)}
                  className="board-pack-download-btn"
                  title={`Download signed pack for ${pack.title}`}
                >
                  <span className="btn-line-1">Download</span>
                  <span className="btn-line-2">Signed Pack</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
