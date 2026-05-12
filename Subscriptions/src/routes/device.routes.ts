import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { checkDeviceLimit } from "../middlewares/device.middleware";
import { registerDevice } from "../controllers/device.controller";

const router = Router()

router.post("/register", authenticate, checkDeviceLimit, registerDevice)

export default router