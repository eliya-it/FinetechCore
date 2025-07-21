import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  getLedgerEntries,
  getMyWallet,
  getRiskLogs,
  getTransactions,
} from "../controllers/userController";

const router = Router();
router.use(protect);
router.get("/me/transactions", getTransactions);
router.get("/me/ledger", getLedgerEntries);
router.get("/me/wallet", getMyWallet);
router.get("/admin/risk-logs", getRiskLogs);

export default router;
