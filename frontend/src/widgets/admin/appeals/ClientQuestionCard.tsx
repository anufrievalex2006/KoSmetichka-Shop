import { ClientQuestionDto } from "@/domain";
import { Divider, Group, Select, Stack, Text, Title } from "@mantine/core";
import styles from "@/shared/styles/admin/appeals.module.scss";
import { AppealRepo } from "@/data/repos/AppealRepo";
import { useUpdateAppealStatus } from "@/features/appeals";

interface Props {
    clientQuestion: ClientQuestionDto;
}

type AppealStatus = "NEW" | "IN_PROCESS" | "ACCEPTED" | "REJECTED";

const STATUS = [
    {value: "NEW", label: "Новый"},
    {value: "IN_PROCESS", label: "В процессе"},
    {value: "ACCEPTED", label: "Принят"},
    {value: "REJECTED", label: "Отклонен"}
];

const repo = new AppealRepo();

export const ClientQuestionCard = ({clientQuestion}: Props) => {
    const change = useUpdateAppealStatus(clientQuestion.id, repo);
    const onChange = (status: AppealStatus) => {
        if (status === null) return;
        change.mutate({status});
    }
    return (
        <Stack gap="sm" classNames={{root: styles.card}}>
            <Group justify="space-between">
                <Title order={3} classNames={{root: styles.subcardTitle}}>Автор: <strong>{clientQuestion.fullName}</strong></Title>
                <Select label="Статус" classNames={{
                    root: styles.field,
                    input: styles.fieldInput,
                    label: styles.fieldInputLabel,
                    error: styles.fieldInputError
                }} data={STATUS} value={clientQuestion.status} onChange={
                    (x) => onChange(x as AppealStatus)
                }></Select>
            </Group>
            <Divider size={2}></Divider>
            <Stack gap={5}>
                <Text classNames={{root: styles.entryTitle}}>Вопрос</Text>
                <Text classNames={{root: styles.question}}>{clientQuestion.content}</Text>
            </Stack>
            <Divider size={2}></Divider>
            <Stack gap={8}>
                <Title order={4} classNames={{root: styles.contactsH4}}>Контакты</Title>
                <Group grow>
                    <Stack gap={5}>
                        <Text classNames={{root: styles.entryTitle}}>Email</Text>
                        <Text classNames={{root: styles.entryValue}}>{clientQuestion.contactEmail}</Text>
                    </Stack>
                    <Stack gap={5}>
                        <Text classNames={{root: styles.entryTitle}}>Номер телефона</Text>
                        <Text classNames={{root: styles.entryValue}}>{clientQuestion.contactPhone}</Text>
                    </Stack>
                </Group>
                <Divider size={2}></Divider>
            </Stack>
        </Stack>
    )
}