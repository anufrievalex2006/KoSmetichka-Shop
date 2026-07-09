import { UserRepo } from "@/data/repos/UserRepo";
import { ProfileDto, UserRole } from "@/domain";
import { useDeleteUser } from "@/features/admin/users";
import { useProfile } from "@/features/profile";
import styles from "@/shared/styles/admin/users.module.scss";
import { ActionIcon, Group, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";

interface Props {
    user: ProfileDto;
}

const roles: Record<UserRole, string> = {
    "ADMIN": "Администратор",
    "CLIENT": "Клиент",
    "CREATOR": "Редактор",
    "SUPPLIER": "Поставщик"
};

const repo = new UserRepo();

export const UserCard = ({user}: Props) => {
    const {profile} = useProfile(repo);
    const del = useDeleteUser(repo);
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
                <Text classNames={{root: `${styles.entry} ${styles.role}`}}>Роль: <span>{roles[user.role]}</span></Text>
                <Text classNames={{root: styles.entry}}>Email: <span>{user.email}</span></Text>
                <Text classNames={{root: styles.entry}}>Номер телефона: <span>{user.phone ?? "Нет"}</span></Text>
            </Stack>
        </Stack>
    )
}