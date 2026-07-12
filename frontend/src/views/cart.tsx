import styles from "@/shared/styles/cart.module.scss";
import { CartMain } from "@/widgets/cart/CartMain";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Box } from "@mantine/core";

export const CartPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <CartMain></CartMain>
            <Footer></Footer>
        </Box>
    )
}