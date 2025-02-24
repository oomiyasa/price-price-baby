
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CompanyType, PricingPath, PricingStrategy } from "@/types/pricing";
import { CompanyTypeSelector } from "@/components/pricing/CompanyTypeSelector";
import { PricingPathSelector } from "@/components/pricing/PricingPathSelector";
import { PricingStrategySelector } from "@/components/pricing/PricingStrategySelector";
import { MarginSelector } from "@/components/pricing/MarginSelector";
import { CostBasedForm, MarketBasedForm } from "@/components/pricing/PricingForms";
import { PricingRecommendation } from "@/components/pricing/PricingRecommendation";

const NewOffer = () => {
  const [step, setStep] = useState(1);
  const [companyType, setCompanyType] = useState<CompanyType>(null);
  const [pricingPath, setPricingPath] = useState<PricingPath>(null);
  const [pricingStrategy, setPricingStrategy] = useState<PricingStrategy>(null);
  const [costPerUnit, setCostPerUnit] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [competitorLow, setCompetitorLow] = useState("");
  const [competitorHigh, setCompetitorHigh] = useState("");
  const [desiredMargin, setDesiredMargin] = useState(30);

  const handleCompanySelect = (type: CompanyType) => {
    setCompanyType(type);
    setStep(2);
  };

  const handlePricingPathSelect = (path: PricingPath) => {
    setPricingPath(path);
    setStep(3);
  };

  const handlePricingStrategySelect = (strategy: PricingStrategy) => {
    setPricingStrategy(strategy);
    setStep(5);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 5) setPricingStrategy(null);
      if (step === 3) setPricingPath(null);
      if (step === 2) setCompanyType(null);
    }
  };

  const handleCostBasedNext = () => {
    if (costPerUnit) {
      setStep(4);
    }
  };

  const handleMarketBasedNext = () => {
    if (marketPrice) {
      setStep(4);
    }
  };

  const handleMarginNext = () => {
    setStep(6);
  };

  const handleEditStep = (newStep: number) => {
    setStep(newStep);
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
                  {step === 6 ? "Your Pricing Recommendation" :
                   step === 5 ? "Target Gross Profit Margin" : 
                   step === 1 ? "Select Your Company Type" : 
                   step === 2 ? "Choose Your Pricing Path" :
                   step === 3 ? (pricingPath === "cost" ? "Cost-Based Pricing Details" : "Market Research Details") :
                   "Select Your Pricing Strategy"}
                </CardTitle>
                <CardDescription className="text-[#6B6B5F]">
                  {step === 6 ? "Based on your inputs, here's our recommended pricing strategy" :
                   step === 5 ? "Set your target margin based on your business goals and industry benchmarks" : 
                   step === 1 ? "Choose the option that best describes your business" : 
                   step === 2 ? "Select the pricing strategy that aligns with your goals" :
                   step === 3 ? (pricingPath === "cost" ? "Enter your costs to calculate optimal pricing" : "Enter market research data to determine competitive pricing") :
                   "Choose how you want to position your pricing relative to the market"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {step === 1 ? (
                  <CompanyTypeSelector 
                    selectedType={companyType} 
                    onSelect={handleCompanySelect} 
                  />
                ) : step === 2 ? (
                  <PricingPathSelector 
                    selectedPath={pricingPath} 
                    onSelect={handlePricingPathSelect} 
                  />
                ) : step === 3 ? (
                  pricingPath === "cost" ? (
                    <CostBasedForm 
                      costPerUnit={costPerUnit}
                      onCostChange={setCostPerUnit}
                    />
                  ) : (
                    <MarketBasedForm 
                      marketPrice={marketPrice}
                      competitorLow={competitorLow}
                      competitorHigh={competitorHigh}
                      onMarketPriceChange={setMarketPrice}
                      onCompetitorLowChange={setCompetitorLow}
                      onCompetitorHighChange={setCompetitorHigh}
                    />
                  )
                ) : step === 4 ? (
                  <PricingStrategySelector 
                    selectedStrategy={pricingStrategy}
                    onSelect={handlePricingStrategySelect}
                  />
                ) : step === 5 ? (
                  <MarginSelector 
                    value={desiredMargin}
                    onChange={setDesiredMargin}
                  />
                ) : (
                  <PricingRecommendation 
                    companyType={companyType}
                    pricingPath={pricingPath}
                    pricingStrategy={pricingStrategy}
                    costPerUnit={costPerUnit}
                    marketPrice={marketPrice}
                    competitorLow={competitorLow}
                    competitorHigh={competitorHigh}
                    desiredMargin={desiredMargin}
                    onEditStep={handleEditStep}
                  />
                )}
                
                <div className="mt-6 flex justify-between">
                  {step > 1 && step < 6 && (
                    <Button
                      variant="outline"
                      className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                      onClick={handlePreviousStep}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {(step === 3 || step === 4 || step === 5) && (
                    <Button 
                      className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F] ml-auto"
                      onClick={
                        step === 3 ? (pricingPath === "cost" ? handleCostBasedNext : handleMarketBasedNext) :
                        step === 4 ? () => setStep(5) :
                        handleMarginNext
                      }
                    >
                      {step === 5 ? "View Recommendation" : "Next"}
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

export default NewOffer;
