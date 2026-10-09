import React, { useState } from 'react';
import { CurrencyCode } from '../../types';
import { Table, PieChart, Info } from 'lucide-react';

export interface DonutSlice {
  label: string;
  amount: number; // in USD base
  color: string;
}

interface ResponsiveDonutChartProps {
  slices: DonutSlice[];
  currency?: CurrencyCode;
  currencySymbol?: string;
  currencyRate?: number;
  isLoading?: boolean;
}

export const ResponsiveDonutChart: React.FC<ResponsiveDonutChartProps> = ({
  slices,
  currency = 'USD',
  currencySymbol = '$',
  currencyRate = 1,
  isLoading = false
}) => {
  const [activeSliceIndex, setActiveSliceIndex] = useState<number | null>(null);
  const [showTableView, setShowTableView] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ width: 24, height: 24 }} />
      </div>
    );
  }

  if (!slices || slices.length === 0) {
    return (
      <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <Info size={20} />
        <span style={{ fontSize: '0.8rem', marginLeft: 8 }}>No expense categories logged.</span>
      </div>
    );
  }

  const total = slices.reduce((acc, curr) => acc + curr.amount, 0);
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ~238.76

  let cumulativePercent = 0;
  const computedSlices = slices.map((s, idx) => {
    const percent = total > 0 ? s.amount / total : 0;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativePercent * circumference;
    cumulativePercent += percent;

    return {
      ...s,
      convertedAmount: Math.round(s.amount * currencyRate),
      percent: Math.round(percent * 1000) / 10,
      strokeDasharray,
      strokeDashoffset,
      index: idx
    };
  });

  const activeSlice = activeSliceIndex !== null ? computedSlices[activeSliceIndex] : null;

  return (
    <div style={{ width: '100%' }}>
      {/* Table Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <button
          onClick={() => setShowTableView(!showTableView)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            borderRadius: 4,
            border: '1px solid var(--border-subtle)',
            backgroundColor: showTableView ? 'var(--electric-violet-light)' : 'transparent',
            color: showTableView ? 'var(--electric-violet)' : 'var(--text-muted)',
            fontSize: '0.7rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          aria-label={showTableView ? 'Switch to donut graphic' : 'Switch to expense table'}
        >
          {showTableView ? <PieChart size={12} /> : <Table size={12} />}
          <span>{showTableView ? 'Donut' : 'Table'}</span>
        </button>
      </div>

      {showTableView ? (
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 6 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '6px 10px' }}>Category</th>
                <th style={{ padding: '6px 10px' }}>Amount ({currency})</th>
                <th style={{ padding: '6px 10px' }}>Share %</th>
              </tr>
            </thead>
            <tbody>
              {computedSlices.map((s) => (
                <tr key={s.label} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: s.color }} />
                    <strong>{s.label}</strong>
                  </td>
                  <td style={{ padding: '6px 10px' }}>
                    {currencySymbol}{s.convertedAmount.toLocaleString()}
                  </td>
                  <td style={{ padding: '6px 10px', fontWeight: 600 }}>
                    {s.percent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          {/* SVG Donut */}
          <div style={{ position: 'relative', width: 140, height: 140 }}>
            <svg
              viewBox="0 0 100 100"
              style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', overflow: 'visible' }}
            >
              {computedSlices.map((slice) => {
                const isSelected = activeSliceIndex === slice.index;
                return (
                  <circle
                    key={slice.label}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={isSelected ? 16 : 13}
                    strokeDasharray={slice.strokeDasharray}
                    strokeDashoffset={slice.strokeDashoffset}
                    style={{
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                      filter: isSelected ? 'drop-shadow(0 2px 6px rgba(65, 0, 245, 0.4))' : 'none'
                    }}
                    onMouseEnter={() => setActiveSliceIndex(slice.index)}
                    onMouseLeave={() => setActiveSliceIndex(null)}
                    onClick={() => setActiveSliceIndex(isSelected ? null : slice.index)}
                    tabIndex={0}
                    aria-label={`${slice.label}: ${currencySymbol}${slice.convertedAmount} (${slice.percent}%)`}
                  />
                );
              })}
            </svg>

            {/* Inner Center Label */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {activeSlice ? activeSlice.label : 'TOTAL'}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
                {activeSlice
                  ? `${activeSlice.percent}%`
                  : `${currencySymbol}${Math.round(total * currencyRate).toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {computedSlices.map((slice) => {
              const isSelected = activeSliceIndex === slice.index;
              return (
                <div
                  key={slice.label}
                  onClick={() => setActiveSliceIndex(isSelected ? null : slice.index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    padding: '4px 8px',
                    borderRadius: 4,
                    backgroundColor: isSelected ? 'var(--bg-surface-secondary)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: slice.color }} />
                    <span style={{ color: isSelected ? 'var(--text-heading)' : 'var(--text-muted)', fontWeight: isSelected ? 700 : 500 }}>
                      {slice.label}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                    {currencySymbol}{slice.convertedAmount.toLocaleString()}
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 6 }}>
                      ({slice.percent}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
