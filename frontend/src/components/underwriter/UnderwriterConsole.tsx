import React from 'react';
import { UnderwriterHeader } from './UnderwriterHeader';
import { GraphIntelligenceSection } from './GraphIntelligenceSection';
import { TransactionStreamTable } from './TransactionStreamTable';
import { DecisionSanctionPanel } from './DecisionSanctionPanel';
import { Shield } from 'lucide-react';

export const UnderwriterConsole: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Banner KPI Header */}
      <UnderwriterHeader />

      {/* Section A: Anti-Wash Trading & Graph Intelligence */}
      <GraphIntelligenceSection />

      {/* Section B: Raw UPI Inflow Stream Table */}
      <TransactionStreamTable />

      {/* Section C: Credit Decisioning & Sanction Panel */}
      <DecisionSanctionPanel />

      {/* Institutional Compliance Footer */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>FinShield Underwriting Engine v4.2 • RBI Sahamati Account Aggregator Architecture</span>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Consent ID: AA-SETU-98214-LIVE • Compliant with RBI Digital Lending Guidelines 2026
        </div>
      </div>

    </div>
  );
};
