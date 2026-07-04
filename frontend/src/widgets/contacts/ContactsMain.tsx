import { Group, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/contacts.module.scss";
import { ShopRepo } from "@/data/repos/ShopRepo";
import { ContactCard } from "./ContactCard";

const repo = new ShopRepo();

export const ContactsMain = () => {
    return (
        <Stack flex={1} classNames={{root: styles.contactsMain}} py="xl">
            <Stack gap="xl">
                <Title order={1} px="xl" classNames={{root: styles.pageTitle}}>Наши контакты</Title>
                <Group classNames={{root: styles.contactsCardGroup}}>
                    <ContactCard></ContactCard>
                    <ContactCard></ContactCard>
                    <ContactCard></ContactCard>
                    <ContactCard></ContactCard>
                </Group>
            </Stack>
            <Stack gap="xl">
                <Title order={2} px="xl" classNames={{root: styles.h2}}>Мы также располагаемся по адресу <span>г. Томск, пер. Карповский, д. 12</span></Title>
                <Stack classNames={{root: styles.map}}>
                    <iframe title="Our KoSmetichka address" src="https://maps.google.com/maps?q=56.4987602,84.9493298&z=15&output=embed" className={styles.iframe}></iframe>
                </Stack>
            </Stack>
        </Stack>
    )
}