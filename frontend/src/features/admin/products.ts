import { IProductRepo, ProductCreateDto, ProductFilterParams } from "@/domain";
import { notifications } from "@mantine/notifications";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductsList = (
    categoryId: string,
    filters: Omit<ProductFilterParams, "categoryId">,
    repo: IProductRepo
) => {
    const params: ProductFilterParams = {...filters, categoryId};

    const {data, isLoading, isFetching, error} = useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const res = await repo.getAll(params);
            return res;
        },
        placeholderData: keepPreviousData
    });

    return {
        products: data?.content,
        pagination: {
            page: data?.page,
            totalPages: data?.totalPages,
            totalElements: data?.totalElements,
            isLast: data?.last
        },
        isLoading,
        isFetching,
        error
    };
}

export const useProductDetails = (id: string, repo: IProductRepo) => {
    const {data: product, isLoading} = useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        product,
        isLoading
    };
}

export const useCreateProduct = (repo: IProductRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: ProductCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notifications.show({
                title: "Успех",
                message: "Товар успешно создан",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания товара",
                color: "red",
                position: "top-right"
            });
        }
    });

    return create;
}