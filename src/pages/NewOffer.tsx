
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CompanyTypeSelector } from "@/components/pricing/CompanyTypeSelector";
import { PricingPathSelector } from "@/components/pricing/PricingPathSelector";
import { PricingStrategySelector } from "@/components/pricing/PricingStrategySelector";
import { MarginSelector } from "@/components/pricing/MarginSelector";
import { CostBasedForm, MarketBasedForm } from "@/components/pricing/PricingForms";
import { PricingRecommendation } from "@/components/pricing/PricingRecommendation";
import { StepHeader } from "@/components/pricing/StepHeader";
import { StepNavigation } from "@/components/pricing/StepNavigation";
import { useNewOfferForm } from "@/hooks/useNewOfferForm";

const NewOffer = () => {
  const {
    step,
    companyType,
    pricingPath,
    pricingStrategy,
    costPerUnit,
    marketPrice,
    competitorLow,
    competitorHigh,
    desiredMargin,
    setCostPerUnit,
    setMarketPrice,
    setCompetitorLow,
    setCompetitorHigh,
    setDesiredMargin,
    handleCompanySelect,
    handlePricingPathSelect,
    handlePricingStrategySelect,
    handlePreviousStep,
    handleCostBasedNext,
    handleMarketBasedNext,
    handleMarginNext,
    handleEditStep,
    getStepCount,
  } = useNewOfferForm();

  console.log('Current step:', step); // Debug log

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <motion.div
            key={step} // Add key prop to force re-render on step change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-4"
          >
            <Card className="bg-white border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <StepHeader step={step} pricingPath={pricingPath} />
                {step === 1 && (
                  <CompanyTypeSelector 
                    selectedType={companyType} 
                    onSelect={handleCompanySelect} 
                  />
                )}
                {step === 2 && (
                  <PricingPathSelector 
                    selectedPath={pricingPath} 
                    onSelect={handlePricingPathSelect} 
                  />
                )}
                {step === 3 && pricingPath === "cost" && (
                  <CostBasedForm 
                    costPerUnit={costPerUnit}
                    onCostChange={setCostPerUnit}
                  />
                )}
                {step === 3 && pricingPath === "market" && (
                  <MarketBasedForm 
                    marketPrice={marketPrice}
                    competitorLow={competitorLow}
                    competitorHigh={competitorHigh}
                    onMarketPriceChange={setMarketPrice}
                    onCompetitorLowChange={setCompetitorLow}
                    onCompetitorHighChange={setCompetitorHigh}
                  />
                )}
                {step === 4 && (
                  <PricingStrategySelector 
                    selectedStrategy={pricingStrategy}
                    onSelect={handlePricingStrategySelect}
                  />
                )}
                {step === 5 && (
                  <MarginSelector 
                    value={desiredMargin}
                    onChange={setDesiredMargin}
                  />
                )}
                {step === 6 && (
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
                
                <StepNavigation 
                  step={step}
                  pricingPath={pricingPath}
                  getStepCount={getStepCount}
                  handlePreviousStep={handlePreviousStep}
                  handleCostBasedNext={handleCostBasedNext}
                  handleMarketBasedNext={handleMarketBasedNext}
                  handleMarginNext={handleMarginNext}
                  setStep={(newStep) => handleEditStep(newStep)}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <footer className="text-center p-4 text-sm text-gray-600 border-t mt-auto">
          Price Price Baby | Oomiyasa LLC
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default NewOffer;
