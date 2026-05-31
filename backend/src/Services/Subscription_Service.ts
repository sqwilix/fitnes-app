import { prisma } from "../Utils/prisma.js"


export class SubscriptionService {
    static async createSub(clientId: string, data: {title: string, totalLessons: number, durationDays: number}) {
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + data.durationDays)

        return await prisma.subscription.create({
            data: {
                clientId: clientId,
                title: data.title,
                totalLessons: data.totalLessons,
                remainingLesson: data.totalLessons,
                endDate: endDate
            }
        })
    }

    static async freeze(subscriptionId: string) {
        return await prisma.subscription.update({
            where: {id: subscriptionId},
            data: {status: "FROZEN", frozenAt: new Date()}
        })
    }

    static async unfreeze(subscriptionId: string) {
        const sub = await prisma.subscription.findUnique({where: {id: subscriptionId}})
        if(!sub || !sub.frozenAt) throw new Error("Абонемент не был заморожен")

        const daysFrozen = Math.floor((new Date().getTime() - sub.frozenAt.getTime()) / (1000 * 60 * 60 * 24))
        const newEndDate = new Date(sub.endDate)
        newEndDate.setDate(newEndDate.getDate() + daysFrozen)

        return await prisma.subscription.update({
            where: {id: subscriptionId},
            data: {status: "ACTIVE", frozenAt: null, endDate: newEndDate, freezeDaysRemaining: sub.freezeDaysRemaining - daysFrozen}
        })
    }

    static async addLessons(subscriptionId: string, lessons: number) {
        return await prisma.subscription.update({
            where: {id: subscriptionId},
            data: {
                totalLessons: {increment: lessons},
                remainingLesson: {increment: lessons}
            }
        })
    }
}