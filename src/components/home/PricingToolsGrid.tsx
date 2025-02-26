
import { motion } from "framer-motion";
import { PricingToolCard } from "./PricingToolCard";
import { pricingTools } from "@/data/pricingTools";

// Group tools by category
const toolCategories = {
  "Revenue Metrics": ["revenue", "nrr", "churn", "ltv", "cac"],
  "Efficiency Metrics": ["quick-ratio", "magic-number", "burn-multiple"],
  "Pricing Strategy": ["price-elasticity", "discount-strategy", "competitive", "new-offer"],
  "Product & Operations": ["reprice", "cogs", "bundle", "usage-based", "market-size"]
};

export function PricingToolsGrid() {
  return (
    <div className="space-y-8">
      {Object.entries(toolCategories).map(([category, toolIds]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-medium text-[#4A4A3F] mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingTools
              .filter(tool => toolIds.includes(tool.id))
              .map(tool => (
                <PricingToolCard key={tool.id} tool={tool} />
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
