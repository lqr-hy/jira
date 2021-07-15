import { Select } from "antd";
import React from "react";

type DefaultSelectProps = React.ComponentProps<typeof Select>;

interface SelectProps
  extends Omit<DefaultSelectProps, "value" | "options" | "onChange"> {
  value: number | string | null | undefined;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
  onChange: (value?: number) => void;
}

export const IdSelect = (props: SelectProps) => {
  const { value, defaultOptionName, options, onChange } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export const toNumber = (value: unknown) =>
  isNaN(Number(value)) ? 0 : Number(value);
