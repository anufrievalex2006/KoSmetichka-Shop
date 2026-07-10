import { Divider, Group, Loader, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/admin/products.module.scss";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { useProductDetails } from "@/features/admin/products";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { useBrandsList } from "@/features/admin/brand";
import { useCategoryAttributes } from "@/features/admin/attributes";
import { Fragment } from "react/jsx-runtime";

interface Props {
    id: string;
}

const repo = new ProductRepo();

export const AdminProductDetailsMain = ({id}: Props) => {
    const {product, isLoading} = useProductDetails(id, repo);
    return isLoading ? (
        <Group gap="md" justify="center">
            <Loader size="lg"></Loader>
            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
        </Group>
    ) : !product ? (
        <Text c="red" fw={700} ta="center" size="lg">Такого товара не существует</Text>
    ) : (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Информация о товаре</Title>
            <Stack flex={1} p="xl" classNames={{root: styles.card}}>
                <Title order={2} fw={700} classNames={{root: styles.cardTitle}}>{product.name}</Title>
                <Divider size={4}></Divider>
                <Stack gap={8}>
                    <Group grow>
                        <Stack gap={8}>
                            <Text classNames={{root: styles.entryTitle}}>Категория товара</Text>
                            <Text fw={700} classNames={{root: styles.entryValue}}>{product.category.name}</Text>
                        </Stack>
                        <Stack gap={8}>
                            <Text classNames={{root: styles.entryTitle}}>Производитель</Text>
                            <Text classNames={{root: styles.entryValue}}>{product.brand.name}</Text>
                        </Stack>
                    </Group>
                    <Divider></Divider>
                    <Stack gap={8}>
                        <Text classNames={{root: styles.entryTitle}}>Артикул</Text>
                        <Text classNames={{root: styles.entryValue}}>{product.article}</Text>
                    </Stack>
                    <Divider></Divider>
                    <Stack gap={8}>
                        <Text classNames={{root: styles.entryTitle}}>Номер штрих-кода</Text>
                        <Text classNames={{root: styles.entryValue}}>{product.barCodeNumber ?? "Отсутствует"}</Text>
                    </Stack>
                    <Divider></Divider>
                    <Group grow>
                        <Stack gap={8}>
                            <Text classNames={{root: styles.entryTitle}}>Количество в наличии</Text>
                            <Text classNames={{root: styles.entryValue}}>{product.quantity} шт.</Text>
                        </Stack>
                        <Stack gap={8}>
                            <Text classNames={{root: styles.entryTitle}}>Цена товара</Text>
                            <Text classNames={{root: styles.entryValue}}>{product.price} руб.</Text>
                        </Stack>
                    </Group>
                    <Divider></Divider>
                    <Stack gap={8}>
                        <Text classNames={{root: styles.entryTitle}}>Описание товара</Text>
                        <Text classNames={{root: styles.entryValue}}>{product.description ?? "Отсутствует"}</Text>
                    </Stack>
                    {product.attributeValues.map(a => (
                        <Fragment key={a.id}>
                            <Divider></Divider>
                            <Stack gap={8}>
                                <Text classNames={{root: styles.entryTitle}}>{a.attribute.name}</Text>
                                <Text classNames={{root: styles.entryValue}}>{a.value}{` ${a.attribute.unit}`}</Text>
                            </Stack>
                        </Fragment>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    )
}