import styles from "@/shared/styles/auth.module.scss";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { LoginMain } from "@/widgets/login/LoginMain";
import { Box } from "@mantine/core";

export const LoginPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <LoginMain></LoginMain>
            <Footer></Footer>
        </Box>
    )
}