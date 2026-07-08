import styles from "@/shared/styles/admin/main.module.scss";
import { AdminMain } from "@/widgets/admin/main/AdminMain";
import { Box } from "@mantine/core";

export const AdminMainPage = () => {
    return (
        <Box className={styles.container}>
            <AdminMain></AdminMain>
        </Box>
    )
}