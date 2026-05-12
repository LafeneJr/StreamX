import { Router } from "express";
import { createContent, deleteContent, getAllContent, getExternalMovies, getMovieDetailsController, getMovieFullDetails, getNews, getSingleContent, updateContent } from "../controllers/content.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { checkSub } from "../middlewares/subscription.middleware.js";

const router = Router()

router.get("/", getAllContent)
router.get("/news", getNews)

// ✅ MUST COME BEFORE /:id
router.get("/external", getExternalMovies)
router.get("/external/:id", getMovieDetailsController)
router.get("/external/:id", getMovieFullDetails)

router.get("/:id", authenticate, checkSub, getSingleContent)

// Admin only
router.post("/", authenticate, authorize("admin"), createContent)
router.put("/:id", authenticate, authorize("admin"), updateContent)
router.delete("/:id", authenticate, authorize("admin"), deleteContent)

export default router;
