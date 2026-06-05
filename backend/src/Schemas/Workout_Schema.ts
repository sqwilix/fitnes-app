import {z} from "zod";


const WorkoutBaseSchema = z.object({
    clientId: z.string(),
    date: z.string(),
    title: z.string().optional(),
    exercises: z.array(z.object({
        name: z.string(),
        sets: z.string(),
        reps: z.string(),
        weight: z.string(),
        order: z.number().optional() // Добавь это, так как мы будем передавать order с фронта
    }))
})

export const CreateWorkoutSchema = WorkoutBaseSchema

export const UpdateWorkoutSchema = WorkoutBaseSchema.partial()