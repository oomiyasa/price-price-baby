
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { Control, Path } from "react-hook-form";

interface FormFieldWrapperProps<T extends Record<string, any>> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  tooltip: string;
  children: React.ReactNode;
}

export const FormFieldWrapper = <T extends Record<string, any>>({
  control,
  name,
  label,
  tooltip,
  children,
}: FormFieldWrapperProps<T>) => {
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
