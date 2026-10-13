import React from 'react';
import {
  FolderKanban,
  Inbox,
  CheckSquare,
  LayoutDashboard,
  Calendar,
  DollarSign,
  UserCheck,
  ShieldAlert,
  Wifi,
  WifiOff,
  SlidersHorizontal,
  LogOut,
  Award,
  Lock,
  GraduationCap,
  FileText,
  BookOpen,
  X,
  Coins
} from 'lucide-react';
import { useApp, AppView } from '../context/AppContext';
import { CurrencyCode } from '../types';

export const Sidebar: React.FC = () => {
  const {
    currentProfile,
    activeView,
    setActiveView,
    notifications,
    isOffline,
    setIsOffline,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    canAccessView,
    logout,
    reviews,
    currency,
    setCurrency,
    currencySymbol
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingReviewsCount = reviews.filter((r) => r.status !== 'APPROVED').length;

  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') return window.innerWidth <= 1024;
    return false;
  });

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateTo = (view: AppView) => {
    setActiveView(view);
    setIsMobileSidebarOpen(false);
  };

  const role = currentProfile.role;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 4, 34, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 35
          }}
        />
      )}

      <aside className={`app-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div
          style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid var(--border-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, var(--midnight) 0%, var(--electric-violet) 100%)',
                border: '1.5px solid var(--lavender)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 14px rgba(65, 0, 245, 0.4)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: '#FFFFFF',
                  letterSpacing: '-0.03em'
                }}
              >
                D
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                D'Creativs
              </div>
              <span style={{ fontSize: '0.68rem', color: '#885FFF', fontWeight: 600, letterSpacing: '0.04em' }}>
                OPERATIONS HUB
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation Area - Strictly Restricted by Role */}
        <div
          className="sidebar-scroll-area"
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            padding: '14px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          {/* CEO Dedicated Workspace */}
          {role === 'CEO' && (
            <>
              <div className="sidebar-section-title">CEO EXECUTIVE SUITE</div>

              <button
                onClick={() => navigateTo('ceo-overview')}
                className={`sidebar-nav-item ${activeView === 'ceo-overview' ? 'active' : ''}`}
              >
                <LayoutDashboard size={18} />
                <span>Executive Overview</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Documents & Reports</span>
              </button>

              <button
                onClick={() => navigateTo('board-room')}
                className={`sidebar-nav-item ${activeView === 'board-room' ? 'active' : ''}`}
              >
                <Award size={18} />
                <span>Board Governance</span>
              </button>

              <button
                onClick={() => navigateTo('security-matrix')}
                className={`sidebar-nav-item ${activeView === 'security-matrix' ? 'active' : ''}`}
              >
                <ShieldAlert size={18} />
                <span>RBAC & Audit Matrix</span>
              </button>
            </>
          )}

          {/* COO Dedicated Workspace */}
          {role === 'COO' && (
            <>
              <div className="sidebar-section-title">COO OPERATIONS SUITE</div>

              <button
                onClick={() => navigateTo('operations-desk')}
                className={`sidebar-nav-item ${activeView === 'operations-desk' ? 'active' : ''}`}
              >
                <SlidersHorizontal size={18} />
                <span>COO Ops Desk</span>
              </button>

              <button
                onClick={() => navigateTo('academy-operations')}
                className={`sidebar-nav-item ${activeView === 'academy-operations' ? 'active' : ''}`}
              >
                <GraduationCap size={18} />
                <span>Academy Operations</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Documents & Reports</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
                {unreadCount > 0 && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.68rem',
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      padding: '2px 7px',
                      borderRadius: 9999,
                      fontWeight: 700
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* CPO Dedicated Workspace */}
          {role === 'CPO' && (
            <>
              <div className="sidebar-section-title">CPO PRODUCT SUITE</div>

              <button
                onClick={() => navigateTo('review-queue')}
                className={`sidebar-nav-item ${activeView === 'review-queue' ? 'active' : ''}`}
              >
                <FolderKanban size={18} />
                <span>Product Review Queue</span>
                {pendingReviewsCount > 0 && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.68rem',
                      backgroundColor: 'rgba(65, 0, 245, 0.3)',
                      color: '#A5B4FC',
                      padding: '2px 7px',
                      borderRadius: 9999,
                      fontWeight: 700
                    }}
                  >
                    {pendingReviewsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Documents & Specs</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
              </button>
            </>
          )}

          {/* CFO Dedicated Workspace */}
          {role === 'CFO' && (
            <>
              <div className="sidebar-section-title">FINANCE WORKSPACE</div>

              <button
                onClick={() => navigateTo('finance-summary')}
                className={`sidebar-nav-item ${activeView === 'finance-summary' ? 'active' : ''}`}
              >
                <DollarSign size={18} />
                <span>Finance & Treasury</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Financial Records</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
              </button>
            </>
          )}

          {/* CHRO Dedicated Workspace */}
          {role === 'CHRO' && (
            <>
              <div className="sidebar-section-title">PEOPLE & TALENT</div>

              <button
                onClick={() => navigateTo('talent-onboarding')}
                className={`sidebar-nav-item ${activeView === 'talent-onboarding' ? 'active' : ''}`}
              >
                <UserCheck size={18} />
                <span>Talent Onboarding</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Personnel Documents</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
              </button>

              {currentProfile.isOmbudsman && (
                <button
                  onClick={() => navigateTo('openline-reports')}
                  className={`sidebar-nav-item ${activeView === 'openline-reports' ? 'active' : ''}`}
                >
                  <ShieldAlert size={18} />
                  <span>OpenLine Ombudsman</span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.62rem',
                      backgroundColor: '#FEF3C7',
                      color: '#92400E',
                      padding: '2px 6px',
                      borderRadius: 9999,
                      fontWeight: 700
                    }}
                  >
                    SEALED
                  </span>
                </button>
              )}
            </>
          )}

          {/* CMO Dedicated Workspace */}
          {role === 'CMO' && (
            <>
              <div className="sidebar-section-title">MARKETING WORKSPACE</div>

              <button
                onClick={() => navigateTo('campaign-calendar')}
                className={`sidebar-nav-item ${activeView === 'campaign-calendar' ? 'active' : ''}`}
              >
                <Calendar size={18} />
                <span>Campaign Calendar</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Campaign Assets & Briefs</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
              </button>
            </>
          )}

          {/* Academy Coordinator Workspace */}
          {role === 'ACADEMY_COORDINATOR' && (
            <>
              <div className="sidebar-section-title">ACADEMY OPERATIONS</div>

              <button
                onClick={() => navigateTo('academy-operations')}
                className={`sidebar-nav-item ${activeView === 'academy-operations' ? 'active' : ''}`}
              >
                <GraduationCap size={18} />
                <span>Academy Operations Desk</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Academy Documents</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
              </button>
            </>
          )}

          {/* Tutor Workspace */}
          {role === 'ACADEMY_TUTOR' && (
            <>
              <div className="sidebar-section-title">TUTOR WORKSPACE</div>

              <button
                onClick={() => navigateTo('tutor-workspace')}
                className={`sidebar-nav-item ${activeView === 'tutor-workspace' ? 'active' : ''}`}
              >
                <BookOpen size={18} />
                <span>My Assigned Classes</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Teaching Resources</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
              </button>
            </>
          )}

          {/* Staff Roles (Developers, Designers, Content Creators, Contractors) */}
          {[
            'DEVELOPER',
            'AI_ENGINEER',
            'BRAND_DESIGNER',
            '3D_ARTIST',
            'CONTENT_CREATOR',
            'SOCIAL_MANAGER',
            'CONTRACTOR',
            'OPERATIONS_COORDINATOR'
          ].includes(role) && (
            <>
              <div className="sidebar-section-title">STAFF WORKSPACE</div>

              <button
                onClick={() => navigateTo('my-work')}
                className={`sidebar-nav-item ${activeView === 'my-work' ? 'active' : ''}`}
              >
                <CheckSquare size={18} />
                <span>My Work & Deliverables</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Documents & Files</span>
              </button>

              <button
                onClick={() => navigateTo('messaging')}
                className={`sidebar-nav-item ${activeView === 'messaging' ? 'active' : ''}`}
              >
                <Inbox size={18} />
                <span>Team Inbox</span>
                {unreadCount > 0 && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.68rem',
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      padding: '2px 7px',
                      borderRadius: 9999,
                      fontWeight: 700
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigateTo('openline-reports')}
                className={`sidebar-nav-item ${activeView === 'openline-reports' ? 'active' : ''}`}
              >
                <ShieldAlert size={18} />
                <span>OpenLine Channel</span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.62rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#94A3B8',
                    padding: '2px 6px',
                    borderRadius: 9999,
                    fontWeight: 600
                  }}
                >
                  SEALED
                </span>
              </button>
            </>
          )}

          {/* Board Member */}
          {role === 'BOARD_MEMBER' && (
            <>
              <div className="sidebar-section-title">BOARD GOVERNANCE</div>

              <button
                onClick={() => navigateTo('board-room')}
                className={`sidebar-nav-item ${activeView === 'board-room' ? 'active' : ''}`}
              >
                <Award size={18} />
                <span>Board Room</span>
              </button>

              <button
                onClick={() => navigateTo('documents-desk')}
                className={`sidebar-nav-item ${activeView === 'documents-desk' ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Governance Documents</span>
              </button>
            </>
          )}

          {/* Unassigned Account */}
          {role === 'UNASSIGNED' && (
            <>
              <div className="sidebar-section-title">ACCOUNT QUARANTINE</div>

              <button
                onClick={() => navigateTo('access-awaiting-assignment')}
                className={`sidebar-nav-item ${activeView === 'access-awaiting-assignment' ? 'active' : ''}`}
              >
                <Lock size={18} />
                <span>Awaiting Assignment</span>
              </button>
            </>
          )}

          {/* Zero-Leak Security Badge */}
          <div style={{ marginTop: 'auto', padding: '12px 6px' }}>
            <div
              style={{
                padding: '10px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-dark)',
                borderRadius: 8,
                fontSize: '0.74rem',
                color: '#94A3B8'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#A5B4FC', fontWeight: 700, marginBottom: 4 }}>
                <Lock size={12} />
                <span>Role Isolation Enforced</span>
              </div>
              Workspaces are strictly segregated. Cross-dashboard hopping is locked by policy.
            </div>
          </div>
        </div>

        {/* Sidebar Sticky Footer Group */}
        <div
          className="sidebar-footer-group"
          style={{
            flexShrink: 0,
            marginTop: 'auto',
            backgroundColor: 'var(--sidebar-navy)',
            borderTop: '1px solid var(--border-dark)',
            zIndex: 10
          }}
        >
          {/* Currency Switcher (Mobile drawer only - hidden on desktop sidebar) */}
          {isMobile && (
            <div
              className="sidebar-currency-mobile-only"
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(0, 4, 34, 0.5)',
                borderBottom: '1px solid var(--border-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#CBD5E1' }}>
                <Coins size={14} color="#A78BFA" />
                <span>Currency ({currencySymbol})</span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['USD', 'EUR', 'NGN'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: '0.72rem',
                      fontWeight: currency === c ? 700 : 500,
                      backgroundColor: currency === c ? 'var(--electric-violet)' : 'rgba(255, 255, 255, 0.08)',
                      color: currency === c ? '#FFFFFF' : '#94A3B8',
                      border: '1px solid',
                      borderColor: currency === c ? 'var(--electric-violet)' : 'rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Offline Toggle Simulator */}
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(0, 4, 34, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: isOffline ? '#F87171' : '#34D399' }}>
              {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
              <span>{isOffline ? 'Offline Mode (Shell)' : 'Live Network'}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOffline(!isOffline)}
              style={{
                fontSize: '0.68rem',
                color: '#A5B4FC',
                textDecoration: 'underline',
                padding: '2px 4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {isOffline ? 'Go Online' : 'Simulate'}
            </button>
          </div>

          {/* User Account Card - Strictly Locked, No Role or Persona Switching Controls */}
          <div
            className="sidebar-user-session-card"
            style={{
              padding: '12px 14px calc(14px + env(safe-area-inset-bottom, 0px))',
              borderTop: '1px solid var(--border-dark)',
              backgroundColor: 'var(--sidebar-navy)',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left',
                  flex: 1,
                  minWidth: 0
                }}
              >
                <img
                  src={currentProfile.avatarUrl}
                  alt={currentProfile.name}
                  style={{
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    minHeight: 36,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--lavender)',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {currentProfile.name}
                  </div>
                  <div
                    style={{
                      color: '#885FFF',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {currentProfile.role}
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                aria-label="Sign Out"
                style={{
                  padding: '7px 11px',
                  color: '#EF4444',
                  borderRadius: 6,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  justifyContent: 'center',
                  backgroundColor: 'rgba(239, 68, 68, 0.14)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontWeight: 700,
                  fontSize: '0.76rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
