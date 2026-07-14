import styles from "@/shared/styles/admin/products.module.scss";
import { AdminProductDetailsMain } from "@/widgets/admin/categoryDetails/products/productDetails/AdminProductDetailsMain";
import { Box } from "@mantine/core";

interface Props {
    id: string;
}

export const AdminProductDetailsPage = ({id}: Props) => {
    return (
        <Box className={styles.container}>
            <AdminProductDetailsMain id={id}></AdminProductDetailsMain>
        </Box>
    )
}