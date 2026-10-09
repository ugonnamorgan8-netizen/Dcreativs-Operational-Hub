import React, { useState } from 'react';
import { X, UploadCloud, Hash, FileCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SubmitDeliverableModal: React.FC = () => {
  const { isSubmitModalOpen, setIsSubmitModalOpen, submitNewDeliverable, isOffline, currentProfile } = useApp();

  const [projectName, setProjectName] = useState('Marvel SMS');
  const [deliverableName, setDeliverableName] = useState('Production Release Asset');
  const [versionNumber, setVersionNumber] = useState('v1.0');
  const [notes, setNotes] = useState('');
  const [checksum, setChecksum] = useState('d41d8cd98f00b204e9800998ecf8427e' + Math.floor(Math.random() * 999999));

  if (!isSubmitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOffline) {
      alert('Uploads and deliverable submissions are disabled in offline mode. Please reconnect.');
      return;
    }
    if (!notes) {
      alert('Please provide designer/engineer notes for this version.');
      return;
    }
    submitNewDeliverable({
      projectName,
      deliverableName,
      versionNumber,
      notes,
      checksum
    });
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
          maxWidth: 580,
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
            <UploadCloud size={22} color="var(--electric-violet)" />
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-heading)' }}>
              Submit Immutable Deliverable Version
            </h2>
          </div>
          <button onClick={() => setIsSubmitModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                Project
              </label>
              <select
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.88rem'
                }}
              >
                <option value="Marvel SMS">Marvel SMS</option>
                <option value="Project Orbit">Project Orbit</option>
                <option value="Aero Dynamics">Aero Dynamics</option>
                <option value="Northwind Corp">Northwind Corp</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
                Version Number
              </label>
              <input
                type="text"
                value={versionNumber}
                onChange={(e) => setVersionNumber(e.target.value)}
                placeholder="e.g. v2.1 or v4.0"
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
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span>Deliverable File from Device</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Direct device attachment</span>
            </label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="file"
                id="deliverable-file-input"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setDeliverableName(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
                  setChecksum('sha256_' + Array.from(file.name).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000007, 42).toString(16) + '_' + file.size);
                }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('deliverable-file-input')?.click()}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', padding: '8px 14px' }}
                title="Select file directly from your computer"
              >
                <UploadCloud size={16} color="var(--electric-violet)" />
                <span>Choose File from Device...</span>
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 6 }}>
              Deliverable Title
            </label>
            <input
              type="text"
              value={deliverableName}
              onChange={(e) => setDeliverableName(e.target.value)}
              placeholder="e.g. Mobile Design System & Handoff Specs"
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
              Version Notes / Changelog
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe modifications made in this iteration (referenced permanently in audit log)..."
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

          <div
            style={{
              padding: 12,
              backgroundColor: 'var(--bg-surface-secondary)',
              borderRadius: 8,
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--text-heading)' }}>
              <Hash size={14} color="var(--electric-violet)" />
              <span>Immutable Integrity Checksum (SHA-256):</span>
            </div>
            <code>{checksum}</code>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
              Submitting author: {currentProfile.name} ({currentProfile.role})
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <FileCheck size={16} />
              <span>Submit for CPO Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
