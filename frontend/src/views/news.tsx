import { Footer } from "@/widgets/Footer"
import { Header } from "@/widgets/Header"
import { Box } from "@mantine/core"
import styles from "@/shared/styles/cards.module.scss";
import { NewsMain } from "@/widgets/news/NewsMain";

export const NewsPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <NewsMain></NewsMain>
            <Footer></Footer>
        </Box>
    )
}