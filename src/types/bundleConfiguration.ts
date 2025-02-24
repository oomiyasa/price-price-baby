
import { ProductItem } from "./bundle";

export interface ProductDiscount {
  productId: string;
  discount: number;
}

export interface BundleProductProps {
  product: ProductItem;
  discount: number;
  onDiscountChange: (productId: string, value: string) => void;
  calculateAnnualValue: (product: ProductItem) => number;
  formatPriceWithFrequency: (product: ProductItem) => string;
}

export interface BundleSummaryProps {
  originalTotalAnnual: number;
  discountedTotalAnnual: number;
  savingsAmount: number;
  savingsPercentage: number;
  blendedMargin: number | null;
  discountedBlendedMargin: number | null;
}
