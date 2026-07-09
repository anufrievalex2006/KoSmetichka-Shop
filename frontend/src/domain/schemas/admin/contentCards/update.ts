import z from "zod";
import { createContentCardSchema } from "./create";

export const updateContentCardSchema = createContentCardSchema;

export type UpdateContentCardForm = z.infer<typeof updateContentCardSchema>;