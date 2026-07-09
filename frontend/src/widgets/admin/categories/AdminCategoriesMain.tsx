import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { useCategoriesList } from "@/features/admin/categories";
import styles from "@/shared/styles/admin/categories.module.scss";
import { Button, Group, Loader, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { CategoryCreateModal } from "./CategoryCreateModal";

const repo = new CategoryRepo();

export const AdminCategoriesMain = () => {
    const {categories, isLoading} = useCategoriesList(repo);
    const [search, setSearch] = useState("");
    const [createModalOpened, {
        open: openCreateCategoryModal,
        close: closeCreateCategoryModal
    }] = useDisclosure(false);

    const filtered = categories?.filter(c => c.name.toLowerCase().includes(search.trim().toLowerCase()));
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Категории</Title>
            <Stack gap="lg">
                <Button variant="outline" classNames={{
                    root: styles.addBtn
                }} leftSection={
                    <IconPlus size={18}></IconPlus>
                } onClick={openCreateCategoryModal}>Добавить категорию</Button>
                <TextInput flex={1} classNames={{
                    input: styles.fieldInput2
                }} leftSection={
                    <IconSearch size={18}></IconSearch>
                } placeholder="Найти по названию" onChange={
                    (e) => setSearch(e.currentTarget.value)
                }></TextInput>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!categories) ? (
                    <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки категорий</Text>
                ) : (categories.length === 0) ? (
                    <Text c="blue" fw={700} ta="center" size="lg">Пока нет категорий</Text>
                ) : (filtered!.length === 0) ? (
                    <Text c="blue" fw={500} ta="center" size="lg">По вашему запросу ничего не найдено</Text>
                ) : (
                    <SimpleGrid cols={{base: 1, xs: 2, sm: 2, md: 3}}>
                        {filtered?.map(c => (
                            <CategoryCard key={c.id} category={c}></CategoryCard>
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
            <CategoryCreateModal opened={createModalOpened} onClose={closeCreateCategoryModal}></CategoryCreateModal>
        </Stack>
    )
}