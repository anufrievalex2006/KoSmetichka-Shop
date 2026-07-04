import styles from "@/shared/styles/contacts.module.scss";
import { ContactsMain } from "@/widgets/contacts/ContactsMain";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Box } from "@mantine/core";

export const ContactsPage = () => {
    return (
        <Box className={styles.container}>
            <Header></Header>
            <ContactsMain></ContactsMain>
            <Footer></Footer>
        </Box>
    )
}