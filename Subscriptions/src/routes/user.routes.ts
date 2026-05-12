import { Router } from "express";
import { promoteUser, updateOwnProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router()

// Admin can promote
router.patch("/:id/promote", authenticate, authorize("admin"), promoteUser)

router.put("/me", authenticate, updateOwnProfile)

export default router