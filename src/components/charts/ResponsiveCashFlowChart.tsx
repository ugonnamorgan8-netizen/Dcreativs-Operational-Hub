import React, { useState, useRef, useEffect } from 'react';
import { CurrencyCode } from '../../types';
import { Table, LineChart, AlertCircle, Info } from 'lucide-react';

export interface CashFlowDataPoint {
  month: string;
  revenue: number; // in thousands (e.g., 280 = $280k)
  expenses: number; // in thousands (e.g., 185 = $185k)
}

interface ResponsiveCashFlowChartProps {
  data: CashFlowDataPoint[];
  currency?: CurrencyCode;
  currencySymbol?: string;
  currencyRate?: number;
  isLoading?: boolean;
  error?: string | null;
}

export const ResponsiveCashFlowChart: React.FC<ResponsiveCashFlowChartProps> = ({
  data,
  currency = 'USD',
  currencySymbol = '$',
  currencyRate = 1,
  isLoading = false,
  error = null
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(550);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showTableView, setShowTableView] = useState<boolean>(false);

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

  if (isLoading) {
    return (
      <div
        style={{
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          color: 'var(--text-muted)'
        }}
      >
        <div className="spinner" style={{ width: 28, height: 28 }} />
        <span style={{ fontSize: '0.82rem' }}>Reconciling cash flow journals...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          color: '#EF4444',
          backgroundColor: '#FEF2F2',
          borderRadius: 8,
          padding: 16
        }}
      >
        <AlertCircle size={24} />
        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Cash Flow Error</div>
        <div style={{ fontSize: '0.78rem', color: '#991B1B' }}>{error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          color: 'var(--text-muted)'
        }}
      >
        <Info size={24} />
        <span style={{ fontSize: '0.82rem' }}>No cash flow records available.</span>
      </div>
    );
  }

  // Dimensions
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;
  const chartHeight = 220;
  const graphWidth = Math.max(containerWidth - paddingLeft - paddingRight, 100);
  const graphHeight = chartHeight - paddingTop - paddingBottom;

  const convertedData = data.map((d) => ({
    ...d,
    revenueConverted: Math.round(d.revenue * currencyRate),
    expensesConverted: Math.round(d.expenses * currencyRate)
  }));

  const maxVal = Math.max(
    ...convertedData.map((d) => Math.max(d.revenueConverted, d.expensesConverted)),
    100
  );
  const minVal = 0;

  // Coordinate computation helpers
  const getX = (index: number) => {
    if (convertedData.length <= 1) return paddingLeft + graphWidth / 2;
    return paddingLeft + (index / (convertedData.length - 1)) * graphWidth;
  };

  const getY = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal || 1);
    return paddingTop + graphHeight - ratio * graphHeight;
  };

  // Generate SVG path strings
  const revenuePoints = convertedData.map((d, i) => `${getX(i)},${getY(d.revenueConverted)}`).join(' ');
  const expensesPoints = convertedData.map((d, i) => `${getX(i)},${getY(d.expensesConverted)}`).join(' ');

  // Area path for revenue gradient
  const areaRevenue = `M ${getX(0)},${getY(convertedData[0].revenueConverted)} ` +
    convertedData.slice(1).map((d, i) => `L ${getX(i + 1)},${getY(d.revenueConverted)}`).join(' ') +
    ` L ${getX(convertedData.length - 1)},${paddingTop + graphHeight} L ${getX(0)},${paddingTop + graphHeight} Z`;

  // Grid line ticks
  const ticks = [0, 0.25, 0.5, 0.75, 1];

  const activeDataPoint = activeIndex !== null ? convertedData[activeIndex] : null;

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      {/* Chart Top Controls & Legends */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 8
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4100F5' }} />
            <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>
              REVENUE ({currencySymbol})
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 3, backgroundColor: '#885FFF' }} />
            <span style={{ color: 'var(--text-muted)' }}>
              EXPENSES ({currencySymbol})
            </span>
          </div>
        </div>

        {/* Accessible Table View Toggle */}
        <button
          onClick={() => setShowTableView(!showTableView)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid var(--border-subtle)',
            backgroundColor: showTableView ? 'var(--electric-violet-light)' : 'transparent',
            color: showTableView ? 'var(--electric-violet)' : 'var(--text-muted)',
            fontSize: '0.74rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          aria-label={showTableView ? 'Switch to graphic cash flow curve' : 'Switch to cash flow table'}
        >
          {showTableView ? <LineChart size={13} /> : <Table size={13} />}
          <span>{showTableView ? 'Graph View' : 'Table View (A11y)'}</span>
        </button>
      </div>

      {showTableView ? (
        /* Accessible Data Table Alternative */
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 6 }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.8rem',
              textAlign: 'left'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '8px 12px', fontWeight: 700 }}>Month</th>
                <th style={{ padding: '8px 12px', fontWeight: 700 }}>Revenue ({currency})</th>
                <th style={{ padding: '8px 12px', fontWeight: 700 }}>Expenses ({currency})</th>
                <th style={{ padding: '8px 12px', fontWeight: 700 }}>Net Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {convertedData.map((row) => {
                const net = row.revenueConverted - row.expensesConverted;
                const isPositive = net >= 0;
                return (
                  <tr key={row.month} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.month}</td>
                    <td style={{ padding: '8px 12px' }}>
                      {currencySymbol}{row.revenueConverted.toLocaleString()}k
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      {currencySymbol}{row.expensesConverted.toLocaleString()}k
                    </td>
                    <td style={{ padding: '8px 12px', color: isPositive ? '#059669' : '#DC2626', fontWeight: 700 }}>
                      {isPositive ? `+${currencySymbol}${net.toLocaleString()}k` : `-${currencySymbol}${Math.abs(net).toLocaleString()}k`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Responsive SVG Line Curve */
        <div style={{ width: '100%', height: chartHeight, position: 'relative' }}>
          <svg
            width="100%"
            height={chartHeight}
            viewBox={`0 0 ${containerWidth} ${chartHeight}`}
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="cfRevenueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4100F5" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#4100F5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines & Y-Axis Labels */}
            {ticks.map((t, idx) => {
              const yVal = paddingTop + graphHeight - t * graphHeight;
              const tickAmount = Math.round(t * maxVal);
              return (
                <g key={idx}>
                  <line
                    x1={paddingLeft}
                    y1={yVal}
                    x2={containerWidth - paddingRight}
                    y2={yVal}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                    strokeDasharray={idx === 0 ? 'none' : '3 3'}
                  />
                  <text
                    x={paddingLeft - 8}
                    y={yVal + 3}
                    fill="#94A3B8"
                    fontSize="10"
                    textAnchor="end"
                  >
                    {currencySymbol}{tickAmount}k
                  </text>
                </g>
              );
            })}

            {/* Revenue Gradient Fill Area */}
            <path d={areaRevenue} fill="url(#cfRevenueGlow)" />

            {/* Expenses Polyline */}
            <polyline
              fill="none"
              stroke="#885FFF"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              points={expensesPoints}
            />

            {/* Revenue Polyline */}
            <polyline
              fill="none"
              stroke="#4100F5"
              strokeWidth="3"
              points={revenuePoints}
            />

            {/* Interactive Data Nodes */}
            {convertedData.map((d, i) => {
              const x = getX(i);
              const yRev = getY(d.revenueConverted);
              const isSelected = activeIndex === i;

              return (
                <g
                  key={i}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveIndex(isSelected ? null : i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Vertical Guide Line when selected */}
                  {isSelected && (
                    <line
                      x1={x}
                      y1={paddingTop}
                      x2={x}
                      y2={paddingTop + graphHeight}
                      stroke="var(--electric-violet)"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Revenue Node */}
                  <circle
                    cx={x}
                    cy={yRev}
                    r={isSelected ? 6 : 4}
                    fill="#FFFFFF"
                    stroke="#4100F5"
                    strokeWidth={isSelected ? 3 : 2}
                  />

                  {/* X-axis Month Label */}
                  <text
                    x={x}
                    y={paddingTop + graphHeight + 18}
                    fill={isSelected ? '#4100F5' : '#64748B'}
                    fontSize="10.5"
                    fontWeight={isSelected ? '700' : '600'}
                    textAnchor="middle"
                  >
                    {d.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Scrubbed Details Box */}
      {activeDataPoint && !showTableView && (
        <div
          style={{
            marginTop: 10,
            padding: '8px 14px',
            backgroundColor: 'var(--bg-surface-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            animation: 'fadeIn 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-heading)' }}>
              {activeDataPoint.month}:
            </span>
            <span style={{ fontSize: '0.8rem', color: '#4100F5', fontWeight: 600 }}>
              Revenue: {currencySymbol}{activeDataPoint.revenueConverted.toLocaleString()}k
            </span>
            <span style={{ fontSize: '0.8rem', color: '#885FFF', fontWeight: 600 }}>
              Expenses: {currencySymbol}{activeDataPoint.expensesConverted.toLocaleString()}k
            </span>
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>
            {activeDataPoint.revenueConverted >= activeDataPoint.expensesConverted ? (
              <span style={{ color: '#059669' }}>
                Net Positive: +{currencySymbol}{(activeDataPoint.revenueConverted - activeDataPoint.expensesConverted).toLocaleString()}k
              </span>
            ) : (
              <span style={{ color: '#DC2626' }}>
                Net Deficit: -{currencySymbol}{(activeDataPoint.expensesConverted - activeDataPoint.revenueConverted).toLocaleString()}k
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
