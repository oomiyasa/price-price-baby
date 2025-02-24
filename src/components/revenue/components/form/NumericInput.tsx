
import React from "react";
import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { Control } from "react-hook-form";
import { ChurnData } from "../../types";

interface NumericInputProps {
  control: Control<ChurnData>;
  name: keyof ChurnData;
  label: string;
  tooltip: string;
  placeholder: string;
  optional?: boolean;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  control,
  name,
  label,
  tooltip,
  placeholder,
  optional = false,
}) => {
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
};
