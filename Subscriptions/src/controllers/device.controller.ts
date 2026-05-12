import { Request, Response } from "express";
import { db } from "../db";
import { devices } from "../db/schema/device.schema";

export const registerDevice = async ( req: Request & { user?: any }, res: Response) => {

    const userId = req.user.id
    const { devicesToken, devicesName } = req.body

    const device = await db .insert(devices).values({
        userId,
        devicesName,
        devicesToken
    }).returning()

    res.json({
        success: true,
        data: device
    })
}