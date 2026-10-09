import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Search,
  Filter,
  Download,
  FileCheck,
  Hash,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApprovalHistoryItem } from '../types';

export const ApprovalHistoryModal: React.FC = () => {
  const {
    isApprovalHistoryModalOpen,
    setIsApprovalHistoryModalOpen,
    approvalHistory,
    addAuditEvent
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'APPROVED' | 'CHANGES_REQUESTED' | 'EXECUTIVE_OVERRIDE'>('ALL');

  if (!isApprovalHistoryModalOpen) return null;

  const filteredHistory = approvalHistory.filter((item) => {
    const matchesFilter =
      filterType === 'ALL' || item.status === filterType;
    const matchesSearch =
      item.deliverableTitle.toLowerCase().includes(search.toLowerCase()) ||
      item.projectName.toLowerCase().includes(search.toLowerCase()) ||
      item.projectCode.toLowerCase().includes(search.toLowerCase()) ||
      item.reviewerName.toLowerCase().includes(search.toLowerCase()) ||
      item.authorName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Project Code', 'Project Name', 'Deliverable', 'Version', 'Author', 'Reviewer', 'Role', 'Status', 'Timestamp', 'Feedback', 'SHA256'];
    const rows = filteredHistory.map((item) => [
      item.id,
      `"${item.projectCode}"`,
      `"${item.projectName}"`,
      `"${item.deliverableTitle}"`,
      item.versionNumber,
      `"${item.authorName}"`,
      `"${item.reviewerName}"`,
      item.reviewerRole,
      item.status,
      `"${item.timestamp}"`,
      `"${(item.feedback || '').replace(/"/g, '""')}"`,
      item.checksumSha256 || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dcreativs-approval-history-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAuditEvent('approval_history.export', 'deliverables:history', 'Exported deliverable approval log to CSV');
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content"
        style={{
          maxWidth: 780,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #090E28 0%, #15193B 100%)',
            color: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: 'rgba(65, 0, 245, 0.3)',
                border: '1px solid rgba(136, 95, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A5B4FC'
              }}
            >
              <FileCheck size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Approval & Release History
                </h3>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: 9999
                  }}
                >
                  AUDIT LOG
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: 3 }}>
                Verified CPO sign-offs, version handovers, and executive release decisions.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsApprovalHistoryModalOpen(false)}
            style={{
              padding: 8,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px'
              }}
            >
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search by deliverable, project code, or reviewer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.85rem',
                  width: '100%',
                  color: 'var(--text-heading)'
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={handleExportCSV}
              className="btn-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '8px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(
              [
                { label: 'All Decisions', value: 'ALL' },
                { label: 'Approved Releases', value: 'APPROVED' },
                { label: 'Changes Requested', value: 'CHANGES_REQUESTED' },
                { label: 'Executive Overrides', value: 'EXECUTIVE_OVERRIDE' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilterType(tab.value)}
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: 9999,
                  border: filterType === tab.value ? '1px solid var(--electric-violet)' : '1px solid var(--border-subtle)',
                  backgroundColor: filterType === tab.value ? 'var(--electric-violet-light)' : '#FFFFFF',
                  color: filterType === tab.value ? 'var(--electric-violet)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <FileCheck size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                No approval records found
              </h4>
              <p style={{ fontSize: '0.8rem', marginTop: 4 }}>
                {search ? 'Try adjusting your search criteria.' : 'Approvals and release decisions will appear here.'}
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const isApproved = item.status === 'APPROVED' || item.status === 'EXECUTIVE_OVERRIDE';
              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 16,
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          backgroundColor: '#EEF2FF',
                          color: 'var(--electric-violet)',
                          padding: '2px 8px',
                          borderRadius: 4
                        }}
                      >
                        {item.projectCode}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {item.projectName}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          backgroundColor: '#F1F5F9',
                          color: 'var(--text-subtle)',
                          padding: '2px 6px',
                          borderRadius: 4
                        }}
                      >
                        {item.versionNumber}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {item.status === 'EXECUTIVE_OVERRIDE' && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            backgroundColor: '#FDF4FF',
                            color: '#9333EA',
                            border: '1px solid #F0ABFC',
                            padding: '3px 8px',
                            borderRadius: 9999,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Sparkles size={11} />
                          EXECUTIVE OVERRIDE
                        </span>
                      )}
                      {item.status === 'APPROVED' && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            backgroundColor: '#ECFDF5',
                            color: '#059669',
                            border: '1px solid #A7F3D0',
                            padding: '3px 8px',
                            borderRadius: 9999,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <CheckCircle2 size={12} />
                          RELEASE APPROVED
                        </span>
                      )}
                      {item.status === 'CHANGES_REQUESTED' && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            backgroundColor: '#FFFBEB',
                            color: '#D97706',
                            border: '1px solid #FDE68A',
                            padding: '3px 8px',
                            borderRadius: 9999,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <RotateCcw size={12} />
                          CHANGES REQUESTED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Author Info */}
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                      {item.deliverableTitle}
                    </h4>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span>Author: <strong>{item.authorName}</strong></span>
                      <span>·</span>
                      <span>Reviewer: <strong>{item.reviewerName}</strong> ({item.reviewerRole})</span>
                      <span>·</span>
                      <span style={{ color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={12} />
                        {item.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Feedback quote */}
                  {item.feedback && (
                    <div
                      style={{
                        padding: '10px 14px',
                        backgroundColor: isApproved ? '#F0FDF4' : '#FEF3C7',
                        borderLeft: `3px solid ${isApproved ? '#10B981' : '#F59E0B'}`,
                        borderRadius: 4,
                        fontSize: '0.8rem',
                        color: isApproved ? '#166534' : '#92400E',
                        fontStyle: 'italic',
                        lineHeight: 1.5
                      }}
                    >
                      "{item.feedback}"
                    </div>
                  )}

                  {/* Checksum SHA-256 footer */}
                  {item.checksumSha256 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.68rem',
                        color: 'var(--text-subtle)',
                        fontFamily: 'monospace',
                        backgroundColor: '#F8FAFC',
                        padding: '4px 8px',
                        borderRadius: 4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Hash size={12} color="var(--text-muted)" />
                      <span>SHA-256: {item.checksumSha256}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredHistory.length}</strong> of <strong>{approvalHistory.length}</strong> historical events
          </div>
          <button
            onClick={() => setIsApprovalHistoryModalOpen(false)}
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '8px 18px' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
