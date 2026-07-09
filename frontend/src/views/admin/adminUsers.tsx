import styles from "@/shared/styles/admin/users.module.scss";
import { AdminUsersMain } from "@/widgets/admin/users/AdminUsersMain";
import { Box } from "@mantine/core";

export const AdminUsersPage = () => {
    return (
        <Box className={styles.container}>
            <AdminUsersMain></AdminUsersMain>
        </Box>
    )
}