import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE } from '../../data/mockData';
import { 
  FileCheck, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const DecisionSanctionPanel: React.FC = () => {
  const { 
    sanctionUnderwriterLoan, 
    uniqueCounterpartiesCount, 
    washTradeLoopsCount,
    loanData 
  } = useApp();

  const [sanctionAmount, setSanctionAmount] = useState<number>(35000);
  const [tenureDays, setTenureDays] = useState<number>(180);
  const interestRate = 14.5; // 14.5% p.a.

  // Dynamic daily EMI computation
  const totalInterest = Math.round((sanctionAmount * (interestRate / 100) * (tenureDays / 365)));
  const totalRepayable = sanctionAmount + totalInterest;
  const calculatedDailyEmi = Math.round(totalRepayable / tenureDays);

  const handleSanctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sanctionUnderwriterLoan(sanctionAmount, calculatedDailyEmi, tenureDays);
  };

  return (
    <div className="glass-card-underwriter rounded-2xl p-5 sm:p-6 border border-emerald-500/40 shadow-2xl relative overflow-hidden text-slate-100">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FileCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-heading">
                Section C: Credit Decisioning & Direct UPI Sanction
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500 text-slate-950 shadow-md">
                PRE-APPROVED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated algorithmic credit appraisal based on AA transaction telemetry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl self-start sm:self-auto text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300 font-semibold">AI Confidence: 94.6%</span>
        </div>
      </div>

      {/* Main Grid: Decision Summary + Interactive Sanction Simulator */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Risk & Underwriting Assessment (5 Cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* Decision Summary Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-heading">
              Risk Assessment Summary
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong className="text-emerald-400 font-semibold">Low default risk.</strong> Strong organic footfall with {uniqueCounterpartiesCount} distinct payers and {washTradeLoopsCount} circular liquidity loops. Eligible under informal priority-sector lending (PSL).
            </p>

            <div className="mt-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Debt-Service Coverage Ratio (DSCR)</span>
                <span className="text-emerald-400 font-bold font-mono">3.42x (Robust)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Daily Inflow / Active Deduction Ratio</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {((loanData.dailyDebit / RAMESH_PROFILE.dailyAvgVolume) * 100).toFixed(1)}% of Daily Flow (₹{loanData.dailyDebit}/day)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Mandate AutoPay Success Rate</span>
                <span className="text-emerald-400 font-bold font-mono">99.2% on UPI</span>
              </div>
            </div>
          </div>

          {/* Underwriting Checklist Badges */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>KYC & VPA Ownership: Verified (Axis Bank Core)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Credit Bureau (CIBIL/Experian): No Delinquencies</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Mandate Channel: NPCI UPI AutoPay Ready</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Sanction Tuning & Execution (7 Cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSanctionSubmit} className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Sanction Limit & Term Calibration</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Interest: <strong className="text-emerald-400">{interestRate}% p.a.</strong>
              </span>
            </div>

            {/* Slider 1: Sanction Amount */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Proposed Sanction Limit</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  ₹{sanctionAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="50000"
                step="2500"
                value={sanctionAmount}
                onChange={(e) => setSanctionAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>Min: ₹10,000</span>
                <span>Recommended: ₹35,000</span>
                <span>Max: ₹50,000</span>
              </div>
            </div>

            {/* Slider 2: Tenure Days */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Repayment Tenure</span>
                <span className="text-sm font-bold text-white font-mono">
                  {tenureDays} Days ({Math.round(tenureDays / 30)} Months)
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="270"
                step="30"
                value={tenureDays}
                onChange={(e) => setTenureDays(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>60 Days</span>
                <span>180 Days (Standard)</span>
                <span>270 Days</span>
              </div>
            </div>

            {/* Calculated Breakdown Display */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-indigo-950/40 to-slate-900 border border-emerald-500/25 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-medium">Daily UPI AutoPay EMI</div>
                <div className="text-base font-extrabold text-white font-mono mt-0.5">
                  ₹{calculatedDailyEmi} <span className="text-[10px] text-slate-400 font-sans">/ day</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-medium">Total Interest</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  ₹{totalInterest.toLocaleString('en-IN')}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-medium">Total Repayable</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  ₹{totalRepayable.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 fill-current stroke-[2]" />
                <span>Sanction Loan & Register UPI Mandate (₹{sanctionAmount.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2">
                Instantly generates NPCI Mandate UMN and activates real-time daily sachet deduction (₹{calculatedDailyEmi}/day).
              </p>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
