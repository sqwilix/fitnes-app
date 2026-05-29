import { Router } from "express";
import { WorkoutController } from "../Controllers/Workout_Controller.js";
import { authGuard } from "../Middleware/Auth_Middleware.js";


const router = Router()

router.post('/', authGuard, WorkoutController.createWorkout)
router.get('/', authGuard, WorkoutController.getWorkouts)
router.put('/:workoutId', authGuard, WorkoutController.updateWorkout)
router.delete('/:workoutId', authGuard, WorkoutController.deleteWorkout)

export default router