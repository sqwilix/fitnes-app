import { RequestHandler, Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { roleGuard } from "../Middleware/Role_Middleware.js";
import { UserController } from "../Controllers/User_Controller.js";


const router = Router()

router.get('/free', authGuard as RequestHandler, roleGuard(["TRAINER"]) as RequestHandler, UserController.getClients as RequestHandler)
router.get('/my', authGuard as RequestHandler, roleGuard(["TRAINER"]) as RequestHandler, UserController.getMyClients as RequestHandler)
router.post('/assign', authGuard as RequestHandler, roleGuard(["TRAINER"]) as RequestHandler, UserController.assignClientToTrainer as RequestHandler)

export default router