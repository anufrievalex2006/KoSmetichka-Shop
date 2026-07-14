import { CategoryRepo } from "@/data/repos/CategoryRepo";
import { useUpdateCategory } from "@/features/admin/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import styles from "@/shared/styles/admin/categories.module.scss";
import { UpdateCategoryForm, updateCategorySchema } from "@/domain/schemas/admin/categories/update";
import { CategoryDto } from "@/domain";
import { useEffect } from "react";

interface Props {
    opened: boolean;
    onClose: () => void;
    category: CategoryDto;
}

const repo = new CategoryRepo();

export const CategoryUpdateModal = ({opened, onClose, category}: Props) => {
    const update = useUpdateCategory(repo);
    const form = useForm<UpdateCategoryForm>({
        defaultValues: {
            name: ""
        },
        resolver: zodResolver(updateCategorySchema)
    });
    const onSubmit = (data: UpdateCategoryForm) => {
        update.mutate({
            id: category.id,
            req: data
        }, {
            onSuccess: () => {
                form.reset();
                onClose();
            }
        });
    }
    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name
            });
        }
    }, [category, form]);
    return (
        <Modal title="Обновление категории" opened={opened} onClose={onClose} centered>
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
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить</Button>
                        <Button type="reset" variant="outline" classNames={{
                            root: styles.cancelBtn
                        }}>Отмена</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}