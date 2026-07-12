import { CartRepo } from "@/data/repos/CartRepo";
import { useCart, useClearCart, useDeleteCartPosition, useUpdateCartPosition } from "@/features/cart";
import styles from "@/shared/styles/cart.module.scss";
import { ActionIcon, Button, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Image from "next/image";

const repo = new CartRepo();

export const CartMain = () => {
    const {cart, isLoading} = useCart(repo);
    const update = useUpdateCartPosition(repo), del = useDeleteCartPosition(repo);
    const clear = useClearCart(repo);
    return isLoading ? (
        <Group gap="md" justify="center">
            <Loader size="lg"></Loader>
            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
        </Group>
    ) : (
        <Stack flex={1} gap={45} p="xl">
            <Group justify="space-between">
                <Title order={1} classNames={{root: styles.pageTitle}}>Корзина</Title>
                {!!cart?.positions.length && (
                    <Button variant="outline" color="red" leftSection={
                        <IconTrash size={18}></IconTrash>
                    } loading={clear.isPending} onClick={() => clear.mutate()}>Очистить корзину</Button>
                )}
            </Group>
            {!cart?.positions.length ? (
                <Text c="blue" fw={700} ta="center" size="lg">Здесь пока пусто!</Text>
            ) : (
                <>
                    <Stack gap="md" classNames={{root: styles.wrap}}>
                        {cart.positions.map(p => {
                            const atStockLimit = p.quantity >= p.product.quantity;
                            return (
                                <Group key={p.id} justify="space-between" wrap="nowrap" classNames={{root: styles.cartRow}}>
                                    <Group wrap="nowrap" gap="md" flex={1}>
                                        <div className={styles.thumb}>
                                            {p.product.photoUrl && (
                                                <Image src={p.product.photoUrl} alt={p.product.name} fill style={{
                                                    objectFit: "contain"
                                                }} sizes="80px"></Image>
                                            )}
                                        </div>
                                        <Stack gap={8}>
                                            <Text classNames={{root: styles.entryValue}} fw={600}>{p.product.name}</Text>
                                            <Text classNames={{root: styles.entryTitle}}>{p.product.brand.name}</Text>
                                        </Stack>
                                    </Group>
                                    <Group gap="sm" wrap="nowrap">
                                        <ActionIcon size="lg" variant="outline" disabled={
                                            update.isPending || del.isPending
                                        } onClick={() => p.quantity <= 1 ? del.mutate(p.id) : update.mutate({
                                            id: p.id,
                                            req: {
                                                quantity: p.quantity - 1
                                            }
                                        })}>
                                            <IconMinus size={16}></IconMinus>
                                        </ActionIcon>
                                        <Text classNames={{root: styles.entryValue}} ta="center">{p.quantity}</Text>
                                        <ActionIcon size="lg" variant="outline" disabled={
                                            update.isPending || del.isPending
                                        } onClick={() => update.mutate({
                                            id: p.id,
                                            req: {
                                                quantity: p.quantity + 1
                                            }
                                        })}>
                                            <IconPlus size={16}></IconPlus>
                                        </ActionIcon>
                                    </Group>
                                    <Text classNames={{root: styles.posPrice}}>{p.price * p.quantity} руб.</Text>
                                    <ActionIcon size="lg" color="red" variant="subtle" loading={
                                        del.isPending
                                    } onClick={() => del.mutate(p.id)}>
                                        <IconTrash size={18}></IconTrash>
                                    </ActionIcon>
                                </Group>
                            );
                        })}
                    </Stack>
                    <Divider></Divider>
                    <Group justify="flex-end">
                        <Title order={2} classNames={{root: styles.totalPrice}}>
                            Итого: <span>{cart.total}</span> руб.
                        </Title>
                    </Group>
                </>
            )}
        </Stack>
    )
}