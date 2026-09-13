import { Router, Request, Response } from 'express';
import { db } from '../data/mockDb.js';
import { Transaction } from '../types/index.js';

const router = Router();

// GET all transactions or filter by category / type
router.get('/', (req: Request, res: Response) => {
  const { type, category } = req.query;
  let result = db.transactions;

  if (type && typeof type === 'string') {
    result = result.filter(t => t.type.toUpperCase() === type.toUpperCase());
  }

  if (category && typeof category === 'string') {
    result = result.filter(t => t.categoryTag.toLowerCase() === category.toLowerCase());
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// POST simulate a live incoming UPI customer payment
router.post('/live', (req: Request, res: Response) => {
  const { amount: customAmount } = req.body || {};
  const randomAmounts = [20, 30, 45, 60, 80, 110, 150];
  const amount = typeof customAmount === 'number' && customAmount > 0 
    ? customAmount 
    : randomAmounts[Math.floor(Math.random() * randomAmounts.length)];

  const sampleCustomers = [
    { name: 'Karthik Raja', vpa: 'karthik.r@oksbi' },
    { name: 'Siddharth Roy', vpa: 'sid.roy@okhdfcbank' },
    { name: 'Ayesha Banu', vpa: 'ayesha.b@paytm' },
    { name: 'Tanmay Bhatt', vpa: 'tanmay.b@okaxis' },
    { name: 'Meera Sen', vpa: 'meera.s@ybl' }
  ];
  const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];

  const newTxn = db.addTransaction({
    timeRaw: 'Live',
    counterpartyVpa: customer.vpa,
    counterpartyName: customer.name,
    categoryTag: 'Regular Chai',
    amount,
    type: 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: new Date().getHours(),
    note: 'Live UPI QR Payment'
  });

  res.status(201).json({
    success: true,
    transaction: newTxn,
    chimeAmount: amount,
    updatedBankBalance: db.bankBalance
  });
});

// POST custom transaction
router.post('/', (req: Request, res: Response) => {
  const { amount, type, counterpartyName, counterpartyVpa, categoryTag, note } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ success: false, error: 'Valid numeric amount is required' });
  }

  const newTxn = db.addTransaction({
    timeRaw: 'Now',
    counterpartyVpa: counterpartyVpa || 'merchant.qr@okaxis',
    counterpartyName: counterpartyName || 'Customer Payment',
    categoryTag: categoryTag || 'Regular Chai',
    amount,
    type: type === 'DEBIT' ? 'DEBIT' : 'CREDIT',
    payerEntropy: 'Unique Customer',
    hourOfDay: new Date().getHours(),
    note: note || 'Direct Payment'
  });

  res.status(201).json({
    success: true,
    transaction: newTxn
  });
});

export default router;
