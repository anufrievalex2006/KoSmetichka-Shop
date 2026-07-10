import { ProductDto } from "@/domain"
import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import styles from "@/shared/styles/admin/products.module.scss";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { useDeleteProduct } from "@/features/admin/products";

interface Props {
    product: ProductDto;
}

const repo = new ProductRepo();

export const ProductCard = ({product}: Props) => {
    const nav = useRouter();
    const del = useDeleteProduct(repo);
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этот товар?"))
            del.mutate(id);
    }
    return (
        <Group wrap="nowrap" classNames={{root: styles.card}} onClick={() => nav.push(`/admin/products/${product.id}`)}>
            <Title classNames={{root: styles.cardTitle}}>{product.name}</Title>
            <Stack gap={8}>
                <ActionIcon size={40} color="green" onClick={(e) => {
                    e.stopPropagation();
                    nav.push(`/admin/products/${product.id}/update`);
                }}>
                    <IconPencil size={22}></IconPencil>
                </ActionIcon>
                <ActionIcon size={40} color="red" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(product.id);
                }}>
                    <IconTrash size={22}></IconTrash>
                </ActionIcon>
            </Stack>
        </Group>
    )
}