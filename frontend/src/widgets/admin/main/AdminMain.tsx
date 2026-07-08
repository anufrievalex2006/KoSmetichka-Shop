import { AppealRepo } from "@/data/repos/AppealRepo";
import { UserRepo } from "@/data/repos/UserRepo";
import { useDashboardStats } from "@/features/admin/dashboard";
import styles from "@/shared/styles/admin/main.module.scss";
import { Group, Loader, SimpleGrid, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { IconMessageQuestion, IconUsers } from "@tabler/icons-react";
import Link from "next/link";

const aRepo = new AppealRepo();
const uRepo = new UserRepo();

export const AdminMain = () => {
    const {newAppealsCount, usersCount, isLoading} = useDashboardStats(aRepo, uRepo);
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Панель администрирования</Title>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (
                <SimpleGrid cols={{base: 1, sm: 2}}>
                    <UnstyledButton component={Link} href="/admin/appeals" classNames={{
                        root: styles.statCard
                    }}>
                        <IconMessageQuestion size={28}></IconMessageQuestion>
                        <Text classNames={{root: styles.entryValue}}>{newAppealsCount}</Text>
                        <Text classNames={{root: styles.entryTitle}}>Новых обращений</Text>
                    </UnstyledButton>
                    <UnstyledButton component={Link} href="/admin/users" classNames={{
                        root: styles.statCard
                    }}>
                        <IconUsers size={28}></IconUsers>
                        <Text classNames={{root: styles.entryValue}}>{usersCount}</Text>
                        <Text classNames={{root: styles.entryTitle}}>Пользователей в системе</Text>
                    </UnstyledButton>
                </SimpleGrid>
            )}
        </Stack>
    )
}