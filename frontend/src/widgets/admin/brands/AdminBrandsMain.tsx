import { BrandRepo } from "@/data/repos/BrandRepo";
import { useBrandsList, useCreateBrand } from "@/features/admin/brand";
import styles from "@/shared/styles/admin/brand.module.scss";
import { Button, Group, Loader, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { BrandCard } from "./BrandCard";
import { useForm } from "react-hook-form";
import { CreateBrandForm, createBrandSchema } from "@/domain/schemas/admin/brands/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import { BrandCreateModal } from "./BrandCreateModal";

const repo = new BrandRepo();

export const AdminBrandsMain = () => {
    const {brands, isLoading} = useBrandsList(repo);
    const [createModalOpened, {
        open: openCreateBrandModal,
        close: closeCreateBrandModal
    }] = useDisclosure(false);
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Производители (бренды)</Title>
            <Stack gap="lg">
                <Button variant="outline" classNames={{
                    root: styles.addBtn
                }} leftSection={
                    <IconPlus size={18}></IconPlus>
                } onClick={openCreateBrandModal}>Добавить производителя</Button>
                <Group gap="sm">
                    <TextInput flex={1} classNames={{
                        input: styles.fieldInput2
                    }} leftSection={
                        <IconSearch size={18}></IconSearch>
                    } placeholder="Найти по названию"></TextInput>
                    <Button classNames={{root: styles.findBtn}}>Поиск</Button>
                </Group>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!brands) ? (
                    <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки производителей</Text>
                ) : (brands.length === 0) ? (
                    <Text c="blue" fw={700} ta="center" size="lg">Пока нет производителей</Text>
                ) : (
                    <SimpleGrid cols={{base: 2, xs: 2, sm: 3, md: 4}}>
                        {brands.map(b => (
                            <BrandCard key={b.id} brand={b}></BrandCard>
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
            <BrandCreateModal opened={createModalOpened} onClose={closeCreateBrandModal}></BrandCreateModal>
        </Stack>
    )
}