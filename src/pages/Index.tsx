
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, DollarSign, RefreshCw, Calculator, Box, Percent, LineChart } from "lucide-react";
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
    route: "/reprice",
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
    route: "/bundle",
    icon: Box
  },
  {
    id: "usage-based",
    title: "Switch to Usage-Based Pricing",
    description: "Move from subscriptions to consumption pricing",
    route: "/usage-based",
    icon: Percent
  },
  {
    id: "metrics",
    title: "Business Metrics Calculators",
    description: "Essential calculators for recurring revenue businesses",
    route: "/metrics",
    icon: LineChart
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Hero Section */}
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

      {/* Tools Grid Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {pricingTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} to={tool.route}>
                <Card className="group bg-white hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-[#4A4A3F]" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-[#4A4A3F]">{tool.title}</h3>
                        <p className="text-sm text-[#6B6B5F] mt-1">{tool.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </motion.div>
      </div>

      <footer className="py-4 px-6 text-center text-gray-400 text-sm">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};

export default Index;
