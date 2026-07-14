import { Box } from "@mantine/core"
import styles from "@/shared/styles/cards.module.scss";
import { Header } from "@/widgets/Header";
import { PromotionsMain } from "@/widgets/promos/PromotionsMain";
import { Footer } from "@/widgets/Footer";

export const PromosPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <PromotionsMain></PromotionsMain>
            <Footer></Footer>
        </Box>
    )
}