import { UserService } from "../Services/User_Service.js";
import { ControllerMethods } from "../Types/types.js";
import { logger } from "../Utils/logger.js";


export class UserController {
    static getClients: ControllerMethods = async (req, res, next) => {
        try {
            const result = await UserService.getClients()

            return res.status(200).json({success: true, data: result})
        }catch(err: any) {
            logger.error("Ошибка при получении клиентов:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }
    
    static assignClientToTrainer: ControllerMethods = async (req, res, next) => {
        try {
            const {clientId} = req.body
            const trainerId = req.user.userId

            const updated = await UserService.assignClientToTrainer(trainerId, clientId)

            return res.status(200).json({success: true, message: "Клиент теперь ваш", data: updated})
        }catch(err: any) {
            logger.error("Ошибка при назначении клиента:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static getMyClients: ControllerMethods = async (req, res, next) => {
        try {
            const trainerId = req.user.userId

            const result = await UserService.getMyClients(trainerId)

            return res.status(200).json({success: true, data: result})
        }catch(err: any) {
            logger.error("Ошибка при получении своего клиента:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static getMyClientById: ControllerMethods = async (req, res, next) => {
        try {
            const {clientId} = req.params as {clientId: string}

            const result = await UserService.getMyClientById(clientId)

            if (!result) {
                return res.status(404).json({ success: false, message: "Клиент не найден" });
            }

            return res.status(200).json({success: true, data: result})
        }catch(err: any) {
            logger.error("Ошибка при получении своего клиента по айди:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static getAllClients: ControllerMethods = async (req, res, next) => {
        try {
            const result = await UserService.getAllClients()

            return res.status(200).json({success: true, data: result})
        }catch(err: any) {
            logger.error("Ошибка при получении всех клиентов:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }
}