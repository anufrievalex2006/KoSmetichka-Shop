import z from "zod";

export const createBrandSchema = z.object({
    name: z.string().min(1, "Введите название производителя"),
    description: z.string().optional(),
    logoUrl: z.string().optional()
});

export type CreateBrandForm = z.infer<typeof createBrandSchema>;