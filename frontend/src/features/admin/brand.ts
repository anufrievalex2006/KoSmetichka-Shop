import { BrandCreateDto, BrandUpdateDto, IBrandRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBrandsList = (repo: IBrandRepo) => {
    const {data: brands, isLoading} = useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        brands,
        isLoading
    };
}

export const useBrandDetails = (id: string, repo: IBrandRepo) => {
    const {data: brand, isLoading} = useQuery({
        queryKey: ["brands", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        brand,
        isLoading
    };
}

export const useCreateBrand = (repo: IBrandRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: BrandCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            });
            queryClient.invalidateQueries({
                queryKey: ["counts"]
            });
            notifications.show({
                title: "Успех",
                message: "Производитель был успешно создан",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания производителя",
                color: "red",
                position: "top-right"
            });
        }
    });

    return create;
}

interface UpdateProps {
    id: string;
    req: BrandUpdateDto;
}

export const useUpdateBrand = (repo: IBrandRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            });
            queryClient.invalidateQueries({
                queryKey: ["counts"]
            });
            notifications.show({
                title: "Успех",
                message: "Производитель был успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления производителя",
                color: "red",
                position: "top-right"
            });
        }
    });

    return update;
}

export const useDeleteBrand = (repo: IBrandRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            });
            queryClient.invalidateQueries({
                queryKey: ["counts"]
            });
            notifications.show({
                title: "Успех",
                message: "Производитель был успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления производителя",
                color: "red",
                position: "top-right"
            });
        }
    });

    return deleteMut;
}