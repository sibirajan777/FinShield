import React from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE } from '../../data/mockData';
import { 
  ShieldCheck, 
  X, 
  Lock, 
  FileText
} from 'lucide-react';

export const AaVerificationModal: React.FC = () => {
  const { isAaModalOpen, setIsAaModalOpen } = useApp();

  if (!isAaModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                RBI Approved Protocol
              </span>
              <h3 className="text-base font-bold text-white font-heading mt-0.5">
                Account Aggregator Verification
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsAaModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Overview */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400">Consent Artefact ID</span>
            <span className="text-emerald-400 font-mono font-semibold">{RAMESH_PROFILE.aaConsentId}</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400">AA Ecosystem Provider</span>
            <span className="text-slate-200 font-medium">{RAMESH_PROFILE.aaProvider}</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400">Financial Information Provider (FIP)</span>
            <span className="text-slate-200 font-medium">{RAMESH_PROFILE.primaryBank}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Telemetry Refresh State</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Cryptographic Feed (2m ago)
            </span>
          </div>
        </div>

        {/* Security Pillars */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>End-to-End Encrypted</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Data encrypted with institutional RSA-2048 key exchange directly from the bank core.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Zero PDF Tampering</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Immutable ledger feed prevents fake bank statements or manipulated UPI receipts.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5">
          <button
            onClick={() => setIsAaModalOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Close AA Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
