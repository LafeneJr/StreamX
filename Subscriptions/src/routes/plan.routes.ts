import { Router } from "express";
import { createPlan, deletePlan, getAllPlans, updatePlan } from "../controllers/plan.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router()

// Public
router.get("/", getAllPlans)

//Admin Only
router.post("/create", authenticate, authorize("admin"), createPlan)
router.put("/:id", authenticate, authorize("admin"), updatePlan)
router.delete("/:id", authenticate, authorize("admin"), deletePlan)

export default router