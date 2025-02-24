
import React from "react";
import { motion } from "framer-motion";
import { CACForm } from "@/components/revenue/components/CACForm";
import { CACResults } from "@/components/revenue/components/CACResults";
import { toast } from "sonner";
import { CACData, CACResults as CACResultsType } from "@/components/revenue/types";
import { calculateCAC } from "@/components/revenue/utils/cacCalculations";

export default function CACCalculator() {
  const [results, setResults] = React.useState<CACResultsType | null>(null);

  const handleCalculate = (data: CACData) => {
    try {
      const calculatedResults = calculateCAC(data);
      setResults(calculatedResults);
      toast.success("CAC calculations updated");
    } catch (error) {
      toast.error("Error calculating CAC");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-[#4A4A3F] mb-2">
            CAC Calculator
          </h1>
          <p className="text-[#6B6B5F] mb-8">
            Calculate and analyze your customer acquisition costs
          </p>

          <div className="space-y-6">
            <CACForm onSubmit={handleCalculate} />
            {results && <CACResults results={results} />}
          </div>
        </div>
      </motion.div>
      
      <footer className="text-center p-4 text-sm text-gray-600 border-t mt-12">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
}
