import { Router } from "express";
import { transferMoney } from "../controllers/transferController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, transferMoney);

export default router;
