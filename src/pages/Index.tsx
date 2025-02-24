
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pricingTools = [
  {
    id: "new-offer",
    title: "New Offer Pricing",
    description: "Create and price a new offer for your business",
    route: "/new-offer",
  },
  {
    id: "value-based",
    title: "Value Based Pricing",
    description: "Set prices based on perceived value to customers",
    route: "/value-based",
  },
  {
    id: "competitor",
    title: "Competitor Based Pricing",
    description: "Analyze and set prices based on market competition",
    route: "/competitor",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F2FCE2] to-[#FEF7CD]/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center px-6 py-24"
      >
        <h1 className="text-5xl md:text-6xl font-semibold text-[#4A4A3F] tracking-tight mb-4 text-center">
          Price Price Baby
        </h1>
        <p className="text-xl text-[#6B6B5F] max-w-md mx-auto text-center mb-12">
          Simplifying pricing strategy
        </p>
      </motion.div>

      {/* Tools Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pricingTools.map((tool) => (
            <Card key={tool.id} className="bg-white/80 border-[#E8E8D8] hover:border-[#8B8B73] transition-colors">
              <CardHeader>
                <CardTitle className="text-[#4A4A3F]">{tool.title}</CardTitle>
                <CardDescription className="text-[#6B6B5F]">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button 
                    asChild
                    className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
                  >
                    <Link to={tool.route}>
                      Start <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
