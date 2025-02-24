
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrentPriceForm } from "@/components/repricing/CurrentPriceForm";
import { RepricingData } from "@/types/repricing";

const Repricing = () => {
  const [step, setStep] = useState(1);
  const [currentPrice, setCurrentPrice] = useState("");
  
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Current Price Analysis";
      case 2:
        return "Performance Analysis";
      case 3:
        return "Market Changes";
      case 4:
        return "Differentiation Analysis";
      case 5:
        return "Recommendations";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Let's analyze your current pricing position";
      case 2:
        return "Review your product's performance metrics";
      case 3:
        return "Understand recent market changes and trends";
      case 4:
        return "Assess your competitive advantages";
      case 5:
        return "Review our pricing recommendations";
      default:
        return "";
    }
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
                  {getStepTitle()}
                </CardTitle>
                <CardDescription className="text-[#6B6B5F]">
                  {getStepDescription()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {step === 1 && (
                  <CurrentPriceForm
                    currentPrice={currentPrice}
                    onCurrentPriceChange={setCurrentPrice}
                  />
                )}
                {/* Additional steps will be implemented here */}
                
                <div className="mt-6 flex justify-between">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                      onClick={handlePrevious}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {step < 5 && (
                    <Button 
                      className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F] ml-auto"
                      onClick={handleNext}
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

        <footer className="py-4 px-6 text-center text-gray-400 text-sm">
          Price Price Baby | Oomiyasa LLC
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default Repricing;
