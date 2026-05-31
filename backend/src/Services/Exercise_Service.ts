import { prisma } from "../Utils/prisma.js"


export class ExerciseService {
    static async createExerciseForWorkout(workoutId: string, trainerUserId: string, data: {name: string, reps: string, sets: string, weight: string}) {
        const workout = await prisma.workoutSession.findFirst({
            where: {id: workoutId, trainer: {userId: trainerUserId}},
        })

        if(!workout) {
            throw new Error("Тренировка не найдена")
        }
        
        const exerciseCount = await prisma.exercise.count({
            where: {workoutSessionId: workoutId}
        })

        return await prisma.exercise.create({
            data: {
                name: data.name,
                reps: data.reps,
                sets: data.sets,
                weight: data.weight,
                order: exerciseCount + 1,
                workoutSessionId: workoutId
            }
        })
    }

    static async getExercisesByWorkout(workoutId: string) {
        return await prisma.exercise.findMany({
            where: {workoutSessionId: workoutId}
        })
    }

    static async updateExercise(exerciseId: string, userId: string, data: any) {
        const exercise = await prisma.exercise.findFirst({
            where: {
                id: exerciseId,
                workoutSession: {
                    trainer: {userId: userId}
                }
            }
        })

        if(!exercise) {
            throw new Error("Упражнение не найдено или доступ запрещен");
        }

        return await prisma.exercise.update({
            where: {id: exerciseId},
            data: {
                name: data.name,
                sets: data.sets,
                reps: data.reps,
                weight: data.weight
            }
        })
    }

    static async deleteExercise(exerciseId: string, userId: string) {
        const exercise = await prisma.exercise.findFirst({
            where: {
                id: exerciseId,
                workoutSession: {
                    trainer: {userId: userId}
                }
            }
        })

        if(!exercise) {
            throw new Error("Упражнение не найдено или доступ запрещен");
        }

        return await prisma.exercise.delete({
            where: {id: exerciseId}
        })
    }

    static async getNextExercise(workoutId: string, currentExerciseOrder: number) {
        return await prisma.exercise.findFirst({
            where: {
                workoutSessionId: workoutId,
                order: {gt: currentExerciseOrder}
            },
            orderBy: {order: "asc"}
        })
    }
}