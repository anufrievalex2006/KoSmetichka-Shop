import z from "zod";

export const updateProfileSchema = z.object({
    name: z.string().min(1, "Введите свое имя"),
    email: z.email("Некорректный формат почты"),
    phone: z.string().min(1, "Введите номер телефона").regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Для телефона нужен формат +7 (ххх) ххх-хх-хх")
});

export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;