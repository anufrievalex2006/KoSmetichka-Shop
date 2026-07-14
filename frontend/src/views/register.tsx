import styles from "@/shared/styles/auth.module.scss";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { RegisterMain } from "@/widgets/register/RegisterMain";
import { Box } from "@mantine/core";

export const RegisterPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <RegisterMain></RegisterMain>
            <Footer></Footer>
        </Box>
    )
}