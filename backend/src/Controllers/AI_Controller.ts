import { AIService } from "../Services/AI_Service.js";
import { ControllerMethods } from "../Types/types.js";
import { logger } from "../Utils/logger.js";


export class AIController {
    static generateWorkoutPlan: ControllerMethods = async (req, res, next) => {
        try {
            const {clientId, userPrompt} = req.body

            if (!clientId || !userPrompt) {
                return res.status(400).json({ success: false, message: "Не указан clientId или промпт" });
            }

            const aiGeneration = await AIService.generateWorkoutPlan(clientId, userPrompt)

            return res.status(201).json({
                success: true,
                message: "ИИ сгенерировал тренировку",
                ai: aiGeneration
            })
        }catch(err: any) {
            logger.error("Ошибка при генерации тренировки", {error: err.message})
            return res.status(500).json({ 
                success: false, 
                message: "Ошибка при генерации тренировки", 
                details: err.message 
            });
        }
    }

    static getHistory: ControllerMethods = async (req, res, next) => {
        try {
            const {clientId} = req.body

            if(!clientId) {
                return res.status(400).json({ success: false, message: "Не указан clientId" });
            }

            const history = await AIService.getHistory(clientId)

            return res.status(200).json({
                success: true,
                ai: history
            })
        }catch(err: any) {

        }
    }
}