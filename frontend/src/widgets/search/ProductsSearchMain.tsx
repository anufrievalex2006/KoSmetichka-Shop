import { BrandRepo } from "@/data/repos/BrandRepo";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { useBrandsList } from "@/features/admin/brand";
import { useProductFilters } from "@/features/admin/productFilters";
import { useProductsSearch } from "@/features/admin/products";
import styles from "@/shared/styles/catalog.module.scss";
import { Group, Loader, NumberInput, Pagination, Select, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { CategoryProductCard } from "../catalog/category/CategoryProductCard";

const repo = new ProductRepo();
const bRepo = new BrandRepo();

const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

const SORT_OPTIONS = [
    {label: "По названию", value: "name,asc"},
    {label: "Сначала дешевле", value: "price,asc"},
    {label: "Сначала дороже", value: "price,desc"},
];

export const ProductsSearchMain = () => {
    const {filters, setFilters} = useProductFilters();
    const {products, pagination, isLoading, isFetching, error} = useProductsSearch(filters, repo);
    const {brands} = useBrandsList(bRepo);
    return (
        <Stack flex={1} gap={45} p="xl">
            <Title order={1} classNames={{root: styles.pageTitle}}>
                {filters.search ? `Результаты поиска: "${filters.search}"` : "Поиск товаров"}
            </Title>
            <Stack classNames={{root: styles.wrap}}>
                <Stack gap="sm" classNames={{root: styles.filtersDiv}}>
                    <Select label="Производитель" classNames={classes} data={brands?.map(b => ({
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
                        <NumberInput label="Минимальная цена" min={0} onChange={
                            (x) => setFilters(prev => ({
                                ...prev,
                                minPrice: x === "" ? undefined : Number(x),
                                page: 0
                            }))
                        } value={filters.minPrice} classNames={classes}></NumberInput>
                        <NumberInput label="Максимальная цена" min={0} onChange={
                            (x) => setFilters(prev => ({
                                ...prev,
                                maxPrice: x === "" ? undefined : Number(x),
                                page: 0
                            }))
                        } value={filters.maxPrice} classNames={classes}></NumberInput>
                    </Group>
                    <Select label="Сортировать по" data={SORT_OPTIONS} value={
                        filters.sort?.[0] ?? "name,asc"
                    } onChange={
                        (x) => setFilters(prev => ({
                            ...prev,
                            sort: x ? [x] : undefined,
                            page: 0
                        }))
                    } classNames={classes}></Select>
                </Stack>
                {!filters.search ? (
                    <Text c="dimmed" ta="center" mt="xl">Введите запрос в строке поиска</Text>
                ) : isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : error ? (
                    <Text c="red" fw={700} ta="center" size="lg">Произошла ошибка при загрузке товаров</Text>
                ) : !products?.length ? (
                    <Text c="blue" fw={700} ta="center" size="lg">По вашему запросу ничего не найдено</Text>
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
                {!isLoading && !error && (pagination.totalPages ?? 0) > 1 && (
                    <Pagination total={pagination.totalPages!} value={(pagination.page ?? 0) + 1} onChange={
                        (p) => setFilters(prev => ({
                            ...prev,
                            page: p - 1
                        }))
                    }></Pagination>
                )}
            </Stack>
        </Stack>
    )
}