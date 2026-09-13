import { 
  MerchantProfile, 
  Transaction, 
  ScoreFactor, 
  RadarRiskData, 
  InflowHourData,
  LoanData 
} from '../types/index.js';

export const RAMESH_PROFILE: MerchantProfile = {
  name: 'Ramesh Kumar',
  businessName: 'Ramesh Chai Stall & Refreshments',
  businessType: 'Unincorporated Micro-Enterprise (Sole Proprietorship)',
  location: 'Indiranagar 100ft Rd, Bengaluru, Karnataka 560038',
  vpa: 'ramesh.tea@okaxis',
  primaryBank: 'Axis Bank (Current A/c *8821)',
  phoneMasked: '+91 98840 •••••',
  gstStatus: 'Legally Exempt (< ₹40 Lakh Annual Turnover)',
  annualizedRunRate: 894250,
  dailyAvgVolume: 2450,
  monthlyTurnoverAvg: 74520,
  aaConsentId: 'AA-SETU-98214-LIVE',
  aaProvider: 'Setu (Sahamati FIP Network)',
  aaSyncTimestamp: 'Today, 2 mins ago',
  trustScore: 762,
  maxTrustScore: 850,
  trustTier: 'Tier A — High Cash-Flow Stability',
  payerDiversityIndex: 0.89,
  uniqueCustomers60Days: 482,
  washTradeLoops: 0,
  circularTradesStatus: 'PASS (0 circular loops found between recurring personal VPAs)',
  initialBankBalance: 14280,
  initialStashBalance: 4850,
  initialLoanSanctioned: 20000,
  initialLoanOutstanding: 11400,
  initialDailyDebit: 140,
  recommendedSanction: 35000,
  recommendedDailyEmi: 175,
  recommendedTenureDays: 180,
  recommendedInterestRate: 14.5
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'UPI-TXN-90281',
    referenceId: 'AXIS/409281/UPI',
    timestamp: 'Today, 08:14 AM',
    timeRaw: '08:14',
    date: 'Today',
    counterpartyVpa: 'anand88@okicici',
    counterpartyName: 'Anand Sharma',
    categoryTag: 'Morning Rush',
    amount: 30,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 8,
    note: '2 Special Masala Chai'
  },
  {
    id: 'UPI-TXN-90280',
    referenceId: 'HDFC/409280/UPI',
    timestamp: 'Today, 08:26 AM',
    timeRaw: '08:26',
    date: 'Today',
    counterpartyVpa: 'priya.s@oksbi',
    counterpartyName: 'Priya Sundaram',
    categoryTag: 'Morning Rush',
    amount: 60,
    type: 'CREDIT',
    payerEntropy: 'Verified Regular',
    hourOfDay: 8,
    note: 'Ginger Tea & Bun Maska'
  },
  {
    id: 'UPI-TXN-90279',
    referenceId: 'PAYTM/409279/UPI',
    timestamp: 'Today, 08:42 AM',
    timeRaw: '08:42',
    date: 'Today',
    counterpartyVpa: 'vikram.tech@paytm',
    counterpartyName: 'Vikram Mehta',
    categoryTag: 'Morning Rush',
    amount: 45,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 8,
    note: 'Tea & Samosa'
  },
  {
    id: 'UPI-TXN-90278',
    referenceId: 'SBI/409278/UPI',
    timestamp: 'Today, 09:10 AM',
    timeRaw: '09:10',
    date: 'Today',
    counterpartyVpa: 'rahul.dev99@okhdfcbank',
    counterpartyName: 'Rahul Dev',
    categoryTag: 'Morning Rush',
    amount: 120,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 9,
    note: 'Office 4x Tea Parcel'
  },
  {
    id: 'UPI-TXN-90277',
    referenceId: 'ICICI/409277/UPI',
    timestamp: 'Today, 09:35 AM',
    timeRaw: '09:35',
    date: 'Today',
    counterpartyVpa: 'kavitha.blore@ybl',
    counterpartyName: 'Kavitha R',
    categoryTag: 'Morning Rush',
    amount: 25,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 9,
    note: 'Sulaimani Lemon Tea'
  },
  {
    id: 'UPI-TXN-90276',
    referenceId: 'AMUL/409276/UPI',
    timestamp: 'Today, 10:15 AM',
    timeRaw: '10:15',
    date: 'Today',
    counterpartyVpa: 'amul.distributor@icici',
    counterpartyName: 'Sri Balaji Dairy (Amul Dist)',
    categoryTag: 'Supplier Debit',
    amount: 2400,
    type: 'DEBIT',
    payerEntropy: 'Supplier/Vendor',
    hourOfDay: 10,
    note: 'Daily Milk Crates (40L Taaza)'
  },
  {
    id: 'UPI-TXN-90275',
    referenceId: 'GPAY/409275/UPI',
    timestamp: 'Today, 10:48 AM',
    timeRaw: '10:48',
    date: 'Today',
    counterpartyVpa: 'deepak.v@okaxis',
    counterpartyName: 'Deepak Varma',
    categoryTag: 'Regular Chai',
    amount: 35,
    type: 'CREDIT',
    payerEntropy: 'Verified Regular',
    hourOfDay: 10,
    note: 'Filter Coffee & Biscuit'
  },
  {
    id: 'UPI-TXN-90274',
    referenceId: 'PAYTM/409274/UPI',
    timestamp: 'Today, 11:20 AM',
    timeRaw: '11:20',
    date: 'Today',
    counterpartyVpa: 'arjun.gowda@paytm',
    counterpartyName: 'Arjun Gowda',
    categoryTag: 'Regular Chai',
    amount: 20,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 11,
    note: 'Kadak Chai'
  },
  {
    id: 'UPI-TXN-90273',
    referenceId: 'SETU/409273/AUTOPAY',
    timestamp: 'Today, 12:00 PM',
    timeRaw: '12:00',
    date: 'Today',
    counterpartyVpa: 'finshield.mandate@axis',
    counterpartyName: 'FinShield Daily Sachet Loan',
    categoryTag: 'UPI AutoPay',
    amount: 140,
    type: 'DEBIT',
    payerEntropy: 'Mandate Debit',
    hourOfDay: 12,
    note: 'Daily Working Capital Repayment #62'
  },
  {
    id: 'UPI-TXN-90272',
    referenceId: 'HDFC/409272/UPI',
    timestamp: 'Today, 03:45 PM',
    timeRaw: '15:45',
    date: 'Today',
    counterpartyVpa: 'rohit.b@okhdfcbank',
    counterpartyName: 'Rohit Balan',
    categoryTag: 'Quick Refresh',
    amount: 50,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 15,
    note: '2x Lemon Soda'
  },
  {
    id: 'UPI-TXN-90271',
    referenceId: 'SBI/409271/UPI',
    timestamp: 'Today, 04:30 PM',
    timeRaw: '16:30',
    date: 'Today',
    counterpartyVpa: 'sneha.nair@oksbi',
    counterpartyName: 'Sneha Nair',
    categoryTag: 'Evening Snacks',
    amount: 80,
    type: 'CREDIT',
    payerEntropy: 'Verified Regular',
    hourOfDay: 16,
    note: '2x Tea & 2x Mirchi Bajji'
  },
  {
    id: 'UPI-TXN-90270',
    referenceId: 'PAYTM/409270/UPI',
    timestamp: 'Today, 04:55 PM',
    timeRaw: '16:55',
    date: 'Today',
    counterpartyVpa: 'mohit.kumar@paytm',
    counterpartyName: 'Mohit Kumar',
    categoryTag: 'Evening Snacks',
    amount: 140,
    type: 'CREDIT',
    payerEntropy: 'Commercial',
    hourOfDay: 16,
    note: 'Design Studio Team Chai order'
  },
  {
    id: 'UPI-TXN-90269',
    referenceId: 'ICICI/409269/UPI',
    timestamp: 'Today, 05:20 PM',
    timeRaw: '17:20',
    date: 'Today',
    counterpartyVpa: 'farhan.khan@okicici',
    counterpartyName: 'Farhan Khan',
    categoryTag: 'Evening Snacks',
    amount: 30,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 17,
    note: 'Cutting Chai'
  },
  {
    id: 'UPI-TXN-90268',
    referenceId: 'GPAY/409268/UPI',
    timestamp: 'Today, 05:45 PM',
    timeRaw: '17:45',
    date: 'Today',
    counterpartyVpa: 'swati.deshmukh@okhdfcbank',
    counterpartyName: 'Swati Deshmukh',
    categoryTag: 'Evening Snacks',
    amount: 65,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 17,
    note: 'Cardamom Chai + Osmania Biscuits'
  },
  {
    id: 'UPI-TXN-90267',
    referenceId: 'AXIS/409267/UPI',
    timestamp: 'Today, 06:15 PM',
    timeRaw: '18:15',
    date: 'Today',
    counterpartyVpa: 'manoj.kumar@okaxis',
    counterpartyName: 'Manoj Kumar',
    categoryTag: 'Evening Snacks',
    amount: 110,
    type: 'CREDIT',
    payerEntropy: 'Verified Regular',
    hourOfDay: 18,
    note: 'Evening Snack Combo'
  },
  {
    id: 'UPI-TXN-90266',
    referenceId: 'METRO/409266/UPI',
    timestamp: 'Yesterday, 02:10 PM',
    timeRaw: '14:10',
    date: 'Yesterday',
    counterpartyVpa: 'metro.cashandcarry@hdfc',
    counterpartyName: 'Metro Cash & Carry India',
    categoryTag: 'Wholesale Provisions',
    amount: 3850,
    type: 'DEBIT',
    payerEntropy: 'Supplier/Vendor',
    hourOfDay: 14,
    note: 'Sugar 50kg & Taj Tea Bulk 20kg'
  },
  {
    id: 'UPI-TXN-90265',
    referenceId: 'PAYTM/409265/UPI',
    timestamp: 'Yesterday, 07:45 AM',
    timeRaw: '07:45',
    date: 'Yesterday',
    counterpartyVpa: 'ganesh.p@paytm',
    counterpartyName: 'Ganesh Prasad',
    categoryTag: 'Morning Rush',
    amount: 20,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 7,
    note: 'Morning Special Tea'
  },
  {
    id: 'UPI-TXN-90264',
    referenceId: 'SBI/409264/UPI',
    timestamp: 'Yesterday, 08:05 AM',
    timeRaw: '08:05',
    date: 'Yesterday',
    counterpartyVpa: 'shankar.acharya@oksbi',
    counterpartyName: 'Shankar Acharya',
    categoryTag: 'Morning Rush',
    amount: 40,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 8,
    note: '2x Strong Tea'
  },
  {
    id: 'UPI-TXN-90263',
    referenceId: 'HDFC/409263/UPI',
    timestamp: 'Yesterday, 08:30 AM',
    timeRaw: '08:30',
    date: 'Yesterday',
    counterpartyVpa: 'harish.reddy@okhdfcbank',
    counterpartyName: 'Harish Reddy',
    categoryTag: 'Morning Rush',
    amount: 85,
    type: 'CREDIT',
    payerEntropy: 'Verified Regular',
    hourOfDay: 8,
    note: 'Tea & Vada Pav'
  },
  {
    id: 'UPI-TXN-90262',
    referenceId: 'GPAY/409262/UPI',
    timestamp: 'Yesterday, 09:15 AM',
    timeRaw: '09:15',
    date: 'Yesterday',
    counterpartyVpa: 'divya.menon@okaxis',
    counterpartyName: 'Divya Menon',
    categoryTag: 'Morning Rush',
    amount: 35,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 9,
    note: 'Ginger Lemon Tea'
  },
  {
    id: 'UPI-TXN-90261',
    referenceId: 'ICICI/409261/UPI',
    timestamp: 'Yesterday, 05:10 PM',
    timeRaw: '17:10',
    date: 'Yesterday',
    counterpartyVpa: 'ajay.t@okicici',
    counterpartyName: 'Ajay Thakur',
    categoryTag: 'Evening Snacks',
    amount: 160,
    type: 'CREDIT',
    payerEntropy: 'Commercial',
    hourOfDay: 17,
    note: 'Call Center Snack Batch'
  },
  {
    id: 'UPI-TXN-90260',
    referenceId: 'PAYTM/409260/UPI',
    timestamp: 'Yesterday, 06:40 PM',
    timeRaw: '18:40',
    date: 'Yesterday',
    counterpartyVpa: 'tanvi.joshi@paytm',
    counterpartyName: 'Tanvi Joshi',
    categoryTag: 'Evening Snacks',
    amount: 55,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 18,
    note: 'Masala Chai & Toast'
  },
  {
    id: 'UPI-TXN-90259',
    referenceId: 'NANDINI/409259/UPI',
    timestamp: '2 Days Ago, 06:30 AM',
    timeRaw: '06:30',
    date: '2 Days Ago',
    counterpartyVpa: 'nandini.milk@sbi',
    counterpartyName: 'KMF Nandini Dairy Outlet',
    categoryTag: 'Supplier Debit',
    amount: 1950,
    type: 'DEBIT',
    payerEntropy: 'Supplier/Vendor',
    hourOfDay: 6,
    note: '35L Special Toned Milk'
  },
  {
    id: 'UPI-TXN-90258',
    referenceId: 'HDFC/409258/UPI',
    timestamp: '2 Days Ago, 08:45 AM',
    timeRaw: '08:45',
    date: '2 Days Ago',
    counterpartyVpa: 'neha.sharma@okhdfcbank',
    counterpartyName: 'Neha Sharma',
    categoryTag: 'Morning Rush',
    amount: 45,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 8,
    note: 'Cardamom Tea'
  },
  {
    id: 'UPI-TXN-90257',
    referenceId: 'SBI/409257/UPI',
    timestamp: '2 Days Ago, 09:40 AM',
    timeRaw: '09:40',
    date: '2 Days Ago',
    counterpartyVpa: 'prakash.k@oksbi',
    counterpartyName: 'Prakash K',
    categoryTag: 'Morning Rush',
    amount: 70,
    type: 'CREDIT',
    payerEntropy: 'Verified Regular',
    hourOfDay: 9,
    note: '2x Tea + Butter Biscuits'
  },
  {
    id: 'UPI-TXN-90256',
    referenceId: 'SUGAR/409256/UPI',
    timestamp: '3 Days Ago, 11:15 AM',
    timeRaw: '11:15',
    date: '3 Days Ago',
    counterpartyVpa: 'karnataka.sugar.traders@axis',
    counterpartyName: 'Sri Venkateshwara Sugar Traders',
    categoryTag: 'Supplier Debit',
    amount: 1650,
    type: 'DEBIT',
    payerEntropy: 'Supplier/Vendor',
    hourOfDay: 11,
    note: 'Refined Sugar 40kg bag'
  },
  {
    id: 'UPI-TXN-90255',
    referenceId: 'PAYTM/409255/UPI',
    timestamp: '3 Days Ago, 05:30 PM',
    timeRaw: '17:30',
    date: '3 Days Ago',
    counterpartyVpa: 'kartik.subramaniam@paytm',
    counterpartyName: 'Kartik S',
    categoryTag: 'Evening Snacks',
    amount: 90,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 17,
    note: 'Chai & Samosa plate'
  },
  {
    id: 'UPI-TXN-90254',
    referenceId: 'GPAY/409254/UPI',
    timestamp: '3 Days Ago, 07:15 PM',
    timeRaw: '19:15',
    date: '3 Days Ago',
    counterpartyVpa: 'sunil.shetty@okaxis',
    counterpartyName: 'Sunil Shetty',
    categoryTag: 'Evening Snacks',
    amount: 40,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: 19,
    note: '2x Evening Chai'
  }
];

export const HOURLY_INFLOW_DATA: InflowHourData[] = [
  { hour: '06:00', volume: 180, txnCount: 8, intensity: 'low' },
  { hour: '07:00', volume: 540, txnCount: 22, intensity: 'medium' },
  { hour: '08:00', volume: 1120, txnCount: 48, intensity: 'peak' },
  { hour: '09:00', volume: 980, txnCount: 41, intensity: 'peak' },
  { hour: '10:00', volume: 460, txnCount: 19, intensity: 'medium' },
  { hour: '11:00', volume: 310, txnCount: 13, intensity: 'low' },
  { hour: '12:00', volume: 190, txnCount: 9, intensity: 'low' },
  { hour: '13:00', volume: 140, txnCount: 6, intensity: 'low' },
  { hour: '14:00', volume: 220, txnCount: 8, intensity: 'low' },
  { hour: '15:00', volume: 380, txnCount: 15, intensity: 'medium' },
  { hour: '16:00', volume: 760, txnCount: 32, intensity: 'medium' },
  { hour: '17:00', volume: 1340, txnCount: 54, intensity: 'peak' },
  { hour: '18:00', volume: 1210, txnCount: 49, intensity: 'peak' },
  { hour: '19:00', volume: 820, txnCount: 36, intensity: 'medium' },
  { hour: '20:00', volume: 490, txnCount: 21, intensity: 'medium' },
  { hour: '21:00', volume: 190, txnCount: 9, intensity: 'low' }
];

export const SCORE_FACTORS: ScoreFactor[] = [
  {
    factor: 'Payer Diversity Index',
    score: 89,
    maxScore: 100,
    status: 'Excellent',
    description: 'High entropy distinct consumer VPAs from live telemetry. Confirms genuine organic retail footfall.',
    benchmark: '> 75% Target'
  },
  {
    factor: 'Anti-Wash Trading Verification',
    score: 100,
    maxScore: 100,
    status: 'Excellent',
    description: '0 circular feedback loops between same customer IDs. Zero artificial velocity pumping detected.',
    benchmark: '0 Loops Required'
  },
  {
    factor: 'Daily Inflow Consistency',
    score: 84,
    maxScore: 100,
    status: 'Excellent',
    description: 'Daily collection coefficient of variation < 0.18 over 90 days. Highly predictable micro-cash flow.',
    benchmark: '> 70% Target'
  },
  {
    factor: 'Supplier Outflow Regularity',
    score: 92,
    maxScore: 100,
    status: 'Excellent',
    description: 'Verified periodic debits to registered dairy and wholesale FMCG vendors (Amul, Metro Cash & Carry).',
    benchmark: 'Active Suppliers'
  },
  {
    factor: 'Account Aggregator Authenticity',
    score: 95,
    maxScore: 100,
    status: 'Excellent',
    description: 'Digital cryptographic proof direct from Sahamati AA ecosystem. No tampered PDF statements.',
    benchmark: 'RBI AA Grade'
  }
];

export const RADAR_RISK_DATA: RadarRiskData[] = [
  { subject: 'Cash-Flow Velocity', A: 92, fullMark: 100 },
  { subject: 'Customer Diversity', A: 89, fullMark: 100 },
  { subject: 'Supplier Regularity', A: 94, fullMark: 100 },
  { subject: 'Seasonal Resilience', A: 82, fullMark: 100 },
  { subject: 'Digital Footprint', A: 96, fullMark: 100 }
];

// In-Memory Database State
class MockDatabase {
  public profile: MerchantProfile = { ...RAMESH_PROFILE };
  public transactions: Transaction[] = [...INITIAL_TRANSACTIONS];
  public loanData: LoanData = {
    sanctioned: RAMESH_PROFILE.initialLoanSanctioned,
    outstanding: RAMESH_PROFILE.initialLoanOutstanding,
    dailyDebit: RAMESH_PROFILE.initialDailyDebit,
    loanId: 'LN-PSL-2026-8812',
    consecutiveDays: 62,
    isAutoPaused: false,
    lastSanctionDate: '12 Jan 2026',
    mandateVpa: 'finshield.mandate@axis'
  };
  public stashBalance: number = RAMESH_PROFILE.initialStashBalance;
  public bankBalance: number = RAMESH_PROFILE.initialBankBalance;

  public addTransaction(txn: Omit<Transaction, 'id' | 'referenceId' | 'timestamp' | 'date'>): Transaction {
    const id = `UPI-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newTxn: Transaction = {
      ...txn,
      id,
      referenceId: `UPI/${Math.floor(100000 + Math.random() * 900000)}/AXIS`,
      timestamp: timeString,
      date: 'Today'
    };

    this.transactions.unshift(newTxn);

    if (txn.type === 'CREDIT') {
      this.bankBalance += txn.amount;
    } else {
      this.bankBalance = Math.max(0, this.bankBalance - txn.amount);
    }

    return newTxn;
  }
}

export const db = new MockDatabase();
