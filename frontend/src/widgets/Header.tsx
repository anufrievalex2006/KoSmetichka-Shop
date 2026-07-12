"use client";
import styles from "@/shared/styles/header.module.scss";
import { IconMenu2, IconSearch, IconShoppingCart, IconUser } from "@tabler/icons-react";
import { ActionIcon, Drawer, Group, Stack, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { KeyboardEvent, useState } from "react";
import { UserRepo } from "@/data/repos/UserRepo";
import { useAuthCheck } from "@/features/auth";
import { useRouter } from "next/navigation";

const links = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: "Новости", href: "/news" },
    { label: "Акции", href: "/promotions" },
    { label: "Контакты", href: "/contacts" },
]

const repo = new UserRepo();

export const Header = () => {
    const nav = useRouter();
    const {isAuthorized} = useAuthCheck(repo);
    const [open, setOpen] = useState(false);
    const onProfileClick = () => nav.push(isAuthorized ? "/profile" : "/login");
    const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;

        const value = e.currentTarget.value.trim();
        if (value)
            nav.push(`/search?search=${encodeURIComponent(value)}`);
    }
    return (
        <header className={styles.header}>
            <Group classNames={{root: styles.headerTop}}>
                <ActionIcon variant="subtle" size="xl" classNames={{
                    root: styles.burger
                }} onClick={() => setOpen(true)} aria-label="Открыть меню">
                    <IconMenu2 size={24}></IconMenu2>
                </ActionIcon>
                <Title order={1} onClick={
                    () => nav.push("/")
                } classNames={{root: styles.shopName}}>Ко<span>S</span>метичка</Title>
                <TextInput placeholder="Найти товар по названию/артикулу" classNames={{
                    root: styles.search,
                    input: styles.searchInput
                }} leftSection={<IconSearch size={18}></IconSearch>} onKeyDown={onSearch}></TextInput>
                <Group gap="sm" wrap="nowrap">
                    <ActionIcon variant="subtle" size="xl">
                        <IconShoppingCart size={22}></IconShoppingCart>
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="xl" onClick={onProfileClick}>
                        <IconUser size={22}></IconUser>
                    </ActionIcon>
                </Group>
            </Group>
            <Group classNames={{root: styles.navBar}}>
                {links.map((l,i) => (
                    <Link key={i} href={l.href}>{l.label}</Link>
                ))}
            </Group>
            <Drawer opened={open} onClose={() => setOpen(false)} title="Меню" classNames={{
                content: styles.drawer,
                header: styles.drawerHeader,
                title: styles.drawerTitle
            }}>
                <Stack gap={0}>
                    {links.map((l,i) => (
                        <Link key={i} href={l.href} className={styles.drawerLink} onClick={() => setOpen(false)}>{l.label}</Link>
                    ))}
                </Stack>
            </Drawer>
        </header>
    )
}