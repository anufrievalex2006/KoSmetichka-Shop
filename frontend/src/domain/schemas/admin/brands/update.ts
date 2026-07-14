import z from "zod";
import { createBrandSchema } from "./create";

export const updateBrandSchema = createBrandSchema;

export type UpdateBrandForm = z.infer<typeof updateBrandSchema>;