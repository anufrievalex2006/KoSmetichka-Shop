import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { Button, Group, Loader, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import styles from "@/shared/styles/admin/news.module.scss";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useContentCardsList } from "@/features/contentCard";
import { useDisclosure } from "@mantine/hooks";
import { NewsCreateModal } from "./NewsCreateModal";
import { NewsCard } from "./NewsCard";

const repo = new ContentCardRepo();

export const AdminNewsMain = () => {
    const {cards, isLoading} = useContentCardsList(repo);
    const news = cards?.filter(c => c.type === "NEWS");
    const [createNewsOpened, {
        open: openCreateNewsModal,
        close: closeCreateNewsModal
    }] = useDisclosure(false);
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Новости</Title>
            <Stack gap="lg">
                <Button variant="outline" classNames={{
                    root: styles.addBtn
                }} leftSection={
                    <IconPlus size={18}></IconPlus>
                } onClick={openCreateNewsModal}>Добавить новость</Button>
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
                ) : (!cards || !news) ? (
                    <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки новостей</Text>
                ) : (news.length === 0) ? (
                    <Text c="blue" fw={700} ta="center" size="lg">Пока нет новостей</Text>
                ) : (
                    <SimpleGrid cols={{base: 1, md: 2}} spacing="xl">
                        {news.map(n => (
                            <NewsCard key={n.id} news={n}></NewsCard>
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
            <NewsCreateModal opened={createNewsOpened} onClose={closeCreateNewsModal}></NewsCreateModal>
        </Stack>
    )
}