import styles from "@/shared/styles/catalog.module.scss";
import { CatalogMain } from "@/widgets/catalog/CatalogMain";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Box } from "@mantine/core";

export const CatalogPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <CatalogMain></CatalogMain>
            <Footer></Footer>
        </Box>
    )
}