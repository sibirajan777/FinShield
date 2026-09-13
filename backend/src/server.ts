import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import profileRoutes from './routes/profile.js';
import transactionRoutes from './routes/transactions.js';
import affordabilityRoutes from './routes/affordability.js';
import creditScoreRoutes from './routes/creditScore.js';
import loanRoutes from './routes/loans.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Request logging in development
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'FinShield Alternative Credit Decisioning Backend API',
    version: '1.0.0'
  });
});

// Register API routes
app.use('/api/profile', profileRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/affordability', affordabilityRoutes);
app.use('/api/credit-score', creditScoreRoutes);
app.use('/api/loans', loanRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.send({
    message: 'FinShield API Server is running',
    docs: {
      health: '/api/health',
      profile: '/api/profile',
      transactions: '/api/transactions',
      affordability: '/api/affordability/evaluate',
      creditScore: '/api/credit-score',
      loans: '/api/loans'
    }
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🛡️ FinShield Backend API Server is running at http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});

export default app;
