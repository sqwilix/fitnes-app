import { ControllerMethods } from "../Types/types.js";
import { prisma } from "../Utils/prisma.js";


export class UserService {
    static async getClients() {
        return await prisma.user.findMany({
            where: {
                role: "CLIENT",
                clientProfile: {
                    trainerId: null
                }
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                clientProfile: true
            }
        })
    }

    static async assignClientToTrainer(userId: string, clientId: string) {
        const trainerProfile = await prisma.trainerProfile.findUnique({
            where: {userId: userId}
        })

        if(!trainerProfile) {
            throw new Error("Профиль тренера не найден для данного тренера")
        }

        return await prisma.clientProfile.update({
            where: {userId: clientId},
            data: {trainerId: trainerProfile.id}
        })
    }

    static async getMyClients(userId: string) {
        const trainerProfile = await prisma.trainerProfile.findUnique({
            where: {userId: userId}
        })

        if(!trainerProfile) return []

        return await prisma.user.findMany({
            where: {
                role: "CLIENT",
                clientProfile: {trainerId: trainerProfile.id}
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                clientProfile: {
                    select: {
                        id: true,
                        weight: true,
                        height: true,
                        goal: true,
                        subscriptions: {
                            select: {
                                id: true,
                                title: true,
                                status: true,
                                totalLessons: true,
                                remainingLesson: true,
                                startDate: true,
                                endDate: true,
                                freezeDaysAllowed: true,
                                freezeDaysRemaining: true,
                                frozenAt: true
                            }
                        }
                    }
                }
            }
        })
    }

    static async getMyClientById(clientId: string) {
        return await prisma.user.findFirst({
            where: {
                role: "CLIENT",
                id: clientId
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                clientProfile: {
                    select: {
                        id: true,
                        weight: true,
                        height: true,
                        goal: true,
                        subscriptions: {
                            select: {
                                id: true,
                                title: true,
                                status: true,
                                totalLessons: true,
                                remainingLesson: true,
                                startDate: true,
                                endDate: true,
                                freezeDaysAllowed: true,
                                freezeDaysRemaining: true,
                                frozenAt: true
                            }
                        }
                    }
                }
            }
        })
    }
}