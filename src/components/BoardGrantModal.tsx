import React, { useState } from 'react';
import { X, Award, Shield, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BoardGrantModal: React.FC = () => {
  const {
    isBoardGrantModalOpen,
    setIsBoardGrantModalOpen,
    selectedBoardSeat,
    grantBoardSeat,
    revokeBoardSeat,
    currentProfile
  } = useApp();

  const [candidateName, setCandidateName] = useState('');
  const [scope, setScope] = useState('Standard Board Pack Access & Decision Voting');
  const [reason, setReason] = useState('Strategic Advisory & Creative Tech Industry Leadership');
  const [expiry, setExpiry] = useState('2028-12-31');

  if (!isBoardGrantModalOpen || !selectedBoardSeat) return null;

  const isAlreadyActive = selectedBoardSeat.status === 'ACTIVE';

  const handleGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName) return alert('Please enter candidate name.');
    grantBoardSeat(selectedBoardSeat.seatNumber, candidateName, scope, reason, expiry);
  };

  const handleRevoke = () => {
    if (confirm(`Confirm revocation of Board Seat #${selectedBoardSeat.seatNumber}?`)) {
      revokeBoardSeat(selectedBoardSeat.seatNumber, 'Executive CEO Governance Revocation');
      setIsBoardGrantModalOpen(false);
    }
  };

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
          maxWidth: 520,
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Award size={22} color="var(--electric-violet)" />
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-heading)' }}>
              Board Governance: Seat #{selectedBoardSeat.seatNumber}
            </h2>
          </div>
          <button onClick={() => setIsBoardGrantModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {currentProfile.role !== 'CEO' ? (
            <div style={{ padding: 16, backgroundColor: '#FEF2F2', borderRadius: 8, color: '#991B1B' }}>
              <div style={{ fontWeight: 700 }}>Access Denied</div>
              <p style={{ fontSize: '0.85rem', marginTop: 4 }}>
                Only the CEO (Pleasant Johnson) possesses the organizational governance authority to approve or revoke board seats.
              </p>
            </div>
          ) : isAlreadyActive ? (
            <div>
              <div style={{ padding: 14, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8, marginBottom: 16 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Seat Holder:</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {selectedBoardSeat.holderName}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--electric-violet)', marginTop: 2 }}>
                  {selectedBoardSeat.grantScope}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-subtle)', marginTop: 8 }}>
                  Granted: {selectedBoardSeat.grantedAt} · Expires: {selectedBoardSeat.expiresAt}
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                Revoking this grant will immediately disable board workspace and pack access. The user's underlying staff role (if any) will not be impacted.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button onClick={() => setIsBoardGrantModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleRevoke} className="btn-danger">
                  Revoke Board Seat
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGrant} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                  Verified Individual Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Morgan Thorne or Verified External Director"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                  Governance Scope
                </label>
                <input
                  type="text"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                  Appointment Rationale / Reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsBoardGrantModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm CEO Grant
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
