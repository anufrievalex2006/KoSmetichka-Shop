import { ContentCardDto } from "@/domain";
import styles from "@/shared/styles/admin/promos.module.scss";
import { Group, Title, Stack, ActionIcon, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { useDeleteContentCard } from "@/features/contentCard";
import dayjs from "dayjs";
import { PromotionUpdateModal } from "./PromotionUpdateModal";
import { PromotionModal } from "./PromotionDetailsModal";

interface Props {
    promo: ContentCardDto;
}

const repo = new ContentCardRepo();

export const PromotionCard = ({promo}: Props) => {
    const [updatePromoOpened, {
        open: openUpdatePromoModal,
        close: closeUpdatePromoModal
    }] = useDisclosure(false);
    const [promoOpened, {
        open: openPromoModal,
        close: closePromoModal
    }] = useDisclosure(false);
    const del = useDeleteContentCard(repo);
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту акцию?"))
            del.mutate(id);
    }
    const formatDate = (date: string | null) => {   
        return dayjs(date).add(7, "hours").format("DD.MM.YYYY в HH:mm");
    }
    return (
        <>
            <Group classNames={{root: styles.card}} onClick={openPromoModal}>
                <Stack gap="md" flex={1} miw={0}>
                    <Title order={3} classNames={{root: styles.cardTitle}}>{promo.title}</Title>
                    <Stack gap={4}>
                        <Text classNames={{root: styles.cardDateInfo}}>Создано {formatDate(promo.createdAt)}</Text>
                        {promo.createdAt !== promo.updatedAt && (
                            <Text classNames={{root: styles.cardUpdatedAt}}>Обновлено {formatDate(promo.updatedAt)}</Text>
                        )}
                    </Stack>
                </Stack>
                <Stack gap={8}>
                    <ActionIcon size={40} color="green" onClick={(e) => {
                        e.stopPropagation();
                        openUpdatePromoModal();
                    }}>
                        <IconPencil size={22}></IconPencil>
                    </ActionIcon>
                    <ActionIcon size={40} color="red" onClick={(e) => {
                        e.stopPropagation();
                        onDelete(promo.id);
                    }}>
                        <IconTrash size={22}></IconTrash>
                    </ActionIcon>
                </Stack>
            </Group>
            <PromotionModal opened={promoOpened} onClose={closePromoModal} id={promo.id}></PromotionModal>
            <PromotionUpdateModal opened={updatePromoOpened} onClose={closeUpdatePromoModal} promo={promo}></PromotionUpdateModal>
        </>
    )
}