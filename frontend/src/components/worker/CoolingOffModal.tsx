import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  AlertOctagon, 
  X, 
  HeartHandshake,
  Coins,
  CheckCircle2
} from 'lucide-react';

export const CoolingOffModal: React.FC = () => {
  const { 
    isCoolingOffOpen, 
    stashBalance, 
    coolingOffSecondsLeft, 
    cancelEmergencyWithdrawal, 
    emergencyMedicalOverride,
    confirmTimedWithdrawal
  } = useApp();

  // Default selected amount: ₹1,000 (clamped to stashBalance)
  const initialDefault = Math.min(1000, stashBalance > 0 ? stashBalance : 1000);
  const [selectedAmount, setSelectedAmount] = useState<number>(initialDefault);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customInputVal, setCustomInputVal] = useState<string>('');

  if (!isCoolingOffOpen) return null;

  const isTimerExpired = coolingOffSecondsLeft === 0;

  // Format mm:ss (00:15 counting down to 00:00)
  const minutes = Math.floor(coolingOffSecondsLeft / 60);
  const seconds = coolingOffSecondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress percentage (from 100% down to 0% across 15 seconds)
  const progressPercent = Math.max(0, Math.min(100, (coolingOffSecondsLeft / 15) * 100));

  // Effective amount to draw
  const effectiveAmount = Math.min(stashBalance, Math.max(1, selectedAmount));
  const remainingAfterDraw = Math.max(0, stashBalance - effectiveAmount);

  // Dynamic Consequence Text Generator
  const getConsequenceText = () => {
    if (effectiveAmount === 500) {
      return `Withdrawing ₹500 leaves ₹${remainingAfterDraw.toLocaleString('en-IN')} in your safety net. Minimal risk to next week's inventory.`;
    }
    if (effectiveAmount === 1000 || effectiveAmount === 2000) {
      return `Withdrawing ₹${effectiveAmount.toLocaleString('en-IN')} leaves ₹${remainingAfterDraw.toLocaleString('en-IN')} in your safety net. Inventory restock will operate on a tighter margin.`;
    }
    if (effectiveAmount >= stashBalance || remainingAfterDraw === 0) {
      return `Withdrawing the full ₹${stashBalance.toLocaleString('en-IN')} leaves your emergency buffer at ₹0 ahead of Tuesday restock.`;
    }
    return `Withdrawing ₹${effectiveAmount.toLocaleString('en-IN')} leaves ₹${remainingAfterDraw.toLocaleString('en-IN')} in your safety net.`;
  };

  const handlePillSelect = (amt: number, isAll: boolean = false) => {
    setIsCustomMode(false);
    setSelectedAmount(isAll ? stashBalance : amt);
  };

  const handlePrimaryButtonClick = () => {
    if (isTimerExpired) {
      confirmTimedWithdrawal(effectiveAmount);
    } else {
      cancelEmergencyWithdrawal(effectiveAmount);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-md w-full mx-4 text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glow Top Border */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500 ${
          isTimerExpired 
            ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500' 
            : 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500'
        }`} />
        
        {/* Modal Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border transition-colors ${
              isTimerExpired 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {isTimerExpired ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-amber-400" />
              )}
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border transition-colors ${
                isTimerExpired 
                  ? 'text-emerald-400 bg-emerald-950 border-emerald-500/30' 
                  : 'text-amber-400 bg-amber-950 border-amber-500/30'
              }`}>
                {isTimerExpired ? 'Cooling Window Elapsed' : 'Positive Friction Active'}
              </span>
              <h3 className="text-base font-bold text-white font-heading mt-0.5">
                {isTimerExpired ? 'Ready for Transfer' : 'Think Before You Drain'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => cancelEmergencyWithdrawal(effectiveAmount)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Fixed Amount Selector (Before Countdown) */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Emergency Draw Amount:</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Available: <strong className="text-white">₹{stashBalance.toLocaleString('en-IN')}</strong>
            </span>
          </div>

          {/* Quick-Tap Amount Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Pill 1: ₹500 */}
            <button
              type="button"
              onClick={() => handlePillSelect(500)}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                selectedAmount === 500 && !isCustomMode
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm ring-1 ring-amber-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              ₹500
            </button>

            {/* Pill 2: ₹1,000 (Default) */}
            <button
              type="button"
              onClick={() => handlePillSelect(1000)}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                selectedAmount === 1000 && !isCustomMode
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm ring-1 ring-amber-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              ₹1,000
            </button>

            {/* Pill 3: ₹2,000 */}
            <button
              type="button"
              onClick={() => handlePillSelect(2000)}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                selectedAmount === 2000 && !isCustomMode
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm ring-1 ring-amber-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              ₹2,000
            </button>

            {/* Pill 4: Custom / All (₹4,850) */}
            <button
              type="button"
              onClick={() => handlePillSelect(stashBalance, true)}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                selectedAmount === stashBalance && !isCustomMode
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm ring-1 ring-rose-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              All (₹{stashBalance.toLocaleString('en-IN')})
            </button>
          </div>

          {/* Amount Summary Subtext */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Chosen Draw Amount:</span>
            <span className="font-extrabold text-amber-300 font-mono text-sm">
              ₹{effectiveAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* 2. Dynamic Consequence Warning Card */}
        <div className="mt-3.5 p-3.5 rounded-xl bg-slate-800 border border-amber-500/40 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-amber-100 leading-relaxed font-medium">
                {getConsequenceText()}
              </p>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-slate-300">
                <span>Remaining Buffer: <strong className="text-emerald-300 font-mono">₹{remainingAfterDraw.toLocaleString('en-IN')}</strong></span>
                <span>•</span>
                <span>Reserve Retention: <strong className="text-white font-mono">{Math.round((remainingAfterDraw / stashBalance) * 100)}%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 15-Second Countdown Timer (Demo Mode) */}
        <div className="mt-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <Clock className={`w-4 h-4 ${isTimerExpired ? 'text-emerald-400' : 'text-indigo-400 animate-pulse'}`} />
            <span>Behavioral Cooling-Off Period</span>
          </div>

          <div className={`mt-2 text-4xl font-extrabold font-mono tracking-widest transition-colors ${
            isTimerExpired ? 'text-emerald-400 animate-pulse' : 'text-indigo-400'
          }`}>
            {formattedTime}
          </div>

          {/* Smooth Progress Bar from 100% to 0% across 15 seconds */}
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                isTimerExpired 
                  ? 'bg-emerald-500' 
                  : 'bg-gradient-to-r from-indigo-500 to-emerald-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          {/* Micro-label below timer */}
          <div className="text-[10px] text-slate-400 mt-2 font-medium">
            Hackathon Demo Mode: 15-second cooling window (Simulating standard 5-minute behavioral pause).
          </div>
        </div>

        {/* Educational Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-800/80 border border-emerald-500/30">
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300">
                Institutional Underwriter Bonus
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Maintaining your safety net qualifies you for <strong className="text-emerald-300">₹35,000 credit at 2% lower interest</strong> on the Bank Underwriter portal.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Action Confirmation Buttons (Dynamic on Timer Expiry) */}
        <div className="mt-4 space-y-2.5">
          {/* Primary Action Button */}
          <button
            onClick={handlePrimaryButtonClick}
            className={`w-full py-3 px-4 rounded-xl text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
              isTimerExpired
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950 ring-2 ring-emerald-400/50'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950'
            }`}
          >
            {isTimerExpired ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white stroke-[2.5]" />
                <span>Confirm Transfer to Bank (₹{effectiveAmount.toLocaleString('en-IN')})</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-white stroke-[2.5]" />
                <span>Cancel & Protect My ₹{effectiveAmount.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>

          {/* Secondary Action Button */}
          {!isTimerExpired ? (
            <button
              onClick={() => emergencyMedicalOverride(effectiveAmount)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-rose-950 text-rose-400 hover:text-rose-300 border border-rose-500/40 hover:border-rose-500 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              <span>Emergency Medical Override: Transfer ₹{effectiveAmount.toLocaleString('en-IN')} Instantly</span>
            </button>
          ) : (
            <button
              onClick={() => cancelEmergencyWithdrawal(effectiveAmount)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Keep Money in Safety Net</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
