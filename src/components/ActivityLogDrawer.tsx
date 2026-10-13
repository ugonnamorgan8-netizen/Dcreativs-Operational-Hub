import React, { useState } from 'react';
import { X, CheckCircle2, Send, AlertCircle, UserPlus, Filter, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ActivityLogDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { auditLogs } = useApp();
  const [filterType, setFilterType] = useState('ALL');

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 4, 34, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 120,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
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
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 700 }}>
              Executive Activity & Audit Log
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Durable append-only event trail for Q2 2026
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: 8 }}>
          {['ALL', 'APPROVALS', 'FINANCE', 'SECURITY'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              style={{
                padding: '4px 10px',
                borderRadius: 9999,
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: filterType === cat ? 'var(--electric-violet)' : '#F1F5F9',
                color: filterType === cat ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List of Events */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {auditLogs.map((log) => (
            <div
              key={log.id}
              style={{
                padding: 14,
                border: '1px solid var(--border-light)',
                borderRadius: 8,
                backgroundColor: 'var(--bg-surface-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px 10px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {log.actorName} ({log.actorRole})
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', marginLeft: 'auto', flexShrink: 0 }}>
                  {log.timestamp}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--electric-violet)', fontFamily: 'monospace', marginTop: 4 }}>
                {log.action}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: 4 }}>
                {log.details}
              </p>
              {log.reason && (
                <div style={{ fontSize: '0.74rem', color: '#B45309', marginTop: 4 }}>
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
