import styles from "@/shared/styles/profile.module.scss";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { ProfileMain } from "@/widgets/profile/ProfileMain";
import { Box } from "@mantine/core";

export const ProfilePage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <ProfileMain></ProfileMain>
            <Footer></Footer>
        </Box>
    )
}