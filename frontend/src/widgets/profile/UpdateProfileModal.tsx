import { UserRepo } from "@/data/repos/UserRepo";
import { UpdateProfileForm, updateProfileSchema } from "@/domain/schemas/profile/update";
import { useProfile, useUpdateProfile } from "@/features/profile";
import styles from "@/shared/styles/profile.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, InputBase, Loader, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface Props {
    opened: boolean;
    onClose: () => void;
}

const repo = new UserRepo();

export const UpdateProfileModal = ({opened, onClose}: Props) => {
    const {profile, isLoading} = useProfile(repo);
    const update = useUpdateProfile(repo);
    const form = useForm<UpdateProfileForm>({
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
        resolver: zodResolver(updateProfileSchema)
    });
    useEffect(() => {
        if (profile) {
            form.reset({
                name: profile.name,
                email: profile.email,
                phone: profile.phone ?? ""
            });
        }
    }, [profile, form]);
    const onSubmit = (data: UpdateProfileForm) => {
        update.mutate(data, {
            onSuccess: () => {
                form.reset();
                onClose();
            }
        });
    }
    return (
        <Modal title="Обновление профиля" opened={opened} onClose={onClose} centered>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : profile && (
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack mt="xs" gap="md">
                        <TextInput {...form.register("name")} classNames={{
                            root: styles.field,
                            input: styles.fieldInput,
                            label: styles.fieldInputLabel,
                            error: styles.fieldInputError
                        }} label="ФИО" error={form.formState.errors.name?.message}></TextInput>
                        <TextInput type="email" {...form.register("email")} classNames={{
                            root: styles.field,
                            input: styles.fieldInput,
                            label: styles.fieldInputLabel,
                            error: styles.fieldInputError
                        }} label="Email" error={form.formState.errors.email?.message}></TextInput>
                        <Controller control={form.control} name="phone" render={({field}) => (
                            <InputBase component={IMaskInput} mask="+7 (000) 000-00-00" classNames={{
                                root: styles.field,
                                input: styles.fieldInput,
                                label: styles.fieldInputLabel,
                                error: styles.fieldInputError
                            }} {...field} label="Номер телефона" error={
                                form.formState.errors.phone?.message
                            }></InputBase>
                        )}></Controller>
                        <Group gap="md">
                            <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить профиль</Button>
                            <Button variant="outline" classNames={{root: styles.cancelBtn}} onClick={() => {
                                form.reset();
                                onClose();
                            }}>Отмена</Button>
                        </Group>
                    </Stack>
                </form>
            )}
        </Modal>
    )
}