"use client";
import { Badge, Box, Button, Card, Group, Loader, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/main.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { useCategoriesList } from "@/features/admin/categories";
import { useContentCardsList } from "@/features/contentCard";

const categories = [
    { id: "1", name: "Уход за лицом" },
    { id: "2", name: "Декоративная косметика" },
    { id: "3", name: "Уход за волосами" },
    { id: "4", name: "Парфюмерия" },
    { id: "5", name: "Уход за телом" },
    { id: "6", name: "Аксессуары" },
];

const news = [
    { id: "1", title: "Новая линейка ухода за кожей", type: "NEWS" },
    { id: "2", title: "Скидки до 30% на парфюмерию", type: "PROMO" },
];

const cRepo = new CategoryRepo();
const conRepo = new ContentCardRepo();

export const Main = () => {
    const nav = useRouter();
    const {categories, isLoading: areCategsLoading} = useCategoriesList(cRepo);
    const {cards, isLoading: areCardsLoading} = useContentCardsList(conRepo);
    const isLoading = areCardsLoading || areCategsLoading;
    return (
        <Stack flex={1} gap={0}>
            <Stack classNames={{root: styles.hero}} gap="md">
                <Badge classNames={{root: styles.heroBadge}}>Новая коллекция</Badge>
                <Title order={1} classNames={{root: styles.heroTitle}}>Красота начинается здесь</Title>
                <Text classNames={{root: styles.heroTxt}}>
                    Подберите уход и макияж под себя - от корейских новинок до проверенных классик
                </Text>
                <Button onClick={() => nav.push("/")} classNames={{root: styles.heroButton}}>Перейти в Каталог</Button>
            </Stack>
            <Stack gap="lg" classNames={{root: styles.section}}>
                <Title order={2} classNames={{root: styles.sectionTitle}}>Категории</Title>
                <SimpleGrid cols={{base: 2, sm: 3, md: 6}} spacing="md">
                    {isLoading ? (
                        <Group gap="md" justify="center">
                            <Loader size="lg"></Loader>
                            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                        </Group>
                    ) : !categories ? (
                        <Text c="red" fw={700} ta="center" size="lg">Произошла ошибка при загрузке категорий товаров</Text>
                    ) : categories.map(c => (
                        <Link key={c.id} href={`/catalog?categoryId=${c.id}`} className={styles.categoryCard}>
                            <Text classNames={{root: styles.categoryName}}>{c.name}</Text>
                        </Link>
                    ))}
                </SimpleGrid>
            </Stack>
            <Stack gap="lg" classNames={{root: styles.section}}>
                <Title order={2} classNames={{root: styles.sectionTitle}}>Новости и акции</Title>
                <SimpleGrid cols={{base: 1, sm: 2}} spacing="md">
                    {isLoading ? (
                        <Group gap="md" justify="center">
                            <Loader size="lg"></Loader>
                            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                        </Group>
                    ) : !cards ? (
                        <Text c="red" fw={700} ta="center" size="lg">Произошла ошибка при загрузке новостей/акций</Text>
                    ) : cards.map(n => (
                        <Card key={n.id} classNames={{root: styles.newsCard}} padding="md">
                            <Badge classNames={{root: n.type === "PROMO" ? styles.badgePromo : styles.badgeNews}}>
                                {n.type === "PROMO" ? "Акция" : "Новость"}
                            </Badge>
                            <Text classNames={{root: styles.newsTitle}}>{n.title}</Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Stack>
        </Stack>
    )
}