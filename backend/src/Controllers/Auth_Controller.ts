import { Request, Response } from "express";
import { AuthService } from "../Services/Auth_Service.js";
import { LoginSchema, RegisterSchema } from "../Schemas/Auth_Schema.js";
import z from "zod";
import { ControllerMethods } from "../Types/types.js";

export class AuthController {
    static register: ControllerMethods = async(req, res, next) =>  {
        try {
            const validateData = RegisterSchema.parse(req.body)

            const result = await AuthService.register(validateData)

            return res.status(201).json({
                success: true,
                message: "Пользователь успешно зарегистрирован",
                ...result
            })
        }catch(err: any) {
            if (err instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Ошибка валидации",
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при регистрации"
            });
        }
    }

    static login: ControllerMethods = async(req, res, next) => {
        try {
            const validateData = LoginSchema.parse(req.body)

            const result = await AuthService.login(validateData)

            res.status(200).json({
                success: true,
                message: "Пользователь успешно вошел в аккаунт",
                ...result
            })
        }catch(err: any) {
            if (err instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Ошибка валидации",
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при входе в аккаунт"
            });
        }
    }
}