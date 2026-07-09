import z from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Введите название категории")
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;