import z from "zod";
import { createProductSchema } from "./create";

export const updateProductSchema = createProductSchema;

export type UpdateProductForm = z.infer<typeof updateProductSchema>;