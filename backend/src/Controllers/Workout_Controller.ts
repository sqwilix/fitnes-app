import { Request, Response } from "express";
import { WorkoutService } from "../Services/Workout_Service.js";
import { prisma } from "../Utils/prisma.js";
import { CreateWorkoutSchema, UpdateWorkoutSchema } from "../Schemas/Workout_Schema.js";
import { ControllerMethods } from "../Types/types.js";

export class WorkoutController {
    static createWorkout: ControllerMethods = async(req, res, next) => {
        try {
            const allClients = await prisma.clientProfile.findMany({ take: 5 });
            console.log("СПИСОК КЛИЕНТОВ В БАЗЕ:", allClients);
            
            const {userId} = req.user
            
            const validatedData = CreateWorkoutSchema.parse(req.body)
    
            const workout = await WorkoutService.createWorkout(userId, validatedData)
    
            return res.status(201).json({
                success: true,
                message: "Тренировка успешно создана",
                workout
            })
        }catch(err: any) {
            console.error("DEBUG ERROR:", err)
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при добавлении тренировоки"
            })
        }
    }

    static getWorkouts: ControllerMethods = async(req, res, next) => {
        try {
            const {userId} = req.user

            const workouts = await WorkoutService.getWorkouts(userId)

            return res.status(200).json(workouts)
        }catch(err: any) {
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при получении тренировок"
            })
        }
    }

    static updateWorkout: ControllerMethods = async(req, res, next) => {
        try {
            const {workoutId} = req.params as {workoutId: string}
            const {userId} = req.user

            const validatedData = UpdateWorkoutSchema.parse(req.body)

            const updated = await WorkoutService.updateWorkout(workoutId, userId, validatedData)

            if(!updated) {
                throw new Error("Тренировка не найдена")
            }

            return res.status(200).json({
                success: true,
                message: "Тренировка успешно обновлена",
                workout: updated
            })
        }catch(err: any) {
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при обновлении тренировки"
            })
        }
    }

    static deleteWorkout: ControllerMethods = async(req, res, next) => {
        try {
            const {workoutId} = req.params as {workoutId: string}
            const {userId} = req.user

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
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при удалении тренировки"
            })
        }
    }
}