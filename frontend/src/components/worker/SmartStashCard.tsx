import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PiggyBank, 
  ArrowDownRight, 
  Zap, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const SmartStashCard: React.FC = () => {
  const { 
    stashBalance, 
    autoStashEnabled, 
    toggleAutoStash, 
    setIsCoolingOffOpen,
    setCoolingOffSecondsLeft
  } = useApp();

  const handleWithdrawClick = () => {
    setCoolingOffSecondsLeft(15); // 15-second demo mode
    setIsCoolingOffOpen(true);
  };

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-[#2d2f31] shadow-lg text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#283548] text-[#8ab4f8] flex items-center justify-center">
            <PiggyBank className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 font-heading">
            Emergency Stash
          </span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
          4.8% liquid return
        </span>
      </div>

      {/* Balance & Withdraw Row */}
      <div className="mt-3 p-3.5 rounded-xl bg-[#2d2f31] border border-[#3c4043] flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400 font-medium">
            Emergency Stash Balance
          </div>
          <div className="text-xl font-extrabold text-white font-mono mt-0.5 tracking-tight">
            ₹{stashBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-[9px] text-slate-400 mt-0.5">
            Instant withdrawal to Axis Bank (*8821)
          </div>
        </div>

        <button
          onClick={handleWithdrawClick}
          className="px-3.5 py-1.5 rounded-xl bg-[#3c4043] hover:bg-rose-900/60 text-rose-300 hover:text-white border border-slate-600 text-xs font-semibold transition-all active:scale-95 flex items-center gap-1 shadow-sm cursor-pointer"
          title="Emergency Buffer Withdrawal (Positive Friction Protected)"
        >
          <ArrowDownRight className="w-3.5 h-3.5" />
          <span>Emergency Draw</span>
        </button>
      </div>

      {/* Toggle Row */}
      <div className="mt-2.5 p-2.5 rounded-xl bg-[#282a2d] border border-[#333538] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#8ab4f8]" />
          <span className="text-xs text-slate-300 font-medium">
            Auto-stash 3% on good days
          </span>
        </div>

        <button
          type="button"
          onClick={toggleAutoStash}
          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            autoStashEnabled ? 'bg-[#81c995]' : 'bg-[#5f6368]'
          }`}
          role="switch"
          aria-checked={autoStashEnabled}
          title="Toggle Auto-save"
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-900 shadow-md transition duration-200 ease-in-out ${
              autoStashEnabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

    </div>
  );
};
