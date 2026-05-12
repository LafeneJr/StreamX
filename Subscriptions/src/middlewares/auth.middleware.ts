import { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"

export interface JwtPayload {
  id: string
  role: string
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      })
      return
    }

    const token = authHeader.split(" ")[1]

    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    req.user = decoded // ✅ works AFTER global typing fix

    next()
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    })
  }
}