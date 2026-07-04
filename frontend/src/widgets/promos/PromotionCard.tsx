import { ContentCardDto } from "@/domain";
import styles from "@/shared/styles/cards.module.scss";
import { formatDateTime } from "@/shared/utils/formatDateTime";
import { Card, Box, Badge, Tooltip, Text } from "@mantine/core";
import Link from "next/link";

interface Props {
    promo: ContentCardDto;
}

export const PromotionCard = ({promo}: Props) => {
    return (
        <Link key={promo.id} href={`/promotions/${promo.id}`} className={styles.link}>
            <Card classNames={{root: styles.card}} padding="md">
                {promo.photoUrl ? (
                    <Box className={styles.cardImg} style={{backgroundImage: `url(${promo.photoUrl})`}}></Box>
                ) : (
                    <Box className={styles.cardImgPlaceholder}></Box>
                )}
                <Badge classNames={{root: styles.badgePromo}}>Акция</Badge>
                <Text classNames={{root: styles.cardTitle}}>{promo.title}</Text>
                {promo.description && (
                    <Text classNames={{root: styles.cardDescription}} lineClamp={2}>
                        {promo.description}
                    </Text>
                )}
                <Text classNames={{root: styles.cardDate}}>
                    <Text component="span">{formatDateTime(promo.createdAt)}</Text>
                    {promo.createdAt !== promo.updatedAt && (
                        <Tooltip label={`Изменено ${formatDateTime(promo.updatedAt)}`} withArrow>
                            <Text component="span" classNames={{root: styles.editedMark}}>(изм.)</Text>
                        </Tooltip>
                    )}
                </Text>
            </Card>
        </Link>
    )
}