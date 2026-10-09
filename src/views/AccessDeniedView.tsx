import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

import { getDefaultViewForRole, getDefaultWorkspaceName } from '../utils/permissions';

export const AccessDeniedView: React.FC<{ attemptedView?: string }> = ({ attemptedView }) => {
  const { currentProfile, setActiveView } = useApp();

  const handleReturn = () => {
    setActiveView(getDefaultViewForRole(currentProfile.role));
  };

  return (
    <div
      style={{
        padding: '60px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '70vh'
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#FEF2F2',
          border: '2px solid #FECACA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#DC2626',
          marginBottom: 20,
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.15)'
        }}
      >
        <Lock size={36} />
      </div>

      <div className="badge badge-critical" style={{ marginBottom: 12 }}>
        HTTP 403 · FORBIDDEN ACCESS
      </div>

      <h1 style={{ fontSize: '2rem', color: 'var(--text-heading)', fontWeight: 800 }}>
        Access Restricted
      </h1>

      <p style={{ maxWidth: 520, fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.6 }}>
        Your authenticated role (<strong>{currentProfile?.role}</strong> · {currentProfile?.department}) does not hold authorization grants to inspect this executive suite. In compliance with D'Creativs Zero-Information-Leakage policy, details and counts of restricted records are completely masked.
      </p>

      <div
        style={{
          margin: '24px 0',
          padding: '14px 20px',
          backgroundColor: 'var(--bg-surface-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '0.82rem',
          color: 'var(--text-main)',
          maxWidth: 480
        }}
      >
        <ShieldCheck size={20} color="#10B981" style={{ flexShrink: 0 }} />
        <span style={{ textAlign: 'left' }}>
          This incident has been logged with audit correlation ID <code>req-zero-leak-enforced</code>.
        </span>
      </div>

      <button onClick={handleReturn} className="btn-primary" style={{ gap: 10 }}>
        <ArrowLeft size={16} />
        <span>Return to my workspace ({getDefaultWorkspaceName(currentProfile.role)})</span>
      </button>
    </div>
  );
};
