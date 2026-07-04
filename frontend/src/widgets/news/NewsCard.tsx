import { ContentCardDto } from "@/domain";
import styles from "@/shared/styles/cards.module.scss";
import { formatDateTime } from "@/shared/utils/formatDateTime";
import { Badge, Box, Card, Text, Tooltip } from "@mantine/core";
import Link from "next/link";

interface Props {
    news: ContentCardDto;
}

export const NewsCard = ({news}: Props) => {
    return (
        <Link key={news.id} href={`/news/${news.id}`} className={styles.link}>
            <Card classNames={{root: styles.card}} padding="md">
                {news.photoUrl ? (
                    <Box className={styles.cardImg} style={{backgroundImage: `url(${news.photoUrl})`}}></Box>
                ) : (
                    <Box className={styles.cardImgPlaceholder}></Box>
                )}
                <Badge classNames={{root: styles.badgeNews}}>Новость</Badge>
                <Text classNames={{root: styles.cardTitle}}>{news.title}</Text>
                {news.description && (
                    <Text classNames={{root: styles.cardDescription}} lineClamp={2}>
                        {news.description}
                    </Text>
                )}
                <Text classNames={{root: styles.cardDate}}>
                    <Text component="span">{formatDateTime(news.createdAt)}</Text>
                    {news.createdAt !== news.updatedAt && (
                        <Tooltip label={`Изменено ${formatDateTime(news.updatedAt)}`} withArrow>
                            <Text component="span" classNames={{root: styles.editedMark}}>(изм.)</Text>
                        </Tooltip>
                    )}
                </Text>
            </Card>
        </Link>
    )
}