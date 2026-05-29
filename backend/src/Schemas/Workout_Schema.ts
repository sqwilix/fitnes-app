import {z} from "zod";


const WorkoutBaseSchema = z.object({
    clientId: z.string().uuid("Неверный формат ID клиента"),
    date: z.string().datetime("Неверный формат даты"),
    title: z.string().min(1, "Название обязательное")
})

export const CreateWorkoutSchema = WorkoutBaseSchema

export const UpdateWorkoutSchema = WorkoutBaseSchema.partial()