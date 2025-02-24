
import { CardHeader, CardContent } from "@/components/ui/card";
import { Industry } from "@/types/cogs";
import { industryConfigs } from "@/constants/cogsCalculator";
import { Building2, BookOpen, Factory, Store, Film, Building, Heart } from "lucide-react";

interface IndustrySelectorProps {
  selectedIndustry: Industry;
  onSelect: (industry: Industry) => void;
}

const getIndustryIcon = (industry: Industry) => {
  switch (industry) {
    case "Software/SaaS":
      return Building2;
    case "Services":
      return BookOpen;
    case "Manufacturing":
      return Factory;
    case "Retail":
      return Store;
    case "Content/Media":
      return Film;
    case "Other":
      return Building;
    case "Healthcare":
      return Heart;
  }
};

export const IndustrySelector = ({
  selectedIndustry,
  onSelect,
}: IndustrySelectorProps) => {
  return (
    <>
      <CardHeader className="text-center border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-[#4A4A3F]">Select Your Industry</h2>
        <p className="text-[#6B6B5F]">Choose your industry to get started with COGS calculation</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          {industryConfigs.map((industry) => {
            const Icon = getIndustryIcon(industry.name);
            return (
              <button
                key={industry.name}
                onClick={() => onSelect(industry.name)}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  selectedIndustry === industry.name
                    ? "border-[#8B8B73] bg-gray-50"
                    : "border-gray-200 hover:border-[#8B8B73] hover:bg-gray-50"
                }`}
              >
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Icon className="h-6 w-6 text-[#4A4A3F]" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-[#4A4A3F]">{industry.name}</div>
                  <div className="text-sm text-[#6B6B5F]">
                    {industry.directCosts.length} cost categories
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </>
  );
};
