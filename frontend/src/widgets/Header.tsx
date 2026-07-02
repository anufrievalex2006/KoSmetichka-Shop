import styles from "@/shared/styles/header.module.scss";
import { Group, Title } from "@mantine/core";

export const Header = () => {
    return (
        <Group classNames={{root: styles.header}}>
            <Title order={1} classNames={{root: styles.shopName}}>Ко<span>S</span>метичка</Title>
        </Group>
    )
}