import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Transaction, 
  INITIAL_TRANSACTIONS, 
  RAMESH_PROFILE 
} from '../data/mockData';

export type ViewMode = 'worker' | 'underwriter' | 'split';

export interface ToastItem {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
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

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  stashBalance: number;
  setStashBalance: React.Dispatch<React.SetStateAction<number>>;
  bankBalance: number;
  setBankBalance: React.Dispatch<React.SetStateAction<number>>;
  autoStashEnabled: boolean;
  toggleAutoStash: () => void;
  isCoolingOffOpen: boolean;
  setIsCoolingOffOpen: (open: boolean) => void;
  coolingOffSecondsLeft: number;
  setCoolingOffSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
  isRainyDay: boolean;
  toggleRainyDay: () => void;
  loanData: {
    sanctioned: number;
    outstanding: number;
    dailyDebit: number;
    loanId: string;
    consecutiveDays: number;
    isAutoPaused: boolean;
    lastSanctionDate: string;
    mandateVpa: string;
  };
  transactions: Transaction[];
  addTransaction: (txn: Omit<Transaction, 'id' | 'referenceId' | 'timestamp' | 'date'>) => void;
  simulateLiveCredit: (customAmount?: number) => void;
  evaluateAffordability: (amount: number, customLabel?: string) => AffordabilityResult;
  currentAffordabilityResult: AffordabilityResult | null;
  setCurrentAffordabilityResult: (result: AffordabilityResult | null) => void;
  emergencyMedicalOverride: (overrideAmount?: number) => void;
  cancelEmergencyWithdrawal: (protectedAmount?: number) => void;
  confirmTimedWithdrawal: (withdrawAmount?: number) => void;
  // Computed Graph & Counterparty metrics (single source of truth)
  uniqueCounterpartiesCount: number;
  washTradeLoopsCount: number;
  payerDiversityIndex: number;
  // Underwriter state
  sanctionUnderwriterLoan: (sanctionAmount: number, dailyEmi: number, tenureDays: number) => string;
  isSanctionSuccessModalOpen: boolean;
  setIsSanctionSuccessModalOpen: (open: boolean) => void;
  latestSanctionId: string;
  // Modals
  isAaModalOpen: boolean;
  setIsAaModalOpen: (open: boolean) => void;
  isScoreModalOpen: boolean;
  setIsScoreModalOpen: (open: boolean) => void;
  isCamModalOpen: boolean;
  setIsCamModalOpen: (open: boolean) => void;
  isSoundboxModalOpen: boolean;
  setIsSoundboxModalOpen: (open: boolean) => void;
  // Toasts
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
  // Soundbox
  playSoundboxChime: (amount: number) => void;
  resetAllDemoState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('worker');
  const [stashBalance, setStashBalance] = useState<number>(RAMESH_PROFILE.initialStashBalance);
  const [bankBalance, setBankBalance] = useState<number>(RAMESH_PROFILE.initialBankBalance || 14280);
  const [autoStashEnabled, setAutoStashEnabled] = useState<boolean>(true);
  const [isCoolingOffOpen, setIsCoolingOffOpen] = useState<boolean>(false);
  const [coolingOffSecondsLeft, setCoolingOffSecondsLeft] = useState<number>(15); // 15 seconds (Hackathon Demo mode)
  const [isRainyDay, setIsRainyDay] = useState<boolean>(false);

  const [loanData, setLoanData] = useState({
    sanctioned: RAMESH_PROFILE.initialLoanSanctioned,
    outstanding: RAMESH_PROFILE.initialLoanOutstanding,
    dailyDebit: RAMESH_PROFILE.initialDailyDebit, // Single source of truth for active daily loan deduction (₹140/day)
    loanId: 'LN-PSL-2026-8812',
    consecutiveDays: 62,
    isAutoPaused: false,
    lastSanctionDate: '12 Jan 2026',
    mandateVpa: 'finshield.mandate@axis'
  });

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [currentAffordabilityResult, setCurrentAffordabilityResult] = useState<AffordabilityResult | null>(null);

  // Dynamic computed analytics from real transactions
  const creditTxns = transactions.filter((t) => t.type === 'CREDIT');
  const debitTxns = transactions.filter((t) => t.type === 'DEBIT');

  const uniqueCustomerVpas = new Set(creditTxns.map((t) => t.counterpartyVpa));
  const uniqueCounterpartiesCount = uniqueCustomerVpas.size;

  const supplierDebitVpas = new Set(debitTxns.map((t) => t.counterpartyVpa));
  const detectedCircularVpas = [...uniqueCustomerVpas].filter((vpa) => supplierDebitVpas.has(vpa));
  const washTradeLoopsCount = detectedCircularVpas.length; // Single computed source of truth for circular loop count

  const payerDiversityIndex = creditTxns.length > 0
    ? Math.round((uniqueCounterpartiesCount / creditTxns.length) * 100) / 100
    : 0.89;

  // Modals
  const [isAaModalOpen, setIsAaModalOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isCamModalOpen, setIsCamModalOpen] = useState(false);
  const [isSoundboxModalOpen, setIsSoundboxModalOpen] = useState(false);
  const [isSanctionSuccessModalOpen, setIsSanctionSuccessModalOpen] = useState(false);
  const [latestSanctionId, setLatestSanctionId] = useState('LN-PSL-2026-9042');

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: Omit<ToastItem, 'id' | 'timestamp'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newToast: ToastItem = { ...toast, id, timestamp: timeString };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      removeToast(id);
    }, 5500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sound chime using Web Audio API synthesis
  const playSoundboxChime = (amount: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        const notes = [349.23, 440.0, 523.25, 659.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          
          gain.gain.setValueAtTime(0, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.38);
        });
      }
    } catch {
      // Audio fallback
    }

    addToast({
      type: 'info',
      title: '🔊 UPI Soundbox Announcement',
      message: `₹${amount} received on Ramesh Chai Stall UPI!`
    });
  };

  // Timer countdown effect for cooling-off modal
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isCoolingOffOpen && coolingOffSecondsLeft > 0) {
      timer = setInterval(() => {
        setCoolingOffSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCoolingOffOpen, coolingOffSecondsLeft]);

  const toggleAutoStash = () => {
    const nextState = !autoStashEnabled;
    setAutoStashEnabled(nextState);
    if (nextState) {
      addToast({
        type: 'success',
        title: 'Smart Auto-Stash Activated',
        message: '3% will be automatically stashed on days with > ₹2,000 collections into your 4.8% liquid pocket.'
      });
    } else {
      addToast({
        type: 'warning',
        title: 'Auto-Stash Paused',
        message: 'Daily surplus stashing is currently disabled.'
      });
    }
  };

  const toggleRainyDay = () => {
    const nextRainy = !isRainyDay;
    setIsRainyDay(nextRainy);
    setLoanData((prev) => ({
      ...prev,
      isAutoPaused: nextRainy
    }));

    if (nextRainy) {
      addToast({
        type: 'info',
        title: '🌧️ Rainy/Zero-Sales Mode Activated',
        message: "UPI AutoPay paused for today. ₹0 deducted. Zero penalty recorded in credit history."
      });
    } else {
      addToast({
        type: 'success',
        title: '☀️ Regular Sales Mode Restored',
        message: `Daily micro-repayment active: ₹${loanData.dailyDebit}/day automatically deducted via UPI AutoPay.`
      });
    }
  };

  const emergencyMedicalOverride = (overrideAmount?: number) => {
    const amountToDeduct = typeof overrideAmount === 'number' && overrideAmount > 0 
      ? Math.min(stashBalance, overrideAmount) 
      : stashBalance;
    setStashBalance((prev) => Math.max(0, prev - amountToDeduct));
    setBankBalance((prev) => prev + amountToDeduct);
    setIsCoolingOffOpen(false);
    setCoolingOffSecondsLeft(15);

    addToast({
      type: 'warning',
      title: '🚨 Emergency Medical Override Executed',
      message: `₹${amountToDeduct.toLocaleString('en-IN')} transferred to Axis Bank (*8821) via instant IMPS.`
    });
  };

  const cancelEmergencyWithdrawal = (protectedAmount?: number) => {
    setIsCoolingOffOpen(false);
    setCoolingOffSecondsLeft(15);

    const amtStr = protectedAmount ? `₹${protectedAmount.toLocaleString('en-IN')}` : `₹${stashBalance.toLocaleString('en-IN')}`;
    addToast({
      type: 'success',
      title: '🛡️ Emergency Buffer Protected',
      message: `Wise choice! Your ${amtStr} safety buffer remains intact for wholesale tea restocking.`
    });
  };

  const confirmTimedWithdrawal = (withdrawAmount?: number) => {
    const amountToDeduct = typeof withdrawAmount === 'number' && withdrawAmount > 0 
      ? Math.min(stashBalance, withdrawAmount) 
      : stashBalance;
    setStashBalance((prev) => Math.max(0, prev - amountToDeduct));
    setBankBalance((prev) => prev + amountToDeduct);
    setIsCoolingOffOpen(false);
    setCoolingOffSecondsLeft(15);

    addToast({
      type: 'success',
      title: 'Transfer Completed',
      message: `₹${amountToDeduct.toLocaleString('en-IN')} transferred to your bank account via IMPS`
    });
  };

  const addTransaction = (txn: Omit<Transaction, 'id' | 'referenceId' | 'timestamp' | 'date'>) => {
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

    setTransactions((prev) => [newTxn, ...prev]);

    if (txn.type === 'CREDIT' && autoStashEnabled) {
      const stashAddition = Math.round(txn.amount * 0.03);
      if (stashAddition > 0) {
        setStashBalance((prev) => prev + stashAddition);
      }
    }
  };

  const simulateLiveCredit = (customAmount?: number) => {
    const randomAmounts = [20, 30, 45, 60, 80, 110, 150];
    const amount = customAmount || randomAmounts[Math.floor(Math.random() * randomAmounts.length)];
    const vpAs = [
      { name: 'Karthik Raja', vpa: 'karthik.r@oksbi' },
      { name: 'Siddharth Roy', vpa: 'sid.roy@okhdfcbank' },
      { name: 'Ayesha Banu', vpa: 'ayesha.b@paytm' },
      { name: 'Tanmay Bhatt', vpa: 'tanmay.b@okaxis' },
      { name: 'Meera Sen', vpa: 'meera.s@ybl' }
    ];
    const user = vpAs[Math.floor(Math.random() * vpAs.length)];

    addTransaction({
      timeRaw: 'Live',
      counterpartyVpa: user.vpa,
      counterpartyName: user.name,
      categoryTag: 'Regular Chai',
      amount,
      type: 'CREDIT',
      payerEntropy: 'Unique Customer',
      hourOfDay: new Date().getHours(),
      note: 'Live UPI QR Payment'
    });

    playSoundboxChime(amount);
  };

  const evaluateAffordability = (amount: number, customLabel?: string): AffordabilityResult => {
    const label = customLabel || `₹${amount.toLocaleString('en-IN')} Purchase`;
    
    if (amount <= 3000) {
      const result: AffordabilityResult = {
        amount,
        label,
        tier: 'green',
        title: 'Safe to Buy in Cash',
        description: `Will not impact your working capital. Covered by 1.2 days of your average daily UPI surplus (₹${RAMESH_PROFILE.dailyAvgVolume.toLocaleString('en-IN')}/day).`,
        metricBadge: 'Zero Working Capital Strain',
        impactPercent: Math.round((amount / RAMESH_PROFILE.dailyAvgVolume) * 100)
      };
      setCurrentAffordabilityResult(result);
      return result;
    } else if (amount <= 15000) {
      // Calculated hypothetical EMI for prospective purchase (clearly differentiated from active loan)
      const suggestedEmi = Math.round((amount * 1.1) / 60);
      const tenureDays = 60;
      const result: AffordabilityResult = {
        amount,
        label,
        tier: 'yellow',
        title: 'Safe via Sachet Micro-EMI',
        description: `Proposed New Micro-EMI for this purchase: ₹${suggestedEmi}/day for ${tenureDays} days via UPI AutoPay. (Your current active working capital loan is ₹${loanData.dailyDebit}/day). Zero cash crunch.`,
        metricBadge: `Proposed New Micro-EMI: ₹${suggestedEmi}/day`,
        suggestedEmi,
        tenureDays,
        impactPercent: Math.round((suggestedEmi / RAMESH_PROFILE.dailyAvgVolume) * 100)
      };
      setCurrentAffordabilityResult(result);
      return result;
    } else {
      const result: AffordabilityResult = {
        amount,
        label,
        tier: 'red',
        title: 'Caution: Exceeds Safe Threshold',
        description: `Drains 72% of 30-day net surplus. High risk of supplier payment default. Recommended: Save ₹90/day into your liquid buffer first for 45 days. (Active loan deduction is ₹${loanData.dailyDebit}/day).`,
        metricBadge: 'High Working Capital Risk',
        impactPercent: 72
      };
      setCurrentAffordabilityResult(result);
      return result;
    }
  };

  const sanctionUnderwriterLoan = (sanctionAmount: number, dailyEmi: number, tenureDays: number) => {
    const newId = `LN-PSL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setLatestSanctionId(newId);

    // Update active working capital loan with exact newly sanctioned daily EMI
    setLoanData({
      sanctioned: sanctionAmount,
      outstanding: sanctionAmount,
      dailyDebit: dailyEmi,
      loanId: newId,
      consecutiveDays: 0,
      isAutoPaused: false,
      lastSanctionDate: 'Today (Sanctioned via Perfios CAM AI)',
      mandateVpa: 'finshield.mandate@axis'
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#6366f1', '#38bdf8', '#f59e0b']
      });
    } catch {
      // Confetti fallback
    }

    setIsSanctionSuccessModalOpen(true);

    addToast({
      type: 'success',
      title: '🎉 Micro-Loan Sanctioned & Mandate Active!',
      message: `Sanctioned ₹${sanctionAmount.toLocaleString('en-IN')} @ ₹${dailyEmi}/day for ${tenureDays} days under Priority Sector Lending.`
    });

    return newId;
  };

  const resetAllDemoState = () => {
    setStashBalance(RAMESH_PROFILE.initialStashBalance);
    setBankBalance(RAMESH_PROFILE.initialBankBalance || 14280);
    setAutoStashEnabled(true);
    setIsCoolingOffOpen(false);
    setCoolingOffSecondsLeft(15);
    setIsRainyDay(false);
    setLoanData({
      sanctioned: RAMESH_PROFILE.initialLoanSanctioned,
      outstanding: RAMESH_PROFILE.initialLoanOutstanding,
      dailyDebit: RAMESH_PROFILE.initialDailyDebit,
      loanId: 'LN-PSL-2026-8812',
      consecutiveDays: 62,
      isAutoPaused: false,
      lastSanctionDate: '12 Jan 2026',
      mandateVpa: 'finshield.mandate@axis'
    });
    setTransactions(INITIAL_TRANSACTIONS);
    setCurrentAffordabilityResult(null);

    addToast({
      type: 'info',
      title: 'Demo Environment Reset',
      message: 'All balances, micro-loans, and transactions restored to initial mock state.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        stashBalance,
        setStashBalance,
        bankBalance,
        setBankBalance,
        autoStashEnabled,
        toggleAutoStash,
        isCoolingOffOpen,
        setIsCoolingOffOpen,
        coolingOffSecondsLeft,
        setCoolingOffSecondsLeft,
        isRainyDay,
        toggleRainyDay,
        loanData,
        transactions,
        addTransaction,
        simulateLiveCredit,
        evaluateAffordability,
        currentAffordabilityResult,
        setCurrentAffordabilityResult,
        emergencyMedicalOverride,
        cancelEmergencyWithdrawal,
        confirmTimedWithdrawal,
        uniqueCounterpartiesCount,
        washTradeLoopsCount,
        payerDiversityIndex,
        sanctionUnderwriterLoan,
        isSanctionSuccessModalOpen,
        setIsSanctionSuccessModalOpen,
        latestSanctionId,
        isAaModalOpen,
        setIsAaModalOpen,
        isScoreModalOpen,
        setIsScoreModalOpen,
        isCamModalOpen,
        setIsCamModalOpen,
        isSoundboxModalOpen,
        setIsSoundboxModalOpen,
        toasts,
        addToast,
        removeToast,
        playSoundboxChime,
        resetAllDemoState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
