import { prisma } from "../Utils/prisma.js";

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

export class WorkoutService {
    static async createWorkout(userId: string, data: CreateWorkoutInput) {
        const trainerProfile = await prisma.trainerProfile.findUnique({
            where: { userId: userId }
        });

        if (!trainerProfile) {
            throw new Error("Действие разрешено только для тренеров");
        }

        return await prisma.$transaction(async (tx) => {
            const client = await tx.clientProfile.findFirst({
                where: {
                    OR: [
                        {id: data.clientId},
                        {userId: data.clientId}
                    ]
                }
            });

            if (!client) {
                throw new Error("Клиент с таким ID не найден в базе данных");
            }

            const actualClientId = client.id

            const subscription = await tx.subscription.findFirst({
                where: {
                    clientId: actualClientId,
                    status: "ACTIVE"
                }
            });

            console.log("Диагностика:", { 
                clientId: data.clientId, 
                foundSubscription: !!subscription 
            });

            if (!subscription) {
                throw new Error("У клиента нет активного абонемента");
            }

            if (subscription.remainingLesson <= 0) {
                throw new Error("У клиента закончились занятия в абонементе");
            }

            const workout = await tx.workoutSession.create({
                data: {
                    title: data.title || "Новая тренировка",
                    date: new Date(data.date),
                    clientId: actualClientId,
                    isCompleted: false,
                    trainerId: trainerProfile.id,
                },
                include: { exercises: true }
            });

            return await tx.workoutSession.findUnique({
                where: { id: workout.id },
                include: { exercises: true }
            });
        });
    }

    static async getWorkouts(userId: string, clientId?: string) {
        console.log("DEBUG: Ищем для clientId:", clientId);

        const exactMatch = await prisma.workoutSession.findMany({
            where: { clientId: clientId },
            include: {exercises: true}
        });
        console.log("Найдено точным совпадением:", exactMatch.length);

        if (exactMatch.length === 0) {
            const all = await prisma.workoutSession.findMany();
            console.log("Всего записей в WorkoutSession:", all.length);
            if (all.length > 0) {
                console.log("Пример первого clientId в базе:", all[0].clientId);
            }
        }

        return exactMatch;
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