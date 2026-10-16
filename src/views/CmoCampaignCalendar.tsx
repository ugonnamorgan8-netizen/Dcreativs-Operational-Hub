import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Video,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  BarChart2,
  PieChart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CmoCampaignCalendar: React.FC = () => {
  const { campaigns, setIsNewCampaignModalOpen } = useApp();
  const [viewMode, setViewMode] = useState<'Month' | 'Week' | 'Agenda'>('Month');
  const [selectedWeek, setSelectedWeek] = useState<number>(2);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  interface CalendarDayItem {
    day: number;
    isCurrentMonth: boolean;
    isHighlighted?: boolean;
    events: Array<{ title: string; color: string; isMain?: boolean }>;
  }

  // Days array for June 2026
  const calendarDays: CalendarDayItem[] = [
    { day: 31, isCurrentMonth: false, events: [] },
    { day: 1, isCurrentMonth: true, events: [{ title: 'Orbit Launch Prep', color: '#4100F5' }] },
    { day: 2, isCurrentMonth: true, events: [{ title: 'Social Blast — Aero', color: '#885FFF' }] },
    {
      day: 3,
      isCurrentMonth: true,
      events: [
        { title: 'Review Cycle #4', color: '#4100F5' },
        { title: 'Press Release', color: '#10B981' }
      ]
    },
    { day: 4, isCurrentMonth: true, events: [] },
    { day: 5, isCurrentMonth: true, events: [{ title: 'Internal Sync', color: '#F59E0B' }] },
    { day: 6, isCurrentMonth: true, events: [] },
    { day: 7, isCurrentMonth: true, events: [] },
    {
      day: 8,
      isCurrentMonth: true,
      isHighlighted: true,
      events: [{ title: 'MAIN LAUNCH — ORBIT', color: '#4100F5', isMain: true }]
    },
    { day: 9, isCurrentMonth: true, events: [] },
    { day: 10, isCurrentMonth: true, events: [] },
    { day: 11, isCurrentMonth: true, events: [] },
    { day: 12, isCurrentMonth: true, events: [{ title: 'Recap Video Edit', color: '#885FFF' }] },
    { day: 13, isCurrentMonth: true, events: [] }
  ];

  // Merge in dynamically added campaigns from state
  campaigns.forEach((camp) => {
    const foundDay = calendarDays.find((d) => d.day === camp.dayOfMonth && d.isCurrentMonth);
    if (foundDay) {
      if (!foundDay.events.some((e) => e.title === camp.title)) {
        foundDay.events.push({ title: camp.title, color: camp.color });
      }
    }
  });

  const displayedDays = viewMode === 'Week'
    ? calendarDays.slice((selectedWeek - 1) * 7, selectedWeek * 7)
    : calendarDays;

  return (
    <div className="hub-view-container" style={{ minWidth: 0, maxWidth: '100%', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
            Campaign Calendar
          </h1>
          <span
            style={{
              backgroundColor: 'rgba(65, 0, 245, 0.08)',
              color: 'var(--electric-violet)',
              border: '1px solid rgba(65, 0, 245, 0.2)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <CalendarIcon size={14} />
            <span>JUNE 2026</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, maxWidth: '100%' }}>
          {/* View Mode Toggle */}
          <div style={{ display: 'inline-flex', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 2 }}>
            {(['Month', 'Week', 'Agenda'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 4,
                  fontSize: '0.8rem',
                  fontWeight: viewMode === mode ? 700 : 500,
                  backgroundColor: viewMode === mode ? 'var(--electric-violet-light)' : 'transparent',
                  color: viewMode === mode ? 'var(--electric-violet)' : 'var(--text-muted)'
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsNewCampaignModalOpen(true)}
            className="btn-primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            <Plus size={16} />
            <span>NEW CAMPAIGN</span>
          </button>
        </div>
      </div>

      {/* Interactive Calendar Grid or Agenda */}
      {viewMode === 'Agenda' ? (
        <div className="hub-card" style={{ maxWidth: '100%', minWidth: 0 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 14 }}>
            June 2026 Campaign Agenda
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {calendarDays
              .filter((d) => d.events.length > 0)
              .map((d, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    padding: 12,
                    backgroundColor: 'var(--bg-surface-secondary)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 10
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0, flex: '1 1 200px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--electric-violet)', width: 44, flexShrink: 0 }}>
                      Jun {d.day}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      {d.events.map((e, eIdx) => (
                        <div key={eIdx} style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)', wordBreak: 'break-word' }}>
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="badge badge-healthy" style={{ flexShrink: 0 }}>Active Milestone</span>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="hub-card" style={{ padding: 0, overflow: 'hidden', maxWidth: '100%', minWidth: 0 }}>
          {/* Card Top Sub-Header & Mobile Scroll Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: '#FAF5FF',
              borderBottom: '1px solid #EDE9FE',
              fontSize: '0.76rem',
              flexWrap: 'wrap',
              gap: 8
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--text-heading)' }}>
              <Sparkles size={14} color="var(--electric-violet)" />
              <span>{viewMode === 'Week' ? `Week ${selectedWeek} Milestone Track` : 'June 2026 Full View (14 Days)'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--lavender)', fontWeight: 600 }}>
              <span>Swipe horizontally to view all 7 days</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Week Selection Navigation if in Week Mode */}
          {viewMode === 'Week' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => setSelectedWeek(1)}
                  disabled={selectedWeek === 1}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: selectedWeek === 1 ? 'var(--bg-surface-secondary)' : '#FFFFFF',
                    color: selectedWeek === 1 ? 'var(--text-subtle)' : 'var(--text-heading)',
                    cursor: selectedWeek === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Previous Week"
                >
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {selectedWeek === 1 ? 'Week 1: May 31 – Jun 6, 2026' : 'Week 2: Jun 7 – Jun 13, 2026 (Launch Week)'}
                </span>
                <button
                  onClick={() => setSelectedWeek(2)}
                  disabled={selectedWeek === 2}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: selectedWeek === 2 ? 'var(--bg-surface-secondary)' : '#FFFFFF',
                    color: selectedWeek === 2 ? 'var(--text-subtle)' : 'var(--text-heading)',
                    cursor: selectedWeek === 2 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Next Week"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                {selectedWeek === 2 ? 'Active Milestone Week' : 'Pre-Launch Planning'}
              </span>
            </div>
          )}

          {/* Horizontally Scrollable Calendar Container */}
          <div
            style={{
              width: '100%',
              maxWidth: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x pan-y'
            }}
          >
            {/* Common minimum width container so Day Header and Matrix align 1:1 on all screen sizes */}
            <div style={{ minWidth: 720, width: '100%' }}>
              {/* Day of Week Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    style={{
                      padding: '12px 14px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                      textAlign: 'center'
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  gridAutoRows: 'minmax(120px, auto)'
                }}
              >
                {displayedDays.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderRight: (idx + 1) % 7 === 0 ? 'none' : '1px solid var(--border-light)',
                      borderBottom: '1px solid var(--border-light)',
                      padding: 10,
                      backgroundColor: item.isCurrentMonth ? '#FFFFFF' : '#FAFAFA',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: item.isCurrentMonth ? 'var(--text-heading)' : 'var(--text-subtle)'
                        }}
                      >
                        {item.day < 10 ? `0${item.day}` : item.day}
                      </span>
                      {item.isHighlighted && (
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--electric-violet)' }} />
                      )}
                    </div>

                    {/* Event Tags */}
                    {item.events.map((evt, eIdx) => (
                      <div
                        key={eIdx}
                        onClick={() => alert(`Campaign details: ${evt.title} (June ${item.day}, 2026)`)}
                        style={{
                          backgroundColor: evt.color,
                          color: '#FFFFFF',
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          boxShadow: evt.isMain ? '0 2px 8px rgba(65, 0, 245, 0.3)' : 'none',
                          border: evt.isMain ? '1.5px solid #FFFFFF' : 'none',
                          cursor: 'pointer'
                        }}
                        title={evt.title}
                      >
                        {evt.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom 3 Metric Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
        {/* Social Reach Card */}
        <div className="hub-card" style={{ background: 'linear-gradient(135deg, #05081E 0%, #0F172A 100%)', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399' }}>
              <TrendingUp size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399' }}>+18% GROWTH</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>2.4M</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em', marginTop: 2 }}>TOTAL IMPRESSIONS</div>
          </div>
        </div>

        {/* Upcoming Releases Card */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(136,95,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lavender)' }}>
              <BarChart2 size={20} />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>Upcoming Releases</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: 'rgba(65, 0, 245, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--electric-violet)', flexShrink: 0 }}>
                <Video size={16} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  Case Study: Marvel SMS
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Scheduled for June 12
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                <FileText size={16} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  Blog: AI in Creative Tech
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Drafting · Due June 15
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Allocation Card */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(65,0,245,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--electric-violet)', flexShrink: 0 }}>
              <PieChart size={20} />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>Budget Allocation</span>
          </div>

          <div style={{ width: '100%', height: 12, borderRadius: 9999, overflow: 'hidden', display: 'flex', marginTop: 10 }}>
            <div style={{ width: '65%', backgroundColor: '#4100F5' }} title="Paid Ads 65%" />
            <div style={{ width: '20%', backgroundColor: '#885FFF' }} title="Production 20%" />
            <div style={{ width: '15%', backgroundColor: '#C7D2FE' }} title="Misc 15%" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4100F5', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap' }}>PAID ADS (65%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#885FFF', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap' }}>PRODUCTION (20%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#C7D2FE', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap' }}>MISC (15%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
