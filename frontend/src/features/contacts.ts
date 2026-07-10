import { ShopContactCreateDto, ShopContactUpdateDto } from "@/domain";
import { IContactsRepo } from "@/domain/repos/IContactsRepo";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useContactsList = (repo: IContactsRepo) => {
    const {data: contacts, isLoading} = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        contacts,
        isLoading
    };
}

export const useContactDetails = (id: string, repo: IContactsRepo) => {
    const {data: contact, isLoading} = useQuery({
        queryKey: ["contacts", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        contact,
        isLoading
    };
}

export const useCreateContact = (repo: IContactsRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: ShopContactCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["contacts"]
            });
            notifications.show({
                title: "Успех",
                message: "Контакт успешно создан",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания контакта",
                color: "red",
                position: "top-right"
            });
        }
    });

    return create;
}

interface UpdateProps {
    id: string;
    req: ShopContactUpdateDto;
}

export const useUpdateContact = (repo: IContactsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["contacts"]
            });
            notifications.show({
                title: "Успех",
                message: "Контакт успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления контакта",
                color: "red",
                position: "top-right"
            });
        }
    });

    return update;
}

export const useDeleteContact = (repo: IContactsRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["contacts"]
            });
            notifications.show({
                title: "Успех",
                message: "Контакт успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления контакта",
                color: "red",
                position: "top-right"
            });
        }
    });

    return deleteMut;
}