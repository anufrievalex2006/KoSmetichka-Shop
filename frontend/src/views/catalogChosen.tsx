import styles from "@/shared/styles/catalog.module.scss";
import { CategoryCatalogMain } from "@/widgets/catalog/category/CategoryCatalogMain";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Box } from "@mantine/core";

interface Props {
    categoryId: string;
}

export const CategoryCatalogPage = ({categoryId}: Props) => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <CategoryCatalogMain categoryId={categoryId}></CategoryCatalogMain>
            <Footer></Footer>
        </Box>
    )
}