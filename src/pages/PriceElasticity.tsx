
import React, { useState } from "react";
import { ElasticityForm } from "@/components/pricing/elasticity/ElasticityForm";
import { ElasticityResults } from "@/components/pricing/elasticity/ElasticityResults";
import { ElasticityData, ElasticityResult } from "@/components/pricing/types/elasticity";
import { calculateElasticity } from "@/components/pricing/utils/elasticityCalculations";

export default function PriceElasticity() {
  const [results, setResults] = useState<ElasticityResult | null>(null);

  const handleCalculate = (data: ElasticityData) => {
    const calculatedResults = calculateElasticity(data);
    setResults(calculatedResults);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ElasticityForm onCalculate={handleCalculate} />
        {results && <ElasticityResults results={results} />}
      </div>
      <footer className="text-center text-sm text-muted-foreground">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
}
