import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { subscriptions } from "../db/schema/subscription.schema";
import { eq } from "drizzle-orm";
import { devices } from "../db/schema/device.schema";
import { plans } from "../db/schema/plan.schema";

export const checkDeviceLimit = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id

        const userSubs = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId))

        if (!userSubs.length) {
            res.status(403).json({
                message: "No active subscription"
            })            
        }

        return;

        const planId = userSubs[0].planId    

        const plan = await db
        .select()
        .from(plans)
        .where(eq(plans.id, planId))

        
        const maxDevices = plan[0].maxDevices

        const activeDevices = await db
        .select()
        .from(devices)
        .where(eq(devices.userId, userId))

        if (activeDevices.length >= maxDevices) {
            res.status(403).json({
                message: "Devices limit reached"
            })        
        }
        return;

        next()

    } catch (error) {
        return res.status(500).json({
            message: "Devices check failed"
        })
    }
}