import { Request, Response, NextFunction } from "express";

export const authorize = (...allowedRoles: string[]) => {
    return (
        req: Request & { user?: any },
        res: Response,
        next: NextFunction
    ): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Not Authenticated",
            })
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "Access denied",
            })
            return;
        }
        next()
    }
}