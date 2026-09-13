import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RAMESH_PROFILE, HOURLY_INFLOW_DATA, RADAR_RISK_DATA } from '../../data/mockData';
import { 
  Network, 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const GraphIntelligenceSection: React.FC = () => {
  const { uniqueCounterpartiesCount, washTradeLoopsCount, payerDiversityIndex } = useApp();
  const [activeTab, setActiveTab] = useState<'clustering' | 'radar' | 'topology'>('clustering');

  return (
    <div className="relative z-0 overflow-hidden glass-card-underwriter rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl text-slate-100">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <Network className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-heading">
                Section A: Anti-Wash Trading & Graph Intelligence
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Perfios CAM Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Graph neural network analysis verifying genuine organic retail footfall vs circular liquidity loops.
            </p>
          </div>
        </div>

        {/* Visual Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('clustering')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'clustering'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hourly Clustering
          </button>
          <button
            onClick={() => setActiveTab('topology')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'topology'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Graph Topology
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'radar'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5-Pillar Radar
          </button>
        </div>
      </div>

      {/* 4 Core Verification Pillar Cards */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Pillar 1: Payer Diversity */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Payer Diversity Index</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">
            {payerDiversityIndex.toFixed(2)}
          </div>
          <div className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Healthy Commercial (&gt; 0.75 target)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
            High counterparty entropy confirms individual retail consumer footfall.
          </p>
        </div>

        {/* Pillar 2: Wash Trading & Circular Detection (Internal Consistency Fix) */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Circular / Wash Trading</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
            <span>{washTradeLoopsCount === 0 ? 'PASS' : 'FLAGGED'}</span>
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${
              washTradeLoopsCount === 0 
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/20 border-rose-500/30 text-rose-300'
            }`}>
              {washTradeLoopsCount} {washTradeLoopsCount === 1 ? 'Loop' : 'Loops'}
            </span>
          </div>
          <div className="text-xs text-emerald-300 font-medium mt-1">
            {washTradeLoopsCount} Circular {washTradeLoopsCount === 1 ? 'Loop' : 'Loops'} Detected
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
            {washTradeLoopsCount === 0
              ? 'No round-trip circular fund recycling between recurring friendly VPAs.'
              : 'Circular transaction pairs detected between counterparties.'}
          </p>
        </div>

        {/* Pillar 3: Unique Counterparty Count (Computed from real transaction array) */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Unique Counterparties</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">
            {uniqueCounterpartiesCount}
          </div>
          <div className="text-xs text-indigo-300 font-medium mt-1">
            Distinct VPAs (From Live Inflow Stream)
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
            Average ticket size ₹38 per transaction matches quick-service beverage stall.
          </p>
        </div>

        {/* Pillar 4: Operating Hours Clustering */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Operating Hours Cluster</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-sm font-bold text-amber-300 mt-1">
            07:00–11:00 & 16:30–20:30
          </div>
          <div className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>94% Food & Beverage Fit</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
            Inflow timing precisely aligns with breakfast tea and evening snack rushes.
          </p>
        </div>

      </div>

      {/* Visual Analytics Tab Content */}
      <div className="relative z-0 overflow-hidden mt-5 p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800">
        
        {/* Tab 1: Hourly Inflow Clustering Chart */}
        {activeTab === 'clustering' && (
          <div className="relative z-0 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white font-heading">
                  Hourly UPI Inflow Distribution & Rush Hour Clustering
                </h3>
                <p className="text-xs text-slate-400">
                  Transaction volume (₹) mapped across 24-hour cycle showing distinct bimodal retail peaks.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Peak Rush</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-indigo-500" />
                  <span>Regular Flow</span>
                </div>
              </div>
            </div>

            <div className="relative z-0 h-64 w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HOURLY_INFLOW_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="hour" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickFormatter={(v) => `₹${v}`}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#334155', 
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: '#f8fafc'
                    }}
                    formatter={(val: any) => [`₹${val}`, 'Inflow Volume']}
                    labelFormatter={(label) => `Time: ${label} IST`}
                  />
                  <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                    {HOURLY_INFLOW_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.intensity === 'peak' ? '#10b981' : entry.intensity === 'medium' ? '#6366f1' : '#334155'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: Graph Topology Visualization */}
        {activeTab === 'topology' && (
          <div className="relative z-0 overflow-hidden">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white font-heading">
                Multi-Hop Graph Topology Network (Zero Circular Loop Validation)
              </h3>
              <p className="text-xs text-slate-400">
                Hub-and-spoke star network pattern proving unilateral consumer-to-merchant retail disbursements.
              </p>
            </div>

            {/* Interactive Simulated Node Graph Canvas */}
            <div className="relative z-0 h-64 w-full bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden p-4">
              
              {/* Central Ramesh Node */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs ring-4 ring-emerald-500/30 shadow-xl glow-emerald animate-pulse-subtle">
                  Ramesh
                </div>
                <span className="text-[11px] font-mono text-emerald-300 mt-1 font-semibold">
                  ramesh.tea@okaxis
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mt-0.5">
                  Merchant Hub (Node 0)
                </span>
              </div>

              {/* Surrounding Counterparty Cluster Nodes */}
              <div className="absolute left-6 top-8 p-2 rounded-lg bg-indigo-950 border border-indigo-500/40 text-center animate-float">
                <div className="text-[10px] font-bold text-indigo-300">anand88@okicici</div>
                <div className="text-[9px] text-slate-400">Inflow: +₹30 (Daily 08:14)</div>
              </div>

              <div className="absolute left-10 bottom-8 p-2 rounded-lg bg-indigo-950 border border-indigo-500/40 text-center animate-float" style={{ animationDelay: '0.8s' }}>
                <div className="text-[10px] font-bold text-indigo-300">priya.s@oksbi</div>
                <div className="text-[9px] text-slate-400">Inflow: +₹60 (Daily 08:26)</div>
              </div>

              <div className="absolute right-6 top-8 p-2 rounded-lg bg-indigo-950 border border-indigo-500/40 text-center animate-float" style={{ animationDelay: '0.4s' }}>
                <div className="text-[10px] font-bold text-indigo-300">vikram.tech@paytm</div>
                <div className="text-[9px] text-slate-400">Inflow: +₹45 (Morning)</div>
              </div>

              {/* Supplier Node */}
              <div className="absolute right-8 bottom-6 p-2 rounded-lg bg-rose-950 border border-rose-500/40 text-center">
                <div className="text-[10px] font-bold text-rose-300">amul.distributor@icici</div>
                <div className="text-[9px] text-slate-300">Debit: -₹2,400 (Wholesale Milk)</div>
              </div>

              {/* SVG Connecting Rays */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="20%" y1="25%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="75%" y1="80%" x2="50%" y2="50%" stroke="#f43f5e" strokeWidth="2" />
              </svg>

              <div className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-mono">
                Graph Neural Model: DeepWalk-v4 • Circular loop count = {washTradeLoopsCount}
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: 5-Pillar Radar Chart */}
        {activeTab === 'radar' && (
          <div className="relative z-0 overflow-hidden">
            <div className="mb-2">
              <h3 className="text-sm font-bold text-white font-heading">
                5-Pillar Credit Appraisal Risk Radar
              </h3>
              <p className="text-xs text-slate-400">
                Multivariate scoring benchmarked against informal micro-merchants in Karnataka.
              </p>
            </div>

            <div className="relative z-0 h-64 w-full flex items-center justify-center overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_RISK_DATA}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
                  <Radar
                    name="Ramesh Chai Stall"
                    dataKey="A"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#334155', 
                      borderRadius: '0.75rem',
                      fontSize: '12px' 
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
