import { UserRepo } from "@/data/repos/UserRepo";
import { useUpdateAvatar } from "@/features/profile";
import styles from "@/shared/styles/profile.module.scss";
import { Button, FileButton, Group, Modal, Stack, Text } from "@mantine/core";
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import { useEffect, useState } from "react";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;
const repo = new UserRepo();

interface Props {
    opened: boolean;
    onClose: () => void;
    currentAvatarUrl?: string | null;
}

export const UpdateAvatarModal = ({opened, onClose, currentAvatarUrl}: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const update = useUpdateAvatar(repo);

    useEffect(() => {
        return () => {
            if (preview)
                URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFile = (f: File | null) => {
        setError(null);
        if (!f) return;

        if (!ALLOWED_TYPES.includes(f.type)) {
            setError("Разрешены только изображения форматов .png, .jpeg или .webp");
            return;
        }        
        if (f.size > MAX_SIZE) {
            setError("Размер файла не должен превышать 5 МБ");
            return;
        }

        setFile(f);
        setPreview(URL.createObjectURL(f));
    }
    const onReset = () => {
        setFile(null);
        setPreview(null);
        setError(null);
    }
    const handleClose = () => {
        onReset();
        onClose();
    }
    const onSubmit = () => {
        if (!file) return;

        update.mutate(file, {
            onSuccess: handleClose
        });
    }
    return (
        <Modal title="Обновить аватар" opened={opened} onClose={handleClose} centered>
            <Stack align="center" gap="md">
                <div className={styles.avatarPreviewWrap}>
                    <Image alt="Preview" className={styles.profilePic} fill sizes="160px" src={preview || currentAvatarUrl || noImage}></Image>
                </div>
                {error && (
                    <Text c="red" fw={700} size="sm">{error}</Text>
                )}
                <Group>
                    <FileButton onChange={handleFile} accept="image/jpeg,image/png,image/webp">
                        {(props) => (
                            <Button variant="outline" {...props}>Выбрать файл</Button>
                        )}
                    </FileButton>
                    <Button onClick={onSubmit} disabled={!file} loading={update.isPending}>Сохранить</Button>
                </Group>
            </Stack>
        </Modal>
    )
}