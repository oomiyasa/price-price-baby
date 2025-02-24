
import React, { useState } from "react";
import { LTVData, LTVResults } from "./types";
import { calculateLTV } from "./utils/ltvCalculations";
import { LTVForm } from "./components/LTVForm";
import { LTVResults as LTVResultsComponent } from "./components/LTVResults";

export const LTVCalculator = () => {
  const [results, setResults] = useState<LTVResults | null>(null);

  const onSubmit = (data: LTVData) => {
    const results = calculateLTV(data);
    setResults(results);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
        Customer Lifetime Value Calculator
      </h1>

      <LTVForm onSubmit={onSubmit} />
      {results && <LTVResultsComponent results={results} />}

      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};
