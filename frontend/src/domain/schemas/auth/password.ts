import z from "zod";

export const forgotPasswordSchema = z.object({
    email: z.email("Некорректный формат почты")
});
export const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
    confirmPassword: z.string()
}).refine(data => data.confirmPassword === data.newPassword, {
    error: "Пароли не совпадают",
    path: ["confirmPassword"]
});
export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Введите текущий пароль"),
    newPassword: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
    confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
    error: "Пароли не совпадают",
    path: ["confirmPassword"]
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;