
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, DollarSign, RefreshCw, Calculator, Box, Percent, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";

const pricingTools = [
  {
    id: "new-offer",
    title: "Price a New Offering",
    description: "Get strategic pricing for your new product or service",
    route: "/new-offer",
    icon: DollarSign
  },
  {
    id: "reprice",
    title: "Reprice Existing Offering",
    description: "Optimize pricing for your current products",
    route: "/repricing",
    icon: RefreshCw
  },
  {
    id: "cogs",
    title: "Calculate COGS & Margins",
    description: "Analyze costs and determine target margins by industry",
    route: "/cogs",
    icon: Calculator
  },
  {
    id: "bundle",
    title: "Price a Bundle",
    description: "Create attractive package pricing",
    route: "/bundle-pricing",
    icon: Box
  },
  {
    id: "usage-based",
    title: "Deploy Usage-Based Pricing",
    description: "Whether launching new or transitioning from traditional models",
    route: "/usage-based",
    icon: Percent
  },
  {
    id: "market-size",
    title: "Market Sizing",
    description: "Calculate total addressable market and segment size",
    route: "/market-size",
    icon: ChartBar
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center px-6 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-[#4A4A3F] tracking-tight mb-4 text-center">
          Price Price Baby
        </h1>
        <p className="text-xl text-[#6B6B5F] max-w-md mx-auto text-center mb-12">
          Simplifying pricing strategy
        </p>
      </motion.div>

      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {pricingTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.route}
                className="no-underline"
              >
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
            )
          })}
        </motion.div>
      </div>

      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};

export default Index;
