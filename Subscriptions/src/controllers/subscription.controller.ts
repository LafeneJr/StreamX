import { Request, Response } from "express";
import { db } from "../db";
import { subscriptions } from "../db/schema/subscription.schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "../services/email.service";

export const createSub = async (req: Request & { user?: any }, res: Response) => {
    try {
        const userId = req.user.id
        const { planId } = req.body

        const newSub = await db.insert(subscriptions).values({
            userId,
            planId,
            status: "active",
        }).returning()

        // send email after subscription activation
        await sendEmail(
            req.user.email,
            "Subscription Activated",
            `
            <h2>Subscription Active</h2>
            <p>Your subscription has started successfully.</p>
            <p>Enjoy un-limited streaming!</p>
            `
        )

        return res.status(201).json({
            success: true,
            date: newSub
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Subscription failed"
        })
    }
}

export const getMySub = async (req: Request & { user?: any}, res: Response) => {

    const userId = req.user.id

    const sub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))

    res.json({
        success: true,
        data: sub
    })
}