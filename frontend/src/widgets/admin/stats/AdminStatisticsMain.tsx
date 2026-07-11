import { UserRepo } from "@/data/repos/UserRepo";
import { useRegistrationStats } from "@/features/admin/stats";
import { AreaChart } from "@mantine/charts";
import styles from "@/shared/styles/admin/stats.module.scss";
import { Group, Loader, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

const repo = new UserRepo();

export const AdminStatisticsMain = () => {
    const {stats, isLoading} = useRegistrationStats(repo);
    const chartData = stats?.map(s => ({
        date: dayjs(s.date).format("DD.MM"),
        Регистрации: s.count
    }));
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Статистика сайта</Title>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (!stats) ? (
                <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки статистики</Text>
            ) : (stats.length === 0) ? (
                <Text c="blue" fw={700} ta="center" size="lg">Пока нечего показать, недостаточно данных</Text>
            ) : (
                <AreaChart h={350} data={chartData!} dataKey="date" series={[{
                    name: "Регистрации",
                    color: "orange.6"
                }]} curveType="monotone" connectNulls classNames={{
                    root: styles.statsDiv
                }}></AreaChart>
            )}
        </Stack>
    )
}