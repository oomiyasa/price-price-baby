
import { ProductItem } from "@/types/bundle";

export const calculateMRR = (products: ProductItem[]): number => {
  return products.reduce((total, product) => {
    const price = parseFloat(product.price);
    
    switch (product.chargeModel) {
      case "one-time":
        return total + (price / 12);
      
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
            monthlyUnits = units * 30;
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

export const calculateARR = (products: ProductItem[]): number => {
  return products.reduce((total, product) => {
    const price = parseFloat(product.price);
    
    switch (product.chargeModel) {
      case "one-time":
        return total + price;
      
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

export const calculateBlendedMargin = (products: ProductItem[]): number | null => {
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
