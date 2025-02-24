
import React, { useState } from "react";
import { QuickRatioForm } from "./components/QuickRatioForm";
import { QuickRatioResults } from "./components/QuickRatioResults";
import { QuickRatioData, QuickRatioResult } from "./types";
import { calculateQuickRatio } from "./utils/quickRatioCalculations";

export function QuickRatioCalculator() {
  const [results, setResults] = useState<QuickRatioResult | null>(null);

  const handleSubmit = (data: QuickRatioData) => {
    const calculatedResults = calculateQuickRatio(data);
    setResults(calculatedResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-[#4A4A3F] mb-8">
        Quick Ratio Calculator
      </h1>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <QuickRatioForm onSubmit={handleSubmit} />
          {results && <QuickRatioResults results={results} />}
        </div>
      </div>
    </div>
  );
}
