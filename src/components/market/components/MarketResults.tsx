
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MarketSizeResults } from "../types";
import { formatCurrency } from "../utils/calculations";

interface MarketResultsProps {
  results: MarketSizeResults;
}

export const MarketResults = ({ results }: MarketResultsProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#FAFAFA]">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">TAM</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-[#6B6B5F] mb-4 cursor-help">Total Addressable Market</p>
                </TooltipTrigger>
                <TooltipContent>
                  The total market demand for your product or service
                </TooltipContent>
              </Tooltip>
              <p className="text-2xl font-bold text-[#4A4A3F]">{formatCurrency(results.tam)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#FAFAFA]">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">SAM</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-[#6B6B5F] mb-4 cursor-help">Serviceable Addressable Market</p>
                </TooltipTrigger>
                <TooltipContent>
                  The portion of TAM that you can realistically serve
                </TooltipContent>
              </Tooltip>
              <p className="text-2xl font-bold text-[#4A4A3F]">{formatCurrency(results.sam)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#FAFAFA]">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">SOM</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-[#6B6B5F] mb-4 cursor-help">Serviceable Obtainable Market</p>
                </TooltipTrigger>
                <TooltipContent>
                  The portion of SAM that you can realistically capture
                </TooltipContent>
              </Tooltip>
              <p className="text-2xl font-bold text-[#4A4A3F]">{formatCurrency(results.som)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">Revenue Projections</h3>
          <div className="space-y-4">
            {results.projections.map((projection) => (
              <div key={projection.year} className="flex justify-between items-center">
                <span className="text-[#6B6B5F]">{projection.year}</span>
                <span className="font-semibold text-[#4A4A3F]">
                  {formatCurrency(projection.revenue)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
