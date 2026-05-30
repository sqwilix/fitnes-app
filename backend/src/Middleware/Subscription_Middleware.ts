import { Response, NextFunction } from "express"
import { AuthRequest } from "../Types/types.js"
import { prisma } from "../Utils/prisma.js"

export const subscriptionGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const {userId, role} = req.user

        if(role === "ADMIN" || role === "TRAINER") {
            return next()
        }

        const subscription = await prisma.subscription.findFirst({
            where: {
                client: {userId: userId},
                status: "ACTIVE",
                endDate: {gte: new Date()}
            }
        })

        if(!subscription) {
            return res.status(403).json({
                success: false,
                message: "Доступ запрещен: активная подписка не найдена"
            })
        }

        next()
    }catch(err) {
        return res.status(500).json({success: false, message: "Ошибка проверки подписки"})
    }
}