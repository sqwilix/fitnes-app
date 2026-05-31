import { Request, Response } from "express";
import { ExerciseService } from "../Services/Exercise_Service.js";
import { CreateExerciseSchema, UpdateExerciseSchema } from "../Schemas/Exercise_Schema.js";
import {z} from "zod";
import { AuthRequest, ControllerMethods } from "../Types/types.js";
import { logger } from "../Utils/logger.js";

export class ExerciseController {
    static createExerciseForWorkout: ControllerMethods = async(req, res, next) => {
        try {
            const {workoutId} = req.params as {workoutId: string}

            const {userId} = req.user

            const validatedData = CreateExerciseSchema.parse(req.body)

            const exercise = await ExerciseService.createExerciseForWorkout(
                workoutId,
                userId,
                validatedData
            )

            return res.status(201).json({
                success: true,
                message: "Упражнения успешно созданы",
                exercise
            })
        }catch(err: any) {
            logger.error("Ошибка при создании упражнения:", { error: err.message, userId: req.user?.userId });

            if (err instanceof z.ZodError) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Ошибка валидации данных",
                    details: err
                });
            }
            
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static getExercisesByWorkout: ControllerMethods = async(req, res, next) =>  {
        try {
            const {workoutId} = req.params as {workoutId: string}

            const exercises = await ExerciseService.getExercisesByWorkout(workoutId)

            return res.status(200).json({exercises})
        }catch(err: any) {
            logger.error("Ошибка при получении упражнений:", { workoutId: req.params.workoutId, error: err.message });

            return res.status(400).json({
                success: false,
                message: err.message || "Ошибка при получения упражнений для тренировки"
            })
        }
    }

    static updateExercise: ControllerMethods = async(req, res, next) => {
        try {
            const {exerciseId} = req.params as {exerciseId: string}
            const {userId} = req.user
            
            const validateData = UpdateExerciseSchema.parse(req.body)

            const updated = await ExerciseService.updateExercise(exerciseId, userId, validateData)

            if(!updated) {
                throw new Error("Упражнение не найдено")
            }

            return res.status(200).json({
                success: true,
                message: "Упражнение успешно обновлено",
                exercise: updated
            })
        }catch (err: any) {
            logger.error("Ошибка при обновлении упражнения:", { exerciseId: req.params.exerciseId, error: err.message });

            if (err.code === 'P2025') { 
                return res.status(404).json({ success: false, message: "Упражнение не найдено или доступ запрещен" });
            }
            return res.status(400).json({ success: false, message: err.message || "Ошибка сервера" });
        }
    }

    static deleteExercise: ControllerMethods = async(req, res, next) => {
        try {
            const {exerciseId} = req.params as {exerciseId: string}
            const {userId} = req.user

            const deleted = await ExerciseService.deleteExercise(exerciseId, userId)

            if(!deleted) {
                throw new Error("Упражнение не найдено")
            }

            return res.status(200).json({
                success: true,
                message: "Упражнение успешно удалено",
                exercise: deleted
            })
        }catch (err: any) {
            logger.error("Ошибка при удалении упражнения:", { exerciseId: req.params.exerciseId, error: err.message });

            if (err.code === 'P2025') {
                return res.status(404).json({ success: false, message: "Упражнение не найдено или доступ запрещен" });
            }
            return res.status(400).json({ success: false, message: err.message || "Ошибка сервера" });
        }
    }

    static getNextExercise: ControllerMethods = async (req, res, next) => {
        try {
            const {workoutId} = req.params as {workoutId: string}
            
            const currentOrder = parseInt(req.query.currentExerciseOrder as string)
            
            if(!workoutId || isNaN(currentOrder)) {
                return res.status(400).json({ success: false, message: "Некорректные параметры запроса" });
            }

            const result = await ExerciseService.getNextExercise(workoutId, currentOrder)
            
            return res.status(200).json({
                success: true,
                data: result || null,
                isFinished: !result
            })
        }catch(err: any) {
            logger.error("Ошибка при переключении на следующее упражнение:", {error: err.message });

            if (err.code === 'P2025') {
                return res.status(404).json({ success: false, message: "Упражнение не найдено или доступ запрещен" });
            }
            return res.status(400).json({ success: false, message: err.message || "Ошибка сервера" });
        }
    }
}