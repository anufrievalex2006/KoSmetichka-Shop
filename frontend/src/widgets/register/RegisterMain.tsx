import { AuthRepo } from "@/data/repos/AuthRepo"
import { RegisterForm, registerSchema } from "@/domain/schemas/auth/register";
import { useRegister } from "@/features/auth"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import styles from "@/shared/styles/auth.module.scss";
import { Button, InputBase, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IMaskInput } from "react-imask";

const repo = new AuthRepo();

export const RegisterMain = () => {
    const nav = useRouter();
    const register = useRegister(repo);
    const form = useForm<RegisterForm>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(registerSchema)
    });
    const onSubmit = (data: RegisterForm) => {
        const {confirmPassword, ...req} = data;
        register.mutate(req, {
            onSuccess: () => {
                form.reset();
            }
        });
    }
    return (
        <Stack flex={1} py="xl" mx="auto" w="60%">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack classNames={{root: styles.loginDiv}}>
                    <Title order={1} classNames={{root: styles.title}}>Регистрация</Title>
                    <TextInput label="ФИО" classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} {...form.register("name")} error={form.formState.errors.name?.message}></TextInput>
                    <TextInput type="email" label="Email" classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} {...form.register("email")} error={form.formState.errors.email?.message}></TextInput>
                    <Controller control={form.control} name="phone" render={({field}) => (
                        <InputBase component={IMaskInput} label="Номер телефона" {...field} classNames={{
                            root: styles.field,
                            input: styles.fieldInput,
                            label: styles.fieldInputLabel,
                            error: styles.fieldInputError
                        }} mask="+7 (000) 000-00-00" error={
                            form.formState.errors.phone?.message
                        } placeholder="+7 (xxx) xxx-xx-xx"></InputBase>
                    )}></Controller>
                    <PasswordInput label="Пароль" classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} {...form.register("password")} error={form.formState.errors.password?.message}></PasswordInput>
                    <PasswordInput label="Повторите пароль" classNames={{
                        root: styles.field,
                        input: styles.fieldInput,
                        label: styles.fieldInputLabel,
                        error: styles.fieldInputError
                    }} {...form.register("confirmPassword")} error={form.formState.errors.confirmPassword?.message}></PasswordInput>
                    <Button type="submit" classNames={{root: styles.submitBtn}}>Зарегистрироваться</Button>
                    <Button variant="outline" onClick={
                        () => nav.push("/login")
                    } classNames={{root: styles.regBtn}}>Уже есть аккаунт? Войти</Button>
                </Stack>
            </form>
        </Stack>
    )
}