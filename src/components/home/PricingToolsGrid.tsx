
import { motion } from "framer-motion";
import { PricingToolCard } from "./PricingToolCard";
import { pricingTools } from "@/data/pricingTools";

// Organize tools by common questions users have
const toolCategories = {
  "How much should I charge?": ["new-offer", "cogs", "competitive", "price-elasticity"],
  "How am I performing?": ["revenue", "nrr", "churn", "quick-ratio"],
  "Where can I improve?": ["cac", "ltv", "burn-multiple", "magic-number"],
  "What's my next move?": ["bundle", "usage-based", "discount-strategy", "reprice", "market-size"]
};

export function PricingToolsGrid() {
  return (
    <div className="space-y-12">
      {Object.entries(toolCategories).map(([question, toolIds], index) => (
        <motion.div
          key={question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
        >
          <h2 className="text-2xl font-medium text-[#4A4A3F] mb-6">{question}</h2>
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
