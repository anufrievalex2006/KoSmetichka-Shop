import { ShopContactDto } from "@/domain";
import styles from "@/shared/styles/contacts.module.scss";
import { Stack, Text, Title } from "@mantine/core";

interface Props {
    contact: ShopContactDto;
}

export const ContactCard = ({contact}: Props) => {
    return (
        <Stack classNames={{root: styles.contact}}>
            <Title order={3} classNames={{root: styles.contactTitle}}>{contact.label}</Title>
            <Text classNames={{root: styles.contactValue}}>{contact.value}</Text>
        </Stack>
    )
}