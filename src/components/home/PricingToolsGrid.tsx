
import { motion } from "framer-motion";
import { PricingToolCard } from "./PricingToolCard";
import { pricingTools } from "@/data/pricingTools";

export function PricingToolsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {pricingTools.map((tool) => (
        <PricingToolCard key={tool.id} tool={tool} />
      ))}
    </motion.div>
  );
}
