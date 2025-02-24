
import React, { useState } from "react";
import { MarketSizeResults, MarketSizeFormData } from "./types";
import { calculateProjections } from "./utils/calculations";
import { MarketSizeForm } from "./components/MarketSizeForm";
import { MarketResults } from "./components/MarketResults";

export const MarketCalculator = () => {
  const [results, setResults] = useState<MarketSizeResults | null>(null);

  const onSubmit = (data: MarketSizeFormData) => {
    let tam = 0;
    let sam = 0;
    let som = 0;

    if (data.calculationType === 'revenue' && data.industryRevenue) {
      // Calculate using industry revenue method
      tam = data.industryRevenue;
      sam = tam * (data.targetSegmentPercentage / 100);
      som = sam * (data.marketSharePercentage / 100);
    } else if (data.calculationType === 'customers' && data.totalCustomers) {
      // Calculate using customer count method
      tam = data.totalCustomers * data.averageRevenue;
      sam = tam * (data.targetSegmentPercentage / 100);
      som = sam * (data.marketSharePercentage / 100);
    }

    const projections = calculateProjections(som, data.growthRate, data.yearsProjection);

    setResults({
      tam,
      sam,
      som,
      projections,
    });
  };

  return (
    <div className="space-y-8">
      <MarketSizeForm onSubmit={onSubmit} />
      {results && <MarketResults results={results} />}
    </div>
  );
};
