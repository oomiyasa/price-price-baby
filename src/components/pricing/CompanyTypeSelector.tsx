
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { companyTypes } from "@/constants/pricing";
import { CompanyType } from "@/types/pricing";

interface CompanyTypeSelectorProps {
  selectedType: CompanyType;
  onSelect: (type: CompanyType) => void;
}

export const CompanyTypeSelector = ({ selectedType, onSelect }: CompanyTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {companyTypes.map((type) => {
        const Icon = type.icon;
        return (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all hover:bg-gray-50 ${
              selectedType === type.id ? 'border-[#8B8B73] bg-gray-50' : 'border-gray-100'
            }`}
            onClick={() => onSelect(type.id as CompanyType)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-[#4A4A3F]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#4A4A3F]">{type.title}</h3>
                  <p className="text-sm text-[#6B6B5F]">{type.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
