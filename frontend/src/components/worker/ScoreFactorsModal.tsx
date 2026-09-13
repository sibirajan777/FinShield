import React from 'react';
import { useApp } from '../../context/AppContext';
import { SCORE_FACTORS, RAMESH_PROFILE } from '../../data/mockData';
import { 
  Award, 
  CheckCircle2, 
  X
} from 'lucide-react';

export const ScoreFactorsModal: React.FC = () => {
  const { isScoreModalOpen, setIsScoreModalOpen } = useApp();

  if (!isScoreModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Alternative Underwriting Model
              </span>
              <h3 className="text-base font-bold text-white font-heading mt-0.5">
                Trust Score Factor Breakdown
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsScoreModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Metric Badge */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-300">Composite Cash-Flow Trust Rating</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-0.5">
              {RAMESH_PROFILE.trustScore} <span className="text-sm text-slate-400 font-sans font-normal">/ {RAMESH_PROFILE.maxTrustScore}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Tier A Prime Micro
            </span>
            <div className="text-[10px] text-slate-400 mt-1">Institutional Benchmark: PASS</div>
          </div>
        </div>

        {/* Factors List */}
        <div className="mt-4 space-y-3">
          {SCORE_FACTORS.map((factor) => (
            <div key={factor.factor} className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{factor.factor}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {factor.score} / {factor.maxScore}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                />
              </div>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {factor.description}
              </p>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-700/80">
                <span>Benchmark: <strong className="text-slate-300">{factor.benchmark}</strong></span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {factor.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5">
          <button
            onClick={() => setIsScoreModalOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Close Breakdown
          </button>
        </div>

      </div>
    </div>
  );
};
