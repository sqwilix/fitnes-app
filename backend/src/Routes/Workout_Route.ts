import { RequestHandler, Router } from "express";
import { WorkoutController } from "../Controllers/Workout_Controller.js";
import { authGuard } from "../Middleware/Auth_Middleware.js";


const router = Router()

router.post('/', authGuard, WorkoutController.createWorkout as RequestHandler)
router.get('/', authGuard, WorkoutController.getWorkouts as RequestHandler)
router.put('/:workoutId', authGuard, WorkoutController.updateWorkout as RequestHandler)
router.delete('/:workoutId', authGuard, WorkoutController.deleteWorkout as RequestHandler)

export default router