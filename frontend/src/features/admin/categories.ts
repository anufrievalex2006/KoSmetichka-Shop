import { CategoryCreateDto, CategoryUpdateDto, ICategoryRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategoriesList = (repo: ICategoryRepo) => {
    const {data: categories, isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        categories,
        isLoading
    };
}

export const useCategoryDetails = (id: string, repo: ICategoryRepo) => {
    const {data: category, isLoading} = useQuery({
        queryKey: ["categories", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        category,
        isLoading
    };
}

export const useCreateCategory = (repo: ICategoryRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: CategoryCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            notifications.show({
                title: "Успех",
                message: "Категория успешно добавлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания категории",
                color: "red",
                position: "top-right"
            });
        }
    });

    return create;
}

interface UpdateProps {
    id: string;
    req: CategoryUpdateDto;
}

export const useUpdateCategory = (repo: ICategoryRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            notifications.show({
                title: "Успех",
                message: "Категория успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления категории",
                color: "red",
                position: "top-right"
            });
        }
    });

    return update;
}

export const useDeleteCategory = (repo: ICategoryRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            notifications.show({
                title: "Успех",
                message: "Категория успешно удалена",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления категории",
                color: "red",
                position: "top-right"
            });
        }
    });

    return deleteMut;
}