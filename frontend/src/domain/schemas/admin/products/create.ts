import { AttributeDto } from "@/domain/dto/attribute";
import z from "zod";

export const createProductSchema = (attributes: AttributeDto[]) => z.object({
    name: z.string().min(1, "Введите название товара"),
    barCodeNumber: z.string().optional(),
    article: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number("Введите количество товара").min(0, "Количество товара не может быть отрицательным"),
    price: z.number("Введите цену товара").min(0, "Цена товара не может быть отрицательной"),
    categoryId: z.string().min(1, "Выберите категорию товара"),
    brandId: z.string().min(1, "Выберите производителя товара"),
    attributeValues: z.array(z.object({
        attributeId: z.string(),
        value: z.string()
    })).superRefine((values, ctx) => {
        attributes.forEach((a, i) => {
            const raw = values[i]?.value?.trim();
            if (!raw) {
                ctx.addIssue({
                    code: "custom",
                    message: `Заполните значение атрибута "${a.name}"`,
                    path: [i, "value"]
                });
                return;
            }
            if (a.type === "INT" && !/^-?\d+$/.test(raw)) {
                ctx.addIssue({
                    code: "custom",
                    message: `${a.name} должен быть целым числом`,
                    path: [i, "value"]
                });
            }
            if (a.type === "FLOAT" && Number.isNaN(Number(raw))) {
                ctx.addIssue({
                    code: "custom",
                    message: `${a.name} должен быть числом`,
                    path: [i, "value"]
                });
            }
            if (a.type === "ENUM" && !a.enumValues?.includes(raw)) {
                ctx.addIssue({
                    code: "custom",
                    message: `Недопустимое значение атрибута "${a.name}"`,
                    path: [i, "value"]
                });
            }
        });
    })
});

export type CreateProductForm = z.infer<ReturnType<typeof createProductSchema>>;