import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewCampaignModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { addCampaign } = useApp();

  const [title, setTitle] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState(10);
  const [color, setColor] = useState('#4100F5');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert('Please enter campaign title');

    addCampaign({
      title,
      dayOfMonth: Number(dayOfMonth),
      color
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
          maxWidth: 460,
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
            <CalendarIcon size={20} color="var(--electric-violet)" />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 700 }}>
              Schedule Campaign (June 2026)
            </h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
              Campaign Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Influencer Reel Blast — Aero"
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
              Day of Month (June 2026)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(Number(e.target.value))}
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
              Badge Color Tag
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              {['#4100F5', '#885FFF', '#10B981', '#F59E0B', '#EF4444'].map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: c,
                    cursor: 'pointer',
                    boxShadow: color === c ? '0 0 0 3px #FFFFFF, 0 0 0 5px var(--electric-violet)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} />
              <span>Add to Calendar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
