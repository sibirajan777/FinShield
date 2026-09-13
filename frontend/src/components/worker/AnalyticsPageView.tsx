import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  AlertTriangle, 
  CloudRain, 
  ArrowLeft,
  Coffee,
  Cookie,
  PieChart,
  Activity,
  Calendar,
  Sparkles
} from 'lucide-react';

interface AnalyticsPageViewProps {
  onBackClick: () => void;
}

interface DayData {
  day: string;
  label: string;
  amount: number;
  isCurrent?: boolean;
  isRain?: boolean;
}

interface WeekData {
  week: string;
  label: string;
  amount: number;
  isCurrent?: boolean;
  isProjected?: boolean;
}

export const AnalyticsPageView: React.FC<AnalyticsPageViewProps> = ({ onBackClick }) => {
  const { stashBalance, isRainyDay, toggleRainyDay } = useApp();

  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(3); // Default Thu (today)
  const [simulateDip, setSimulateDip] = useState<boolean>(false);

  // Normal Weekly Dataset (7 days)
  const normalWeeklyData: DayData[] = [
    { day: 'Monday', label: 'M', amount: 2100 },
    { day: 'Tuesday', label: 'T', amount: 2600 },
    { day: 'Wednesday', label: 'W', amount: 2300 },
    { day: 'Thursday (Today)', label: 'T', amount: 2840, isCurrent: true },
    { day: 'Friday', label: 'F', amount: 2950 },
    { day: 'Saturday', label: 'S', amount: 3400 },
    { day: 'Sunday', label: 'S', amount: 2260 }
  ];

  // Rainy / Income Dip Dataset (-24% drop)
  const dipWeeklyData: DayData[] = [
    { day: 'Monday', label: 'M', amount: 2100 },
    { day: 'Tuesday', label: 'T', amount: 2400 },
    { day: 'Wednesday', label: 'W', amount: 1300, isRain: true },
    { day: 'Thursday (Today)', label: 'T', amount: 1150, isCurrent: true, isRain: true },
    { day: 'Friday', label: 'F', amount: 1400, isRain: true },
    { day: 'Saturday', label: 'S', amount: 1900 },
    { day: 'Sunday', label: 'S', amount: 1550 }
  ];

  // Monthly Dataset (4 weeks)
  const monthlyData: WeekData[] = [
    { week: 'Week 1', label: 'W1', amount: 17200 },
    { week: 'Week 2', label: 'W2', amount: 19100 },
    { week: 'Week 3 (Current)', label: 'W3', amount: 18450, isCurrent: true },
    { week: 'Week 4 (Projected)', label: 'W4', amount: 20050, isProjected: true }
  ];

  const isDipActive = simulateDip || isRainyDay;
  const currentWeeklyList = isDipActive ? dipWeeklyData : normalWeeklyData;

  const maxWeekly = Math.max(...currentWeeklyList.map(d => d.amount));
  const maxMonthly = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="space-y-3.5 pb-4 animate-in fade-in duration-200">
      
      {/* 1. Header with Back Button */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackClick}
            className="p-2 rounded-xl bg-[#1f1f1f] border border-[#2d2f31] text-slate-300 hover:text-white hover:bg-[#283548] transition-all cursor-pointer"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-white font-heading">
              Business Analytics
            </h2>
          </div>
        </div>

        {/* Segmented Pill Toggle: Weekly | Monthly */}
        <div className="flex items-center p-0.5 rounded-full bg-[#1f1f1f] border border-[#2d2f31]">
          <button
            type="button"
            onClick={() => {
              setTimeframe('weekly');
              setActiveBarIndex(3);
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
              timeframe === 'weekly'
                ? 'bg-[#283548] text-[#8ab4f8] shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeframe('monthly');
              setActiveBarIndex(2);
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
              timeframe === 'monthly'
                ? 'bg-[#283548] text-[#8ab4f8] shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* 2. Large KPI Summaries Grid */}
      <div className="grid grid-cols-3 gap-2">
        {/* KPI 1: Total In */}
        <div className="p-3 rounded-xl bg-[#1f1f1f] border border-[#2d2f31]">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
            Total In
          </span>
          <div className="text-base font-extrabold text-white font-mono mt-0.5">
            {timeframe === 'weekly'
              ? (isDipActive ? '₹11,800' : '₹18,450')
              : '₹74,800'}
          </div>
          <div className="text-[9px] font-semibold mt-1">
            {timeframe === 'weekly' ? (
              isDipActive ? (
                <span className="text-rose-400">-24% dip</span>
              ) : (
                <span className="text-emerald-400">+12% vs last</span>
              )
            ) : (
              <span className="text-emerald-400">+8% vs last</span>
            )}
          </div>
        </div>

        {/* KPI 2: Daily Avg */}
        <div className="p-3 rounded-xl bg-[#1f1f1f] border border-[#2d2f31]">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
            Daily Avg
          </span>
          <div className="text-base font-extrabold text-[#8ab4f8] font-mono mt-0.5">
            ₹2,635
          </div>
          <div className="text-[9px] text-slate-400 mt-1 font-medium">
            32 avg payments
          </div>
        </div>

        {/* KPI 3: Best Day */}
        <div className="p-3 rounded-xl bg-[#1f1f1f] border border-[#2d2f31]">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
            Best Day
          </span>
          <div className="text-base font-extrabold text-amber-300 font-mono mt-0.5">
            Saturday
          </div>
          <div className="text-[9px] text-slate-400 mt-1 font-medium font-mono">
            ₹3,400 record
          </div>
        </div>
      </div>

      {/* 3. High-Fidelity Visual Bar Chart Card */}
      <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-[#2d2f31] shadow-lg">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-200 font-heading flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#8ab4f8]" />
            <span>Revenue Trajectory</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            Tap any bar to inspect
          </span>
        </div>

        {/* Tooltip Display */}
        <div className="h-7 flex items-center justify-between px-2.5 rounded-lg bg-[#121212] border border-[#2d2f31] text-[11px] mb-3">
          {timeframe === 'weekly' ? (
            activeBarIndex !== null && currentWeeklyList[activeBarIndex] ? (
              <>
                <span className="text-slate-400 font-medium">
                  {currentWeeklyList[activeBarIndex].day}:
                </span>
                <span className="font-extrabold text-[#81c995] font-mono">
                  ₹{currentWeeklyList[activeBarIndex].amount.toLocaleString('en-IN')}
                </span>
              </>
            ) : (
              <span className="text-slate-500 text-[10px]">Select a day</span>
            )
          ) : (
            activeBarIndex !== null && monthlyData[activeBarIndex] ? (
              <>
                <span className="text-slate-400 font-medium">
                  {monthlyData[activeBarIndex].week}:
                </span>
                <span className="font-extrabold text-[#8ab4f8] font-mono">
                  ₹{monthlyData[activeBarIndex].amount.toLocaleString('en-IN')}
                </span>
              </>
            ) : (
              <span className="text-slate-500 text-[10px]">Select a week</span>
            )
          )}
        </div>

        {/* Bar Chart Canvas */}
        <div className="h-36 flex items-end justify-between gap-2 px-2 pb-1 border-b border-[#2d2f31]">
          {timeframe === 'weekly' ? (
            currentWeeklyList.map((item, index) => {
              const heightPercent = Math.max(16, Math.round((item.amount / maxWeekly) * 100));
              const isSelected = activeBarIndex === index;

              return (
                <div 
                  key={index}
                  onClick={() => setActiveBarIndex(index)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  <div className="w-full flex items-end justify-center h-full">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 group-hover:opacity-90 ${
                        item.isCurrent
                          ? (isDipActive 
                              ? 'bg-amber-500 shadow-md shadow-amber-500/30' 
                              : 'bg-emerald-500 shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400/50')
                          : isSelected
                            ? 'bg-[#8ab4f8]'
                            : item.isRain
                              ? 'bg-slate-700/80 border border-amber-500/40'
                              : 'bg-[#283548]'
                      }`}
                    />
                  </div>
                  <span className={`text-[10px] mt-2 font-bold transition-colors ${
                    item.isCurrent 
                      ? (isDipActive ? 'text-amber-400 font-extrabold' : 'text-emerald-400 font-extrabold') 
                      : isSelected 
                        ? 'text-[#8ab4f8]' 
                        : 'text-slate-400'
                  }`}>
                    {item.label}
                  </span>
                </div>
              );
            })
          ) : (
            monthlyData.map((item, index) => {
              const heightPercent = Math.max(20, Math.round((item.amount / maxMonthly) * 100));
              const isSelected = activeBarIndex === index;

              return (
                <div 
                  key={index}
                  onClick={() => setActiveBarIndex(index)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  <div className="w-full flex items-end justify-center h-full">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[48px] rounded-t-md transition-all duration-300 group-hover:opacity-90 ${
                        item.isCurrent
                          ? 'bg-emerald-500 shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400/50'
                          : item.isProjected
                            ? 'bg-[#283548] border-2 border-dashed border-[#8ab4f8]/60'
                            : isSelected
                              ? 'bg-[#8ab4f8]'
                              : 'bg-[#283548]'
                      }`}
                    />
                  </div>
                  <span className={`text-[10px] mt-2 font-bold transition-colors ${
                    item.isCurrent 
                      ? 'text-emerald-400 font-extrabold' 
                      : isSelected 
                        ? 'text-[#8ab4f8]' 
                        : 'text-slate-400'
                  }`}>
                    {item.label}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2.5 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-emerald-500" />
            <span>Current Period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#283548]" />
            <span>Baseline History</span>
          </div>
          {timeframe === 'monthly' && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm border border-dashed border-[#8ab4f8]" />
              <span>Projected</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Income Stability Gauge */}
      <div className="p-3.5 rounded-2xl bg-[#1f1f1f] border border-[#2d2f31] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl border ${
            isDipActive 
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
          }`}>
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-heading">
              Income Health
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5 font-medium">
              {isDipActive ? '72% (Rain Impact)' : '96% (Very Stable)'}
            </div>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
          isDipActive 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        }`}>
          {isDipActive ? 'Weather Impact' : 'Very Stable'}
        </span>
      </div>

      {/* 5. Early Dip Warning / Rain Simulation Toggle */}
      <div className="p-3.5 rounded-2xl bg-[#1f1f1f] border border-[#2d2f31] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <CloudRain className="w-4 h-4 text-[#8ab4f8]" />
            <span>Monsoon / Footfall Stress Test</span>
          </span>
          <button
            type="button"
            onClick={() => {
              const next = !simulateDip;
              setSimulateDip(next);
              if (next !== isRainyDay) {
                toggleRainyDay();
              }
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isDipActive 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm ring-1 ring-amber-500/30' 
                : 'bg-[#121212] text-slate-300 border-[#2d2f31] hover:text-white'
            }`}
          >
            <span>{isDipActive ? 'Simulate Dip (Active)' : 'Simulate Rain / Dip Week'}</span>
          </button>
        </div>

        {/* Warning Card when Toggled */}
        {isDipActive && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200 leading-relaxed">
              <div className="font-semibold text-amber-300">Income Dip Detected</div>
              <p className="text-[11px] text-amber-100/90 mt-0.5">
                ⚠️ Income Dip Detected: 24% lower footfall due to rain. Safety Buffer (₹{stashBalance.toLocaleString('en-IN')}) is available to protect working capital.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 6. Top Inflow Channels */}
      <div className="p-3.5 rounded-2xl bg-[#1f1f1f] border border-[#2d2f31] space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200 font-heading">
          <span className="flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-[#8ab4f8]" />
            <span>Top Inflow Channels</span>
          </span>
          <span className="text-[10px] text-slate-400 font-normal">This Week</span>
        </div>

        {/* Channel 1: Tea & Beverages (68%) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Tea & Beverages</span>
            </span>
            <span className="font-bold font-mono text-white">
              68% <span className="text-slate-400 font-normal">(₹12,546)</span>
            </span>
          </div>
          <div className="w-full bg-[#121212] h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }} />
          </div>
        </div>

        {/* Channel 2: Snacks & Bakery (32%) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Cookie className="w-3.5 h-3.5 text-emerald-400" />
              <span>Snacks & Bakery</span>
            </span>
            <span className="font-bold font-mono text-white">
              32% <span className="text-slate-400 font-normal">(₹5,904)</span>
            </span>
          </div>
          <div className="w-full bg-[#121212] h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '32%' }} />
          </div>
        </div>
      </div>

    </div>
  );
};
