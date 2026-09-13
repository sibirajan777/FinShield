import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  AlertTriangle, 
  CloudRain, 
  Sparkles,
  Info
} from 'lucide-react';

interface DayData {
  day: string;
  label: string;
  amount: number;
  isCurrent?: boolean;
  isProjected?: boolean;
  isRain?: boolean;
}

interface WeekData {
  week: string;
  label: string;
  amount: number;
  isCurrent?: boolean;
  isProjected?: boolean;
}

export const RevenueAnalyticsCard: React.FC = () => {
  const { stashBalance, isRainyDay, toggleRainyDay } = useApp();

  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(3); // Default Thu (today) for weekly
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

  // Chart max value for normalization
  const maxWeekly = Math.max(...currentWeeklyList.map(d => d.amount));
  const maxMonthly = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-[#2d2f31] shadow-lg text-slate-100 relative overflow-hidden">
      
      {/* 1. Header & Segmented Pill Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#283548] text-[#8ab4f8] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200 font-heading">
              Business Revenue Analytics
            </h3>
            <p className="text-[10px] text-slate-400">Cashflow velocity & trends</p>
          </div>
        </div>

        {/* Segmented Pill Toggle: Weekly | Monthly */}
        <div className="flex items-center p-0.5 rounded-full bg-[#121212] border border-[#2d2f31]">
          <button
            type="button"
            onClick={() => {
              setTimeframe('weekly');
              setActiveBarIndex(3);
            }}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
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
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
              timeframe === 'monthly'
                ? 'bg-[#283548] text-[#8ab4f8] shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* 2. Summary Metric & Growth Pill */}
      <div className="mt-3 flex items-baseline justify-between border-t border-[#2d2f31] pt-3">
        <div>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            {timeframe === 'weekly' ? 'This Week Revenue' : 'This Month Revenue'}
          </span>
          <div className="text-xl font-extrabold text-white font-mono mt-0.5">
            {timeframe === 'weekly' 
              ? (isDipActive ? '₹11,800' : '₹18,450') 
              : '₹74,800'}
          </div>
        </div>

        {/* Growth vs Previous Period Badge */}
        {timeframe === 'weekly' ? (
          isDipActive ? (
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold flex items-center gap-1">
              -24% vs last week
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
              +12% vs last week
            </span>
          )
        ) : (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
            +8% vs last month
          </span>
        )}
      </div>

      {/* 3. Interactive Visual Bar Chart */}
      <div className="mt-3.5 pt-2">
        
        {/* Tooltip / Active Bar Detail Banner */}
        <div className="h-6 flex items-center justify-between px-2 rounded-lg bg-[#121212] border border-[#2d2f31] text-[11px] mb-2.5">
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
              <span className="text-slate-500 text-[10px]">Tap any bar to inspect daily earnings</span>
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
              <span className="text-slate-500 text-[10px]">Tap any bar to inspect weekly earnings</span>
            )
          )}
        </div>

        {/* Chart Container */}
        <div className="h-32 flex items-end justify-between gap-1.5 px-2 pb-1 border-b border-[#2d2f31]">
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
                  {/* Bar */}
                  <div className="w-full flex items-end justify-center h-full">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 group-hover:opacity-90 ${
                        item.isCurrent
                          ? (isDipActive 
                              ? 'bg-amber-500 shadow-sm shadow-amber-500/30' 
                              : 'bg-emerald-500 shadow-sm shadow-emerald-500/30 ring-1 ring-emerald-400/50')
                          : isSelected
                            ? 'bg-[#8ab4f8]'
                            : item.isRain
                              ? 'bg-slate-700/80 border border-amber-500/30'
                              : 'bg-[#283548]'
                      }`}
                    />
                  </div>
                  {/* Label */}
                  <span className={`text-[10px] mt-1.5 font-bold transition-colors ${
                    item.isCurrent 
                      ? (isDipActive ? 'text-amber-400' : 'text-emerald-400 font-extrabold') 
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
                  {/* Bar */}
                  <div className="w-full flex items-end justify-center h-full">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[44px] rounded-t-md transition-all duration-300 group-hover:opacity-90 ${
                        item.isCurrent
                          ? 'bg-emerald-500 shadow-sm shadow-emerald-500/30 ring-1 ring-emerald-400/50'
                          : item.isProjected
                            ? 'bg-[#283548] border-2 border-dashed border-[#8ab4f8]/60'
                            : isSelected
                              ? 'bg-[#8ab4f8]'
                              : 'bg-[#283548]'
                      }`}
                    />
                  </div>
                  {/* Label */}
                  <span className={`text-[10px] mt-1.5 font-bold transition-colors ${
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

        {/* Legend */}
        <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2 px-1">
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

      {/* 4. Early Income-Dip Simulation Toggle Button */}
      <div className="mt-3 pt-2.5 border-t border-[#2d2f31] flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            const nextDip = !simulateDip;
            setSimulateDip(nextDip);
            if (nextDip !== isRainyDay) {
              toggleRainyDay();
            }
          }}
          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
            isDipActive
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
              : 'bg-[#121212] text-slate-400 border-[#2d2f31] hover:text-slate-200'
          }`}
          title="Toggle rainy week stress scenario"
        >
          <CloudRain className={`w-3 h-3 ${isDipActive ? 'text-amber-400' : 'text-slate-400'}`} />
          <span>{isDipActive ? 'Simulating Rain/Dip Week (Active)' : 'Simulate Rain/Dip Week'}</span>
        </button>

        <span className="text-[10px] font-mono text-slate-400">
          Inflow Stability: <strong className={isDipActive ? 'text-amber-400' : 'text-emerald-400'}>
            {isDipActive ? '72% (Stressed)' : '96% (Optimal)'}
          </strong>
        </span>
      </div>

      {/* 5. Early Income-Dip Warning Banner */}
      {isDipActive && (
        <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-semibold text-amber-300">
              Income Dip Detected
            </div>
            <p className="text-[11px] text-amber-100/90 mt-0.5 leading-relaxed">
              ⚠️ Weekly inflow is 24% below average due to rainy days. Your <strong className="text-white font-mono">₹{stashBalance.toLocaleString('en-IN')}</strong> Safety Net is ready if needed.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
