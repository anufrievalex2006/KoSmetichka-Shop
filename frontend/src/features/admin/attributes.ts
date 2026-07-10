import { AttributeCreateDto, AttributeUpdateDto, IAttributeRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategoryAttributes = (categoryId: string, repo: IAttributeRepo) => {
    const {data: attributes, isLoading} = useQuery({
        queryKey: ["attributes"],
        queryFn: async () => {
            const res = await repo.getByCategory(categoryId);
            return res;
        }
    });

    return {
        attributes,
        isLoading
    };
}

export const useCreateAttribute = (repo: IAttributeRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: AttributeCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["attributes"]
            });
            notifications.show({
                title: "Успех",
                message: "Атрибут успешно добавлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания атрибута",
                color: "red",
                position: "top-right"
            });
        }
    });

    return create;
}

interface UpdateProps {
    id: string;
    req: AttributeUpdateDto;
}

export const useUpdateAttribute = (repo: IAttributeRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["attributes"]
            });
            notifications.show({
                title: "Успех",
                message: "Атрибут успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления атрибута",
                color: "red",
                position: "top-right"
            });
        }
    });

    return update;
}

export const useDeleteAttribute = (repo: IAttributeRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["attributes"]
            });
            notifications.show({
                title: "Успех",
                message: "Атрибут успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления атрибута",
                color: "red",
                position: "top-right"
            });
        }
    });

    return deleteMut;
}