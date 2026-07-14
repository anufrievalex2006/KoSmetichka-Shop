import z from "zod";

export const createAttributeSchema = z.object({
    name: z.string().min(1, "Введите название атрибута"),
    type: z.enum(["INT", "FLOAT", "TEXT", "ENUM"], "Выберите тип данных для атрибута"),
    unit: z.string().optional(),
    enumValues: z.array(z.string().min(1, "Значение не может быть пустым")).optional()
}).refine(data => data.type !== "ENUM" || (data.enumValues && data.enumValues.length > 0), {
    error: "Добавьте хотя бы одно значение",
    path: ["enumValues"]
});

export type CreateAttributeForm = z.infer<typeof createAttributeSchema>;