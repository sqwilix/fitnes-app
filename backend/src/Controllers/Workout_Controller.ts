import { Request, Response } from "express";
import { WorkoutService } from "../Services/Workout_Service.js";
import { CreateWorkoutSchema, UpdateWorkoutSchema } from "../Schemas/Workout_Schema.js";
import { ControllerMethods } from "../Types/types.js";
import { logger } from "../Utils/logger.js";
import { z } from "zod";

interface CreateWorkoutInput {
    clientId: string;
    date: string;
    title: string;
    exercises: {
        name: string;
        sets: string;
        reps: string;
        weight: string;
        order: number;
    }[];
}

export class WorkoutController {
    static createWorkout: ControllerMethods = async(req, res, next) => {
        try {
            const { userId } = req.user;
            const validatedData = CreateWorkoutSchema.parse(req.body) as CreateWorkoutInput
    
            const workout = await WorkoutService.createWorkout(userId, validatedData);
    
            return res.status(201).json({
                success: true,
                message: "Тренировка успешно создана",
                workout
            });
        } catch(err: any) {
            logger.error("Ошибка создания тренировки:", { userId: req.user?.userId, error: err.message });
            
            if (err instanceof z.ZodError) {
                return res.status(400).json({ success: false, message: "Ошибка валидации" });
            }
            
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при добавлении тренировки"
            });
        }
    }

    static getWorkouts: ControllerMethods = async(req, res, next) => {
        console.log("Контроллер: запрос принят");

        try {
            const { userId } = req.user;
            const {clientId} = req.query
            const workouts = await WorkoutService.getWorkouts(userId, clientId as string);
            return res.status(200).json({ success: true, data: workouts });
        } catch(err: any) {
            logger.error("Ошибка получения тренировок:", { userId: req.user?.userId, error: err.message });
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при получении тренировок"
            });
        }
    }

    static updateWorkout: ControllerMethods = async(req, res, next) => {
        try {
            const { workoutId } = req.params as { workoutId: string };
            const { userId } = req.user;
            const validatedData = UpdateWorkoutSchema.parse(req.body);

            const updated = await WorkoutService.updateWorkout(workoutId, userId, validatedData);

            if(!updated) throw new Error("Тренировка не найдена");

            return res.status(200).json({
                success: true,
                message: "Тренировка успешно обновлена",
                workout: updated
            });
        } catch(err: any) {
            logger.error("Ошибка обновления тренировки:", { workoutId: req.params.workoutId, error: err.message });
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при обновлении тренировки"
            });
        }
    }

    static deleteWorkout: ControllerMethods = async(req, res, next) => {
        try {
            const { workoutId } = req.params as { workoutId: string };
            const { userId } = req.user;

            const deleted = await WorkoutService.deleteWorkout(workoutId, userId);

            if(deleted.count === 0) {
                return res.status(404).json({ success: false, message: "Тренировка не найдена" });
            }

            return res.status(200).json({
                success: true,
                message: "Тренировка успешно удалена"
            });
        } catch(err: any) {
            logger.error("Ошибка удаления тренировки:", { workoutId: req.params.workoutId, error: err.message });
            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при удалении тренировки"
            });
        }
    }

    static completedWorkout: ControllerMethods = async (req, res, next) => {
        try {
            const {workoutId} = req.params as {workoutId: string}
            const result = await WorkoutService.completedWorkout(workoutId)

            return res.status(200).json({success: true, message: "Тренировка завершена", result})
        }catch(err: any) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }
}