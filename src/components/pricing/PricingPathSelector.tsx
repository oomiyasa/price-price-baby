
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { pricingPaths } from "@/constants/pricing";
import { PricingPath } from "@/types/pricing";

interface PricingPathSelectorProps {
  selectedPath: PricingPath;
  onSelect: (path: PricingPath) => void;
}

export const PricingPathSelector = ({ selectedPath, onSelect }: PricingPathSelectorProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {pricingPaths.map((path) => {
        const Icon = path.icon;
        return (
          <Card 
            key={path.id}
            className={`cursor-pointer transition-all hover:bg-gray-50 ${
              selectedPath === path.id ? 'border-[#8B8B73] bg-gray-50' : 'border-gray-100'
            }`}
            onClick={() => onSelect(path.id as PricingPath)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-[#4A4A3F]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#4A4A3F]">{path.title}</h3>
                  <p className="text-sm text-[#6B6B5F]">{path.description}</p>
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
