import { CartPositionCreateDto, CartPositionUpdateDto, ICartRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCart = (repo: ICartRepo) => {
    const {data: cart, isLoading} = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await repo.getCart();
            return res;
        },
        retry: false
    });

    return {
        cart,
        isLoading
    };
}

export const useCheckout = (repo: ICartRepo) => {
    const queryClient = useQueryClient();

    const checkout = useMutation({
        mutationFn: () => repo.checkout(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
            notifications.show({
                title: "Заказ оформлен!",
                message: "Чек с деталями заказа отправлен вам на почту",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка оформления заказа",
                color: "red",
                position: "top-right"
            });
        }
    });

    return checkout;
}

export const useAddToCart = (repo: ICartRepo) => {
    const queryClient = useQueryClient();

    const add = useMutation({
        mutationFn: (req: CartPositionCreateDto) => repo.addPosition(req),
        onSuccess: (cart) => {
            queryClient.setQueryData(["cart"], cart);
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось добавить товар в корзину",
                color: "red",
                position: "top-right"
            });
        }
    });

    return add;
}

interface UpdateProps {
    id: string;
    req: CartPositionUpdateDto;
}

export const useUpdateCartPosition = (repo: ICartRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.updatePosition(id, req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось изменить количество товара",
                color: "red",
                position: "top-right"
            });
        }
    });

    return update;
}

export const useDeleteCartPosition = (repo: ICartRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.deletePosition(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления товара из корзины",
                color: "red",
                position: "top-right"
            });
        }
    });

    return deleteMut;
}

export const useClearCart = (repo: ICartRepo) => {
    const queryClient = useQueryClient();

    const clear = useMutation({
        mutationFn: () => repo.clearCart(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось очистить корзину",
                color: "red",
                position: "top-right"
            });
        }
    });

    return clear;
}