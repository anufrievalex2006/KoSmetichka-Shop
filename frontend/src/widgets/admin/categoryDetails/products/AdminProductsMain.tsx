import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { useCategoryAttributes } from "@/features/admin/attributes";
import { useBrandsList } from "@/features/admin/brand";
import { useProductFilters } from "@/features/admin/productFilters";
import { useProductsList } from "@/features/admin/products";
import styles from "@/shared/styles/admin/products.module.scss";
import { Stack, Title, Button, TextInput, Group, Select, NumberInput, Loader, Text, Pagination } from "@mantine/core";
import { IconFilter2Search, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { AttributeFilterField } from "./AttributeFilterField";
import { ProductCard } from "./ProductCard";
import { ProductCreateModal } from "./ProductCreateModal";
import { useDisclosure } from "@mantine/hooks";
import { AttributeFilterValue } from "@/domain";

interface Props {
    categoryId: string;
}

const repo = new ProductRepo();
const bRepo = new BrandRepo();
const aRepo = new AttributeRepo();

const SORT = [
    {label: "По названию", value: "name,asc"},
    {label: "Сначала дешевле", value: "price,asc"},
    {label: "Сначала дороже", value: "price,desc"}
];

export const AdminProductsMain = ({categoryId}: Props) => {
    const [filtersActive, setFiltersActive] = useState(false);
    const {filters, setFilters} = useProductFilters();
    const {products, pagination, isLoading, isFetching, error} = useProductsList(categoryId, filters, repo);
    const {brands} = useBrandsList(bRepo);
    const {attributes} = useCategoryAttributes(categoryId, aRepo);
    const [createModalOpened, {
        open: openCreateProductModal,
        close: closeCreateProductModal
    }] = useDisclosure(false);
    
    const setAttrFilter = (attrId: string, value: AttributeFilterValue | undefined) => {
        const next = {...filters.attributes};
        if (value)
            next[attrId] = value;
        else
            delete next[attrId];

        setFilters(prev => ({
            ...prev,
            attributes: next,
            page: 0
        }));
    }

    return (
        <Stack mt={45} gap="lg">
            <Title order={2} classNames={{root: styles.pageTitle2}}>Товары этой категории</Title>
            <Stack gap="lg">
                <Button variant="outline" classNames={{
                    root: styles.addBtn
                }} leftSection={
                    <IconPlus size={18}></IconPlus>
                } onClick={openCreateProductModal}>Добавить товар</Button>
                <Stack gap="md">
                    <Group gap="md">
                        <TextInput flex={1} classNames={{
                            input: styles.fieldInput2
                        }} leftSection={
                            <IconSearch size={18}></IconSearch>
                        } placeholder="Найти по названию" onChange={
                            (e) => setFilters(prev => ({
                                ...prev,
                                search: e.currentTarget.value,
                                page: 0
                            }))
                        }></TextInput>
                        <Button variant={filtersActive ? "outline" : "filled"} classNames={{
                            root: filtersActive ? styles.cancelBtn : styles.submitBtn
                        }} onClick={() => setFiltersActive(!filtersActive)} leftSection={
                            <IconFilter2Search size={18}></IconFilter2Search>
                        }>Фильтры</Button>
                    </Group>
                    {filtersActive && (
                        <Stack gap="sm">
                            <Select label="Производитель" classNames={{
                                root: styles.field,
                                input: styles.fieldInput,
                                label: styles.fieldInputLabel,
                                error: styles.fieldInputError
                            }} data={brands?.map(b => ({
                                label: b.name,
                                value: b.id
                            })) ?? []} value={filters.brandId ?? null} onChange={
                                (x) => setFilters(prev => ({
                                    ...prev,
                                    brandId: x ?? undefined,
                                    page: 0
                                }))
                            }></Select>
                            <Group grow gap="sm">
                                <NumberInput label="Минимальная цена" classNames={{
                                    root: styles.field,
                                    input: styles.fieldInput,
                                    label: styles.fieldInputLabel,
                                    error: styles.fieldInputError
                                }} value={filters.minPrice} onChange={
                                    (x) => setFilters(prev => ({
                                        ...prev,
                                        minPrice: x === "" ? undefined : Number(x),
                                        page: 0
                                    }))
                                }></NumberInput>
                                <NumberInput label="Максимальная цена" classNames={{
                                    root: styles.field,
                                    input: styles.fieldInput,
                                    label: styles.fieldInputLabel,
                                    error: styles.fieldInputError
                                }} value={filters.maxPrice} onChange={
                                    (x) => setFilters(prev => ({
                                        ...prev,
                                        maxPrice: x === "" ? undefined : Number(x),
                                        page: 0
                                    }))
                                }></NumberInput>
                            </Group>
                            <Group grow gap="sm">
                                <NumberInput label="Элементов на странице" classNames={{
                                    root: styles.field,
                                    input: styles.fieldInput,
                                    label: styles.fieldInputLabel,
                                    error: styles.fieldInputError
                                }} value={filters.size} onChange={
                                    (x) => setFilters(prev => ({
                                        ...prev,
                                        size: x === "" ? undefined : Number(x),
                                        page: 0
                                    }))
                                }></NumberInput>
                                <Select label="Сортировать по" classNames={{
                                    root: styles.field,
                                    input: styles.fieldInput,
                                    label: styles.fieldInputLabel,
                                    error: styles.fieldInputError
                                }} data={SORT} value={filters.sort?.[0] ?? "name,asc"} onChange={
                                    (x) => setFilters(prev => ({
                                        ...prev,
                                        sort: x ? [x] : undefined,
                                        page: 0
                                    }))
                                }></Select>
                            </Group>
                            {attributes?.map(attr => (
                                <AttributeFilterField key={attr.id} attribute={attr} value={
                                    filters.attributes?.[attr.id]
                                } onChange={
                                    (x) => setAttrFilter(attr.id, x)
                                }></AttributeFilterField>
                            ))}
                        </Stack>
                    )}
                    {isLoading ? (
                        <Group gap="md" justify="center">
                            <Loader size="lg"></Loader>
                            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                        </Group>
                    ) : error ? (
                        <Text c="red" fw={700} ta="center">Не удалось загрузить товары</Text>
                    ) : !products?.length? (
                        <Text c="blue" fw={500} ta="center" size="lg">Товары по вашему запросу не найдены</Text>
                    ) : (
                        <Stack gap="md" opacity={isFetching ? 0.6 : 1} style={{
                            transition: "opacity 0.15s",
                            pointerEvents: isFetching ? "none" : "auto"
                        }}>
                            {products.map(p => (
                                <ProductCard key={p.id} product={p}></ProductCard>
                            ))}
                        </Stack>
                    )}
                    {!isLoading && !error && pagination.totalPages! > 1 && (
                        <Pagination total={pagination.totalPages!} value={
                            (pagination.page ?? 0) + 1
                        } onChange={
                            (page) => setFilters(prev => ({
                                ...prev,
                                page: page - 1
                            }))
                        }></Pagination>
                    )}
                </Stack>
            </Stack>
            <ProductCreateModal categoryId={categoryId} opened={createModalOpened} onClose={closeCreateProductModal}></ProductCreateModal>
        </Stack>
    )
}