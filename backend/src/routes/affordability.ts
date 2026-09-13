import { Router, Request, Response } from 'express';
import { db } from '../data/mockDb.js';
import { AffordabilityResult } from '../types/index.js';

const router = Router();

// POST evaluate purchase affordability
router.post('/evaluate', (req: Request, res: Response) => {
  const { amount, customLabel } = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Valid positive purchase amount is required'
    });
  }

  const label = customLabel || `₹${amount.toLocaleString('en-IN')} Purchase`;
  const dailyAvg = db.profile.dailyAvgVolume;

  let result: AffordabilityResult;

  if (amount <= 3000) {
    result = {
      amount,
      label,
      tier: 'green',
      title: 'Safe to Buy in Cash',
      description: `Will not impact your working capital. Covered by 1.2 days of your average daily UPI surplus (₹${dailyAvg.toLocaleString('en-IN')}/day).`,
      metricBadge: 'Zero Working Capital Strain',
      impactPercent: Math.round((amount / dailyAvg) * 100)
    };
  } else if (amount <= 15000) {
    const suggestedEmi = Math.round((amount * 1.1) / 60);
    const tenureDays = 60;
    result = {
      amount,
      label,
      tier: 'yellow',
      title: 'Safe via Sachet Micro-EMI',
      description: `Proposed New Micro-EMI for this purchase: ₹${suggestedEmi}/day for ${tenureDays} days via UPI AutoPay. (Active loan deduction is ₹${db.loanData.dailyDebit}/day). Zero cash crunch.`,
      metricBadge: `Proposed New Micro-EMI: ₹${suggestedEmi}/day`,
      suggestedEmi,
      tenureDays,
      impactPercent: Math.round((suggestedEmi / dailyAvg) * 100)
    };
  } else {
    result = {
      amount,
      label,
      tier: 'red',
      title: 'Caution: Exceeds Safe Threshold',
      description: `Drains 72% of 30-day net surplus. High risk of supplier payment default. Recommended: Save ₹90/day into your liquid buffer first for 45 days.`,
      metricBadge: 'High Working Capital Risk',
      impactPercent: 72
    };
  }

  res.json({
    success: true,
    data: result
  });
});

export default router;
