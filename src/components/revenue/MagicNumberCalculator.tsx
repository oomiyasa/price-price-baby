
import React, { useState } from "react";
import { MagicNumberForm } from "./components/MagicNumberForm";
import { MagicNumberResults } from "./components/MagicNumberResults";
import { MagicNumberData, MagicNumberResult } from "./types";
import { calculateMagicNumber } from "./utils/magicNumberCalculations";

export function MagicNumberCalculator() {
  const [results, setResults] = useState<MagicNumberResult | null>(null);

  const handleSubmit = (data: MagicNumberData) => {
    const calculatedResults = calculateMagicNumber(data);
    setResults(calculatedResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-[#4A4A3F] mb-8">
        Magic Number Calculator
      </h1>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <MagicNumberForm onSubmit={handleSubmit} />
          {results && <MagicNumberResults results={results} />}
        </div>
      </div>
    </div>
  );
}
