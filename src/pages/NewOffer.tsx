import { useState, KeyboardEvent, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, User, DollarSign, ChartBar, HelpCircle, ArrowDown, ArrowRight, ArrowUp, Crown, ArrowLeft } from "lucide-react";
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

const industryGuidelines = [
  {
    id: "software",
    title: "Software/Digital Products",
    description: "Click for detailed cost breakdown",
    guidance: "Include: Development costs, hosting, maintenance, customer support, licensing fees. Consider: Updates and feature development costs."
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Click for detailed cost breakdown",
    guidance: "Include: Raw materials, labor, equipment depreciation, overhead costs, storage. Consider: Waste reduction and quality control costs."
  },
  {
    id: "services",
    title: "Professional Services",
    description: "Click for detailed cost breakdown",
    guidance: "Include: Labor hours, overhead, software licenses, equipment. Consider: Training and professional development costs."
  },
  {
    id: "retail",
    title: "Retail/E-commerce",
    description: "Click for detailed cost breakdown",
    guidance: "Include: Product cost, shipping, handling, storage, platform fees. Consider: Returns and customer service costs."
  }
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
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

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

  const handleMarketFormSubmit = () => {
    if (marketPrice && competitorLow && competitorHigh) {
      setStep(4);
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

      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#4A4A3F] mb-2">Select your industry for cost guidance:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryGuidelines.map((industry) => (
            <Tooltip key={industry.id}>
              <TooltipTrigger asChild>
                <Card 
                  className={`cursor-pointer transition-all hover:border-[#8B8B73] ${
                    selectedIndustry === industry.id ? 'border-[#8B8B73] bg-[#F2FCE2]' : 'border-[#E8E8D8]'
                  }`}
                  onClick={() => setSelectedIndustry(industry.id)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium text-[#4A4A3F]">{industry.title}</h4>
                    <p className="text-sm text-[#6B6B5F]">{industry.description}</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3">
                <p className="text-sm">{industry.guidance}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6B6B5F] bg-[#F2FCE2] p-3 rounded-md">
          <HelpCircle className="h-4 w-4" />
          <span>Hover over or tap an industry for detailed cost guidance</span>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          className="border-[#8B8B73] text-[#4A4A3F] hover:bg-[#8B8B73] hover:text-white"
          onClick={handlePreviousStep}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button 
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
          onClick={() => setStep(4)}
        >
          Next
        </Button>
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

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          className="border-[#8B8B73] text-[#4A4A3F] hover:bg-[#8B8B73] hover:text-white"
          onClick={handlePreviousStep}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button 
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
          onClick={handleMarketFormSubmit}
          disabled={!marketPrice || !competitorLow || !competitorHigh}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderPricingStrategySelection = () => (
    <div className="space-y-4 max-w-xl mx-auto">
      <h3 className="text-xl font-medium text-[#4A4A3F] mb-6">
        How do you want to position your pricing?
      </h3>
      {pricingStrategies.map((strategy) => (
        <motion.div
          key={strategy.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className={`cursor-pointer transition-all hover:border-[#8B8B73] ${
              pricingStrategy === strategy.id ? 'border-[#8B8B73] bg-[#F2FCE2]' : 'border-[#E8E8D8]'
            }`}
            onClick={() => handlePricingStrategySelect(strategy.id as PricingStrategy)}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-2 rounded-full ${
                pricingStrategy === strategy.id ? 'bg-[#8B8B73]' : 'bg-[#E8E8D8]'
              }`}>
                <strategy.icon className={`h-5 w-5 ${
                  pricingStrategy === strategy.id ? 'text-white' : 'text-[#8B8B73]'
                }`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#4A4A3F] text-lg">{strategy.title}</h4>
                <p className="text-sm text-[#6B6B5F]">{strategy.description}</p>
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
                    onClick={() => pricingPath === 'cost' ? setStep(4) : handleMarketFormSubmit()}
                    disabled={pricingPath === 'market' && (!marketPrice || !competitorLow || !competitorHigh)}
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
