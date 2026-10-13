import React, { useState } from 'react';
import {
  Search,
  Bell,
  Download,
  CheckCircle,
  ChevronDown,
  X,
  Coins,
  Menu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CurrencyCode } from '../types';

export const Topbar: React.FC = () => {
  const {
    currentProfile,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    currencySymbol,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsMobileSidebarOpen,
    isOffline
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') return window.innerWidth <= 1024;
    return false;
  });

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currencies: Array<{ code: CurrencyCode; label: string; symbol: string }> = [
    { code: 'USD', label: 'USD ($)', symbol: '$' },
    { code: 'EUR', label: 'EUR (€)', symbol: '€' },
    { code: 'NGN', label: 'NGN (₦)', symbol: '₦' }
  ];

  /* ── MOBILE TOPBAR ─────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <header className="app-topbar" style={{ padding: '0 16px' }}>
          {/* Left: Hamburger menu trigger */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface-secondary)',
              color: 'var(--text-heading)',
              cursor: 'pointer',
              flexShrink: 0
            }}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          {/* Center: Workspace name */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            minWidth: 0
          }}>
            <div style={{
              width: 7, height: 7,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 6px rgba(16,185,129,0.5)',
              flexShrink: 0
            }} />
            <span style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--text-heading)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {currentProfile.assignedWorkspaceName || currentProfile.role}
            </span>
          </div>

          {/* Right: Notification bell */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                aria-label="View notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 7, right: 7,
                    width: 8, height: 8, borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    boxShadow: '0 0 0 2px #FFFFFF'
                  }} />
                )}
              </button>

              {isNotifOpen && (
                <div style={{
                  position: 'fixed',
                  top: 60,
                  left: 8,
                  right: 8,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 200,
                  overflow: 'hidden',
                  maxHeight: '70vh',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-surface-secondary)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-heading)' }}>
                      Notifications ({unreadCount})
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {unreadCount > 0 && (
                        <button onClick={markAllNotificationsAsRead} style={{ fontSize: '0.72rem', color: 'var(--electric-violet)', fontWeight: 600, cursor: 'pointer' }}>
                          Mark all read
                        </button>
                      )}
                      <button onClick={() => setIsNotifOpen(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div style={{ overflowY: 'auto', flex: 1 }}>
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => { markNotificationAsRead(notif.id); setIsNotifOpen(false); }}
                        style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', backgroundColor: notif.read ? 'transparent' : 'rgba(65,0,245,0.03)', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: notif.read ? 600 : 700, color: 'var(--text-heading)' }}>{notif.title}</span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>{notif.timestamp}</span>
                        </div>
                        <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </header>
      </>
    );
  }

  /* ── DESKTOP TOPBAR ────────────────────────────────────── */
  return (
    <>
      <header className="app-topbar">
        {/* Left: Workspace Badge + Currency */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-surface-secondary)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)',
            whiteSpace: 'nowrap'
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.4)', flexShrink: 0 }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Workspace:</span>
            <strong style={{ color: 'var(--text-heading)' }}>
              {currentProfile.assignedWorkspaceName || currentProfile.role}
            </strong>
          </div>

          {/* Currency Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 10px', borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)'
              }}
              title="Change reporting currency"
            >
              <Coins size={14} color="var(--electric-violet)" />
              <span>{currency} ({currencySymbol})</span>
              <ChevronDown size={12} color="var(--text-muted)" />
            </button>

            {isCurrencyMenuOpen && (
              <>
                <div
                  onClick={() => setIsCurrencyMenuOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                />
                <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 6, width: 140, backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 6, boxShadow: 'var(--shadow-lg)', zIndex: 50, padding: 4 }}>
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => { setCurrency(curr.code); setIsCurrencyMenuOpen(false); }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '7px 10px', borderRadius: 4, fontSize: '0.8rem',
                        backgroundColor: curr.code === currency ? 'var(--electric-violet-light)' : 'transparent',
                        color: curr.code === currency ? 'var(--electric-violet)' : 'var(--text-main)',
                        fontWeight: curr.code === currency ? 700 : 500, cursor: 'pointer'
                      }}
                    >
                      <span>{curr.label}</span>
                      {curr.code === currency && <CheckCircle size={13} color="var(--electric-violet)" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div style={{ flex: 1, maxWidth: 420, margin: '0 16px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, campaigns, deliverables..."
            style={{
              width: '100%', height: 38, paddingLeft: 38, paddingRight: 14,
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface-secondary)',
              fontSize: '0.84rem', color: 'var(--text-main)', outline: 'none',
              transition: 'border-color 0.15s ease'
            }}
          />
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* PWA Install Button */}
          <button
            onClick={() => setShowPwaModal(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)', backgroundColor: '#FFFFFF',
              fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)'
            }}
            title="Install Progressive Web App"
          >
            <Download size={14} color="var(--electric-violet)" />
            <span>PWA</span>
          </button>

          {/* Notifications Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              style={{
                width: 38, height: 38, borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', color: 'var(--text-muted)', cursor: 'pointer'
              }}
              aria-label="View notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444', boxShadow: '0 0 0 2px #FFFFFF' }} />
              )}
            </button>

            {isNotifOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 10, width: 340, backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 50, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-surface-secondary)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-heading)' }}>Activity Notifications ({unreadCount})</div>
                  {unreadCount > 0 && (
                    <button onClick={markAllNotificationsAsRead} style={{ fontSize: '0.72rem', color: 'var(--electric-violet)', fontWeight: 600, cursor: 'pointer' }}>
                      Mark all read
                    </button>
                  )}
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', backgroundColor: notif.read ? 'transparent' : 'rgba(65,0,245,0.03)', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: notif.read ? 600 : 700, color: 'var(--text-heading)' }}>{notif.title}</span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>{notif.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PWA Help Modal */}
      {showPwaModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,4,34,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', maxWidth: 480, width: '100%', padding: 28, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Download size={22} color="var(--electric-violet)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)' }}>Install D'Creativs PWA</h3>
              </div>
              <button onClick={() => setShowPwaModal(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              The Operations Hub is built as an installable Progressive Web Application with offline app shell support and native push notifications.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'iOS Safari:', text: 'Tap the Share icon in Safari ➔ Select "Add to Home Screen".' },
                { title: 'Android Chrome:', text: 'Tap the three dots menu ➔ Select "Install app" or "Add to Home screen".' },
                { title: 'Desktop Chrome / Edge:', text: 'Click the install icon in the address bar to install as a standalone app.' }
              ].map(({ title, text }) => (
                <div key={title} style={{ padding: 12, backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{text}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowPwaModal(false)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
