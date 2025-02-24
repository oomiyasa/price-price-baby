import { useState, KeyboardEvent, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, User, DollarSign, ChartBar, HelpCircle, ArrowDown, ArrowRight, Crown, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    title: "Lower Price Strategy",
    description: "Compete on price by offering lower rates than the market average. Best for high-efficiency operations and volume-based business models.",
    icon: ArrowDown,
    impact: "Potentially higher sales volume but lower margins. May need to optimize operations for cost efficiency.",
  },
  {
    id: "similar",
    title: "Market Match Strategy",
    description: "Align with market rates to compete on value and features rather than price. Ideal for established markets with differentiated offerings.",
    icon: ArrowRight,
    impact: "Balanced approach focusing on value proposition and service quality. Requires clear differentiation from competitors.",
  },
  {
    id: "premium",
    title: "Premium Strategy",
    description: "Position as a premium offering with higher prices than market average. Suitable for unique, high-value products or services.",
    icon: Crown,
    impact: "Higher margins but may require significant investment in quality, branding, and customer service.",
  },
];

const NewOffer = () => {
  const [step, setStep] = useState(1);
  const [companyType, setCompanyType] = useState<CompanyType>(null);
  const [pricingPath, setPricingPath] = useState<PricingPath>(null);
  const [pricingStrategy, setPricingStrategy] = useState<PricingStrategy>(null);
  const [costPerUnit, setCostPerUnit] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [competitorLow, setCompetitorLow] = useState("");
  const [competitorHigh, setCompetitorHigh] = useState("");
  const [demandTrend, setDemandTrend] = useState("stable");

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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="costPerUnit">Cost per Unit</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Include direct costs (materials, labor) and indirect costs (overhead, shipping). Exclude marketing and sales costs.
            </TooltipContent>
          </Tooltip>
        </div>
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
          className="border-[#8B8B73]"
          placeholder="0.00"
        />
      </div>
    </div>
  );

  const renderMarketBasedForm = () => (
    <div className="space-y-6">
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

  const renderPricingStrategySelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pricingStrategies.map((strategy) => (
        <motion.div
          key={strategy.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Card 
            className={`cursor-pointer transition-all hover:border-[#8B8B73] h-full ${
              pricingStrategy === strategy.id ? 'border-[#8B8B73] bg-[#F2FCE2]' : 'border-[#E8E8D8]'
            }`}
            onClick={() => handlePricingStrategySelect(strategy.id as PricingStrategy)}
          >
            <CardContent className="p-8 flex flex-col h-full items-center justify-between">
              <div className="flex flex-col items-center gap-6">
                <div className="p-3 rounded-full bg-[#F2FCE2]">
                  <strategy.icon className="h-8 w-8 text-[#8B8B73]" />
                </div>
                <h3 className="font-semibold text-[#4A4A3F] text-lg text-center">{strategy.title}</h3>
              </div>
              <div className="space-y-4 text-center">
                <p className="text-sm text-[#6B6B5F]">{strategy.description}</p>
                <div className="pt-4 border-t border-[#E8E8D8]">
                  <p className="text-sm text-[#8B8B73] font-medium">Impact</p>
                  <p className="text-sm text-[#6B6B5F]">{strategy.impact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E8E8D8] to-[#F2FCE2]/20">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-[#4A4A3F]">New Offer Pricing</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Card className="bg-white/80 border-[#E8E8D8] w-full max-w-3xl">
            <CardHeader className="text-center">
              <CardTitle className="text-[#4A4A3F]">
                {step === 1 ? "Select Your Company Type" : 
                 step === 2 ? "Choose Your Pricing Path" :
                 step === 3 ? (pricingPath === "cost" ? "Cost-Based Pricing Details" : "Market-Based Pricing Details") :
                 "Select Your Pricing Strategy"}
              </CardTitle>
              <CardDescription className="text-[#6B6B5F]">
                {step === 1 ? "Choose the option that best describes your business" : 
                 step === 2 ? "Select the pricing strategy that aligns with your goals" :
                 step === 3 ? (pricingPath === "cost" ? "Enter your costs to calculate optimal pricing" : "Enter market research data to determine competitive pricing") :
                 "Choose how you want to position your pricing relative to the market"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {companyTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Card 
                        className={`cursor-pointer transition-all hover:border-[#8B8B73] h-full ${
                          companyType === type.id ? 'border-[#8B8B73] bg-[#F2FCE2]' : 'border-[#E8E8D8]'
                        }`}
                        onClick={() => handleCompanySelect(type.id as CompanyType)}
                      >
                        <CardContent className="p-8 flex flex-col h-full items-center justify-between">
                          <div className="flex flex-col items-center gap-6">
                            <div className="p-3 rounded-full bg-[#F2FCE2]">
                              <type.icon className="h-8 w-8 text-[#8B8B73]" />
                            </div>
                            <h3 className="font-semibold text-[#4A4A3F] text-lg">{type.title}</h3>
                          </div>
                          <p className="text-sm text-[#6B6B5F] text-center mt-4">{type.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : step === 2 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pricingPaths.map((path) => (
                    <motion.div
                      key={path.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Card 
                        className={`cursor-pointer transition-all hover:border-[#8B8B73] h-full ${
                          pricingPath === path.id ? 'border-[#8B8B73] bg-[#F2FCE2]' : 'border-[#E8E8D8]'
                        }`}
                        onClick={() => handlePricingPathSelect(path.id as PricingPath)}
                      >
                        <CardContent className="p-8 flex flex-col h-full items-center justify-between">
                          <div className="flex flex-col items-center gap-6">
                            <div className="p-3 rounded-full bg-[#F2FCE2]">
                              <path.icon className="h-8 w-8 text-[#8B8B73]" />
                            </div>
                            <h3 className="font-semibold text-[#4A4A3F] text-lg">{path.title}</h3>
                          </div>
                          <p className="text-sm text-[#6B6B5F] text-center mt-4">{path.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="max-w-xl mx-auto">
                  {pricingPath === "cost" ? renderCostBasedForm() : renderMarketBasedForm()}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <Button
                    variant="outline"
                    className="border-[#8B8B73] text-[#4A4A3F] hover:bg-[#8B8B73] hover:text-white"
                    onClick={handlePreviousStep}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
                {step === 3 && (
                  <Button 
                    className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F] ml-auto"
                    onClick={() => setStep(4)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NewOffer;
