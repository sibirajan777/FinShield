import React from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE } from '../../data/mockData';
import { ShieldCheck, Store, QrCode, CheckCircle2, Volume2, Sparkles } from 'lucide-react';

export const WorkerHeader: React.FC = () => {
  const { setIsAaModalOpen, setIsSoundboxModalOpen, simulateLiveCredit } = useApp();

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900/90 text-white p-5 border-b border-slate-800/80">
      
      {/* Top Bar with Merchant Title & Badges */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-orange-500/20 ring-2 ring-white/10 shrink-0">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-white font-heading tracking-tight leading-tight">
                {RAMESH_PROFILE.name}
              </h2>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Chai Stall
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono flex items-center gap-1 mt-0.5">
              <QrCode className="w-3 h-3 text-emerald-400" />
              {RAMESH_PROFILE.vpa}
            </p>
          </div>
        </div>

        {/* Soundbox Quick Chime Trigger */}
        <button
          onClick={() => setIsSoundboxModalOpen(true)}
          className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-emerald-400 hover:text-emerald-300 transition-all active:scale-95 shadow-sm"
          title="Soundbox Voice Announcements"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Account Aggregator Verification Pill */}
      <div className="mt-3.5 flex items-center justify-between gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-center gap-1 text-emerald-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RBI Account Aggregator Linked</span>
          </div>
        </div>
        <button
          onClick={() => setIsAaModalOpen(true)}
          className="text-[11px] text-emerald-400 hover:text-emerald-200 underline underline-offset-2 font-medium"
        >
          Verified
        </button>
      </div>

    </div>
  );
};
