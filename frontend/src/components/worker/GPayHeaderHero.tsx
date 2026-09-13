import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE } from '../../data/mockData';
import { 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  X, 
  ChevronRight, 
  Building2,
  TrendingUp
} from 'lucide-react';

interface GPayHeaderHeroProps {
  onAskAdvisorClick?: () => void;
}

export const GPayHeaderHero: React.FC<GPayHeaderHeroProps> = ({ onAskAdvisorClick }) => {
  const { 
    bankBalance,
    setIsScoreModalOpen, 
    simulateLiveCredit 
  } = useApp();

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Today's business UPI volume metric
  const todayCollections = 2840;

  return (
    <div className="space-y-3">
      
      {/* 1. GPay Top Bar: Merchant Profile & QR Action */}
      <div className="flex items-center justify-between px-1 pt-1 pb-2">
        <div className="flex items-center gap-3">
          {/* Avatar Circle with Initial "R" */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-base shadow-md ring-2 ring-[#3c4043]">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white font-heading tracking-tight leading-tight">
                {RAMESH_PROFILE.businessName}
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Business Verified" />
            </div>
            <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <span>{RAMESH_PROFILE.vpa}</span>
            </p>
          </div>
        </div>

        {/* QR Code Action Button */}
        <button
          onClick={() => setIsQrModalOpen(true)}
          className="p-2.5 rounded-full bg-[#2d2f31] hover:bg-[#3c4043] text-[#8ab4f8] hover:text-white border border-[#3c4043] transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Show Merchant GPay QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Focused Hero Card: Bank Balance & Today's UPI Collections */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-[#1e293b] via-[#1a2332] to-[#0f172a] border border-slate-700/80 shadow-xl relative overflow-hidden text-slate-100">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8ab4f8]/10 rounded-full blur-2xl pointer-events-none" />

        {/* 1. Primary Stat: Bank Balance & Trust Score Pill Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#8ab4f8]" />
              <span>PRIMARY BANK BALANCE</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5 tracking-tight">
              ₹{bankBalance.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Axis Bank •••• 8821 · Linked via AA</span>
            </div>
          </div>

          {/* Cash-Flow Trust Score Pill */}
          <button
            onClick={() => setIsScoreModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#132d20] border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 hover:bg-[#1b3d2b] transition-all cursor-pointer shadow-sm shrink-0 mt-0.5"
            title="View Score Breakdown"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Score 762 · Excellent</span>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
          </button>
        </div>

        {/* 2. Today's Collections Section (Dedicated Sleek Banner) */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Today's UPI Collections</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1">
                <span>34 payments today · Inflow active</span>
              </div>
            </div>
          </div>
          <div className="text-right pl-2">
            <div className="text-lg font-extrabold text-emerald-400 font-mono tracking-tight">
              ₹{todayCollections.toLocaleString('en-IN')}
            </div>
            <div className="text-[9px] text-slate-400 font-medium">
              Daily Volume
            </div>
          </div>
        </div>

        {/* 3. Clean Full-Width "Ask Purchase Advisor" Pill Button Directly Beneath */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80">
          <button
            onClick={onAskAdvisorClick}
            className="w-full py-2.5 px-4 rounded-full bg-[#1b332b] hover:bg-[#23453a] text-[#81c995] hover:text-white border border-emerald-500/30 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer group"
            title="Ask Purchase Advisor"
          >
            <Sparkles className="w-4 h-4 text-[#81c995] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold tracking-wide">Ask Purchase Advisor</span>
          </button>
        </div>

      </div>

      {/* QR Code Modal Overlay */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-xs w-full text-center text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white">Google Pay for Business QR</span>
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 p-4 bg-white rounded-xl flex flex-col items-center justify-center">
              {/* QR Canvas representation */}
              <div className="w-40 h-40 bg-white border-4 border-slate-900 rounded-lg p-2 flex flex-col items-center justify-center relative">
                <QrCode className="w-32 h-32 text-slate-950" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                    G
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs font-bold text-slate-900 font-mono">
                {RAMESH_PROFILE.vpa}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                Scan with any UPI App (GPay, PhonePe, Paytm)
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  simulateLiveCredit(35);
                  setIsQrModalOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                Simulate ₹35 Pay
              </button>
              <button
                onClick={() => {
                  simulateLiveCredit(150);
                  setIsQrModalOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                Simulate ₹150 Pay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
