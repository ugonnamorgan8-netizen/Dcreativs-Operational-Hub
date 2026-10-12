import React, { useState, useRef, useEffect } from 'react';
import { CurrencyCode } from '../../types';
import { Table, BarChart3, AlertCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';

export interface BarChartItem {
  month: string;
  actual: number; // in thousands (e.g., 85 = $85k)
  target: number; // in thousands (e.g., 75 = $75k)
}

interface ResponsiveBarChartProps {
  data: BarChartItem[];
  currency?: CurrencyCode;
  currencySymbol?: string;
  currencyRate?: number;
  periodLabel?: string;
  isLoading?: boolean;
  error?: string | null;
}

export const ResponsiveBarChart: React.FC<ResponsiveBarChartProps> = ({
  data,
  currency = 'USD',
  currencySymbol = '$',
  currencyRate = 1,
  periodLabel = 'Q2 2026',
  isLoading = false,
  error = null
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(500);
  const [activeItem, setActiveItem] = useState<BarChartItem | null>(null);
  const [pinnedItem, setPinnedItem] = useState<BarChartItem | null>(null);
  const [showTableView, setShowTableView] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(true);
  const [animProgress, setAnimProgress] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate bars in on mount / data change
  useEffect(() => {
    setAnimating(true);
    setAnimProgress(0);
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(eased);
      if (progress < 1) requestAnimationFrame(tick);
      else setAnimating(false);
    };
    requestAnimationFrame(tick);
  }, [data]);

  if (isLoading) {
    return (
      <div style={{ height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--text-muted)' }}>
        <div className="spinner" style={{ width: 28, height: 28 }} />
        <span style={{ fontSize: '0.82rem' }}>Loading monthly revenue ledger...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#EF4444', backgroundColor: '#FEF2F2', borderRadius: 8, padding: 16 }}>
        <AlertCircle size={24} />
        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Chart Data Error</div>
        <div style={{ fontSize: '0.78rem', color: '#991B1B' }}>{error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-muted)' }}>
        <Info size={24} />
        <span style={{ fontSize: '0.82rem' }}>No financial records found for {periodLabel}.</span>
      </div>
    );
  }

  const convertedData = data.map((d) => ({
    ...d,
    actualConverted: Math.round(d.actual * currencyRate * 10) / 10,
    targetConverted: Math.round(d.target * currencyRate * 10) / 10
  }));

  const maxValue = Math.max(...convertedData.map((d) => Math.max(d.actualConverted, d.targetConverted)), 100);

  const chartHeight = 240;
  const isCompact = containerWidth < 420;
  const barGroupWidth = isCompact ? 28 : 48;
  const singleBarW = isCompact ? 11 : 18;
  const barGap = isCompact ? 4 : 8;

  // Compute Y-axis labels
  const ySteps = 4;
  const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => Math.round((maxValue / ySteps) * i));

  const displayItem = pinnedItem || activeItem;

  // SVG polyline points for trend line (actual values)
  const totalGroupCount = convertedData.length;
  const groupSpacing = totalGroupCount > 0 ? (containerWidth > 40 ? (containerWidth - 40) / totalGroupCount : 60) : 60;
  const linePoints = convertedData.map((d, i) => {
    const x = 28 + i * groupSpacing + groupSpacing / 2;
    const y = chartHeight - (d.actualConverted / maxValue) * chartHeight * animProgress + 4;
    return `${x},${y}`;
  }).join(' ');

  const overallVariance = convertedData.length > 0
    ? Math.round(((convertedData.reduce((s, d) => s + d.actualConverted, 0) - convertedData.reduce((s, d) => s + d.targetConverted, 0)) / convertedData.reduce((s, d) => s + d.targetConverted, 0)) * 100)
    : 0;

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      {/* Legend + Controls Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.76rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: 'linear-gradient(135deg, #885FFF, #4100F5)' }} />
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Actual ({currencySymbol})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#C7D2FE', border: '1px solid #A5B4FC' }} />
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Target ({currencySymbol})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 18, height: 2, background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: 2 }} />
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Trend</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Overall variance pill */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 10px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 700,
            backgroundColor: overallVariance >= 0 ? '#D1FAE5' : '#FEE2E2',
            color: overallVariance >= 0 ? '#059669' : '#DC2626'
          }}>
            {overallVariance >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {overallVariance >= 0 ? `+${overallVariance}%` : `${overallVariance}%`} vs Target
          </span>

          <button
            onClick={() => setShowTableView(!showTableView)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 6,
              border: '1px solid var(--border-subtle)',
              backgroundColor: showTableView ? 'var(--electric-violet-light)' : 'transparent',
              color: showTableView ? 'var(--electric-violet)' : 'var(--text-muted)',
              fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer'
            }}
            aria-label={showTableView ? 'Switch to chart' : 'Table view'}
          >
            {showTableView ? <BarChart3 size={12} /> : <Table size={12} />}
            <span>{showTableView ? 'Chart' : 'Table (A11y)'}</span>
          </button>
        </div>
      </div>

      {showTableView ? (
        <div
          className="hub-table-container"
          style={{
            overflowX: 'auto',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            WebkitOverflowScrolling: 'touch',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8
          }}
        >
          <table style={{ width: '100%', minWidth: 460, borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Month</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Actual ({currency})</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Target ({currency})</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Variance</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {convertedData.map((row) => {
                const v = Math.round(((row.actualConverted - row.targetConverted) / row.targetConverted) * 100);
                const pos = v >= 0;
                return (
                  <tr key={row.month} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.month}</td>
                    <td style={{ padding: '8px 12px' }}>{currencySymbol}{row.actualConverted.toLocaleString()}k</td>
                    <td style={{ padding: '8px 12px' }}>{currencySymbol}{row.targetConverted.toLocaleString()}k</td>
                    <td style={{ padding: '8px 12px', color: pos ? '#059669' : '#DC2626', fontWeight: 700 }}>{pos ? `+${v}%` : `${v}%`}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, backgroundColor: pos ? '#D1FAE5' : '#FEE2E2', color: pos ? '#059669' : '#DC2626' }}>
                        {pos ? '↗ On Track' : '↘ Under'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Y-axis labels */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 32, width: 36, display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', pointerEvents: 'none' }}>
            {yLabels.map((v, i) => (
              <span key={i} style={{ fontSize: '0.62rem', color: 'var(--text-subtle)', fontWeight: 600, lineHeight: 1 }}>
                {currencySymbol}{v}k
              </span>
            ))}
          </div>

          {/* Grid lines behind chart */}
          <div style={{ marginLeft: 36, position: 'relative', height: chartHeight + 32, borderLeft: '1px solid var(--border-subtle)' }}>
            {yLabels.slice(1).map((_, i) => (
              <div key={i} style={{
                position: 'absolute', left: 0, right: 0,
                bottom: 32 + ((i + 1) / ySteps) * chartHeight,
                borderTop: '1px dashed rgba(100,100,130,0.12)',
                pointerEvents: 'none'
              }} />
            ))}

            {/* SVG for trend line */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: chartHeight + 32, pointerEvents: 'none', overflow: 'visible' }}>
              <defs>
                <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
                <filter id="glowFilter">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {convertedData.length > 1 && (
                <>
                  <polyline
                    points={linePoints}
                    fill="none"
                    stroke="url(#trendGrad)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    filter="url(#glowFilter)"
                    opacity={animProgress}
                  />
                  {convertedData.map((d, i) => {
                    const x = i * groupSpacing + groupSpacing / 2;
                    const y = chartHeight - (d.actualConverted / maxValue) * chartHeight * animProgress + 4;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={displayItem?.month === d.month ? 5 : 3.5}
                        fill="#10B981"
                        stroke="#fff"
                        strokeWidth="2"
                        opacity={animProgress}
                        style={{ transition: 'r 0.15s ease' }}
                      />
                    );
                  })}
                </>
              )}
            </svg>

            {/* Bar groups */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: chartHeight,
              paddingBottom: 0,
              gap: 0,
              position: 'relative'
            }}>
              {convertedData.map((item, idx) => {
                const actualH = Math.max(4, (item.actualConverted / maxValue) * chartHeight * animProgress);
                const targetH = Math.max(4, (item.targetConverted / maxValue) * chartHeight * animProgress);
                const isActive = displayItem?.month === item.month;
                const variance = Math.round(((item.actualConverted - item.targetConverted) / item.targetConverted) * 100);
                const isPositive = variance >= 0;

                return (
                  <div
                    key={item.month}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      borderRadius: 8,
                      backgroundColor: isActive ? 'rgba(65,0,245,0.04)' : 'transparent',
                      paddingTop: 0
                    }}
                    onMouseEnter={() => !pinnedItem && setActiveItem(item)}
                    onMouseLeave={() => !pinnedItem && setActiveItem(null)}
                    onClick={() => setPinnedItem(pinnedItem?.month === item.month ? null : item)}
                    tabIndex={0}
                    onFocus={() => setActiveItem(item)}
                    onBlur={() => !pinnedItem && setActiveItem(null)}
                    aria-label={`${item.month}: Actual ${currencySymbol}${item.actualConverted}k, Target ${currencySymbol}${item.targetConverted}k`}
                    role="button"
                  >
                    {/* Pinned indicator dot */}
                    {pinnedItem?.month === item.month && (
                      <div style={{
                        position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
                        width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--electric-violet)'
                      }} />
                    )}

                    {/* Inline variance tag above bars */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
                        backgroundColor: isPositive ? '#10B981' : '#EF4444',
                        color: '#fff', fontSize: '0.6rem', fontWeight: 800,
                        padding: '2px 6px', borderRadius: 9999, whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 10
                      }}>
                        {isPositive ? `+${variance}%` : `${variance}%`}
                      </div>
                    )}

                    {/* Bars container */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: barGap, marginTop: 'auto' }}>
                      {/* Target bar */}
                      <div style={{
                        width: singleBarW,
                        height: targetH,
                        background: isActive
                          ? 'linear-gradient(180deg, #A5B4FC 0%, #818CF8 100%)'
                          : 'linear-gradient(180deg, #E0E7FF 0%, #C7D2FE 100%)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'background 0.2s ease',
                        border: isActive ? '1.5px solid #818CF8' : '1px solid #C7D2FE',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {/* Shimmer on active */}
                        {isActive && (
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                            animation: 'shimmer 1.5s infinite'
                          }} />
                        )}
                      </div>

                      {/* Actual bar */}
                      <div style={{
                        width: singleBarW,
                        height: actualH,
                        background: isActive
                          ? 'linear-gradient(180deg, #A78BFA 0%, #4100F5 100%)'
                          : 'linear-gradient(180deg, #885FFF 0%, #4100F5 100%)',
                        borderRadius: '4px 4px 0 0',
                        boxShadow: isActive
                          ? '0 0 20px rgba(65, 0, 245, 0.6), 0 4px 14px rgba(65, 0, 245, 0.4)'
                          : '0 2px 8px rgba(65, 0, 245, 0.3)',
                        transition: 'box-shadow 0.2s ease, background 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {isActive && (
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                            animation: 'shimmer 1.2s infinite'
                          }} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div style={{ display: 'flex', height: 32, borderTop: '1px solid var(--border-subtle)', marginTop: 0 }}>
              {convertedData.map((item) => {
                const isActive = displayItem?.month === item.month;
                return (
                  <div key={item.month} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{
                      fontSize: isCompact ? '0.65rem' : '0.75rem',
                      color: isActive ? 'var(--electric-violet)' : 'var(--text-muted)',
                      fontWeight: isActive ? 800 : 600,
                      transition: 'all 0.15s ease'
                    }}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Detail card: hover or pinned */}
      {displayItem && !showTableView && (() => {
        const variance = Math.round(((displayItem.actual - displayItem.target) / displayItem.target) * 100);
        const isPos = variance >= 0;
        return (
          <div style={{
            marginTop: 14,
            padding: '12px 16px',
            background: 'linear-gradient(135deg, var(--bg-surface-secondary) 0%, rgba(65,0,245,0.04) 100%)',
            border: `1.5px solid ${isPos ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12, animation: 'fadeIn 0.15s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: isPos ? 'linear-gradient(135deg, #D1FAE5, #A7F3D0)' : 'linear-gradient(135deg, #FEE2E2, #FECACA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {isPos ? <TrendingUp size={18} color="#059669" /> : <TrendingDown size={18} color="#DC2626" />}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-heading)' }}>
                  {displayItem.month} Revenue
                  {pinnedItem?.month === displayItem.month && (
                    <span style={{ marginLeft: 6, fontSize: '0.68rem', color: 'var(--electric-violet)', fontWeight: 700 }}>📌 PINNED</span>
                  )}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Actual: <strong style={{ color: 'var(--electric-violet)' }}>{currencySymbol}{Math.round(displayItem.actual * currencyRate).toLocaleString()}k</strong>
                  {' '}· Target: <strong>{currencySymbol}{Math.round(displayItem.target * currencyRate).toLocaleString()}k</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontWeight: 600 }}>VARIANCE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isPos ? '#059669' : '#DC2626' }}>
                  {isPos ? `+${variance}%` : `${variance}%`}
                </div>
              </div>
              <div style={{
                fontSize: '0.72rem', fontWeight: 700,
                padding: '5px 12px', borderRadius: 9999,
                backgroundColor: isPos ? '#D1FAE5' : '#FEE2E2',
                color: isPos ? '#059669' : '#DC2626'
              }}>
                {isPos ? '↗ Ahead of Goal' : '↘ Under Target'}
              </div>
              {pinnedItem?.month === displayItem.month && (
                <button
                  onClick={() => setPinnedItem(null)}
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                >
                  Unpin
                </button>
              )}
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
