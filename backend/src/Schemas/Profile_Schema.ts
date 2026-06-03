import { z } from "zod";

export const UpdateTrainerProfile = z.object({
    firstName: z.string().min(2, "Имя слишком короткое").optional(),
    lastName: z.string().min(2, "Фамилия слишком короткая").optional(),
    specialty: z.string().optional(),
    specialization: z.string().optional(),
    experience: z.number().optional(),
    bio: z.string().optional(),
});

export const UpdateClientProfile = z.object({
    firstName: z.string().min(2, "Имя слишком короткое").optional(),
    lastName: z.string().min(2, "Фамилия слишком короткая").optional(),
    weight: z.number().optional(),
    height: z.number().optional(),
    goal: z.string().optional(),
});