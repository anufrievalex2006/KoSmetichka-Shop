import { Button, Group, Loader, NumberInput, Select, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/admin/products.module.scss";
import { ProductRepo } from "@/data/repos/ProductRepo";
import { useProductDetails, useUpdateProduct } from "@/features/admin/products";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UpdateProductForm, updateProductSchema } from "@/domain/schemas/admin/products/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { create } from "domain";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { useBrandsList } from "@/features/admin/brand";
import { useRouter } from "next/navigation";

const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

interface Props {
    id: string;
}

const repo = new ProductRepo();
const bRepo = new BrandRepo();

export const AdminProductUpdateMain = ({id}: Props) => {
    const nav = useRouter();
    const {product, isLoading} = useProductDetails(id, repo);
    const {brands} = useBrandsList(bRepo);
    const attributes = product?.attributeValues.map(a => a.attribute);
    const update = useUpdateProduct(repo);
    const form = useForm<UpdateProductForm>({
        defaultValues: {
            name: "",
            barCodeNumber: "",
            article: "",
            description: undefined,
            quantity: 0,
            price: 0,
            categoryId: "",
            brandId: "",
            attributeValues: []
        },
        resolver: zodResolver(updateProductSchema(attributes ?? []))
    });
    const {fields} = useFieldArray({
        control: form.control,
        name: "attributeValues"
    });
    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                barCodeNumber: product.barCodeNumber ?? undefined,
                article: product.article ?? undefined,
                description: product.description ?? undefined,
                quantity: product.quantity,
                price: product.price,
                categoryId: product.category.id,
                brandId: product.brand.id,
                attributeValues: product.attributeValues.map(a => ({
                    attributeId: a.attribute.id,
                    value: a.value
                }))
            });
        }
    }, [product, form]);
    const onSubmit = (data: UpdateProductForm) => {
        update.mutate({
            id: product!.id,
            req: data
        }, {
            onSuccess: () => {
                form.reset();
                nav.push(`/admin/categories/${product?.category.id}`);
            }
        })
    }
    return isLoading ? (
        <Group gap="md" justify="center">
            <Loader size="lg"></Loader>
            <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
        </Group>
    ) : !product ? (
        <Text c="red" fw={700} ta="center" size="lg">Такого товара не существует</Text>
    ) : (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Редактирование товара</Title>
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
                            <NumberInput label="Количество, шт." min={0} {...field} error={
                                form.formState.errors.quantity?.message
                            } classNames={classes}></NumberInput>
                        )}></Controller>
                        <Controller control={form.control} name="price" render={({field}) => (
                            <NumberInput label="Цена, руб." min={0} {...field} error={
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
                    {fields.map((f,i) => {
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
                        }} loading={update.isPending}>Обновить</Button>
                        <Button type="reset" variant="outline" classNames={{
                            root: styles.cancelBtn
                        }} onClick={() => {
                            form.reset();
                            nav.push(`/admin/categories/${product.category.id}`);
                        }}>Отмена</Button>
                    </Group>
                </Stack>
            </form>
        </Stack>
    )
}