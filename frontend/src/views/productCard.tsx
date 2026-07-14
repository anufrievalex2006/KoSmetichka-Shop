import styles from "@/shared/styles/product.module.scss";
import { ProductCardMain } from "@/widgets/catalog/product/ProductCardMain";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Box } from "@mantine/core";

interface Props {
    id: string;
}

export const ProductCardPage = ({id}: Props) => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <ProductCardMain id={id}></ProductCardMain>
            <Footer></Footer>
        </Box>
    )
}