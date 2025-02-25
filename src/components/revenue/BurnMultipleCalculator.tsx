
import React, { useState } from "react";
import { BurnMultipleForm } from "./components/BurnMultipleForm";
import { BurnMultipleResults } from "./components/BurnMultipleResults";
import { BurnMultipleData, BurnMultipleResult } from "./types";
import { calculateBurnMultiple } from "./utils/burnMultipleCalculations";

export function BurnMultipleCalculator() {
  const [results, setResults] = useState<BurnMultipleResult | null>(null);

  const handleSubmit = (data: BurnMultipleData) => {
    const calculatedResults = calculateBurnMultiple(data);
    setResults(calculatedResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-[#4A4A3F] mb-8">
        Burn Multiple Calculator
      </h1>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <BurnMultipleForm onSubmit={handleSubmit} />
          {results && <BurnMultipleResults results={results} />}
        </div>
      </div>
    </div>
  );
}
