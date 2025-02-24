
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ProductItem } from "@/types/bundle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ProductDiscount {
  productId: string;
  discount: number;
}

const BundleConfiguration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [discounts, setDiscounts] = useState<ProductDiscount[]>([]);
  const [originalTotalAnnual, setOriginalTotalAnnual] = useState(0);
  const [discountedTotalAnnual, setDiscountedTotalAnnual] = useState(0);
  const [blendedMargin, setBlendedMargin] = useState<number | null>(null);
  const [discountedBlendedMargin, setDiscountedBlendedMargin] = useState<number | null>(null);

  useEffect(() => {
    if (location.state?.products) {
      setProducts(location.state.products);
      setDiscounts(location.state.products.map((p: ProductItem) => ({
        productId: p.id,
        discount: 0
      })));
    } else {
      navigate("/bundle-pricing");
      toast.error("Please add products to your bundle first");
    }
  }, [location.state, navigate]);

  const calculateAnnualValue = (product: ProductItem) => {
    const price = parseFloat(product.price);
    if (isNaN(price)) return 0;

    switch (product.chargeModel) {
      case "one-time":
        return price;
      case "subscription":
        return product.billingPeriod === "monthly" ? price * 12 : price;
      case "usage":
        const units = parseInt(product.usageUnits || "0");
        const yearlyUnits = product.usagePeriod === "day" ? units * 365 :
                           product.usagePeriod === "month" ? units * 12 : units;
        return price * yearlyUnits;
      default:
        return 0;
    }
  };

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

  const calculateBlendedMargin = (useDiscountedPrices: boolean = false) => {
    const totalRevenue = products.reduce((sum, product) => {
      const annualValue = calculateAnnualValue(product);
      const discount = useDiscountedPrices ? getDiscountForProduct(product.id) : 0;
      return sum + (annualValue * (1 - discount / 100));
    }, 0);

    if (totalRevenue === 0) return null;

    const weightedMargins = products.reduce((total, product) => {
      if (!product.grossMargin) return total;
      
      const annualValue = calculateAnnualValue(product);
      const discount = useDiscountedPrices ? getDiscountForProduct(product.id) : 0;
      const discountedValue = annualValue * (1 - discount / 100);
      const margin = parseFloat(product.grossMargin);
      
      // Adjust margin based on discount
      const adjustedMargin = discount > 0 ? 
        margin * (1 - (discount / 100)) : margin;
      
      return total + (adjustedMargin * (discountedValue / totalRevenue));
    }, 0);

    return weightedMargins;
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

    setBlendedMargin(calculateBlendedMargin(false));
    setDiscountedBlendedMargin(calculateBlendedMargin(true));
  }, [products, discounts]);

  const formatPriceWithFrequency = (product: ProductItem) => {
    switch (product.chargeModel) {
      case "subscription":
        return `${product.billingPeriod === "monthly" ? "/mo" : "/yr"}`;
      case "usage":
        return `/unit × ${product.usageUnits} units/${product.usagePeriod}`;
      default:
        return "";
    }
  };

  const savingsAmount = originalTotalAnnual - discountedTotalAnnual;
  const savingsPercentage = originalTotalAnnual > 0 ? 
    (savingsAmount / originalTotalAnnual) * 100 : 0;

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
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#4A4A3F] mb-2">
                      Set Bundle Price
                    </h2>
                    <p className="text-[#6B6B5F]">
                      Adjust individual product discounts to create the bundle
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">
                        Bundle Contents
                      </h3>
                      
                      <div className="space-y-4">
                        {products.map((product) => (
                          <div 
                            key={product.id}
                            className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200 last:border-0"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-[#4A4A3F]">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.chargeModel === "subscription" ? "Subscription" :
                                 product.chargeModel === "usage" ? "Usage-based" : "One-time"} 
                                ({`$${product.price}${formatPriceWithFrequency(product)}`})
                              </div>
                            </div>
                            
                            <div className="w-24">
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={getDiscountForProduct(product.id)}
                                onChange={(e) => handleDiscountChange(product.id, e.target.value)}
                                className="text-right"
                              />
                            </div>
                            
                            <div className="w-32 text-right">
                              <div className="text-gray-500 line-through">
                                ${calculateAnnualValue(product).toLocaleString()}
                              </div>
                              <div className="font-medium text-green-600">
                                ${(calculateAnnualValue(product) * 
                                   (1 - getDiscountForProduct(product.id) / 100))
                                   .toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Total List Price (Annual)</div>
                        <div className="text-xl font-semibold text-[#4A4A3F]">
                          ${originalTotalAnnual.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Bundle Price (Annual)</div>
                        <div className="text-xl font-semibold text-green-600">
                          ${discountedTotalAnnual.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-green-800 mb-4">
                        Bundle Impact
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-green-700">Amount Saved</div>
                          <div className="text-xl font-semibold text-green-800">
                            ${savingsAmount.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-green-700">Savings Percentage</div>
                          <div className="text-xl font-semibold text-green-800">
                            {savingsPercentage.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-green-700">Margin Impact</div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-green-600" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Change in blended margin rate due to discounts</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="text-xl font-semibold text-green-800">
                            {blendedMargin && discountedBlendedMargin ? (
                              `${(discountedBlendedMargin - blendedMargin).toFixed(1)}%`
                            ) : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(-1)}
                      className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        toast.success("Bundle configuration saved!");
                        navigate("/");
                      }}
                      className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
                    >
                      Save Bundle
                    </Button>
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
