import styles from "@/shared/styles/admin/appeals.module.scss";
import { AdminAppealsMain } from "@/widgets/admin/appeals/AdminAppealsMain";
import { Box } from "@mantine/core";

export const AdminAppealsPage = () => {
    return (
        <Box className={styles.container}>
            <AdminAppealsMain></AdminAppealsMain>
        </Box>
    )
}