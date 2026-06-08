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

    static getSubscriptions: ControllerMethods = async (req, res, next) => {
        try {
            const clientId = (req.query.clientId as string) || req.user?.userId;

            const result = await SubscriptionService.getSubscriptions(clientId)
            
            return res.status(200).json({success: true, data: result})
        }catch(err: any) {
            logger.error("Ошибка при получении абониментов:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static updateSubscription: ControllerMethods = async (req, res, next) => {
        try {
            const {subscriptionId, title, totalLessons, durationDays, remainingLesson, status} = req.body

            if (!subscriptionId) {
                return res.status(400).json({ success: false, message: "ID абонемента обязателен" });
            }

            const updated = await SubscriptionService.updateSubscription(subscriptionId, {title, totalLessons, durationDays, remainingLesson, status})

            if(!updated) {
                return res.status(404).json({success: false, message: "Абонимент не найден"})
            }

            return res.status(200).json({
                success: true,
                message: "Абонимент абновлен",
                subscription: updated
            })
        }catch(err: any) {
            logger.error("Ошибка при обновлении абонимента:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    static deleteSubscription: ControllerMethods = async (req, res, next) => {
        try {
            const {subscriptionId} = req.body

            if(!subscriptionId) {
                return res.status(400).json({ success: false, message: "ID абонемента обязателен" });
            }

            const deleted = await SubscriptionService.deleteSubscription(subscriptionId)

            return res.status(200).json({
                success: true,
                message: "Абонимент удален",
                subscription: deleted
            })
        }catch(err: any) {
            logger.error("Ошибка при удаление абонимента:", { error: err.message });
            return res.status(400).json({ success: false, message: err.message });
        }
    }
}