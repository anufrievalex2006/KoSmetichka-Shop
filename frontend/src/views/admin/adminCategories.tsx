import styles from "@/shared/styles/admin/categories.module.scss";
import { AdminCategoriesMain } from "@/widgets/admin/categories/AdminCategoriesMain";
import { Box } from "@mantine/core";

export const AdminCategoriesPage = () => {
    return (
        <Box className={styles.container}>
            <AdminCategoriesMain></AdminCategoriesMain>
        </Box>
    )
}