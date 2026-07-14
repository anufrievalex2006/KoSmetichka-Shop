import styles from "@/shared/styles/auth.module.scss";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { ResetPasswordMain } from "@/widgets/resetPassword/ResetPasswordMain";
import { Box } from "@mantine/core";
import { Suspense } from "react";

export const ResetPasswordPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <Suspense>
                <ResetPasswordMain></ResetPasswordMain>
            </Suspense>
            <Footer></Footer>
        </Box>
    )
}