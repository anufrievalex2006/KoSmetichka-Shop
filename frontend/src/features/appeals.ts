import { ClientQuestionCreateDto, IAppealRepo, SupplierRequestCreateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAppealsList = (repo: IAppealRepo) => {
    const {data: appeals, isLoading} = useQuery({
        queryKey: ["appeals"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        appeals,
        isLoading
    };
}

export const useCreateClientQuestion = (repo: IAppealRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: ClientQuestionCreateDto) => repo.createClientQuestion(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appeals"]
            });
            notifications.show({
                title: "Успех",
                message: "Ваш вопрос успешно отправлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка отправки вопроса",
                color: "red",
                position: "top-right"
            });
        }
    });

    return create;
}

export const useCreateSupplierRequest = (repo: IAppealRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: SupplierRequestCreateDto) => repo.createSupplierRequest(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appeals"]
            });
            notifications.show({
                title: "Успех",
                message: "Заявка успешно отправлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка отправки заявки",
                color: "red",
                position: "top-right"
            });
        }
    });

    return create;
}