import { useContentCardsList } from "@/features/contentCard";
import { Stack, Title, Group, Loader, SimpleGrid, Card, Box, Badge, Tooltip, Text } from "@mantine/core";
import styles from "@/shared/styles/cards.module.scss";
import Link from "next/link";
import { ContentCardRepo } from "@/data/repos/ContentCardRepo";

const repo = new ContentCardRepo();

const news = [
    {id: "1", title: "Тест акции", description: "Тест описания акции", type: "PROMO", photoUrl: null, createdAt: "2026-04-21T13:25:00.426", updatedAt: "2026-06-29T18:42:59.382"}
]

function formatDateTime(date: string): string {
    const d = new Date(date);
    const p1 = d.toLocaleDateString('ru-RU', {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const p2 = d.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });
    return `${p1} в ${p2}`;
}

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
            ) : (news.length === 0) ? (
                <Text c="blue" fw={700} size="xl" ta="center">Пока нет акций!</Text>
            ) : (
                <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="md">
                    {news.map(c => (
                        <Link key={c.id} href={`/promotions/${c.id}`} className={styles.link}>
                            <Card classNames={{root: styles.card}} padding="md">
                                {c.photoUrl ? (
                                    <Box className={styles.cardImg} style={{backgroundImage: `url(${c.photoUrl})`}}></Box>
                                ) : (
                                    <Box className={styles.cardImgPlaceholder}></Box>
                                )}
                                <Badge classNames={{root: styles.badgePromo}}>Акция</Badge>
                                <Text classNames={{root: styles.cardTitle}}>{c.title}</Text>
                                {c.description && (
                                    <Text classNames={{root: styles.cardDescription}} lineClamp={2}>
                                        {c.description}
                                    </Text>
                                )}
                                <Text classNames={{root: styles.cardDate}}>
                                    <Text component="span">{formatDateTime(c.createdAt)}</Text>
                                    {c.createdAt !== c.updatedAt && (
                                        <Tooltip label={`Изменено ${formatDateTime(c.updatedAt)}`} withArrow>
                                            <Text component="span" classNames={{root: styles.editedMark}}>(изм.)</Text>
                                        </Tooltip>
                                    )}
                                </Text>
                            </Card>
                        </Link>
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    )
}