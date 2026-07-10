import styles from "@/shared/styles/admin/category.module.scss";
import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { ActionIcon, Button, Group, Loader, Stack, Table, Text, TextInput, Title } from "@mantine/core";
import { useCategoryDetails } from "@/features/admin/categories";
import { IconPencil, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useCategoryAttributes, useDeleteAttribute } from "@/features/admin/attributes";
import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { useDisclosure } from "@mantine/hooks";
import { AttributeCreateModal } from "./AttributeCreateModal";
import { AttributeUpdateModal } from "./AttributeUpdateModal";
import { AttributeDto } from "@/domain";
import { AdminProductsMain } from "./products/AdminProductsMain";

interface Props {
    id: string;
}

const repo = new CategoryRepo();
const aRepo = new AttributeRepo();

export const AdminCategoryMain = ({id}: Props) => {
    const del = useDeleteAttribute(aRepo);
    const {category, isLoading} = useCategoryDetails(id, repo);
    const {attributes, isLoading: areAttribsLoading} = useCategoryAttributes(id, aRepo);
    const [createModalOpened, {
        open: openCreateAttrModal,
        close: closeCreateAttrModal
    }] = useDisclosure(false);
    const [updateModalOpened, {
        open: openUpdateAttrModal,
        close: closeUpdateAttrModal
    }] = useDisclosure(false);
    const [selectedAttr, setSelectedAttr] = useState<AttributeDto | null>(null);
    const [search, setSearch] = useState("");

    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этот атрибут?"))
            del.mutate(id);
    }

    const filtered = attributes?.filter(a => a.name.toLowerCase().includes(search.trim().toLowerCase()));
    return isLoading ? (
        <Group gap="md" justify="center">
            <Loader size="lg"></Loader>
            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
        </Group>
    ) : (!category) ? (
        <Text c="red" fw={700} ta="center">Такой категории не существует</Text>
    ) : (
        <Stack flex={1} gap={45}>
            <Title order={3} classNames={{root: styles.pageTitle}}>Категория "{category.name}"</Title>
            <Stack gap="lg">
                <Button variant="outline" classNames={{
                    root: styles.addBtn
                }} leftSection={
                    <IconPlus size={18}></IconPlus>
                } onClick={openCreateAttrModal}>Добавить атрибут</Button>
                <TextInput flex={1} classNames={{
                    input: styles.fieldInput2
                }} leftSection={
                    <IconSearch size={18}></IconSearch>
                } placeholder="Найти по названию" onChange={
                    (e) => setSearch(e.currentTarget.value)
                }></TextInput>
                {areAttribsLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!attributes) ? (
                    <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки атрибутов</Text>
                ) : (attributes.length === 0) ? (
                    <Text c="blue" fw={700} ta="center" size="lg">Пока нет атрибутов</Text>
                ) : (filtered!.length === 0) ? (
                    <Text c="blue" fw={500} ta="center" size="lg">По вашему запросу ничего не найдено</Text>
                ) : (
                    <Table withTableBorder withRowBorders withColumnBorders styles={{
                        table: {fontSize: "20px"}
                    }} striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th ta="center">Название</Table.Th>
                                <Table.Th ta="center">Тип данных</Table.Th>
                                <Table.Th ta="center">Единица измерения</Table.Th>
                                <Table.Th ta="center">Действия</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {attributes.map(a => (
                                <Table.Tr key={a.id} ta="center">
                                    <Table.Td>{a.name}</Table.Td>
                                    <Table.Td>{a.type}</Table.Td>
                                    <Table.Td>{a.type === "ENUM" ? (a.enumValues?.join(", ") ?? "Нет") : (a.unit || "Нет")}</Table.Td>
                                    <Table.Td>
                                        <Group gap="md" justify="center">
                                            <ActionIcon color="green" size="xl" onClick={() => {
                                                setSelectedAttr(a);
                                                openUpdateAttrModal();
                                            }}>
                                                <IconPencil></IconPencil>
                                            </ActionIcon>
                                            <ActionIcon color="red" size="xl" onClick={() => {
                                                onDelete(a.id);
                                            }}>
                                                <IconTrash></IconTrash>
                                            </ActionIcon>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                )}
            </Stack>
            <AdminProductsMain categoryId={category.id}></AdminProductsMain>
            <AttributeCreateModal categoryId={id} opened={createModalOpened} onClose={closeCreateAttrModal}></AttributeCreateModal>
            {selectedAttr && (
                <AttributeUpdateModal attribute={selectedAttr} opened={updateModalOpened} onClose={closeUpdateAttrModal}></AttributeUpdateModal>
            )}
        </Stack>
    );
}