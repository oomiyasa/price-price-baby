import { useState, KeyboardEvent, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, User, DollarSign, ChartBar, HelpCircle, ArrowDown, ArrowRight, ArrowUp, Crown, ArrowLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CompanyType = "SMB" | "Growth" | "Enterprise" | null;
type PricingPath = "cost" | "market" | null;
type PricingStrategy = "lower" | "similar" | "premium" | null;

const companyTypes = [
  {
    id: "SMB",
    title: "Small Business",
    description: "Solo entrepreneurs and small teams looking to establish pricing for their first offers",
    icon: User,
  },
  {
    id: "Growth",
    title: "Growth Company",
    description: "Established businesses looking to scale their pricing strategy and optimize revenue",
    icon: Building,
  },
  {
    id: "Enterprise",
    title: "Enterprise",
    description: "Large organizations with complex pricing needs and multiple stakeholders",
    icon: Users,
  },
];

const pricingPaths = [
  {
    id: "cost",
    title: "Cost-Based Pricing",
    description: "Calculate your price based on your costs plus desired profit margin. Best for products/services with clear cost structures.",
    icon: DollarSign,
  },
  {
    id: "market",
    title: "Market-Based Pricing",
    description: "Set your price based on market research and competitor analysis. Ideal for established markets with clear competitors.",
    icon: ChartBar,
  },
];

const pricingStrategies = [
  {
    id: "lower",
    title: "Lower than competitors",
    description: "Gain market share through competitive pricing",
    icon: ArrowDown,
  },
  {
    id: "similar",
    title: "Similar to competitors",
    description: "Match market expectations and compete on value",
    icon: ArrowRight,
  },
  {
    id: "premium",
    title: "Premium pricing",
    description: "Position as a high-value, premium solution",
    icon: ArrowUp,
  },
];

const industryBenchmarks = {
  SMB: {
    low: 15,
    average: 25,
    high: 35,
  },
  Growth: {
    low: 20,
    average: 35,
    high: 45,
  },
  Enterprise: {
    low: 25,
    average: 40,
    high: 55,
  },
};

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
    setStep(4);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 4) setPricingStrategy(null);
      if (step === 3) setPricingPath(null);
      if (step === 2) setCompanyType(null);
    }
  };

  const renderCostBasedForm = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h3 className="text-xl font-medium text-[#4A4A3F] mb-2">Enter your total cost per unit/service</h3>
        <div className="space-y-4">
          <Input
            id="costPerUnit"
            type="text"
            value={costPerUnit}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d.]/g, '');
              if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setCostPerUnit(value);
              }
            }}
            className="border-[#8B8B73] text-lg"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );

  const renderMarketBasedForm = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="marketPrice">Average Market Price</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              The typical price point for similar products/services in your market
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="marketPrice"
          type="text"
          value={marketPrice}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d.]/g, '');
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setMarketPrice(value);
            }
          }}
          className="border-[#8B8B73]"
          placeholder="0.00"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="competitorLow">Lowest Competitor Price</Label>
          <Input
            id="competitorLow"
            type="text"
            value={competitorLow}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d.]/g, '');
              if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setCompetitorLow(value);
              }
            }}
            className="border-[#8B8B73]"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="competitorHigh">Highest Competitor Price</Label>
          <Input
            id="competitorHigh"
            type="text"
            value={competitorHigh}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d.]/g, '');
              if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setCompetitorHigh(value);
              }
            }}
            className="border-[#8B8B73]"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );

  const calculateRecommendedPrice = () => {
    if (pricingPath === "cost" && costPerUnit) {
      const cost = parseFloat(costPerUnit);
      const marginMultiplier = (100 + desiredMargin) / 100;
      return (cost * marginMultiplier).toFixed(2);
    }
    return "0.00";
  };

  const renderMarginSelector = () => {
    const benchmarks = companyType ? industryBenchmarks[companyType] : { low: 20, average: 35, high: 45 };
    const recommendedPrice = calculateRecommendedPrice();

    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div>
          <h3 className="text-xl font-medium text-[#4A4A3F] mb-4">Set Your Target Margin</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Target Margin: {desiredMargin}%</Label>
                <span className="text-sm text-[#6B6B5F]">Recommended Price: ${recommendedPrice}</span>
              </div>
              <Slider
                value={[desiredMargin]}
                onValueChange={(value) => setDesiredMargin(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-[#4A4A3F]">Industry Benchmarks</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-[#6B6B5F]">Low</div>
                  <div className="font-medium text-[#4A4A3F]">{benchmarks.low}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-[#6B6B5F]">Average</div>
                  <div className="font-medium text-[#4A4A3F]">{benchmarks.average}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-[#6B6B5F]">High</div>
                  <div className="font-medium text-[#4A4A3F]">{benchmarks.high}%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <HelpCircle className="h-4 w-4 text-[#8B8B73]" />
                    <span className="text-sm text-[#6B6B5F]">What's a good margin?</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Industry benchmarks are based on historical data and market research. Your optimal margin may vary based on your specific costs, market position, and growth strategy.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
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
                {step === 1 ? "Select Your Company Type" : 
                 step === 2 ? "Choose Your Pricing Path" :
                 step === 3 ? (pricingPath === "cost" ? "Cost-Based Pricing Details" : "Market-Based Pricing Details") :
                 step === 4 ? "Select Your Pricing Strategy" :
                 "Set Your Target Margin"}
              </CardTitle>
              <CardDescription className="text-[#6B6B5F]">
                {step === 1 ? "Choose the option that best describes your business" : 
                 step === 2 ? "Select the pricing strategy that aligns with your goals" :
                 step === 3 ? (pricingPath === "cost" ? "Enter your costs to calculate optimal pricing" : "Enter market research data to determine competitive pricing") :
                 step === 4 ? "Choose how you want to position your pricing relative to the market" :
                 "Define your target profit margin and see real-time calculations"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {step === 1 ? (
                <div className="grid grid-cols-1 gap-4">
                  {companyTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Card 
                        key={type.id}
                        className={`cursor-pointer transition-all hover:bg-gray-50 ${
                          companyType === type.id ? 'border-[#8B8B73] bg-gray-50' : 'border-gray-100'
                        }`}
                        onClick={() => handleCompanySelect(type.id as CompanyType)}
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
              ) : step === 2 ? (
                <div className="grid grid-cols-1 gap-4">
                  {pricingPaths.map((path) => {
                    const Icon = path.icon;
                    return (
                      <Card 
                        key={path.id}
                        className={`cursor-pointer transition-all hover:bg-gray-50 ${
                          pricingPath === path.id ? 'border-[#8B8B73] bg-gray-50' : 'border-gray-100'
                        }`}
                        onClick={() => handlePricingPathSelect(path.id as PricingPath)}
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
              ) : step === 3 ? (
                pricingPath === "cost" ? renderCostBasedForm() : renderMarketBasedForm()
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {pricingStrategies.map((strategy) => {
                    const Icon = strategy.icon;
                    return (
                      <Card 
                        key={strategy.id}
                        className={`cursor-pointer transition-all hover:bg-gray-50 ${
                          pricingStrategy === strategy.id ? 'border-[#8B8B73] bg-gray-50' : 'border-gray-100'
                        }`}
                        onClick={() => handlePricingStrategySelect(strategy.id as PricingStrategy)}
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
              )}
              
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <Button
                    variant="outline"
                    className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                    onClick={handlePreviousStep}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
                {(step === 3 || step === 4) && (
                  <Button 
                    className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F] ml-auto"
                    onClick={() => setStep(step + 1)}
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

      <footer className="py-4 px-6 text-center text-gray-400 text-sm mt-auto">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};

export default NewOffer;
