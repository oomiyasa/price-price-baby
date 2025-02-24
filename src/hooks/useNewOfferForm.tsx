
import { useState } from "react";
import { CompanyType, PricingPath, PricingStrategy } from "@/types/pricing";

export const useNewOfferForm = () => {
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
      const newStep = step === 5 && pricingPath === "cost" ? 3 : step - 1;
      setStep(newStep);
      if (step === 5) setPricingStrategy(null);
      if (step === 3) setPricingPath(null);
      if (step === 2) setCompanyType(null);
    }
  };

  const handleCostBasedNext = () => {
    if (costPerUnit) {
      setStep(5);
      setPricingStrategy("similar");
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
    if (pricingPath === "cost" && newStep === 4) {
      setStep(3);
    } else {
      setStep(newStep);
    }
  };

  const getStepCount = () => {
    return pricingPath === "cost" ? 5 : 6;
  };

  return {
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
  };
};
