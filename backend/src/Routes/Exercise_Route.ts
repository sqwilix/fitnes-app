import { Router } from "express";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { ExerciseController } from "../Controllers/Exercise_Controller.js";
import { RequestHandler } from "express";
import { subscriptionGuard } from "../Middleware/Subscription_Middleware.js";
import { roleGuard } from "../Middleware/Role_Middleware.js";


const router = Router()

router.use(authGuard as RequestHandler, subscriptionGuard as RequestHandler);

router.post('/:workoutId/exercise', roleGuard(["TRAINER"]) as RequestHandler, ExerciseController.createExerciseForWorkout as RequestHandler)
router.get('/:workoutId/exercise', ExerciseController.getExercisesByWorkout as RequestHandler)
router.put('/exercise/:exerciseId', roleGuard(["TRAINER"]) as RequestHandler, ExerciseController.updateExercise as RequestHandler)
router.delete('/exercise/:exerciseId', roleGuard(["TRAINER"]) as RequestHandler, ExerciseController.deleteExercise as RequestHandler)

export default router