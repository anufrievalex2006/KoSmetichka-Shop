import { IShopRepo, ShopDto, ShopUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useShopDetails = (repo: IShopRepo) => {
    const {data: shop, isLoading} = useQuery<ShopDto>({
        queryKey: ["shop"],
        queryFn: async () => {
            const res = await repo.get();
            return res;
        }
    });

    return {
        shop,
        isLoading
    };
}

export const useUpdateShop = (repo: IShopRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (req: ShopUpdateDto) => repo.update(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["shop"]
            });
            notifications.show({
                title: "Успех",
                message: "Информация о магазине успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления информации о магазине",
                color: "red",
                position: "top-right"
            });
        }
    });

    return update;
}