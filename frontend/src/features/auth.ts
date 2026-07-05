import { ForgotPasswordDto, IAuthRepo, IUserRepo, LoginDto, RegisterDto, ResetPasswordDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";

export const useLogin = (repo: IAuthRepo) => {
    const queryClient = useQueryClient();
    const nav = useRouter();

    const login = useMutation({
        mutationFn: (req: LoginDto) => repo.login(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            notifications.show({
                title: "Успех",
                message: "Вы успешны вошли в систему",
                color: "green",
                position: "top-right"
            });
            nav.push("/profile");
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка входа в систему. Возможно, вы ввели неверный email или пароль",
                color: "red",
                position: "top-right"
            });
        }
    });

    return login;
}

export const useRegister = (repo: IAuthRepo) => {
    const queryClient = useQueryClient();
    const nav = useRouter();

    const register = useMutation({
        mutationFn: (req: RegisterDto) => repo.register(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            notifications.show({
                title: "Успех",
                message: "Регистрация прошла успешно",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка регистрации",
                color: "red",
                position: "top-right"
            });
        }
    });

    return register;
}

export const useLogout = (repo: IAuthRepo) => {
    const queryClient = useQueryClient();
    const nav = useRouter();

    const logout = useMutation({
        mutationFn: () => repo.logout(),
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ["profile"]
            });
            queryClient.clear();
            notifications.show({
                title: "Успех",
                message: "Вы вышли из системы",
                color: "blue",
                position: "top-right"
            });
            nav.push("/");
        }
    });

    return logout;
}

export const useForgotPassword = (repo: IAuthRepo) => {
    const forgot = useMutation({
        mutationFn: (req: ForgotPasswordDto) => repo.forgotPassword(req),
        onSuccess: () => {
            notifications.show({
                title: "Успех",
                message: "На Вашу почту была отправлена ссылка для восстановления пароля",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось отправить ссылку для восстановления пароля, проверьте почту",
                color: "red",
                position: "top-right"
            });
        }
    });

    return forgot;
}

export const useResetPassword = (repo: IAuthRepo) => {
    const nav = useRouter();

    const reset = useMutation({
        mutationFn: (req: ResetPasswordDto) => repo.resetPassword(req),
        onSuccess: () => {
            notifications.show({
                title: "Успех",
                message: "Пароль успешно изменен. Вам необходимо теперь войти с новым паролем",
                color: "green",
                position: "top-right"
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка",
                message: "Ссылка недействительна или уже истекла",
                color: "red",
                position: "top-right"
            });
        }
    });

    return reset;
}

export const useAuthCheck = (repo: IUserRepo) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await repo.getProfile();
            return res;
        },
        retry: false
    });

    return {
        isAuthorized: !!data && !isError,
        isLoading,
        profile: data
    }
}