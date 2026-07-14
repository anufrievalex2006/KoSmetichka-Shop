import { CategoryDto } from "@/domain";
import styles from "@/shared/styles/admin/categories.module.scss";
import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { CategoryUpdateModal } from "./CategoryUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteCategory } from "@/features/admin/categories";
import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { useRouter } from "next/navigation";

interface Props {
    category: CategoryDto;
}

const repo = new CategoryRepo();

export const CategoryCard = ({category}: Props) => {
    const nav = useRouter();
    const del = useDeleteCategory(repo);
    const [updateModalOpened, {
        open: openUpdateCategoryModal,
        close: closeUpdateCategoryModal
    }] = useDisclosure(false);
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту категорию?"))
            del.mutate(id);
    }
    return (
        <>
            <Group classNames={{root: styles.card}} wrap="nowrap" onClick={() => nav.push(`/admin/categories/${category.id}`)}>
                <Title order={2} classNames={{root: styles.cardTitle}}>{category.name}</Title>
                <Stack gap={8}>
                    <ActionIcon size={40} color="green" onClick={(e) => {
                        e.stopPropagation();
                        openUpdateCategoryModal();
                    }}>
                        <IconPencil size={22}></IconPencil>
                    </ActionIcon>
                    <ActionIcon size={40} color="red" onClick={(e) => {
                        e.stopPropagation();
                        onDelete(category.id);
                    }}>
                        <IconTrash size={22}></IconTrash>
                    </ActionIcon>
                </Stack>
            </Group>
            <CategoryUpdateModal category={category} opened={updateModalOpened} onClose={closeUpdateCategoryModal}></CategoryUpdateModal>
        </>
    )
}