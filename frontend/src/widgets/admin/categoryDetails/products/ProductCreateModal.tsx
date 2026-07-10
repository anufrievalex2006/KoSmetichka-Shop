import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { CreateProductForm, createProductSchema } from "@/domain/schemas/admin/products/create";
import { useCategoryAttributes } from "@/features/admin/attributes";
import { useBrandsList } from "@/features/admin/brand";
import { useCreateProduct } from "@/features/admin/products";
import styles from "@/shared/styles/admin/products.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Loader, Modal, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

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

export const ProductCreateModal = ({opened, onClose, categoryId}: Props) => {
    const create = useCreateProduct(repo);
    const {brands} = useBrandsList(bRepo);
    const {attributes, isLoading: areAttribsLoading} = useCategoryAttributes(categoryId, aRepo);

    const form = useForm<CreateProductForm>({
        defaultValues: {
            name: "",
            barCodeNumber: "",
            article: "",
            description: undefined,
            quantity: 0,
            price: 0,
            categoryId,
            brandId: "",
            attributeValues: []
        },
        resolver: zodResolver(createProductSchema(attributes ?? []))
    });
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
    const onSubmit = (data: CreateProductForm) => {
        create.mutate(data, {
            onSuccess: () => {
                form.reset();
                onClose();
            }
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