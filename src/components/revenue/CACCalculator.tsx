
import React, { useState } from "react";
import { CACData, CACResults } from "./types";
import { CACForm } from "./components/form/CACForm";
import { CACResultsDisplay } from "./components/CACResults";

export const CACCalculator = () => {
  const [results, setResults] = useState<CACResults | null>(null);

  const calculateCAC = (data: CACData): CACResults => {
    const totalCosts = data.marketingCosts + data.salesCosts;
    const cac = totalCosts / data.newCustomers;
    const marketingSplit = (data.marketingCosts / totalCosts) * 100;
    const salesSplit = (data.salesCosts / totalCosts) * 100;

    // Determine efficiency based on CAC amount
    let efficiency: CACResults["efficiency"] = "average";
    if (cac < 100) efficiency = "excellent";
    else if (cac < 200) efficiency = "good";
    else if (cac > 500) efficiency = "poor";

    return {
      cac,
      marketingSplit,
      salesSplit,
      customersPerPeriod: data.newCustomers,
      efficiency,
    };
  };

  const onSubmit = (data: CACData) => {
    const calculatedResults = calculateCAC(data);
    setResults(calculatedResults);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <CACForm onSubmit={onSubmit} />
      {results && <CACResultsDisplay results={results} />}
      
      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};
