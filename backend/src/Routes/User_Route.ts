import { RequestHandler, Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { roleGuard } from "../Middleware/Role_Middleware.js";
import { UserController } from "../Controllers/User_Controller.js";


const router = Router()

router.use(authGuard as RequestHandler)

router.get('/free', roleGuard(["TRAINER"]) as RequestHandler, UserController.getClients as RequestHandler)
router.get('/all', roleGuard(["ADMIN"]) as RequestHandler, UserController.getAllClients as RequestHandler)
router.get('/my', roleGuard(["TRAINER"]) as RequestHandler, UserController.getMyClients as RequestHandler)
router.post('/assign', roleGuard(["TRAINER"]) as RequestHandler, UserController.assignClientToTrainer as RequestHandler)
router.get('/my/:clientId', roleGuard(["TRAINER", "ADMIN"]) as RequestHandler, UserController.getMyClientById as RequestHandler)

export default router