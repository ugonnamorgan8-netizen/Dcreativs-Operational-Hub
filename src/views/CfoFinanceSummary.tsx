import React from 'react';
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Download,
  CheckCircle,
  FileText,
  Clock,
  PieChart,
  Coins
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResponsiveCashFlowChart, CashFlowDataPoint } from '../components/charts/ResponsiveCashFlowChart';
import { ResponsiveDonutChart, DonutSlice } from '../components/charts/ResponsiveDonutChart';

export const CfoFinanceSummary: React.FC = () => {
  const {
    invoices,
    markInvoicePaid,
    setIsManageInvoicesModalOpen,
    addAuditEvent,
    currency,
    currencyRate,
    currencySymbol
  } = useApp();

  const pendingOrOverdue = invoices.filter((i) => i.status !== 'PAID').slice(0, 4);

  // Dynamic calculation reconciling with invoices
  const totalOutstandingUSD = invoices
    .filter((i) => i.status !== 'PAID')
    .reduce((sum, i) => sum + i.amount, 0);

  const baseRevenueUSD = 1284500;
  const baseMarginPercent = 42.8;

  // Monthly Cash Flow records
  const cashFlowData: CashFlowDataPoint[] = [
    { month: 'Jan', revenue: 195, expenses: 140 },
    { month: 'Feb', revenue: 210, expenses: 155 },
    { month: 'Mar', revenue: 245, expenses: 165 },
    { month: 'Apr', revenue: 275, expenses: 180 },
    { month: 'May', revenue: 310, expenses: 195 },
    { month: 'Jun', revenue: 345, expenses: 205 }
  ];

  // Expense breakdown slices in base USD
  const expenseSlices: DonutSlice[] = [
    { label: 'Payroll & Retainers', amount: 480000, color: '#4100F5' },
    { label: 'Software, Cloud & AI', amount: 140000, color: '#885FFF' },
    { label: 'Studio Equipment & Rent', amount: 95000, color: '#38BDF8' },
    { label: 'Marketing, Events & Ads', amount: 62000, color: '#10B981' }
  ];

  const handleExportFinancialReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Invoice Code,Client,Project,Base Amount (USD),Converted Amount,Currency,Status,DueDate\n' +
      invoices
        .map(
          (i) =>
            `${i.invoiceCode},"${i.client}","${i.project}",${i.amount},${Math.round(i.amount * currencyRate)},${currency},${i.status},${i.dueDate}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dcreativs_Financial_Ledger_${currency}_Q2_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAuditEvent('cfo.report.export', 'financial_ledger', `Exported complete financial accounts ledger in ${currency}`);
  };

  return (
    <div className="hub-view-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
            Financial Overview
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
            FINANCIAL HEALTH NOMINAL
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--electric-violet)' }}>
            REPORTING IN: {currency} ({currencySymbol})
          </span>
          <button
            onClick={handleExportFinancialReport}
            className="btn-primary"
          >
            <Download size={16} />
            <span>EXPORT LEDGER</span>
          </button>
        </div>
      </div>

      {/* 3 Reconciled Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {/* Card 1: Total Revenue */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(65,0,245,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--electric-violet)' }}>
              <DollarSign size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: 2 }}>↗ +12.4%</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
              {currencySymbol}{Math.round(baseRevenueUSD * currencyRate).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>TOTAL REVENUE (Q2)</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 9999, backgroundColor: 'var(--electric-violet-light)' }}>
              <div style={{ width: '78%', height: '100%', borderRadius: 9999, backgroundColor: 'var(--electric-violet)' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>78%</span>
          </div>
        </div>

        {/* Card 2: Operating Margin */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <TrendingUp size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: 2 }}>↗ +2.1%</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
              {baseMarginPercent}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>OPERATING MARGIN</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 9999, backgroundColor: '#D1FAE5' }}>
              <div style={{ width: `${baseMarginPercent}%`, height: '100%', borderRadius: 9999, backgroundColor: '#10B981' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{baseMarginPercent}%</span>
          </div>
        </div>

        {/* Card 3: Outstanding Invoices */}
        <div className="hub-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(245,158,11,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
              <AlertTriangle size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: pendingOrOverdue.length > 0 ? '#D97706' : '#059669', display: 'flex', alignItems: 'center', gap: 2 }}>
              {pendingOrOverdue.length} Unsettled
            </span>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
              {currencySymbol}{Math.round(totalOutstandingUSD * currencyRate).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>OUTSTANDING INVOICES</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 9999, backgroundColor: '#FEF3C7' }}>
              <div style={{ width: '45%', height: '100%', borderRadius: 9999, backgroundColor: '#F59E0B' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>45%</span>
          </div>
        </div>
      </div>

      {/* 1. Primary Full-Width Analytical Card: Cash Flow Performance (Decoupled from Side-by-Side Squeeze) */}
      <div className="hub-card hub-hero-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', fontWeight: 800 }}>
              Cash Flow Performance & Run-Rate
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Comparing actual monthly revenue against operating burn rate in {currency} ({currencySymbol})
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.76rem',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#D1FAE5',
                padding: '4px 12px',
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
              Net Operating Surplus: +{currencySymbol}{Math.round(27000 * currencyRate).toLocaleString()}
            </span>
          </div>
        </div>

        <ResponsiveCashFlowChart
          data={cashFlowData}
          currency={currency}
          currencySymbol={currencySymbol}
          currencyRate={currencyRate}
        />
      </div>

      {/* 2. Operational Subgrid: Top Unsettled Invoices + Expense Breakdown (Independent Dedicated Space) */}
      <div className="hub-subgrid-pair">
        {/* Top Pending Invoices Card */}
        <div className="hub-card" style={{ background: 'linear-gradient(135deg, #05081E 0%, #0F172A 100%)', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
              Top Unsettled Invoices ({pendingOrOverdue.length})
            </h4>
            <span style={{ fontSize: '0.72rem', color: '#A5B4FC', fontWeight: 600 }}>Click Settle to Reconcile</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {pendingOrOverdue.map((inv) => (
              <div
                key={inv.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF' }}>{inv.project}</div>
                  <div style={{ fontSize: '0.74rem', color: inv.status === 'OVERDUE' ? '#FCD34D' : '#94A3B8' }}>
                    {inv.invoiceCode} · {inv.client} {inv.overdueDays ? `(${inv.overdueDays}d Overdue)` : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: '0.96rem', fontWeight: 700, color: inv.status === 'OVERDUE' ? '#F59E0B' : '#A5B4FC' }}>
                    {currencySymbol}{Math.round(inv.amount * currencyRate).toLocaleString()}
                  </div>
                  <button
                    onClick={() => markInvoicePaid(inv.id)}
                    title="Settle Invoice"
                    style={{
                      padding: '5px 10px',
                      borderRadius: 4,
                      backgroundColor: 'rgba(16, 185, 129, 0.25)',
                      color: '#34D399',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      border: '1px solid rgba(52, 211, 153, 0.4)',
                      cursor: 'pointer'
                    }}
                  >
                    Settle
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsManageInvoicesModalOpen(true)}
            style={{
              marginTop: 18,
              width: '100%',
              padding: '12px 0 4px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#C7D2FE',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              textAlign: 'center',
              background: 'none',
              border: 'none',
              borderTopWidth: 1,
              borderTopStyle: 'solid',
              borderTopColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            MANAGE ALL INVOICES ➔
          </button>
        </div>

        {/* Expense Breakdown Donut Card */}
        <div className="hub-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 6 }}>
            Expense Breakdown ({currency})
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 14 }}>
            Dynamic allocation across core operational cost centers
          </p>

          <ResponsiveDonutChart
            slices={expenseSlices}
            currency={currency}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </div>
      </div>
    </div>
  );
};
