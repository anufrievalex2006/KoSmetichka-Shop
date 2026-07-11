import { AppealRepo } from "@/data/repos/AppealRepo";
import { useAppealsList } from "@/features/appeals";
import styles from "@/shared/styles/admin/appeals.module.scss";
import { Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { ClientQuestionCard } from "./ClientQuestionCard";
import { ClientQuestionDto, SupplierRequestDto } from "@/domain";
import { SupplierRequestCard } from "./SupplierRequestCard";

const repo = new AppealRepo();

export const AdminAppealsMain = () => {
    const {appeals, isLoading} = useAppealsList(repo);

    const clientQuestions = appeals?.filter(a => a.appealType === "CLIENT_QUESTION");
    const supplierRequests = appeals?.filter(a => a.appealType === "SUPPLIER_REQUEST");
    return (
        <Stack flex={1} gap={45}>
            <Title order={1} classNames={{root: styles.pageTitle}}>Все обращения</Title>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (!appeals) ? (
                <Text c="red" fw={700} size="lg" ta="center">Ошибка загрузки обращений</Text>
            ) : (appeals.length === 0) ? (
                <Text c="blue" fw={500} size="lg" ta="center">Пока нет обращений</Text>
            ) : (
                <Stack gap="xl">
                    {!clientQuestions ? (
                        <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки вопросов клиентов</Text>
                    ) : (clientQuestions.length === 0) ? (
                        <Text c="blue" fw={500} size="lg" ta="center">Пока нет вопросов клиентов</Text>
                    ) : (
                        <Stack gap="lg" classNames={{root: styles.clientCard}}>
                            <Title order={2} classNames={{root: styles.cardTitle}}>Вопросы клиентов (<b>{clientQuestions.filter(c => c.status === "NEW").length}</b> новых)</Title>
                            <Stack gap="md">
                                {clientQuestions.map(c => (
                                    <ClientQuestionCard key={c.id} clientQuestion={c as ClientQuestionDto}></ClientQuestionCard>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                    <Divider size={4}></Divider>
                    {!supplierRequests ? (
                        <Text c="red" fw={700} ta="center" size="lg">Ошибка загрузки заявок поставщиков</Text>
                    ) : supplierRequests.length === 0 ? (
                        <Text c="blue" fw={500} size="lg" ta="center">Пока нет заявок поставщиков</Text>
                    ) : (
                        <Stack gap="lg" classNames={{root: styles.supplierCard}}>
                            <Title order={2} classNames={{root: styles.cardTitle}}>Заявки поставщиков (<b>{supplierRequests.filter(s => s.status === "NEW").length}</b> новых)</Title>
                            <Stack gap="md">
                                {supplierRequests.map(s => (
                                    <SupplierRequestCard key={s.id} supplierRequest={s as SupplierRequestDto}></SupplierRequestCard>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            )}
        </Stack>
    )
}