import styles from "@/shared/styles/auth.module.scss";
import { Footer } from "@/widgets/Footer";
import { ForgotPasswordMain } from "@/widgets/forgotPassword/ForgotPasswordMain";
import { Header } from "@/widgets/Header";
import { Box } from "@mantine/core";

export const ForgotPasswordPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <ForgotPasswordMain></ForgotPasswordMain>
            <Footer></Footer>
        </Box>
    )
}