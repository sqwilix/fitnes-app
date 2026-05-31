import { NextFunction, Request, Response } from "express"
import { AuthRequest } from "../Types/types.js"


export const roleGuard = (allowedRole: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const userRole = req.user.role

        if(!userRole || !allowedRole.includes(userRole)) {
            return res.status(400).json({
                success: false,
                message: "Доступ запрещен: недостаточно прав"
            })
        }

        next()
    }
}