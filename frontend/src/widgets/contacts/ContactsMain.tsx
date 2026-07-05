import { Group, Loader, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/contacts.module.scss";
import { ContactCard } from "./ContactCard";
import { ContactsRepo } from "@/data/repos/ContactsRepo";
import { useContactsList } from "@/features/contacts";

const repo = new ContactsRepo();

export const ContactsMain = () => {
    const {contacts, isLoading} = useContactsList(repo);
    return (
        <Stack flex={1} classNames={{root: styles.contactsMain}} py="xl">
            <Stack gap="xl">
                <Title order={1} px="xl" classNames={{root: styles.pageTitle}}>Наши контакты</Title>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!contacts) ? (
                    <Text c="red" fw={700} size="xl" ta="center">Ошибка загрузки контактов</Text>
                ) : (contacts.length === 0) ? (
                    <Text c="blue" fw={700} size="xl" ta="center">Пока нет контактов!</Text>
                ) : (
                    <Group classNames={{root: styles.contactsCardGroup}}>
                        {contacts.map(c => (
                            <ContactCard key={c.id} contact={c}></ContactCard>
                        ))}
                    </Group>
                )}
            </Stack>
            <Stack gap="xl">
                <Title order={2} px="xl" classNames={{root: styles.h2}}>Наш адрес: <span>г. Томск, пер. Карповский, д. 12</span></Title>
                <Stack classNames={{root: styles.map}}>
                    <iframe title="Our KoSmetichka address" src="https://maps.google.com/maps?q=56.4987602,84.9493298&z=15&output=embed" className={styles.iframe}></iframe>
                </Stack>
            </Stack>
        </Stack>
    )
}