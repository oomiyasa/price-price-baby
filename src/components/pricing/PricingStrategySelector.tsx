
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { pricingStrategies } from "@/constants/pricing";
import { PricingStrategy } from "@/types/pricing";

interface PricingStrategySelectorProps {
  selectedStrategy: PricingStrategy;
  onSelect: (strategy: PricingStrategy) => void;
}

export const PricingStrategySelector = ({ selectedStrategy, onSelect }: PricingStrategySelectorProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {pricingStrategies.map((strategy) => {
        const Icon = strategy.icon;
        return (
          <Card 
            key={strategy.id}
            className={`cursor-pointer transition-all hover:bg-gray-50 ${
              selectedStrategy === strategy.id ? 'border-[#8B8B73] bg-gray-50' : 'border-gray-100'
            }`}
            onClick={() => onSelect(strategy.id as PricingStrategy)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-[#4A4A3F]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#4A4A3F]">{strategy.title}</h3>
                  <p className="text-sm text-[#6B6B5F]">{strategy.description}</p>
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
