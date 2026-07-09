import z from "zod";
import { createCategorySchema } from "./create";

export const updateCategorySchema = createCategorySchema;

export type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;