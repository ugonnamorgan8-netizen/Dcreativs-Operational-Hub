import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  FolderKanban,
  Users,
  AlertCircle,
  Download,
  Filter,
  CheckCircle2,
  Send,
  UserPlus,
  ArrowUpRight,
  Minus,
  ArrowDownRight,
  Calendar,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResponsiveBarChart } from '../components/charts/ResponsiveBarChart';

export const CeoOverview: React.FC = () => {
  const { setActiveView, setIsActivityLogDrawerOpen, addAuditEvent, currency, currencyRate, currencySymbol } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 90 days');
  const [isPeriodMenuOpen, setIsPeriodMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic priority review queue state
  const [priorityItems, setPriorityItems] = useState([
    {
      id: 'item-1',
      project: 'Brand guidelines v2',
      client: 'Orbit',
      due: 'Tomorrow',
      status: 'In review',
      statusColor: '#F59E0B',
      action: 'Approve',
      actionType: 'approve',
      completed: false
    },
    {
      id: 'item-2',
      project: 'Invoice INV-4421',
      client: 'Meridian',
      due: 'Jun 04',
      status: 'Flagged',
      statusColor: '#EF4444',
      action: 'Resolve',
      actionType: 'resolve',
      completed: false
    },
    {
      id: 'item-3',
      project: 'Motion reel cut',
      client: 'Aero',
      due: 'Jun 05',
      status: 'Draft',
      statusColor: '#6366F1',
      action: 'Review',
      actionType: 'review',
      completed: false
    },
    {
      id: 'item-4',
      project: 'Contract renewal',
      client: 'Northwind',
      due: 'Jun 09',
      status: 'Pending',
      statusColor: '#94A3B8',
      action: 'Sign',
      actionType: 'sign',
      completed: false
    }
  ]);

  // Dynamic revenue base values in USD reconciling with CFO finance records
  const periodBaseRevenueUSD: Record<string, number> = {
    'Last 30 days': 480000,
    'Last 90 days': 1284500,
    'Q2 2026': 1284500,
    'Year to date': 2450000
  };

  const periodStats: Record<string, { revChange: string; projects: number; util: string; overdue: number }> = {
    'Last 30 days': { revChange: '↗ 8%', projects: 19, util: '82%', overdue: 2 },
    'Last 90 days': { revChange: '↗ 12%', projects: 23, util: '84%', overdue: 3 },
    'Q2 2026': { revChange: '↗ 12%', projects: 23, util: '84%', overdue: 3 },
    'Year to date': { revChange: '↗ 18%', projects: 42, util: '86%', overdue: 1 }
  };

  const baseRev = periodBaseRevenueUSD[selectedPeriod] || 1284500;
  const convertedRev = Math.round(baseRev * currencyRate);
  const formattedRevenue =
    convertedRev >= 1000000
      ? `${currencySymbol}${(convertedRev / 1000000).toFixed(2)}M`
      : `${currencySymbol}${(convertedRev / 1000).toFixed(0)}K`;

  const currentStats = periodStats[selectedPeriod] || periodStats['Last 90 days'];

  // Monthly chart data filtered by selected period
  const getFilteredRevenueData = () => {
    switch (selectedPeriod) {
      case 'Last 30 days':
        return [
          { month: 'May', actual: 110, target: 105 },
          { month: 'Jun (W1)', actual: 48, target: 45 }
        ];
      case 'Last 90 days':
      case 'Q2 2026':
        return [
          { month: 'Apr', actual: 95, target: 90 },
          { month: 'May', actual: 110, target: 105 },
          { month: 'Jun', actual: 128, target: 120 }
        ];
      case 'Year to date':
      default:
        return [
          { month: 'Jan', actual: 65, target: 70 },
          { month: 'Feb', actual: 75, target: 80 },
          { month: 'Mar', actual: 82, target: 85 },
          { month: 'Apr', actual: 95, target: 90 },
          { month: 'May', actual: 110, target: 105 },
          { month: 'Jun', actual: 128, target: 120 }
        ];
    }
  };

  // Action handlers that mutate state
  const handleItemAction = (id: string, actionType: string, project: string) => {
    setPriorityItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: actionType === 'approve' ? 'Approved' : actionType === 'resolve' ? 'Settled' : 'Completed',
            statusColor: '#10B981',
            action: 'Done ✓',
            completed: true
          };
        }
        return item;
      })
    );
    addAuditEvent('ceo.action.execute', `priority_item:${id}`, `CEO executed action ${actionType} on ${project}`);
  };

  // Real CSV report export
  const handleExportReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value,Period\n' +
      `Quarterly Revenue,${formattedRevenue},${selectedPeriod}\n` +
      `Active Projects,${currentStats.projects},${selectedPeriod}\n` +
      `Team Utilization,${currentStats.util},${selectedPeriod}\n` +
      `Deliverables Overdue,${currentStats.overdue},${selectedPeriod}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dcreativs_Executive_Report_${selectedPeriod.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAuditEvent('ceo.report.export', 'executive_dashboard', `Exported CSV report for ${selectedPeriod}`);
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--electric-violet)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            INTERNAL OPERATIONS HUB
          </div>
          <h1 style={{ fontSize: '1.9rem', color: 'var(--text-heading)', fontWeight: 700, marginTop: 4 }}>
            CEO Overview
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Agency health · Q2 2026 · last synced 12 min ago
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Interactive Period selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsPeriodMenuOpen(!isPeriodMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-main)'
              }}
            >
              <span>{selectedPeriod}</span>
              <ChevronDown size={14} color="var(--text-muted)" />
            </button>

            {isPeriodMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 6,
                  width: 160,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 40,
                  padding: 4
                }}
              >
                {['Last 30 days', 'Last 90 days', 'Q2 2026', 'Year to date'].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPeriod(p);
                      setIsPeriodMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      textAlign: 'left',
                      borderRadius: 4,
                      backgroundColor: p === selectedPeriod ? 'var(--electric-violet-light)' : 'transparent',
                      color: p === selectedPeriod ? 'var(--electric-violet)' : 'var(--text-main)',
                      fontWeight: p === selectedPeriod ? 700 : 500
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Report Action */}
          <button className="btn-primary" onClick={handleExportReport}>
            <Download size={16} />
            <span>Export report</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {/* Metric 1 */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: 'rgba(65, 0, 245, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--electric-violet)'
              }}
            >
              <TrendingUp size={20} />
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <ArrowUpRight size={14} /> {currentStats.revChange}
            </span>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
              {formattedRevenue}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Revenue ({selectedPeriod})
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: 'rgba(136, 95, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--lavender)'
              }}
            >
              <FolderKanban size={20} />
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <ArrowUpRight size={14} /> 4
            </span>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
              {currentStats.projects}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Active projects
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6'
              }}
            >
              <Users size={20} />
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Minus size={14} /> flat
            </span>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
              {currentStats.util}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Team utilization
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444'
              }}
            >
              <AlertCircle size={20} />
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <ArrowDownRight size={14} /> 2
            </span>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
              {currentStats.overdue}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Deliverables overdue
            </div>
          </div>
        </div>
      </div>

      {/* 1. Primary Full-Width Analytical Card: Revenue vs Target Chart */}
      <div className="hub-card hub-hero-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 800 }}>
              Revenue vs Target Execution Run-Rate
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Monthly actualized billings vs quarterly board projection ({selectedPeriod})
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#059669', backgroundColor: '#D1FAE5', padding: '4px 10px', borderRadius: 9999 }}>
              ● Run-rate on track (+{currentStats.revChange})
            </span>
          </div>
        </div>

        <ResponsiveBarChart
          data={getFilteredRevenueData()}
          currency={currency}
          currencySymbol={currencySymbol}
          currencyRate={currencyRate}
          periodLabel={selectedPeriod}
        />
      </div>

      {/* 2. Operational Subgrid: Recent Activity + Governance */}
      <div className="hub-subgrid-pair">
        {/* Left: Recent Activity Feed */}
        <div className="hub-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: 16 }}>
            Recent Activity Feed
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {/* Event 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'var(--status-healthy-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  flexShrink: 0,
                  marginTop: 2
                }}
              >
                <CheckCircle2 size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  Orbit approved the final brand kit.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 2 }}>
                  2 hours ago
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'var(--status-info-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3B82F6',
                  flexShrink: 0,
                  marginTop: 2
                }}
              >
                <Send size={15} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  Aero kickoff deck sent to client.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 2 }}>
                  Yesterday · 16:40
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'var(--status-warning-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B',
                  flexShrink: 0,
                  marginTop: 2
                }}
              >
                <AlertCircle size={15} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  Meridian invoice #INV-4421 flagged.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 2 }}>
                  Yesterday · 09:12
                </div>
              </div>
            </div>

            {/* Event 4 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'var(--electric-violet-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--electric-violet)',
                  flexShrink: 0,
                  marginTop: 2
                }}
              >
                <UserPlus size={15} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  Senior motion designer joined the team.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 2 }}>
                  May 28
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsActivityLogDrawerOpen(true)}
            style={{
              marginTop: 18,
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--electric-violet)',
              textAlign: 'center',
              padding: '8px 0',
              cursor: 'pointer'
            }}
          >
            View full log ➔
          </button>
        </div>

        {/* Right: Academy Performance & Executive Governance Oversight */}
        <div className="hub-card" style={{ border: '1px solid rgba(65, 0, 245, 0.2)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ width: '100%' }}>
              <div
                className="ceo-academy-header-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isMobile ? 'space-between' : 'flex-start',
                  gap: 8,
                  width: '100%'
                }}
              >
                <h3
                  className="ceo-academy-title"
                  style={{
                    fontSize: isMobile ? '1rem' : '1.05rem',
                    color: 'var(--text-heading)',
                    fontWeight: 700,
                    margin: 0,
                    flex: isMobile ? 1 : 'none',
                    minWidth: 0,
                    lineHeight: 1.25
                  }}
                >
                  Academy & Governance Oversight
                </h3>
                <span
                  className="badge badge-healthy ceo-benchmark-badge"
                  style={isMobile ? {
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    minHeight: 48,
                    maxWidth: 48,
                    maxHeight: 48,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    flexShrink: 0,
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    gap: 1,
                    whiteSpace: 'nowrap',
                    wordBreak: 'keep-all',
                    overflowWrap: 'normal'
                  } : undefined}
                >
                  <span
                    className="ceo-benchmark-val"
                    style={isMobile ? {
                      fontSize: '0.55rem',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      display: 'block'
                    } : undefined}
                  >
                    94.2%
                  </span>
                  <span
                    className="ceo-benchmark-lbl"
                    style={isMobile ? {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1
                    } : undefined}
                  >
                    <span
                      className="ceo-benchmark-bench"
                      style={isMobile ? {
                        fontSize: '0.36rem',
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap',
                        wordBreak: 'keep-all',
                        display: 'block'
                      } : undefined}
                    >
                      BENCH
                    </span>
                    <span
                      className="ceo-benchmark-mark"
                      style={isMobile ? {
                        fontSize: '0.36rem',
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap',
                        wordBreak: 'keep-all',
                        display: 'block'
                      } : undefined}
                    >
                      MARK
                    </span>
                  </span>
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, margin: 0 }}>
                Company-wide educational operations & compliance metrics
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, marginBottom: 16, flex: 1 }}>
            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Schools</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--electric-violet)', marginTop: 2 }}>4 Schools</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Queens College, LPS, Landmark</div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Coding Students</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 2 }}>102 Learners</div>
              <div style={{ fontSize: '0.7rem', color: '#10B981' }}>24 Lab · 78 Schools</div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Curriculum Quality</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginTop: 2 }}>4 / 4 Approved</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Verified by CPO Kingsley</div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completion Rate</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 2 }}>91.6%</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>22 Graduated Q1</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'rgba(65, 0, 245, 0.04)', borderRadius: 8, fontSize: '0.78rem', flexWrap: 'wrap', gap: 10, marginTop: 'auto' }}>
            <span style={{ color: 'var(--text-main)', fontSize: '0.76rem' }}>
              <strong>Pending:</strong> Greensprings MOU renewal
            </span>
            <button
              onClick={() => {
                addAuditEvent('academy.mou.ratified', 'school:GSI-ANTHONY', 'CEO Pleasant Johnson ratified Greensprings International 2-Year MOU');
                alert("Greensprings International 2-Year MOU ratified successfully by Executive Authority.");
              }}
              className="btn-primary"
              style={{ fontSize: '0.74rem', padding: '5px 12px' }}
            >
              Ratify MOU
            </button>
          </div>
        </div>
      </div>

      {/* Priority Review Queue Table */}
      <div className="hub-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700 }}>
              Priority review queue
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Items needing your attention before Friday
            </p>
          </div>
          {isMobile && (
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Scroll →
            </span>
          )}
        </div>

        <div
          className="hub-table-container"
          style={{
            overflowX: 'auto',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            WebkitOverflowScrolling: 'touch',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <table className="hub-table" style={{ width: '100%', minWidth: 560, borderCollapse: 'separate' }}>
            <thead>
              <tr>
                <th style={{ whiteSpace: 'nowrap', minWidth: 170 }}>Project</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 100 }}>Client</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 90 }}>Due</th>
                <th style={{ whiteSpace: 'nowrap', minWidth: 110 }}>Status</th>
                <th style={{ textAlign: 'right', whiteSpace: 'nowrap', minWidth: 90 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {priorityItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{item.project}</td>
                  <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.client}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{item.due}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: item.statusColor,
                          flexShrink: 0
                        }}
                      />
                      <span style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{item.status}</span>
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => handleItemAction(item.id, item.actionType, item.project)}
                      style={{
                        color: item.completed ? '#10B981' : 'var(--electric-violet)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap'
                      }}
                      disabled={item.completed}
                    >
                      {item.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
