import {z} from "zod";


export const UpdateTrainerProfile = z.object({
    specialty: z.string().optional(),
    specialization: z.string().optional(),
    experience: z.string().optional(),
    bio: z.string().optional(),
}).partial()

export const UpdateClientProfile = z.object({
    weight: z.string().optional(),
    height: z.string().optional(),
    goal: z.string().optional(),
}).partial()