import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Search, 
  ArrowDownLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck,
  Receipt,
  Filter
} from 'lucide-react';

interface LiveStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveStatementModal: React.FC<LiveStatementModalProps> = ({ isOpen, onClose }) => {
  const { transactions } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');

  if (!isOpen) return null;

  const filteredTxns = transactions.filter((t) => {
    const matchesFilter = filterType === 'ALL' || t.type === filterType;
    const matchesSearch = 
      t.counterpartyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.counterpartyVpa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.categoryTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.referenceId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col text-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glow Header Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8ab4f8] via-indigo-500 to-emerald-400 rounded-t-2xl" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#283548] text-[#8ab4f8] border border-slate-700">
              <Receipt className="w-5 h-5 text-[#8ab4f8]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-heading">
                Live UPI Bank Statement
              </h3>
              <p className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Axis Bank •••• 8821 · Setu AA Reconciled</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Statement"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="py-3 space-y-2.5 shrink-0 border-b border-slate-800">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer, VPA or category..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#8ab4f8]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilterType('ALL')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                  filterType === 'ALL'
                    ? 'bg-[#283548] text-[#8ab4f8] border-[#8ab4f8]/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                All ({transactions.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('CREDIT')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                  filterType === 'CREDIT'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Inflows (Credits)
              </button>
              <button
                type="button"
                onClick={() => setFilterType('DEBIT')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                  filterType === 'DEBIT'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Outflows (Debits)
              </button>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {filteredTxns.length} records
            </span>
          </div>
        </div>

        {/* Scrollable Transaction Records */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80 custom-scrollbar pr-1 py-2">
          {filteredTxns.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No transactions match your search query.
            </div>
          ) : (
            filteredTxns.map((t) => (
              <div key={t.id} className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-800/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 shadow-sm ${
                    t.type === 'CREDIT' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {t.type === 'CREDIT' ? (
                      <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {t.counterpartyName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {t.counterpartyVpa}
                    </div>
                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                      {t.referenceId} • {t.timestamp}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`text-xs font-extrabold font-mono ${
                    t.type === 'CREDIT' ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    {t.type === 'CREDIT' ? `+₹${t.amount.toLocaleString('en-IN')}` : `-₹${t.amount.toLocaleString('en-IN')}`}
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/80 font-medium inline-block mt-0.5">
                    {t.categoryTag}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographically signed by Sahamati FIP</span>
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
