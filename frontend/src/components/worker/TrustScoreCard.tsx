import React from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE } from '../../data/mockData';
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  HelpCircle, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';

export const TrustScoreCard: React.FC = () => {
  const { setIsScoreModalOpen, uniqueCounterpartiesCount, washTradeLoopsCount, payerDiversityIndex } = useApp();

  const score = RAMESH_PROFILE.trustScore;
  const maxScore = RAMESH_PROFILE.maxTrustScore;
  const percentage = Math.round((score / maxScore) * 100);

  // SVG Gauge calculations
  const radius = 62;
  const strokeWidth = 9;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (percentage / 100) * arcLength;

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg relative overflow-hidden text-slate-100">
      
      {/* Background Accent Gradient */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Title & Info Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-300 font-heading">
            UPI Cash-Flow Trust Score
          </span>
        </div>
        <button
          onClick={() => setIsScoreModalOpen(true)}
          className="text-slate-400 hover:text-emerald-400 p-1 rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px]"
          title="See Score Breakdown"
        >
          <span>Factors</span>
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Radial Progress Gauge Meter */}
      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg
            className="w-full h-full transform -rotate-135"
            viewBox="0 0 140 140"
          >
            {/* Background Arc */}
            <circle
              cx="70"
              cy="70"
              r={normalizedRadius}
              stroke="#1e293b"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
              fill="transparent"
            />
            {/* Value Progress Arc */}
            <circle
              cx="70"
              cy="70"
              r={normalizedRadius}
              stroke="url(#emeraldGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Score Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {score}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              out of {maxScore}
            </span>
          </div>
        </div>

        {/* Tier Label */}
        <div className="mt-1">
          <span className="inline-block text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full shadow-sm">
            {RAMESH_PROFILE.trustTier}
          </span>
          <p className="text-[11px] text-slate-400 mt-1">
            Institutional PSL Grade • Powered by Sahamati AA
          </p>
        </div>
      </div>

      {/* 3-Column Micro-Stats */}
      <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-slate-800">
        
        {/* Metric 1 */}
        <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 text-center">
          <div className="text-[10px] text-slate-400 font-medium">Daily Avg Volume</div>
          <div className="text-sm font-bold text-white font-mono mt-0.5">
            ₹{RAMESH_PROFILE.dailyAvgVolume.toLocaleString('en-IN')}
          </div>
          <div className="text-[9px] text-emerald-400 font-medium mt-0.5">90-Day Stable</div>
        </div>

        {/* Metric 2: Payer Diversity (Computed dynamically) */}
        <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 text-center">
          <div className="text-[10px] text-slate-400 font-medium">Payer Diversity</div>
          <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
            {Math.round(payerDiversityIndex * 100)}%
          </div>
          <div className="text-[9px] text-slate-400 font-medium mt-0.5">
            {uniqueCounterpartiesCount} Unique VPAs
          </div>
        </div>

        {/* Metric 3: Wash Trades (Computed dynamically) */}
        <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 text-center">
          <div className="text-[10px] text-slate-400 font-medium">Wash Trades</div>
          <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5 flex items-center justify-center gap-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{washTradeLoopsCount}</span>
          </div>
          <div className="text-[9px] text-emerald-400 font-medium mt-0.5">
            {washTradeLoopsCount === 0 ? 'Clean (Pass)' : `${washTradeLoopsCount} Flagged`}
          </div>
        </div>

      </div>

    </div>
  );
};
