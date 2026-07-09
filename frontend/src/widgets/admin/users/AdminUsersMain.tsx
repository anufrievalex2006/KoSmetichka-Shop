import { UserRepo } from "@/data/repos/UserRepo";
import { useUsersList } from "@/features/admin/users";
import styles from "@/shared/styles/admin/users.module.scss";
import { Group, Loader, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { UserCard } from "./UserCard";

const repo = new UserRepo();

export const AdminUsersMain = () => {
    const {users, isLoading} = useUsersList(repo);
    const [search, setSearch] = useState("");

    const filtered = users?.filter(u => u.name.toLowerCase().includes(search.trim().toLowerCase()));
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Пользователи</Title>
            <TextInput flex={1} classNames={{
                input: styles.fieldInput
            }} leftSection={
                <IconSearch size={18}></IconSearch>
            } placeholder="Найти по имени" onChange={
                (e) => setSearch(e.currentTarget.value)
            }></TextInput>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (!users) ? (
                <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки пользователей</Text>
            ) : (users.length === 0) ? (
                <Text c="blue" fw={700} ta="center" size="lg">Пока нет пользователей</Text>
            ) : (filtered!.length === 0) ? (
                <Text c="blue" fw={500} ta="center" size="lg">По вашему запросу ничего не найдено</Text>
            ) : (
                <SimpleGrid cols={{base: 1, md: 2}} spacing="md">
                    {filtered?.map(u => (
                        <UserCard key={u.id} user={u}></UserCard>
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    )
}