import { RequestHandler, Router } from "express";
import { WorkoutController } from "../Controllers/Workout_Controller.js";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { subscriptionGuard } from "../Middleware/Subscription_Middleware.js";


const router = Router()

router.use(authGuard as RequestHandler, subscriptionGuard as RequestHandler);

router.post('/', WorkoutController.createWorkout as RequestHandler);
router.get('/', WorkoutController.getWorkouts as RequestHandler);
router.put('/::workoutId', WorkoutController.updateWorkout as RequestHandler)
router.delete('/::workoutId', WorkoutController.deleteWorkout as RequestHandler)

export default router