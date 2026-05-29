import { Request, Response } from "express";
import { ProfileService } from "../Services/Profile_Service.js";
import { UpdateClientProfile, UpdateTrainerProfile } from "../Schemas/Profile_Schema.js";
import { ControllerMethods } from "../Types/types.js";

export class ProfileController {
    static getProfile: ControllerMethods = async(req, res, next) => {
        try {
            const {userId} = req.user

            const user = await ProfileService.getProfile(userId)

            if(!user) {
                return res.status(404).json({message: "Пользователь не найден"})
            }

            return res.status(200).json(user)
        }catch(err: any) {
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при получении профиля"
            })
        }
    }

    static updateProfile: ControllerMethods = async(req, res, next) =>  {
        try {
            const {userId} = req.user
            const role = req.user.role
            
            const shema = role === "TRAINER" ? UpdateTrainerProfile : UpdateClientProfile

            const validatedData = shema.parse(req.body)

            const updatedProfile = await ProfileService.updateProfile(userId, role, validatedData)
            return res.json({success: true, profile: updatedProfile})
        }catch(err: any) {
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при обновлении профиля"
            })
        }
    }
}