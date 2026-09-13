import React from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE } from '../../data/mockData';
import { 
  Building2, 
  FileSpreadsheet, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Store, 
  QrCode,
  TrendingUp,
  Landmark,
  Share2
} from 'lucide-react';

export const UnderwriterHeader: React.FC = () => {
  const { setIsCamModalOpen, setIsAaModalOpen, simulateLiveCredit } = useApp();

  return (
    <div className="glass-card-underwriter rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl relative overflow-hidden text-slate-100">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Brand, Portal Label & Export CAM Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-700/70">
        
        {/* Left: Applicant Identity */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 ring-2 ring-white/10 shrink-0">
            <Landmark className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-heading">
                {RAMESH_PROFILE.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AA Verified Applicant</span>
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                CRN: IND-882190
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                {RAMESH_PROFILE.businessName}
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 font-mono text-slate-300">
                <QrCode className="w-3.5 h-3.5 text-indigo-400" />
                {RAMESH_PROFILE.vpa}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{RAMESH_PROFILE.location}</span>
            </div>
          </div>
        </div>

        {/* Right Actions: Export CAM & Live Push Simulation */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => simulateLiveCredit()}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Push simulated live UPI customer credit"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Inflow</span>
          </button>

          <button
            onClick={() => setIsCamModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CAM Report (PDF)</span>
          </button>
        </div>

      </div>

      {/* High-Density KPI Grid Banner */}
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* KPI 1: Business Classification */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            Business Structure
          </div>
          <div className="text-sm font-bold text-white mt-1">
            Unincorporated Micro-Enterprise
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Sole Proprietor • Street Retail
          </div>
        </div>

        {/* KPI 2: GST Status */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            GST Regulatory Status
          </div>
          <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Legally Exempt</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            &lt; ₹40 Lakh Annual Turnover Threshold
          </div>
        </div>

        {/* KPI 3: Annualized UPI Run-Rate */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            Annualized UPI Run-Rate
          </div>
          <div className="text-base font-extrabold text-white font-mono mt-1">
            ₹{RAMESH_PROFILE.annualizedRunRate.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>₹{RAMESH_PROFILE.monthlyTurnoverAvg.toLocaleString('en-IN')}/mo avg</span>
          </div>
        </div>

        {/* KPI 4: Account Aggregator Live Source */}
        <div 
          onClick={() => setIsAaModalOpen(true)}
          className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 hover:border-indigo-500/60 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            <span>AA Ingestion Feed</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-sm font-bold text-indigo-300 mt-1 flex items-center gap-1">
            <span>Setu / Sahamati Live</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
            {RAMESH_PROFILE.aaConsentId}
          </div>
        </div>

      </div>

    </div>
  );
};
