import { UserRepo } from "@/data/repos/UserRepo";
import { ProfileDto, UserRole } from "@/domain";
import { ChangeUserRoleForm, changeUserRoleSchema } from "@/domain/schemas/admin/users/changeRole";
import { useDeleteUser, useUpdateUserRole } from "@/features/admin/users";
import { useProfile } from "@/features/profile";
import styles from "@/shared/styles/admin/users.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Group, Modal, Select, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
    user: ProfileDto;
}

const roles: Record<UserRole, string> = {
    "ADMIN": "Администратор",
    "CLIENT": "Клиент",
    "CREATOR": "Редактор",
    "SUPPLIER": "Поставщик"
};
const inputRoles = [
    {value: "ADMIN", label: "Администратор"},
    {value: "CLIENT", label: "Пользователь"},
    {value: "CREATOR", label: "Редактор"},
    {value: "SUPPLIER", label: "Поставщик"}
];

const repo = new UserRepo();

export const UserCard = ({user}: Props) => {
    const [modalOpened, {
        open: openModal,
        close: closeModal
    }] = useDisclosure(false);
    const {profile} = useProfile(repo);
    const update = useUpdateUserRole(repo);
    const del = useDeleteUser(repo);

    const form = useForm<ChangeUserRoleForm>({
        defaultValues: {
            role: "CLIENT"
        },
        resolver: zodResolver(changeUserRoleSchema)
    });
    useEffect(() => {
        if (user) {
            form.reset({
                role: user.role
            });
        }
    }, [user, form]);
    const onSubmit = (data: ChangeUserRoleForm) => {
        update.mutate({
            id: user.id,
            req: data
        }, {
            onSuccess: () => {
                form.reset();
                closeModal();
            }
        });
    }
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
            if (id === profile?.id) {
                notifications.show({
                    title: "Ошибка",
                    message: "Вы не можете удалить самого себя",
                    color: "red",
                    position: "top-right"
                });
                return;
            }
            del.mutate(id);
        }
    }
    return (
        <>
            <Stack gap="md" classNames={{root: styles.card}}>
                <Group w="100%" justify="space-between">
                    <Title order={3} classNames={{root: styles.cardTitle}}>{user.name}</Title>
                    <ActionIcon color="red" size={40} onClick={(e) => {
                        e.stopPropagation();
                        onDelete(user.id);
                    }}>
                        <IconTrash size={22}></IconTrash>
                    </ActionIcon>
                </Group>
                <Stack gap={8}>
                    <Group gap="lg">
                        <Text classNames={{root: `${styles.entry} ${styles.role}`}}>Роль: <span>{roles[user.role]}</span></Text>
                        <Text classNames={{root: styles.changeRole}} onClick={openModal}>Сменить</Text>
                    </Group>
                    <Text classNames={{root: styles.entry}}>Email: <span>{user.email}</span></Text>
                    <Text classNames={{root: styles.entry}}>Номер телефона: <span>{user.phone ?? "Нет"}</span></Text>
                </Stack>
            </Stack>
            <Modal title="Смена роли" opened={modalOpened} onClose={closeModal} centered>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack mt="xs" gap="md">
                        <Controller control={form.control} name="role" render={({field}) => (
                            <Select label="Роль" {...field} classNames={{
                                root: styles.field,
                                input: styles.fieldInput,
                                label: styles.fieldInputLabel,
                                error: styles.fieldInputError
                            }} data={inputRoles}></Select>
                        )}></Controller>
                        <Group grow>
                            <Button type="submit" classNames={{root: styles.submitBtn}}>Сменить роль</Button>
                            <Button type="reset" onClick={() => {
                                form.reset();
                                closeModal();
                            }} variant="outline" classNames={{
                                root: styles.cancelBtn
                            }}>Отмена</Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}