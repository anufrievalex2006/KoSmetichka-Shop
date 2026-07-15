import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { useCategoryAttributes } from "@/features/admin/attributes";
import { useBrandsList } from "@/features/admin/brand";
import { useCategoryDetails } from "@/features/admin/categories";
import { useProductFilters } from "@/features/admin/productFilters";
import { useProductsList } from "@/features/admin/products";
import styles from "@/shared/styles/catalog.module.scss";
import { AttributeFilterField } from "@/widgets/admin/categoryDetails/products/AttributeFilterField";
import { Button, Group, Loader, NumberInput, Pagination, Select, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { CategoryProductCard } from "./CategoryProductCard";
import { AttributeFilterValue } from "@/domain";

interface Props {
    categoryId: string;
}

const repo = new CategoryRepo();
const bRepo = new BrandRepo();
const aRepo = new AttributeRepo();
const pRepo = new ProductRepo();

const SORT = [
    {label: "По названию", value: "name,asc"},
    {label: "Сначала дешевле", value: "price,asc"},
    {label: "Сначала дороже", value: "price,desc"}
];

export const CategoryCatalogMain = ({categoryId}: Props) => {
    const {category, isLoading} = useCategoryDetails(categoryId, repo);
    const {brands} = useBrandsList(bRepo);
    const {filters, setFilters} = useProductFilters();
    const {products, pagination, isLoading: areProdsLoading, isFetching, error} = useProductsList(categoryId, filters, pRepo);
    const {attributes} = useCategoryAttributes(categoryId, aRepo);

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
    return isLoading ? (
        <Group gap="md" justify="center">
            <Loader size="lg"></Loader>
            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
        </Group>
    ) : (!category) ? (
        <Text c="red" fw={700} ta="center" size="lg">Такой категории не существует</Text>
    ) : (
        <Stack flex={1} gap={45} p="xl">
            <Title order={1} classNames={{root: styles.pageTitle}}>Каталог товаров: Категория "{category.name}"</Title>
            <Stack classNames={{root: styles.wrap}}>
                <Stack gap="md" classNames={{root: styles.filtersDiv}}>
                    <Title order={2} classNames={{root: styles.filtersTitle}}>Поиск товаров</Title>
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
                        <Button ml="auto" w={250} classNames={{root: styles.submitBtn}}>Поиск</Button>
                    </Stack>
                </Stack>
                {areProdsLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : error ? (
                    <Text c="red" fw={700} ta="center">Не удалось загрузить товары</Text>
                ) : !products?.length? (
                    <Text c="blue" fw={500} ta="center" size="lg">Товары по вашему запросу не найдены</Text>
                ) : (
                    <SimpleGrid spacing="md" opacity={isFetching ? 0.6 : 1} style={{
                        transition: "opacity 0.15s",
                        pointerEvents: isFetching ? "none" : "auto"
                    }} cols={{base: 1, xs: 1, sm: 2, md: 3}}>
                        {products.map(p => (
                            <CategoryProductCard key={p.id} product={p}></CategoryProductCard>
                        ))}
                    </SimpleGrid>
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
    )
}