import { AuthRepo } from "@/data/repos/AuthRepo";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/domain/schemas/auth/password";
import { useForgotPassword } from "@/features/auth";
import styles from "@/shared/styles/auth.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "react-hook-form";

const repo = new AuthRepo();
const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

export const ForgotPasswordMain = () => {
    const forgot = useForgotPassword(repo);
    const form = useForm<ForgotPasswordForm>({
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(forgotPasswordSchema)
    });
    const onSubmit = (data: ForgotPasswordForm) => {
        forgot.mutate(data, {
            onSuccess: () => {
                form.reset();
            }
        });
    }
    return (
        <Stack flex={1} align="center" justify="center" gap={45} p="xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.authForm}>
                <Stack gap="md">
                    <Title order={2} mb="md" ta="center" classNames={{root: styles.pageTitle}}>Восстановление пароля</Title>
                    <Text classNames={{root: styles.p1}}>Укажите почту, на которую зарегистрирован аккаунт — мы отправим ссылку для сброса пароля.</Text>
                    <TextInput type="email" {...form.register("email")} error={
                        form.formState.errors.email?.message
                    } classNames={classes} label="Email"></TextInput>
                    <Button type="submit" loading={forgot.isPending} classNames={{root: styles.submitBtn}}>Отправить ссылку</Button>
                </Stack>
            </form>
        </Stack>
    )
}