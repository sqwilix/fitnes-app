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
            include: {clientProfile: true}
        })
    }

    static async assignClientToTrainer(trainerId: string, clientId: string) {
        return await prisma.clientProfile.update({
            where: {userId: clientId},
            data: {trainerId: trainerId}
        })
    }
}