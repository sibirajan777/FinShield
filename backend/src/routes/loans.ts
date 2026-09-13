import { Router, Request, Response } from 'express';
import { db } from '../data/mockDb.js';

const router = Router();

// GET active micro-loan details
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.loanData
  });
});

// POST sanction loan (Perfios CAM AI model)
router.post('/sanction', (req: Request, res: Response) => {
  const { sanctionAmount, dailyEmi, tenureDays } = req.body;

  if (typeof sanctionAmount !== 'number' || typeof dailyEmi !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Numeric sanctionAmount and dailyEmi are required'
    });
  }

  const newLoanId = `LN-PSL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  db.loanData = {
    sanctioned: sanctionAmount,
    outstanding: sanctionAmount,
    dailyDebit: dailyEmi,
    loanId: newLoanId,
    consecutiveDays: 0,
    isAutoPaused: false,
    lastSanctionDate: 'Today (Sanctioned via Perfios CAM AI)',
    mandateVpa: 'finshield.mandate@axis'
  };

  res.status(201).json({
    success: true,
    message: 'Loan sanctioned and UPI AutoPay mandate registered successfully',
    data: {
      loanId: newLoanId,
      sanctioned: sanctionAmount,
      dailyDebit: dailyEmi,
      tenureDays: tenureDays || 180,
      mandateStatus: 'REGISTERED_ACTIVE'
    }
  });
});

// POST toggle rainy/zero-sales day auto-pause
router.post('/rainy-day', (req: Request, res: Response) => {
  const { isRainy } = req.body;
  const isPaused = Boolean(isRainy);

  db.loanData.isAutoPaused = isPaused;

  res.json({
    success: true,
    isAutoPaused: db.loanData.isAutoPaused,
    message: isPaused 
      ? '🌧️ Rainy mode active: UPI AutoPay mandate auto-paused. ₹0 deducted.' 
      : '☀️ Regular sales mode active: Daily micro-repayment active.'
  });
});

export default router;
