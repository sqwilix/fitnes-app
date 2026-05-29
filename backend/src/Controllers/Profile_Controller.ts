import { Request, Response } from "express";
import { ProfileService } from "../Services/Profile_Service.js";

export class ProfileController {
    static async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId

            const user = await ProfileService.getProfile(userId)

            if(!user) {
                return res.status(404).json({message: "Пользователь не найден"})
            }

            return res.status(200).json(user)
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при получении профиля"
            })
        }
    }

    static async updateProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId
            const role = (req as any).user.role
            const data = req.body

            const updatedProfile = await ProfileService.updateProfile(userId, role, data)
            return res.json({success: true, profile: updatedProfile})
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при обновлении профиля"
            })
        }
    }
}