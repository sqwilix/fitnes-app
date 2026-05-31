import { SubscriptionService } from "../Services/Subscription_Service.js";
import { ControllerMethods } from "../Types/types.js";
import { logger } from "../Utils/logger.js";


export class SubscriptionController {
    static createSub: ControllerMethods = async(req, res, next) => {
        try {
            const {clientId, title, totalLessons, durationDays} = req.body

            const subscription = await SubscriptionService.createSub(clientId, {title, totalLessons, durationDays})

            return res.status(201).json({
                success: true,
                message: "Абонимент создан",
                subscription
            })
        }catch(err: any) {
            logger.error("Ошибка при создании абонемента:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static manage: ControllerMethods = async (req, res, next) => {
        try {
            const id = req.params.id as string
            if (!id) {
                return res.status(400).json({ success: false, message: "ID абонемента не передан" });
            }
            const {action, lessons} = req.body

            let result
            switch(action) {
                case "FREEZY":
                    result = await SubscriptionService.freeze(id)
                    break
                case "UNFREEZE":
                    result = await SubscriptionService.unfreeze(id)
                    break
                case "ADD":
                    result = await SubscriptionService.addLessons(id, lessons)
                default:
                    return res.status(400).json({success: false, message: "Неверное действие"})
            }

            return res.status(200).json({success: true, data: result})
        }catch(err: any) {
            logger.error("Ошибка управления абонементом:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }
}