import { Router } from "express";
import {
  getTransferHistory,
  transferMoney,
} from "../controllers/transferController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();
router.use(protect);
router.post("/", transferMoney);
router.get("/history", getTransferHistory);

export default router;
