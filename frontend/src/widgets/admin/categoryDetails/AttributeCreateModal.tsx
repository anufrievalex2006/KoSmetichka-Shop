import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { CreateAttributeForm, createAttributeSchema } from "@/domain/schemas/admin/attributes/create";
import { useCreateAttribute } from "@/features/admin/attributes";
import styles from "@/shared/styles/admin/category.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Modal, Select, Stack, TagsInput, TextInput } from "@mantine/core";
import { Controller, useForm, useWatch } from "react-hook-form";

interface Props {
    opened: boolean;
    onClose: () => void;
    categoryId: string;
}

const repo = new AttributeRepo();

export const AttributeCreateModal = ({opened, onClose, categoryId}: Props) => {
    const create = useCreateAttribute(repo);
    const form = useForm<CreateAttributeForm>({
        defaultValues: {
            name: "",
            type: "TEXT",
            unit: undefined,
            enumValues: []
        },
        resolver: zodResolver(createAttributeSchema)
    });
    const onSubmit = (data: CreateAttributeForm) => {
        create.mutate({...data, categoryId}, {
            onSuccess: () => {
                form.reset();
            }
        });
    }
    const type = useWatch({
        control: form.control,
        name: "type"
    });
    return (
        <Modal title="Создание атрибута" opened={opened} onClose={onClose} centered>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack mt="xs" gap="md">
                    <TextInput {...form.register("name")} classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} label="Название" error={
                        form.formState.errors.name?.message
                    }></TextInput>
                    <Controller control={form.control} name="type" render={({field}) => (
                        <Select clearable classNames={{
                            root: styles.field,
                            input: styles.fieldInput,
                            label: styles.fieldInputLabel,
                            error: styles.fieldInputError
                        }} label="Тип данных" data={[
                            {label: "Целое число", value: "INT"},
                            {label: "Дробное число", value: "FLOAT"},
                            {label: "Текст", value: "TEXT"},
                            {label: "Выбрать вариант", value: "ENUM"}
                        ]} {...field} error={
                            form.formState.errors.type?.message
                        }></Select>
                    )}></Controller>
                    {type === "ENUM" && (
                        <Controller control={form.control} name="enumValues" render={({field}) => (
                            <TagsInput placeholder="Введите значение и нажмите Enter" classNames={{
                                root: styles.field,
                                input: styles.fieldInput,
                                label: styles.fieldInputLabel,
                                error: styles.fieldInputError
                            }} label="Допустимые значения" {...field} error={
                                form.formState.errors.enumValues?.message
                            }></TagsInput>
                        )}></Controller>
                    )}
                    <TextInput {...form.register("unit")} classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} label="Единица измерения" error={
                        form.formState.errors.unit?.message
                    }></TextInput>
                    <Group grow>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Сохранить</Button>
                        <Button type="reset" classNames={{
                            root: styles.cancelBtn
                        }} onClick={() => {
                            form.reset();
                            onClose();
                        }} variant="outline">Отмена</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}