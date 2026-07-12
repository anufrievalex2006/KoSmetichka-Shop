import { ProductDto } from "@/domain";
import styles from "@/shared/styles/catalog.module.scss";
import { Box, Card, Group, Text } from "@mantine/core";
import Image from "next/image";

interface Props {
    product: ProductDto;
}

export const CategoryProductCard = ({product}: Props) => {
    return (
        <Card padding="md" classNames={{root: styles.productCard}}>
            <Box className={styles.productImgPlaceholder}>
                {product.photoUrl && (
                    <Image src={product.photoUrl} alt={product.name} fill style={{
                        objectFit: "contain"
                    }} sizes="(max-width: 768px) 50vw, 25vw"></Image>
                )}
            </Box>
            <Text classNames={{root: styles.productBrand}}>{product.brand.name}</Text>
            <Group justify="space-between">
                <Text classNames={{root: styles.productName}}>{product.name}</Text>
                <Text classNames={{root: styles.productPrice}}>{product.price} руб.</Text>
            </Group>
        </Card>
    )
}