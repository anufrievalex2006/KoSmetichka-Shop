import z from "zod";

export const createContentCardSchema = z.object({
    title: z.string().min(1, "Введите заголовок новости"),
    description: z.string().optional(),
    photoUrl: z.string().optional()
});

export type CreateContentCardForm = z.infer<typeof createContentCardSchema>;