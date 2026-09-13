import React from 'react';
import { WorkerMobileFrame } from '../worker/WorkerMobileFrame';
import { UnderwriterConsole } from '../underwriter/UnderwriterConsole';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

export const SplitView: React.FC = () => {
  return (
    <div className="w-full max-w-[1700px] mx-auto py-6 px-4 sm:px-6">
      
      {/* Split View Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-indigo-950/40 to-slate-900 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
            <Layers className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-heading">
              Dual-Persona Synchronized Simulation
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Interact with Ramesh's mobile phone on the left, or sanction credit on the Bank Underwriter portal on the right to see instant bidirectional reactive state synchronization!
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-emerald-400">Live In-Memory State Sync</span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left: Worker Mobile View (5 cols on large screens) */}
        <div className="xl:col-span-4 flex justify-center sticky top-20">
          <WorkerMobileFrame />
        </div>

        {/* Right: Bank Underwriter Console (8 cols on large screens) */}
        <div className="xl:col-span-8">
          <UnderwriterConsole />
        </div>

      </div>

    </div>
  );
};
