import { RequestHandler, Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { SubscriptionController } from "../Controllers/Subscription_Controller.js";
import { roleGuard } from "../Middleware/Role_Middleware.js";


const router = Router()

router.post('/', authGuard, roleGuard(["ADMIN"]) as RequestHandler, SubscriptionController.createSub as RequestHandler)
router.get('/', authGuard, SubscriptionController.getSubscriptions as RequestHandler)
router.patch('/:id', authGuard, roleGuard(["ADMIN"]) as RequestHandler, SubscriptionController.manage as RequestHandler)

export default router