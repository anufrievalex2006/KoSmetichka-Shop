import z from "zod";

export const sendClientQuestionSchema = z.object({
    fullName: z.string().min(1, "Введите ваше ФИО"),
    content: z.string().min(10, "Длина вопроса должна быть не менее 10 символов"),
    contactEmail: z.email("Некорректный формат почты"),
    contactPhone: z.string("Введите номер телефона").min(1, "Введите номер телефона").regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Для телефона нужен формат +7 (ххх) ххх-хх-хх")
});
export const sendSupplierRequestSchema = z.object({
    companyName: z.string().min(1, "Введите название вашей компании"),
    content: z.string().min(10, "Длина текста к заявке должна быть не менее 10 символов"),
    contactEmail: z.email("Некорректный формат почты"),
    contactPhone: z.string("Введите номер телефона").min(1, "Введите номер телефона").regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Для телефона нужен формат +7 (ххх) ххх-хх-хх")
});

export type SendClientQuestionForm = z.infer<typeof sendClientQuestionSchema>;
export type SendSupplierRequestForm = z.infer<typeof sendSupplierRequestSchema>;