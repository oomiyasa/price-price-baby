
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductItemsForm } from "@/components/bundle/ProductItemsForm";
import { BundleMetrics } from "@/components/bundle/BundleMetrics";
import { ProductItem } from "@/types/bundle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { calculateMRR, calculateARR, calculateBlendedMargin } from "@/utils/bundleCalculations";

const BundlePricing = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductItem[]>([]);

  const handleAddProduct = (product: ProductItem) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (updatedProduct: ProductItem) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleReorderProducts = (reorderedProducts: ProductItem[]) => {
    setProducts(reorderedProducts);
  };

  const handlePrevStep = () => {
    navigate(-1);
    toast.success("Returning to previous page");
  };

  const handleNextStep = () => {
    if (products.length < 2) {
      toast.error("Please add at least 2 products to create a bundle");
      return;
    }
    
    // Navigate without replace, and ensure state is passed properly
    navigate("/bundle-configuration", {
      state: { products }
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-4"
          >
            <Card className="bg-white border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <ProductItemsForm
                  products={products}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onReorderProducts={handleReorderProducts}
                />
                
                <BundleMetrics 
                  products={products}
                  calculateMRR={calculateMRR}
                  calculateARR={calculateARR}
                  calculateBlendedMargin={calculateBlendedMargin}
                />

                <div className="mt-6 flex justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BundlePricing;
