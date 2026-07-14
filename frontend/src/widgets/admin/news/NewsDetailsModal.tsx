import { Group, Loader, Image, Modal, Text, Stack, Title, Divider } from "@mantine/core";
import noImage from "@/assets/no-image.png";
import styles from "@/shared/styles/admin/news.module.scss";
import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { useContentCardDetails } from "@/features/contentCard";
import dayjs from "dayjs";

interface Props {
    id: string;
    opened: boolean;
    onClose: () => void;
}

const repo = new ContentCardRepo();

export const NewsModal = ({id, opened, onClose}: Props) => {
    const {card, isLoading} = useContentCardDetails(id, repo);
    const formatDate = (date: string | null) => {
        return dayjs(date).add(7, "hours").format("DD.MM.YYYY в HH:mm");
    }
    return (
        <Modal title="Информация о новости" opened={opened} size={1000} onClose={onClose} centered>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (!card) ? (
                <Text c="red" fw={700} ta="center">Новость не найдена</Text>
            ) : (card.type !== "NEWS") ? (
                <Text c="red" fw={700} ta="center">Предоставленная карточка не является новостью</Text>
            ) : (
                <Group wrap="nowrap" gap="lg" align="flex-start">
                    <Image alt="Логотип новости информация" className={
                        styles.logo
                    } src={card.photoUrl || noImage}></Image>
                    <Stack flex={1} gap="lg">
                        <Title order={2} classNames={{root: styles.newsName}}>{card.title}</Title>
                        <Divider flex={1}></Divider>
                        <Text classNames={{root: styles.newsDescr}}>{card.description}</Text>
                        <Stack gap={8}>
                            <Text ta="right" classNames={{root: styles.cardDate}}>Дата создания: {formatDate(card.createdAt)}</Text>
                            {card.updatedAt !== card.createdAt && (
                                <Text ta="right" classNames={{root: styles.cardDateInfo}}>Обновлено: {formatDate(card.updatedAt)}</Text>
                            )}
                        </Stack>
                    </Stack>
                </Group>
            )}
        </Modal>
    )
}