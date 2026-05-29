import { Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { ExerciseController } from "../Controllers/Exercise_Controller.js";
import { RequestHandler } from "express";


const router = Router()

router.post('/:workoutId/exercise', authGuard, ExerciseController.createExerciseForWorkout as RequestHandler)
router.get('/:workoutId/exercise', authGuard, ExerciseController.getExercisesByWorkout as RequestHandler)
router.put('/exercise/:exerciseId', authGuard, ExerciseController.updateExercise as RequestHandler)
router.delete('/exercise/:exerciseId', authGuard, ExerciseController.deleteExercise as RequestHandler)

export default router