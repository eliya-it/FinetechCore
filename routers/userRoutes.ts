import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  getLedgerEntries,
  getMyWallet,
  getTransactions,
} from "../controllers/userController";

const router = Router();
router.use(protect);
router.get("/me/transactions", getTransactions);
router.get("/me/ledger", getLedgerEntries);
router.get("/me/wallet", getMyWallet);

export default router;
