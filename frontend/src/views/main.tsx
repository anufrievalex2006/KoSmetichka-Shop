import { Main } from "@/widgets/main/main"
import { Box } from "@mantine/core"
import styles from "@/shared/styles/main.module.scss";
import { Header } from "@/widgets/Header";

export const MainPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <Main></Main>
        </Box>
    )
}