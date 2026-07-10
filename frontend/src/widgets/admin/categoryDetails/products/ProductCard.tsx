import { ProductDto } from "@/domain"
import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import styles from "@/shared/styles/admin/products.module.scss";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface Props {
    product: ProductDto;
}

export const ProductCard = ({product}: Props) => {
    const nav = useRouter();
    return (
        <Group wrap="nowrap" classNames={{root: styles.card}} onClick={() => nav.push(`/admin/products/${product.id}`)}>
            <Title classNames={{root: styles.cardTitle}}>{product.name}</Title>
            <Stack gap={8}>
                <ActionIcon size={40} color="green" onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <IconPencil size={22}></IconPencil>
                </ActionIcon>
                <ActionIcon size={40} color="red" onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <IconTrash size={22}></IconTrash>
                </ActionIcon>
            </Stack>
        </Group>
    )
}