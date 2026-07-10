import { Button, Group, InputBase, Loader, Select, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/contacts.module.scss";
import { ContactCard } from "./ContactCard";
import { ContactsRepo } from "@/data/repos/ContactsRepo";
import { useContactsList } from "@/features/contacts";
import { AppealRepo } from "@/data/repos/AppealRepo";
import { useCreateClientQuestion, useCreateSupplierRequest } from "@/features/appeals";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { SendClientQuestionForm, sendClientQuestionSchema, SendSupplierRequestForm, sendSupplierRequestSchema } from "@/domain/schemas/appeals/send";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};
const classesArea = {
    root: styles.field,
    input: `${styles.fieldInput} ${styles.textarea}`,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
}

const repo = new ContactsRepo();
const aRepo = new AppealRepo();

type AppealForm = {
    contactEmail: string;
    contactPhone: string;
    content?: string;
    fullName?: string;
    companyName?: string;
};

export const ContactsMain = () => {
    const [appealType, setAppealType] = useState<"client" | "supplier" | null>(null);
    const createQuestion = useCreateClientQuestion(aRepo);
    const createRequest = useCreateSupplierRequest(aRepo);

    const schema = appealType === "client" ? sendClientQuestionSchema : sendSupplierRequestSchema;
    const form = useForm<AppealForm>({
        mode: "onChange",
        resolver: zodResolver(schema as any)
    });
    const onSubmit = (data: AppealForm) => {
        if (appealType === "client") {
            createQuestion.mutate(data as SendClientQuestionForm, {
                onSuccess: () => {
                    form.reset();
                }
            });
        }
        else if (appealType === "supplier") {
            createRequest.mutate(data as SendSupplierRequestForm, {
                onSuccess: () => {
                    form.reset();
                }
            });
        }
    }
    const {contacts, isLoading} = useContactsList(repo);
    return (
        <Stack flex={1} classNames={{root: styles.contactsMain}} py="xl">
            <Stack gap="xl">
                <Title order={1} px="xl" classNames={{root: styles.pageTitle}}>Наши контакты</Title>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="lg"></Loader>
                        <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!contacts) ? (
                    <Text c="red" fw={700} size="xl" ta="center">Ошибка загрузки контактов</Text>
                ) : (contacts.length === 0) ? (
                    <Text c="blue" fw={700} size="xl" ta="center">Пока нет контактов!</Text>
                ) : (
                    <Group classNames={{root: styles.contactsCardGroup}}>
                        {contacts.map(c => (
                            <ContactCard key={c.id} contact={c}></ContactCard>
                        ))}
                    </Group>
                )}
            </Stack>
            <Stack gap="xl">
                <Title order={2} px="xl" classNames={{root: styles.h2}}>Наш адрес: <span>г. Томск, пер. Карповский, д. 12</span></Title>
                <Stack classNames={{root: styles.map}}>
                    <iframe title="Our KoSmetichka address" src="https://maps.google.com/maps?q=56.4987602,84.9493298&z=15&output=embed" className={styles.iframe}></iframe>
                </Stack>
            </Stack>
            <Stack classNames={{root: styles.hero}} gap="md">
                <Title order={2} classNames={{root: styles.heroTitle}}>Остались вопросы? Пишите!</Title>
                <form key={appealType} onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack classNames={{root: styles.questionsForm}}>
                        <Select label="Выберите тип обращения" data={[
                            {value: "client", label: "Вопрос клиента"},
                            {value: "supplier", label: "Заявка поставщика"}
                        ]} classNames={classes} value={appealType} onChange={setAppealType}></Select>
                        {appealType === "client" && (
                            <TextInput {...form.register("fullName")} error={
                                form.formState.errors.fullName?.message
                            } label="Ваше ФИО" classNames={classes}></TextInput>
                        )}
                        {appealType === "supplier" && (
                            <TextInput {...form.register("companyName")} error={
                                form.formState.errors.companyName?.message
                            } label="Название компании" classNames={classes}></TextInput>
                        )}
                        <Group grow>
                            <TextInput type="email" {...form.register("contactEmail")} error={
                                form.formState.errors.contactEmail?.message
                            } label="Email" classNames={classes}></TextInput>
                            <Controller control={form.control} name="contactPhone" render={({field}) => (
                                <InputBase component={IMaskInput} mask="+7 (000) 000-00-00" placeholder="+7 (xxx) xxx-xx-xx" error={
                                    form.formState.errors.contactPhone?.message
                                } label="Номер телефона" {...field} classNames={classes}></InputBase>
                            )}></Controller>
                        </Group>
                        <Textarea label="Описание к обращению" {...form.register("content")} error={
                            form.formState.errors.content?.message
                        } classNames={classesArea}></Textarea>
                        <Group grow>
                            <Button type="submit" classNames={{root: styles.submitBtn}}>Отправить</Button>
                            <Button type="reset" variant="outline" classNames={{
                                root: styles.cancelBtn
                            }}>Отмена</Button>
                        </Group>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}