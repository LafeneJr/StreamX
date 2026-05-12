import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { subscriptions } from "../db/schema/subscription.schema";
import { eq } from "drizzle-orm";

export const checkSub = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const sub = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId));

    if (!sub.length || sub[0].status !== "active") {
      res.status(403).json({
        success: false,
        message: "Active subscription required",
      });
      return;
    }

    // ✅ ONLY REACH HERE IF SUB IS ACTIVE
    next();
  } catch (error) {
    console.error("SUB ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Subscription check failed",
    });
    return;
  }
};