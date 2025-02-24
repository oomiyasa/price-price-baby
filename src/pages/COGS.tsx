
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { IndustrySelector } from "@/components/cogs/IndustrySelector";
import { CostsCalculator } from "@/components/cogs/CostsCalculator";
import { MarginAnalysis } from "@/components/cogs/MarginAnalysis";
import { MarginTarget } from "@/components/cogs/MarginTarget";
import { Recommendations } from "@/components/cogs/Recommendations";
import { COGSData, Industry } from "@/types/cogs";
import { industryConfigs } from "@/constants/cogsCalculator";
import { TooltipProvider } from "@/components/ui/tooltip";

const COGS = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<COGSData>({
    industry: "Software/SaaS" as Industry,
    revenue: 0,
    directCosts: {},
    targetMargin: 60
  });

  const updateData = (updates: Partial<COGSData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IndustrySelector
            selectedIndustry={data.industry}
            onSelect={(industry: Industry) => {
              updateData({ industry, directCosts: {} });
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <CostsCalculator
            data={data}
            config={industryConfigs.find(c => c.name === data.industry)!}
            onUpdate={updateData}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <MarginAnalysis
            data={data}
            config={industryConfigs.find(c => c.name === data.industry)!}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
            onUpdate={updateData}
          />
        );
      case 4:
        return (
          <MarginTarget
            data={data}
            onUpdate={updateData}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          <Recommendations
            data={data}
            config={industryConfigs.find(c => c.name === data.industry)!}
            onUpdate={updateData}
            onBack={() => setCurrentStep(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="container max-w-3xl mx-auto py-8">
        <Card>
          {renderStep()}
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default COGS;
