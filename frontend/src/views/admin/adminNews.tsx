import styles from "@/shared/styles/admin/news.module.scss";
import { AdminNewsMain } from "@/widgets/admin/news/AdminNewsMain";
import { Box } from "@mantine/core";

export const AdminNewsPage = () => {
    return (
        <Box className={styles.container}>
            <AdminNewsMain></AdminNewsMain>
        </Box>
    )
}