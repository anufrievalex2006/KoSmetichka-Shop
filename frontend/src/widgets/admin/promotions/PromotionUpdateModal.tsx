import { Button, FileButton, Group, Modal, Stack, Text, Textarea, TextInput } from "@mantine/core"
import styles from "@/shared/styles/admin/promos.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileRepo } from "@/data/repos/FileRepo";
import { useUploadFile } from "@/features/files";
import { useEffect, useState } from "react";
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import { ContentCardDto } from "@/domain";
import { ContentCardRepo } from "@/data/repos/ContentCardRepo";
import { useUpdateContentCard } from "@/features/contentCard";
import { UpdateContentCardForm, updateContentCardSchema } from "@/domain/schemas/admin/contentCards/update";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

interface ModalProps {
    opened: boolean;
    onClose: () => void;
    promo: ContentCardDto;
}

const repo = new ContentCardRepo();
const fRepo = new FileRepo();

export const PromotionUpdateModal = ({opened, onClose, promo}: ModalProps) => {
    const update = useUpdateContentCard(repo);
    const upload = useUploadFile(fRepo);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const form = useForm<UpdateContentCardForm>({
        defaultValues: {
            title: "",
            description: undefined,
            photoUrl: undefined
        },
        resolver: zodResolver(updateContentCardSchema)
    });

    useEffect(() => {
        return () => {
            if (preview)
                URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFile = (f: File | null) => {
        setFileError(null);
        if (!f) return;

        if (!ALLOWED_TYPES.includes(f.type)) {
            setFileError("Разрешены только изображения форматов .png, .jpeg или .webp");
            return;
        }        
        if (f.size > MAX_SIZE) {
            setFileError("Размер файла не должен превышать 5 МБ");
            return;
        }

        setFile(f);
        setPreview(URL.createObjectURL(f));
    }
    const onReset = () => {
        form.reset();
        setFile(null);
        setPreview(null);
        setFileError(null);
    }
    const handleClose = () => {
        onReset();
        onClose();
    }
    const onSubmit = async (data: UpdateContentCardForm) => {
        let url = data.photoUrl;
        if (file) {
            try {
                url = await upload.mutateAsync(file);
            }
            catch {
                setFileError("Не удалось загрузить логотип, попробуйте еще раз");
                return;
            }
        }

        update.mutate({id: promo.id, req: {
            ...data,
            type: "PROMO",
            photoUrl: url
        }}, {
            onSuccess: handleClose
        });
    }
    useEffect(() => {
        if (promo) {
            form.reset({
                title: promo.title,
                description: promo.description ?? undefined,
                photoUrl: promo.photoUrl ?? undefined
            });
        }
    }, [promo, form]);
    return (
        <Modal title="Обновление акции" opened={opened} onClose={onClose} centered>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack mt="xs" gap="md">
                    <div className={styles.logoPreviewWrap}>
                        <Image alt="Фотография к акции" className={
                            styles.logoPreview
                        } fill src={preview || noImage}></Image>
                    </div>
                    {fileError && (
                        <Text c="red" size="sm">{fileError}</Text>
                    )}
                    <Group>
                        <FileButton onChange={handleFile} accept="image/jpeg,image/png,image/webp">
                            {(props) => (
                                <Button fullWidth classNames={{
                                    root: styles.addBtn
                                }} variant="outline" {...props}>Выбрать логотип</Button>
                            )}
                        </FileButton>
                    </Group>
                    <TextInput {...form.register("title")} classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} label="Заголовок" error={
                        form.formState.errors.title?.message
                    }></TextInput>
                    <Textarea {...form.register("description")} classNames={{
                        root: styles.field,
                        input: `${styles.fieldInput} ${styles.textarea}`,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} label="Описание акции" error={
                        form.formState.errors.description?.message
                    }></Textarea>
                    <Group grow>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить</Button>
                        <Button type="reset" classNames={{
                            root: styles.cancelBtn
                        }} onClick={handleClose} variant="outline">Отмена</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}