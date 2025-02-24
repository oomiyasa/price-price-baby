
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { Control, Path } from "react-hook-form";

interface FormFieldWrapperProps<T extends Record<string, any>> {
  children: React.ReactNode;
  control: Control<T>;
  name: Path<T>;
  label: string;
  tooltip: string;
}

export function FormFieldWrapper<T extends Record<string, any>>({
  children,
  control,
  name,
  label,
  tooltip,
}: FormFieldWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormLabel className="text-[#4A4A3F]">{label}</FormLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button">
                  <HelpCircle className="h-4 w-4 text-[#8B8B73]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FormControl>
            {React.cloneElement(children as React.ReactElement, { ...field })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
