import { ContentCardDto } from "@/domain";
import styles from "@/shared/styles/admin/news.module.scss";
import { Group, Title, Stack, ActionIcon, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { BrandModal } from "../brands/BrandDetailsModal";
import { BrandUpdateModal } from "../brands/BrandUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { useDeleteContentCard } from "@/features/contentCard";
import dayjs from "dayjs";
import { NewsUpdateModal } from "./NewsUpdateModal";
import { NewsModal } from "./NewsDetailsModal";

interface Props {
    news: ContentCardDto;
}

const repo = new ContentCardRepo();

export const NewsCard = ({news}: Props) => {
    const [updateNewsOpened, {
        open: openUpdateNewsModal,
        close: closeUpdateNewsModal
    }] = useDisclosure(false);
    const [newsOpened, {
        open: openNewsModal,
        close: closeNewsModal
    }] = useDisclosure(false);
    const del = useDeleteContentCard(repo);
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту новость?"))
            del.mutate(id);
    }
    const formatDate = (date: string | null) => {   
        return dayjs(date).add(7, "hours").format("DD.MM.YYYY в HH:mm");
    }
    return (
        <>
            <Group classNames={{root: styles.card}} onClick={openNewsModal}>
                <Stack gap="md" flex={1} miw={0}>
                    <Title order={3} classNames={{root: styles.cardTitle}}>{news.title}</Title>
                    <Stack gap={4}>
                        <Text classNames={{root: styles.cardDateInfo}}>Создано {formatDate(news.createdAt)}</Text>
                        {news.createdAt !== news.updatedAt && (
                            <Text classNames={{root: styles.cardUpdatedAt}}>Обновлено {formatDate(news.updatedAt)}</Text>
                        )}
                    </Stack>
                </Stack>
                <Stack gap={8}>
                    <ActionIcon size={40} color="green" onClick={(e) => {
                        e.stopPropagation();
                        openUpdateNewsModal();
                    }}>
                        <IconPencil size={22}></IconPencil>
                    </ActionIcon>
                    <ActionIcon size={40} color="red" onClick={(e) => {
                        e.stopPropagation();
                        onDelete(news.id);
                    }}>
                        <IconTrash size={22}></IconTrash>
                    </ActionIcon>
                </Stack>
            </Group>
            <NewsModal opened={newsOpened} onClose={closeNewsModal} id={news.id}></NewsModal>
            <NewsUpdateModal opened={updateNewsOpened} onClose={closeUpdateNewsModal} news={news}></NewsUpdateModal>
        </>
    )
}