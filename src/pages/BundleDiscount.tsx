import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const BundleDiscount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [discount, setDiscount] = useState("");
  const [minItems, setMinItems] = useState("");

  const handlePrevStep = () => {
    navigate("/bundle-pricing");
    toast.success("Returning to bundle pricing");
  };

  const handleNextStep = () => {
    if (!discount || !minItems) {
      toast.error("Please fill in all fields");
      return;
    }
    navigate("/bundle-configuration", { 
      state: { 
        ...location.state,
        bundleDiscount: parseFloat(discount),
        minItems: parseInt(minItems)
      } 
    });
    toast.success("Proceeding to bundle configuration");
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
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#4A4A3F] mb-4">Bundle Discount</h2>
                    <p className="text-[#6B6B5F] mb-6">
                      Set up bundle discounts to encourage customers to purchase multiple items together.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="discount" className="text-[#4A4A3F]">
                          Bundle Discount Percentage
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The percentage discount applied when items are purchased as a bundle</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="discount"
                        type="number"
                        min="0"
                        max="100"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Enter discount percentage"
                        className="max-w-[200px]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="minItems" className="text-[#4A4A3F]">
                          Minimum Items for Discount
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Minimum number of items required to qualify for the bundle discount</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="minItems"
                        type="number"
                        min="2"
                        value={minItems}
                        onChange={(e) => setMinItems(e.target.value)}
                        placeholder="Enter minimum items"
                        className="max-w-[200px]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between gap-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BundleDiscount;
