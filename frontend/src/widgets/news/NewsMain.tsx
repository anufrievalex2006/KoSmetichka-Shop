import { ContentCardRepo } from "@/data/repos/ContentCardRepo"
import { useContentCardsList } from "@/features/contentCard";
import { Group, Loader, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/cards.module.scss";
import { NewsCard } from "./NewsCard";

const repo = new ContentCardRepo();

export const NewsMain = () => {
    const {cards, isLoading} = useContentCardsList(repo, "NEWS");
    return (
        <Stack flex={1} gap="lg" p="xl">
            <Title order={1} classNames={{root: styles.pageTitle}}>Новости</Title>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" size="lg" fw={500}>Пожалуйста, подождите...</Text>
                </Group>
            ) : (!cards) ? (
                <Text c="red" fw={700} size="xl" ta="center">Ошибка загрузки новостей</Text>
            ) : (cards.filter(c => c.type === "NEWS").length === 0) ? (
                <Text c="blue" fw={700} size="xl" ta="center">Пока нет новостей!</Text>
            ) : (
                <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="md">
                    {cards.filter(c => c.type === "NEWS").map(c => (
                        <NewsCard key={c.id} news={c}></NewsCard>
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    )
}