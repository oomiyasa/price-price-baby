
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { Control } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends Record<string, any>> {
  control: Control<T>;
  name: keyof T;
  label: string;
  tooltip: string;
  options: SelectOption[];
}

export const SelectField = <T extends Record<string, any>>({
  control,
  name,
  label,
  tooltip,
  options,
}: SelectFieldProps<T>) => {
  return (
    <FormFieldWrapper<T>
      control={control}
      name={name}
      label={label}
      tooltip={tooltip}
    >
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldWrapper>
  );
};
