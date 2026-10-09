import React from 'react';
import { ShieldAlert, Clock, Mail, LogOut, ArrowRight, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccessAwaitingAssignment: React.FC = () => {
  const { currentProfile, logout } = useApp();

  return (
    <div
      style={{
        padding: '32px 24px',
        maxWidth: 760,
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}
    >
      <div
        className="card-glow"
        style={{
          padding: '36px 32px',
          textAlign: 'center',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}
        >
          <Clock size={32} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--text-heading)',
            marginBottom: 8
          }}
        >
          Access Awaiting Workspace Assignment
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            maxWidth: 540,
            margin: '0 auto 24px'
          }}
        >
          Welcome to D'Creativs Operations Hub, <strong>{currentProfile.name}</strong>. Your account has been verified, but an authorized administrator has not yet designated your primary workspace role.
        </p>

        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 8,
            padding: '16px 24px',
            backgroundColor: 'var(--bg-surface-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'left',
            marginBottom: 28
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Account Identifier: <strong style={{ color: 'var(--text-heading)' }}>{currentProfile.id}</strong>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Registered Email: <strong style={{ color: 'var(--text-heading)' }}>{currentProfile.email}</strong>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Designation Status: <span style={{ color: '#D97706', fontWeight: 700 }}>QUARANTINED · PENDING ALLOCATION</span>
          </div>
        </div>

        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'rgba(65, 0, 245, 0.04)',
            border: '1px solid rgba(65, 0, 245, 0.15)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: 'var(--text-main)',
            lineHeight: 1.5,
            marginBottom: 28,
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--electric-violet)', fontWeight: 700, marginBottom: 4 }}>
            <ShieldAlert size={16} />
            <span>Strict Role Segregation Policy</span>
          </div>
          To prevent unauthorized cross-dashboard data exposure, users without an assigned role are prevented from accessing operational desks, financial logs, or client deliverables until assigned by executive administrators.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            onClick={logout}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px' }}
          >
            <LogOut size={16} />
            <span>Sign Out & Retry Later</span>
          </button>
        </div>
      </div>
    </div>
  );
};
