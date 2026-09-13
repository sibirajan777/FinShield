import { Router, Request, Response } from 'express';
import { db } from '../data/mockDb.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      ...db.profile,
      currentBankBalance: db.bankBalance,
      currentStashBalance: db.stashBalance
    }
  });
});

export default router;
