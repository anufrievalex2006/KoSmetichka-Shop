import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { useCategoriesList } from "@/features/admin/categories";
import styles from "@/shared/styles/catalog.module.scss";
import { Group, Loader, Select, Stack, TextInput, Text, Title, SimpleGrid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const repo = new CategoryRepo();

export const CatalogMain = () => {
    const nav = useRouter();
    const {categories, isLoading} = useCategoriesList(repo);
    const [search, setSearch] = useState("");

    const filtered = categories?.filter(c => c.name.toLowerCase().includes(search.trim().toLowerCase()));
    return (
        <Stack flex={1} gap={45} p="xl">
            <Title order={1} classNames={{root: styles.pageTitle}}>Каталог товаров</Title>
            <Stack gap="lg" px="xl">
                <TextInput placeholder="Поиск по названию" flex={1} classNames={{
                    root: styles.field,
                    input: styles.fieldInput2,
                    label: styles.fieldInputLabel,
                    error: styles.fieldInputError
                }} leftSection={
                    <IconSearch size={18}></IconSearch>
                } onChange={
                    (e) => setSearch(e.currentTarget.value)    
                }></TextInput>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!categories) ? (
                    <Text c="red" fw={700} ta="center" size="lg">Произошла ошибка при загрузке категорий</Text>
                ) : (filtered?.length === 0) ? (
                    <Text c="blue" fw={700} ta="center" size="lg">По вашему запросу ничего не найдено</Text>
                ) : (
                    <SimpleGrid cols={{base: 2, xs: 2, sm: 3, md: 4, lg: 5, xl: 6}}>
                        {filtered?.sort((a,b) => a.name.localeCompare(b.name, "ru")).map(c => (
                            <Stack key={c.id} classNames={{root: styles.card}} onClick={() => nav.push(`/catalog/${c.id}`)}>
                                <Title order={3} classNames={{root: styles.cardTitle}}>{c.name}</Title>
                            </Stack>
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
        </Stack>
    )
}