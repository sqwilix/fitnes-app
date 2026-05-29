import { prisma } from "../Utils/prisma.js";


export class WorkoutService {
    static async createWorkout(userId: string, data: {clientId: string, date: string, title: string}) {
        console.log("Ищем профиль тренера для userId:", userId)
        const trainerProfile = await prisma.trainerProfile.findUnique({
            where: {userId: userId}
        })

        console.log("Результат поиска профиля:", trainerProfile)

        if (!trainerProfile) {
            throw new Error("Действие разрешено только для тренеров");
        }

        return await prisma.workoutSession.create({
            data: {
                title: data.title || "Новая тренировка",
                date: new Date(data.date),
                clientId: data.clientId,
                isCompleted: false,
                trainerId: trainerProfile.id
            },
            include: {client: true, trainer: true}
        })
    }

    static async getWorkouts(userId: string) {
        const trainerProfile = await prisma.trainerProfile.findUnique({ where: { userId } });
        if (trainerProfile) {
            return await prisma.workoutSession.findMany({
                where: { trainerId: trainerProfile.id },
                include: { client: true, exercises: true }
            });
        }

        const clientProfile = await prisma.clientProfile.findUnique({ where: { userId } });
        if (clientProfile) {
            return await prisma.workoutSession.findMany({
                where: { clientId: clientProfile.id },
                include: { trainer: true, exercises: true }
            });
        }

        throw new Error("Профиль не найден (ни клиент, ни тренер)");
    }

    static async updateWorkout(workoutId: string, userId: string, data: any) {
        const trainerProfile = await prisma.trainerProfile.findUnique({
            where: {userId: userId}
        })

        if (!trainerProfile) throw new Error("Только тренер может изменять тренировки")

        return await prisma.workoutSession.update({
            where: {
                id: workoutId,
                trainerId: trainerProfile?.id
            },
            data: data
        })
    }

    static async deleteWorkout(workoutId: string, userId: string) {
        const trainerProfile = await prisma.trainerProfile.findUnique({
            where: {userId: userId}
        })

        if (!trainerProfile) throw new Error("Только тренер может удалять тренировки")

        return await prisma.workoutSession.deleteMany({
            where: {
                id: workoutId,
                trainerId: trainerProfile?.id
            }
        })
    }
}