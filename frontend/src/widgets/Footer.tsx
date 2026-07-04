"use client";
import styles from "@/shared/styles/footer.module.scss";
import { Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconPhone, IconMail, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";

const links = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: "Новости", href: "/news" },
    { label: "Акции", href: "/promotions" },
    { label: "Контакты", href: "/contacts" },
];

const contacts = [
    { id: "1", type: "PHONE", label: "Телефон", value: "+7 (900) 123-45-67" },
    { id: "2", type: "EMAIL", label: "Email", value: "info@kosmetichka.ru" },
    { id: "3", type: "SOCIAL_MEDIA", label: "Instagram", value: "@kosmetichka_tomsk" },
];

const contactIcons: Record<string, React.ReactNode> = {
    PHONE: <IconPhone size={16} />,
    EMAIL: <IconMail size={16} />,
    SOCIAL_MEDIA: <IconBrandInstagram size={16} />,
};

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <SimpleGrid cols={{base: 1, sm: 3}} spacing="xl" className={styles.grid}>
                <Stack gap="sm">
                    <Title order={3} classNames={{root: styles.shopName}}>
                        Ко<span>S</span>метичка
                    </Title>
                    <Text classNames={{root: styles.description}}>
                        Магазин косметики и парфюмерии - уход, макияж и аксессуары для тебя.
                    </Text>
                </Stack>
                <Stack gap="sm">
                    <Text classNames={{root: styles.columnTitle}}>Навигация</Text>
                    {links.map(l => (
                        <Link key={l.href} href={l.href} className={styles.link}>
                            {l.label}
                        </Link>
                    ))}
                </Stack>
                <Stack gap="sm">
                    <Text classNames={{root: styles.columnTitle}}>Контакты</Text>
                    <Text classNames={{root: styles.address}}>г. Томск, пер. Карповский, д. 12</Text>
                    {contacts.map(c => (
                        <Group key={c.id} gap="xs" classNames={{root: styles.contactItem}}>
                            {contactIcons[c.type]}
                            <Text classNames={{root: styles.contactValue}}>{c.value}</Text>
                        </Group>
                    ))}
                </Stack>
            </SimpleGrid>
            <Text classNames={{root: styles.copyright}}>
                @ {new Date().getFullYear()} КоSметичка. Все права защищены
            </Text>
        </footer>
    )
}