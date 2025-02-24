import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductItemsForm } from "@/components/bundle/ProductItemsForm";
import { ProductItem } from "@/types/bundle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
    navigate("/bundle-configuration", { 
      state: { 
        products
      } 
    });
    toast.success("Proceeding to bundle configuration");
  };

  const calculateMRR = (products: ProductItem[]) => {
    return products.reduce((total, product) => {
      const price = parseFloat(product.price);
      
      switch (product.chargeModel) {
        case "one-time":
          return total + (price / 12); // One-time payments spread over a year for MRR
        
        case "subscription":
          if (product.billingPeriod === "monthly") {
            return total + price;
          } else if (product.billingPeriod === "annually") {
            return total + (price / 12);
          }
          return total;
        
        case "usage":
          const units = parseInt(product.usageUnits || "0");
          let monthlyUnits;
          
          switch (product.usagePeriod) {
            case "day":
              monthlyUnits = units * 30; // Approximate days in a month
              break;
            case "month":
              monthlyUnits = units;
              break;
            case "year":
              monthlyUnits = units / 12;
              break;
            default:
              monthlyUnits = 0;
          }
          
          return total + (price * monthlyUnits);
        
        default:
          return total;
      }
    }, 0);
  };

  const calculateARR = (products: ProductItem[]) => {
    return products.reduce((total, product) => {
      const price = parseFloat(product.price);
      
      switch (product.chargeModel) {
        case "one-time":
          return total + price; // One-time payments count fully for ARR
        
        case "subscription":
          if (product.billingPeriod === "annually") {
            return total + price;
          } else if (product.billingPeriod === "monthly") {
            return total + (price * 12);
          }
          return total;
        
        case "usage":
          const units = parseInt(product.usageUnits || "0");
          let yearlyUnits;
          
          switch (product.usagePeriod) {
            case "day":
              yearlyUnits = units * 365;
              break;
            case "month":
              yearlyUnits = units * 12;
              break;
            case "year":
              yearlyUnits = units;
              break;
            default:
              yearlyUnits = 0;
          }
          
          return total + (price * yearlyUnits);
        
        default:
          return total;
      }
    }, 0);
  };

  const calculateBlendedMargin = (products: ProductItem[]) => {
    const totalRevenue = calculateARR(products);
    if (totalRevenue === 0) return null;

    const weightedMargins = products.reduce((total, product) => {
      if (!product.grossMargin) return total;
      
      const price = parseFloat(product.price);
      const margin = parseFloat(product.grossMargin);
      let annualRevenue;

      switch (product.chargeModel) {
        case "one-time":
          annualRevenue = price;
          break;
        case "subscription":
          annualRevenue = product.billingPeriod === "annually" ? price : price * 12;
          break;
        case "usage":
          const units = parseInt(product.usageUnits || "0");
          const yearlyUnits = product.usagePeriod === "day" ? units * 365 :
                             product.usagePeriod === "month" ? units * 12 : units;
          annualRevenue = price * yearlyUnits;
          break;
        default:
          annualRevenue = 0;
      }

      return total + (margin * (annualRevenue / totalRevenue));
    }, 0);

    return weightedMargins;
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
                    <div className="grid grid-cols-3 gap-4">
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
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="text-sm text-gray-600">Blended Gross Margin</div>
                        <div className="text-2xl font-semibold text-[#4A4A3F]">
                          {calculateBlendedMargin(products)?.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
