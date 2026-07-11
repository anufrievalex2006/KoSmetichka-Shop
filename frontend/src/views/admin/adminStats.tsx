import styles from "@/shared/styles/admin/stats.module.scss";
import { AdminStatisticsMain } from "@/widgets/admin/stats/AdminStatisticsMain";
import { Box } from "@mantine/core";

export const AdminStatisticsPage = () => {
    return (
        <Box className={styles.container}>
            <AdminStatisticsMain></AdminStatisticsMain>
        </Box>
    )
}