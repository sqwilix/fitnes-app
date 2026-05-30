import {z} from "zod";

export const RegisterSchema = z.object({
    firstName: z.string().min(2, "Слишком короткое имя"),
    lastName: z.string().min(2, "Слишком короткая фамилия"),
    email: z.string().email("Неверный формат email"),
    password: z.string().min(6, "Пароль должен быть минимум из 6 символов"),
    role: z.enum(["CLIENT", "TRAINER"]).default("CLIENT") 
});

export const LoginSchema = z.object({
    email: z.string().email("Неверный формат email"),
    password: z.string().min(1, "Пароль обязателен")
});