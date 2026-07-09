import styles from "@/shared/styles/admin/promos.module.scss";
import { AdminPromotionsMain } from "@/widgets/admin/promotions/AdminPromotionsMain";
import { Box } from "@mantine/core";

export const AdminPromotionsPage = () => {
    return (
        <Box className={styles.container}>
            <AdminPromotionsMain></AdminPromotionsMain>
        </Box>
    )
}