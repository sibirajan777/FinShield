import React from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE } from '../../data/mockData';
import { 
  FileText, 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const CamReportModal: React.FC = () => {
  const { 
    isCamModalOpen, 
    setIsCamModalOpen, 
    addToast, 
    uniqueCounterpartiesCount, 
    washTradeLoopsCount, 
    payerDiversityIndex,
    loanData 
  } = useApp();

  if (!isCamModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast({
      type: 'success',
      title: 'CAM PDF Exported',
      message: 'FinShield_CAM_Ramesh_Chai_Stall_2026.pdf has been generated.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative z-50 bg-slate-950 border border-slate-700 rounded-2xl p-5 sm:p-7 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Actions & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>Perfios CAM AI Export • Institutional Credit Appraisal Memo</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Print CAM Memo"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setIsCamModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Memo Content */}
        <div className="mt-5 space-y-6 text-xs">
          
          {/* Header Banner */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">
                Credit Appraisal Memorandum (CAM) #CAM-2026-8812
              </span>
              <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                {RAMESH_PROFILE.businessName} (Applicant: {RAMESH_PROFILE.name})
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Category: Informal Micro-Merchant / Street-Vendor • VPA: <span className="font-mono text-slate-300">{RAMESH_PROFILE.vpa}</span>
              </p>
            </div>

            <div className="text-right self-start sm:self-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
                RECOMMENDATION: SANCTION
              </span>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Date: 14 Jan 2026 • AI Score: 762/850
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-heading mb-2">
              1. Underwriting Executive Summary
            </h4>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed space-y-2">
              <p>
                Applicant operates an unorganized high-frequency tea & snack stall with <strong>90+ consecutive days</strong> of live UPI telemetry ingested via <strong>Setu / Sahamati Account Aggregator Gateway</strong>.
              </p>
              <p>
                Turnover is strictly <strong>GST-exempt (&lt; ₹40 Lakh limit)</strong> with verified annualized throughput of <strong>₹8,94,250</strong>. The borrower demonstrates zero debt delinquency across credit bureaus and strong debt-service coverage.
              </p>
            </div>
          </div>

          {/* Section 2: Account Aggregator Cash-Flow Analytics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-heading mb-2">
              2. Account Aggregator Real-Time Cash Flow Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <div>
                <span className="text-slate-500 block text-[10px]">Annualized Run-Rate</span>
                <span className="text-sm font-bold text-white font-mono">₹{RAMESH_PROFILE.annualizedRunRate.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Daily Average Inflow</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">₹{RAMESH_PROFILE.dailyAvgVolume.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Payer Diversity Index</span>
                <span className="text-sm font-bold text-white font-mono">{payerDiversityIndex.toFixed(2)} ({uniqueCounterpartiesCount} VPAs)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Wash Trading Circularity</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {washTradeLoopsCount} Loops ({washTradeLoopsCount === 0 ? 'PASS' : 'FLAGGED'})
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Recommended Sanction Limits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-heading mb-2">
              3. Proposed Credit Terms & Mandate Calibration
            </h4>
            <div className="p-4 rounded-lg bg-slate-900 border border-emerald-500/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <span className="text-slate-400 block text-[10px]">Sanction Limit</span>
                <span className="text-base font-extrabold text-white font-mono">₹35,000</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Repayment Mechanism</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">₹{loanData.dailyDebit} / Day</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tenure</span>
                <span className="text-sm font-bold text-white font-mono">180 Days</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Mandate Channel</span>
                <span className="text-sm font-bold text-emerald-300 font-mono">UPI AutoPay</span>
              </div>
            </div>
          </div>

          {/* Section 4: Risk Mitigation & Priority Sector Lending Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-heading mb-2">
              4. Risk Mitigation & PSL Compliance
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Priority Sector Lending (PSL) Eligible:</strong> Complies with RBI guidelines for micro-enterprise credit without collateral requirement.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Positive Friction Emergency Buffer:</strong> Borrower maintains ₹4,850 liquidity cushion in overnight high-yield pocket to protect against supplier restock shocks.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dynamic Zero-Sales Day Auto-Pause:</strong> Rainy-day mechanism pauses daily UPI AutoPay without triggering credit bureau negative remarks.</span>
              </div>
            </div>
          </div>

          {/* Signoff Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              Generated via FinShield Core • Digital Signature ID: <span className="font-mono text-slate-400">FIN-VERIFIED-98214</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Institutional Grade Approval</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
