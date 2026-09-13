import React, { useRef, useState, useEffect } from 'react';
import { GPayHeaderHero } from './GPayHeaderHero';
import { AnalyticsPageView } from './AnalyticsPageView';
import { SmartStashCard } from './SmartStashCard';
import { AffordabilityAdvisor } from './AffordabilityAdvisor';
import { DailyLoanCard } from './DailyLoanCard';
import { LiveStatementModal } from './LiveStatementModal';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Shield, 
  Store, 
  BarChart3, 
  CreditCard,
  ArrowLeft,
  Receipt,
  ChevronRight,
  Calendar,
  Sparkles
} from 'lucide-react';

export const WorkerMobileFrame: React.FC = () => {
  const advisorInputRef = useRef<HTMLInputElement>(null);
  const [activeWorkerTab, setActiveWorkerTab] = useState<'home' | 'analytics' | 'loans'>('home');
  const [isStatementOpen, setIsStatementOpen] = useState<boolean>(false);

  // Robust status bar clock logic: guaranteed realistic format with strictly max 2 digits before colon
  const [mobileTime, setMobileTime] = useState<string>(() => {
    const now = new Date();
    const rawHours = now.getHours();
    const hours12 = rawHours % 12 || 12;
    const hoursStr = String(hours12).padStart(2, '0').slice(-2);
    const minutesStr = String(now.getMinutes()).padStart(2, '0').slice(-2);
    return `${hoursStr}:${minutesStr}`;
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const rawHours = now.getHours();
      const hours12 = rawHours % 12 || 12;
      const hoursStr = String(hours12).padStart(2, '0').slice(-2);
      const minutesStr = String(now.getMinutes()).padStart(2, '0').slice(-2);
      setMobileTime(`${hoursStr}:${minutesStr}`);
    };

    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFocusAdvisor = () => {
    if (activeWorkerTab !== 'home') {
      setActiveWorkerTab('home');
      setTimeout(() => {
        if (advisorInputRef.current) {
          advisorInputRef.current.focus();
          advisorInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      if (advisorInputRef.current) {
        advisorInputRef.current.focus();
        advisorInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="w-full flex justify-center py-4 px-2 sm:px-4">
      {/* 420px Max-Width Phone Shell with Bezel & Shadows */}
      <div className="w-full max-w-[420px] bg-slate-900 border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-2xl mobile-device-shell overflow-hidden transition-all duration-300">
        
        {/* Inner Screen Container with Google Pay Dark Theme */}
        <div className="w-full bg-[#121212] rounded-2xl overflow-hidden border border-[#2d2f31] flex flex-col min-h-[820px] max-h-[860px] shadow-inner relative text-slate-100">
          
          {/* iOS / Android Status Bar */}
          <div className="h-9 bg-[#1f1f1f] text-slate-300 px-5 flex items-center justify-between text-xs font-semibold select-none border-b border-[#2d2f31] shrink-0">
            <span className="font-mono text-[11px] text-slate-200 tracking-tight">{mobileTime}</span>
            
            {/* Dynamic Island / Camera Notch */}
            <div className="w-20 h-3.5 bg-slate-950 rounded-full flex items-center justify-center gap-1.5 px-2 border border-slate-800">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono">94%</span>
                <Battery className="w-3.5 h-3.5 text-[#81c995] fill-[#81c995]" />
              </div>
            </div>
          </div>

          {/* Scrollable Screen Body (Switches by Tab) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3.5 p-3.5 pb-4 custom-scrollbar">
            
            {/* TAB 1: HOME (Cleaned Up & Concise) */}
            {activeWorkerTab === 'home' && (
              <>
                {/* 1. Header & Identity + Primary Bank Balance & Today's Collections Hero Card */}
                <GPayHeaderHero onAskAdvisorClick={handleFocusAdvisor} />

                {/* 2. "Can I Afford This?" Purchase Advisor Action */}
                <AffordabilityAdvisor ref={advisorInputRef} />

                {/* 3. "View Live UPI Statement" Button / Drawer Trigger */}
                <button
                  type="button"
                  onClick={() => setIsStatementOpen(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-[#1f1f1f] hover:bg-[#283548] border border-[#2d2f31] hover:border-[#8ab4f8]/50 text-slate-200 hover:text-white flex items-center justify-between transition-all shadow-md group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#283548] text-[#8ab4f8] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>View Live UPI Statement</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-semibold">
                          34 Today
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Real-time ledger · Reconciled with Axis Bank</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </button>

                {/* 4. Smart Safety Net (Emergency Stash) Card */}
                <SmartStashCard />

                {/* Micro Footer */}
                <div className="text-center text-[10px] text-slate-500 py-2 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-[#81c995]" />
                  <span>Secured by Sahamati RBI Account Aggregator Gateway</span>
                </div>
              </>
            )}

            {/* TAB 2: ANALYTICS (Dedicated View) */}
            {activeWorkerTab === 'analytics' && (
              <AnalyticsPageView onBackClick={() => setActiveWorkerTab('home')} />
            )}

            {/* TAB 3: LOANS (Dedicated View — Clean Micro-Loan Suite) */}
            {activeWorkerTab === 'loans' && (
              <div className="space-y-3.5 pb-4 animate-in fade-in duration-200">
                {/* Loans Header with Back Button */}
                <div className="flex items-center gap-2 pb-1">
                  <button
                    type="button"
                    onClick={() => setActiveWorkerTab('home')}
                    className="p-2 rounded-xl bg-[#1f1f1f] border border-[#2d2f31] text-slate-300 hover:text-white hover:bg-[#283548] transition-all cursor-pointer"
                    title="Back to Home"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h2 className="text-sm font-bold text-white font-heading">
                      Active Micro-Loan
                    </h2>
                    <p className="text-[10px] text-slate-400">Daily UPI AutoPay</p>
                  </div>
                </div>

                {/* Dedicated DailyLoanCard (Total Loan, Balance, AutoPay & Slow Day Pause) */}
                <DailyLoanCard />

                {/* 62-Day Perfect Repayment Streak Calendar */}
                <div className="p-4 rounded-2xl bg-[#1f1f1f] border border-[#2d2f31] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8ab4f8]" />
                      <span>62-Day Perfect Repayment Streak</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">100% On-Time</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 text-center text-[9px]">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={i} className="text-slate-400 font-medium py-0.5">{d}</div>
                    ))}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono flex items-center justify-center font-bold text-[10px]"
                        title={`Day ${i + 49}: ₹140 Debited On-Time`}
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    On-time daily debits report directly to RBI-licensed credit bureaus via Account Aggregator.
                  </p>
                </div>

                {/* Micro Footer */}
                <div className="text-center text-[10px] text-slate-500 py-2 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-[#81c995]" />
                  <span>Secured by Sahamati RBI Account Aggregator Gateway</span>
                </div>
              </div>
            )}

          </div>

          {/* Authentic GPay 3-Tab Bottom Navigation Bar */}
          <div className="h-14 bg-[#1f1f1f] border-t border-[#2d2f31] flex items-center justify-around px-3 shrink-0 select-none z-20">
            {/* Tab 1: Home */}
            <button
              type="button"
              onClick={() => setActiveWorkerTab('home')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
                activeWorkerTab === 'home'
                  ? 'text-[#8ab4f8]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`px-3 py-0.5 rounded-full transition-all ${
                activeWorkerTab === 'home' ? 'bg-[#283548]' : ''
              }`}>
                <Store className="w-4 h-4" />
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${
                activeWorkerTab === 'home' ? 'font-bold text-white' : ''
              }`}>
                Home
              </span>
            </button>

            {/* Tab 2: Analytics */}
            <button
              type="button"
              onClick={() => setActiveWorkerTab('analytics')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
                activeWorkerTab === 'analytics'
                  ? 'text-[#8ab4f8]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`px-3 py-0.5 rounded-full transition-all ${
                activeWorkerTab === 'analytics' ? 'bg-[#283548]' : ''
              }`}>
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${
                activeWorkerTab === 'analytics' ? 'font-bold text-white' : ''
              }`}>
                Analytics
              </span>
            </button>

            {/* Tab 3: Loans */}
            <button
              type="button"
              onClick={() => setActiveWorkerTab('loans')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
                activeWorkerTab === 'loans'
                  ? 'text-[#8ab4f8]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`px-3 py-0.5 rounded-full transition-all ${
                activeWorkerTab === 'loans' ? 'bg-[#283548]' : ''
              }`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${
                activeWorkerTab === 'loans' ? 'font-bold text-white' : ''
              }`}>
                Loans
              </span>
            </button>
          </div>

          {/* Mobile Home Indicator Bar */}
          <div className="h-4 bg-[#121212] flex items-center justify-center shrink-0 border-t border-[#1f1f1f]">
            <div className="w-28 h-1 bg-slate-600 rounded-full" />
          </div>

        </div>

      </div>

      {/* Live UPI Statement Full Modal / Drawer */}
      <LiveStatementModal 
        isOpen={isStatementOpen} 
        onClose={() => setIsStatementOpen(false)} 
      />

    </div>
  );
};
