import { AttributeDto } from "@/domain";
import styles from "@/shared/styles/admin/products.module.scss";
import { NumberInput, Select, TextInput } from "@mantine/core";

interface Props {
    attribute: AttributeDto;
    value: string;
    onChange: (x: string | null) => void;
}

const classes = {
    root: styles.field,
    input: styles.fieldInput,
    label: styles.fieldInputLabel,
    error: styles.fieldInputError
};

export const AttributeFilterField = ({attribute, value, onChange}: Props) => {
    const label = attribute.unit ? `${attribute.name}, ${attribute.unit}` : attribute.name;
    if (attribute.type === "ENUM") {
        return (
            <Select label={label} clearable classNames={classes} data={
                attribute.enumValues ?? []
            } value={value || null} onChange={onChange}></Select>
        );
    }
    if (attribute.type === "INT" || attribute.type === "FLOAT") {
        return (
            <NumberInput label={label} classNames={classes} value={
                value ? Number(value) : ""
            } onChange={
                (x) => onChange(x === "" ? null : String(x))
            }></NumberInput>
        );
    }
    return (
        <TextInput label={label} classNames={classes} value={value} onChange={
            (e) => onChange(e.currentTarget.value || null)
        }></TextInput>
    )
}