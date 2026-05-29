import { Request, Response } from "express";
import { ExerciseService } from "../Services/Exercise_Service.js";

export class ExerciseController {
    static async createExerciseForWorkout(req: Request, res: Response) {
        try {
            const {workoutId} = req.params as {workoutId: string}
            const userId = (req as any).user.userId
            const {name, reps, sets, weight} = req.body

            const exercise = await ExerciseService.createExerciseForWorkout(workoutId, userId, {
                name,
                reps,
                sets,
                weight
            })

            return res.status(201).json({
                success: true,
                message: "Упражнения успешно созданы",
                exercise
            })
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при создании упражнения для тренировки"
            })
        }
    }

    static async getExercisesByWorkout(req: Request, res: Response) {
        try {
            const {workoutId} = req.params as {workoutId: string}

            const exercises = await ExerciseService.getExercisesByWorkout(workoutId)

            return res.status(200).json({exercises})
        }catch(err: any) {
            res.status(400).json({
                success: false,
                message: err.message || "Ошибка при получения упражнений для тренировки"
            })
        }
    }

    static async updateExercise(req: Request, res: Response) {
        try {
            const {exerciseId} = req.params as {exerciseId: string}
            const userId = (req as any).user.userId
            const updatedData = req.body

            const updated = await ExerciseService.updateExercise(exerciseId, userId, updatedData)

            if(!updated) {
                throw new Error("Упражнение не найдено")
            }

            return res.status(200).json({
                success: true,
                message: "Упражнение успешно обновлено",
                exercise: updated
            })
        }catch (err: any) {
            if (err.code === 'P2025') { 
                return res.status(404).json({ success: false, message: "Упражнение не найдено или доступ запрещен" });
            }
            res.status(400).json({ success: false, message: err.message || "Ошибка сервера" });
        }
    }

    static async deleteExercise(req: Request, res: Response) {
        try {
            const {exerciseId} = req.params as {exerciseId: string}
            const userId = (req as any).user.userId

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
            if (err.code === 'P2025') {
                return res.status(404).json({ success: false, message: "Упражнение не найдено или доступ запрещен" });
            }
            res.status(400).json({ success: false, message: err.message || "Ошибка сервера" });
        }
    }
}