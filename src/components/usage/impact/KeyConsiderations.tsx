
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Consideration {
  label: string;
  value: string;
  unit: string;
  editable: boolean;
}

export const KeyConsiderations = () => {
  const [considerations, setConsiderations] = React.useState<Consideration[]>([
    { label: "Average Customer Lifetime", value: "3", unit: "years", editable: false },
    { label: "Usage Growth Rate", value: "15", unit: "%/year", editable: false },
    { label: "Customer Base Growth", value: "25", unit: "%/year", editable: false },
    { label: "Churn Rate Impact", value: "-2", unit: "%", editable: false },
  ]);

  const handleEdit = (index: number) => {
    setConsiderations(prev => prev.map((c, i) => 
      i === index ? { ...c, editable: true } : c
    ));
  };

  const handleSave = (index: number) => {
    setConsiderations(prev => prev.map((c, i) => 
      i === index ? { ...c, editable: false } : c
    ));
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleChange = (index: number, newValue: string) => {
    setConsiderations(prev => prev.map((c, i) => 
      i === index ? { ...c, value: newValue } : c
    ));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#4A4A3F]">Key Considerations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {considerations.map((consideration, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="text-sm text-[#6B6B5F]">{consideration.label}</Label>
              <div className="flex items-center gap-2 mt-1">
                {consideration.editable ? (
                  <Input
                    type="number"
                    value={consideration.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="max-w-[120px]"
                  />
                ) : (
                  <span className="text-lg font-medium">{consideration.value}</span>
                )}
                <span className="text-sm text-[#8B8B73]">{consideration.unit}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => consideration.editable ? handleSave(index) : handleEdit(index)}
              className="text-[#8B8B73] hover:text-[#4A4A3F] hover:bg-[#F0F0E8]"
            >
              {consideration.editable ? (
                <Check className="h-4 w-4" />
              ) : (
                <Edit2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
