
import React from "react";
import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { Control, Path } from "react-hook-form";

interface NumericInputProps<T extends Record<string, any>> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  tooltip: string;
  placeholder: string;
  optional?: boolean;
}

export function NumericInput<T extends Record<string, any>>({
  control,
  name,
  label,
  tooltip,
  placeholder,
  optional = false,
}: NumericInputProps<T>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      tooltip={tooltip}
    >
      <Input
        type="number"
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value ? Number(e.target.value) : undefined;
          return value;
        }}
      />
    </FormFieldWrapper>
  );
}
