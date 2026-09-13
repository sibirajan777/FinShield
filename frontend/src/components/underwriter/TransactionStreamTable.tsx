import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../data/mockData';
import { 
  Table, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Building2,
  Tag
} from 'lucide-react';

export const TransactionStreamTable: React.FC = () => {
  const { transactions, simulateLiveCredit } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Filter logic
  const filtered = transactions.filter((t) => {
    const matchesSearch = 
      t.counterpartyVpa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.counterpartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.categoryTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.note.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'ALL' || t.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getEntropyBadge = (entropy: Transaction['payerEntropy']) => {
    switch (entropy) {
      case 'Unique Customer':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Unique Retail
          </span>
        );
      case 'Verified Regular':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            Verified Regular
          </span>
        );
      case 'Commercial':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Commercial Payer
          </span>
        );
      case 'Supplier/Vendor':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            Supplier/Outflow
          </span>
        );
      case 'Mandate Debit':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            AutoPay Mandate
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glass-card-underwriter rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl text-slate-100">
      
      {/* Header with Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white font-heading">
              Section B: Raw UPI Inflow Stream Table
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {transactions.length} Stream Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable transaction ledger ingested via Sahamati AA from Axis Bank Core (*8821).
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search VPA, ID, Category..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-700 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center p-0.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => { setFilterType('ALL'); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterType === 'ALL' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => { setFilterType('CREDIT'); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterType === 'CREDIT' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Credits
            </button>
            <button
              onClick={() => { setFilterType('DEBIT'); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterType === 'DEBIT' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Debits
            </button>
          </div>

          {/* Simulate Live Transaction */}
          <button
            onClick={() => simulateLiveCredit()}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center gap-1 active:scale-95"
            title="Simulate a new incoming customer UPI transaction"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Test Txn</span>
          </button>
        </div>
      </div>

      {/* High-Density Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800 font-heading">
            <tr>
              <th className="py-3 px-3.5">Txn ID</th>
              <th className="py-3 px-3.5">Timestamp</th>
              <th className="py-3 px-3.5">Counterparty VPA & Name</th>
              <th className="py-3 px-3.5">Category Tag</th>
              <th className="py-3 px-3.5 text-right">Amount (₹)</th>
              <th className="py-3 px-3.5 text-center">Payer Entropy Flag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No transactions match your search criteria.
                </td>
              </tr>
            ) : (
              currentItems.map((txn) => {
                const isCredit = txn.type === 'CREDIT';
                return (
                  <tr 
                    key={txn.id} 
                    className="hover:bg-slate-900/50 transition-colors group"
                  >
                    {/* Txn ID */}
                    <td className="py-2.5 px-3.5 font-mono text-[11px] text-slate-400 group-hover:text-indigo-300">
                      {txn.id}
                    </td>

                    {/* Timestamp */}
                    <td className="py-2.5 px-3.5 text-slate-300 whitespace-nowrap">
                      {txn.timestamp}
                    </td>

                    {/* Counterparty VPA & Name */}
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {txn.counterpartyName}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {txn.counterpartyVpa}
                      </div>
                    </td>

                    {/* Category Tag */}
                    <td className="py-2.5 px-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-[11px] text-slate-300">
                        <Tag className="w-2.5 h-2.5 text-slate-400" />
                        {txn.categoryTag}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-2.5 px-3.5 text-right font-mono text-xs font-bold whitespace-nowrap">
                      {isCredit ? (
                        <span className="text-emerald-400 flex items-center justify-end gap-0.5">
                          <ArrowDownLeft className="w-3 h-3 text-emerald-400" />
                          +₹{txn.amount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center justify-end gap-0.5">
                          <ArrowUpRight className="w-3 h-3 text-rose-400" />
                          -₹{txn.amount.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>

                    {/* Payer Entropy Flag */}
                    <td className="py-2.5 px-3.5 text-center">
                      {getEntropyBadge(txn.payerEntropy)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-3.5 flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="font-semibold text-slate-200">{filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-slate-200">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> of <span className="font-semibold text-slate-200">{filtered.length}</span> entries
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          <span className="px-2 py-0.5 text-[11px] font-mono font-medium text-slate-300">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
