import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Banknote, 
  CloudRain, 
  Sun, 
  CheckCircle2, 
  PauseCircle, 
  Sparkles,
  Zap,
  Repeat
} from 'lucide-react';

export const DailyLoanCard: React.FC = () => {
  const { loanData, isRainyDay, toggleRainyDay } = useApp();

  const repaymentProgress = Math.round(
    ((loanData.sanctioned - loanData.outstanding) / loanData.sanctioned) * 100
  );

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-[#2d2f31] shadow-lg text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#283548] text-[#8ab4f8] flex items-center justify-center">
            <Banknote className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 font-heading">
            Active Micro-Loan
          </span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
          On-Time Streak
        </span>
      </div>

      {/* Horizontal Split: Total Loan vs Balance */}
      <div className="p-3.5 rounded-xl bg-[#2d2f31] border border-[#3c4043] grid grid-cols-2 divide-x divide-slate-700">
        <div className="pr-3">
          <div className="text-[10px] text-slate-400 font-medium">Total Loan</div>
          <div className="text-lg font-extrabold text-white font-mono mt-0.5">
            ₹{loanData.sanctioned.toLocaleString('en-IN')}
          </div>
          <div className="text-[9px] text-slate-400 mt-0.5">
            Micro-credit limit
          </div>
        </div>

        <div className="pl-3">
          <div className="text-[10px] text-slate-400 font-medium">Balance</div>
          <div className="text-lg font-extrabold text-[#8ab4f8] font-mono mt-0.5">
            ₹{loanData.outstanding.toLocaleString('en-IN')}
          </div>
          <div className="text-[9px] text-emerald-400 font-medium mt-0.5">
            {repaymentProgress}% Repaid ({loanData.consecutiveDays}-day streak)
          </div>
        </div>
      </div>

      {/* Daily AutoPay Badge Row */}
      <div className="mt-2.5 p-2.5 rounded-xl bg-[#282a2d] border border-[#333538] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Repeat className="w-3.5 h-3.5 text-[#8ab4f8]" />
          <div>
            <div className="text-xs font-semibold text-slate-200">
              ₹{loanData.dailyDebit} / day auto-debited via UPI
            </div>
            <div className="text-[10px] text-slate-400">
              AutoPay active on Axis Bank account
            </div>
          </div>
        </div>

        <div>
          {isRainyDay ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-950 text-sky-300 border border-sky-500/40">
              Paused
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#132d20] text-[#81c995] border border-emerald-500/40">
              Deducted
            </span>
          )}
        </div>
      </div>

      {/* Simulate Slow Day (Pause Repayment) */}
      <div className="mt-2.5 p-2.5 rounded-xl bg-[#282a2d] border border-[#333538] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isRainyDay ? (
            <CloudRain className="w-4 h-4 text-sky-400 animate-bounce" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
          <div>
            <div className="text-xs font-semibold text-slate-300">
              Simulate Slow Day (Pause Repayment)
            </div>
            <div className="text-[10px] text-slate-400">
              Auto-pauses installment without credit penalty.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleRainyDay}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            isRainyDay
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'bg-[#3c4043] hover:bg-slate-700 text-slate-300'
          }`}
        >
          {isRainyDay ? 'Paused Active' : 'Simulate'}
        </button>
      </div>

    </div>
  );
};
