
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CostPlus = () => {
  const [productCost, setProductCost] = useState("");
  const [markupPercentage, setMarkupPercentage] = useState("");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const cost = parseFloat(productCost);
    const markup = parseFloat(markupPercentage);
    
    if (!isNaN(cost) && !isNaN(markup)) {
      const calculatedPrice = cost * (1 + markup / 100);
      setFinalPrice(Number(calculatedPrice.toFixed(2)));
    }
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
          <h1 className="text-3xl font-semibold text-[#4A4A3F]">Cost Plus Pricing</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white/80 border-[#E8E8D8]">
            <CardHeader>
              <CardTitle className="text-[#4A4A3F]">Calculate Your Price</CardTitle>
              <CardDescription className="text-[#6B6B5F]">
                Enter your product cost and desired markup percentage to calculate the final price
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="cost" className="text-sm font-medium text-[#4A4A3F]">
                    Product Cost ($)
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter the total cost to produce/acquire one unit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="cost"
                  type="number"
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                  placeholder="0.00"
                  className="border-[#E8E8D8]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="markup" className="text-sm font-medium text-[#4A4A3F]">
                    Markup Percentage (%)
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your desired markup percentage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="markup"
                  type="number"
                  value={markupPercentage}
                  onChange={(e) => setMarkupPercentage(e.target.value)}
                  placeholder="0"
                  className="border-[#E8E8D8]"
                />
              </div>

              <Button 
                onClick={calculatePrice}
                className="w-full bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
              >
                Calculate Price
              </Button>

              {finalPrice !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-[#F2FCE2] rounded-lg"
                >
                  <p className="text-center text-[#4A4A3F]">
                    <span className="text-sm">Recommended Price:</span>
                    <br />
                    <span className="text-2xl font-semibold">${finalPrice}</span>
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CostPlus;
