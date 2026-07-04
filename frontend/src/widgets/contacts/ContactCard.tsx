import styles from "@/shared/styles/contacts.module.scss";
import { Stack, Text, Title } from "@mantine/core";

export const ContactCard = () => {
    return (
        <Stack classNames={{root: styles.contact}}>
            <Title order={3} classNames={{root: styles.contactTitle}}>Номер телефона</Title>
            <Text classNames={{root: styles.contactValue}}>+7 800 555-35-35</Text>
        </Stack>
    )
}