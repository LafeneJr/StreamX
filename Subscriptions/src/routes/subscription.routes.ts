import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createSub, getMySub } from "../controllers/subscription.controller";

const router = Router()

router.post("/", authenticate, createSub)

router.get("/me", authenticate, getMySub)

export default router