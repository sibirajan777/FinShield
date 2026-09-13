import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  History, 
  ArrowDownLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  Repeat, 
  ChevronRight, 
  X,
  QrCode,
  ShieldCheck,
  Search
} from 'lucide-react';

interface RecentTxnItem {
  id: string;
  name: string;
  vpa: string;
  time: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  initial: string;
  avatarBg: string;
  category: string;
  isAutoPay?: boolean;
}

export const RecentTransactionsList: React.FC = () => {
  const { transactions, loanData } = useApp();
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<RecentTxnItem | null>(null);

  // Exact 5-6 requested transactions matching prompt specifications
  const recentGpayTxns: RecentTxnItem[] = [
    {
      id: 'UPI-TXN-984210',
      name: 'Arun K',
      vpa: 'arun@oksbi',
      time: 'Today, 08:42 AM',
      amount: 45,
      type: 'CREDIT',
      initial: 'A',
      avatarBg: 'bg-emerald-600',
      category: 'Morning Tea & Bun'
    },
    {
      id: 'UPI-TXN-984209',
      name: 'Amul Dairy',
      vpa: 'amul.distributor@icici',
      time: 'Today, 07:15 AM',
      amount: 1200,
      type: 'DEBIT',
      initial: 'A',
      avatarBg: 'bg-rose-600',
      category: 'Milk Supplier Restock'
    },
    {
      id: 'UPI-TXN-984208',
      name: 'Priya S',
      vpa: 'priya@okaxis',
      time: 'Today, 06:55 AM',
      amount: 20,
      type: 'CREDIT',
      initial: 'P',
      avatarBg: 'bg-indigo-600',
      category: 'Tea Stall QR'
    },
    {
      id: 'UPI-TXN-984207',
      name: 'Rajesh M',
      vpa: 'rajesh@paytm',
      time: 'Yesterday, 07:20 PM',
      amount: 110,
      type: 'CREDIT',
      initial: 'R',
      avatarBg: 'bg-amber-600',
      category: 'Snack Order'
    },
    {
      id: 'UPI-TXN-984206',
      name: 'FinShield / NBFC Mandate',
      vpa: 'finshield.mandate@axis',
      time: 'Yesterday, 10:00 PM',
      amount: loanData.dailyDebit,
      type: 'DEBIT',
      initial: 'F',
      avatarBg: 'bg-purple-600',
      category: 'Daily Sachet Loan Repayment',
      isAutoPay: true
    }
  ];

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-[#2d2f31] shadow-lg text-slate-100">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#283548] text-[#8ab4f8] flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 font-heading">
            Recent Transactions
          </span>
        </div>

        <button
          onClick={() => setIsSeeAllOpen(true)}
          className="text-xs font-semibold text-[#8ab4f8] hover:text-white flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          <span>See All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-[#2d2f31]/80">
        {recentGpayTxns.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTxn(item)}
            className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#282a2d] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
          >
            {/* Left: Avatar + Details */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-9 h-9 rounded-full ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 ring-1 ring-white/10 shadow-sm`}>
                {item.initial}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate group-hover:text-[#8ab4f8] transition-colors">
                    {item.name}
                  </span>
                  {item.isAutoPay && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                      UPI AutoPay
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {item.category} • <span className="font-mono">{item.time}</span>
                </div>
              </div>
            </div>

            {/* Right: Amount & Status */}
            <div className="text-right shrink-0">
              {item.type === 'CREDIT' ? (
                <div className="text-xs font-extrabold text-[#81c995] font-mono">
                  +₹{item.amount.toLocaleString('en-IN')}
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-100 font-mono">
                  -₹{item.amount.toLocaleString('en-IN')}
                </div>
              )}
              <div className="text-[9px] text-slate-400 font-mono flex items-center justify-end gap-0.5 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                <span>Success</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-xs w-full text-slate-100 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300">Transaction Details</span>
              <button 
                onClick={() => setSelectedTxn(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4">
              <div className={`mx-auto w-12 h-12 rounded-full ${selectedTxn.avatarBg} text-white font-extrabold text-base flex items-center justify-center shadow-lg mb-2`}>
                {selectedTxn.initial}
              </div>
              <h3 className="text-sm font-bold text-white">{selectedTxn.name}</h3>
              <div className="text-[11px] font-mono text-slate-400">{selectedTxn.vpa}</div>

              <div className="mt-3 text-2xl font-extrabold font-mono text-white">
                {selectedTxn.type === 'CREDIT' ? (
                  <span className="text-[#81c995]">+₹{selectedTxn.amount.toLocaleString('en-IN')}</span>
                ) : (
                  <span>-₹{selectedTxn.amount.toLocaleString('en-IN')}</span>
                )}
              </div>

              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed via UPI</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">UPI Ref ID:</span>
                <span className="font-mono text-slate-200">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-200">{selectedTxn.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="text-slate-200">{selectedTxn.category}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTxn(null)}
              className="mt-4 w-full py-2 rounded-xl bg-[#2d2f31] hover:bg-[#3c4043] text-slate-200 text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* "See All" Full Transaction Drawer Modal */}
      {isSeeAllOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative z-50 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <div>
                <h3 className="text-sm font-bold text-white font-heading">
                  All UPI Payment Records
                </h3>
                <p className="text-[10px] text-slate-400">Live Account Aggregator Verified Stream</p>
              </div>
              <button 
                onClick={() => setIsSeeAllOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-800">
              {transactions.slice(0, 15).map((t) => (
                <div key={t.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#283548] text-[#8ab4f8] font-bold text-xs flex items-center justify-center shrink-0">
                      {t.counterpartyName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {t.counterpartyName}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate font-mono">
                        {t.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`text-xs font-bold font-mono ${t.type === 'CREDIT' ? 'text-[#81c995]' : 'text-slate-200'}`}>
                      {t.type === 'CREDIT' ? `+₹${t.amount}` : `-₹${t.amount}`}
                    </div>
                    <div className="text-[9px] text-slate-400">{t.categoryTag}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsSeeAllOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
              >
                Close Transaction Ledger
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
