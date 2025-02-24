import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrentPriceForm } from "@/components/repricing/CurrentPriceForm";
import { PerformanceForm } from "@/components/repricing/PerformanceForm";
import { MarketChangesForm } from "@/components/repricing/MarketChangesForm";
import { DifferentiationForm } from "@/components/repricing/DifferentiationForm";
import { SalesPerformance } from "@/types/repricing";

interface Feature {
  id: string;
  name: string;
  checked: boolean;
}

const defaultFeatures: Feature[] = [
  { id: "quality", name: "Superior Quality", checked: false },
  { id: "service", name: "Better Service", checked: false },
  { id: "features", name: "More Features", checked: false },
  { id: "delivery", name: "Faster Delivery", checked: false },
  { id: "support", name: "24/7 Support", checked: false },
  { id: "customization", name: "Customization Options", checked: false },
  { id: "warranty", name: "Better Warranty", checked: false },
  { id: "integration", name: "Easy Integration", checked: false }
];

const Repricing = () => {
  const [step, setStep] = useState(1);
  const [currentPrice, setCurrentPrice] = useState("");
  const [historicalPrices, setHistoricalPrices] = useState<string[]>([]);
  const [salesPerformance, setSalesPerformance] = useState<SalesPerformance>(0);
  const [competitorPrices, setCompetitorPrices] = useState<"increased" | "decreased" | "mixed" | "unchanged" | null>(null);
  const [marketDemand, setMarketDemand] = useState<"growing" | "shrinking" | "stable" | null>(null);
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);
  const [valueProposition, setValueProposition] = useState("");
  const [uniqueness, setUniqueness] = useState<"low" | "medium" | "high">("medium");
  const [valuePerception, setValuePerception] = useState(50);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Current Price Analysis";
      case 2:
        return "Performance Analysis";
      case 3:
        return "Market Changes";
      case 4:
        return "Differentiation Analysis";
      case 5:
        return "Recommendations";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Let's analyze your current pricing position";
      case 2:
        return "Review your product's performance metrics";
      case 3:
        return "Understand recent market changes and trends";
      case 4:
        return "Assess your competitive advantages";
      case 5:
        return "Review our pricing recommendations";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-4"
          >
            <Card className="bg-white border-gray-100 shadow-sm">
              <CardHeader className="text-center border-b border-gray-100">
                <CardTitle className="text-[#4A4A3F] text-2xl">
                  {getStepTitle()}
                </CardTitle>
                <CardDescription className="text-[#6B6B5F]">
                  {getStepDescription()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {step === 1 && (
                  <CurrentPriceForm
                    currentPrice={currentPrice}
                    onCurrentPriceChange={setCurrentPrice}
                    historicalPrices={historicalPrices}
                    onHistoricalPricesChange={setHistoricalPrices}
                  />
                )}
                {step === 2 && (
                  <PerformanceForm
                    salesPerformance={salesPerformance}
                    onSalesPerformanceChange={setSalesPerformance}
                  />
                )}
                {step === 3 && (
                  <MarketChangesForm
                    competitorPrices={competitorPrices}
                    onCompetitorPricesChange={setCompetitorPrices}
                    marketDemand={marketDemand}
                    onMarketDemandChange={setMarketDemand}
                  />
                )}
                {step === 4 && (
                  <DifferentiationForm
                    selectedFeatures={features}
                    onFeatureChange={setFeatures}
                    valueProposition={valueProposition}
                    onValuePropositionChange={setValueProposition}
                    uniqueness={uniqueness}
                    onUniquenessChange={setUniqueness}
                    valuePerception={valuePerception}
                    onValuePerceptionChange={setValuePerception}
                  />
                )}
                
                <div className="mt-6 flex justify-between">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                      onClick={handlePrevious}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {step < 5 && (
                    <Button 
                      className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F] ml-auto"
                      onClick={handleNext}
                      disabled={step === 1 && !currentPrice}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <footer className="py-4 px-6 text-center text-gray-400 text-sm">
          Price Price Baby | Oomiyasa LLC
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default Repricing;
