import { ProductRepo } from "@/data/repos/ProductRepo";
import { useProductDetails } from "@/features/admin/products";
import styles from "@/shared/styles/product.module.scss";
import { ActionIcon, Box, Button, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import noImage from "@/assets/no-image.png";
import Image from "next/image";
import { IconMinus, IconPlus, IconShoppingCartPlus } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";
import { CartRepo } from "@/data/repos/CartRepo";
import { useCart, useAddToCart, useUpdateCartPosition, useDeleteCartPosition } from "@/features/cart";

interface Props {
    id: string;
}

const repo = new ProductRepo();
const cRepo = new CartRepo();

export const ProductCardMain = ({id}: Props) => {
    const {product, isLoading} = useProductDetails(id, repo);
    const {cart} = useCart(cRepo);
    const addToCart = useAddToCart(cRepo);
    const update = useUpdateCartPosition(cRepo), del = useDeleteCartPosition(cRepo);

    const pos = cart?.positions.find(p => p.product.id === id);
    const isPending = addToCart.isPending || update.isPending || del.isPending;
    const atStockLimit = product ? (pos?.quantity ?? 0) >= product.quantity : false;

    const onPlus = () => {
        if (!product) return;
        if (!pos) {
            addToCart.mutate({productId: product.id, quantity: 1});
        } else if (!atStockLimit) {
            update.mutate({id: pos.id, req: {quantity: pos.quantity + 1}});
        }
    };
    const onMinus = () => {
        if (!pos) return;
        if (pos.quantity <= 1) {
            del.mutate(pos.id);
        } else {
            update.mutate({id: pos.id, req: {quantity: pos.quantity - 1}});
        }
    };

    return isLoading ? (
        <Group gap="md" justify="center">
            <Loader size="lg"></Loader>
            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
        </Group>
    ) : !product ? (
        <Text c="red" fw={700} ta="center" size="lg">Такого товара не существует</Text>
    ) : (
        <Stack flex={1} gap={45} p="xl">
            <Title order={1} classNames={{root: styles.pageTitle}}>Информация о товаре</Title>
            <Group gap="xl" classNames={{root: styles.wrap}}>
                <Box className={styles.productImgPlaceholder}>
                    {product.photoUrl && (
                        <Image src={product.photoUrl} alt={product.name} fill style={{
                            objectFit: "contain"
                        }} sizes="(max-width: 768px) 50vw, 25vw"></Image>
                    )}
                </Box>
                <Stack gap="xl" flex={1}>
                    <Stack flex={1} gap="lg" classNames={{root: styles.productInfo}}>
                        <Group justify="space-between">
                            <Title order={2} classNames={{root: styles.productName}}>{product.name}</Title>
                            <Text classNames={{root: styles.productPrice}}>{product.price} руб.</Text>
                        </Group>
                        {product.quantity === 0 ? (
                        <Button disabled fullWidth variant="outline" classNames={{root: `${styles.noInStockBtn}`}}>Товара нет в наличии</Button>
                    ) : !pos ? (
                        <Button fullWidth loading={addToCart.isPending} leftSection={
                            <IconShoppingCartPlus size={18}></IconShoppingCartPlus>
                        } onClick={onPlus} classNames={{root: styles.addToCartBtn}}>Добавить в корзину</Button>
                    ) : (
                        <Group justify="center" gap="sm" wrap="nowrap">
                            <ActionIcon size={40} variant="outline" disabled={isPending} onClick={onMinus}>
                                <IconMinus size={22}></IconMinus>
                            </ActionIcon>
                            {isPending ? <Loader size="sm"></Loader> : <Text fw={600} miw={24} ta="center">{pos.quantity}</Text>}
                            <ActionIcon size={40} variant="outline" disabled={isPending || atStockLimit} onClick={onPlus}>
                                <IconPlus size={22}></IconPlus>
                            </ActionIcon>
                        </Group>
                    )}
                    </Stack>
                    <Stack flex={1} gap="xs" classNames={{root: styles.productInfo}}>
                        <Stack gap={8}>
                            <Text classNames={{root: styles.entryTitle}}>Описание</Text>
                            <Text classNames={{root: styles.entryValue}}>{product.description ?? "Нет"}</Text>
                        </Stack>
                        <Divider></Divider>
                        <Group grow>
                            <Stack gap={8}>
                                <Text classNames={{root: styles.entryTitle}}>Производитель</Text>
                                <Text classNames={{root: styles.entryValue}}>{product.brand.name}</Text>
                            </Stack>
                            <Stack gap={8}>
                                <Text classNames={{root: styles.entryTitle}}>Категория товаров</Text>
                                <Text classNames={{root: styles.entryValue}}>{product.category.name}</Text>
                            </Stack>
                        </Group>
                        <Divider></Divider>
                        <Stack gap={8}>
                            <Text classNames={{root: styles.entryTitle}}>В наличии на складе, шт.</Text>
                            <Text classNames={{root: styles.entryValue}}>{product.quantity}</Text>
                        </Stack>
                        {product.attributeValues.map(av => (
                            <Fragment key={av.id}>
                                <Divider></Divider>
                                <Stack gap={8}>
                                    <Text classNames={{root: styles.entryTitle}}>{av.attribute.name}</Text>
                                    <Text classNames={{root: styles.entryValue}}>{av.value}{av.attribute.unit && ` ${av.attribute.unit}`}</Text>
                                </Stack>
                            </Fragment>
                        ))}
                    </Stack>
                </Stack>
            </Group>
        </Stack>
    )
}