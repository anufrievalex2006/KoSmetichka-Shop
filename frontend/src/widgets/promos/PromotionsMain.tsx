import { useContentCardsList } from "@/features/contentCard";
import { Stack, Title, Group, Loader, SimpleGrid, Card, Box, Badge, Tooltip, Text } from "@mantine/core";
import styles from "@/shared/styles/cards.module.scss";
import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { PromotionCard } from "./PromotionCard";
import { ContentCardDto } from "@/domain";

const repo = new ContentCardRepo();

export const PromotionsMain = () => {
    const {cards, isLoading} = useContentCardsList(repo, "PROMO");
    return (
        <Stack flex={1} gap="lg" p="xl">
            <Title order={1} classNames={{root: styles.pageTitle}}>Актуальные акции</Title>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" size="lg" fw={500}>Пожалуйста, подождите...</Text>
                </Group>
            ) : (!cards) ? (
                <Text c="red" fw={700} size="xl" ta="center">Ошибка загрузки акций</Text>
            ) : (cards.filter(c => c.type === "PROMO").length === 0) ? (
                <Text c="blue" fw={700} size="xl" ta="center">Пока нет акций!</Text>
            ) : (
                <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="md">
                    {cards.filter(c => c.type === "PROMO").map(c => (
                        <PromotionCard key={c.id} promo={c}></PromotionCard>
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    )
}