import { Button, FileButton, Group, Modal, Stack, Text, Textarea, TextInput } from "@mantine/core"
import styles from "@/shared/styles/admin/brand.module.scss";
import { CreateBrandForm, createBrandSchema } from "@/domain/schemas/admin/brands/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "domain";
import { useForm } from "react-hook-form";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { useCreateBrand, useUpdateBrand } from "@/features/admin/brand";
import { FileRepo } from "@/data/repos/FileRepo";
import { useUploadFile } from "@/features/files";
import { useEffect, useState } from "react";
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import { BrandDto } from "@/domain";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

interface ModalProps {
    opened: boolean;
    onClose: () => void;
    brand: BrandDto;
}

const repo = new BrandRepo();
const fRepo = new FileRepo();

export const BrandUpdateModal = ({opened, onClose, brand}: ModalProps) => {
    const update = useUpdateBrand(repo);
    const upload = useUploadFile(fRepo);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const form = useForm<CreateBrandForm>({
        defaultValues: {
            name: "",
            description: undefined,
            logoUrl: undefined
        },
        resolver: zodResolver(createBrandSchema)
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
    const onSubmit = async (data: CreateBrandForm) => {
        let url = data.logoUrl;
        if (file) {
            try {
                url = await upload.mutateAsync(file);
            }
            catch {
                setFileError("Не удалось загрузить логотип, попробуйте еще раз");
                return;
            }
        }

        update.mutate({id: brand.id, req: {...data, logoUrl: url}}, {
            onSuccess: handleClose
        });
    }
    useEffect(() => {
        if (brand) {
            form.reset({
                name: brand.name,
                description: brand.description ?? undefined,
                logoUrl: brand.logoUrl ?? undefined
            });
        }
    }, [brand, form]);
    return (
        <Modal title="Обновление производителя" opened={opened} onClose={onClose} centered>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack mt="xs" gap="md">
                    <div className={styles.logoPreviewWrap}>
                        <Image alt="Логотип производителя" className={
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
                    <TextInput {...form.register("name")} classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} label="Название производителя" error={
                        form.formState.errors.name?.message
                    }></TextInput>
                    <Textarea {...form.register("description")} classNames={{
                        root: styles.field,
                        input: `${styles.fieldInput} ${styles.textarea}`,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} label="Описание производителя" error={
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