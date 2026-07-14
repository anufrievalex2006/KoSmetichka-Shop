import { AuthRepo } from "@/data/repos/AuthRepo";
import { ResetPasswordForm, resetPasswordSchema } from "@/domain/schemas/auth/password";
import { useResetPassword } from "@/features/auth";
import styles from "@/shared/styles/auth.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const repo = new AuthRepo();
const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

export const ResetPasswordMain = () => {
    const nav = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const reset = useResetPassword(repo);
    const form = useForm<ResetPasswordForm>({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        resolver: zodResolver(resetPasswordSchema)
    });
    if (!token) {
        return (
            <Stack flex={1} gap={45} p="xl">
                <Text c="red" fw={700} ta="center" size="lg">Ссылка недействительна - отсутствует токен восстановления</Text>
            </Stack>
        )
    }
    const onSubmit = (data: ResetPasswordForm) => {
        reset.mutate({token, newPassword: data.newPassword}, {
            onSuccess: () => {
                form.reset();
                nav.push("/login");   
            }
        });
    }
    return (
        <Stack flex={1} gap={45} align="center" justify="center" p="xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.authForm}>
                <Stack gap="md">
                    <Title order={2} classNames={{root: styles.pageTitle}}>Новый пароль</Title>
                    <PasswordInput {...form.register("newPassword")} error={form.formState.errors.newPassword?.message}
                        label="Новый пароль" classNames={classes}></PasswordInput>
                    <PasswordInput {...form.register("confirmPassword")} error={form.formState.errors.confirmPassword?.message}
                        label="Повторите пароль" classNames={classes}></PasswordInput>
                    <Button type="submit" loading={reset.isPending} classNames={{root: styles.submitBtn}}>
                        Сохранить новый пароль
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}