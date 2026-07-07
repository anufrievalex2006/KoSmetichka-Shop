"use client";

import { UserRepo } from "@/data/repos/UserRepo";
import { useProfile } from "@/features/profile";
import { AppShell, Center, Loader, NavLink, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { adminNavItems } from "./adminNavItems";
import Link from "next/link";
import styles from "@/shared/styles/adminlayout.module.scss";

const repo = new UserRepo();

export const AdminLayout = ({children}: {children: React.ReactNode}) => {
    const {profile, isLoading} = useProfile(repo);
    const pathname = usePathname();
    const nav = useRouter();

    const isAllowed = profile && (profile.role === "ADMIN" || profile.role === "CREATOR");
    useEffect(() => {
        if (!isLoading && !isAllowed)
            nav.replace("/");
    }, [isAllowed, isLoading, nav]);    

    if (isLoading) {
        return (
            <Center h="100vh">
                <Loader size="xl"></Loader>
            </Center>
        );
    }
    if (!isAllowed)
        return null;
    const items = adminNavItems.filter(x => x.roles.includes(profile.role));
    return (
        <AppShell navbar={{width: 260, breakpoint: "sm"}} classNames={{
            root: styles.shell,
            navbar: styles.navbar
        }} padding="md">
            <AppShell.Navbar p="md">
                <Text fw={700} size="lg" classNames={{
                    root: styles.navTitle
                }} mb="md" p="md">Администрирование</Text>
                {items.map(x => (
                    <NavLink key={x.href} component={Link} href={x.href} classNames={{
                        root: styles.btn,
                        label: styles.btnLabel
                    }} label={x.label} leftSection={
                        <x.icon size={22}></x.icon>
                    } active={pathname.startsWith(x.href)}></NavLink>
                ))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}