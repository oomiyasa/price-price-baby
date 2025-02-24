
import { ProductItem } from "@/types/bundle";
import { ProductDiscount } from "@/types/bundleConfiguration";

export const calculateAnnualValue = (product: ProductItem) => {
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

export const formatPriceWithFrequency = (product: ProductItem) => {
  switch (product.chargeModel) {
    case "subscription":
      return `${product.billingPeriod === "monthly" ? "/mo" : "/yr"}`;
    case "usage":
      return `/unit × ${product.usageUnits} units/${product.usagePeriod}`;
    default:
      return "";
  }
};

export const calculateBlendedMargin = (
  products: ProductItem[],
  discounts: ProductDiscount[],
  useDiscountedPrices: boolean = false
) => {
  const getDiscountForProduct = (productId: string) => {
    return discounts.find(d => d.productId === productId)?.discount || 0;
  };

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
    
    const adjustedMargin = discount > 0 ? 
      margin * (1 - (discount / 100)) : margin;
    
    return total + (adjustedMargin * (discountedValue / totalRevenue));
  }, 0);

  return weightedMargins;
};
