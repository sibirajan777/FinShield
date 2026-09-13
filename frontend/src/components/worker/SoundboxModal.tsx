import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Volume2, 
  X, 
  Play, 
  Radio
} from 'lucide-react';

export const SoundboxModal: React.FC = () => {
  const { isSoundboxModalOpen, setIsSoundboxModalOpen, simulateLiveCredit } = useApp();
  const [selectedLang, setSelectedLang] = useState<'hindi' | 'english' | 'kannada'>('hindi');

  if (!isSoundboxModalOpen) return null;

  const quickAmounts = [20, 30, 45, 60, 100, 150];

  const handleSoundTest = (amount: number) => {
    simulateLiveCredit(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Volume2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-500/30">
                Hardware & Audio Telemetry
              </span>
              <h3 className="text-base font-bold text-white font-heading mt-0.5">
                UPI Smart Soundbox 4G
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsSoundboxModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Representation */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/30 flex items-center gap-4">
          <div className="w-16 h-20 rounded-xl bg-slate-800 border-2 border-indigo-500/40 flex flex-col items-center justify-center relative shadow-inner shrink-0">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
              <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
            </div>
            <div className="mt-1.5 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white">FinShield Smart Soundbox</div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Simulates audio chimes and voice confirmations for every QR code payment.
            </p>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>4G SIM Active • 92% Battery</span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-slate-300">Voice Language</label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {[
              { id: 'hindi', label: 'हिंदी (Hindi)' },
              { id: 'english', label: 'English' },
              { id: 'kannada', label: 'ಕನ್ನಡ (Kannada)' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id as 'hindi' | 'english' | 'kannada')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                  selectedLang === lang.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Amount Audio Triggers */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-slate-300">
            Trigger Live Sound Chime & Payment Inflow:
          </label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handleSoundTest(amt)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 active:scale-95 group"
              >
                <Play className="w-3 h-3 text-emerald-400 group-hover:text-white fill-current" />
                <span>+ ₹{amt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5">
          <button
            onClick={() => setIsSoundboxModalOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
