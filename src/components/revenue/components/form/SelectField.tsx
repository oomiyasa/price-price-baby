
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
import { ChurnData } from "../../types";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  control: Control<ChurnData>;
  name: keyof ChurnData;
  label: string;
  tooltip: string;
  options: SelectOption[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
  tooltip,
  options,
}) => {
  return (
    <FormFieldWrapper
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
