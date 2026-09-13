# FinShield — Alternative Credit Decisioning & Resilience Platform

FinShield is an alternative credit underwriting and financial resilience platform bridging informal UPI transaction streams for micro-merchants (e.g., Ramesh Chai Stall) with institutional credit scoring, sachet micro-loans, positive-friction emergency buffers, and automated underwriting consoles.

## Project Structure

This project is organized into modular `frontend` and `backend` workspaces:

```
finshield/
├── frontend/                     # Client Presentation Layer (Vite + React 19 + Tailwind CSS)
│   ├── public/                   # Static assets & icons
│   ├── src/
│   │   ├── assets/               # Branding graphics and SVGs
│   │   ├── components/
│   │   │   ├── common/           # Toast notifications & shared widgets
│   │   │   ├── layout/           # TopNavbar and SplitView layout shells
│   │   │   ├── underwriter/      # Perfios-style Bank Underwriting Console (CAM AI, graph intelligence)
│   │   │   └── worker/           # GPay-style Worker Mobile View (Bank hero, Safety Net, Analytics, Loans)
│   │   ├── context/              # AppContext global state management
│   │   ├── data/                 # Client domain data & fallbacks
│   │   ├── services/             # API service layer connecting to backend with fallback
│   │   ├── App.tsx               # Main application component
│   │   ├── index.css             # Tailwind & base style rules
│   │   └── main.tsx              # React DOM entry point
│   ├── index.html                # Vite HTML entry
│   ├── package.json              # Frontend dependencies
│   ├── tsconfig.json             # Frontend TypeScript configuration
│   └── vite.config.ts            # Vite bundler config with /api proxy to backend (port 3001)
│
├── backend/                      # API & Decisioning Engine (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── data/                 # In-memory mock database & telemetry seeds
│   │   ├── routes/
│   │   │   ├── affordability.ts  # POST /api/affordability/evaluate (Purchase advisor engine)
│   │   │   ├── creditScore.ts    # GET /api/credit-score (762 score & 5 factors)
│   │   │   ├── loans.ts          # GET/POST /api/loans (Sanctions & rainy-day toggle)
│   │   │   ├── profile.ts        # GET /api/profile (Ramesh AA profile & bank balance)
│   │   │   └── transactions.ts   # GET/POST /api/transactions (Live UPI telemetry & soundbox)
│   │   ├── types/                # Shared domain types & interfaces
│   │   └── server.ts             # Express application entry point (port 3001)
│   ├── package.json              # Backend dependencies
│   └── tsconfig.json             # Backend TypeScript configuration
│
├── package.json                  # Root monorepo orchestration & workspaces
└── README.md
```

## Quick Start

### 1. Install Dependencies
Run `npm install` from the root directory to install dependencies for both workspaces:
```bash
npm install
```

### 2. Run the Development Servers

- **Run Frontend Only (Mobile Worker & Underwriter Console)**:
  ```bash
  npm run dev
  # Or: npm run dev:frontend
  ```
  Opens at `http://localhost:5173`

- **Run Backend API Server**:
  ```bash
  npm run dev:backend
  ```
  Runs at `http://localhost:3001` (Health check at `http://localhost:3001/api/health`)

- **Build Both Workspaces**:
  ```bash
  npm run build
  ```

## Key Capabilities
- **Worker Mobile View**:
  - Primary Bank Balance (Axis Bank *8821) with live UPI Collections (₹2,840) and AA verification.
  - "Can I Afford This?" Purchase Advisor with instant Green/Yellow/Red affordability tiers.
  - "Smart Safety Net" emergency buffer with 15-second cooling-off positive friction countdown.
  - Dedicated Business Analytics tab with weekly/monthly charts and cash flow health indicators.
  - Dedicated Loans tab with active sachet micro-loan and rainy/zero-sales day auto-pause simulation.
- **Bank Underwriter Console**:
  - Account Aggregator (AA) telemetry with 5-pillar trust score (762/850).
  - Graph Intelligence: 0 circular wash trade loops, 89% customer diversity index.
  - Credit Appraisal Memo (CAM) generation and Priority Sector Lending sanctioning.
