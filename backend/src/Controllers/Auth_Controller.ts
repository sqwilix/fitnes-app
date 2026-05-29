import { Request, Response } from "express";
import { AuthService } from "../Services/Auth_Service.js";

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const result = await AuthService.register(req.body)

            res.status(201).json({
                success: true,
                message: "Пользователь успешно зарегистрирован",
                ...result
            })
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при регистрации"
            })
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const result = await AuthService.login(req.body)

            res.status(200).json({
                success: true,
                message: "Пользователь успешно вошел в аккаунт",
                ...result
            })
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при входе в аккаунт"
            })
        }
    }
}