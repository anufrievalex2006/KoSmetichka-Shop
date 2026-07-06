import { UserRepo } from "@/data/repos/UserRepo";
import { useProfile } from "@/features/profile";
import styles from "@/shared/styles/profile.module.scss";
import { ActionIcon, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import { IconCamera, IconPencil } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { UpdateAvatarModal } from "./UpdateAvatarModal";

const repo = new UserRepo();

export const ProfileMain = () => {
    const {profile, isLoading} = useProfile(repo);
    const [modalOpened, {
        open: openModal,
        close: closeModal
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
                <Group align="flex-start" classNames={{root: styles.mainGroup}}>
                    <div className={styles.avatarWrap}>
                        <div className={styles.avatar}>
                            <Image alt={`Profile ${profile.name}`} className={styles.profilePic} fill sizes="160px" src={profile.avatarUrl || noImage}></Image>
                        </div>
                        <ActionIcon classNames={{root: styles.avatarEditBtn}} radius="xl" size="xl" onClick={openModal}>
                            <IconCamera size={22}></IconCamera>
                        </ActionIcon>
                    </div>
                    <Stack flex={1} classNames={{root: styles.userInfoDiv}}>
                        <Group justify="space-between">
                            <Title order={2} classNames={{root: styles.h3}}>Информация о пользователе</Title>
                            <ActionIcon size="lg">
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
            )}
            <UpdateAvatarModal opened={modalOpened} onClose={closeModal} currentAvatarUrl={profile?.avatarUrl}></UpdateAvatarModal>
        </Stack>
    )
}