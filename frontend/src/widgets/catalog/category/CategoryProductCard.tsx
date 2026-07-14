import { CartRepo } from "@/data/repos/CartRepo";
import { ProductDto } from "@/domain";
import { useAddToCart, useCart, useDeleteCartPosition, useUpdateCartPosition } from "@/features/cart";
import styles from "@/shared/styles/catalog.module.scss";
import { ActionIcon, Box, Button, Card, Group, Loader, Text } from "@mantine/core";
import { IconMinus, IconPlus, IconShoppingCartPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
    product: ProductDto;
}

const repo = new CartRepo();

export const CategoryProductCard = ({product}: Props) => {
    const nav = useRouter();
    const {cart} = useCart(repo);
    const addToCart = useAddToCart(repo);
    const update = useUpdateCartPosition(repo), del = useDeleteCartPosition(repo);

    const pos = cart?.positions.find(p => p.product.id === product.id);
    const isPending = addToCart.isPending || update.isPending || del.isPending;
    const atStockLimit = (pos?.quantity ?? 0) >= product.quantity;

    const onPlus = () => {
        if (!pos) {
            addToCart.mutate({
                productId: product.id,
                quantity: 1
            });
        }
        else if (!atStockLimit) {
            update.mutate({
                id: pos.id,
                req: {
                    quantity: pos.quantity + 1
                }
            });
        }
    }
    const onMinus = () => {
        if (!pos) return;
        if (pos.quantity <= 1) {
            del.mutate(pos.id);
        }
        else {
            update.mutate({
                id: pos.id,
                req: {
                    quantity: pos.quantity - 1
                }
            });
        }
    }
    return (
        <Card padding="md" classNames={{root: styles.productCard}} onClick={() => nav.push(`/product/${product.id}`)}>
            <Box className={styles.productImgPlaceholder}>
                {product.photoUrl && (
                    <Image src={product.photoUrl} alt={product.name} fill style={{
                        objectFit: "contain"
                    }} sizes="(max-width: 768px) 50vw, 25vw"></Image>
                )}
            </Box>
            <Text classNames={{root: styles.productBrand}}>{product.brand.name}</Text>
            <Group justify="space-between">
                <Text classNames={{root: styles.productName}}>{product.name}</Text>
                <Text classNames={{root: styles.productPrice}}>{product.price} руб.</Text>
            </Group>
            {product.quantity === 0 ? (
                <Button disabled fullWidth mt="sm">Нет в наличии</Button>
            ) : !pos ? (
                <Button fullWidth mt="sm" loading={addToCart.isPending} leftSection={
                    <IconShoppingCartPlus size={18}></IconShoppingCartPlus>
                } onClick={(e) => {
                    e.stopPropagation();
                    onPlus();
                }} classNames={{root: styles.addToCartBtn}}>Добавить в корзину</Button>
            ) : (
                <Group justify="center" gap="sm" mt="sm" wrap="nowrap">
                    <ActionIcon size="lg" variant="outline" disabled={isPending} onClick={(e) => {
                        e.stopPropagation();
                        onMinus();
                    }}>
                        <IconMinus size={16}></IconMinus>
                    </ActionIcon>
                    {isPending ? (
                        <Loader size="sm"></Loader>
                    ) : (
                        <Text fw={600} miw={24} ta="center">{pos.quantity}</Text>
                    )}
                    <ActionIcon size="lg" variant="outline" disabled={isPending || atStockLimit} onClick={(e) => {
                        e.stopPropagation();
                        onPlus();
                    }}>
                        <IconPlus size={16}></IconPlus>
                    </ActionIcon>
                </Group>
            )}
        </Card>
    )
}