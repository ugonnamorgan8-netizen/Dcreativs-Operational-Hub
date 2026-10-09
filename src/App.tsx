import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { VersionComparisonModal } from './components/VersionComparisonModal';
import { SubmitDeliverableModal } from './components/SubmitDeliverableModal';
import { BoardGrantModal } from './components/BoardGrantModal';
import { ActivityLogDrawer } from './components/ActivityLogDrawer';
import { ManageInvoicesModal } from './components/ManageInvoicesModal';
import { AddCandidateModal } from './components/AddCandidateModal';
import { CandidateDetailModal } from './components/CandidateDetailModal';
import { NewCampaignModal } from './components/NewCampaignModal';
import { NewUpdateModal } from './components/NewUpdateModal';
import { ApprovalHistoryModal } from './components/ApprovalHistoryModal';
import { Menu } from 'lucide-react';

// Views
import { LoginView } from './views/LoginView';
import { AccessDeniedView } from './views/AccessDeniedView';
import { CeoOverview } from './views/CeoOverview';
import { CooOperationsDesk } from './views/CooOperationsDesk';
import { CpoReviewQueue } from './views/CpoReviewQueue';
import { CfoFinanceSummary } from './views/CfoFinanceSummary';
import { ChroTalentOnboarding } from './views/ChroTalentOnboarding';
import { CmoCampaignCalendar } from './views/CmoCampaignCalendar';
import { StaffMyWork } from './views/StaffMyWork';
import { MessagingChannels } from './views/MessagingChannels';
import { BoardRoom } from './views/BoardRoom';
import { SecurityRbacMatrix } from './views/SecurityRbacMatrix';
import { OpenLineReports } from './views/OpenLineReports';
import { AcademyCoordinatorDesk } from './views/AcademyCoordinatorDesk';
import { TutorWorkspace } from './views/TutorWorkspace';
import { DocumentsDesk } from './views/DocumentsDesk';
import { AccessAwaitingAssignment } from './views/AccessAwaitingAssignment';

const MainViewRouter: React.FC = () => {
  const { activeView, canAccessView } = useApp();

  // Strict role check: if unauthorized, render AccessDeniedView
  if (!canAccessView(activeView)) {
    return <AccessDeniedView attemptedView={activeView} />;
  }

  switch (activeView) {
    case 'ceo-overview':
      return <CeoOverview />;
    case 'operations-desk':
      return <CooOperationsDesk />;
    case 'review-queue':
      return <CpoReviewQueue />;
    case 'finance-summary':
      return <CfoFinanceSummary />;
    case 'talent-onboarding':
      return <ChroTalentOnboarding />;
    case 'campaign-calendar':
      return <CmoCampaignCalendar />;
    case 'academy-operations':
      return <AcademyCoordinatorDesk />;
    case 'tutor-workspace':
      return <TutorWorkspace />;
    case 'documents-desk':
      return <DocumentsDesk />;
    case 'my-work':
      return <StaffMyWork />;
    case 'messaging':
      return <MessagingChannels />;
    case 'board-room':
      return <BoardRoom />;
    case 'security-matrix':
      return <SecurityRbacMatrix />;
    case 'openline-reports':
      return <OpenLineReports />;
    case 'access-awaiting-assignment':
      return <AccessAwaitingAssignment />;
    case 'access-denied':
      return <AccessDeniedView attemptedView={activeView} />;
    default:
      return <StaffMyWork />;
  }
};

export const AppContent: React.FC = () => {
  const {
    isAuthenticated,
    setIsMobileSidebarOpen,
    isActivityLogDrawerOpen,
    setIsActivityLogDrawerOpen,
    isManageInvoicesModalOpen,
    setIsManageInvoicesModalOpen,
    isAddCandidateModalOpen,
    setIsAddCandidateModalOpen,
    selectedCandidateDetail,
    setSelectedCandidateDetail,
    isNewCampaignModalOpen,
    setIsNewCampaignModalOpen,
    isNewUpdateModalOpen,
    setIsNewUpdateModalOpen
  } = useApp();

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="app-main">
        <Topbar />
        <div style={{ flex: 1, minHeight: 0 }}>
          <MainViewRouter />
        </div>
      </main>

      {/* Floating Bottom Menu Bar — Mobile Only */}
      {isMobile && (
        <div className="mobile-floating-dock">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="mobile-floating-menu-trigger"
            aria-label="Open Workspace Navigation Menu"
            id="mobile-floating-menu-btn"
          >
            <Menu size={18} />
            <span>Workspaces & Menu</span>
          </button>
        </div>
      )}

      {/* Global Interactive Modals & Drawers */}
      <ApprovalHistoryModal />
      <VersionComparisonModal />
      <SubmitDeliverableModal />
      <BoardGrantModal />
      <ActivityLogDrawer
        isOpen={isActivityLogDrawerOpen}
        onClose={() => setIsActivityLogDrawerOpen(false)}
      />
      <ManageInvoicesModal
        isOpen={isManageInvoicesModalOpen}
        onClose={() => setIsManageInvoicesModalOpen(false)}
      />
      <AddCandidateModal
        isOpen={isAddCandidateModalOpen}
        onClose={() => setIsAddCandidateModalOpen(false)}
      />
      <CandidateDetailModal
        candidate={selectedCandidateDetail}
        onClose={() => setSelectedCandidateDetail(null)}
      />
      <NewCampaignModal
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
      />
      <NewUpdateModal
        isOpen={isNewUpdateModalOpen}
        onClose={() => setIsNewUpdateModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
