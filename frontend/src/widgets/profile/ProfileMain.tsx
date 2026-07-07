import { UserRepo } from "@/data/repos/UserRepo";
import { useProfile } from "@/features/profile";
import styles from "@/shared/styles/profile.module.scss";
import { ActionIcon, Button, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import { IconCamera, IconLogout, IconPasswordUser, IconPencil, IconUserKey } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { UpdateAvatarModal } from "./UpdateAvatarModal";
import { UpdateProfileModal } from "./UpdateProfileModal";
import { useLogout } from "@/features/auth";
import { AuthRepo } from "@/data/repos/AuthRepo";
import { useRouter } from "next/navigation";

const aRepo = new AuthRepo();
const repo = new UserRepo();

export const ProfileMain = () => {
    const nav = useRouter();
    const {profile, isLoading} = useProfile(repo);
    const logout = useLogout(aRepo);
    const [modalOpened, {
        open: openModal,
        close: closeModal
    }] = useDisclosure(false);
    const [updProfileModalOpened, {
        open: openUpdProfileModal,
        close: closeUpdProfileModal
    }] = useDisclosure(false);
    return (
        <Stack flex={1} gap="lg" p="xl">
            <Title order={1} classNames={{root: styles.pageTitle}}>Профиль</Title>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : !profile ? (
                <Text c="red" fw={700} ta="center">Вы не авторизованы в системе</Text>
            ) : (
                <>
                    <Group align="flex-start" classNames={{root: styles.mainGroup}}>
                        <div className={styles.avatarWrap}>
                            <div className={styles.avatar}>
                                <Image alt={`Profile ${profile.name}`} className={styles.profilePic} fill src={profile.avatarUrl || noImage}></Image>
                            </div>
                            <ActionIcon classNames={{root: styles.avatarEditBtn}} radius="xl" size="xl" onClick={openModal}>
                                <IconCamera size={22}></IconCamera>
                            </ActionIcon>
                        </div>
                        <Stack flex={1} classNames={{root: styles.userInfoDiv}}>
                            <Group justify="space-between">
                                <Title order={2} classNames={{root: styles.h3}}>Информация о пользователе</Title>
                                <ActionIcon size="lg" onClick={openUpdProfileModal}>
                                    <IconPencil size={22}></IconPencil>
                                </ActionIcon>
                            </Group>
                            <Stack gap={8}>
                                <Stack gap={8}>
                                    <Text classNames={{root: styles.entryTitle}}>ФИО</Text>
                                    <Text classNames={{root: styles.entryValue}}>{profile.name}</Text>
                                </Stack>
                                <Divider></Divider>
                                <Stack gap={8}>
                                    <Text classNames={{root: styles.entryTitle}}>Email</Text>
                                    <Text classNames={{root: styles.entryValue}}>{profile.email}</Text>
                                </Stack>
                                <Divider></Divider>
                                <Stack gap={8}>
                                    <Text classNames={{root: styles.entryTitle}}>Номер телефона</Text>
                                    <Text classNames={{root: styles.entryValue}}>{profile.phone}</Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Group>
                    <Group gap="sm" justify="flex-end">
                        <Button variant="outline" classNames={{root: styles.passBtn}} leftSection={
                            <IconPasswordUser size={18}></IconPasswordUser>
                        }>Сменить пароль</Button>
                        {profile.role === "ADMIN" && (
                            <Button classNames={{root: styles.adminBtn}} leftSection={
                                <IconUserKey size={18}></IconUserKey>
                            } onClick={() => nav.push("/admin")}>Администрирование</Button>
                        )}
                        <Button variant="outline" classNames={{root: styles.logoutBtn}} leftSection={
                            <IconLogout size={18}></IconLogout>
                        } onClick={() => logout.mutate()} loading={logout.isPending}>Выйти из системы</Button>
                    </Group>
                </>
            )}
            <UpdateProfileModal opened={updProfileModalOpened} onClose={closeUpdProfileModal}></UpdateProfileModal>
            <UpdateAvatarModal opened={modalOpened} onClose={closeModal} currentAvatarUrl={profile?.avatarUrl}></UpdateAvatarModal>
        </Stack>
    )
}