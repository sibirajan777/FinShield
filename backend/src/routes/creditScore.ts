import { Router, Request, Response } from 'express';
import { db, SCORE_FACTORS, RADAR_RISK_DATA, HOURLY_INFLOW_DATA } from '../data/mockDb.js';

const router = Router();

// GET credit score, factors, and risk radar
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      trustScore: db.profile.trustScore,
      maxTrustScore: db.profile.maxTrustScore,
      trustTier: db.profile.trustTier,
      payerDiversityIndex: db.profile.payerDiversityIndex,
      uniqueCustomers60Days: db.profile.uniqueCustomers60Days,
      washTradeLoops: db.profile.washTradeLoops,
      circularTradesStatus: db.profile.circularTradesStatus,
      scoreFactors: SCORE_FACTORS,
      radarRiskData: RADAR_RISK_DATA,
      hourlyInflowData: HOURLY_INFLOW_DATA
    }
  });
});

export default router;
