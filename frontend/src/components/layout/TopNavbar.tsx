import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smartphone, 
  Building2, 
  Columns2, 
  Radio, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Volume2,
  Zap
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    simulateLiveCredit, 
    setIsAaModalOpen, 
    setIsSoundboxModalOpen,
    resetAllDemoState 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0c121e]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Persona Label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-white/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white font-heading">
                  Fin<span className="text-emerald-400 font-extrabold">Shield</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  AA Infrastructure
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Alternative Credit Decisioning & Resilience Platform
              </p>
            </div>
          </div>
        </div>

        {/* Center View Selector Navigation */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setViewMode('worker')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'worker'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Worker Mobile View (Micro-Merchant: Ramesh Chai Stall)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden md:inline">Worker Mobile View</span>
            <span className="md:hidden">Worker</span>
          </button>

          <button
            onClick={() => setViewMode('underwriter')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'underwriter'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Bank Underwriter Console (Perfios CAM AI Style)"
          >
            <Building2 className="w-4 h-4" />
            <span className="hidden md:inline">Bank Underwriter Console</span>
            <span className="md:hidden">Underwriter</span>
          </button>

          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Side-by-Side Dual View"
          >
            <Columns2 className="w-4 h-4" />
            <span className="hidden lg:inline">Split View</span>
          </button>
        </div>

        {/* Right Actions & Live Status */}
        <div className="flex items-center gap-2.5">
          
          {/* Account Aggregator Status Indicator */}
          <button
            onClick={() => setIsAaModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 transition-colors group cursor-pointer"
            title="View Live RBI Account Aggregator telemetry details"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-emerald-300">
              Setu AA Live
            </span>
          </button>

          {/* Soundbox Trigger */}
          <button
            onClick={() => setIsSoundboxModalOpen(true)}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-400 transition-colors"
            title="Open Soundbox Audio Console"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Quick Simulate Live Inflow */}
          <button
            onClick={() => simulateLiveCredit()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Simulate a live customer UPI payment of ₹20 - ₹150"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">+ Simulate Payment</span>
            <span className="sm:hidden">+ Pay</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetAllDemoState}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition-colors"
            title="Reset All Balances & Loans to Initial State"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
