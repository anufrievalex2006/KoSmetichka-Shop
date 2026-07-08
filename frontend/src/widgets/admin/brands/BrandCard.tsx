import { BrandDto } from "@/domain";
import styles from "@/shared/styles/admin/brand.module.scss";
import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { BrandUpdateModal } from "./BrandUpdateModal";
import { BrandModal } from "./BrandDetailsModal";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { useDeleteBrand } from "@/features/admin/brand";

interface Props {
    brand: BrandDto;
}

const repo = new BrandRepo();

export const BrandCard = ({brand}: Props) => {
    const [updateModalOpened, {
        open: openUpdateBrandModal,
        close: closeUpdateBrandModal
    }] = useDisclosure(false);
    const [infoOpened, {
        open: openInfoModal,
        close: closeInfoModal
    }] = useDisclosure(false);
    const del = useDeleteBrand(repo);
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этого производителя?"))
            del.mutate(id);
    }
    return (
        <>
            <Group classNames={{root: styles.card}} onClick={openInfoModal}>
                <Title order={3} classNames={{root: styles.cardTitle}}>{brand.name}</Title>
                <Stack gap={8}>
                    <ActionIcon size={40} color="green" onClick={(e) => {
                        e.stopPropagation();
                        openUpdateBrandModal();
                    }}>
                        <IconPencil size={22}></IconPencil>
                    </ActionIcon>
                    <ActionIcon size={40} color="red" onClick={(e) => {
                        e.stopPropagation();
                        onDelete(brand.id);
                    }}>
                        <IconTrash size={22}></IconTrash>
                    </ActionIcon>
                </Stack>
            </Group>
            <BrandModal opened={infoOpened} onClose={closeInfoModal} id={brand.id}></BrandModal>
            <BrandUpdateModal opened={updateModalOpened} onClose={closeUpdateBrandModal} brand={brand}></BrandUpdateModal>
        </>
    )
}