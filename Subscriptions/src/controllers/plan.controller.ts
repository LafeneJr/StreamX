import { Request, Response } from "express";
import { db } from "../db/index.js";
import { plans } from "../db/schema/plan.schema.js";
import { eq } from "drizzle-orm";

export const createPlan = async (req: Request, res: Response) => {
    try {
        const { name, description, price, duration } = req.body

        const newPlan = await db
        .insert(plans).values({
            name,
            description,
            price,
            duration,
        }).returning()

        res.status(201).json({
            success: true,
            data: newPlan,
        })
        return;
    } catch {Error} {
        res.status(500).json({
            success: false,
            message: "Failed to create plan",
        })
    }
}

export const getAllPlans = async (req: Request, res: Response) => {
    const allPlans = await db.select().from(plans)

    res.json({
        success: true,
        data: allPlans,
    })
    return;
}

export const updatePlan = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const { name, description, price, duration, isActive } = req.body

    await db
    .update(plans)
    .set({ name, description, price, duration, isActive })
    .where(eq(plans.id, id))

    res.json({
        success: true,
        message: "Plan updated successfully",
    })
}

export const deletePlan = async (req: Request, res: Response) => {
    const id = req.params.id as string

    await db.delete(plans).where(eq(plans.id, id))

    res.json({
        success: true,
        message: "Plan deleted successfully",
    })
}