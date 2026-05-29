import { Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { ExerciseController } from "../Controllers/Exercise_Controller.js";


const router = Router()

router.post('/:workoutId/exercise', authGuard, ExerciseController.createExerciseForWorkout)
router.get('/:workoutId/exercise', authGuard, ExerciseController.getExercisesByWorkout)
router.put('/exercise/:exerciseId', authGuard, ExerciseController.updateExercise)
router.delete('/exercise/:exerciseId', authGuard, ExerciseController.deleteExercise)

export default router