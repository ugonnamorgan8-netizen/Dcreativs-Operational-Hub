import React, { useState } from 'react';
import { X, SlidersHorizontal, AlertTriangle, Layers, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewUpdateModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { addOperationalAlert } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'CRITICAL' | 'WARNING' | 'HEALTHY'>('WARNING');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return alert('Please enter title and description');

    addOperationalAlert({
      title,
      description,
      type
    });
    onClose();
  };

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
          maxWidth: 480,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SlidersHorizontal size={20} color="var(--electric-violet)" />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 700 }}>
              Broadcast Operational Update
            </h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
              Update / Alert Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build Pipeline Cache Invalidation"
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
              Operational Severity
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.88rem'
              }}
            >
              <option value="CRITICAL">Critical (Immediate Founder Override)</option>
              <option value="WARNING">Warning (High Resource Bandwidth)</option>
              <option value="HEALTHY">Nominal (Informational Sync)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
              Actionable Guidance / Details
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify affected sprints, handoffs, or resources..."
              rows={3}
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Post to Operations Desk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
