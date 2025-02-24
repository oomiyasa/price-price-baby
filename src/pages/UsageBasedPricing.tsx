
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UsageBasedForm } from "@/components/usage/UsageBasedForm";
import { motion } from "framer-motion";

const UsageBasedPricing = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-semibold text-[#4A4A3F] mb-2 text-center">
          Configure Usage-Based Pricing
        </h1>
        <p className="text-[#6B6B5F] mb-8 text-center max-w-2xl mx-auto">
          Tell us about your current offering and we'll help you design the right 
          usage-based pricing structure for your business.
        </p>
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <UsageBasedForm />
          </CardContent>
        </Card>
      </motion.div>
      <footer className="text-center p-4 text-sm text-gray-600 mt-8">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};

export default UsageBasedPricing;
