
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NewOffer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F2FCE2] to-[#FEF7CD]/20">
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button 
            variant="outline" 
            className="border-[#8B8B73] text-[#4A4A3F] hover:bg-[#8B8B73] hover:text-white"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
          </Button>
          <h1 className="text-3xl font-semibold text-[#4A4A3F]">New Offer Pricing</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white/80 border-[#E8E8D8]">
            <CardHeader>
              <CardTitle className="text-[#4A4A3F]">Create New Offer</CardTitle>
              <CardDescription className="text-[#6B6B5F]">
                Let's walk through creating and pricing your new offer
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Content will be added based on your flow requirements */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NewOffer;
