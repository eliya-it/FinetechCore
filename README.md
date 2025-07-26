# Fintech Core

A fully simulated fintech backend system — built to replicate the core logic behind secure wallet transfers, ledger-based accounting, and fraud detection used in real-world financial platforms.

This is a simulated, safe mirror of how real-world money systems work — for education, interviews, and startup logic.

---

## Key Features

- User authentication with JWT
- Wallet system with individual balances
- Secure money transfers with validation
- Double-entry **ledger accounting**
- Dynamic risk detection engine
- Real-time flagging of suspicious behavior
- Admin endpoints for monitoring risk & metrics
- Modular codebase with clean structure (TS + Prisma)

---

## Stack

- **Backend:** Node.js, TypeScript, Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT, bcrypt
- **Architecture:** Layered structure with protected routes

---

## System Overview

The system simulates a secure fintech backend similar to digital wallet apps and internal banking tools. It includes:

- Wallet management per user
- Money transfer with validation
- Ledger system that tracks every transfer (DEBIT / CREDIT)
- Custom risk rules (large transfers, night activity, more)
- Admin-facing tools for visibility and audit

---

## API Endpoints

### Auth

- `POST /signup` – Register and auto-create wallet
- `POST /login` – Get JWT token for protected routes

### Transfer (Protected)

- `POST /transfer` – Send money to another user
- `GET /transfer/history` – View transfer records

### User (Protected)

- `GET /me/wallet` – Check current wallet balance
- `GET /me/transactions` – View transactions
- `GET /me/ledger` – Full DEBIT/CREDIT breakdown

### Admin (Protected)

- `GET /admin/riskLogs` – View flagged transfers
- `GET /admin/metrics` – System-wide stats
- `GET /admin/wallets/balances` – View all wallet balances (read-only)

### Postman Collections

- [Auth Endpoints](./postman/auth.postman_collection.json)
- [Transfer Endpoints](./postman/transfer.postman_collection.json)
- [User Endpoints](./postman/user.postman_collection.json)
- [Admin Endpoints](./postman/admin.postman_collection.json)

---

## Risk Detection Rules

Rules are stored in the database and evaluated on each transfer:

| Rule           | Example Config                         |
| -------------- | -------------------------------------- |
| Large Transfer | Amount ≥ 100,000 USD (or any currency) |
| Night Transfer | Between 10PM–6AM                       |

All flagged transactions are logged and visible to admin endpoints.

---

## Running the Project

1. Clone the repo

```bash
git clone https://github.com/eliya-it/FinetechCore
cd FinetechCore
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```bash
cp .env.example .env
```

4. Setup PostgreSQL and update your DB credentials

5. Apply schema

```bash
npx prisma migrate dev --name init
```

6. Seed risk rules

```bash
npx tsx prisma/seedRiskRules.ts
```

7. Start the server

```bash
npm run dev
```

---

## Folder Structure

```
/controllers        → Route logic
/routes             → Express route files
/middlewares        → Auth and protection
/utils              → Risk evaluation logic
/prisma             → DB schema + seeds
/docs               → System diagrams (optional)
/postman            → Postman collection (optional)
```

---

## Why I Built This

I wanted to simulate the backend logic behind secure money systems — like internal tools used by fintech startups and banks — without relying on real money or 3rd party APIs.

The goal was to build something clean, practical, and realistic — using double-entry accounting, configurable risk rules, and admin-level visibility. The result is a self-contained project that mirrors how real fintech platforms work.

---

## Architecture Diagram

You can find the editable system design in:

```
/docs/architecture.excalidraw
```

Preview image (PNG) also included.

---

## Contact

You can reach out to me at [eliya@eliyait.com](mailto:eliya@eliyait.com)

---

> If this repo gave you ideas, insights, or value — feel free to star ⭐ it or reach out.
