import { RequestHandler, Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { ProfileController } from "../Controllers/Profile_Controller.js";


const router = Router()

router.get('/profile', authGuard, ProfileController.getProfile as RequestHandler)
router.put('/profile', authGuard, ProfileController.updateProfile as RequestHandler)

export default router