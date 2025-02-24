
import React, { useState } from "react";
import { CACData, CACResults } from "./types";
import { CACForm } from "./components/CACForm";
import { CACResults as CACResultsComponent } from "./components/CACResults";

export const CACCalculator = () => {
  const [results, setResults] = useState<CACResults | null>(null);

  const calculateCAC = (data: CACData): CACResults => {
    const totalCosts = data.marketingCosts + data.salesCosts;
    const cac = totalCosts / data.newCustomers;

    // Calculate efficiency rating based on industry standards
    let efficiency: CACResults["efficiency"] = "average";
    if (cac < 100) {
      efficiency = "excellent";
    } else if (cac < 200) {
      efficiency = "good";
    } else if (cac > 500) {
      efficiency = "poor";
    }

    return {
      cac,
      marketingSplit: data.marketingCosts,
      salesSplit: data.salesCosts,
      customersPerPeriod: data.newCustomers,
      efficiency,
    };
  };

  const onSubmit = (data: CACData) => {
    const calculatedResults = calculateCAC(data);
    setResults(calculatedResults);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
        Customer Acquisition Cost Calculator
      </h1>

      <CACForm onSubmit={onSubmit} />
      {results && <CACResultsComponent results={results} />}

      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};
