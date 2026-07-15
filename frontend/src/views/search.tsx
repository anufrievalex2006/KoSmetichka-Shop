import styles from "@/shared/styles/catalog.module.scss";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { ProductsSearchMain } from "@/widgets/search/ProductsSearchMain";
import { Box } from "@mantine/core";
import { Suspense } from "react";

export const ProductsSearchPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <Suspense>
                <ProductsSearchMain></ProductsSearchMain>
            </Suspense>
            <Footer></Footer>
        </Box>
    )
}