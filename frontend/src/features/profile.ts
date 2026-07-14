import { IUserRepo, ProfileUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = (repo: IUserRepo) => {
    const {data: profile, isLoading} = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await repo.getProfile();
            return res;
        },
        retry: false
    });

    return {
        profile,
        isLoading
    };
}

export const useUpdateProfile = (repo: IUserRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (req: ProfileUpdateDto) => repo.updateProfile(req),
        onSuccess: (profile) => {
            queryClient.setQueryData(["profile"], profile);
            notifications.show({
                title: "Успех",
                message: "Профиль успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления профиля",
                color: "red",
                position: "top-right"
            });
        }
    });

    return update;
}

export const useUpdateAvatar = (repo: IUserRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (file: File) => repo.updateAvatar(file),
        onSuccess: (profile) => {
            queryClient.setQueryData(["profile"], profile);
            notifications.show({
                title: "Успех",
                message: "Аватар успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления аватара",
                color: "red",
                position: "top-right"
            });
        }
    });
    
    return update;
}