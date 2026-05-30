import { RequestHandler, Router } from "express";
import { AuthController } from "../Controllers/Auth_Controller.js";


const router = Router()

router.post("/register", AuthController.register as RequestHandler)
router.post("/login", AuthController.login as RequestHandler)

export default router