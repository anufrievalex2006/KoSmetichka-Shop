import { ProductDto } from "@/domain";
import styles from "@/shared/styles/catalog.module.scss";
import { Box, Card, Text } from "@mantine/core";

interface Props {
    product: ProductDto;
}

export const CategoryProductCard = ({product}: Props) => {
    return (
        <Card padding="md" classNames={{root: styles.productCard}}>
            <Box className={styles.productImgPlaceholder}></Box>
            <Text classNames={{root: styles.productBrand}}>{product.brand.name}</Text>
            <Text classNames={{root: styles.productName}}>{product.name}</Text>
            <Text classNames={{root: styles.productPrice}}>{product.price} руб.</Text>
        </Card>
    )
}