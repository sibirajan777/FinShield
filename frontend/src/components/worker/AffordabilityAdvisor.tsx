import React, { useState, forwardRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calculator, 
  Mic, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  CreditCard, 
  AlertTriangle,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export const AffordabilityAdvisor = forwardRef<HTMLInputElement>((_, ref) => {
  const { evaluateAffordability, currentAffordabilityResult } = useApp();
  const [inputVal, setInputVal] = useState<string>('');
  const [selectedPill, setSelectedPill] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const sampleChips = [
    { label: '₹1,500 Restock', amount: 1500 },
    { label: '₹8,000 Grinder', amount: 8000 },
    { label: '₹25,000 Scooter', amount: 25000 }
  ];

  const handleChipClick = (amount: number, label: string) => {
    setSelectedPill(label);
    setInputVal(amount.toString());
    evaluateAffordability(amount, label);
  };

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = parseFloat(inputVal.replace(/[^0-9.]/g, ''));
    if (!isNaN(cleanNum) && cleanNum > 0) {
      evaluateAffordability(cleanNum);
      setSelectedPill(null);
    }
  };

  const handleMicClick = () => {
    setIsListening(true);
    setInputVal('12000');
    setTimeout(() => {
      setIsListening(false);
      evaluateAffordability(12000, '₹12,000 Smartphone');
    }, 1000);
  };

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-[#2d2f31] shadow-lg text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1b332b] text-[#81c995] flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 font-heading">
            Can I Afford This?
          </span>
        </div>
      </div>

      {/* Voice / Chat Search Bar Style */}
      <form onSubmit={handleEvaluate} className="relative">
        <input
          ref={ref}
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            setSelectedPill(null);
          }}
          placeholder={isListening ? "Listening... (e.g. ₹12,000 phone)" : "Ask anything... (e.g. ₹12,000 phone)"}
          className="w-full pl-3.5 pr-20 py-2.5 bg-[#2d2f31] border border-[#3c4043] focus:border-[#8ab4f8] rounded-full text-xs font-medium text-white placeholder-slate-400 outline-none transition-all shadow-inner"
        />

        <div className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center gap-1">
          {/* Mic Button */}
          <button
            type="button"
            onClick={handleMicClick}
            className={`p-1.5 rounded-full text-slate-300 hover:text-white transition-all ${
              isListening ? 'bg-rose-600 text-white animate-pulse' : 'hover:bg-[#3c4043]'
            }`}
            title="Voice input simulation"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputVal || parseFloat(inputVal) <= 0}
            className="p-1.5 rounded-full bg-[#8ab4f8] hover:bg-[#a8c7fa] disabled:opacity-40 disabled:hover:bg-[#8ab4f8] text-slate-950 transition-all shadow-sm flex items-center justify-center"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </form>

      {/* Quick Suggestion Chips */}
      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] text-slate-400 mr-0.5">Quick:</span>
        {sampleChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => handleChipClick(chip.amount, chip.label)}
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-all font-medium ${
              selectedPill === chip.label
                ? 'bg-[#8ab4f8] text-slate-950 border-[#8ab4f8] shadow-sm font-semibold'
                : 'bg-[#2d2f31] text-slate-300 border-[#3c4043] hover:bg-[#3c4043]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Dynamic Results Box */}
      {currentAffordabilityResult && (
        <div className="mt-3.5 pt-3 border-t border-[#2d2f31] animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* GREEN TIER: Under ₹3,000 */}
          {currentAffordabilityResult.tier === 'green' && (
            <div className="p-3.5 rounded-xl bg-[#132d20] border border-[#81c995]/40 text-slate-100">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#81c995] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#81c995]">
                      {currentAffordabilityResult.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1b3d2b] text-[#81c995]">
                      ₹{currentAffordabilityResult.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                    {currentAffordabilityResult.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* YELLOW TIER: ₹3,001 - ₹15,000 */}
          {currentAffordabilityResult.tier === 'yellow' && (
            <div className="p-3.5 rounded-xl bg-[#2e2612] border border-amber-500/40 text-slate-100">
              <div className="flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-300">
                      {currentAffordabilityResult.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3d3319] text-amber-300">
                      ₹{currentAffordabilityResult.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                    {currentAffordabilityResult.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between bg-[#1f1f1f] p-2 rounded-lg text-[10px]">
                    <span className="text-slate-300 font-medium">Daily AutoPay: <strong className="text-amber-300 font-mono">₹165/day</strong></span>
                    <span className="text-slate-400 font-medium">Term: 60 Days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RED TIER: Above ₹15,000 */}
          {currentAffordabilityResult.tier === 'red' && (
            <div className="p-3.5 rounded-xl bg-[#2e1518] border border-rose-500/40 text-slate-100">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-rose-300">
                      {currentAffordabilityResult.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3d1c20] text-rose-300">
                      ₹{currentAffordabilityResult.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                    {currentAffordabilityResult.description}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
});

AffordabilityAdvisor.displayName = 'AffordabilityAdvisor';
