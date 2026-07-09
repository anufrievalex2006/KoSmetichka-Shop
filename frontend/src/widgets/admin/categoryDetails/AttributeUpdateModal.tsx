import { AttributeRepo } from "@/data/repos/AttributeRepo";
import { AttributeDto } from "@/domain";
import { UpdateAttributeForm, updateAttributeSchema } from "@/domain/schemas/admin/attributes/update";
import { useUpdateAttribute } from "@/features/admin/attributes";
import styles from "@/shared/styles/admin/category.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Modal, Select, Stack, TagsInput, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

interface Props {
    opened: boolean;
    onClose: () => void;
    attribute: AttributeDto;
}

const repo = new AttributeRepo();

export const AttributeUpdateModal = ({opened, onClose, attribute}: Props) => {
    const update = useUpdateAttribute(repo);
    const form = useForm<UpdateAttributeForm>({
        defaultValues: {
            name: "",
            type: "TEXT",
            unit: undefined,
            enumValues: []
        },
        resolver: zodResolver(updateAttributeSchema)
    });
    const onSubmit = (data: UpdateAttributeForm) => {
        update.mutate({
            id: attribute.id,
            req: {...data}
        }, {
            onSuccess: () => {
                form.reset();
            }
        });
    }
    useEffect(() => {
        if (attribute) {
            form.reset({
                name: attribute.name,
                type: attribute.type,
                unit: attribute.unit ?? undefined,
                enumValues: attribute.enumValues ?? undefined
            });
        }
    }, [attribute, form]);
    const type = useWatch({
        control: form.control,
        name: "type"
    });
    return (
        <Modal title="Обновление атрибута" opened={opened} onClose={onClose} centered>
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
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить</Button>
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