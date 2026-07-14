import { AdminDashboardRepo } from "@/data/repos/AdminDashboardRepo";
import { useDashboardStats } from "@/features/admin/dashboard";
import styles from "@/shared/styles/admin/main.module.scss";
import { Group, Loader, SimpleGrid, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { IconBellRinging, IconBuildingStore, IconCategory, IconMedal, IconMessageQuestion, IconNews, IconUsers } from "@tabler/icons-react";
import Link from "next/link";

const repo = new AdminDashboardRepo();

export const AdminMain = () => {
    const {data, isLoading} = useDashboardStats(repo);
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Панель администрирования</Title>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (!data) ? (
                <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки данных</Text>
            ) : (
                <SimpleGrid cols={{base: 1, sm: 2}}>
                    {data.newAppealsCount != null && (
                        <UnstyledButton component={Link} href="/admin/appeals" classNames={{
                            root: styles.statCard
                        }}>
                            <IconMessageQuestion size={28}></IconMessageQuestion>
                            <Text classNames={{root: styles.entryValue}}>{data.newAppealsCount}</Text>
                            <Text classNames={{root: styles.entryTitle}}>Новых обращений</Text>
                        </UnstyledButton>
                    )}
                    <UnstyledButton component={Link} href="/admin/brands" classNames={{
                        root: styles.statCard
                    }}>
                        <IconMedal size={28}></IconMedal>
                        <Text classNames={{root: styles.entryValue}}>{data.brandsCount}</Text>
                        <Text classNames={{root: styles.entryTitle}}>Производителей в системе</Text>
                    </UnstyledButton>
                    <UnstyledButton component={Link} href="/admin/categories" classNames={{
                        root: styles.statCard
                    }}>
                        <IconCategory size={28}></IconCategory>
                        <Text classNames={{root: styles.entryValue}}>{data.categoriesCount}</Text>
                        <Text classNames={{root: styles.entryTitle}}>Категорий в каталоге</Text>
                    </UnstyledButton>
                    <UnstyledButton component={Link} href="/admin/news" classNames={{
                        root: styles.statCard
                    }}>
                        <IconNews size={28}></IconNews>
                        <Text classNames={{root: styles.entryValue}}>{data.newsCount}</Text>
                        <Text classNames={{root: styles.entryTitle}}>Новостей загружено</Text>
                    </UnstyledButton>
                    <UnstyledButton component={Link} href="/admin/promotions" classNames={{
                        root: styles.statCard
                    }}>
                        <IconBellRinging size={28}></IconBellRinging>
                        <Text classNames={{root: styles.entryValue}}>{data.promotionsCount}</Text>
                        <Text classNames={{root: styles.entryTitle}}>Акций загружено</Text>
                    </UnstyledButton>
                    <UnstyledButton classNames={{root: styles.statCard}}>
                        <IconBuildingStore size={28}></IconBuildingStore>
                        <Text classNames={{root: styles.entryValue}}>{data.productsCount}</Text>
                        <Text classNames={{root: styles.entryTitle}}>Товаров в системе (итого по всем категориям)</Text>
                    </UnstyledButton>
                    {data.usersCount != null && (
                        <UnstyledButton component={Link} href="/admin/users" classNames={{
                            root: styles.statCard
                        }}>
                            <IconUsers size={28}></IconUsers>
                            <Text classNames={{root: styles.entryValue}}>{data.usersCount}</Text>
                            <Text classNames={{root: styles.entryTitle}}>Пользователей в системе</Text>
                        </UnstyledButton>
                    )}
                </SimpleGrid>
            )}
        </Stack>
    )
}