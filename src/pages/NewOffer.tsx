
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, Users, User, DollarSign, ChartBar, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CompanyType = "SMB" | "Growth" | "Enterprise" | null;
type PricingPath = "cost" | "market" | null;

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

const NewOffer = () => {
  const [step, setStep] = useState(1);
  const [companyType, setCompanyType] = useState<CompanyType>(null);
  const [pricingPath, setPricingPath] = useState<PricingPath>(null);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F2FCE2] to-[#FEF7CD]/20">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button 
            variant="outline" 
            className="border-[#8B8B73] text-[#4A4A3F] hover:bg-[#8B8B73] hover:text-white"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
          </Button>
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
                 pricingPath === "cost" ? "Cost-Based Pricing Details" :
                 "Market-Based Pricing Details"}
              </CardTitle>
              <CardDescription className="text-[#6B6B5F]">
                {step === 1 ? "Choose the option that best describes your business" : 
                 step === 2 ? "Select the pricing strategy that aligns with your goals" :
                 pricingPath === "cost" ? "Enter your costs to calculate optimal pricing" :
                 "Enter market research data to determine competitive pricing"}
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
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
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
