import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  getMetrics,
  getRiskLogs,
  getWalletsBalances,
} from "../controllers/adminController";

const router = Router();

router.use(protect);

router.get("/riskLogs", getRiskLogs);
router.get("/metrics", getMetrics);
router.get("/wallets/balances", getWalletsBalances);
export default router;
