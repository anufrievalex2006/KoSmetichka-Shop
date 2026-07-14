import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { FileRepo } from "@/data/repos/FileRepo";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { CreateProductForm, createProductSchema } from "@/domain/schemas/admin/products/create";
import { useCategoryAttributes } from "@/features/admin/attributes";
import { useBrandsList } from "@/features/admin/brand";
import { useCreateProduct } from "@/features/admin/products";
import { useUploadFile } from "@/features/files";
import styles from "@/shared/styles/admin/products.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FileButton, Group, Loader, Modal, NumberInput, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

interface Props {
    opened: boolean;
    onClose: () => void;
    categoryId: string;
}

const repo = new ProductRepo();
const bRepo = new BrandRepo();
const aRepo = new AttributeRepo();
const fRepo = new FileRepo();

export const ProductCreateModal = ({opened, onClose, categoryId}: Props) => {
    const create = useCreateProduct(repo);
    const {brands} = useBrandsList(bRepo);
    const {attributes, isLoading: areAttribsLoading} = useCategoryAttributes(categoryId, aRepo);
    const upload = useUploadFile(fRepo);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const form = useForm<CreateProductForm>({
        defaultValues: {
            name: "",
            barCodeNumber: "",
            article: "",
            description: undefined,
            photoUrl: undefined,
            quantity: 0,
            price: 0,
            categoryId,
            brandId: "",
            attributeValues: []
        },
        resolver: zodResolver(createProductSchema(attributes ?? []))
    });
    useEffect(() => {
        return () => {
            if (preview)
                URL.revokeObjectURL(preview);
        };
    }, [preview]);
    const {fields} = useFieldArray({
        control: form.control,
        name: "attributeValues"
    });
    useEffect(() => {
        if (attributes) {
            form.setValue("attributeValues", attributes.map(a => ({
                attributeId: a.id,
                value: ""
            })));
        }
    }, [attributes, form]);
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
    const onSubmit = async (data: CreateProductForm) => {
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

        create.mutate({...data, photoUrl: url}, {
            onSuccess: handleClose
        });
    }
    return (
        <Modal title="Создание товара" opened={opened} onClose={onClose} centered>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack mt="xs" gap="md">
                    <TextInput label="Название" {...form.register("name")} error={
                        form.formState.errors.name?.message
                    } classNames={classes}></TextInput>
                    <TextInput label="Номер штрих-кода" {...form.register("barCodeNumber")} error={
                        form.formState.errors.barCodeNumber?.message
                    } classNames={classes}></TextInput>
                    <TextInput label="Артикул" {...form.register("article")} error={
                        form.formState.errors.article?.message
                    } classNames={classes}></TextInput>
                    <Textarea label="Описание" {...form.register("description")} error={
                        form.formState.errors.description?.message
                    } classNames={{
                        root: styles.field,
                        input: `${styles.fieldInput} ${styles.textarea}`,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }}></Textarea>
                    <Group grow>
                        <Controller control={form.control} name="quantity" render={({field}) => (
                            <NumberInput label="Количество" min={0} {...field} error={
                                form.formState.errors.quantity?.message
                            } classNames={classes}></NumberInput>
                        )}></Controller>
                        <Controller control={form.control} name="price" render={({field}) => (
                            <NumberInput label="Цена" min={0} {...field} error={
                                form.formState.errors.price?.message
                            } classNames={classes} decimalScale={2}></NumberInput>
                        )}></Controller>
                    </Group>
                    <Controller control={form.control} name="brandId" render={({field}) => (
                        <Select label="Производитель" data={brands?.map(b => ({
                            label: b.name,
                            value: b.id
                        })) ?? []} {...field} classNames={classes} error={
                            form.formState.errors.brandId?.message
                        }></Select>
                    )}></Controller>
                    {areAttribsLoading ? (
                        <Loader size="md"></Loader>
                    ) : fields.map((f,i) => {
                        const attr = attributes?.[i];
                        if (!attr)
                            return null;
                        
                        const label = attr.unit ? `${attr.name}, ${attr.unit}` : attr.name;
                        const error = form.formState.errors.attributeValues?.[i]?.value?.message;

                        if (attr.type === "ENUM") {
                            return (
                                <Controller key={f.id} control={form.control} name={`attributeValues.${i}.value`} render={({field}) => (
                                    <Select label={label} classNames={classes} data={
                                        attr.enumValues ?? []
                                    } {...field} error={error}></Select>
                                )}></Controller>
                            );
                        }
                        return (
                            <TextInput key={f.id} classNames={classes} label={label} {
                                ...form.register(`attributeValues.${i}.value`)
                            } error={error}></TextInput>
                        )
                    })}
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
                    <Group grow>
                        <Button type="submit" classNames={{
                            root: styles.submitBtn
                        }} loading={create.isPending}>Сохранить</Button>
                        <Button type="reset" variant="outline" classNames={{
                            root: styles.cancelBtn
                        }} onClick={() => {
                            form.reset();
                            onClose();
                        }}>Отмена</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}