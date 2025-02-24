
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, Users, User, DollarSign, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";

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

  const handleCompanySelect = (type: CompanyType) => {
    setCompanyType(type);
    setStep(2); // Automatically advance to next step
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F2FCE2] to-[#FEF7CD]/20">
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
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
        >
          <Card className="bg-white/80 border-[#E8E8D8]">
            <CardHeader>
              <CardTitle className="text-[#4A4A3F]">
                {step === 1 ? "Select Your Company Type" : "Choose Your Pricing Path"}
              </CardTitle>
              <CardDescription className="text-[#6B6B5F]">
                {step === 1 
                  ? "Choose the option that best describes your business" 
                  : "Select the pricing strategy that aligns with your goals"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {step === 1 ? (
                  companyTypes.map((type) => (
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
                        <CardContent className="p-6 space-y-4 flex flex-col h-full">
                          <div className="flex justify-center">
                            <type.icon className="h-8 w-8 text-[#8B8B73]" />
                          </div>
                          <div className="text-center flex-1 flex flex-col justify-between">
                            <h3 className="font-semibold text-[#4A4A3F] mb-2">{type.title}</h3>
                            <p className="text-sm text-[#6B6B5F]">{type.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  pricingPaths.map((path) => (
                    <motion.div
                      key={path.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="md:col-span-3/2"
                    >
                      <Card 
                        className={`cursor-pointer transition-all hover:border-[#8B8B73] ${
                          pricingPath === path.id ? 'border-[#8B8B73] bg-[#F2FCE2]' : 'border-[#E8E8D8]'
                        }`}
                        onClick={() => setPricingPath(path.id as PricingPath)}
                      >
                        <CardContent className="p-6 space-y-4">
                          <div className="flex justify-center">
                            <path.icon className="h-8 w-8 text-[#8B8B73]" />
                          </div>
                          <div className="text-center">
                            <h3 className="font-semibold text-[#4A4A3F] mb-2">{path.title}</h3>
                            <p className="text-sm text-[#6B6B5F]">{path.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-8 flex justify-between">
                {step === 2 && (
                  <Button
                    variant="outline"
                    className="border-[#8B8B73] text-[#4A4A3F] hover:bg-[#8B8B73] hover:text-white"
                    onClick={() => setStep(1)}
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
