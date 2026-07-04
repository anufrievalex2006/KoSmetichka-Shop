import { ContentCardCreateDto, ContentCardDto, ContentCardType, ContentCardUpdateDto, IContentCardRepo } from "@/domain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

export const useContentCardsList = (repo: IContentCardRepo, type?: ContentCardType) => {
    const {data: cards, isLoading} = useQuery<ContentCardDto[]>({
        queryKey: ["cards", type],
        queryFn: async () => {
            const res = await repo.getAll(type);
            return res;
        }
    });
    return {
        cards,
        isLoading
    };
}

export const useContentCardDetails = (id: string, repo: IContentCardRepo) => {
    const {data: card, isLoading} = useQuery<ContentCardDto>({
        queryKey: ["cards", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });
    return {
        card,
        isLoading
    };
}

export const useCreateContentCard = (repo: IContentCardRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: ContentCardCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cards"]
            });
            notifications.show({
                title: "Успех",
                message: "Карточка успешно создана",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания новости/акции",
                color: "red",
                position: "top-right"
            });
        }
    });
    
    return create;
}

interface UpdateProps {
    id: string;
    req: ContentCardUpdateDto;
}

export const useUpdateContentCard = (repo: IContentCardRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["cards", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["cards"]
            });
            notifications.show({
                title: "Успех",
                message: "Карточка успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления новости/акции",
                color: "red",
                position: "top-right"
            });
        }
    });
    
    return update;
}

export const useDeleteContentCard = (repo: IContentCardRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["cards", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["cards"]
            });
            notifications.show({
                title: "Успех",
                message: "Карточка успешно удалена",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления новости/акции",
                color: "red",
                position: "top-right"
            });
        }
    });
    
    return deleteMut;
}