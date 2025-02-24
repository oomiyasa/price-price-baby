
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductItemsForm } from "@/components/bundle/ProductItemsForm";
import { ProductItem } from "@/types/bundle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const BundlePricing = () => {
  const [step, setStep] = useState(1);
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

  const calculateMRR = (products: ProductItem[]) => {
    return products.reduce((total, product) => {
      if (product.chargeModel === "subscription") {
        const price = parseFloat(product.price);
        if (product.billingPeriod === "monthly") {
          return total + price;
        } else if (product.billingPeriod === "annually") {
          return total + (price / 12);
        }
      } else if (product.chargeModel === "usage") {
        const price = parseFloat(product.price);
        const units = parseInt(product.usageUnits || "0");
        const monthlyUnits = product.usagePeriod === "year" 
          ? units / 12 
          : product.usagePeriod === "day" 
          ? units * 30 
          : units;
        return total + (price * monthlyUnits);
      }
      return total;
    }, 0);
  };

  const calculateARR = (products: ProductItem[]) => {
    return products.reduce((total, product) => {
      if (product.chargeModel === "subscription") {
        const price = parseFloat(product.price);
        if (product.billingPeriod === "annually") {
          return total + price;
        } else if (product.billingPeriod === "monthly") {
          return total + (price * 12);
        }
      } else if (product.chargeModel === "usage") {
        const price = parseFloat(product.price);
        const units = parseInt(product.usageUnits || "0");
        const yearlyUnits = product.usagePeriod === "month" 
          ? units * 12 
          : product.usagePeriod === "day" 
          ? units * 365 
          : units;
        return total + (price * yearlyUnits);
      }
      return total;
    }, 0);
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
                
                {products.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="text-sm text-gray-600">Monthly Recurring Revenue (MRR)</div>
                        <div className="text-2xl font-semibold text-[#4A4A3F]">
                          ${calculateMRR(products).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="text-sm text-gray-600">Annual Recurring Revenue (ARR)</div>
                        <div className="text-2xl font-semibold text-[#4A4A3F]">
                          ${calculateARR(products).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F] ml-auto"
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
