import styles from "@/shared/styles/admin/category.module.scss";
import { AdminCategoryMain } from "@/widgets/admin/categoryDetails/AdminCategoryMain";
import { Box } from "@mantine/core";

interface Props {
    id: string;
}

export const AdminCategoryPage = ({id}: Props) => {
    return (
        <Box className={styles.container}>
            <AdminCategoryMain id={id}></AdminCategoryMain>
        </Box>
    )
}