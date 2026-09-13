import React from 'react';
import { useApp } from './context/AppContext';
import { TopNavbar } from './components/layout/TopNavbar';
import { WorkerMobileFrame } from './components/worker/WorkerMobileFrame';
import { UnderwriterConsole } from './components/underwriter/UnderwriterConsole';
import { SplitView } from './components/layout/SplitView';
import { ToastContainer } from './components/common/ToastContainer';
import { CoolingOffModal } from './components/worker/CoolingOffModal';
import { AaVerificationModal } from './components/worker/AaVerificationModal';
import { ScoreFactorsModal } from './components/worker/ScoreFactorsModal';
import { SoundboxModal } from './components/worker/SoundboxModal';
import { CamReportModal } from './components/underwriter/CamReportModal';
import { SanctionSuccessModal } from './components/underwriter/SanctionSuccessModal';

export const AppContent: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      
      {/* Global Fixed Navigation & Switcher */}
      <TopNavbar />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full pb-16">
        {viewMode === 'worker' && (
          <div className="py-4 px-4 flex flex-col items-center">
            <div className="flex items-center gap-2.5 mb-3">
              <h1 className="text-lg font-bold text-white font-heading">
                Ramesh Chai Stall
              </h1>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                RBI AA Verified
              </span>
            </div>
            <WorkerMobileFrame />
          </div>
        )}

        {viewMode === 'underwriter' && (
          <div className="py-4">
            <UnderwriterConsole />
          </div>
        )}

        {viewMode === 'split' && (
          <SplitView />
        )}
      </main>

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Top-Level High Z-Index Modal Overlays (Never trapped in child containers) */}
      <CoolingOffModal />
      <AaVerificationModal />
      <ScoreFactorsModal />
      <SoundboxModal />
      <CamReportModal />
      <SanctionSuccessModal />
    </div>
  );
};

export default AppContent;
