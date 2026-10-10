import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Plus,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  X,
  Target,
  GitPullRequest,
  Zap,
  Wifi
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CooOperationsDesk: React.FC = () => {
  const {
    setIsNewUpdateModalOpen,
    operationalAlerts,
    acknowledgeAlert
  } = useApp();

  const [expandedStudio, setExpandedStudio] = useState<string | null>(null);
  const [isMilestonesModalOpen, setIsMilestonesModalOpen] = useState(false);

  const workloadData = [
    {
      studio: 'Design Studio',
      percent: 82,
      activeProjects: 8,
      avatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
      ],
      extraCount: 5,
      barColor: '#4100F5',
      projectsList: [
        { name: 'Marvel SMS V2 Design System', lead: 'Maya Ray', due: 'In 3 days', status: 'Review' },
        { name: 'Project Orbit Dark Mode Icons', lead: 'Leo Marcus', due: 'Tomorrow', status: 'In Progress' },
        { name: 'Aero Dynamics Brand Book', lead: 'David K.', due: 'Next Week', status: 'Drafting' }
      ]
    },
    {
      studio: 'Tech & Automation',
      percent: 95,
      activeProjects: 12,
      avatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
      ],
      extraCount: 2,
      barColor: '#885FFF',
      projectsList: [
        { name: 'Client Review n8n Webhook Adapter', lead: 'James Webb', due: 'Jun 08', status: 'Testing' },
        { name: 'Realtime SSE Outbox Queue', lead: 'Leo Marcus', due: 'Jun 10', status: 'Active' }
      ]
    },
    {
      studio: 'Strategy & Content',
      percent: 45,
      activeProjects: 4,
      avatars: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
      ],
      extraCount: 1,
      barColor: '#10B981',
      projectsList: [
        { name: 'Q3 Agency Growth Reel', lead: 'Nina Williams', due: 'Jun 15', status: 'Scripting' },
        { name: 'Academy AI Curriculum Modules', lead: 'Estella', due: 'Jun 20', status: 'Review' }
      ]
    }
  ];

  const [syncedNotice, setSyncedNotice] = useState<string | null>(null);

  const workflows = [
    {
      id: 'WF-101',
      name: 'Client Onboarding & Provisioning v2',
      studio: 'Client Services & Growth',
      owner: 'Marcus Thorne',
      stage: 'AUTOMATION PIPELINE',
      integration: 'n8n Webhook · Slack Alert',
      sla: 'SLA: 4h (Met)',
      status: 'HEALTHY',
      health: '#10B981',
      lastRun: '8 mins ago'
    },
    {
      id: 'WF-102',
      name: 'Creative Deliverable Review & Handoff',
      studio: 'Design Studio',
      owner: 'Sarah Chen',
      stage: 'CPO REVIEW QUEUE',
      integration: 'Figma API · S3 Asset Vault',
      sla: 'SLA: 24h (Met)',
      status: 'HEALTHY',
      health: '#10B981',
      lastRun: '22 mins ago'
    },
    {
      id: 'WF-103',
      name: 'Internal Stakeholder Review Cycle',
      studio: 'Cross-Departmental',
      owner: 'Marcus Thorne',
      stage: 'EXECUTIVE SIGN-OFF',
      integration: 'WhatsApp Ombudsman Trigger',
      sla: 'SLA: 48h (Delayed 2h)',
      status: 'WARNING',
      health: '#F59E0B',
      lastRun: '1 hour ago'
    },
    {
      id: 'WF-104',
      name: 'Academy Roster Admission Batch Ingest',
      studio: 'Academy Operations',
      owner: 'Tunde Bakare',
      stage: 'ROSTER EXTRACTION',
      integration: 'Excel Parser · Central DB',
      sla: 'SLA: Instant',
      status: 'HEALTHY',
      health: '#10B981',
      lastRun: '2 hours ago'
    },
    {
      id: 'WF-105',
      name: 'Finance Invoice Dispatch & Stripe Sync',
      studio: 'Financial Operations',
      owner: 'Xant (CFO)',
      stage: 'LEDGER RECONCILIATION',
      integration: 'Stripe Webhook · Accounting',
      sla: 'SLA: 12h (Met)',
      status: 'HEALTHY',
      health: '#10B981',
      lastRun: '3 hours ago'
    },
    {
      id: 'WF-106',
      name: 'Sprint Retrospective & Velocity Log',
      studio: 'Tech & Automation',
      owner: 'Leo Marcus',
      stage: 'VELOCITY COMPILATION',
      integration: 'GitHub Actions · Audit Log',
      sla: 'SLA: Weekly Cadence',
      status: 'HEALTHY',
      health: '#10B981',
      lastRun: 'Yesterday'
    }
  ];

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', fontWeight: 700 }}>
            Operations Desk
          </h1>
          <span
            style={{
              backgroundColor: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '4px 10px',
              borderRadius: 9999,
              fontSize: '0.74rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
            ALL SYSTEMS NOMINAL
          </span>
        </div>

        <button
          onClick={() => setIsNewUpdateModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          <span>NEW UPDATE</span>
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        {/* KPI 1 – Pending Handoffs */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
              <GitPullRequest size={20} />
            </div>
            <span className="badge badge-warning">CRITICAL</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>08</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>Pending Handoffs</div>
          </div>
        </div>

        {/* KPI 2 – Active Sprints */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <Zap size={20} />
            </div>
            <span className="badge badge-healthy">HEALTHY</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>14</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>Active Sprints</div>
          </div>
        </div>

        {/* KPI 3 – Available Bandwidth */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(136,95,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lavender)' }}>
              <Activity size={20} />
            </div>
            <span className="badge badge-violet">STABLE</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>18%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>Available Bandwidth</div>
          </div>
        </div>

        {/* KPI 4 – System Uptime */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <Wifi size={20} />
            </div>
            <ShieldCheck size={16} color="#10B981" />
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>99.9%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>System Uptime</div>
          </div>
        </div>
      </div>

      {/* 1. Primary Full-Width Analytical Card: Current Agency Workload */}
      <div className="hub-card hub-hero-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 800 }}>
              Current Agency Workload & Studio Capacity
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Click any studio card to expand active sprints, team allocations & milestones
            </p>
          </div>
          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#059669', backgroundColor: '#D1FAE5', padding: '4px 12px', borderRadius: 9999 }}>
            ● Studio Operations Healthy (84% Avg Capacity)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {workloadData.map((item) => {
                const isExpanded = expandedStudio === item.studio;
                return (
                  <div
                    key={item.studio}
                    style={{
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: 16,
                      backgroundColor: isExpanded ? 'var(--bg-surface-secondary)' : '#FFFFFF',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setExpandedStudio(isExpanded ? null : item.studio)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.barColor }} />
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                          {item.studio}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                          {item.percent}% Utilized
                        </span>
                        {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div style={{ width: '100%', height: 8, backgroundColor: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${item.percent}%`,
                          height: '100%',
                          backgroundColor: item.barColor,
                          borderRadius: 9999
                        }}
                      />
                    </div>

                    {/* Avatars & Active Projects */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {item.avatars.map((url, avIdx) => (
                          <img
                            key={avIdx}
                            src={url}
                            alt="team"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              border: '2px solid #FFFFFF',
                              marginLeft: avIdx === 0 ? 0 : -6,
                              objectFit: 'cover'
                            }}
                          />
                        ))}
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 6 }}>
                          +{item.extraCount}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item.activeProjects} Active Projects
                      </span>
                    </div>

                    {/* Expandable Project List */}
                    {isExpanded && (
                      <div
                        style={{
                          marginTop: 14,
                          paddingTop: 12,
                          borderTop: '1px solid var(--border-light)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Active Projects in {item.studio}:
                        </div>
                        {item.projectsList.map((prj, pIdx) => (
                          <div
                            key={pIdx}
                            style={{
                              padding: '8px 12px',
                              backgroundColor: '#FFFFFF',
                              borderRadius: 6,
                              border: '1px solid var(--border-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.8rem'
                            }}
                          >
                            <div>
                              <strong style={{ color: 'var(--text-heading)' }}>{prj.name}</strong>
                              <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>Lead: {prj.lead}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{prj.due}</span>
                              <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>{prj.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

      {/* 2. Expanded Active Workflow Status Card (Full Width & Horizontally Scrollable) */}
      <div className="hub-card hub-hero-card" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 800 }}>
                Active Workflow Status & Automation Pipelines
              </h3>
              <span className="badge badge-healthy">
                {workflows.length} LIVE PIPELINES
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
              End-to-end studio orchestration, SLAs, triggers & stage progression · Scroll horizontally to view complete parameters
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => {
                setSyncedNotice('All operational workflows reconciled with live studio queues.');
                setTimeout(() => setSyncedNotice(null), 3000);
              }}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', height: 36, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Activity size={14} color="var(--electric-violet)" />
              <span>Sync Workflows</span>
            </button>
          </div>
        </div>

        {syncedNotice && (
          <div
            style={{
              marginBottom: 14,
              padding: '10px 14px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: 6,
              color: '#065F46',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <CheckCircle2 size={16} />
            <span>{syncedNotice}</span>
          </div>
        )}

        {/* Horizontally Scrollable Container with defined min-width for neatness */}
        <div
          className="hub-table-container"
          style={{
            overflowX: 'auto',
            width: '100%',
            WebkitOverflowScrolling: 'touch',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <table className="hub-table" style={{ width: '100%', minWidth: 920, borderCollapse: 'separate' }}>
            <thead>
              <tr>
                <th style={{ whiteSpace: 'nowrap' }}>Pipeline / Workflow</th>
                <th style={{ whiteSpace: 'nowrap' }}>Department / Studio</th>
                <th style={{ whiteSpace: 'nowrap' }}>Process Lead</th>
                <th style={{ whiteSpace: 'nowrap' }}>Current Stage</th>
                <th style={{ whiteSpace: 'nowrap' }}>Integration / Trigger</th>
                <th style={{ whiteSpace: 'nowrap' }}>SLA Performance</th>
                <th style={{ whiteSpace: 'nowrap' }}>Last Activity</th>
                <th style={{ whiteSpace: 'nowrap' }}>System Health</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((wf) => (
                <tr key={wf.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--electric-violet)',
                          backgroundColor: 'var(--electric-violet-light)',
                          padding: '2px 6px',
                          borderRadius: 4
                        }}
                      >
                        {wf.id}
                      </span>
                      <strong style={{ color: 'var(--text-heading)' }}>{wf.name}</strong>
                    </div>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>
                    {wf.studio}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{wf.owner}</div>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {wf.stage}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {wf.integration}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: wf.status === 'WARNING' ? '#D97706' : '#059669'
                      }}
                    >
                      {wf.sla}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {wf.lastRun}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: wf.health
                        }}
                      />
                      <span
                        className={wf.status === 'WARNING' ? 'badge badge-warning' : 'badge badge-healthy'}
                        style={{ fontSize: '0.68rem' }}
                      >
                        {wf.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Operational Subgrid: Operational Alerts + Milestones & Notes */}
      <div className="hub-subgrid-pair">
        {/* Left Column: Operational Alerts */}
        <div className="hub-card" style={{ background: 'linear-gradient(135deg, #090E28 0%, #15193B 100%)', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>
            Operational Alerts
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {operationalAlerts.map((alt) => (
              <div
                key={alt.id}
                style={{
                  padding: 12,
                  backgroundColor: alt.type === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  borderLeft: `3px solid ${alt.type === 'CRITICAL' ? '#EF4444' : '#F59E0B'}`,
                  borderRadius: 4
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: alt.type === 'CRITICAL' ? '#FCA5A5' : '#FCD34D' }}>
                    {alt.title}
                  </div>
                  <button
                    onClick={() => acknowledgeAlert(alt.id)}
                    style={{ fontSize: '0.7rem', color: '#E2E8F0', textDecoration: 'underline' }}
                  >
                    Dismiss
                  </button>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#E2E8F0', marginTop: 2 }}>
                  {alt.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Milestones + Studio Note */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Upcoming Milestones */}
          <div className="hub-card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 16 }}>
              Upcoming Milestones
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, backgroundColor: '#F1F5F9', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-muted)' }}>JUN</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)' }}>04</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    Marvel SMS Phase 1 End
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    CLIENT PRESENTATION
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, backgroundColor: '#F1F5F9', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-muted)' }}>JUN</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)' }}>08</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    Academy AI Workshop
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    INTERNAL TRAINING
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMilestonesModalOpen(true)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 18 }}
            >
              View Full Delivery Schedule
            </button>
          </div>

          {/* Studio Note */}
          <div
            style={{
              padding: 18,
              backgroundColor: '#F8F9FD',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--electric-violet)', fontWeight: 700, fontSize: '0.82rem' }}>
              <MessageSquare size={16} />
              <span>Studio Note</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontStyle: 'italic', marginTop: 8, lineHeight: 1.5 }}>
              "Marcus, remember to review the automation scripts for the new client onboarding flow before Monday's standup."
            </p>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 6, fontWeight: 600 }}>
              — Sarah Chen (CPO)
            </div>
          </div>
        </div>
      </div>

      {/* Internal Operational Milestones Modal */}
      {isMilestonesModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: 620, padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #090E28 0%, #15193B 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Target size={22} color="#A5B4FC" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                    Operational Delivery Milestones
                  </h3>
                  <p style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: 2 }}>
                    Key operational checkpoints, Academy cohorts, and cross-team delivery targets.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMilestonesModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { date: 'JUN 04', title: 'Marvel SMS Phase 1 End', type: 'CLIENT PRESENTATION', lead: 'Maya Ray', status: 'ON TRACK' },
                { date: 'JUN 08', title: 'Academy AI Workshop Cohort 3', type: 'INTERNAL TRAINING', lead: 'Estella', status: 'READY' },
                { date: 'JUN 10', title: 'Realtime Outbox Queue Migration', type: 'INFRASTRUCTURE', lead: 'Leo Marcus', status: 'IN PROGRESS' },
                { date: 'JUN 15', title: 'Q3 Agency Growth Production Handover', type: 'CONTENT DELIVERY', lead: 'Nina Williams', status: 'PLANNED' }
              ].map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#FAFAFA'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 6,
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        color: 'var(--electric-violet)'
                      }}
                    >
                      {m.date}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {m.type} · Lead: <strong>{m.lead}</strong>
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      backgroundColor: m.status === 'READY' || m.status === 'ON TRACK' ? '#ECFDF5' : '#EEF2FF',
                      color: m.status === 'READY' || m.status === 'ON TRACK' ? '#059669' : 'var(--electric-violet)',
                      padding: '3px 8px',
                      borderRadius: 9999
                    }}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '12px 24px',
                backgroundColor: '#F8FAFC',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <button
                onClick={() => setIsMilestonesModalOpen(false)}
                className="btn-primary"
                style={{ fontSize: '0.82rem', padding: '7px 16px' }}
              >
                Close Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
