
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ProductItem } from "@/types/bundle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductDiscount } from "@/types/bundleConfiguration";
import { BundleProduct } from "@/components/bundle/BundleProduct";
import { BundleSummary } from "@/components/bundle/BundleSummary";
import {
  calculateAnnualValue,
  formatPriceWithFrequency,
  calculateBlendedMargin,
} from "@/utils/bundleCalculations";

const BundleConfiguration = () => {
  const location = useLocation();
  
  const initialProducts = location.state?.products || [];
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [discounts, setDiscounts] = useState<ProductDiscount[]>(
    initialProducts.map((p: ProductItem) => ({
      productId: p.id,
      discount: 0
    }))
  );
  
  const [originalTotalAnnual, setOriginalTotalAnnual] = useState(0);
  const [discountedTotalAnnual, setDiscountedTotalAnnual] = useState(0);
  const [blendedMargin, setBlendedMargin] = useState<number | null>(null);
  const [discountedBlendedMargin, setDiscountedBlendedMargin] = useState<number | null>(null);

  const getDiscountForProduct = (productId: string) => {
    return discounts.find(d => d.productId === productId)?.discount || 0;
  };

  const handleDiscountChange = (productId: string, value: string) => {
    const numValue = parseFloat(value);
    const discount = isNaN(numValue) ? 0 : Math.min(100, Math.max(0, numValue));
    
    setDiscounts(prev => prev.map(d => 
      d.productId === productId ? { ...d, discount } : d
    ));
  };

  useEffect(() => {
    const total = products.reduce((sum, product) => 
      sum + calculateAnnualValue(product), 0);
    setOriginalTotalAnnual(total);

    const discountedTotal = products.reduce((sum, product) => {
      const annualValue = calculateAnnualValue(product);
      const discount = getDiscountForProduct(product.id);
      return sum + (annualValue * (1 - discount / 100));
    }, 0);
    setDiscountedTotalAnnual(discountedTotal);

    setBlendedMargin(calculateBlendedMargin(products));

    const discountedProducts = products.map(product => ({
      ...product,
      price: (parseFloat(product.price) * (1 - getDiscountForProduct(product.id) / 100)).toString()
    }));
    setDiscountedBlendedMargin(calculateBlendedMargin(discountedProducts));
  }, [products, discounts]);

  const savingsAmount = originalTotalAnnual - discountedTotalAnnual;
  const savingsPercentage = originalTotalAnnual > 0 ? 
    (savingsAmount / originalTotalAnnual) * 100 : 0;

  const handleSave = () => {
    toast.success("Bundle configuration saved!");
  };

  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-[#4A4A3F] mb-4">No Products Selected</h2>
            <p className="text-[#6B6B5F] mb-6">Please add products to configure your bundle.</p>
            <Link to="/bundle-pricing">
              <Button
                className="w-full bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-4"
          >
            <Card className="bg-white border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#4A4A3F]">
                      Set Bundle Price
                    </h2>
                    <p className="text-[#6B6B5F] mt-1">
                      Adjust individual product discounts to create the bundle
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">
                        Bundle Contents
                      </h3>
                      
                      <div className="space-y-4">
                        {products.map((product) => (
                          <BundleProduct
                            key={product.id}
                            product={product}
                            discount={getDiscountForProduct(product.id)}
                            onDiscountChange={handleDiscountChange}
                            calculateAnnualValue={calculateAnnualValue}
                            formatPriceWithFrequency={formatPriceWithFrequency}
                          />
                        ))}
                      </div>
                    </div>

                    <BundleSummary
                      originalTotalAnnual={originalTotalAnnual}
                      discountedTotalAnnual={discountedTotalAnnual}
                      savingsAmount={savingsAmount}
                      savingsPercentage={savingsPercentage}
                      blendedMargin={blendedMargin}
                      discountedBlendedMargin={discountedBlendedMargin}
                    />
                  </div>

                  <div className="flex justify-between gap-4">
                    <Link to="/bundle-pricing">
                      <Button
                        variant="outline"
                        className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                    </Link>
                    <Link to="/" onClick={handleSave}>
                      <Button
                        className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
                      >
                        Save Bundle
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BundleConfiguration;
