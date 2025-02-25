
import React from "react";
import { CompetitivePricingForm } from "@/components/pricing/competitive/CompetitivePricingForm";
import { CompetitivePricingResults } from "@/components/pricing/competitive/CompetitivePricingResults";
import { useState } from "react";
import { CompetitiveAnalysis } from "@/components/pricing/types/competitive";

export default function CompetitivePricing() {
  const [analysis, setAnalysis] = useState<CompetitiveAnalysis | null>(null);

  const handleAnalysisComplete = (data: CompetitiveAnalysis) => {
    setAnalysis(data);
  };

  return (
    <div className="container mx-auto py-6 space-y-6 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompetitivePricingForm onAnalysisComplete={handleAnalysisComplete} />
        {analysis && <CompetitivePricingResults analysis={analysis} />}
      </div>
      <footer className="text-center text-sm text-muted-foreground">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
}
