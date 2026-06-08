import { RequestHandler, Router } from "express";
import { WorkoutController } from "../Controllers/Workout_Controller.js";
import { authGuard } from "../Middleware/Auth_Middleware.js";
import { subscriptionGuard } from "../Middleware/Subscription_Middleware.js";
import { roleGuard } from "../Middleware/Role_Middleware.js";
import { ExerciseController } from "../Controllers/Exercise_Controller.js";


const router = Router()

router.use(authGuard as RequestHandler);

router.post('/', 
    roleGuard(["TRAINER"]) as RequestHandler, 
    subscriptionGuard as RequestHandler,
    WorkoutController.createWorkout as RequestHandler
)
router.get('/', WorkoutController.getWorkouts as RequestHandler);
router.put('/:workoutId', roleGuard(["TRAINER"]) as RequestHandler, WorkoutController.updateWorkout as RequestHandler)
router.delete('/:workoutId', roleGuard(["TRAINER"]) as RequestHandler, WorkoutController.deleteWorkout as RequestHandler)
router.patch('/:workoutId/completed', roleGuard(["TRAINER", "ADMIN"]) as RequestHandler, WorkoutController.completedWorkout as RequestHandler)

router.post('/:workoutId/exercise', roleGuard(["TRAINER"]) as RequestHandler, subscriptionGuard as RequestHandler, ExerciseController.createExerciseForWorkout as RequestHandler)
router.get('/:workoutId/exercise', ExerciseController.getExercisesByWorkout as RequestHandler)
router.put('/exercise/:exerciseId', roleGuard(["TRAINER"]) as RequestHandler, subscriptionGuard as RequestHandler, ExerciseController.updateExercise as RequestHandler)
router.delete('/exercise/:exerciseId', roleGuard(["TRAINER"]) as RequestHandler, subscriptionGuard as RequestHandler, ExerciseController.deleteExercise as RequestHandler)

export default router