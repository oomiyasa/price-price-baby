
import React, { useState } from "react";
import { ChurnData, ChurnResults as ChurnResultsType } from "./types";
import { ChurnForm } from "./components/ChurnForm";
import { ChurnResults } from "./components/ChurnResults";
import { industryBenchmarks, getChurnRating } from "./utils/benchmarkData";

export const ChurnCalculator = () => {
  const [results, setResults] = useState<ChurnResultsType | null>(null);
  const [churnType, setChurnType] = useState<"voluntary" | "involuntary" | "both">("both");

  const calculateChurnMetrics = (data: ChurnData): ChurnResultsType => {
    setChurnType(data.churnType);
    
    // Calculate churned customers if not provided
    const actualChurnedCustomers = data.churnedCustomers ?? 
      (data.startingCustomers + data.newCustomers - data.endingCustomers);

    const logoChurnRate = (actualChurnedCustomers / data.startingCustomers) * 100;
    const revenueChurnRate = (data.churnedMRR / data.startingMRR) * 100;
    const retentionRate = 100 - logoChurnRate;
    const customerLifetimeMonths = 1 / (logoChurnRate / 100);
    const netCustomerChange = data.endingCustomers - data.startingCustomers;
    const growthRate = (netCustomerChange / data.startingCustomers) * 100;
    const netRevenueLoss = data.churnedMRR - (data.expansionMRR || 0);

    const benchmark = industryBenchmarks[data.industry];
    const benchmarkComparison = getChurnRating(logoChurnRate, benchmark);

    return {
      logoChurnRate,
      revenueChurnRate,
      customerLifetimeMonths,
      retentionRate,
      netCustomerChange,
      growthRate,
      netRevenueLoss,
      benchmarkComparison,
      industryData: benchmark,
    };
  };

  const getBenchmarkColor = (rating: "good" | "average" | "risk") => {
    switch (rating) {
      case "good":
        return "text-green-600";
      case "average":
        return "text-yellow-600";
      case "risk":
        return "text-red-600";
    }
  };

  const onSubmit = (data: ChurnData) => {
    const calculatedResults = calculateChurnMetrics(data);
    setResults(calculatedResults);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
        Churn Rate Calculator
      </h1>

      <ChurnForm onSubmit={onSubmit} />
      {results && (
        <ChurnResults 
          results={results} 
          getBenchmarkColor={getBenchmarkColor} 
          churnType={churnType}
        />
      )}

      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};
