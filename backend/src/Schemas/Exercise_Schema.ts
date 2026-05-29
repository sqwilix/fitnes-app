import {z} from "zod";

const ExerciseBaseSchema = z.object({
    name: z.string().min(1, "Название упражнения обязательно"),
    sets: z.string().regex(/^\d+[-\d]*$/, "Неверный формат подходов"),
    reps: z.string().regex(/^\d+[-\d]*$/, "Неверный формат повторений"),
    weight: z.string().regex(/^\d+[-\d]*$/, "Неверный формат веса"),
})

export const CreateExerciseSchema = ExerciseBaseSchema

export const UpdateExerciseSchema = ExerciseBaseSchema.partial()