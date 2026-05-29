import { prisma } from "../Utils/prisma.js"


export class ProfileService {
    static async getProfile(userId: string) {
        return await prisma.user.findUnique({
            where: {id: userId},
            omit: {password: true},
            include: {
                clientProfile: true,
                trainerProfile: true
            }
        })
    }

    static async updateProfile(userId: string, role: string, data: any) {
        if(role === "TRAINER") {
            return await prisma.trainerProfile.update({
                where: {userId},
                data: {
                    specialty: data.specialty,
                    specialization: data.specialization,
                    experience: data.experience,
                    bio: data.bio
                }
            })
        }

        if(role === "CLIENT") {
            return await prisma.clientProfile.update({
                where: {userId},
                data: {
                    weight: data.weight,
                    height: data.height,
                    goal: data.goal
                }
            })
        }

        throw new Error("Неизвестная роль")
    }
}