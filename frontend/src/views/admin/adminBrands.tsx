import { Box } from "@mantine/core"
import styles from "@/shared/styles/admin/brand.module.scss";
import { AdminBrandsMain } from "@/widgets/admin/brands/AdminBrandsMain";

export const AdminBrandPage = () => {
    return (
        <Box className={styles.container}>
            <AdminBrandsMain></AdminBrandsMain>
        </Box>
    )
}