import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Введите свое имя"),
    email: z.email("Некорректный формат почты"),
    password: z.string().min(8, "Пароль должен быть хотя бы 8 символов"),
    confirmPassword: z.string().min(1, "Введите пароль повторно"),
    phone: z.string().min(1, "Введите номер телефона").regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Для телефона нужен формат +7 (ххх) ххх-хх-хх")
}).refine(data => data.confirmPassword === data.password, {
    error: "Пароли должны совпадать",
    path: ["confirmPassword"]
});

export type RegisterForm = z.infer<typeof registerSchema>;