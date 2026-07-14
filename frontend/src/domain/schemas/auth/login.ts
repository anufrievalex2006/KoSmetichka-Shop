import z from "zod";

export const loginSchema = z.object({
    email: z.email("Некорректный формат почты"),
    password: z.string().min(1, "Введите пароль"),
    rememberMe: z.boolean()
});

export type LoginForm = z.infer<typeof loginSchema>;