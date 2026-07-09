import z from "zod";
import { createAttributeSchema } from "./create";

export const updateAttributeSchema = createAttributeSchema;

export type UpdateAttributeForm = z.infer<typeof updateAttributeSchema>;