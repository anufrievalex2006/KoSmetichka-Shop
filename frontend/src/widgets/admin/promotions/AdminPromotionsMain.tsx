import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { Button, Group, Loader, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import styles from "@/shared/styles/admin/promos.module.scss";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useContentCardsList } from "@/features/contentCard";
import { useDisclosure } from "@mantine/hooks";
import { PromotionCreateModal } from "./PromotionCreateModal";
import { PromotionCard } from "./PromotionsCard";

const repo = new ContentCardRepo();

export const AdminPromotionsMain = () => {
    const {cards, isLoading} = useContentCardsList(repo);
    const promos = cards?.filter(c => c.type === "PROMO");
    const [createPromoOpened, {
        open: openCreatePromoModal,
        close: closeCreatePromoModal
    }] = useDisclosure(false);
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Акции</Title>
            <Stack gap="lg">
                <Button variant="outline" classNames={{
                    root: styles.addBtn
                }} leftSection={
                    <IconPlus size={18}></IconPlus>
                } onClick={openCreatePromoModal}>Добавить акцию</Button>
                <Group gap="sm">
                    <TextInput flex={1} classNames={{
                        input: styles.fieldInput2
                    }} leftSection={
                        <IconSearch size={18}></IconSearch>
                    } placeholder="Найти по заголовку"></TextInput>
                    <Button classNames={{root: styles.findBtn}}>Поиск</Button>
                </Group>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!cards || !promos) ? (
                    <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки акций</Text>
                ) : (promos.length === 0) ? (
                    <Text c="blue" fw={700} ta="center" size="lg">Пока нет акций</Text>
                ) : (
                    <SimpleGrid cols={{base: 1, md: 2}} spacing="xl">
                        {promos.map(p => (
                            <PromotionCard key={p.id} promo={p}></PromotionCard>
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
            <PromotionCreateModal opened={createPromoOpened} onClose={closeCreatePromoModal}></PromotionCreateModal>
        </Stack>
    )
}