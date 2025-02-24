
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';

interface Consideration {
  label: string;
  value: string;
  unit: string;
  editable: boolean;
  tooltip: string;
}

export const KeyConsiderations = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const [considerations, setConsiderations] = React.useState<Consideration[]>([
    { 
      label: "Average Customer Lifetime", 
      value: formData?.customerLifetime || "3", 
      unit: "years", 
      editable: false,
      tooltip: "The expected duration a customer will continue using your service. A longer lifetime value indicates stronger customer retention and higher long-term revenue potential."
    },
    { 
      label: "Usage Growth Rate", 
      value: formData?.growthRate || "15", 
      unit: "%/year", 
      editable: false,
      tooltip: "Expected annual increase in usage per customer. Higher usage growth often indicates increasing customer reliance on your service and potential for revenue expansion."
    },
    { 
      label: "Customer Base Growth", 
      value: formData?.customerGrowth || "25", 
      unit: "%/year", 
      editable: false,
      tooltip: "Projected annual growth in number of customers. Consider your market size, sales pipeline, and historical acquisition rates when adjusting this value."
    },
    { 
      label: "Churn Rate Impact", 
      value: formData?.churnRate || "-2", 
      unit: "%", 
      editable: false,
      tooltip: "Expected change in customer churn rate. A negative value suggests improved retention. Usage-based pricing often reduces churn by aligning cost with perceived value."
    },
  ]);

  useEffect(() => {
    if (formData) {
      setConsiderations([
        { 
          label: "Average Customer Lifetime", 
          value: formData.customerLifetime || "3", 
          unit: "years", 
          editable: false,
          tooltip: "The expected duration a customer will continue using your service. A longer lifetime value indicates stronger customer retention and higher long-term revenue potential."
        },
        { 
          label: "Usage Growth Rate", 
          value: formData.growthRate || "15", 
          unit: "%/year", 
          editable: false,
          tooltip: "Expected annual increase in usage per customer. Higher usage growth often indicates increasing customer reliance on your service and potential for revenue expansion."
        },
        { 
          label: "Customer Base Growth", 
          value: formData.customerGrowth || "25", 
          unit: "%/year", 
          editable: false,
          tooltip: "Projected annual growth in number of customers. Consider your market size, sales pipeline, and historical acquisition rates when adjusting this value."
        },
        { 
          label: "Churn Rate Impact", 
          value: formData.churnRate || "-2", 
          unit: "%", 
          editable: false,
          tooltip: "Expected change in customer churn rate. A negative value suggests improved retention. Usage-based pricing often reduces churn by aligning cost with perceived value."
        },
      ]);
    }
  }, [formData]);

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
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-[#4A4A3F]">Key Considerations</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            These factors significantly influence your pricing model's success. Adjust them based on your market research and business goals.
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {considerations.map((consideration, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label className="text-sm text-[#6B6B5F]">{consideration.label}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {consideration.tooltip}
                  </TooltipContent>
                </Tooltip>
              </div>
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
