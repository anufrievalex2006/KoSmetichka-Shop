import { Button, PasswordInput, Stack, Switch, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/auth.module.scss";
import { AuthRepo } from "@/data/repos/AuthRepo";
import { useLogin } from "@/features/auth";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "@/domain/schemas/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const repo = new AuthRepo();

export const LoginMain = () => {
    const nav = useRouter();
    const login = useLogin(repo);
    const form = useForm<LoginForm>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = (data: LoginForm) => {
        login.mutate(data, {
            onSuccess: () => {
                form.reset();
            }
        });
    }
    return (
        <Stack flex={1} py="xl" mx="auto" w="60%">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack classNames={{root: styles.loginDiv}}>
                    <Title order={1} classNames={{root: styles.title}}>Авторизация</Title>
                    <TextInput type="email" label="Введите ваш Email" classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} {...form.register("email")} error={form.formState.errors.email?.message}></TextInput>
                    <PasswordInput label="Пароль" classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} {...form.register("password")} error={form.formState.errors.password?.message}></PasswordInput>
                    <Controller control={form.control} name="rememberMe" render={({field}) => (
                        <Switch label="Запомнить меня" checked={field.value} classNames={{
                            label: styles.switchLabel
                        }} onChange={field.onChange} size="md"></Switch>
                    )}></Controller>
                    <Link href="/forgot-password" className={styles.forgot}>Забыли пароль?</Link>
                    <Button type="submit" classNames={{root: styles.submitBtn}}>Войти в систему</Button>
                    <Button variant="outline" onClick={
                        () => nav.push("/register")
                    } classNames={{root: styles.regBtn}}>Зарегистрироваться</Button>
                </Stack>
            </form>
        </Stack>
    )
}