import { Request, Response } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema/users.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const promoteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    await db
      .update(users)
      .set({ role: "admin" })
      .where(eq(users.id, id));

    return res.json({
      success: true,
      message: "User promoted to admin successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to promote user",
    });
  }
};

export const updateOwnProfile = async ( req: Request & { user?: any}, res: Response) => {
  try {
    const userId = req.user.id
    const { name, password } = req.body

    const updateData: any = {}

    if (name) updateData.name = name

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updateData.password = hashedPassword
    }

    await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, userId))

    res.json({
      success: true,
      message: "Profile updated successfully",
    })
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    })
  }
}