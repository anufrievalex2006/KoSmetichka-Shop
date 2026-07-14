import { Group, Loader, Image, Modal, Text, Stack, Title, Divider } from "@mantine/core";
import noImage from "@/assets/no-image.png";
import styles from "@/shared/styles/admin/brand.module.scss";
import { BrandRepo } from "@/data/repos/BrandRepo";
import { useBrandDetails } from "@/features/admin/brand";

interface Props {
    id: string;
    opened: boolean;
    onClose: () => void;
}

const repo = new BrandRepo();

export const BrandModal = ({id, opened, onClose}: Props) => {
    const {brand, isLoading} = useBrandDetails(id, repo);
    return (
        <Modal title="Информация о производителе" opened={opened} size="xl" onClose={onClose} centered>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="lg"></Loader>
                    <Text c="blue" fw={500} size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (!brand) ? (
                <Text c="red" fw={700} ta="center">Производитель не найден</Text>
            ) : (
                <Group gap="lg" align="flex-start">
                    <Image alt="Логотип производителя информация" className={
                        styles.logo
                    } src={brand.logoUrl || noImage}></Image>
                    <Stack flex={1} gap="lg">
                        <Title order={2} classNames={{root: styles.brandName}}>{brand.name}</Title>
                        <Divider flex={1}></Divider>
                        <Text classNames={{root: styles.brandDescr}}>{brand.description}</Text>
                    </Stack>
                </Group>
            )}
        </Modal>
    )
}