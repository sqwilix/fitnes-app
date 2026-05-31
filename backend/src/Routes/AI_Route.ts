import { RequestHandler, Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { AIController } from "../Controllers/AI_Controller.js";


const router = Router()

router.post('/', authGuard as RequestHandler, AIController.generateWorkoutPlan as RequestHandler)
router.get('/', authGuard as RequestHandler, AIController.getHistory as RequestHandler)

export default router