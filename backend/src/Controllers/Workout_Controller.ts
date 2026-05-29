import { Request, Response } from "express";
import { WorkoutService } from "../Services/Workout_Service.js";
import { prisma } from "../Utils/prisma.js";

export class WorkoutController {
    static async createWorkout(req: Request, res: Response) {
        try {
            const allClients = await prisma.clientProfile.findMany({ take: 5 });
            console.log("СПИСОК КЛИЕНТОВ В БАЗЕ:", allClients);
            
            const trainerId = (req as any).user.userId
            const {clientId, date, title} = req.body
    
            const workout = await WorkoutService.createWorkout(trainerId, {clientId, date, title})
    
            return res.status(201).json({
                success: true,
                message: "Тренировка успешно создана",
                workout
            })
        }catch(err: any) {
            console.error("DEBUG ERROR:", err)
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при добавлении тренировоки"
            })
        }
    }

    static async getWorkouts(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId

            const workouts = await WorkoutService.getWorkouts(userId)

            return res.status(200).json(workouts)
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при получении тренировок"
            })
        }
    }

    static async updateWorkout(req: Request, res: Response) {
        try {
            const {workoutId} = req.params as {workoutId: string}
            const userId = (req as any).user.userId

            const updateData = req.body

            const updated = await WorkoutService.updateWorkout(workoutId, userId, updateData)

            if(!updated) {
                throw new Error("Тренировка не найдена")
            }

            return res.status(200).json({
                success: true,
                message: "Тренировка успешно обновлена",
                workout: updated
            })
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при обновлении тренировки"
            })
        }
    }

    static async deleteWorkout(req: Request, res: Response) {
        try {
            const {workoutId} = req.params as {workoutId: string}
            const userId = (req as any).user.userId

            const deleted = await WorkoutService.deleteWorkout(workoutId, userId)

            if(deleted.count === 0) {
                return res.status(404).json({success: false, message: "Тренировка не найдена"})
            }

            return res.status(200).json({
                success: true,
                message: "Тренировка успешно удалена",
                workout: deleted
            })
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при удалении тренировки"
            })
        }
    }
}