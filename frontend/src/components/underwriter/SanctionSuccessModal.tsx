import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Smartphone, 
  ArrowRight
} from 'lucide-react';

export const SanctionSuccessModal: React.FC = () => {
  const { 
    isSanctionSuccessModalOpen, 
    setIsSanctionSuccessModalOpen, 
    latestSanctionId, 
    loanData,
    setViewMode 
  } = useApp();

  if (!isSanctionSuccessModalOpen) return null;

  const handleSwitchToWorker = () => {
    setIsSanctionSuccessModalOpen(false);
    setViewMode('worker');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />
        
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 glow-emerald mb-4">
          <CheckCircle2 className="w-9 h-9 text-emerald-400" />
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Loan Sanctioned & Mandate Active
        </span>

        <h3 className="text-xl font-extrabold text-white font-heading mt-2">
          ₹{loanData.sanctioned.toLocaleString('en-IN')} Working Capital Approved!
        </h3>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          The credit facility has been issued to <strong className="text-white">Ramesh Kumar (Ramesh Chai Stall)</strong> with daily UPI AutoPay mandate activated on <span className="text-emerald-400 font-mono">{loanData.mandateVpa}</span>.
        </p>

        {/* Loan Details Pill */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Sanctioned Loan ID:</span>
            <span className="font-mono text-emerald-400 font-bold">{latestSanctionId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Daily Micro-Repayment:</span>
            <span className="font-mono text-white font-bold">₹{loanData.dailyDebit} / day</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">NPCI Mandate Status:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active on UPI AutoPay
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2.5">
          <button
            onClick={handleSwitchToWorker}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Smartphone className="w-4 h-4" />
            <span>Switch to Worker Mobile View to Verify</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsSanctionSuccessModalOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Stay on Underwriter Console
          </button>
        </div>

      </div>
    </div>
  );
};
