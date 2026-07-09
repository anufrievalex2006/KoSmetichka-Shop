import { IUserRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsersList = (repo: IUserRepo) => {
    const {data: users, isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        users,
        isLoading
    };
}

export const useDeleteUser = (repo: IUserRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            notifications.show({
                title: "Успех",
                message: "Пользователь успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления пользователя",
                color: "red",
                position: "top-right"
            });
        }
    });

    return deleteMut;
}