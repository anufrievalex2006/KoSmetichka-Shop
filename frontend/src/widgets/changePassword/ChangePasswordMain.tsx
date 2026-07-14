import { UserRepo } from "@/data/repos/UserRepo";
import { ChangePasswordForm, changePasswordSchema } from "@/domain/schemas/auth/password";
import { useChangePassword } from "@/features/auth";
import styles from "@/shared/styles/profile.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Modal, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "react-hook-form";

interface Props {
    opened: boolean;
    onClose: () => void;
}

const repo = new UserRepo();
const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

export const ChangePasswordModal = ({opened, onClose}: Props) => {
    const change = useChangePassword(repo);
    const form = useForm<ChangePasswordForm>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        resolver: zodResolver(changePasswordSchema)
    });
    const onSubmit = (data: ChangePasswordForm) => {
        change.mutate(data, {
            onSuccess: () => {
                form.reset();
                onClose();
            }
        });
    }
    return (
        <Modal title="Обновление пароля" opened={opened} onClose={onClose} centered>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack mt="xs" gap="md">
                    <PasswordInput {...form.register("oldPassword")} error={form.formState.errors.oldPassword?.message}
                        label="Текущий пароль" classNames={classes}></PasswordInput>
                    <PasswordInput {...form.register("newPassword")} error={form.formState.errors.newPassword?.message}
                        label="Новый пароль" classNames={classes}></PasswordInput>
                    <PasswordInput {...form.register("confirmPassword")} error={form.formState.errors.confirmPassword?.message}
                        label="Повторите новый пароль" classNames={classes}></PasswordInput>
                    <Group grow>
                        <Button type="submit" loading={change.isPending} classNames={{root: styles.submitBtn}}>Сохранить</Button>
                        <Button type="reset" variant="outline" classNames={{root: styles.cancelBtn}} onClick={() => {
                            form.reset();
                            onClose();
                        }}>Отмена</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}