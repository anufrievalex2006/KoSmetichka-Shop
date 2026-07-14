import styles from "@/shared/styles/admin/products.module.scss";
import { AdminProductUpdateMain } from "@/widgets/admin/categoryDetails/products/productDetails/AdminProductUpdateMain";
import { Box } from "@mantine/core";

interface Props {
    id: string;
}

export const AdminProductUpdatePage = ({id}: Props) => {
    return (
        <Box className={styles.container}>
            <AdminProductUpdateMain id={id}></AdminProductUpdateMain>
        </Box>
    )
}