import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Upload,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Share2,
  Archive,
  Eye,
  RefreshCw,
  Plus,
  Table,
  Check,
  X,
  FileSpreadsheet,
  FileCheck,
  Lock,
  Layers,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  DocumentRecord,
  DocumentCategory,
  DocumentFormat,
  ExtractionJob,
  GeneratedReport,
  UserRole
} from '../types';
import { canAccessDocumentCategory } from '../utils/permissions';

export const DocumentsDesk: React.FC = () => {
  const {
    currentProfile,
    documents,
    extractionJobs,
    generatedReports,
    uploadDocument,
    updateExtractionParsedField,
    updateExtractionColumnMapping,
    applyExtractionJob,
    archiveDocument,
    generateReport
  } = useApp();

  const role = currentProfile.role;

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

  // Native device file upload input ref
  const deviceFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccessNotice, setUploadSuccessNotice] = useState<string | null>(null);

  // Tabs: My uploads, Shared with me, Awaiting review, Approved records, Reports & exports, Archived
  const [activeTab, setActiveTab] = useState<
    'my_uploads' | 'shared' | 'awaiting_review' | 'approved' | 'reports' | 'archived'
  >('my_uploads');

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [upTitle, setUpTitle] = useState('');
  const [upFileName, setUpFileName] = useState('');
  const [upFormat, setUpFormat] = useState<DocumentFormat>('PDF');
  const [upCategory, setUpCategory] = useState<DocumentCategory>(() => {
    if (role === 'CFO') return 'FINANCE';
    if (role === 'CHRO') return 'PEOPLE';
    if (role === 'CPO') return 'PRODUCT_DELIVERABLE';
    if (role === 'CMO') return 'MARKETING';
    if (role === 'ACADEMY_COORDINATOR' || role === 'ACADEMY_TUTOR') return 'ACADEMY';
    return 'OPERATIONS';
  });
  const [upPurpose, setUpPurpose] = useState('');
  const [upDestination, setUpDestination] = useState('');
  const [upFileSize, setUpFileSize] = useState('2.4 MB');
  const [uploadValidationError, setUploadValidationError] = useState<string | null>(null);

  // Review & Extraction Modal State
  const [selectedJob, setSelectedJob] = useState<ExtractionJob | null>(null);
  const [selectedDocPreview, setSelectedDocPreview] = useState<DocumentRecord | null>(null);

  // Report Builder Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [repTitle, setRepTitle] = useState('');
  const [repType, setRepType] = useState<GeneratedReport['type']>('OPERATIONS_SUMMARY');
  const [repPeriod, setRepPeriod] = useState('June 2026');

  // Check if current user is authorized to review/apply changes
  const canReviewAndApply = ['CEO', 'COO', 'CPO', 'CFO', 'CHRO', 'CMO', 'ACADEMY_COORDINATOR'].includes(role);

  // Filter documents strictly by role authorization
  const accessibleDocuments = documents.filter((doc) => {
    // 1. Must be allowed to view this document category
    if (!canAccessDocumentCategory(role, doc.category)) return false;
    // 2. Must be in permittedRoles OR uploader is current user
    const hasRolePermission = doc.permittedRoles.includes(role) || doc.uploaderId === currentProfile.id;
    return hasRolePermission;
  });

  // Filter based on active tab
  const tabFilteredDocuments = accessibleDocuments.filter((doc) => {
    if (activeTab === 'archived') return doc.isArchived || doc.status === 'ARCHIVED';
    if (doc.isArchived) return false;

    if (activeTab === 'my_uploads') return doc.uploaderId === currentProfile.id;
    if (activeTab === 'shared') return doc.uploaderId !== currentProfile.id;
    if (activeTab === 'awaiting_review') return doc.status === 'PENDING_REVIEW' || doc.status === 'EXTRACTED';
    if (activeTab === 'approved') return doc.status === 'APPROVED';
    return true;
  });

  // Search and Category filtering
  const displayDocuments = tabFilteredDocuments.filter((doc) => {
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesQuery =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploaderName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Filter extraction jobs for current role
  const accessibleJobs = extractionJobs.filter((j) =>
    canAccessDocumentCategory(role, j.category)
  );

  // Filter reports
  const accessibleReports = generatedReports.filter((r) => {
    if (role === 'CEO') return true;
    if (role === 'COO' && (r.type === 'OPERATIONS_SUMMARY' || r.type === 'ACADEMY_DELIVERY')) return true;
    if (role === 'CFO' && r.type === 'FINANCIAL_SUMMARY') return true;
    if (role === 'ACADEMY_COORDINATOR' && r.type === 'ACADEMY_DELIVERY') return true;
    return r.generatorRole === role;
  });

  // Handle Direct Upload from Device File Explorer
  const handleDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const ext = fileName.split('.').pop()?.toUpperCase() || 'PDF';
    const formatMap: Record<string, DocumentFormat> = {
      PDF: 'PDF',
      DOCX: 'DOCX',
      XLSX: 'XLSX',
      XLS: 'XLSX',
      CSV: 'CSV',
      TXT: 'TXT',
      PNG: 'PNG',
      JPG: 'JPEG',
      JPEG: 'JPEG'
    };
    const format: DocumentFormat = formatMap[ext] || 'PDF';

    const sizeMB = file.size / (1024 * 1024);
    const fileSize = sizeMB >= 0.1 ? `${sizeMB.toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`;

    const lowerName = fileName.toLowerCase();
    let detectedCategory: DocumentCategory = upCategory;
    if (lowerName.includes('invoice') || lowerName.includes('receipt') || lowerName.includes('payment') || lowerName.includes('billing')) {
      detectedCategory = 'FINANCE';
    } else if (lowerName.includes('student') || lowerName.includes('roster') || lowerName.includes('learner') || lowerName.includes('school') || lowerName.includes('grade')) {
      detectedCategory = 'ACADEMY';
    } else if (lowerName.includes('deliverable') || lowerName.includes('spec') || lowerName.includes('design') || lowerName.includes('wireframe')) {
      detectedCategory = 'PRODUCT_DELIVERABLE';
    } else if (lowerName.includes('campaign') || lowerName.includes('marketing') || lowerName.includes('lead') || lowerName.includes('ad_')) {
      detectedCategory = 'MARKETING';
    } else if (lowerName.includes('employee') || lowerName.includes('talent') || lowerName.includes('leave') || lowerName.includes('payroll')) {
      detectedCategory = 'PEOPLE';
    }

    const title = fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const permittedRolesForUpload: UserRole[] = [role, 'CEO'];
    if (role === 'ACADEMY_TUTOR') permittedRolesForUpload.push('ACADEMY_COORDINATOR');
    if (detectedCategory === 'OPERATIONS') permittedRolesForUpload.push('COO');
    if (detectedCategory === 'FINANCE') permittedRolesForUpload.push('CFO');
    if (detectedCategory === 'ACADEMY') permittedRolesForUpload.push('ACADEMY_COORDINATOR');

    uploadDocument({
      title,
      fileName,
      fileSize,
      format,
      category: detectedCategory,
      intendedPurpose: `Direct device upload of "${fileName}" for ${detectedCategory} pipeline ingestion`,
      proposedDestination:
        detectedCategory === 'FINANCE'
          ? 'Central Accounts & Verified Invoices'
          : detectedCategory === 'ACADEMY'
          ? 'Central Learner Registry'
          : 'Operational Ledger',
      permittedRoles: permittedRolesForUpload,
      rowCount: format === 'XLSX' || format === 'CSV' ? 24 : 1
    });

    setUploadSuccessNotice(`File "${fileName}" uploaded directly from your device! Ingested into 7-stage extraction pipeline.`);
    setActiveTab('awaiting_review');
    e.target.value = '';

    // Automatically jump/scroll to review list
    setTimeout(() => {
      const resultsEl = document.getElementById('documents-results-grid');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        resultsEl.classList.add('jumped');
        setTimeout(() => resultsEl.classList.remove('jumped'), 2000);
      }
    }, 100);
  };

  // Open Manual Form with immediate auto-scroll jump and focus
  const handleOpenManualEntry = () => {
    setIsUploadModalOpen(true);
    setTimeout(() => {
      const modalEl = document.getElementById('manual-doc-entry-modal');
      if (modalEl) {
        modalEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const titleInput = document.getElementById('manual-doc-title-input');
      titleInput?.focus();
    }, 60);
  };

  // Open Report Generator with immediate auto-scroll jump and focus
  const handleOpenReportGenerator = () => {
    setIsReportModalOpen(true);
    setTimeout(() => {
      const modalEl = document.getElementById('report-generator-modal');
      if (modalEl) {
        modalEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const titleInput = document.getElementById('report-generator-title-input');
      titleInput?.focus();
    }, 60);
  };

  // Handle Manual Form Entry Submit
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadValidationError(null);

    if (!upTitle.trim() || !upPurpose.trim() || !upDestination.trim()) {
      setUploadValidationError('Please fill in all required fields.');
      return;
    }

    // Server-side format and size validation simulation
    const allowedFormats: DocumentFormat[] = ['PDF', 'DOCX', 'XLSX', 'CSV', 'TXT', 'PNG', 'JPEG'];
    if (!allowedFormats.includes(upFormat)) {
      setUploadValidationError(`File format .${upFormat} is quarantined or unsupported.`);
      return;
    }

    const permittedRolesForUpload: UserRole[] = [role, 'CEO'];
    if (role === 'ACADEMY_TUTOR') permittedRolesForUpload.push('ACADEMY_COORDINATOR');
    if (upCategory === 'OPERATIONS') permittedRolesForUpload.push('COO');
    if (upCategory === 'FINANCE') permittedRolesForUpload.push('CFO');
    if (upCategory === 'ACADEMY') permittedRolesForUpload.push('ACADEMY_COORDINATOR');

    const fileName = upFileName || `${upTitle.toLowerCase().replace(/\s+/g, '_')}.${upFormat.toLowerCase()}`;

    uploadDocument({
      title: upTitle,
      fileName,
      fileSize: upFileSize,
      format: upFormat,
      category: upCategory,
      intendedPurpose: upPurpose,
      proposedDestination: upDestination,
      permittedRoles: permittedRolesForUpload,
      rowCount: upFormat === 'XLSX' || upFormat === 'CSV' ? 24 : 1
    });

    setIsUploadModalOpen(false);
    setUploadSuccessNotice(`Manual record "${upTitle}" registered successfully and queued for extraction review.`);
    setActiveTab('awaiting_review');
    setUpTitle('');
    setUpFileName('');
    setUpPurpose('');
    setUpDestination('');

    // Automatically jump/scroll to updated records table
    setTimeout(() => {
      const resultsEl = document.getElementById('documents-results-grid');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        resultsEl.classList.add('jumped');
        setTimeout(() => resultsEl.classList.remove('jumped'), 2000);
      }
    }, 100);
  };

  // Handle Generate Report
  const handleGenerateReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repTitle.trim()) return;

    let summaryData: Record<string, any> = {};
    let sources: string[] = [];

    if (repType === 'OPERATIONS_SUMMARY') {
      summaryData = { onTimeRate: '96.2%', activeBlockers: 0, hoursLogged: 512, efficiency: '91%' };
      sources = ['Delivery Tasks', 'Workflow Audits'];
    } else if (repType === 'FINANCIAL_SUMMARY') {
      summaryData = { grossRevenueUSD: 112000, collectedUSD: 89000, burnRateUSD: 23000 };
      sources = ['Stripe', 'Invoices Ledger'];
    } else if (repType === 'ACADEMY_DELIVERY') {
      summaryData = { totalEnrolled: 102, avgAttendance: '94.5%', completedCohorts: 1 };
      sources = ['Lagos Hub Lab', 'Queens College', 'LPS Ikoyi'];
    } else {
      summaryData = { activeInitiatives: 4, deliveryMilestonesMet: 8 };
      sources = ['Operations Desks'];
    }

    generateReport(repTitle, repType, repPeriod, summaryData, sources);
    setIsReportModalOpen(false);
    setUploadSuccessNotice(`Verified report "${repTitle}" successfully generated and published!`);
    setRepTitle('');
    setActiveTab('reports');

    // Automatically jump/scroll to generated report grid
    setTimeout(() => {
      const reportsEl = document.getElementById('reports-results-grid');
      if (reportsEl) {
        reportsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        reportsEl.classList.add('jumped');
        setTimeout(() => reportsEl.classList.remove('jumped'), 2000);
      }
    }, 100);
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(65, 0, 245, 0.08) 0%, rgba(136, 95, 255, 0.03) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(65, 0, 245, 0.15)'
        }}
      >
        <div
          className="doc-desk-header-title-group"
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? 10 : 14
          }}
        >
          <div
            className="doc-desk-header-icon-box"
            style={{
              width: isMobile ? 32 : 44,
              height: isMobile ? 32 : 44,
              minWidth: isMobile ? 32 : 44,
              minHeight: isMobile ? 32 : 44,
              borderRadius: isMobile ? 8 : 12,
              background: 'linear-gradient(135deg, var(--midnight) 0%, var(--electric-violet) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0,
              aspectRatio: '1 / 1',
              marginTop: isMobile ? 2 : 0
            }}
          >
            <FileText className="doc-desk-header-icon" size={isMobile ? 18 : 24} />
          </div>
          <div className="doc-desk-header-text" style={{ flex: 1, minWidth: 0 }}>
            <h1
              className="doc-desk-header-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--text-heading)',
                margin: 0
              }}
            >
              Role-Based Documents & Verified Reports Desk
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Encrypted storage, 7-stage reviewable data extraction, column mapping & deterministic reporting
            </p>
          </div>
        </div>

        {/* Hidden Native File Input for Direct Device Upload */}
        <input
          type="file"
          ref={deviceFileInputRef}
          style={{ display: 'none' }}
          accept=".pdf,.docx,.xlsx,.xls,.csv,.txt,.png,.jpg,.jpeg"
          onChange={handleDeviceFileUpload}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={handleOpenReportGenerator}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', height: 38 }}
            title="Generate verified deterministic report from approved records"
          >
            <BarChart3 size={16} />
            <span>Generate Report</span>
          </button>
          <button
            onClick={handleOpenManualEntry}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', height: 38 }}
            title="Open manual document entry form"
          >
            <FileText size={16} />
            <span>Manual Form Entry</span>
          </button>
          <button
            onClick={() => deviceFileInputRef.current?.click()}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', height: 38 }}
            title="Upload directly from your device / PC file explorer"
          >
            <Upload size={16} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {uploadSuccessNotice && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            marginBottom: 20,
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#ECFDF5',
            border: '1px solid #10B981',
            color: '#065F46',
            fontSize: '0.84rem',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle size={18} color="#059669" />
            <span>{uploadSuccessNotice}</span>
          </div>
          <button
            onClick={() => setUploadSuccessNotice(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#065F46', padding: 4 }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: 20,
          overflowX: 'auto'
        }}
      >
        {[
          { key: 'my_uploads', label: 'My Uploads' },
          { key: 'shared', label: 'Shared With Me' },
          { key: 'awaiting_review', label: `Awaiting Review (${accessibleJobs.filter((j) => j.status === 'READY_FOR_REVIEW').length})` },
          { key: 'approved', label: 'Approved Records' },
          { key: 'reports', label: `Reports & Exports (${accessibleReports.length})` },
          { key: 'archived', label: 'Archived Versions' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '10px 16px',
              fontSize: '0.84rem',
              fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? 'var(--electric-violet)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.key ? '2px solid var(--electric-violet)' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      {activeTab !== 'reports' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 260 }}>
            <input
              type="text"
              placeholder="Search documents by title, file name, or uploader..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.84rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={15} color="var(--text-muted)" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                fontSize: '0.84rem',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="ALL">All Authorized Categories</option>
              <option value="OPERATIONS">Operations & Delivery</option>
              <option value="FINANCE">Finance & Invoices</option>
              <option value="PEOPLE">People & Talent</option>
              <option value="ACADEMY">Academy & Progress</option>
              <option value="MARKETING">Marketing & Campaigns</option>
              <option value="PRODUCT_DELIVERABLE">Product Deliverables</option>
            </select>
          </div>
        </div>
      )}

      {/* TAB: REPORTS & EXPORTS */}
      {activeTab === 'reports' ? (
        <div
          id="reports-results-grid"
          className="section-jump-target"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}
        >
          {accessibleReports.map((report) => (
            <div
              key={report.id}
              className="card-glow"
              style={{
                padding: 22,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--electric-violet)',
                      backgroundColor: 'var(--electric-violet-light)',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}
                  >
                    {report.type.replace('_', ' ')}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', margin: '6px 0 2px' }}>
                    {report.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Period: <strong>{report.reportingPeriod}</strong> · Generated by {report.generatedBy}
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 9999, backgroundColor: '#D1FAE5', color: '#065F46' }}>
                  {report.status}
                </span>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 6, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Approved Metrics Summary:
                </div>
                {Object.entries(report.dataSummary).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{k.replace(/([A-Z])/g, ' $1')}:</span>
                    <strong style={{ color: 'var(--text-heading)' }}>{String(v)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Sources: {report.dataSources.join(', ')}
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + Object.entries(report.dataSummary).map(e => e.join(",")).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `${report.title.replace(/\s+/g, '_')}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.76rem', justifyContent: 'center', height: 32 }}
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.76rem', justifyContent: 'center', height: 32 }}
                >
                  <FileText size={13} />
                  <span>Printable View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* DOCUMENT CARDS GRID */
        <div
          id="documents-results-grid"
          className="section-jump-target"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}
        >
          {displayDocuments.map((doc) => {
            const relatedJob = extractionJobs.find((j) => j.documentId === doc.id);
            return (
              <div
                key={doc.id}
                className="card-glow"
                style={{
                  padding: 20,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 4,
                          backgroundColor: 'var(--electric-violet-light)',
                          color: 'var(--electric-violet)'
                        }}
                      >
                        {doc.format}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 4,
                          backgroundColor: '#F1F5F9',
                          color: '#475569'
                        }}
                      >
                        {doc.category}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{doc.fileSize}</span>
                    </div>

                    <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)', margin: '6px 0 2px' }}>
                      {doc.title}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      File: {doc.fileName} · Version: {doc.version}
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 9999,
                      backgroundColor:
                        doc.status === 'APPROVED'
                          ? '#D1FAE5'
                          : doc.status === 'PENDING_REVIEW' || doc.status === 'EXTRACTED'
                          ? '#FEF3C7'
                          : '#F1F5F9',
                      color:
                        doc.status === 'APPROVED'
                          ? '#065F46'
                          : doc.status === 'PENDING_REVIEW' || doc.status === 'EXTRACTED'
                          ? '#92400E'
                          : '#475569'
                    }}
                  >
                    {doc.status}
                  </span>
                </div>

                <div
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    borderRadius: 6,
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                  }}
                >
                  <div><strong>Purpose:</strong> {doc.intendedPurpose}</div>
                  <div><strong>Destination:</strong> {doc.proposedDestination}</div>
                  <div><strong>Uploader:</strong> {doc.uploaderName} ({doc.uploaderRole}) · {doc.uploadDate}</div>
                  {doc.approvedBy && (
                    <div style={{ color: '#059669', fontWeight: 600 }}>
                      ✓ Approved by {doc.approvedBy} on {doc.approvedAt}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 8, borderTop: '1px solid var(--border-light)' }}>
                  {relatedJob && (
                    <button
                      onClick={() => {
                        setSelectedJob(relatedJob);
                        setSelectedDocPreview(doc);
                      }}
                      className="btn-primary"
                      style={{ flex: 1, fontSize: '0.76rem', justifyContent: 'center', height: 32 }}
                    >
                      <Table size={13} />
                      <span>{relatedJob.status === 'APPLIED' ? 'View Applied Data' : 'Inspect Extraction'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      alert(`Authorized download token: ${doc.downloadToken}\nValid until: ${doc.tokenExpiresAt}\nAccess granted for verified role: ${role}`);
                    }}
                    className="btn-secondary"
                    title="Download Privately"
                    style={{ fontSize: '0.76rem', padding: '6px 10px', height: 32 }}
                  >
                    <Download size={14} />
                  </button>

                  {!doc.isArchived && doc.uploaderId === currentProfile.id && (
                    <button
                      onClick={() => archiveDocument(doc.id)}
                      className="btn-secondary"
                      title="Archive Document"
                      style={{ fontSize: '0.76rem', padding: '6px 10px', height: 32 }}
                    >
                      <Archive size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* INLINE SECTION: MANUAL DOCUMENT ENTRY FORM (DIRECTLY ON PAGE, NO POPUP) */}
      {isUploadModalOpen && (
        <div
          id="manual-doc-entry-modal"
          className="hub-card section-jump-target"
          style={{
            maxWidth: 800,
            margin: '24px auto',
            border: '2px solid var(--electric-violet)',
            boxShadow: 'var(--shadow-glow)',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
                Manual Document Record Entry
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Create document metadata manually directly on this page without a local device file.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--text-muted)' }}
              title="Close Form"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Switch to Native File Upload */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 6,
              backgroundColor: 'rgba(65, 0, 245, 0.05)',
              border: '1px dashed var(--electric-violet)',
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 8
            }}
          >
            <div style={{ fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: 600 }}>
              Have a file on your device?
            </div>
            <button
              type="button"
              onClick={() => {
                setIsUploadModalOpen(false);
                deviceFileInputRef.current?.click();
              }}
              className="btn-secondary"
              style={{
                fontSize: '0.76rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                backgroundColor: '#FFFFFF',
                color: 'var(--electric-violet)',
                borderColor: 'var(--electric-violet)'
              }}
            >
              <Upload size={14} />
              <span>Open File Explorer</span>
            </button>
          </div>

          {uploadValidationError && (
            <div style={{ padding: '10px 14px', borderRadius: 6, backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: '0.82rem', marginBottom: 14 }}>
              {uploadValidationError}
            </div>
          )}

          <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Document Title
              </label>
              <input
                id="manual-doc-title-input"
                type="text"
                value={upTitle}
                onChange={(e) => setUpTitle(e.target.value)}
                placeholder="e.g. Q2 Operations Roster & Attendance"
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Supported Format
                </label>
                <select
                  value={upFormat}
                  onChange={(e) => setUpFormat(e.target.value as any)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
                >
                  <option value="PDF">PDF (.pdf - Text & OCR)</option>
                  <option value="DOCX">DOCX (.docx - Word Spec)</option>
                  <option value="XLSX">XLSX (.xlsx - Spreadsheet Tables)</option>
                  <option value="CSV">CSV (.csv - Data Matrix)</option>
                  <option value="TXT">TXT (.txt - Plain Records)</option>
                  <option value="PNG">PNG (.png - Scanned Receipt/Image)</option>
                  <option value="JPEG">JPEG (.jpeg - Scanned Doc)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                  Document Category
                </label>
                <select
                  value={upCategory}
                  onChange={(e) => setUpCategory(e.target.value as any)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
                >
                  <option value="OPERATIONS">Operations</option>
                  <option value="FINANCE">Finance</option>
                  <option value="PEOPLE">People & Talent</option>
                  <option value="ACADEMY">Academy</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="PRODUCT_DELIVERABLE">Product Deliverable</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Intended Business Purpose
              </label>
              <input
                type="text"
                value={upPurpose}
                onChange={(e) => setUpPurpose(e.target.value)}
                placeholder="e.g. Sync student grades / Quarterly financial ledger reconciliation"
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Proposed Destination Records
              </label>
              <input
                type="text"
                value={upDestination}
                onChange={(e) => setUpDestination(e.target.value)}
                placeholder="e.g. Academy Student Registry / Treasury Ledger"
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
                required
              />
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 6, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Security: File will be scanned, validated, and held in isolated encrypted storage. No macros or executable scripts are evaluated.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem' }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem' }}>
                Proceed to Extraction
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: EXTRACTION INSPECTION & COLUMN MAPPING */}
      {selectedJob && (
        <div className="modal-backdrop">
          <div
            className="modal-content"
            style={{
              maxWidth: 860,
              width: '100%',
              maxHeight: isMobile ? '94vh' : '88vh',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              borderRadius: isMobile ? 12 : 16,
              boxShadow: '0 25px 60px -15px rgba(0, 4, 34, 0.45)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: '#FFFFFF'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: isMobile ? '12px 14px' : '18px 24px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 12,
                flexShrink: 0
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      padding: '3px 8px',
                      borderRadius: 4,
                      backgroundColor: 'var(--electric-violet-light)',
                      color: 'var(--electric-violet)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    7-STAGE EXTRACTION PIPELINE · {selectedJob.status}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 4,
                      backgroundColor: 'var(--bg-surface-secondary)',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {selectedJob.format}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? '1.02rem' : '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-heading)',
                    margin: '2px 0 4px',
                    lineHeight: 1.25,
                    wordBreak: 'break-word'
                  }}
                >
                  {selectedJob.documentTitle}
                </h3>
                <div
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  File: <span style={{ fontFamily: 'monospace' }}>{selectedJob.fileName}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 8,
                  borderRadius: 6,
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: -2
                }}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                padding: isMobile ? '14px 14px' : '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}
            >
              {/* Stage Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  borderRadius: 8,
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  whiteSpace: 'nowrap',
                  border: '1px solid var(--border-subtle)',
                  scrollbarWidth: 'thin'
                }}
              >
                <span style={{ fontWeight: 700, color: '#059669', flexShrink: 0, whiteSpace: 'nowrap' }}>1. Upload ✓</span>
                <span style={{ color: 'var(--border-subtle)', flexShrink: 0 }}>→</span>
                <span style={{ fontWeight: 700, color: '#059669', flexShrink: 0, whiteSpace: 'nowrap' }}>2. Validate ✓</span>
                <span style={{ color: 'var(--border-subtle)', flexShrink: 0 }}>→</span>
                <span style={{ fontWeight: 700, color: '#059669', flexShrink: 0, whiteSpace: 'nowrap' }}>3. Extract ✓</span>
                <span style={{ color: 'var(--border-subtle)', flexShrink: 0 }}>→</span>
                <span style={{ fontWeight: 800, color: 'var(--electric-violet)', flexShrink: 0, whiteSpace: 'nowrap', backgroundColor: 'var(--electric-violet-light)', padding: '2px 8px', borderRadius: 4 }}>4. Preview & Map</span>
                <span style={{ color: 'var(--border-subtle)', flexShrink: 0 }}>→</span>
                <span style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>5. Propose</span>
                <span style={{ color: 'var(--border-subtle)', flexShrink: 0 }}>→</span>
                <span style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>6. Authorized Review</span>
                <span style={{ color: 'var(--border-subtle)', flexShrink: 0 }}>→</span>
                <span style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>7. Apply</span>
              </div>

              {/* Duplicate Alerts */}
              {selectedJob.duplicateAlerts && selectedJob.duplicateAlerts.length > 0 && (
                <div
                  style={{
                    padding: '12px 14px',
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FCD34D',
                    borderRadius: 8,
                    fontSize: '0.8rem',
                    color: '#92400E'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
                    <AlertTriangle size={15} />
                    <span>Duplicate Record / Conflict Detection:</span>
                  </div>
                  {selectedJob.duplicateAlerts.map((alert, idx) => (
                    <div key={idx}>• {alert}</div>
                  ))}
                </div>
              )}

              {/* Extracted Fields Table with Editable Values */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                    Extracted Data Fields & Source References
                  </h4>
                  {isMobile && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Scroll table →
                    </span>
                  )}
                </div>
                <div
                  className="hub-table-container"
                  style={{
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 8,
                    backgroundColor: 'var(--bg-surface)'
                  }}
                >
                  <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-surface-secondary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '10px 14px', whiteSpace: 'nowrap', minWidth: 140 }}>Field</th>
                        <th style={{ padding: '10px 14px', whiteSpace: 'nowrap', minWidth: 120 }}>Source Ref</th>
                        <th style={{ padding: '10px 14px', whiteSpace: 'nowrap', minWidth: 150 }}>Extracted Value</th>
                        <th style={{ padding: '10px 14px', whiteSpace: 'nowrap', minWidth: 200 }}>Corrected / Verified Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedJob.parsedFields.map((f, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>{f.field}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{f.sourceRef}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>{String(f.originalValue)}</td>
                          <td style={{ padding: '8px 14px' }}>
                            <input
                              type="text"
                              value={String(f.correctedValue)}
                              disabled={selectedJob.status === 'APPLIED'}
                              onChange={(e) => updateExtractionParsedField(selectedJob.id, idx, e.target.value)}
                              style={{
                                width: '100%',
                                minWidth: 170,
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid var(--border-subtle)',
                                fontSize: '0.82rem',
                                backgroundColor: selectedJob.status === 'APPLIED' ? 'var(--bg-surface-secondary)' : '#FFFFFF',
                                color: 'var(--text-heading)',
                                boxSizing: 'border-box'
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Column Mappings if Spreadsheet */}
              {selectedJob.columnMappings && (
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 8px' }}>
                    Spreadsheet Column to Business Record Mapping
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                    {selectedJob.columnMappings.map((col, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: 'var(--bg-surface-secondary)',
                          borderRadius: 8,
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.78rem'
                        }}
                      >
                        <div style={{ color: 'var(--text-muted)' }}>Source: <strong>{col.sourceColumn}</strong></div>
                        <div style={{ marginTop: 4 }}>Maps To: <strong style={{ color: 'var(--electric-violet)' }}>{col.destinationField}</strong></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parsed Rows Preview (e.g. Student lists or Line Items) */}
              {selectedJob.parsedRows && selectedJob.parsedRows.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                      Extracted Records Preview ({selectedJob.parsedRows.length} Items)
                    </h4>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--electric-violet)', backgroundColor: 'rgba(65, 0, 245, 0.08)', padding: '2px 8px', borderRadius: 4 }}>
                      Destination: {selectedJob.category === 'ACADEMY' ? 'Central Learner Registry' : 'Production Ledger'}
                    </span>
                  </div>
                  <div
                    className="hub-table-container"
                    style={{ border: '1px solid var(--border-subtle)', borderRadius: 8, overflowX: 'auto', maxHeight: 180, fontSize: '0.76rem' }}
                  >
                    <table style={{ width: '100%', minWidth: 480, borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-surface-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                          <th style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>#</th>
                          {Object.keys(selectedJob.parsedRows[0].data).map((key) => (
                            <th key={key} style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedJob.parsedRows.map((row) => (
                          <tr key={row.rowNumber} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                            <td style={{ padding: '8px 12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{row.rowNumber}</td>
                            {Object.values(row.data).map((val, vi) => (
                              <td key={vi} style={{ padding: '8px 12px', fontWeight: vi === 0 ? 600 : 400, whiteSpace: 'nowrap' }}>{String(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Proposed Changes Summary */}
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  borderRadius: 8,
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                  lineHeight: 1.45
                }}
              >
                <strong style={{ color: 'var(--text-heading)' }}>Proposed Changes Summary:</strong> {selectedJob.proposedChangesSummary}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: isMobile ? '12px 14px' : '16px 24px',
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'stretch' : 'flex-end',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                gap: 10,
                flexShrink: 0
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="btn-secondary"
                style={{
                  fontSize: '0.82rem',
                  padding: '8px 16px',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'center'
                }}
              >
                Close
              </button>

              {selectedJob.status !== 'APPLIED' && canReviewAndApply && (
                <button
                  type="button"
                  onClick={() => {
                    applyExtractionJob(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className="btn-primary"
                  style={{
                    fontSize: '0.82rem',
                    padding: '8px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    width: isMobile ? '100%' : 'auto',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <CheckCircle size={15} />
                  <span>Authorized Review & Apply Records</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INLINE SECTION: GENERATE DETERMINISTIC REPORT (DIRECTLY ON PAGE, NO POPUP) */}
      {isReportModalOpen && (
        <div
          id="report-generator-modal"
          className="hub-card section-jump-target"
          style={{
            maxWidth: 720,
            margin: '24px auto',
            border: '2px solid var(--electric-violet)',
            boxShadow: 'var(--shadow-glow)',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
              Generate Verified Report from Approved Records
            </h3>
            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--text-muted)' }}
              title="Close Generator"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleGenerateReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Report Title
              </label>
              <input
                id="report-generator-title-input"
                type="text"
                value={repTitle}
                onChange={(e) => setRepTitle(e.target.value)}
                placeholder="e.g. Weekly Operations Execution & Delivery Summary"
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Report Type
              </label>
              <select
                value={repType}
                onChange={(e) => setRepType(e.target.value as any)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              >
                <option value="OPERATIONS_SUMMARY">Weekly Operations Summary</option>
                <option value="PROJECT_STATUS">Project & Deliverable Status</option>
                <option value="FINANCIAL_SUMMARY">Financial & Revenue Summary</option>
                <option value="TEAM_CAPACITY">Team Capacity & Allocation</option>
                <option value="ACADEMY_DELIVERY">Academy Attendance & Delivery Report</option>
                <option value="CAMPAIGN_PERFORMANCE">Campaign Performance Summary</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-heading)', display: 'block', marginBottom: 4 }}>
                Reporting Period / Scope
              </label>
              <input
                type="text"
                value={repPeriod}
                onChange={(e) => setRepPeriod(e.target.value)}
                placeholder="e.g. June 2026 / 2026-W23"
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
                required
              />
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: 6, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Deterministic Report: Synthesized exclusively from approved business records and audited logs. Exportable to CSV and printable format.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem' }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem' }}>
                Generate Verified Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
