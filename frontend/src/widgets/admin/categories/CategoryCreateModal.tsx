import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { CreateCategoryForm, createCategorySchema } from "@/domain/schemas/admin/categories/create";
import { useCreateCategory } from "@/features/admin/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import styles from "@/shared/styles/admin/categories.module.scss";

interface Props {
    opened: boolean;
    onClose: () => void;
}

const repo = new CategoryRepo();

export const CategoryCreateModal = ({opened, onClose}: Props) => {
    const create = useCreateCategory(repo);
    const form = useForm<CreateCategoryForm>({
        defaultValues: {
            name: ""
        },
        resolver: zodResolver(createCategorySchema)
    });
    const onSubmit = (data: CreateCategoryForm) => {
        create.mutate(data, {
            onSuccess: () => {
                form.reset();
                onClose();
            }
        });
    }
    return (
        <Modal title="Создание категории" opened={opened} onClose={onClose} centered>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack mt="xs" gap="md">
                    <TextInput {...form.register("name")} classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} label="Название производителя" error={
                        form.formState.errors.name?.message
                    }></TextInput>
                    <Group grow>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Сохранить</Button>
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