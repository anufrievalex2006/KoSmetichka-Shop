"use client";
import { Badge, Box, Button, Card, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/main.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = [
    { id: "1", name: "Уход за лицом" },
    { id: "2", name: "Декоративная косметика" },
    { id: "3", name: "Уход за волосами" },
    { id: "4", name: "Парфюмерия" },
    { id: "5", name: "Уход за телом" },
    { id: "6", name: "Аксессуары" },
];

const products = [
    { id: "1", name: "Сыворотка с витамином C", price: 1490, brand: "GlowLab" },
    { id: "2", name: "Матовая помада", price: 890, brand: "VelvetRouge" },
    { id: "3", name: "Крем для рук", price: 450, brand: "SoftTouch" },
    { id: "4", name: "Тушь для ресниц", price: 990, brand: "LashLine" },
];

const news = [
    { id: "1", title: "Новая линейка ухода за кожей", type: "NEWS" },
    { id: "2", title: "Скидки до 30% на парфюмерию", type: "PROMO" },
];

export const Main = () => {
    const nav = useRouter();
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
                    {categories.map(c => (
                        <Link key={c.id} href={`/catalog?categoryId=${c.id}`} className={styles.categoryCard}>
                            <Text classNames={{root: styles.categoryName}}>{c.name}</Text>
                        </Link>
                    ))}
                </SimpleGrid>
            </Stack>
            <Stack gap="lg" classNames={{root: styles.section}}>
                <Title order={2} classNames={{root: styles.sectionTitle}}>Новинки</Title>
                <SimpleGrid cols={{base: 2, sm: 2, md: 4}} spacing="md">
                    {products.map(p => (
                        <Card key={p.id} classNames={{root: styles.productCard}} padding="md">
                            <Box className={styles.productImgPlaceholder}></Box>
                            <Text classNames={{root: styles.productBrand}}>{p.brand}</Text>
                            <Text classNames={{root: styles.productName}}>{p.name}</Text>
                            <Text classNames={{root: styles.productPrice}}>{p.price} руб.</Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Stack>
            <Stack gap="lg" classNames={{root: styles.section}}>
                <Title order={2} classNames={{root: styles.sectionTitle}}>Новости и акции</Title>
                <SimpleGrid cols={{base: 1, sm: 2}} spacing="md">
                    {news.map(n => (
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