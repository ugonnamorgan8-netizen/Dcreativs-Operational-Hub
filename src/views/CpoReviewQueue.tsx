import React, { useState } from 'react';
import {
  CheckCircle,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ReviewQueueItem } from '../types';

export const CpoReviewQueue: React.FC = () => {
  const {
    reviews,
    selectedReview,
    setSelectedReview,
    approveDeliverable,
    setIsComparisonModalOpen,
    approvalHistory,
    setIsApprovalHistoryModalOpen,
    currentProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'All Reviews' | 'Creative Assets' | 'Code Reviews' | 'Client Feedback'>('All Reviews');

  const pendingCount = reviews.filter((item) => item.status !== 'APPROVED').length;

  const filteredReviews = reviews.filter((item) => {
    if (activeTab === 'All Reviews') return true;
    if (activeTab === 'Creative Assets') return item.category === 'CREATIVE_ASSET';
    if (activeTab === 'Code Reviews') return item.category === 'CODE_REVIEW';
    if (activeTab === 'Client Feedback') return item.category === 'CLIENT_FEEDBACK';
    return true;
  });

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', fontWeight: 700 }}>
            Review Queue
          </h1>
          <span
            style={{
              backgroundColor: pendingCount > 0 ? 'rgba(65, 0, 245, 0.1)' : '#ECFDF5',
              color: pendingCount > 0 ? 'var(--electric-violet)' : '#059669',
              border: pendingCount > 0 ? '1px solid rgba(65, 0, 245, 0.2)' : '1px solid #A7F3D0',
              padding: '4px 10px',
              borderRadius: 9999,
              fontSize: '0.74rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: pendingCount > 0 ? 'var(--electric-violet)' : '#059669'
              }}
            />
            {pendingCount > 0 ? `${pendingCount} PENDING` : 'ALL REVIEWS COMPLETED'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span>Sort by: <strong style={{ color: 'var(--text-heading)' }}>Newest First</strong></span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
        {(['All Reviews', 'Creative Assets', 'Code Reviews', 'Client Feedback'] as const).map((tab) => (
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

      {/* Main Review Section Layout */}
      <div className="hub-grid-split">
        {/* Left: Review Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredReviews.map((item) => {
            const isSelected = selectedReview?.id === item.id;
            const isApproved = item.status === 'APPROVED';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedReview(item)}
                style={{
                  backgroundColor: isApproved ? '#FAFCFB' : '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected
                    ? (isApproved ? '2px solid #10B981' : '2px solid var(--electric-violet)')
                    : (isApproved ? '1.5px solid #A7F3D0' : '1px solid var(--border-subtle)'),
                  padding: 20,
                  boxShadow: isSelected
                    ? (isApproved ? '0 4px 20px rgba(16, 185, 129, 0.14)' : '0 4px 20px rgba(65, 0, 245, 0.12)')
                    : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                {/* Top badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 4,
                        backgroundColor: '#EEF2FF',
                        color: 'var(--electric-violet)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {item.projectCode}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 9999,
                      backgroundColor: isApproved ? '#ECFDF5' : '#F1F5F9',
                      color: isApproved ? '#047857' : 'var(--text-muted)',
                      border: isApproved ? '1px solid #A7F3D0' : '1px solid transparent',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    {isApproved && <CheckCircle2 size={12} color="#059669" />}
                    {isApproved ? 'RELEASED' : item.waitingOn}
                  </span>
                </div>

                {/* Title & Author */}
                <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700 }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>Submitted by <strong>{item.submittedBy}</strong></span>
                  <span>·</span>
                  <span>{item.submittedAgo}</span>
                  {isApproved && (
                    <>
                      <span>·</span>
                      <span style={{ color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle size={12} /> Approved
                      </span>
                    </>
                  )}
                </div>

                {/* Expanded Details for currently viewing card (Marvel SMS v3) */}
                {isSelected && item.designerNote && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        Designer's Note:
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsComparisonModalOpen(true);
                        }}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--electric-violet)',
                          textDecoration: 'underline',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        View v2 vs v3 Comparison
                      </button>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      "{item.designerNote}"
                    </p>

                    {/* Completion Banner or Action Buttons */}
                    {isApproved ? (
                      <div
                        style={{
                          marginTop: 18,
                          padding: '16px 20px',
                          backgroundColor: '#F0FDF4',
                          border: '1.5px solid #86EFAC',
                          borderRadius: 'var(--radius-sm)',
                          boxShadow: '0 2px 10px rgba(16, 185, 129, 0.08)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                backgroundColor: '#DCFCE7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                color: '#15803D'
                              }}
                            >
                              <CheckCircle2 size={22} />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#14532D', margin: 0 }}>
                                  Deliverable Approved for Release
                                </h4>
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    backgroundColor: '#BBF7D0',
                                    color: '#166534',
                                    padding: '2px 8px',
                                    borderRadius: 9999
                                  }}
                                >
                                  COMPLETED
                                </span>
                              </div>
                              <p style={{ fontSize: '0.8rem', color: '#166534', marginTop: 4, lineHeight: 1.5 }}>
                                CPO quality sign-off verified. Marked as <strong>{item.versionNumber} (RELEASED)</strong> and ready for client delivery handover.
                              </p>
                              <div style={{ fontSize: '0.74rem', color: '#15803D', marginTop: 6, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <span>✓ Quality checklist passed</span>
                                <span>·</span>
                                <span>✓ Checksum SHA-256 verified</span>
                                <span>·</span>
                                <span>✓ Handover bundle ready</span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsComparisonModalOpen(true);
                              }}
                              className="btn-secondary"
                              style={{
                                fontSize: '0.78rem',
                                padding: '7px 14px',
                                backgroundColor: '#FFFFFF',
                                borderColor: '#86EFAC',
                                color: '#166534'
                              }}
                            >
                              Inspect Release Spec
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            approveDeliverable(item.id);
                          }}
                          className="btn-primary"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          <CheckCircle size={16} />
                          <span>Approve for Release</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsComparisonModalOpen(true);
                          }}
                          className="btn-secondary"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          <RotateCcw size={15} />
                          <span>Request Changes</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Rail: Stats, Approval History & Pro Tip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Review Stats */}
          <div className="hub-card" style={{ background: 'linear-gradient(135deg, #020617 0%, #0F172A 100%)', color: '#FFFFFF' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#E2E8F0', fontWeight: 700, marginBottom: 14 }}>
              Review Stats
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em' }}>
                  QUEUE HEALTH
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
                  94%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em' }}>
                  AVG. SPEED
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
                  3.2h
                </div>
                <div style={{ fontSize: '0.7rem', color: '#34D399', fontWeight: 600, marginTop: 2 }}>
                  ↓ 12% faster
                </div>
              </div>
            </div>
          </div>

          {/* Approval History */}
          <div className="hub-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-heading)', fontWeight: 700 }}>
                Approval History
              </h4>
              <button
                onClick={() => setIsApprovalHistoryModalOpen(true)}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--electric-violet)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
                title="View full deliverable approval audit history"
              >
                <span>VIEW ALL</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {approvalHistory.slice(0, 4).map((hist) => {
                const isAppr = hist.status === 'APPROVED' || hist.status === 'EXECUTIVE_OVERRIDE';
                return (
                  <div key={hist.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    {isAppr ? (
                      <CheckCircle2 size={16} color="#10B981" style={{ marginTop: 2, flexShrink: 0 }} />
                    ) : (
                      <RotateCcw size={16} color="#F59E0B" style={{ marginTop: 2, flexShrink: 0 }} />
                    )}
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {hist.deliverableTitle} {isAppr ? 'approved' : 'changes requested'}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {hist.authorName} for {hist.projectName} ({hist.versionNumber})
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: 2 }}>
                        {hist.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pro Tip Box */}
          <div
            style={{
              padding: 18,
              backgroundColor: '#F5F3FF',
              border: '1px solid #DDD6FE',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--electric-violet)', fontWeight: 700, fontSize: '0.82rem' }}>
              <HelpCircle size={16} />
              <span>Pro Tip:</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: 6, lineHeight: 1.5 }}>
              Items older than 48 hours are automatically flagged for founder escalation. Keep the queue moving!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
