
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { Control } from "react-hook-form";
import { ChurnData } from "../../types";

interface FormFieldWrapperProps {
  control: Control<ChurnData>;
  name: keyof ChurnData;
  label: string;
  tooltip: string;
  children: React.ReactNode;
}

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  control,
  name,
  label,
  tooltip,
  children,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {label}
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          </FormLabel>
          <FormControl>
            {React.cloneElement(children as React.ReactElement, { ...field })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
