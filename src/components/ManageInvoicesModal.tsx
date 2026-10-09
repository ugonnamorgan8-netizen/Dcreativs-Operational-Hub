import React, { useState } from 'react';
import { X, DollarSign, CheckCircle2, AlertTriangle, Plus, Search, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InvoiceItem } from '../types';

export const ManageInvoicesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { invoices, markInvoicePaid } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'OVERDUE' | 'PENDING' | 'PAID'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = invoices.filter((inv) => {
    if (filterStatus !== 'ALL' && inv.status !== filterStatus) return false;
    if (
      searchTerm &&
      !inv.client.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !inv.invoiceCode.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 4, 34, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', fontWeight: 700 }}>
              CFO Invoicing & Accounts Receivable Desk
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Track milestones, enforce credit control, and settle accounts receivable
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            {(['ALL', 'OVERDUE', 'PENDING', 'PAID'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontSize: '0.78rem',
                  fontWeight: filterStatus === st ? 700 : 500,
                  backgroundColor: filterStatus === st ? 'var(--electric-violet)' : '#F1F5F9',
                  color: filterStatus === st ? '#FFFFFF' : 'var(--text-muted)'
                }}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: 260 }}>
            <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client or code..."
              style={{
                width: '100%',
                padding: '6px 10px 6px 32px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.82rem'
              }}
            />
          </div>
        </div>

        {/* Invoices Table */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          <table className="hub-table">
            <thead>
              <tr>
                <th>Invoice Code</th>
                <th>Client / Project</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--electric-violet)' }}>
                    {inv.invoiceCode}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{inv.client}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inv.project}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                  <td>
                    <span>{inv.dueDate}</span>
                    {inv.overdueDays && (
                      <span style={{ fontSize: '0.72rem', color: '#EF4444', display: 'block' }}>
                        {inv.overdueDays} days overdue
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={
                        inv.status === 'PAID'
                          ? 'badge badge-healthy'
                          : inv.status === 'OVERDUE'
                          ? 'badge badge-critical'
                          : inv.status === 'FLAGGED'
                          ? 'badge badge-warning'
                          : 'badge badge-neutral'
                      }
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {inv.status !== 'PAID' ? (
                      <button
                        onClick={() => markInvoicePaid(inv.id)}
                        className="btn-primary"
                        style={{ height: 32, padding: '0 10px', fontSize: '0.75rem' }}
                      >
                        <CheckCircle2 size={13} />
                        <span>Settle Paid</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
                        Settled ✓
                      </span>
                    )}
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
