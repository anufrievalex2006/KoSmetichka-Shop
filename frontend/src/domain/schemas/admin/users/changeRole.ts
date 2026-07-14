import z from "zod";

export const changeUserRoleSchema = z.object({
    role: z.enum(["ADMIN", "CREATOR", "CLIENT", "SUPPLIER"], "Некорректная роль")
});

export type ChangeUserRoleForm = z.infer<typeof changeUserRoleSchema>;