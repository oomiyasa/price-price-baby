
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PricingImpactGraph } from "@/components/usage/impact/PricingImpactGraph";
import { KeyConsiderations } from "@/components/usage/impact/KeyConsiderations";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const UsagePricingImpact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-[#8B8B73] hover:text-[#4A4A3F] hover:bg-[#F0F0E8]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="ghost"
            className="text-[#8B8B73] hover:text-[#4A4A3F] hover:bg-[#F0F0E8]"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4 mr-2" />
            Done
          </Button>
        </div>

        <h1 className="text-3xl font-semibold text-[#4A4A3F] mb-2 text-center">
          Usage Pricing Impact Analysis
        </h1>
        <p className="text-[#6B6B5F] mb-8 text-center max-w-2xl mx-auto">
          Analyze the financial impact of your usage-based pricing model
        </p>
        <Card className="bg-white shadow-sm mb-8">
          <CardContent className="pt-6">
            <PricingImpactGraph />
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <KeyConsiderations />
          </CardContent>
        </Card>
      </motion.div>
      <footer className="text-center p-4 text-sm text-gray-600 mt-8">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};

export default UsagePricingImpact;
