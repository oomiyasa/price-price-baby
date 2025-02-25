
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PricingTool } from "@/data/pricingTools";

interface PricingToolCardProps {
  tool: PricingTool;
}

export function PricingToolCard({ tool }: PricingToolCardProps) {
  const Icon = tool.icon;
  
  return (
    <Link to={tool.route} className="no-underline">
      <Card className="h-full group bg-white hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="bg-gray-100 p-3 rounded-lg shrink-0">
            <Icon className="h-6 w-6 text-[#4A4A3F]" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-[#4A4A3F]">{tool.title}</h3>
            <p className="text-sm text-[#6B6B5F] mt-1">{tool.description}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}
