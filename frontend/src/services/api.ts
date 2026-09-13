import { Transaction, RAMESH_PROFILE, INITIAL_TRANSACTIONS, SCORE_FACTORS, RADAR_RISK_DATA } from '../data/mockData';
import { AffordabilityResult } from '../context/AppContext';

const API_BASE = '/api';

export const api = {
  // Healthcheck
  async checkHealth(): Promise<{ status: string; timestamp?: string }> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return { status: 'client-offline-fallback' };
  },

  // Merchant Profile
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return RAMESH_PROFILE;
  },

  // Transactions Stream
  async getTransactions(): Promise<Transaction[]> {
    try {
      const res = await fetch(`${API_BASE}/transactions`);
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return INITIAL_TRANSACTIONS;
  },

  // Live UPI Inflow Simulation
  async simulateLiveCredit(customAmount?: number): Promise<{ transaction: Transaction; chimeAmount: number }> {
    try {
      const res = await fetch(`${API_BASE}/transactions/live`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: customAmount }),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback handled in client
    }
    const randomAmounts = [20, 30, 45, 60, 80, 110, 150];
    const amount = customAmount || randomAmounts[Math.floor(Math.random() * randomAmounts.length)];
    const mockTxn: Transaction = {
      id: `UPI-TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      referenceId: `UPI/${Math.floor(100000 + Math.random() * 900000)}/AXIS`,
      timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      timeRaw: 'Live',
      date: 'Today',
      counterpartyVpa: 'customer.live@okaxis',
      counterpartyName: 'Live Customer',
      categoryTag: 'Regular Chai',
      amount,
      type: 'CREDIT',
      payerEntropy: 'Unique Customer',
      hourOfDay: new Date().getHours(),
      note: 'Live UPI QR Payment',
    };
    return { transaction: mockTxn, chimeAmount: amount };
  },

  // Can I Afford This? Purchase Advisor
  async evaluateAffordability(amount: number, customLabel?: string): Promise<AffordabilityResult> {
    try {
      const res = await fetch(`${API_BASE}/affordability/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, customLabel }),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    const label = customLabel || `₹${amount.toLocaleString('en-IN')} Purchase`;
    if (amount <= 3000) {
      return {
        amount,
        label,
        tier: 'green',
        title: 'Safe to Buy in Cash',
        description: `Will not impact your working capital. Covered by 1.2 days of your average daily UPI surplus (₹${RAMESH_PROFILE.dailyAvgVolume.toLocaleString('en-IN')}/day).`,
        metricBadge: 'Zero Working Capital Strain',
        impactPercent: Math.round((amount / RAMESH_PROFILE.dailyAvgVolume) * 100),
      };
    } else if (amount <= 15000) {
      const suggestedEmi = Math.round((amount * 1.1) / 60);
      const tenureDays = 60;
      return {
        amount,
        label,
        tier: 'yellow',
        title: 'Safe via Sachet Micro-EMI',
        description: `Proposed New Micro-EMI for this purchase: ₹${suggestedEmi}/day for ${tenureDays} days via UPI AutoPay. Zero cash crunch.`,
        metricBadge: `Proposed New Micro-EMI: ₹${suggestedEmi}/day`,
        suggestedEmi,
        tenureDays,
        impactPercent: Math.round((suggestedEmi / RAMESH_PROFILE.dailyAvgVolume) * 100),
      };
    } else {
      return {
        amount,
        label,
        tier: 'red',
        title: 'Caution: Exceeds Safe Threshold',
        description: `Drains 72% of 30-day net surplus. High risk of supplier payment default. Recommended: Save ₹90/day into your liquid buffer first for 45 days.`,
        metricBadge: 'High Working Capital Risk',
        impactPercent: 72,
      };
    }
  },

  // Account Aggregator Credit Score & Factors
  async getCreditScore() {
    try {
      const res = await fetch(`${API_BASE}/credit-score`);
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return {
      trustScore: RAMESH_PROFILE.trustScore,
      maxTrustScore: RAMESH_PROFILE.maxTrustScore,
      trustTier: RAMESH_PROFILE.trustTier,
      payerDiversityIndex: RAMESH_PROFILE.payerDiversityIndex,
      washTradeLoops: RAMESH_PROFILE.washTradeLoops,
      scoreFactors: SCORE_FACTORS,
      radarRiskData: RADAR_RISK_DATA,
    };
  },

  // Loans & Mandates
  async getLoanData() {
    try {
      const res = await fetch(`${API_BASE}/loans`);
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return {
      sanctioned: RAMESH_PROFILE.initialLoanSanctioned,
      outstanding: RAMESH_PROFILE.initialLoanOutstanding,
      dailyDebit: RAMESH_PROFILE.initialDailyDebit,
      loanId: 'LN-PSL-2026-8812',
      consecutiveDays: 62,
      isAutoPaused: false,
      lastSanctionDate: '12 Jan 2026',
      mandateVpa: 'finshield.mandate@axis',
    };
  },

  // Sanction Underwriter Loan
  async sanctionLoan(sanctionAmount: number, dailyEmi: number, tenureDays: number) {
    try {
      const res = await fetch(`${API_BASE}/loans/sanction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sanctionAmount, dailyEmi, tenureDays }),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    const newId = `LN-PSL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      loanId: newId,
      sanctioned: sanctionAmount,
      outstanding: sanctionAmount,
      dailyDebit: dailyEmi,
      tenureDays,
      status: 'SANCTIONED_ACTIVE',
    };
  },

  // Rainy Day Toggle
  async toggleRainyDay(isRainy: boolean) {
    try {
      const res = await fetch(`${API_BASE}/loans/rainy-day`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRainy }),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return { isAutoPaused: isRainy };
  },
};
