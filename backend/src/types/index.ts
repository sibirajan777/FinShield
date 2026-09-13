export interface Transaction {
  id: string;
  referenceId: string;
  timestamp: string;
  timeRaw: string;
  date: string;
  counterpartyVpa: string;
  counterpartyName: string;
  categoryTag: 'Morning Rush' | 'Regular Chai' | 'Evening Snacks' | 'Quick Refresh' | 'Supplier Debit' | 'Wholesale Provisions' | 'UPI AutoPay';
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  payerEntropy: 'Unique Customer' | 'Verified Regular' | 'Commercial' | 'Supplier/Vendor' | 'Mandate Debit';
  hourOfDay: number;
  note: string;
}

export interface InflowHourData {
  hour: string;
  volume: number;
  txnCount: number;
  intensity: 'low' | 'medium' | 'peak';
}

export interface ScoreFactor {
  factor: string;
  score: number;
  maxScore: number;
  status: 'Excellent' | 'Good' | 'Fair';
  description: string;
  benchmark: string;
}

export interface RadarRiskData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface MerchantProfile {
  name: string;
  businessName: string;
  businessType: string;
  location: string;
  vpa: string;
  primaryBank: string;
  phoneMasked: string;
  gstStatus: string;
  annualizedRunRate: number;
  dailyAvgVolume: number;
  monthlyTurnoverAvg: number;
  aaConsentId: string;
  aaProvider: string;
  aaSyncTimestamp: string;
  trustScore: number;
  maxTrustScore: number;
  trustTier: string;
  payerDiversityIndex: number;
  uniqueCustomers60Days: number;
  washTradeLoops: number;
  circularTradesStatus: string;
  initialBankBalance: number;
  initialStashBalance: number;
  initialLoanSanctioned: number;
  initialLoanOutstanding: number;
  initialDailyDebit: number;
  recommendedSanction: number;
  recommendedDailyEmi: number;
  recommendedTenureDays: number;
  recommendedInterestRate: number;
}

export interface AffordabilityResult {
  amount: number;
  label: string;
  tier: 'green' | 'yellow' | 'red';
  title: string;
  description: string;
  metricBadge: string;
  suggestedEmi?: number;
  tenureDays?: number;
  impactPercent?: number;
}

export interface LoanData {
  sanctioned: number;
  outstanding: number;
  dailyDebit: number;
  loanId: string;
  consecutiveDays: number;
  isAutoPaused: boolean;
  lastSanctionDate: string;
  mandateVpa: string;
}
