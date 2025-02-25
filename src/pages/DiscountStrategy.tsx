
import React, { useState } from "react";
import { DiscountForm } from "@/components/pricing/discount/DiscountForm";
import { DiscountResults } from "@/components/pricing/discount/DiscountResults";
import { DiscountScenario, DiscountResults as DiscountResultsType } from "@/components/pricing/types/discount";
import { calculateDiscountResults } from "@/components/pricing/utils/discountCalculations";

export default function DiscountStrategy() {
  const [results, setResults] = useState<DiscountResultsType | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);

  const handleCalculate = (data: DiscountScenario) => {
    const calculatedResults = calculateDiscountResults(data);
    setResults(calculatedResults);
    setDiscountPercentage(data.discountPercentage);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DiscountForm onCalculate={handleCalculate} />
        {results && discountPercentage && (
          <DiscountResults results={results} discountPercentage={discountPercentage} />
        )}
      </div>
      <footer className="text-center text-sm text-muted-foreground">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
}
