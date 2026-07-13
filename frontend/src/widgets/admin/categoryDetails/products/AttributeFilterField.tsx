import { AttributeDto, AttributeFilterValue } from "@/domain";
import styles from "@/shared/styles/admin/products.module.scss";
import { Group, NumberInput, Select, TextInput } from "@mantine/core";

interface Props {
    attribute: AttributeDto;
    value: AttributeFilterValue | undefined;
    onChange: (x: AttributeFilterValue | undefined) => void;
}

const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

export const AttributeFilterField = ({attribute, value, onChange}: Props) => {
    const label = attribute.unit ? `${attribute.name}, ${attribute.unit}` : attribute.name;
    const emitOrClear = (next: AttributeFilterValue) => {
        onChange((!next.value && !next.min && !next.max) ? undefined : next);
    }
    if (attribute.type === "ENUM") {
        return (
            <Select label={label} clearable classNames={classes} data={
                attribute.enumValues ?? []
            } value={value?.value || null} onChange={
                (x) => emitOrClear({value: x ?? undefined})
            }></Select>
        );
    }
    if (attribute.type === "INT" || attribute.type === "FLOAT") {
        return (
            <Group grow gap="sm">
                <NumberInput label={`${label}, от`} classNames={classes} value={
                    value?.min ?? ""
                } onChange={
                    (x) => emitOrClear({...value, min: x === "" ? undefined : String(x)})
                }></NumberInput>
                <NumberInput label={`${label}, до`} classNames={classes} value={
                    value?.max ?? ""
                } onChange={
                    (x) => emitOrClear({...value, max: x === "" ? undefined : String(x)})
                }></NumberInput>
            </Group>
        );
    }
    return (
        <TextInput label={label} classNames={classes} value={value?.value ?? ""} onChange={
            (e) => emitOrClear({
                value: e.currentTarget.value || undefined
            })
        }></TextInput>
    )
}