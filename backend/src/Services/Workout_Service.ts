import { prisma } from "../Utils/prisma.js";


export class WorkoutService {
    static async createWorkout(userId: string, data: {clientId: string, date: string, title: string}) {
        console.log("Ищем профиль тренера для userId:", userId)
        const trainerProfile = await prisma.trainerProfile.findUnique({
            where: {userId: userId}
        })

        if (!trainerProfile) {
            throw new Error("Действие разрешено только для тренеров");
        }

        return await prisma.$transaction(async (tx) => {
            const subscription = await tx.subscription.findFirst({
                where: {
                    clientId: data.clientId,
                    status: "ACTIVE",
                    endDate: {gte: new Date()},
                    remainingLesson: {gt: 0}
                }
            })

            if(!subscription) {
                throw new Error("У клиента нет активного абонимента или закончились занятия")
            }

            const workout = await tx.workoutSession.create({
                data: {
                    title: data.title || "Новая тернировка",
                    date: new Date(data.date),
                    clientId: data.clientId,
                    isCompleted: false,
                    trainerId: trainerProfile.id
                },
                include: {trainer: true, client: true}
            })

            await tx.subscription.update({
                where: {id: subscription.id},
                data: {remainingLesson: {decrement: 1}}
            })

            return workout
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

    static async completedWorkout(workoutId: string) {
        return await prisma.$transaction(async (tx) => {
            const workout = await tx.workoutSession.findUnique({
                where: {id: workoutId},
                include: {client: {include: {subscriptions: {where: {status: "ACTIVE"}}}}}
            })

            if(!workout) {
                throw new Error("Тренировка не найдена")
            }

            if(workout.isCompleted === true) {
                throw new Error("Тренировка уже завершена")
            }

            const activeSub = workout.client.subscriptions[0]
            if(!activeSub) {
                throw new Error("У клиента нет активного абонемента")
            }

            const updateSub = await tx.subscription.update({
                where: {id: activeSub.id},
                data: {remainingLesson: {decrement: 1}}
            })

            const updateWorkout = await tx.workoutSession.update({
                where: {id: workoutId},
                data: {isCompleted: true}
            })

            if(updateSub.remainingLesson - 1 <= 0) {
                await tx.subscription.update({
                    where: {id: activeSub.id},
                    data: {status: "EXPIRED"}
                })
            }

            return updateWorkout
        })
    }
}